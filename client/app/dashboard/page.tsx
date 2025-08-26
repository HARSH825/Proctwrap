'use client';

import { useState, useEffect } from 'react';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import { Plus, ExternalLink, Users, Clock, AlertTriangle, FileText } from 'lucide-react';
import { testAPI } from '../../lib/api';
import { auth } from '../../lib/auth';
import { Test } from '../../types';

export default function DashboardPage() {
  const [tests, setTests] = useState<Test[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    loadTests();
  }, []);

  const loadTests = async () => {
    try {
      const user = auth.getUser();
      if (!user) return;

      const response = await testAPI.getTeacherTests(user.id);
      setTests(response.data);
    } catch (error) {
      console.error('Failed to load tests:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTest = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);

    try {
      const user = auth.getUser();
      if (!user) return;

      const response = await testAPI.create(title, url, user.id);
      const protectedUrl = response.data.url;
      
      // Copy to clipboard
      await navigator.clipboard.writeText(protectedUrl);
      alert(`Protected link created and copied to clipboard!\n${protectedUrl}`);
      
      setTitle('');
      setUrl('');
      setShowCreateForm(false);
      loadTests();
    } catch (error) {
      console.error('Failed to create test:', error);
      alert('Failed to create test');
    } finally {
      setCreating(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout title="Dashboard">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Dashboard">
      <div className="space-y-6">
        {/* Create Test Section */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Create Protected Test</h2>
            <button
              onClick={() => setShowCreateForm(!showCreateForm)}
              className="btn btn-primary"
            >
              <Plus className="h-4 w-4 mr-2" />
              New Test
            </button>
          </div>

          {showCreateForm && (
            <form onSubmit={handleCreateTest} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Test Title
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="form-input"
                  placeholder="Enter test title"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Form URL (Google Forms or Microsoft Forms)
                </label>
                <input
                  type="url"
                  required
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="form-input"
                  placeholder="https://forms.google.com/..."
                />
              </div>
              
              <div className="flex space-x-3">
                <button
                  type="submit"
                  disabled={creating}
                  className="btn btn-primary"
                >
                  {creating ? 'Creating...' : 'Create Protected Link'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowCreateForm(false)}
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Tests List */}
        <div className="card">
          <h2 className="text-lg font-semibold mb-4">Your Tests</h2>
          
          {tests.length === 0 ? (
            <div className="text-center py-8">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No tests created yet</p>
              <p className="text-sm text-gray-500 mt-2">Create your first protected test above</p>
            </div>
          ) : (
            <div className="space-y-4">
              {tests.map((test) => (
                <div key={test.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-medium">{test.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">
                        Created: {new Date(test.createdAt).toLocaleDateString()}
                      </p>
                      <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-1" />
                          {test.attempts.length} attempts
                        </div>
                        <div className="flex items-center">
                          <AlertTriangle className="h-4 w-4 mr-1" />
                          {test.attempts.reduce((total, attempt) => 
                            total + attempt.tabSwitchCount + attempt.fullscreenExitCount + 
                            attempt.multipleFacesCount + attempt.phoneDetectionCount, 0
                          )} violations
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <a
                        href={`/dashboard/test/${test.id}`}
                        className="btn btn-secondary"
                      >
                        View Details
                      </a>
                      <button
                        onClick={async () => {
                          const protectedUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/p/${test.slug}`;
                          await navigator.clipboard.writeText(protectedUrl);
                          alert('Protected link copied to clipboard!');
                        }}
                        className="btn btn-primary"
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Copy Link
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
