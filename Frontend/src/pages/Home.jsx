// import { Link } from 'react-router-dom';
// import { useAuthStore } from '../store/authStore';
import {
  MessageCircle,
  Zap,
  Users,
  ArrowRight,
  CheckCircle,
  Star,
  Sparkles,
  Heart,
  TrendingUp,
  DollarSign,
  Shield,
  Target,
  Smartphone,
  Globe,
  BarChart3,
  Wallet,
  Crown,
} from 'lucide-react';
import { useAuthStore } from '../store/authStore';

const appName = import.meta.env.VITE_APP_NAME || 'Subloop';

// Feature data
const features = [
  {
    icon: MessageCircle,
    title: 'Direct Access',
    description:
      'Connect directly with your favorite influencers without the noise',
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Get responses in minutes, not days. Skip the endless waiting',
  },
  {
    icon: Users,
    title: 'Verified Network',
    description: 'Access a curated network of authentic content creators',
  },
];

// Benefits data
const benefits = [
  'Earn 90% of every payment from fans',
  'No upfront costs - only pay when you earn',
  'Built specifically for 1-10K follower creators',
  'Direct fan connections without middlemen',
];

// Stats data
const stats = [
  { number: '362M+', label: 'Potential Users' },
  { number: '49%', label: 'Nano Influencers' },
  { number: '90%', label: 'Creator Revenue' },
  { number: '1-10K', label: 'Follower Range' },
];

// Problem-solution data
const problems = [
  {
    problem: 'Limited monetization options for nano influencers',
    solution: 'Direct fan-to-creator payment system',
  },
  {
    problem: 'Brands ignore creators with <10K followers',
    solution: 'Bypass traditional sponsorship gatekeepers',
  },
  {
    problem: 'Complex revenue sharing with high platform fees',
    solution: 'Keep 90% of earnings, pay only when you earn',
  },
];

// How it works data
const howItWorks = [
  {
    step: '1',
    title: 'Creator Signs Up',
    description: 'Nano influencers create their profile and set chat rates',
    icon: Users,
  },
  {
    step: '2',
    title: 'Fan Discovers',
    description: 'Fans find creators and pay for direct chat access',
    icon: MessageCircle,
  },
  {
    step: '3',
    title: 'Chat & Earn',
    description: 'Creators chat with fans and earn 90% of payments',
    icon: Zap,
  },
];

// Testimonials data
const testimonials = [
  {
    name: 'Priya Sharma',
    role: 'Lifestyle Creator',
    followers: '3.2K',
    content:
      'Finally, a way to monetize my content without needing brand deals. My followers love the direct connection!',
    earnings: '₹15,000/month',
  },
  {
    name: 'Rahul Gupta',
    role: 'Tech Reviewer',
    followers: '8.5K',
    content:
      'Subloop helped me turn my passion into income. The 90% revenue share is incredible compared to other platforms.',
    earnings: '₹25,000/month',
  },
  {
    name: 'Sneha Patel',
    role: 'Food Blogger',
    followers: '5.8K',
    content:
      'My fans were already asking for personal advice. Now I can help them and earn money doing what I love.',
    earnings: '₹12,000/month',
  },
];

// Pricing tiers for creators
const pricingTiers = [
  {
    name: 'Starter',
    price: 'Free',
    description: 'Perfect for new creators',
    features: [
      'Create profile',
      'Set chat rates',
      'Basic analytics',
      '90% revenue share',
    ],
    highlighted: false,
  },
  {
    name: 'Growth',
    price: '₹199/month',
    description: 'For growing creators',
    features: [
      'Everything in Starter',
      'Priority support',
      'Advanced analytics',
      'Custom branding',
      'Promotional tools',
    ],
    highlighted: true,
  },
  {
    name: 'Pro',
    price: '₹499/month',
    description: 'For established creators',
    features: [
      'Everything in Growth',
      'Dedicated manager',
      'Early feature access',
      'Cross-platform promotion',
      'Revenue optimization',
    ],
    highlighted: false,
  },
];

export const Home = () => {
  const { isAuthenticated, user } = useAuthStore();

  const firstName =
    isAuthenticated && user?.fullName ? user.fullName.split(' ')[0] : '';

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-100 via-base-200 to-base-300 mt-5">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-1000" />

        <div className="relative container mx-auto px-4 py-20 lg:py-32">
          <div className="max-w-4xl mx-auto text-center">
            {/* Welcome Badge */}
            {isAuthenticated && firstName && (
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6 animate-fade-in">
                <Heart className="w-4 h-4" />
                Welcome back, {firstName}!
              </div>
            )}

            {/* Main Headline */}
            <h1 className="text-[2.5rem] md:text-6xl lg:text-7xl font-bold leading-tight mb-6 animate-fade-in-up">
              Monetize Your
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {' '}
                Nano Influence{' '}
              </span>
              Today
            </h1>

            {/* Subheadline */}
            <p className="text-xl md:text-2xl text-base-content/70 mb-8 max-w-3xl mx-auto animate-fade-in-up delay-200">
              Join the platform built for creators with 1-10K followers. Connect
              with fans, earn 90% revenue, and grow your community without brand
              deals.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 animate-fade-in-up delay-300">
              <a
                href={isAuthenticated ? '/dashboard' : '/signup'}
                className="btn btn-primary btn-lg text-lg px-8 group hover:scale-105 transition-transform"
              >
                {isAuthenticated ? 'Go to Dashboard' : 'Start Earning Now'}
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </a>

              <button className="btn btn-outline btn-lg text-lg px-8 hover:scale-105 transition-transform">
                See How It Works
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center items-center gap-8 text-base-content/50 animate-fade-in-up delay-400">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-success" />
                <span>90% revenue share</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-warning" />
                <span>Nano influencer focused</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                <span>No upfront fees</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-base-200/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-2xl bg-base-100 shadow-lg hover:shadow-xl transition-shadow animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  {stat.number}
                </div>
                <div className="text-base-content/70">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Built for Nano Influencers
            </h2>
            <p className="text-xl text-base-content/70 max-w-3xl mx-auto">
              While others chase celebrity influencers, we focus on you - the
              authentic creators with engaged communities of 1-10K followers.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group p-8 rounded-2xl bg-gradient-to-br from-base-100 to-base-200 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 animate-fade-in-up"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-base-content/70">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-r from-primary/5 to-secondary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">
                Turn Your Followers Into Income
              </h2>
              <p className="text-xl text-base-content/70">
                Start monetizing your content today with the platform designed
                for nano influencers
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                {benefits.map((benefit, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-4 rounded-xl bg-base-100/50 backdrop-blur-sm animate-fade-in-up"
                    style={{ animationDelay: `${index * 150}ms` }}
                  >
                    <div className="w-8 h-8 bg-success/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-5 h-5 text-success" />
                    </div>
                    <span className="text-lg">{benefit}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-center">
                <div className="relative">
                  <div className="w-64 h-64 bg-gradient-to-br from-primary to-secondary rounded-3xl shadow-2xl animate-float" />
                  <div className="absolute inset-4 bg-base-100 rounded-2xl flex items-center justify-center">
                    <DollarSign className="w-16 h-16 text-primary" />
                  </div>
                  <div className="absolute -top-4 -right-4 bg-success text-success-content px-3 py-1 rounded-full text-sm font-bold">
                    90%
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem-Solution Section */}
      <section className="py-20 bg-base-100">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">
                The Problem Nano Influencers Face
              </h2>
              <p className="text-xl text-base-content/70 max-w-3xl mx-auto">
                49% of Instagram accounts have 1-10K followers, yet they're
                ignored by brands. With 362.9M users in India alone, that's a
                massive untapped market.
              </p>
            </div>

            <div className="space-y-8">
              {problems.map((item, index) => (
                <div
                  key={index}
                  className="grid md:grid-cols-2 gap-8 items-center animate-fade-in-up"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className={`${index % 2 === 1 ? 'md:order-2' : ''}`}>
                    <div className="p-8 bg-error/10 rounded-2xl border-l-4 border-error">
                      <h3 className="text-2xl font-bold text-error mb-4">
                        Problem
                      </h3>
                      <p className="text-lg text-base-content/80">
                        {item.problem}
                      </p>
                    </div>
                  </div>

                  <div className={`${index % 2 === 1 ? 'md:order-1' : ''}`}>
                    <div className="p-8 bg-success/10 rounded-2xl border-l-4 border-success">
                      <h3 className="text-2xl font-bold text-success mb-4">
                        Solution
                      </h3>
                      <p className="text-lg text-base-content/80">
                        {item.solution}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">
                How {appName} Works
              </h2>
              <p className="text-xl text-base-content/70">
                Simple, transparent, and designed to help creators succeed
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 relative">
              {/* Connection lines */}
              <div className="hidden md:block absolute top-1/2 left-1/3 w-1/3 h-0.5 bg-primary/30 -translate-y-1/2" />
              <div className="hidden md:block absolute top-1/2 right-1/3 w-1/3 h-0.5 bg-primary/30 -translate-y-1/2" />

              {howItWorks.map((step, index) => (
                <div
                  key={index}
                  className="relative text-center animate-fade-in-up"
                  style={{ animationDelay: `${index * 300}ms` }}
                >
                  {/* Step number */}
                  <div className="w-16 h-16 bg-primary text-primary-content rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6 shadow-lg">
                    {step.step}
                  </div>

                  {/* Content */}
                  <div className="p-6 bg-base-100 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <step.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                    <p className="text-base-content/70">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Market Opportunity Section */}
      <section className="py-20 bg-base-200">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-5xl font-bold mb-6">
                  Massive Market Opportunity
                </h2>
                <p className="text-xl text-base-content/70 mb-8">
                  India's social media landscape is booming, and nano
                  influencers represent the largest untapped segment for
                  authentic brand connections.
                </p>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Globe className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">
                        362.9M Monthly Active Users
                      </h3>
                      <p className="text-base-content/70">
                        India's Instagram user base continues to grow
                        exponentially
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-success/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <TrendingUp className="w-6 h-6 text-success" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">
                        49% Are Nano Influencers
                      </h3>
                      <p className="text-base-content/70">
                        Nearly half of all accounts have 1-10K followers
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-warning/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Target className="w-6 h-6 text-warning" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">
                        Higher Engagement Rates
                      </h3>
                      <p className="text-base-content/70">
                        Nano influencers have 60% higher engagement than macro
                        influencers
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-primary to-primary/80 p-6 rounded-2xl text-primary-content">
                    <BarChart3 className="w-8 h-8 mb-4" />
                    <div className="text-2xl font-bold">177M+</div>
                    <div className="text-sm opacity-90">
                      Potential nano influencers
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-success to-success/80 p-6 rounded-2xl text-success-content">
                    <Wallet className="w-8 h-8 mb-4" />
                    <div className="text-2xl font-bold">₹1000Cr+</div>
                    <div className="text-sm opacity-90">
                      Untapped market value
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-warning to-warning/80 p-6 rounded-2xl text-warning-content">
                    <Smartphone className="w-8 h-8 mb-4" />
                    <div className="text-2xl font-bold">3.2x</div>
                    <div className="text-sm opacity-90">
                      Higher conversion rates
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-secondary to-secondary/80 p-6 rounded-2xl text-secondary-content">
                    <Crown className="w-8 h-8 mb-4" />
                    <div className="text-2xl font-bold">90%</div>
                    <div className="text-sm opacity-90">
                      Revenue share for creators
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-base-100">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">
                Real Creators, Real Results
              </h2>
              <p className="text-xl text-base-content/70">
                See how nano influencers are transforming their passion into
                profit
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-base-200 to-base-300 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in-up"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <Users className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{testimonial.name}</h3>
                      <p className="text-sm text-base-content/70">
                        {testimonial.role}
                      </p>
                      <p className="text-sm text-primary">
                        {testimonial.followers} followers
                      </p>
                    </div>
                  </div>

                  <blockquote className="text-base-content/80 mb-6 italic">
                    "{testimonial.content}"
                  </blockquote>

                  <div className="flex justify-between items-center">
                    <div className="flex text-warning">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <div className="text-success font-semibold">
                      {testimonial.earnings}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-gradient-to-br from-base-200 to-base-300">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">
                Choose Your Growth Plan
              </h2>
              <p className="text-xl text-base-content/70">
                Start free, upgrade when you're ready to scale
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {pricingTiers.map((tier, index) => (
                <div
                  key={index}
                  className={`relative p-8 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-2 ${
                    tier.highlighted
                      ? 'bg-gradient-to-br from-primary to-primary/80 text-primary-content ring-4 ring-primary/20'
                      : 'bg-base-100'
                  } animate-fade-in-up`}
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  {tier.highlighted && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <div className="bg-warning text-warning-content px-4 py-2 rounded-full text-sm font-semibold">
                        Most Popular
                      </div>
                    </div>
                  )}

                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
                    <div className="text-4xl font-bold mb-2">{tier.price}</div>
                    <p
                      className={
                        tier.highlighted
                          ? 'text-primary-content/80'
                          : 'text-base-content/70'
                      }
                    >
                      {tier.description}
                    </p>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {tier.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-center gap-3"
                      >
                        <CheckCircle
                          className={`w-5 h-5 ${
                            tier.highlighted
                              ? 'text-primary-content'
                              : 'text-success'
                          }`}
                        />
                        <span
                          className={
                            tier.highlighted
                              ? 'text-primary-content/90'
                              : 'text-base-content/80'
                          }
                        >
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <button
                    className={`w-full py-3 px-6 rounded-lg font-semibold transition-all ${
                      tier.highlighted
                        ? 'bg-base-100 text-primary hover:bg-base-200'
                        : 'bg-primary text-primary-content hover:bg-primary/90'
                    }`}
                  >
                    {tier.price === 'Free' ? 'Start Free' : 'Upgrade Now'}
                  </button>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <p className="text-base-content/70">
                <Shield className="w-4 h-4 inline mr-2" />
                30-day money-back guarantee • No setup fees • Cancel anytime
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Ready to Transform Your Connections?
            </h2>
            <p className="text-xl text-base-content/70 mb-8">
              Join {appName} today and start building meaningful relationships
              with your favorite influencers
            </p>

            <a
              href={isAuthenticated ? '/dashboard' : '/signup'}
              className="btn btn-primary btn-lg text-xl px-12 group hover:scale-105 transition-transform"
            >
              {isAuthenticated ? 'Open Dashboard' : 'Start Free Trial'}
              <ArrowRight className="w-6 h-6 ml-2 group-hover:translate-x-1 transition-transform" />
            </a>

            <p className="text-sm text-base-content/50 mt-4">
              No credit card required • 14-day free trial • Cancel anytime
            </p>
          </div>
        </div>
      </section>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out;
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .delay-200 {
          animation-delay: 200ms;
        }
        .delay-300 {
          animation-delay: 300ms;
        }
        .delay-400 {
          animation-delay: 400ms;
        }
        .delay-1000 {
          animation-delay: 1000ms;
        }
      `}</style>
    </div>
  );
};
