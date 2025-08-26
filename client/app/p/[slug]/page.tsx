'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Shield, User, Mail } from 'lucide-react';
import { testAPI, studentAPI, attemptAPI } from '../../../lib/api';

export default function StudentEntryPage() {
  const params = useParams();
  const router = useRouter();
  const [test, setTest] = useState<any>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(true);
  const [starting, setStarting] = useState(false);

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
      // Create/get student
      const uid = `${email}_${Date.now()}`;
      const studentResponse = await studentAPI.create(name, email, uid);
      const student = studentResponse.data;

      // Start attempt
      const attemptResponse = await attemptAPI.start(student.id, test.id);
      const attempt = attemptResponse.data;

      // Redirect to secure test environment
      router.push(`/test/${params.slug}?attemptId=${attempt.id}&studentId=${student.id}`);
    } catch (error) {
      console.error('Failed to start test:', error);
      alert('Failed to start test');
    } finally {
      setStarting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!test) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Test Not Found</h1>
          <p className="text-gray-600 mt-2">The test you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-primary-600 text-white py-4">
        <div className="max-w-4xl mx-auto px-4 flex items-center">
          <Shield className="h-6 w-6 mr-2" />
          <span className="font-semibold">SecureWrap Protected Test</span>
        </div>
      </div>

      <div className="max-w-2xl mx-auto p-6">
        <div className="card">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{test.title}</h1>
            <p className="text-gray-600">
              This is a monitored test environment. Please read the instructions carefully.
            </p>
          </div>

          {/* Instructions */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <h2 className="font-semibold text-yellow-800 mb-2">⚠️ Important Instructions</h2>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>• This test will run in fullscreen mode</li>
              <li>• Do not switch tabs or exit fullscreen - violations will be recorded</li>
              <li>• Ensure you have a stable internet connection</li>
              <li>• Do not use any external help or resources</li>
              <li>• Your activity will be monitored throughout the test</li>
            </ul>
          </div>

          {/* Student Info Form */}
          <form onSubmit={handleStart} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <User className="h-5 w-5 text-gray-400" />
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
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <Mail className="h-5 w-5 text-gray-400" />
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

            <div className="flex items-center">
              <input
                type="checkbox"
                required
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label className="ml-2 text-sm text-gray-700">
                I understand and agree to the monitoring conditions
              </label>
            </div>

            <button
              type="submit"
              disabled={starting}
              className="btn btn-primary w-full"
            >
              {starting ? 'Starting Test...' : 'Start Secure Test'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
