import { motion } from 'framer-motion';
import { Heart, Github, Linkedin, Twitter } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="relative py-16 border-t border-border/50"
      role="contentinfo"
    >
      <div className="section-container">
        <div className="flex flex-col items-center text-center">
          {/* Main message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <p className="text-2xl md:text-3xl font-light text-foreground mb-2">
              Designing AI for{' '}
              <span className="font-semibold gradient-text">Humans</span>
            </p>
            <p className="text-lg text-muted-foreground">
              Not Just Users
            </p>
          </motion.div>

          {/* Logo / Brand */}
          <motion.div
            className="flex items-center gap-2 mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Heart className="w-5 h-5 text-primary" aria-hidden="true" />
            </div>
            <span className="text-xl font-bold text-foreground">
              Nexus Digital Solutions
            </span>
          </motion.div>

          {/* Social Links */}
          <motion.div
            className="flex items-center gap-4 mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <a
              href="#"
              className="w-10 h-10 rounded-full bg-muted/50 flex items-center justify-center text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors duration-300"
              aria-label="Follow us on Twitter"
            >
              <Twitter className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-full bg-muted/50 flex items-center justify-center text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors duration-300"
              aria-label="Follow us on LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-full bg-muted/50 flex items-center justify-center text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors duration-300"
              aria-label="View our GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
          </motion.div>

          {/* Navigation Links */}
          <motion.nav
            className="flex flex-wrap justify-center gap-6 mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            aria-label="Footer navigation"
          >
            <a href="#applications" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Applications
            </a>
            <a href="#capabilities" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Capabilities
            </a>
            <a href="#technology" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Technology
            </a>
            <a href="#accessibility" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Accessibility
            </a>
          </motion.nav>

          {/* Copyright */}
          <motion.p
            className="text-sm text-muted-foreground"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            © {currentYear} Nexus Digital Solutions. All rights reserved.
          </motion.p>
        </div>
      </div>

      {/* Decorative gradient line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
    </footer>
  );
}
