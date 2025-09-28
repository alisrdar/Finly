import React from "react";
import { Github, Twitter, Linkedin } from "lucide-react";
import Logo from "./Logo";
import { useNavigate } from "react-router-dom";

const Footer: React.FC = () => {
    const navigate = useNavigate();

    return (
        <footer className="relative mt-12">

            <div className="relative border-t border-border bg-card/80 backdrop-blur-sm">
                <div className=" mx-auto px-6 py-12">
                    {/* Main footer content */}
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-8">
                        {/* Brand section */}
                        <div className="md:col-span-3 col-span-2">
                            <div className="flex items-center space-x-3 mb-4" onClick={() => navigate('/dashboard')}>
                                <Logo />
                            </div>
                            <p className="text-muted-foreground mb-4 max-w-md">
                                Your intelligent financial companion. Track expenses, manage income, and achieve your financial goals with ease.
                            </p>
                            <div className="flex space-x-4">
                                <a target="_blank" href="https://x.com/alisardar07" className="w-8 h-8 bg-hover-muted hover:bg-primary rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110">
                                    <Twitter className="w-4 h-4 text-muted-foreground hover:text-white" />
                                </a>
                                <a target="_blank" href="https://github.com/alisrdar" className="w-8 h-8 bg-hover-muted hover:bg-primary rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110">
                                    <Github className="w-4 h-4 text-muted-foreground hover:text-white" />
                                </a>
                                <a target="_blank" href="https://www.linkedin.com/in/alisrdar5870" className="w-8 h-8 bg-hover-muted hover:bg-primary rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110">
                                    <Linkedin className="w-4 h-4 text-muted-foreground hover:text-white" />
                                </a>
                            </div>
                        </div>

                        {/* Links section */}
                        <div>
                            <h3 className="font-semibold text-foreground mb-4">Product</h3>
                            <ul className="space-y-2">
                                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Features</a></li>
                                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Dashboard</a></li>
                                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Analytics</a></li>
                                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Reports</a></li>
                            </ul>
                        </div>

                        {/* Support section */}
                        <div>
                            <h3 className="font-semibold text-foreground mb-4">Support</h3>
                            <ul className="space-y-2">
                                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Help Center</a></li>
                                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</a></li>
                                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Terms of Service</a></li>
                                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Contact Us</a></li>
                            </ul>
                        </div>
                    </div>

                    {/* Bottom section */}
                    <div className="pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center">
                        <div className="text-muted-foreground text-sm mb-4 md:mb-0">
                            © 2025 Finly V1· Built with ❤️ by Muhammad Ali · All rights reserved.
                        </div>
                        {/* <div className="flex items-center space-x-6 text-sm">
                            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Status</a>
                            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">API</a>
                            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Changelog</a>
                        </div> */}
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;