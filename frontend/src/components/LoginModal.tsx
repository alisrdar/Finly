import { useState } from "react";
import { EyeOff, Eye } from "lucide-react";

const LoginModal: React.FC<{ show: boolean; onClose: () => void; onSignUp: () => void }> = ({
    show,
    onClose,
    onSignUp
}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = () => {
        alert('Login functionality would be implemented here');
    };

    if (!show) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-card border-border border rounded-2xl p-8 w-full max-w-md backdrop-blur-lg">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-foreground">Welcome Back</h2>
                    <button
                        onClick={onClose}
                        className="text-muted-foreground hover:text-foreground transition-colors text-2xl"
                    >
                        ×
                    </button>
                </div>

                <div className="space-y-4">
                    <div>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-muted border-border border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-secondary transition-colors"
                        />
                    </div>

                    <div className="relative">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-muted border-border border rounded-lg px-4 py-3 pr-12 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-secondary transition-colors"
                        />
                        <button
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                        >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>

                    <button
                        onClick={handleLogin}
                        className="w-full gradient-primary text-primary-foreground py-3 rounded-lg font-semibold hover:opacity-90 transition-all duration-200 transform hover:scale-105"
                    >
                        Sign In
                    </button>
                </div>

                <div className="mt-6 text-center">
                    <span className="text-muted-foreground">Don't have an account? </span>
                    <button
                        onClick={() => {
                            onClose();
                            onSignUp();
                        }}
                        className="text-secondary hover:opacity-80 transition-colors font-medium"
                    >
                        Sign up
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LoginModal