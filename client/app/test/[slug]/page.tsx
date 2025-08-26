'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams, useSearchParams, useRouter } from 'next/navigation';
import { testAPI, attemptAPI } from '../../../lib/api';

export default function SecureTestPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [test, setTest] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [violations, setViolations] = useState({
    tabswitch: 0,
    fullscreenexit: 0,
    multiplefaces: 0,
    phonedetection: 0,
  });
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const attemptId = searchParams.get('attemptId');
  const studentId = searchParams.get('studentId');

  useEffect(() => {
    loadTest();
    setupSecurityMeasures();
    
    return () => {
      cleanup();
    };
  }, []);

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
    try {
      await attemptAPI.recordViolation(attemptId!, type);
      
      // Update local state
      const violationKey = type.toLowerCase().replace('_', '') as keyof typeof violations;
      setViolations(prev => ({
        ...prev,
        [violationKey]: prev[violationKey] + 1
      }));
      
      // Check if should auto-submit
      const totalViolations = Object.values(violations).reduce((a, b) => a + b, 0) + 1;
      if (totalViolations >= 5) {
        alert('Too many violations detected. Test will be automatically submitted.');
        handleFinishTest();
      }
    } catch (error) {
      console.error('Failed to record violation:', error);
    }
  };

  const setupSecurityMeasures = () => {
    // Disable right-click
    const handleContextMenu = (e: Event) => {
      e.preventDefault();
    };
    document.addEventListener('contextmenu', handleContextMenu);

    // Disable copy/paste and developer tools
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && (e.key === 'c' || e.key === 'v' || e.key === 'a' || e.key === 'x')) {
        e.preventDefault();
      }
      
      // Disable F12, Ctrl+Shift+I, etc.
      if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && e.key === 'I')) {
        e.preventDefault();
      }
    };
    document.addEventListener('keydown', handleKeyDown);

    // Tab switching detection
    const handleVisibilityChange = () => {
      if (document.hidden) {
        recordViolation('TAB_SWITCH');
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Fullscreen detection
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        recordViolation('FULLSCREEN_EXIT');
        // Force back to fullscreen
        requestFullscreen();
      }
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);

    // Request fullscreen immediately
    requestFullscreen();

    // Store event handlers for cleanup
    (window as any).securityHandlers = {
      handleContextMenu,
      handleKeyDown,
      handleVisibilityChange,
      handleFullscreenChange
    };
  };

  const requestFullscreen = () => {
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen().catch(console.error);
    }
  };

  const cleanup = () => {
    const handlers = (window as any).securityHandlers;
    if (handlers) {
      document.removeEventListener('contextmenu', handlers.handleContextMenu);
      document.removeEventListener('keydown', handlers.handleKeyDown);
      document.removeEventListener('visibilitychange', handlers.handleVisibilityChange);
      document.removeEventListener('fullscreenchange', handlers.handleFullscreenChange);
    }
  };

  const handleFinishTest = async () => {
    try {
      await attemptAPI.finish(attemptId!);
      alert('Test submitted successfully!');
      
      // Exit fullscreen
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
      
      router.push('/');
    } catch (error) {
      console.error('Failed to finish test:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black relative">
      {/* Security Overlay */}
      <div className="absolute top-0 left-0 w-full bg-red-600 text-white p-2 text-center text-sm z-10">
        🛡️ SECURE TEST MODE - Violations: Tab Switch ({violations.tabswitch}) | 
        Fullscreen Exit ({violations.fullscreenexit}) | 
        Multiple Faces ({violations.multiplefaces}) | 
        Phone Detection ({violations.phonedetection})
      </div>

      {/* Test Content */}
      <div className="pt-10 h-screen">
        {test && (
          <iframe
            ref={iframeRef}
            src={test.url}
            className="w-full h-full border-none"
            title={test.title}
            sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
          />
        )}
      </div>

      {/* Finish Button */}
      <button
        onClick={handleFinishTest}
        className="fixed bottom-4 right-4 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg z-20"
      >
        Finish Test
      </button>
    </div>
  );
}
