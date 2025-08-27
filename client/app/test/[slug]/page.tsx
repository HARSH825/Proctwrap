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
  
  const [showScreenPrompt, setShowScreenPrompt] = useState(true);
  const [isScreenShared, setIsScreenShared] = useState(false);
  const [screenStream, setScreenStream] = useState<MediaStream | null>(null);
  const [isMonitoringScreen, setIsMonitoringScreen] = useState(false); // Track if we're actively monitoring
  
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
      if (screenStream) {
        screenStream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  useEffect(() => {
    if (test && !isScreenShared && showScreenPrompt) {
    } else if (test && isScreenShared && !isFullscreen) {
      setShowFullscreenPrompt(true);
    }
  }, [test, isScreenShared, isFullscreen, showScreenPrompt]);

  useEffect(() => {
    if (isFullscreen && !isSecurityActive.current) {
      setupSecurityMeasures();
      isSecurityActive.current = true;
    } else if (!isFullscreen && isSecurityActive.current) {
      cleanup();
      isSecurityActive.current = false;
    }
  }, [isFullscreen]);

  useEffect(() => {
    if (screenStream && isMonitoringScreen) {
      const checkScreenSharing = () => {
        const tracks = screenStream.getVideoTracks();
        if (tracks.length === 0 || tracks[0].readyState === 'ended') {
          alert('Screen sharing has been stopped. The test will be terminated for security reasons.');
          router.push('/');
          return;
        }
        
        const settings = tracks[0].getSettings();
        if (settings.displaySurface !== 'monitor') {
          alert('You must share your entire screen, not just a tab or window. Please restart the test.');
          router.push('/');
          return;
        }
      };

      const interval = setInterval(checkScreenSharing, 4000); 
      
      return () => clearInterval(interval);
    }
  }, [screenStream, isMonitoringScreen, router]);

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
  //p-2
  const handleShareScreen = async () => {
    try {
      const stream = await (navigator.mediaDevices as any).getDisplayMedia({
        video: {
          displaySurface: "monitor" 
        },
        audio: false
      });
      
      const videoTrack = stream.getVideoTracks()[0];
      const settings = videoTrack.getSettings();
      
      if (settings.displaySurface !== 'monitor') {
        (stream as MediaStream).getTracks().forEach(track => track.stop());
        alert('You must share your ENTIRE SCREEN, not just a tab or window. Please try again and select "Entire Screen".');
        return;
      }
      
      setScreenStream(stream);
      setIsScreenShared(true);
      setIsMonitoringScreen(true);
      setShowScreenPrompt(false);
      setShowFullscreenPrompt(true);
      
      videoTrack.addEventListener('ended', () => {
        alert('Screen sharing has been stopped. The test will be terminated for security reasons.');
        router.push('/');
      });
      
    } catch (err) {
      alert("Screen sharing is required for this test. Please allow sharing your entire screen and try again.");
    }
  };

  const captureScreenshot = async (): Promise<string | null> => {
    if (!screenStream) return null;
    
    const videoTrack = screenStream.getVideoTracks()[0];
    if (!videoTrack) return null;

    try {
      const video = document.createElement("video");
      video.srcObject = new MediaStream([videoTrack]);
      video.muted = true;
      video.play();

      await new Promise((resolve) => {
        video.onloadedmetadata = resolve;
      });

      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d");
      ctx?.drawImage(video, 0, 0);

      return await new Promise<string | null>((resolve) => {
        canvas.toBlob((blob) => {
          if (!blob) return resolve(null);
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.readAsDataURL(blob);
        }, "image/jpeg", 0.8);
      });
    } catch (error) {
      console.error('Screenshot capture failed:', error);
      return null;
    }
  };

  const recordViolation = async (type: string) => {
    const now = Date.now();
    if (now - lastViolationTime.current < 3000) return;
    lastViolationTime.current = now;

    if (type === 'TAB_SWITCH') {
      setShowTabSwitchWarning(true);
      setTimeout(() => setShowTabSwitchWarning(false), 5000);
    }

    const violationKey = type.toLowerCase().replace('_', '') as keyof typeof violations;
    setViolations(prev => ({
      ...prev,
      [violationKey]: prev[violationKey] + 1,
    }));

    sendViolationRequest(type);
  };

  const sendViolationRequest = async (type: string) => {
    try {
      let screenshot: string | null = null;
      if (isScreenShared && screenStream) {
        screenshot = await captureScreenshot();
      }

      const formData = new FormData();
      formData.append('type', type);
      
      if (screenshot) {
        const response = await fetch(screenshot);
        const blob = await response.blob();
        formData.append('image', blob, 'violation.jpg');
      }

      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/violation/attempts/${attemptId}/violation`, {
        method: 'PATCH',
        body: formData,
      });

      console.log(`${type} violation sent successfully`);
    } catch (error) {
      console.error('Failed to record violation:', error);
    }
  };

  const setupSecurityMeasures = () => {
    const handleIframeFocus = () => {
      iframeHasFocus.current = true;
    };
    const handleIframeBlur = () => {
      iframeHasFocus.current = false;
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        setTimeout(() => {
          if (document.hidden && !iframeHasFocus.current) {
            recordViolation('TAB_SWITCH');
          }
        }, 500);
      }
    };

    const handleWindowBlur = () => {
      setTimeout(() => {
        if (!iframeHasFocus.current && document.hidden) {
          recordViolation('TAB_SWITCH');
        }
      }, 1000);
    };

    const handleContextMenu = (e: Event) => {
      e.preventDefault();
      return false;
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Alt') altPressed.current = true;
      
      if (altPressed.current && e.key === 'Tab') {
        recordViolation('TAB_SWITCH');
        return false;
      }
      
      if (e.ctrlKey && e.key === 'Tab') {
        recordViolation('TAB_SWITCH');
        return false;
      }
      
      if (e.key === 'Meta' || e.key === 'Win') {
        recordViolation('TAB_SWITCH');
        return false;
      }
      
      if (e.ctrlKey && ['c', 'v', 's', 'p'].includes(e.key)) {
        e.preventDefault();
      }
      
      if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && e.key === 'I')) {
        e.preventDefault();
      }
      
      if (e.key === 'Escape') {
        e.preventDefault();
        recordViolation('FULLSCREEN_EXIT');
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'Alt') altPressed.current = false;
    };

    const handleFullscreenChange = () => {
      const isCurrentlyFullscreen = !!document.fullscreenElement;
      setIsFullscreen(isCurrentlyFullscreen);
      if (!isCurrentlyFullscreen && !hasExitedFullscreen.current) {
        recordViolation('FULLSCREEN_EXIT');
        setShowFullscreenPrompt(true);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleWindowBlur);
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);
    document.addEventListener('fullscreenchange', handleFullscreenChange);

    const iframe = iframeRef.current;
    if (iframe) {
      iframe.addEventListener('focus', handleIframeFocus);
      iframe.addEventListener('blur', handleIframeBlur);
      iframe.addEventListener('load', () => {
        iframeHasFocus.current = false;
      });
    }

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
      setIsMonitoringScreen(false); 
      await attemptAPI.finish(attemptId!);
      
      if (screenStream) {
        screenStream.getTracks().forEach(track => track.stop());
        setScreenStream(null);
      }
      
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

  if (showScreenPrompt) {
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50" style={{ backgroundColor: 'rgba(11, 20, 38, 0.95)' }}>
        <div className="card max-w-lg mx-4 text-center">
          <Shield className="h-16 w-16 mx-auto mb-4" style={{ color: 'var(--color-primary)' }} />
          <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--color-text)' }}>
            Screen Sharing Required
          </h2>
          <div className="mb-6 space-y-3">
            <p style={{ color: 'var(--color-text-secondary)' }}>
              You must share your <strong>ENTIRE SCREEN</strong> for this test.
            </p>
            <div className="p-4 rounded-xl" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}>
              <div className="mb-3">
                <p className="text-sm font-semibold" style={{ color: 'var(--color-warning)' }}>
                   IMPORTANT: Select "Entire Screen" NOT "Chrome Tab"
                </p>
              </div>
              <ul className="text-sm space-y-2" style={{ color: 'var(--color-text-secondary)' }}>
                <li className="flex items-start space-x-2">
                  <span style={{ color: 'var(--color-primary)' }} className="mt-1">•</span>
                  <span>Screenshots will be captured during violations</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span style={{ color: 'var(--color-primary)' }} className="mt-1">•</span>
                  <span>Stopping screen share will terminate the test</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span style={{ color: 'var(--color-primary)' }} className="mt-1">•</span>
                  <span>Your instructor can review violation images</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={() => router.push('/')}
              className="flex-1 py-3 px-6 rounded-lg font-semibold transition-colors"
              style={{ backgroundColor: 'var(--color-surface-light)', color: 'var(--color-text)' }}
            >
              Cancel Test
            </button>
            <button
              onClick={handleShareScreen}
              className="flex-1 py-3 px-6 rounded-lg font-semibold transition-colors"
              style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-light))', color: 'white' }}
            >
              Share Entire Screen
            </button>
          </div>
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
              <span className="font-semibold"> SECURE MODE - MONITORED TEST</span>
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
              Make sure you have submitted the test below before proceeding with the final submit here.
              Are you sure you have submitted the test?
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowFinishPrompt(false)}
                className="flex-1 py-3 px-6 rounded-lg font-semibold transition-colors"
                style={{ backgroundColor: 'var(--color-surface-light)', color: 'var(--color-text)' }}
              >
                No, I haven't submitted the test
              </button>
              <button
                onClick={confirmFinishTest}
                className="flex-1 py-3 px-6 rounded-lg font-semibold transition-colors"
                style={{ background: 'linear-gradient(135deg, var(--color-success), var(--color-primary))', color: 'white' }}
              >
                Yes, I have submitted the test
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
    </div>
  );
}
