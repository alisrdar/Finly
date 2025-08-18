import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useAuth } from '../../hooks/useAuth';
import { authService } from '../../services/api';
import type { RegisterData } from '../../types';
import { FaFacebook, FaEye, FaEyeSlash } from 'react-icons/fa';

const SignUp = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const toggleVisibility = () => setShowPassword((prev) => !prev);

  const [formData, setFormData] = useState<RegisterData>({
    fullName: '',
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
      const response = await authService.register(formData);
      login(response.token, response.user);
      toast.success('Account created successfully!');
      navigate('/dashboard');
    } catch {
      toast.error('Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row-reverse">
      {/* Right image */}
      <div className="md:w-1/2 flex justify-center p-4 sm:p-2 rounded-2xl">
        <img
          src="../login_bg.avif"
          alt=""
          className="h-52 sm:h-64 md:h-full w-full rounded-2xl object-cover"
        />
      </div>
      {/* Left panel */}
      <div className="md:w-1/2 flex flex-col justify-between bg-background p-6 sm:px-8 lg:px-12">
        <div className="flex flex-col items-center justify-center flex-grow md:py-8">
          <div className="max-w-md w-full space-y-6">
            <div>
              <h2 className="text-3xl font-bold text-foreground">
                Join Finly
              </h2>
              <p className="mt-3 text-sm text-secondaryForeground leading-relaxed">
                Start your financial journey today. With <span className="font-semibold">Finly</span>, take control of your money and build a better future.
              </p>
            </div>

            {/* Form */}
            <form className="space-y-6 w-full sm:w-[96%]" onSubmit={handleSubmit}>
              {/* Full Name */}
              <div>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  autoComplete="name"
                  required
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-accent shadow-sm placeholder-gray-400 text-mutedForeground focus:outline-none focus:ring-2 focus:ring-primary sm:text-sm"
                  placeholder="Full Name"
                  value={formData.fullName}
                  onChange={handleChange}
                />
              </div>

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
                  autoComplete="new-password"
                  required
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-accent placeholder-gray-400 text-mutedForeground focus:outline-none focus:ring-2 focus:ring-primary sm:text-sm"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  onClick={toggleVisibility}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </button>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2 px-4 rounded-3xl cursor-pointer gradient-primary text-primary-foreground text-md font-medium shadow hover:scale-105 transition-all disabled:opacity-70"
              >
                {isLoading ? 'Creating account...' : 'Create account'}
              </button>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-background text-muted-foreground">Or sign up with</span>
                </div>
              </div>

              {/* Social logins */}
              <div className="flex justify-around gap-4 ">
                <div className="flex md:w-1/2 md:justify-center border bg-background p-2 px-4 hover:scale-105 shadow-xs hover:bg-background/80 rounded-lg items-center gap-3 cursor-pointer transition-all">
                  <img
                    className="h-6 w-6"
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/google/google-original.svg"
                  />
                  <span className="text-sm text-muted-foreground">Google</span>
                </div>
                <div className="flex shadow-xs md:w-1/2 md:justify-center border bg-background p-2 px-4 hover:scale-105 hover:bg-background/80 rounded-lg items-center gap-3 cursor-pointer transition-all">
                  <FaFacebook className="h-6 w-6 text-blue-500" />
                  <span className="text-sm text-muted-foreground">Facebook</span>
                </div>
              </div>

              {/* Login link */}
              <div className="text-center">
                <span className="text-sm text-gray-600">
                  Already have an account?{' '}
                  <Link
                    to="/login"
                    className="font-medium text-primary/90 hover:text-primary"
                  >
                    Sign in here
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

export default SignUp;