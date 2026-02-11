import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import logoImg from '@/assets/logo.png';
import SiteInfo from '@/data/SiteInfo.json';
import { motion } from "framer-motion";
const SecondoryNav = () => {
    return (
        <motion.header
            className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50"
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
        >
            <nav className="section-container" aria-label="Anti-Gravity navigation">
                <div className="flex items-center justify-between h-16 md:h-20">
                    <Link
                        to="/"
                        className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-200 group"
                        aria-label="Back to home"
                    >
                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-200" />
                        <span className="text-sm font-medium">Back to Home</span>
                    </Link>

                    {/* Logo */}
                    <div className="flex items-center gap-3">
                        <img
                            src={logoImg}
                            alt={SiteInfo.name}
                            className="w-10 h-10 rounded-full object-cover border border-primary/20"
                        />
                        <span className="text-lg font-bold text-foreground hidden sm:block">
                            {SiteInfo.name}
                        </span>
                    </div>
                </div>
            </nav>
        </motion.header>
    );
};

export default SecondoryNav;