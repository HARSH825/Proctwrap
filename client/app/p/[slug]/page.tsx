'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams, useSearchParams, useRouter } from 'next/navigation';
import { Shield, User, Mail, CheckCircle, AlertTriangle, ArrowLeft } from 'lucide-react';
import { testAPI, studentAPI, attemptAPI } from '../../../lib/api';

export default function StudentEntryPage() {
  const params = useParams();
  const router = useRouter();
  const [test, setTest] = useState<any>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [uid, setUid] = useState('');
  const [loading, setLoading] = useState(true);
  const [starting, setStarting] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [isTestStarted, setIsTestStarted] = useState(false);

  useEffect(() => {
    loadTest();
  }, []);

  const loadTest = async () => {
    try {
      const response = await testAPI.getBySlug(params.slug as string);
      setTest(response.data);
    } catch (error) {
      console.error('Failed to load test:', error);
      alert('Test not found');
    } finally {
      setLoading(false);
    }
  };

  const handleStart = async (e: React.FormEvent) => {
    e.preventDefault();
    setStarting(true);

    try {
      const studentResponse = await studentAPI.create(name, email, uid);
      const student = studentResponse.data;

      const attemptResponse = await attemptAPI.start(student.id, test.id);
      const attempt = attemptResponse.data;

      // Start the secure test environment
      setIsTestStarted(true);
      
      // Initialize security measures and redirect to secure test page
      setTimeout(() => {
        window.location.href = `/test/${params.slug}?attemptId=${attempt.id}&studentId=${student.id}`;
      }, 1000);
    } catch (error) {
      console.error('Failed to start test:', error);
      alert('Failed to start test');
    } finally {
      setStarting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen hero-section flex items-center justify-center">
        <div className="card text-center max-w-md mx-auto">
          <div className="loading-spinner h-16 w-16 mx-auto mb-4"></div>
          <p style={{ color: 'var(--color-text)' }} className="text-lg font-medium">
            Loading secure test environment...
          </p>
        </div>
      </div>
    );
  }

  if (!test) {
    return (
      <div className="min-h-screen hero-section flex items-center justify-center">
        <div className="card text-center max-w-md mx-auto">
          <AlertTriangle className="h-16 w-16 mx-auto mb-4" style={{ color: 'var(--color-warning)' }} />
          <h1 className="text-2xl font-bold mb-2" style={{ color: 'var(--color-text)' }}>Test Not Found</h1>
          <p className="mb-6" style={{ color: 'var(--color-text-secondary)' }}>
            The test you're looking for doesn't exist or has been removed.
          </p>
          <button
            onClick={() => router.push('/')}
            className="btn btn-primary"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  if (isTestStarted) {
    return (
      <div className="min-h-screen hero-section flex items-center justify-center">
        <div className="card text-center max-w-md mx-auto">
          <div className="w-16 h-16 bg-gradient-to-r from-primary to-primary-light rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Shield className="h-10 w-10" style={{ color: 'var(--color-background)' }} />
          </div>
          <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--color-text)' }}>
            Initializing Secure Environment
          </h2>
          <p className="mb-6" style={{ color: 'var(--color-text-secondary)' }}>
            Preparing your monitored test session...
          </p>
          <div className="loading-spinner h-8 w-8 mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen hero-section">
      {/* Header */}
      <div className="relative z-10">
        <div className="glassmorphism mx-4 mt-4 p-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-primary to-primary-light rounded-lg">
                <Shield className="h-6 w-6" style={{ color: 'var(--color-background)' }} />
              </div>
              <div>
                <h1 className="text-xl font-bold" style={{ color: 'var(--color-text)' }}>SecureWrap</h1>
                <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>Anti-Cheating Platform</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5" style={{ color: 'var(--color-primary)' }} />
              <span className="text-sm font-medium" style={{ color: 'var(--color-text)' }}>Secure Test Environment</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold mb-4" style={{ color: 'var(--color-text)' }}>
            {test.title}
          </h2>
          <p className="text-xl mb-8" style={{ color: 'var(--color-text-secondary)' }}>
            Advanced monitoring and anti-cheating protection enabled
          </p>
          
          {/* Progress Steps */}
          <div className="flex justify-center items-center space-x-4 mb-8">
            <div className={`flex items-center space-x-2 ${currentStep >= 1 ? 'text-blue-400' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 1 ? 'bg-blue-500' : 'bg-gray-500'}`}>
                <span className="text-white font-bold text-sm">1</span>
              </div>
              <span className="font-medium">Guidelines</span>
            </div>
            <div className="w-12 h-0.5 bg-gray-400"></div>
            <div className={`flex items-center space-x-2 ${currentStep >= 2 ? 'text-blue-400' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 2 ? 'bg-blue-500' : 'bg-gray-500'}`}>
                <span className="text-white font-bold text-sm">2</span>
              </div>
              <span className="font-medium">Information</span>
            </div>
            <div className="w-12 h-0.5 bg-gray-400"></div>
            <div className={`flex items-center space-x-2 ${currentStep >= 3 ? 'text-blue-400' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 3 ? 'bg-blue-500' : 'bg-gray-500'}`}>
                <span className="text-white font-bold text-sm">3</span>
              </div>
              <span className="font-medium">Start Test</span>
            </div>
          </div>
        </div>

        {/* Step 1: Guidelines */}
        {currentStep === 1 && (
          <div className="card max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <AlertTriangle className="h-16 w-16 mx-auto mb-4" style={{ color: 'var(--color-warning)' }} />
              <h3 className="text-3xl font-bold mb-4" style={{ color: 'var(--color-text)' }}>
                Test Guidelines & Rules
              </h3>
              <p style={{ color: 'var(--color-text-secondary)' }}>
                Please read these guidelines carefully before proceeding
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="p-6 rounded-xl" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}>
                <div className="flex items-center space-x-3 mb-4">
                  <Shield className="h-8 w-8" style={{ color: 'var(--color-primary)' }} />
                  <h4 className="text-xl font-semibold" style={{ color: 'var(--color-text)' }}>
                    Monitoring Active
                  </h4>
                </div>
                <ul className="space-y-2" style={{ color: 'var(--color-text-secondary)' }}>
                  <li className="flex items-start space-x-2">
                    <span style={{ color: 'var(--color-primary)' }} className="mt-1">•</span>
                    <span>Your screen activity will be monitored</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span style={{ color: 'var(--color-primary)' }} className="mt-1">•</span>
                    <span>Tab switching will be detected and recorded</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span style={{ color: 'var(--color-primary)' }} className="mt-1">•</span>
                    <span>Fullscreen exits will trigger violations</span>
                  </li>
                </ul>
              </div>

              <div className="p-6 rounded-xl" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}>
                <div className="flex items-center space-x-3 mb-4">
                  <AlertTriangle className="h-8 w-8" style={{ color: 'var(--color-danger)' }} />
                  <h4 className="text-xl font-semibold" style={{ color: 'var(--color-text)' }}>
                    Prohibited Actions
                  </h4>
                </div>
                <ul className="space-y-2" style={{ color: 'var(--color-text-secondary)' }}>
                  <li className="flex items-start space-x-2">
                    <span style={{ color: 'var(--color-danger)' }} className="mt-1">•</span>
                    <span>Opening other applications or websites</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span style={{ color: 'var(--color-danger)' }} className="mt-1">•</span>
                    <span>Using external help or resources</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span style={{ color: 'var(--color-danger)' }} className="mt-1">•</span>
                    <span>Copy/paste operations are disabled</span>
                  </li>
                </ul>
              </div>

              <div className="p-6 rounded-xl" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}>
                <div className="flex items-center space-x-3 mb-4">
                  <CheckCircle className="h-8 w-8" style={{ color: 'var(--color-success)' }} />
                  <h4 className="text-xl font-semibold" style={{ color: 'var(--color-text)' }}>
                    Technical Requirements
                  </h4>
                </div>
                <ul className="space-y-2" style={{ color: 'var(--color-text-secondary)' }}>
                  <li className="flex items-start space-x-2">
                    <span style={{ color: 'var(--color-success)' }} className="mt-1">•</span>
                    <span>Stable internet connection required</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span style={{ color: 'var(--color-success)' }} className="mt-1">•</span>
                    <span>Test runs in fullscreen mode</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span style={{ color: 'var(--color-success)' }} className="mt-1">•</span>
                    <span>Modern browser with JavaScript enabled</span>
                  </li>
                </ul>
              </div>

              <div className="p-6 rounded-xl" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}>
                <div className="flex items-center space-x-3 mb-4">
                  <CheckCircle className="h-8 w-8" style={{ color: 'var(--color-primary-light)' }} />
                  <h4 className="text-xl font-semibold" style={{ color: 'var(--color-text)' }}>
                    Important Notes
                  </h4>
                </div>
                <ul className="space-y-2" style={{ color: 'var(--color-text-secondary)' }}>
                  <li className="flex items-start space-x-2">
                    <span style={{ color: 'var(--color-primary-light)' }} className="mt-1">•</span>
                    <span>Click "Finish Test" when complete</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span style={{ color: 'var(--color-primary-light)' }} className="mt-1">•</span>
                    <span>Excessive violations may result in auto-submission</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span style={{ color: 'var(--color-primary-light)' }} className="mt-1">•</span>
                    <span>Return to original screen if tab switched</span>
                  </li>
                </ul>
              </div>
            </div>

            <button
              onClick={() => setCurrentStep(2)}
              className="btn btn-primary w-full text-lg py-4"
            >
              I Understand - Continue to Registration
            </button>
          </div>
        )}

        {/* Step 2: Student Information */}
        {currentStep === 2 && (
          <div className="card max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <User className="h-16 w-16 mx-auto mb-4" style={{ color: 'var(--color-primary)' }} />
              <h3 className="text-3xl font-bold mb-4" style={{ color: 'var(--color-text)' }}>
                Student Information
              </h3>
              <p style={{ color: 'var(--color-text-secondary)' }}>
                Please provide your details to begin the test
              </p>
            </div>

            <form onSubmit={handleStart} className="space-y-6">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-text)' }}>
                    Full Name *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                      <User className="h-5 w-5" style={{ color: 'var(--color-text-muted)' }} />
                    </div>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="form-input pl-10"
                      placeholder="Enter your full name"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-text)' }}>
                    Email Address *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                      <Mail className="h-5 w-5" style={{ color: 'var(--color-text-muted)' }} />
                    </div>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="form-input pl-10"
                      placeholder="Enter your email address"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-text)' }}>
                    Student ID / UID *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                      <CheckCircle className="h-5 w-5" style={{ color: 'var(--color-text-muted)' }} />
                    </div>
                    <input
                      type="text"
                      required
                      value={uid}
                      onChange={(e) => setUid(e.target.value)}
                      className="form-input pl-10"
                      placeholder="Enter your student ID or UID"
                    />
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}>
                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    required
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                    className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <div className="text-sm">
                    <p style={{ color: 'var(--color-text-secondary)' }}>
                      I acknowledge that I have read and understood the test guidelines. 
                      I agree to comply with all monitoring and anti-cheating measures during this examination.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="btn btn-secondary flex-1"
                >
                  Back to Guidelines
                </button>
                <button
                  type="submit"
                  disabled={starting || !agreedToTerms}
                  className="btn btn-primary flex-1"
                >
                  {starting ? 'Preparing Test...' : 'Enter Secure Test'}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
