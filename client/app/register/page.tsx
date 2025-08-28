'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Shell, User, Mail, Lock, AlertCircle, CheckCircle } from 'lucide-react';
import { authAPI } from '../../lib/api';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      await authAPI.register(name, email, password);
      setSuccess(true);
      setTimeout(() => {
        router.push('/login');
      }, 2000);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen hero-section flex items-center justify-center p-4">
        <div className="card text-center max-w-md mx-auto">
          <div className="inline-flex items-center justify-center p-4 bg-gradient-to-r from-success to-primary rounded-2xl mb-6">
            <CheckCircle className="h-12 w-12 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-text mb-4">Account Created!</h2>
          <p className="text-text-secondary mb-4">
            Welcome to Proctorap! Redirecting you to login...
          </p>
          <div className="loading-spinner w-8 h-8 mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen hero-section flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-primary to-primary-light rounded-2xl mb-4">
            <Shell className="h-10 w-10 text-background" />
          </div>
          <h1 className="text-3xl font-bold text-gradient mb-2">Create Account</h1>
          <p className="text-text-secondary">Join Proctorap and start protecting your forms</p>
        </div>

        {/* Register Form */}
        <div className="card">
          {error && (
            <div className="alert alert-danger mb-6">
              <div className="flex items-center">
                <AlertCircle className="h-5 w-5 mr-3" />
                <p className="text-sm">{error}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-text mb-2">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center">
                  <User className="h-5 w-5 text-text-muted" />
                </div>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="form-input pl-12"
                  placeholder="Enter your full name"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-text mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center">
                  <Mail className="h-5 w-5 text-text-muted" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-input pl-12"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-text mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center">
                  <Lock className="h-5 w-5 text-text-muted" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-input pl-12"
                  placeholder="Create a password"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-text mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center">
                  <Lock className="h-5 w-5 text-text-muted" />
                </div>
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="form-input pl-12"
                  placeholder="Confirm your password"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-full py-3"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="loading-spinner w-5 h-5 mr-2"></div>
                  Creating Account...
                </div>
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-text-secondary">
              Already have an account?{' '}
              <Link href="/login" className="text-primary hover:text-primary-light font-medium">
                Sign in here
              </Link>
            </p>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <Link href="/" className="text-text-muted hover:text-primary text-sm">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
