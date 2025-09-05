import React, { useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { User } from '../types';
import { AuthContext } from './authContext';
import api from '../utils/api';

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        const checkAuth = async () => {
            if (token) {
                try {
                    const response = await api.get('/auth/getUser');
                    setUser(response.data);
                } catch (error) {
                    console.error('Auth check failed:', error);
                    localStorage.removeItem('token');
                    setToken(null);
                }
            }
            setIsLoading(false);
        };
        checkAuth();
    }, [token]);

    const login = (newToken: string, userData: User) => {
        localStorage.setItem('token', newToken);
        setToken(newToken);
        setUser(userData);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
    };
    const clearUser = () => {
        localStorage.removeItem('token');
        setUser(null);
        setToken(null);
    };

    // useEffect(() => {
    //     const storedToken = localStorage.getItem('token');
    //     const storedUser = localStorage.getItem('user');

    //     if(storedToken && storedUser) {
    //         setToken(storedToken);
    //         setUser(JSON.parse(storedUser));
    //     }
    //     setIsLoading
    // } [user]);

    const value = {
        user,
        token,
        login,
        logout,
        isLoading,
        clearUser,
        setUser
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

