import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface PageTransitionContextType {
    isTransitioning: boolean;
    startTransition: (path: string, text?: string) => void;
    isLoading: boolean;
    loadingText: string;
}

const PageTransitionContext = createContext<PageTransitionContextType | undefined>(undefined);

export function PageTransitionProvider({ children, navigate }: { children: ReactNode, navigate: (path: string) => void }) {
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [loadingText, setLoadingText] = useState('Initializing...');
    const location = useLocation();

    // Auto-hide loader when location changes (fallback safety)
    useEffect(() => {
        if (isTransitioning) {
            // Small delay to ensure new page has mounted minimally
            const timer = setTimeout(() => {
                setIsTransitioning(false);
            }, 500);
            return () => clearTimeout(timer);
        }
    }, [location]);

    const startTransition = (path: string, text: string = 'Initializing System...') => {
        setIsTransitioning(true);
        setLoadingText(text);

        // Wait for enter animation (300ms) then navigate
        setTimeout(() => {
            navigate(path);
            // isTransitioning set to false by useEffect above after route change
        }, 600);
    };

    return (
        <PageTransitionContext.Provider value={{ isTransitioning, isLoading: isTransitioning, startTransition, loadingText }}>
            {children}
        </PageTransitionContext.Provider>
    );
}

export function usePageTransition() {
    const context = useContext(PageTransitionContext);
    if (context === undefined) {
        throw new Error('usePageTransition must be used within a PageTransitionProvider');
    }
    return context;
}
