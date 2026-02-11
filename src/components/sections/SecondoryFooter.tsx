
import SiteInfo from '@/data/SiteInfo.json';
const SecondoryFooter = () => {
    return (
        <footer className="relative py-12 border-t border-border/50">
            <div className="section-container text-center">
                <p className="text-muted-foreground text-sm">
                    © 2025 {SiteInfo.name}. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default SecondoryFooter;