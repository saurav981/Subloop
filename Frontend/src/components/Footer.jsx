import { Link } from 'react-router-dom';
import {
  Mail,
  Twitter,
  Github,
  Linkedin,
  MessageCircle,
  Shield,
  FileText,
  HelpCircle,
  Heart,
  ArrowUp,
  ExternalLink,
} from 'lucide-react';
import { useState, useEffect } from 'react';

const appName = import.meta.env.VITE_APP_NAME || 'Subloop';

const socialLinks = [
  { icon: Twitter, label: 'Twitter', href: 'https://x.com/sauravhldr' },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/saurav-halder',
  },
  {
    icon: Github,
    label: 'GitHub',
    href: 'https://github.com/saurav981/Subloop',
  },
  { icon: Mail, label: 'Email', href: 'mailto:hello@subloop.com' },
];

// const quickLinks = [
//   { label: 'About Us', to: '/about' },
//   { label: 'Features', to: '/features' },
//   { label: 'Pricing', to: '/pricing' },
// ];
const quickLinks = [
  { label: 'About Us', to: '#' },
  { label: 'Features', to: '#' },
  { label: 'Pricing', to: '#' },
];

// const legalLinks = [
//   { label: 'Privacy Policy', to: '/privacy', icon: Shield },
//   { label: 'Terms of Service', to: '/terms', icon: FileText },
//   { label: 'Help Center', to: '/help', icon: HelpCircle },
// ];
const legalLinks = [
  { label: 'Privacy Policy', to: '#', icon: Shield },
  { label: 'Terms of Service', to: '#', icon: FileText },
  { label: 'Help Center', to: '#', icon: HelpCircle },
];

export const Footer = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const iconLinkClass =
    'group p-2 rounded-lg hover:bg-base-300/50 transition hover:scale-110';
  const iconClass =
    'text-base-content/60 group-hover:text-primary transition-colors duration-200';
  const linkClass =
    'group flex items-center space-x-2 text-sm text-base-content/70 hover:text-primary transition-colors duration-200';

  return (
    <footer className="relative bg-base-200/50 backdrop-blur-sm border-t border-base-300/20 text-sm px-2">
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 p-3 rounded-full bg-primary text-white dark:text-black shadow-lg hover:shadow-xl hover:scale-110 transition"
          aria-label="Scroll to top"
        >
          <ArrowUp size={18} />
        </button>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-10 lg:py-14">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="text-2xl font-bold text-primary">{appName}</div>
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              </div>
              <p className="text-sm text-base-content/70 mb-6 max-w-md leading-relaxed">
                Send direct messages to your favorite influencers without
                waiting forever. Connect instantly and build meaningful
                relationships.
              </p>

              <div className="flex items-center space-x-4">
                {socialLinks.map(({ icon: Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    className={iconLinkClass}
                    aria-label={label}
                  >
                    <Icon size={18} className={iconClass} />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-base font-semibold text-base-content mb-4">
                Quick Links
              </h3>
              <ul className="space-y-3">
                {quickLinks.map(({ label, to }) => (
                  <li key={label}>
                    <Link to={to} className={linkClass}>
                      <span>{label}</span>
                      <ExternalLink
                        size={12}
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      />
                    </Link>
                  </li>
                ))}
                <li>
                  <Link to="/contact" className={linkClass}>
                    <MessageCircle size={14} />
                    <span>Contact</span>
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-base font-semibold text-base-content mb-4">
                Legal & Support
              </h3>
              <ul className="space-y-3">
                {legalLinks.map(({ label, to, icon: Icon }) => (
                  <li key={label}>
                    <Link to={to} className={linkClass}>
                      <Icon size={14} />
                      <span>{label}</span>
                    </Link>
                  </li>
                ))}
                <li>
                  <a href="mailto:support@subloop.com" className={linkClass}>
                    <Mail size={14} />
                    <span>Support</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-base-300/20 py-6">
          <div className="flex flex-col md:flex-row items-center justify-center gap-3">
            <span className="text-sm text-base-content/60">
              © {currentYear} {appName}. All rights reserved.
            </span>
            <span className="text-sm text-base-content/60 flex items-center space-x-1">
              <span>Made with</span>
              <Heart size={14} className="text-red-500 animate-pulse" />
              <span>for creators</span>
            </span>
          </div>
        </div>

        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      </div>
    </footer>
  );
};
