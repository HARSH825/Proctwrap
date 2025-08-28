'use client';

import { useState, useEffect } from 'react';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import { Plus, ExternalLink, Users, AlertTriangle, FileText, TrendingUp, CheckCircle } from 'lucide-react';
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
      
      await navigator.clipboard.writeText(protectedUrl);
      
      // Show success animation
      const successDiv = document.createElement('div');
      successDiv.className = 'fixed inset-0 bg-green-600 bg-opacity-90 flex items-center justify-center z-50';
      successDiv.innerHTML = `
        <div class="card text-center max-w-md mx-4">
          <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h3 class="text-xl font-bold mb-2" style="color: var(--color-text)">Protected Link Created!</h3>
          <p class="mb-4" style="color: var(--color-text-secondary)">Link copied to clipboard successfully</p>
          <div class="bg-surface-light p-3 rounded-lg text-sm break-all" style="color: var(--color-text)">${protectedUrl}</div>
        </div>
      `;
      document.body.appendChild(successDiv);
      
      setTimeout(() => {
        document.body.removeChild(successDiv);
      }, 4000);
      
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

  const handleCopyLink = async (slug: string, event: React.MouseEvent<HTMLButtonElement>) => {
    const button = event.currentTarget;
    const originalText = button.innerHTML;
    
    try {
      const protectedUrl = `https://proctorap.harshdev.cloud/p/${slug}`;
      await navigator.clipboard.writeText(protectedUrl);
      
      button.innerHTML = '✓ Copied!';
      button.className = 'btn btn-success';
      
      setTimeout(() => {
        button.innerHTML = originalText;
        button.className = 'btn btn-primary';
      }, 2000);
    } catch (error) {
      console.error('Failed to copy link:', error);
    }
  };

  if (loading) {
    return (
      <DashboardLayout title="Dashboard">
        <div className="flex items-center justify-center h-64">
          <div className="loading-spinner h-16 w-16"></div>
        </div>
      </DashboardLayout>
    );
  }

  const totalAttempts = tests.reduce((sum, test) => sum + test.attempts.length, 0);
  const totalViolations = tests.reduce((sum, test) => 
    sum + test.attempts.reduce((attemptSum, attempt) => 
      attemptSum + attempt.tabSwitchCount + attempt.fullscreenExitCount + 
      attempt.multipleFacesCount + attempt.phoneDetectionCount, 0
    ), 0
  );
  const completedAttempts = tests.reduce((sum, test) => 
    sum + test.attempts.filter(attempt => attempt.finishedAt).length, 0
  );

  return (
    <DashboardLayout title="Dashboard">
      <div className="space-y-8">
        {/* Stats Overview */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
  <div className="stats-card">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-text-muted uppercase tracking-wide">Total Tests</p>
        <p className="text-2xl font-bold text-text mt-1">{tests.length}</p>
      </div>
      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
        <FileText className="h-5 w-5 text-primary" />
      </div>
    </div>
  </div>
  
  <div className="stats-card">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-text-muted uppercase tracking-wide">Total Attempts</p>
        <p className="text-2xl font-bold text-text mt-1">{totalAttempts}</p>
      </div>
      <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
        <Users className="h-5 w-5 text-accent" />
      </div>
    </div>
  </div>
  
  <div className="stats-card">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-text-muted uppercase tracking-wide">Total Violations</p>
        <p className="text-2xl font-bold text-danger mt-1">{totalViolations}</p>
      </div>
      <div className="w-10 h-10 bg-danger/10 rounded-lg flex items-center justify-center">
        <AlertTriangle className="h-5 w-5 text-danger" />
      </div>
    </div>
  </div>
  
  <div className="stats-card">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-text-muted uppercase tracking-wide">Completed</p>
        <p className="text-2xl font-bold text-success mt-1">{completedAttempts}</p>
      </div>
      <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
        <CheckCircle className="h-5 w-5 text-success" />
      </div>
    </div>
  </div>
</div>


        {/* Create Test Section */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold" style={{ color: 'var(--color-text)' }}>Create Protected Test</h2>
              <p style={{ color: 'var(--color-text-secondary)' }} className="mt-1">Transform any form into a secure, monitored assessment</p>
            </div>
            <button
              onClick={() => setShowCreateForm(!showCreateForm)}
              className="btn btn-primary"
            >
              <Plus className="h-5 w-5 mr-2" />
              New Test
            </button>
          </div>

          {showCreateForm && (
            <form onSubmit={handleCreateTest} className="space-y-6 mt-6 p-6 rounded-xl" style={{ backgroundColor: 'var(--color-surface-light)' }}>
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-text)' }}>
                  Test Title
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="form-input"
                  placeholder="Enter a descriptive title for your test"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-text)' }}>
                  Form URL (Google Forms or Microsoft Forms)
                </label>
                <input
                  type="url"
                  required
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="form-input"
                  placeholder="https://forms.google.com/d/..."
                />
              </div>
              
              <div className="flex space-x-4">
                <button
                  type="submit"
                  disabled={creating}
                  className="btn btn-primary flex-1"
                >
                  {creating ? 'Creating Protected Link...' : 'Create Protected Link'}
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
          <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--color-text)' }}>Your Tests</h2>
          
          {tests.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="h-16 w-16 mx-auto mb-4" style={{ color: 'var(--color-text-muted)' }} />
              <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--color-text)' }}>No tests created yet</h3>
              <p className="mb-6" style={{ color: 'var(--color-text-secondary)' }}>Create your first protected test to get started</p>
              <button
                onClick={() => setShowCreateForm(true)}
                className="btn btn-primary"
              >
                <Plus className="h-5 w-5 mr-2" />
                Create Your First Test
              </button>
            </div>
          ) : (
            <div className="grid gap-6">
              {tests.map((test) => (
                <div 
                  key={test.id} 
                  className="rounded-xl border p-6 hover:shadow-md transition-shadow"
                  style={{ 
                    backgroundColor: 'var(--color-surface-light)',
                    borderColor: 'var(--color-surface-light)'
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--color-text)' }}>{test.title}</h3>
                      <p className="text-sm mb-4" style={{ color: 'var(--color-text-secondary)' }}>
                        Created: {new Date(test.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                      <div className="flex items-center space-x-6">
                        <div className="flex items-center space-x-2">
                          <Users className="h-4 w-4 text-blue-600" />
                          <span className="text-sm font-medium" style={{ color: 'var(--color-text-secondary)' }}>
                            {test.attempts.length} attempts
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <AlertTriangle className="h-4 w-4 text-yellow-600" />
                          <span className="text-sm font-medium" style={{ color: 'var(--color-text-secondary)' }}>
                            {test.attempts.reduce((total, attempt) => 
                              total + attempt.tabSwitchCount + attempt.fullscreenExitCount + 
                              attempt.multipleFacesCount + attempt.phoneDetectionCount, 0
                            )} violations
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <TrendingUp className="h-4 w-4 text-green-600" />
                          <span className="text-sm font-medium" style={{ color: 'var(--color-text-secondary)' }}>
                            {test.attempts.filter(attempt => attempt.finishedAt).length} completed
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <a
                        href={`/dashboard/test/${test.id}`}
                        className="btn btn-secondary"
                      >
                        View Analytics
                      </a>
                      <button
                        onClick={(event) => handleCopyLink(test.slug, event)}
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
