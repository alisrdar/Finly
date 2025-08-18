import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useAuth } from '../../hooks/useAuth';
import { authService } from '../../services/api';
import type { LoginData } from '../../types';
import { FaFacebook, FaEye, FaEyeSlash } from 'react-icons/fa'


const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false)
  const toggleVisiblity = () => setShowPassword((prev) => !prev);
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<LoginData>({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await authService.login(formData);
      login(response.token, response.user);
      toast.success('Login successful!');
      navigate('/dashboard');
    } catch {
      const errorMessage = 'Login failed';
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row-reverse">
      {/* Left image */}
      <div className="md:w-1/2 flex justify-center p-4 sm:p-2 rounded-2xl">
        <img
          src="../login_bg.avif"
          alt=""
          className="h-52 sm:h-64 md:h-full w-full rounded-2xl object-cover"
        />
      </div>

      {/* Right panel */}
      <div className="md:w-1/2 flex flex-col justify-between bg-background p-6 sm:px-8 lg:px-12">
        <div className="flex flex-col items-center justify-center flex-grow md:py-8">
          <div className="max-w-md w-full space-y-6">
            <div>
              <h2 className="text-3xl font-bold text-foreground">
                Welcome back
              </h2>
              <p className="mt-3 text-sm text-secondaryForeground leading-relaxed">
                Track your finances effortlessly. With <span className="font-semibold">Finly</span>, managing your money has never been easier.
              </p>
            </div>

            {/* Form */}
            <form className="space-y-6 w-full sm:w-[96%]" onSubmit={handleSubmit}>
              {/* Email */}
              <div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-accent shadow-sm placeholder-gray-400 text-mutedForeground focus:outline-none focus:ring-2 focus:ring-primary sm:text-sm"
                  placeholder="Email address"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              {/* Password */}
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-accent placeholder-gray-400 text-mutedForeground focus:outline-none focus:ring-2 focus:ring-primary sm:text-sm"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  onClick={toggleVisiblity}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </button>
              </div>

              {/* Forgot Password */}
              <div className="text-right">
                <Link
                  to="/forgot-password"
                  className="text-sm text-primary/90 hover:text-primary"
                >
                  Forgot Password?
                </Link>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2 px-4 rounded-3xl cursor-pointer gradient-primary text-primary-foreground font-bold shadow hover:scale-105 transition-all disabled:opacity-70 text-md " 
              >
                {isLoading ? 'Signing in...' : 'Sign in'}
              </button>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center ">
                  <span className="px-2 bg-background text-muted-foreground text-xs">Or sign in with</span>
                </div>
              </div>

              {/* Social logins */}
              <div className="flex justify-around gap-2 md:flex-col md:gap-3 md:items-center">
                <div className="flex md:w-1/2 md:justify-center border bg-background p-2 px-4 hover:scale-105 hover:bg-background/80 rounded-lg items-center gap-3 cursor-pointer transition-all">
                  <img
                    className="h-6 w-6"
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/google/google-original.svg"
                  />
                  <span className="text-sm text-muted-foreground">Google</span>
                </div>
                <div className="flex md:w-1/2 md:justify-center border bg-background p-2 px-4 hover:scale-105 hover:bg-background/80 rounded-lg items-center gap-3 cursor-pointer transition-all">
                  <FaFacebook className="h-6 w-6 text-blue-500" />
                  <span className="text-sm text-muted-foreground">Facebook</span>
                </div>
              </div>

              {/* Signup link */}
              <div className="text-center">
                <span className="text-sm text-gray-600">
                  Don’t have an account?{' '}
                  <Link
                    to="/signUp"
                    className="font-medium text-primary/90 hover:text-primary"
                  >
                    Sign up here
                  </Link>
                </span>
              </div>
            </form>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center py-4 text-xs text-gray-400 border-t">
          © 2025 ALL RIGHTS RESERVED
        </footer>
      </div>
    </div>


  );
};

export default Login;

