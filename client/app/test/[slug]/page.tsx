'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams, useSearchParams, useRouter } from 'next/navigation';
import { Shield, AlertTriangle, CheckCircle, Maximize } from 'lucide-react';
import { testAPI, attemptAPI } from '../../../lib/api';

export default function SecureTestPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [test, setTest] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showFullscreenPrompt, setShowFullscreenPrompt] = useState(false);
  const [violations, setViolations] = useState({
    tabswitch: 0,
    fullscreenexit: 0,
    multiplefaces: 0,
    phonedetection: 0,
  });
  const [showTabSwitchWarning, setShowTabSwitchWarning] = useState(false);
  const [showFinishPrompt, setShowFinishPrompt] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const attemptId = searchParams.get('attemptId');
  const hasExitedFullscreen = useRef(false);
  const lastViolationTime = useRef<number>(0);
  const isSecurityActive = useRef(false);
  const iframeHasFocus = useRef(false);
  const altPressed = useRef(false);

  useEffect(() => {
    loadTest();
    return () => {
      cleanup();
    };
  }, []);

  useEffect(() => {
    if (test && !isFullscreen) {
      setShowFullscreenPrompt(true);
    }
  }, [test, isFullscreen]);

  useEffect(() => {
    if (isFullscreen && !isSecurityActive.current) {
      setupSecurityMeasures();
      isSecurityActive.current = true;
    } else if (!isFullscreen && isSecurityActive.current) {
      cleanup();
      isSecurityActive.current = false;
    }
  }, [isFullscreen]);

  const loadTest = async () => {
    try {
      const response = await testAPI.getBySlug(params.slug as string);
      setTest(response.data);
    } catch (error) {
      console.error('Failed to load test:', error);
      router.push('/');
    } finally {
      setLoading(false);
    }
  };

  const recordViolation = async (type: string) => {
    const now = Date.now();
    if (now - lastViolationTime.current < 3000) return;
    lastViolationTime.current = now;

    try {
      await attemptAPI.recordViolation(attemptId!, type);
      const violationKey = type.toLowerCase().replace('_', '') as keyof typeof violations;
      setViolations(prev => ({
        ...prev,
        [violationKey]: prev[violationKey] + 1,
      }));
      if (type === 'TAB_SWITCH') {
        setShowTabSwitchWarning(true);
        setTimeout(() => setShowTabSwitchWarning(false), 5000);
      }
      const totalViolations = Object.values(violations).reduce((a, b) => a + b, 0) + 1;
      // if (totalViolations >= 5) {
      //   alert('Too many violations detected. Test will be automatically submitted.');
      //   handleFinishTest();
      // }
    } catch (error) {
      // Handle error gracefully; do not crash UI
    }
  };

  const setupSecurityMeasures = () => {
    // Iframe focus logic for form interaction safety
    const handleIframeFocus = () => {
      iframeHasFocus.current = true;
    };
    const handleIframeBlur = () => {
      iframeHasFocus.current = false;
    };

    // Visibility/tab switch detection (exclude iframe focus cases)
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setTimeout(() => {
          if (document.hidden && !iframeHasFocus.current) {
            recordViolation('TAB_SWITCH');
          }
        }, 500);
      }
    };

    // Window blur (exclude iframe focus)
    const handleWindowBlur = () => {
      setTimeout(() => {
        if (!iframeHasFocus.current && document.hidden) {
          recordViolation('TAB_SWITCH');
        }
      }, 1000);
    };

    // Prevent right click
    const handleContextMenu = (e: Event) => {
      e.preventDefault();
      return false;
    };

    // MAIN Alt+Tab detection logic + other restricted keys
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Alt') altPressed.current = true;
      // Alt+Tab (Alt held and Tab pressed)
      if (altPressed.current && e.key === 'Tab') {
        recordViolation('TAB_SWITCH');
        return false;
      }
      // Ctrl+Tab (tab switch in browser)
      if (e.ctrlKey && e.key === 'Tab') {
        recordViolation('TAB_SWITCH');
        return false;
      }
      // Windows key
      if (e.key === 'Meta' || e.key === 'Win') {
        recordViolation('TAB_SWITCH');
        return false;
      }
      // Standard blocked shortcuts
      if (e.ctrlKey && ['c', 'v', 's', 'p'].includes(e.key)) {
        e.preventDefault();
      }
      if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && e.key === 'I')) {
        e.preventDefault();
      }
      // Escape (fullscreen exit)
      if (e.key === 'Escape') {
        e.preventDefault();
        recordViolation('FULLSCREEN_EXIT');
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'Alt') altPressed.current = false;
    };

    // Fullscreen detection
    const handleFullscreenChange = () => {
      const isCurrentlyFullscreen = !!document.fullscreenElement;
      setIsFullscreen(isCurrentlyFullscreen);
      if (!isCurrentlyFullscreen && !hasExitedFullscreen.current) {
        recordViolation('FULLSCREEN_EXIT');
        setShowFullscreenPrompt(true);
      }
    };

    // Register main event listeners
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleWindowBlur);
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);
    document.addEventListener('fullscreenchange', handleFullscreenChange);

    // Iframe listeners
    const iframe = iframeRef.current;
    if (iframe) {
      iframe.addEventListener('focus', handleIframeFocus);
      iframe.addEventListener('blur', handleIframeBlur);
      iframe.addEventListener('load', () => {
        iframeHasFocus.current = false;
      });
    }

    // Store for cleanup
    (window as any).securityHandlers = {
      handleVisibilityChange,
      handleWindowBlur,
      handleContextMenu,
      handleKeyDown,
      handleKeyUp,
      handleFullscreenChange,
      handleIframeFocus,
      handleIframeBlur,
    };
  };

  const requestFullscreen = async () => {
    try {
      if (document.documentElement.requestFullscreen) {
        await document.documentElement.requestFullscreen();
        setIsFullscreen(true);
        setShowFullscreenPrompt(false);
      }
    } catch (error) {
      setShowFullscreenPrompt(false);
    }
  };

  const cleanup = () => {
    const handlers = (window as any).securityHandlers;
    if (handlers) {
      document.removeEventListener('visibilitychange', handlers.handleVisibilityChange);
      window.removeEventListener('blur', handlers.handleWindowBlur);
      document.removeEventListener('contextmenu', handlers.handleContextMenu);
      document.removeEventListener('keydown', handlers.handleKeyDown);
      document.removeEventListener('keyup', handlers.handleKeyUp);
      document.removeEventListener('fullscreenchange', handlers.handleFullscreenChange);

      const iframe = iframeRef.current;
      if (iframe) {
        iframe.removeEventListener('focus', handlers.handleIframeFocus);
        iframe.removeEventListener('blur', handlers.handleIframeBlur);
      }

      isSecurityActive.current = false;
    }
  };

  const handleFinishTest = async () => {
    setShowFinishPrompt(true);
  };

  const confirmFinishTest = async () => {
    try {
      hasExitedFullscreen.current = true;
      await attemptAPI.finish(attemptId!);
      if (document.exitFullscreen && document.fullscreenElement) {
        await document.exitFullscreen();
      }
      const successDiv = document.createElement('div');
      successDiv.className = 'fixed inset-0 z-50 flex items-center justify-center';
      successDiv.style.backgroundColor = 'var(--color-background)';
      successDiv.innerHTML = `
        <div class="card max-w-md mx-4 text-center">
          <div class="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6" style="background: linear-gradient(135deg, var(--color-success), var(--color-primary))">
            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h2 class="text-2xl font-bold mb-4" style="color: var(--color-text)">Test Submitted Successfully!</h2>
          <p class="mb-6" style="color: var(--color-text-secondary)">Your responses have been recorded and submitted.</p>
          <div class="text-sm" style="color: var(--color-text-muted)">Redirecting you back to the homepage...</div>
        </div>
      `;
      document.body.appendChild(successDiv);

      setTimeout(() => {
        if (document.body.contains(successDiv)) {
          document.body.removeChild(successDiv);
        }
        window.location.href = '/';
      }, 3000);

    } catch (error) {
      const errorDiv = document.createElement('div');
      errorDiv.className = 'fixed inset-0 z-50 flex items-center justify-center';
      errorDiv.style.backgroundColor = 'var(--color-background)';
      errorDiv.innerHTML = `
        <div class="card max-w-md mx-4 text-center">
          <div class="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6" style="background: linear-gradient(135deg, var(--color-danger), #dc2626)">
            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </div>
          <h2 class="text-2xl font-bold mb-4" style="color: var(--color-text)">Submission Failed</h2>
          <p class="mb-6" style="color: var(--color-text-secondary)">Please try submitting again or contact your instructor.</p>
          <button onclick="this.parentElement.parentElement.remove()" class="btn btn-primary">Close</button>
        </div>
      `;
      document.body.appendChild(errorDiv);

      setShowFinishPrompt(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen hero-section flex items-center justify-center">
        <div className="card text-center">
          <div className="loading-spinner h-16 w-16 mx-auto mb-4"></div>
          <p style={{ color: 'var(--color-text)' }} className="text-lg font-medium">
            Loading secure test environment...
          </p>
        </div>
      </div>
    );
  }

  const getTotalViolations = () => Object.values(violations).reduce((a, b) => a + b, 0);

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-background)' }}>
      {showFullscreenPrompt && (
        <div className="fixed inset-0 flex items-center justify-center z-50" style={{ backgroundColor: 'rgba(11, 20, 38, 0.95)' }}>
          <div className="card max-w-md mx-4" style={{ backgroundColor: 'var(--color-surface)', border: '2px solid var(--color-primary)' }}>
            <div className="flex items-center space-x-3 mb-4">
              <Maximize className="h-8 w-8" style={{ color: 'var(--color-primary)' }} />
              <h3 className="text-xl font-bold" style={{ color: 'var(--color-text)' }}>
                Enter Secure Mode
              </h3>
            </div>
            <p className="mb-6" style={{ color: 'var(--color-text-secondary)' }}>
              This test monitors for suspicious activity. Legitimate form interactions are allowed, 
              but tab switching and window changes will be detected.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => router.push('/')}
                className="flex-1 py-3 px-6 rounded-lg font-semibold transition-colors"
                style={{ backgroundColor: 'var(--color-surface-light)', color: 'var(--color-text)' }}
              >
                Exit Test
              </button>
              <button
                onClick={requestFullscreen}
                className="flex-1 py-3 px-6 rounded-lg font-semibold transition-colors"
                style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-light))', color: 'white' }}
              >
                Start Secure Test
              </button>
            </div>
          </div>
        </div>
      )}

      {isFullscreen && (
        <div className="absolute top-0 left-0 w-full text-white p-3 text-center text-sm z-20 shadow-lg" style={{ background: 'linear-gradient(90deg, var(--color-danger), #dc2626)' }}>
          <div className="flex items-center justify-center space-x-6">
            <div className="flex items-center space-x-2">
              <Shield className="h-4 w-4" />
              <span className="font-semibold">🔒 SECURE MODE - MONITORED TEST</span>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <span className="px-2 py-1 text-xs rounded-full" style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}>
                Flags: {getTotalViolations()}
              </span>
            </div>
          </div>
        </div>
      )}

      {showTabSwitchWarning && (
        <div className="fixed inset-0 flex items-center justify-center z-30" style={{ backgroundColor: 'rgba(11, 20, 38, 0.9)' }}>
          <div className="card max-w-md mx-4" style={{ backgroundColor: 'var(--color-surface)', border: '2px solid var(--color-warning)' }}>
            <div className="flex items-center space-x-3 mb-4">
              <AlertTriangle className="h-8 w-8" style={{ color: 'var(--color-warning)' }} />
              <h3 className="text-xl font-bold" style={{ color: 'var(--color-text)' }}>
                ⚠️ VIOLATION DETECTED!
              </h3>
            </div>
            <p className="mb-6" style={{ color: 'var(--color-text-secondary)' }}>
              <strong>You have left the test window.</strong> This violation has been recorded. 
              Please stay focused on the test.
            </p>
            <button
              onClick={() => setShowTabSwitchWarning(false)}
              className="w-full py-3 px-6 rounded-lg font-semibold transition-colors"
              style={{ backgroundColor: 'var(--color-warning)', color: 'var(--color-background)' }}
            >
              Return to Test
            </button>
          </div>
        </div>
      )}

      {showFinishPrompt && (
        <div className="fixed inset-0 flex items-center justify-center z-30" style={{ backgroundColor: 'rgba(11, 20, 38, 0.9)' }}>
          <div className="card max-w-md mx-4" style={{ backgroundColor: 'var(--color-surface)', border: '2px solid var(--color-primary)' }}>
            <div className="flex items-center space-x-3 mb-4">
              <CheckCircle className="h-8 w-8" style={{ color: 'var(--color-success)' }} />
              <h3 className="text-xl font-bold" style={{ color: 'var(--color-text)' }}>
                Final Submission
              </h3>
            </div>
            <p className="mb-6" style={{ color: 'var(--color-text-secondary)' }}>
              Make sure you have submitted the test below before proceding with the final submit here .  
              Are you sure you have submitted the test ? 
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowFinishPrompt(false)}
                className="flex-1 py-3 px-6 rounded-lg font-semibold transition-colors"
                style={{ backgroundColor: 'var(--color-surface-light)', color: 'var(--color-text)' }}
              >
                No, I havent submitted the test .
              </button>
              <button
                onClick={confirmFinishTest}
                className="flex-1 py-3 px-6 rounded-lg font-semibold transition-colors"
                style={{ background: 'linear-gradient(135deg, var(--color-success), var(--color-primary))', color: 'white' }}
              >
                Yes, I have submitted the test . Do Final Submission . 
              </button>
            </div>
          </div>
        </div>
      )}

      <div className={isFullscreen ? 'pt-16 h-screen' : 'h-screen'}>
        {test && (
          <iframe
            ref={iframeRef}
            src={test.url}
            className="w-full h-full border-none bg-white"
            title={test.title}
            sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
            onFocus={() => { iframeHasFocus.current = true; }}
            onBlur={() => { iframeHasFocus.current = false; }}
          />
        )}
      </div>

      {isFullscreen && (
  <div className="fixed top-4 right-4 z-[9999]">
    <button
      onClick={handleFinishTest}
      className="px-6 py-3 rounded-xl shadow-2xl transform transition-all duration-200 hover:scale-105 font-semibold text-base md:text-lg"
      style={{
        background: 'linear-gradient(135deg, var(--color-success), var(--color-primary))',
        color: 'white',
      }}
    >
      Submit Test
    </button>
  </div>
)}


      {/* {isFullscreen && (
  <div
    className="fixed top-6 left-6 p-4 rounded-2xl z-20 shadow-2xl max-w-sm"
    style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-primary)' }}
  >
    <div className="flex items-center space-x-2 mb-2">
      <Shield className="h-5 w-5" style={{ color: 'var(--color-primary)' }} />
      <span className="font-semibold" style={{ color: 'var(--color-text)' }}>Note</span>
    </div>
    <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
      Click finish test after submitting to submit the test successfully.
    </p>
  </div>
)} */}

    </div>
  );
}
