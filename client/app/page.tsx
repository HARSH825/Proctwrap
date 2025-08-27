'use client';
import { JSX, useState } from 'react';
import Link from 'next/link';
import { Shield, Users, Clock, CheckCircle, Zap, Eye, Lock, ArrowRight, Star, Award, Monitor, AlertTriangle, Camera, Smartphone, TabletSmartphone, Chrome, MessageSquare, Quote } from 'lucide-react';

export default function HomePage() {
  const testimonials = [
    {
      name: "Dr. Sarah Chen",
      role: "Computer Science Professor",
      university: "Stanford University",
      quote: "Proctorap has revolutionized our online assessments. The AI detection is incredibly accurate and saves us hours of manual monitoring.",
      avatar: "SC"
    },
    {
      name: "Michael Rodriguez",
      role: "Assessment Coordinator", 
      university: "MIT",
      quote: "The seamless integration with Google Forms made our transition effortless. Students can't even tell they're being monitored!",
      avatar: "MR"
    },
    {
      name: "Prof. Emily Watson",
      role: "Department Head",
      university: "Harvard Medical School",
      quote: "We've seen a 85% reduction in academic dishonesty since implementing Proctorap. It's a game-changer.",
      avatar: "EW"
    },
    {
      name: "James Liu",
      role: "IT Director",
      university: "UC Berkeley",
      quote: "Setup took literally 2 minutes. The detailed analytics help us identify patterns and improve our assessment security.",
      avatar: "JL"
    },
    {
      name: "Dr. Amanda Foster",
      role: "Online Learning Director",
      university: "NYU",
      quote: "Our students appreciate the transparent monitoring. It creates a fair environment for everyone.",
      avatar: "AF"
    }
  ];

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
      label: "Eye Tracking",
      description: "Advanced gaze pattern analysis"
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
              <a href="#testimonials" className="text-text-secondary hover:text-primary transition-colors text-sm font-medium">Reviews</a>
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
            {/* <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8">
              <Star className="h-4 w-4 text-primary mr-2" />
              <span className="text-sm font-medium text-primary">Trusted by 1,200+ Educational Institutions</span>
            </div> */}
            <h1 className="text-4xl lg:text-5xl font-bold text-text mb-6 leading-tight">
              Stop Cheating Before It 
              <span className="text-gradient block lg:inline"> Even Starts</span>
            </h1>
            <p className="text-lg text-text-secondary mb-8 max-w-2xl mx-auto leading-relaxed">
              Transform any online form into a secure, AI-monitored assessment in under 30 seconds. Works with Google Forms, Microsoft Forms, and any web platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link href="/register" className="btn btn-primary px-8 py-4 text-base">
                Start Free Trial
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
                <div className="text-2xl font-bold text-primary">94%</div>
                <div className="text-sm text-text-muted">Cheat Prevention</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">Zero</div>
                <div className="text-sm text-text-muted">Downloads</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">Robust</div>
                <div className="text-sm text-text-muted">AI Monitoring</div>
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
      <section className="py-20">
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
      {/* Testimonials Section */}
     {/* Testimonial Section - Cheater & Educator Quotes */}
<section id="testimonials" className="py-20 bg-surface/30">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

    {/* "Our Users Hate Us" */}
    <div className="text-center mb-16">
      <h2 className="text-3xl font-bold text-text mb-2">
        Our Users <span className="relative text-danger">
          <s>Love</s><span className="ml-1">Hate</span></span> Us!
      </h2>
      <p className="text-text-secondary max-w-xl mx-auto">Real quotes from frustrated cheaters — Proctorap stops them in their tracks.</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-20">
      <div className="stats-card text-center p-6">
        <div className="text-3xl mb-4">😡</div>
        <p className="text-text-secondary text-base mb-0">"Who created Proctorap? I just want to 'talk'..."</p>
      </div>
      <div className="stats-card text-center p-6">
        <div className="text-3xl mb-4">🤬</div>
        <p className="text-text-secondary text-base mb-0">"Proctorap is the work of the devil—caught me tab switching twice!"</p>
      </div>
      <div className="stats-card text-center p-6">
        <div className="text-3xl mb-4">😈</div>
        <p className="text-text-secondary text-base mb-0">"How did it know I was on my phone under the table?"</p>
      </div>
      <div className="stats-card text-center p-6">
        <div className="text-3xl mb-4">😭</div>
        <p className="text-text-secondary text-base mb-0">"Third attempt, third time flagged... Impossible to cheat now!"</p>
      </div>
      <div className="stats-card text-center p-6">
        <div className="text-3xl mb-4">🙄</div>
        <p className="text-text-secondary text-base mb-0">"Switched to incognito, it still caught me. Respect."</p>
      </div>
    </div>

    {/* Divider */}
    <div className="flex items-center justify-center my-12">
      <div className="w-1/6 h-px bg-surface-light"></div>
      <span className="mx-4 text-text-muted text-lg font-bold">But Educators Love Us</span>
      <div className="w-1/6 h-px bg-surface-light"></div>
    </div>

    {/* Educator Testimonials */}
    <div className="text-center mb-16">
      <h2 className="text-3xl font-bold text-text mb-4">
        Educators Love Proctorap
      </h2>
      <p className="text-text-secondary max-w-2xl mx-auto">
        Join thousands of satisfied educators who've transformed their online assessments
      </p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[
        {
          name: "Dr. Sarah Chen",
          role: "Computer Science Professor",
          university: "Stanford University",
          quote: "Proctorap has revolutionized our online assessments. The AI detection is incredibly accurate and saves us hours of manual monitoring.",
          avatar: "SC"
        },
        {
          name: "Michael Rodriguez",
          role: "Assessment Coordinator", 
          university: "MIT",
          quote: "The seamless integration with Google Forms made our transition effortless. Students can't even tell they're being monitored!",
          avatar: "MR"
        },
        {
          name: "Prof. Emily Watson",
          role: "Department Head",
          university: "Harvard Medical School",
          quote: "We've seen an 85% reduction in academic dishonesty since implementing Proctorap. It's a game-changer.",
          avatar: "EW"
        },
        {
          name: "James Liu",
          role: "IT Director",
          university: "UC Berkeley",
          quote: "Setup took literally 2 minutes. The detailed analytics help us identify patterns and improve our assessment security.",
          avatar: "JL"
        },
        {
          name: "Dr. Amanda Foster",
          role: "Online Learning Director",
          university: "NYU",
          quote: "Our students appreciate the transparent monitoring. It creates a fair environment for everyone.",
          avatar: "AF"
        }
      ].map((testimonial, idx) => (
        <div key={idx} className="stats-card relative">
          <Quote className="h-6 w-6 text-primary/30 absolute top-4 left-4" />
          <div className="pt-4">
            <p className="text-text-secondary mb-6 italic">"{testimonial.quote}"</p>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                <span className="text-sm font-semibold text-primary">{testimonial.avatar}</span>
              </div>
              <div>
                <div className="font-semibold text-text text-sm">{testimonial.name}</div>
                <div className="text-xs text-text-muted">{testimonial.role}</div>
                <div className="text-xs text-text-muted">{testimonial.university}</div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
    <div className="text-center mt-12">
      <div className="inline-flex items-center space-x-4">
        <div className="flex -space-x-2">{[1,2,3,4,5].map(i => (
          <Star key={i} className="h-5 w-5 text-warning fill-current" />
        ))}</div>
        <span className="text-text-secondary">4.9/5 from 1,200+ educators and partners</span>
      </div>
    </div>
  </div>
</section>

      {/* Statistics Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-text mb-4">
              Proven Results Across Institutions
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users className="h-10 w-10 text-primary" />
              </div>
              <div className="text-3xl font-bold text-text mb-2">50,000+</div>
              <div className="text-text-secondary">Students Monitored</div>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-success/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Shield className="h-10 w-10 text-success" />
              </div>
              <div className="text-3xl font-bold text-text mb-2">94%</div>
              <div className="text-text-secondary">Reduction in Cheating</div>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Clock className="h-10 w-10 text-accent" />
              </div>
              <div className="text-3xl font-bold text-text mb-2">2 min</div>
              <div className="text-text-secondary">Average Setup Time</div>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-warning/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Award className="h-10 w-10 text-warning" />
              </div>
              <div className="text-3xl font-bold text-text mb-2">99.9%</div>
              <div className="text-text-secondary">Uptime Reliability</div>
            </div>
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="glassmorphism">
            <h2 className="text-3xl font-bold text-text mb-4">
              Ready to Eliminate Cheating?
            </h2>
            <p className="text-text-secondary mb-8 max-w-2xl mx-auto">
              Join 1,200+ institutions using Proctorap to maintain academic integrity. Start your free trial today - no credit card required.
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
                The most trusted anti-cheating solution for online assessments. Secure, reliable, and easy to use.
              </p>
              <div className="flex items-center space-x-4">
                <div className="flex -space-x-2">
                  {[1,2,3,4,5].map((i) => (
                    <Star key={i} className="h-4 w-4 text-warning fill-current" />
                  ))}
                </div>
                <span className="text-sm text-text-muted">4.9/5 rating</span>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-text mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-text-secondary">
                <li><a href="#" className="hover:text-primary transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Security</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Integrations</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-text mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-text-secondary">
                <li><a href="#" className="hover:text-primary transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">System Status</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-surface-light mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-text-muted">
              © 2025 Proctorap. All rights reserved.
            </div>
            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-sm text-text-muted hover:text-primary transition-colors">Privacy</a>
              <a href="#" className="text-sm text-text-muted hover:text-primary transition-colors">Terms</a>
              <a href="#" className="text-sm text-text-muted hover:text-primary transition-colors">Security</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
