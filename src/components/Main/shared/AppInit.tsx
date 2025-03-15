// src/components/AppInit.tsx
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {  loginSuccess, logout } from '../../../store/reducers/AuthSlice';

// src/components/AppInit.tsx
export const AppInit = () => {
    const dispatch = useDispatch();
  
    useEffect(() => {
      const initializeAuth = async () => {
        const token = localStorage.getItem('token');
        if (!token) return;
  
        try {
          const response = await fetch(`${import.meta.env.VITE_Base_URL}/user`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
  
          const data = await response.json();
          
          if (!response.ok) {
            throw new Error(data.message || "Session expired");
            
          }
          // Store in Redux and localStorage
          localStorage.setItem('token', data.token || token);
          dispatch(loginSuccess(data.user));
        } catch (error: any) {
          console.error('Session validation failed:', error);
          localStorage.removeItem('token');
          dispatch(logout());
        }
      };
  
      initializeAuth();
    }, [dispatch]);
  
    return null;
  };