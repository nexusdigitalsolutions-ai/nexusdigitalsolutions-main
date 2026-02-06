import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

import logoImg from '@/assets/logo.png';
import SiteInfo from '@/data/SiteInfo.json';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const aiModules = [
    { href: '/capability-system', label: 'Capability System' },
    { href: '/predictive-maintenance', label: 'Predictive Maintenance' },
    { href: '/vendor-verse', label: 'Vendor Verse' },
    { href: '/eval-sphere', label: 'Eval Sphere' },
    { href: '/proposal-management-ai', label: 'Proposal Management AI' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 transform-gpu backface-hidden ${isScrolled ? 'bg-background/95 backdrop-blur-md shadow-sm border-b border-border/50' : 'bg-transparent'
          }`}
      >
        <nav className="section-container" aria-label="Main navigation">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3" aria-label="Nexus Digital Solutions home">
              <img
                src={logoImg}
                alt="Nexus Digital Solutions"
                className="w-10 h-10 rounded-full object-cover border border-primary/20"
              />
              <span className="text-lg font-bold text-foreground hidden sm:block">
                Nexus
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {/* AI Usecase Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setIsDropdownOpen(true)}
                onMouseLeave={() => setIsDropdownOpen(false)}
              >
                <button
                  className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 group py-2"
                  aria-expanded={isDropdownOpen}
                >
                  AI Usecase
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-2 w-64 p-2 rounded-xl border border-border/50 bg-background/95 backdrop-blur-xl shadow-xl flex flex-col gap-1 overflow-hidden"
                    >
                      {aiModules.map((module) => (
                        <Link
                          key={module.href}
                          to={module.href}
                          className="px-4 py-3 text-sm text-muted-foreground hover:text-foreground hover:bg-primary/10 rounded-lg transition-colors duration-200 block text-center"
                        >
                          {module.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* CTA */}
              <a
                href={`https://mail.google.com/mail/?view=cm&fs=1&to=${SiteInfo.email}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2 rounded-full border border-primary/50 text-primary text-sm font-medium hover:bg-primary/10 transition-all duration-300"
              >
                Contact
              </a>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden p-2 text-foreground"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-expanded={isMobileMenuOpen}
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </nav>

      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="md:hidden fixed inset-0 top-16 bg-background/95 backdrop-blur-lg z-40 overflow-y-auto"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            style={{ height: 'calc(100vh - 4rem)' }}
          >
            <nav className="flex flex-col items-center justify-start py-10 h-full gap-8" aria-label="Mobile navigation">

              {/* Mobile AI Usecase Dropdown */}
              <div className="w-full px-8 flex flex-col items-center">
                <button
                  onClick={() => setIsMobileDropdownOpen(!isMobileDropdownOpen)}
                  className="flex items-center gap-2 text-2xl text-foreground font-medium mb-4"
                >
                  AI Usecase
                  <ChevronDown className={`w-5 h-5 transition-transform duration-200 ${isMobileDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {isMobileDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="flex flex-col gap-4 text-center overflow-hidden w-full"
                    >
                      {aiModules.map((module) => (
                        <Link
                          key={module.href}
                          to={module.href}
                          className="text-lg text-muted-foreground hover:text-foreground py-2"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {module.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <a
                href={`https://mail.google.com/mail/?view=cm&fs=1&to=${SiteInfo.email}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 rounded-full border border-primary text-primary font-medium mt-4"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>)
}
