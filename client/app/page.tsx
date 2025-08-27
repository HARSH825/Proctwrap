import Link from 'next/link';
import { Shield, Users, Clock, CheckCircle, Zap, Eye, Lock, ArrowRight } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen hero-section">
      {/* Navigation */}
      <nav className="relative z-10">
        <div className="glassmorphism mx-4 mt-4">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-r from-primary-600 to-accent rounded-lg">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white">SecureWrap</h1>
                  <p className="text-text-muted text-xs">Anti-Cheating Platform</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Link href="/login" className="text-text-secondary hover:text-accent transition-colors font-medium">
                  Login
                </Link>
                <Link href="/register" className="btn btn-primary">
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 pt-20 pb-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <h1 className="text-6xl md:text-7xl font-bold text-white mb-8 leading-tight">
              Make your
              <br />
              <span className="text-gradient">forms secure</span>
            </h1>
            <p className="text-xl md:text-2xl text-text-secondary mb-12 max-w-4xl mx-auto leading-relaxed">
              SecureWrap is a fully managed anti-cheating wrapper and monitoring 
              system for your existing Google Forms, enabling comprehensive violation detection 
              and flexible security policies directly from your dashboard.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/register" className="btn btn-primary text-lg px-8 py-4 group">
                Try SecureWrap now
                <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/demo" className="btn btn-outline text-lg px-8 py-4">
                Test SecureWrap's protection
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="relative z-10 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="stats-card text-center floating-card">
              <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Shield className="h-8 w-8 text-background" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Universal Protection</h3>
              <p className="text-text-secondary">Works with Google Forms, Microsoft Forms, and any web-based assessment platform</p>
            </div>
            
            <div className="stats-card text-center floating-card">
              <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Zap className="h-8 w-8 text-background" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Instant Setup</h3>
              <p className="text-text-secondary">Paste your form URL and get a secure, protected link in just 30 seconds</p>
            </div>
            
            <div className="stats-card text-center floating-card">
              <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8 text-background" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Zero Installation</h3>
              <p className="text-text-secondary">Students take tests in their browser with no downloads or software required</p>
            </div>
            
            <div className="stats-card text-center floating-card">
              <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Eye className="h-8 w-8 text-background" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Real-time Monitoring</h3>
              <p className="text-text-secondary">Advanced AI-powered violation detection with detailed analytics and reporting</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="glassmorphism p-8">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="flex items-center space-x-3 mb-4 md:mb-0">
                <div className="p-2 bg-accent rounded-lg">
                  <Shield className="h-6 w-6 text-background" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">SecureWrap</h3>
                  <p className="text-text-muted text-sm">Securing online assessments worldwide</p>
                </div>
              </div>
              <p className="text-text-muted text-center md:text-right">
                © 2025 SecureWrap. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
