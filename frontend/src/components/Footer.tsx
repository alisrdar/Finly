import React from "react";
import { DollarSign } from "lucide-react";

const Footer: React.FC = () => (
    <footer className="border-t border-border py-8 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-6 md:mb-0">
                <div className="w-8 h-8 bg-secondary rounded-lg flex items-center justify-center">
                    <DollarSign className="w-5 h-5 text-secondary-foreground font-bold" />
                </div>
                <span className="text-xl font-bold text-foreground">Finley</span>
            </div>
            <div className="flex space-x-8 text-muted-foreground">
                <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
                <a href="#" className="hover:text-foreground transition-colors">Terms</a>
                <a href="#" className="hover:text-foreground transition-colors">Support</a>
            </div>
        </div>
        <div className="text-center mt-4 text-muted-foreground">
            © 2025 Finley. All rights reserved.
        </div>
    </footer>
);
export default Footer