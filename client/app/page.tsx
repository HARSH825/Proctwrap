import Link from 'next/link';
import { Shield, Users, Clock, CheckCircle } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Shield className="h-8 w-8 text-primary-600" />
              <span className="ml-2 text-xl font-bold">SecureWrap</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/login" className="text-gray-600 hover:text-gray-900">
                Login
              </Link>
              <Link href="/register" className="btn btn-primary">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Universal Anti-Cheating
              <br />
              <span className="text-primary-200">Wrapper for Online Forms</span>
            </h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Turn any Google Forms or Microsoft Forms into a secure, monitored exam environment. 
              No software installation required. Get protected links in 30 seconds.
            </p>
            <Link href="/register" className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Start Free Trial
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Why Choose SecureWrap?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              The easiest way to add comprehensive anti-cheating protection to your existing forms
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <Shield className="h-12 w-12 text-primary-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Universal Protection</h3>
              <p className="text-gray-600">Works with Google Forms, Microsoft Forms, and any web-based form</p>
            </div>
            
            <div className="text-center">
              <Clock className="h-12 w-12 text-primary-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">30-Second Setup</h3>
              <p className="text-gray-600">Paste your form URL, get a protected link instantly</p>
            </div>
            
            <div className="text-center">
              <Users className="h-12 w-12 text-primary-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Installation</h3>
              <p className="text-gray-600">Students take tests in their browser - no downloads required</p>
            </div>
            
            <div className="text-center">
              <CheckCircle className="h-12 w-12 text-primary-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Real-time Monitoring</h3>
              <p className="text-gray-600">Advanced violation detection with detailed reporting</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card text-center">
              <div className="bg-primary-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-primary-600 font-bold">1</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Paste Your Form URL</h3>
              <p className="text-gray-600">Copy any Google Forms or Microsoft Forms link</p>
            </div>
            
            <div className="card text-center">
              <div className="bg-primary-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-primary-600 font-bold">2</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Get Protected Link</h3>
              <p className="text-gray-600">Receive a secure SecureWrap link instantly</p>
            </div>
            
            <div className="card text-center">
              <div className="bg-primary-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-primary-600 font-bold">3</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Monitor & Report</h3>
              <p className="text-gray-600">Watch real-time violations and get detailed reports</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center mb-4">
            <Shield className="h-6 w-6 text-primary-400" />
            <span className="ml-2 text-lg font-bold">SecureWrap</span>
          </div>
          <p className="text-gray-400">© 2025 SecureWrap. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
