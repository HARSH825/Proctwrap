'use client';
import { JSX, useState } from 'react';
import Link from 'next/link';
import { Shield, Users, Clock, CheckCircle, Zap, Eye, Lock, ArrowRight, Star, Award, Monitor, AlertTriangle, Camera, Smartphone, TabletSmartphone, Chrome, MessageSquare, Quote } from 'lucide-react';

export default function HomePage() {
  const platformTabs = [
    { name: "Google Forms", key: "google" },
    { name: "Microsoft Forms", key: "microsoft" },
    { name: "Custom Forms", key: "custom" },
    { name: "LMS Integration", key: "lms" },
    { name: "Any Platform", key: "any" }
  ];
  const [activePlatform, setActivePlatform] = useState(platformTabs[0].key);

  const platformContent: Record<string, JSX.Element> = {
    google: (
      <div className="card-gradient max-w-3xl mx-auto text-center">
        <div className="mb-6">
          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Shield className="h-8 w-8 text-primary" />
          </div>
          <h3 className="text-xl font-semibold text-text mb-2">Google Forms + Proctorap</h3>
          <p className="text-text-secondary">Your existing form, now with enterprise-grade security.</p>
        </div>
        <div className="bg-background/50 rounded-lg p-6 mb-6">
          <div className="text-sm text-text-muted mb-2">Setup Process:</div>
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-text-secondary">1. Paste your Google Form URL</span>
              <span className="text-primary">✓ Done</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-text-secondary">2. Configure monitoring settings</span>
              <span className="text-primary">✓ 10 seconds</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-text-secondary">3. Get your secure link</span>
              <span className="text-primary">✓ Ready!</span>
            </div>
          </div>
        </div>
        <Link href="/register" className="btn btn-primary">Secure My Google Forms</Link>
      </div>
    ),
    microsoft: (
      <div className="card-gradient max-w-3xl mx-auto text-center">
        <div className="mb-6">
          <div className="w-16 h-16 bg-blue-600/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Shield className="h-8 w-8 text-blue-500" />
          </div>
          <h3 className="text-xl font-semibold text-text mb-2">Microsoft Forms + Proctorap</h3>
          <p className="text-text-secondary">Advanced proctoring for Microsoft Forms, activated in seconds.</p>
        </div>
        <div className="bg-background/50 rounded-lg p-6 mb-6">
          <div className="text-sm text-text-muted mb-2">Setup Process:</div>
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-text-secondary">1. Enter your Microsoft Forms link</span>
              <span className="text-primary">✓ Done</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-text-secondary">2. Select monitoring options</span>
              <span className="text-primary">✓ Instant</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-text-secondary">3. Distribute secure link</span>
              <span className="text-primary">✓ Ready!</span>
            </div>
          </div>
        </div>
        <Link href="/register" className="btn btn-primary">Secure My Microsoft Forms</Link>
      </div>
    ),
    custom: (
      <div className="card-gradient max-w-3xl mx-auto text-center">
        <div className="mb-6">
          <div className="w-16 h-16 bg-orange-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Shield className="h-8 w-8 text-orange-500" />
          </div>
          <h3 className="text-xl font-semibold text-text mb-2">Custom Forms + Proctorap</h3>
          <p className="text-text-secondary">Secure Typeform, SurveyMonkey, or any online assessment instantly.</p>
        </div>
        <div className="bg-background/50 rounded-lg p-6 mb-6">
          <div className="text-sm text-text-muted mb-2">Setup Process:</div>
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-text-secondary">1. Paste your form/quiz URL</span>
              <span className="text-primary">✓ Any platform</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-text-secondary">2. Choose violations to monitor</span>
              <span className="text-primary">✓ Flexible</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-text-secondary">3. Launch secure test</span>
              <span className="text-primary">✓ Now protected</span>
            </div>
          </div>
        </div>
        <Link href="/register" className="btn btn-primary">Secure My Custom Forms</Link>
      </div>
    ),
    lms: (
      <div className="card-gradient max-w-3xl mx-auto text-center">
        <div className="mb-6">
          <div className="w-16 h-16 bg-green-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Shield className="h-8 w-8 text-green-500" />
          </div>
          <h3 className="text-xl font-semibold text-text mb-2">LMS Integration</h3>
          <p className="text-text-secondary">Easily integrate with Canvas, Moodle or other learning management systems.</p>
        </div>
        <div className="bg-background/50 rounded-lg p-6 mb-6">
          <div className="text-sm text-text-muted mb-2">Setup Process:</div>
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-text-secondary">1. Request LMS plugin/API</span>
              <span className="text-primary">✓ One time</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-text-secondary">2. Enable security layers</span>
              <span className="text-primary">✓ Simple</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-text-secondary">3. Launch proctored exam</span>
              <span className="text-primary">✓ Done</span>
            </div>
          </div>
        </div>
        <Link href="/contact" className="btn btn-primary">Request LMS Integration</Link>
      </div>
    ),
    any: (
      <div className="card-gradient max-w-3xl mx-auto text-center">
        <div className="mb-6">
          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Shield className="h-8 w-8 text-primary" />
          </div>
          <h3 className="text-xl font-semibold text-text mb-2">Any Assessment Platform</h3>
          <p className="text-text-secondary">If it's web-based, Proctorap can protect it.</p>
        </div>
        <div className="bg-background/50 rounded-lg p-6 mb-6">
          <div className="text-sm text-text-muted mb-2">Setup Process:</div>
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-text-secondary">1. Paste your link</span>
              <span className="text-primary">✓ Instantly</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-text-secondary">2. Activate monitoring</span>
              <span className="text-primary">✓ 1-click</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-text-secondary">3. Get reports</span>
              <span className="text-primary">✓ Auto</span>
            </div>
          </div>
        </div>
        <Link href="/register" className="btn btn-primary">Start for Free</Link>
      </div>
    ),
  };

  const detectionFeatures = [
    {
      icon: <TabletSmartphone className="h-5 w-5" />,
      label: "Tab Switching",
      description: "Detects when students switch browser tabs"
    },
    {
      icon: <Monitor className="h-5 w-5" />,
      label: "Fullscreen Exit",
      description: "Monitors fullscreen mode violations"
    },
    {
      icon: <Monitor className="h-5 w-5" />,
      label: "Evidence Capture",
      description: "Captures screenshots of candidates screen on every violation."
    },
    {
      icon: <Camera className="h-5 w-5" />,
      label: "Multiple Faces",
      description: "AI identifies multiple people on screen"
    },
    {
      icon: <Smartphone className="h-5 w-5" />,
      label: "Phone Detection",
      description: "Recognizes mobile device usage"
    },
    {
      icon: <Chrome className="h-5 w-5" />,
      label: "Browser Focus",
      description: "Tracks window focus and activity"
    },
    {
      icon: <Eye className="h-5 w-5" />,
      label: "Multiple desktop checks",
      description: "Checks for any remote/shared desktop constantly"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-surface to-background">
      {/* Navigation */}
      <nav className="border-b border-surface-light bg-surface/50 backdrop-blur-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold text-gradient">Proctorap</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-text-secondary hover:text-primary transition-colors text-sm font-medium">Features</a>
              <a href="#how-it-works" className="text-text-secondary hover:text-primary transition-colors text-sm font-medium">How it Works</a>
              <a href="#why-choose" className="text-text-secondary hover:text-primary transition-colors text-sm font-medium">Why Choose</a>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/login" className="text-text-secondary hover:text-primary transition-colors text-sm font-medium">
                Sign In
              </Link>
              <Link href="/register" className="btn btn-primary">
                Get Started Free
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8">
              <Zap className="h-4 w-4 text-primary mr-2" />
              <span className="text-sm font-medium text-primary"> Now in Early Access - Be Among the First!</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-text mb-6 leading-tight">
              Stop Cheating Before It 
              <span className="text-gradient block lg:inline"> Even Starts</span>
            </h1>
            <p className="text-lg text-text-secondary mb-8 max-w-2xl mx-auto leading-relaxed">
              Transform any online test into a secure, AI-monitored assessment in under 30 seconds. Works with Google Forms, Microsoft Forms, and any web platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link href="/register" className="btn btn-primary px-8 py-4 text-base">
                Join Early Access
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link href="#demo" className="btn btn-outline px-8 py-4 text-base">
                Watch Demo (2 min)
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">30s</div>
                <div className="text-sm text-text-muted">Setup Time</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">Real-Time</div>
                <div className="text-sm text-text-muted">AI Detection</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">Zero</div>
                <div className="text-sm text-text-muted">Downloads</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">7</div>
                <div className="text-sm text-text-muted">Detection Types</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works - Before/After Transformation */}
      <section id="how-it-works" className="py-20 bg-surface/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-text mb-4">
              See The Transformation
            </h2>
            <p className="text-text-secondary max-w-2xl mx-auto">
              Watch how Proctorap instantly converts any regular online test into a secure, monitored assessment
            </p>
          </div>
          
          {/* Browsers Section */}
          <div className="flex items-center justify-center space-x-8 mb-16 max-w-7xl mx-auto">
            
            {/* Step 1: Original Unsecured Test */}
            <div className="text-center flex-shrink-0 w-96">
              <div className="bg-surface border-2 border-danger/30 rounded-lg overflow-hidden shadow-lg mb-4">
                {/* Browser Header */}
                <div className="bg-surface-light px-4 py-3 border-b border-surface-light flex items-center space-x-2">
                  <div className="flex space-x-1">
                    <div className="w-3 h-3 bg-danger rounded-full"></div>
                    <div className="w-3 h-3 bg-warning rounded-full"></div>
                    <div className="w-3 h-3 bg-success rounded-full"></div>
                  </div>
                  <div className="flex-1 bg-background rounded px-3 py-2 text-sm text-text-muted truncate">
                    https://forms.google.com/test-quiz
                  </div>
                  <div className="bg-danger/20 text-danger text-sm px-3 py-1 rounded border border-danger/30">
                    UNSECURED
                  </div>
                </div>
                {/* Browser Content */}
                <div className="p-6 bg-background h-64">
                  <h3 className="text-lg font-semibold text-text mb-4">Final Exam - Chemistry</h3>
                  <div className="space-y-3">
                    <div className="text-sm text-text-secondary">Question 1: What is the molecular formula for water?</div>
                    <div className="flex space-x-2">
                      <input type="radio" className="mt-1" />
                      <label className="text-sm text-text-secondary">A) H2O</label>
                    </div>
                    <div className="flex space-x-2">
                      <input type="radio" className="mt-1" />
                      <label className="text-sm text-text-secondary">B) CO2</label>
                    </div>
                    <div className="flex space-x-2">
                      <input type="radio" className="mt-1" />
                      <label className="text-sm text-text-secondary">C) NaCl</label>
                    </div>
                    <div className="flex space-x-2">
                      <input type="radio" className="mt-1" />
                      <label className="text-sm text-text-secondary">D) CH4</label>
                    </div>
                  </div>
                </div>
              </div>
              <h4 className="font-semibold text-text mb-2">Regular Test</h4>
              <p className="text-sm text-text-secondary">Vulnerable to cheating</p>
            </div>

            {/* Arrow */}
            <div className="flex justify-center flex-shrink-0">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <ArrowRight className="h-8 w-8 text-primary" />
                </div>
                <div className="text-sm font-medium text-primary">Wrap SAME test link with Proctorap</div>
              </div>
            </div>

            {/* Step 2: Proctorap Secured Test - Same size as left */}
            <div className="text-center flex-shrink-0 w-96">
              <div className="bg-surface border-2 border-success/30 rounded-lg overflow-hidden shadow-lg mb-4">
                {/* Browser Header */}
                <div className="bg-surface-light px-4 py-3 border-b border-surface-light flex items-center space-x-2">
                  <div className="flex space-x-1">
                    <div className="w-3 h-3 bg-danger rounded-full"></div>
                    <div className="w-3 h-3 bg-warning rounded-full"></div>
                    <div className="w-3 h-3 bg-success rounded-full"></div>
                  </div>
                  <div className="flex-1 bg-background rounded px-3 py-2 text-sm text-text-muted truncate">
                    https://proctorap.com/secure/abc123
                  </div>
                  <div className="flex space-x-1">
                    <div className="bg-success/20 text-success text-sm px-2 py-1 rounded border border-success/30">
                      SECURED
                    </div>
                    <div className="bg-primary/20 text-primary text-sm px-2 py-1 rounded border border-primary/30">
                      MONITORED
                    </div>
                  </div>
                </div>
                {/* Browser Content */}
                <div className="p-6 bg-background h-64">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-text">Final Exam - Chemistry</h3>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-success rounded-full"></div>
                      <span className="text-sm text-success">LIVE</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="text-sm text-text-secondary">Question 1: What is the molecular formula for water?</div>
                    <div className="flex space-x-2">
                      <input type="radio" className="mt-1" />
                      <label className="text-sm text-text-secondary">A) H2O</label>
                    </div>
                    <div className="flex space-x-2">
                      <input type="radio" className="mt-1" />
                      <label className="text-sm text-text-secondary">B) CO2</label>
                    </div>
                    <div className="flex space-x-2">
                      <input type="radio" className="mt-1" />
                      <label className="text-sm text-text-secondary">C) NaCl</label>
                    </div>
                    <div className="flex space-x-2">
                      <input type="radio" className="mt-1" />
                      <label className="text-sm text-text-secondary">D) CH4</label>
                    </div>
                  </div>
                  {/* Monitoring indicators */}
                  <div className="mt-4 flex items-center space-x-4 text-xs">
                    <div className="flex items-center space-x-1">
                      <Camera className="h-3 w-3 text-success" />
                      <span className="text-text-muted">Camera Active</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Eye className="h-3 w-3 text-success" />
                      <span className="text-text-muted">Screen Monitor</span>
                    </div>
                  </div>
                </div>
              </div>
              <h4 className="font-semibold text-text mb-2">Proctorap Protected</h4>
              <p className="text-sm text-text-secondary">Same test, now secure</p>
            </div>
          </div>

          {/* Step 3: Admin Dashboard */}
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-6">
              <ArrowRight className="h-6 w-6 text-primary mx-auto mb-2 rotate-90" />
              <h4 className="font-semibold text-text">Real-Time Monitoring Dashboard</h4>
            </div>
            
            <div className="bg-surface border border-surface-light rounded-lg overflow-hidden shadow-lg">
              {/* Dashboard Header */}
              <div className="bg-surface-light px-6 py-3 border-b border-surface-light">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-text">Final Exam - Chemistry | Live Session</h3>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-text-secondary">6 Students Online</span>
                    <div className="w-2 h-2 bg-success rounded-full"></div>
                  </div>
                </div>
              </div>
              
              {/* Student List */}
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  
                  {/* Student 1 - Clean */}
                  <div className="bg-background border border-success/30 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-medium text-text">Sarah Johnson</div>
                      <div className="w-2 h-2 bg-success rounded-full"></div>
                    </div>
                    <div className="text-sm text-text-secondary mb-2">Violations: 0</div>
                    <div className="text-xs text-success">Status: Clean</div>
                  </div>

                  {/* Student 2 - Violations */}
                  <div className="bg-background border border-warning/30 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-medium text-text">Mike Chen</div>
                      <div className="w-2 h-2 bg-warning rounded-full"></div>
                    </div>
                    <div className="text-sm text-text-secondary mb-2">Violations: 3</div>
                    <button className="text-xs bg-warning/20 text-warning px-2 py-1 rounded border border-warning/30 hover:bg-warning/30 transition-colors">
                      Show Evidence
                    </button>
                  </div>

                  {/* Student 3 - High Risk */}
                  <div className="bg-background border border-danger/30 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-medium text-text">Alex Rivera</div>
                      <div className="w-2 h-2 bg-danger rounded-full"></div>
                    </div>
                    <div className="text-sm text-text-secondary mb-2">Violations: 7</div>
                    <button className="text-xs bg-danger/20 text-danger px-2 py-1 rounded border border-danger/30 hover:bg-danger/30 transition-colors">
                      Show Evidence
                    </button>
                  </div>

                  {/* Student 4 - Clean */}
                  <div className="bg-background border border-success/30 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-medium text-text">Emma Davis</div>
                      <div className="w-2 h-2 bg-success rounded-full"></div>
                    </div>
                    <div className="text-sm text-text-secondary mb-2">Violations: 0</div>
                    <div className="text-xs text-success">Status: Clean</div>
                  </div>

                  {/* Student 5 - Minor Violations */}
                  <div className="bg-background border border-warning/30 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-medium text-text">John Smith</div>
                      <div className="w-2 h-2 bg-warning rounded-full"></div>
                    </div>
                    <div className="text-sm text-text-secondary mb-2">Violations: 1</div>
                    <button className="text-xs bg-warning/20 text-warning px-2 py-1 rounded border border-warning/30 hover:bg-warning/30 transition-colors">
                      Show Evidence
                    </button>
                  </div>

                  {/* Student 6 - Clean */}
                  <div className="bg-background border border-success/30 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-medium text-text">Lisa Wang</div>
                      <div className="w-2 h-2 bg-success rounded-full"></div>
                    </div>
                    <div className="text-sm text-text-secondary mb-2">Violations: 0</div>
                    <div className="text-xs text-success">Status: Clean</div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Integration Section (tabs) */}
      <section className="py-20 bg-surface/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-text mb-4">
              Works With Any Assessment Platform
            </h2>
            <p className="text-text-secondary max-w-2xl mx-auto">
              Proctorap seamlessly integrates with your existing tools - no migration needed
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            {/* Platform Tabs (interactive) */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {platformTabs.map((platform) => (
                <button
                  key={platform.key}
                  className={`px-6 py-3 rounded-lg font-medium text-sm transition-all
                    ${activePlatform === platform.key
                      ? 'bg-primary text-background'
                      : 'bg-surface text-text-secondary hover:bg-surface-light'}
                  `}
                  onClick={() => setActivePlatform(platform.key)}
                  type="button"
                >
                  {platform.name}
                </button>
              ))}
            </div>
            {/* Render tab content */}
            {platformContent[activePlatform]}
          </div>
        </div>
      </section>

      {/* AI Detection Features */}
      <section id="features" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-text mb-4">
              Advanced AI-Powered Detection
            </h2>
            <p className="text-text-secondary max-w-2xl mx-auto">
              Our intelligent monitoring system catches cheating attempts in real-time
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Detection Features */}
            <div className="space-y-6">
              {detectionFeatures.map((feature, index) => (
                <div key={feature.label} className="flex items-start space-x-4 p-4 rounded-lg hover:bg-surface/50 transition-colors">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-text mb-1">{feature.label}</h4>
                    <p className="text-sm text-text-secondary">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
            {/* Live Demo Visualization */}
            <div className="relative">
              <div className="card-gradient p-8">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-success/10 border border-success/20 mb-4">
                    <div className="w-2 h-2 bg-success rounded-full mr-2"></div>
                    <span className="text-xs font-medium text-success">Live Monitoring</span>
                  </div>
                  <h4 className="font-semibold text-text">Real-Time Assessment</h4>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-surface/50 rounded-lg">
                    <span className="text-sm text-text-secondary">Student Focus Level</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-16 h-2 bg-surface rounded-full overflow-hidden">
                        <div className="w-3/4 h-full bg-success rounded-full"></div>
                      </div>
                      <span className="text-xs text-success font-medium">94%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-surface/50 rounded-lg">
                    <span className="text-sm text-text-secondary">Tab Switches</span>
                    <span className="text-sm font-medium text-danger">2 detected</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-surface/50 rounded-lg">
                    <span className="text-sm text-text-secondary">Face Recognition</span>
                    <span className="text-sm font-medium text-success">Single person ✓</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-surface/50 rounded-lg">
                    <span className="text-sm text-text-secondary">Risk Score</span>
                    <span className="text-sm font-medium text-warning">Low Risk</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Proctorap Section */}
      <section id="why-choose" className="py-20 bg-surface/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-text mb-4">
              Why Choose Proctorap?
            </h2>
            <p className="text-text-secondary max-w-2xl mx-auto">
              Built by developers who understand the real challenges of online assessment security
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="stats-card text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-text mb-2">Lightning Fast Setup</h3>
              <p className="text-text-secondary">
                No complex installations or configurations. Just paste your test URL and you're secured in 30 seconds.
              </p>
            </div>
            
            <div className="stats-card text-center">
              <div className="w-16 h-16 bg-success/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Eye className="h-8 w-8 text-success" />
              </div>
              <h3 className="text-xl font-semibold text-text mb-2">Advanced AI Detection</h3>
              <p className="text-text-secondary">
                Our machine learning algorithms detect cheating patterns that humans might miss, in real-time.
              </p>
            </div>
            
            <div className="stats-card text-center">
              <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-text mb-2">Privacy Focused</h3>
              <p className="text-text-secondary">
                We only monitor what's necessary for security. No unnecessary data collection or privacy violations.
              </p>
            </div>
            
            <div className="stats-card text-center">
              <div className="w-16 h-16 bg-warning/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-warning" />
              </div>
              <h3 className="text-xl font-semibold text-text mb-2">Scale Ready</h3>
              <p className="text-text-secondary">
                From 5 students to 5,000. Our infrastructure grows with your needs without missing a beat.
              </p>
            </div>
            
            <div className="stats-card text-center">
              <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold text-text mb-2">Real-Time </h3>
              <p className="text-text-secondary">
                Get instant evidence/s when violations occur, so you can take action immediately.
              </p>
            </div>
            
            <div className="stats-card text-center">
              <div className="w-16 h-16 bg-green-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
              <h3 className="text-xl font-semibold text-text mb-2">Evidence Based</h3>
              <p className="text-text-secondary">
                Every violation comes with timestamped evidence, so you have proof when you need it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Fun Anti-Cheater Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-text mb-2">
              Users <span className="relative text-danger">
                <s>Love</s> Hate
              </span> Us!
            </h2>

            <p className="text-text-secondary max-w-xl mx-auto">
              And that's exactly how we know it's working. Here's what frustrated cheaters are saying...
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
            <div className="stats-card text-center p-6">
              <div className="text-3xl mb-4">😡</div>
              <p className="text-text-secondary text-base mb-0">"This thing caught me switching tabs in 2 seconds!"</p>
            </div>
            <div className="stats-card text-center p-6">
              <div className="text-3xl mb-4">🤬</div>
              <p className="text-text-secondary text-base mb-0">"Even incognito mode doesn't work. How is this possible?!"</p>
            </div>
            <div className="stats-card text-center p-6">
              <div className="text-3xl mb-4">😈</div>
              <p className="text-text-secondary text-base mb-0">"It detected my phone under the desk. AI is getting scary."</p>
            </div>
            <div className="stats-card text-center p-6">
              <div className="text-3xl mb-4">😭</div>
              <p className="text-text-secondary text-base mb-0">"Third attempt, still getting caught. Time to actually study..."</p>
            </div>
            <div className="stats-card text-center p-6">
              <div className="text-3xl mb-4">🙄</div>
              <p className="text-text-secondary text-base mb-0">"Okay fine, this actually works. Respect."</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-surface/30">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="glassmorphism">
            <h2 className="text-3xl font-bold text-text mb-4">
              Ready to Secure Your Tests?
            </h2>
            <p className="text-text-secondary mb-8 max-w-2xl mx-auto">
              Join our early access program and be among the first to experience next-generation online assessment security. No credit card required.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/register" className="btn btn-primary px-8 py-4">
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link href="/contact" className="btn btn-outline px-8 py-4">
                Schedule Demo
              </Link>
            </div>
            <div className="mt-6 text-sm text-text-muted">
              Free 14-day trial • No setup fees • Cancel anytime
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-surface-light bg-surface/50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <Shield className="h-6 w-6 text-primary" />
                <span className="text-lg font-bold text-gradient">Proctorap</span>
              </div>
              <p className="text-text-secondary mb-4">
                The next-generation anti-cheating solution for online assessments. Secure, intelligent, and easy to use.
              </p>
            </div>
            
          </div>
          <div className="border-t border-surface-light mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-text-muted">
              © 2025 Proctorap. All rights reserved.
            </div>
          
          </div>
        </div>
      </footer>
      
    </div>
  );
}
