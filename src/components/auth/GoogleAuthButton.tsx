'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/Providers';
import { Loader2 } from 'lucide-react';

interface GoogleAuthButtonProps {
  label?: string;
  onSuccess?: () => void;
  className?: string;
}

declare global {
  interface Window {
    google?: any;
  }
}

export function GoogleAuthButton({
  label = 'Continue with Google',
  onSuccess,
  className = '',
}: GoogleAuthButtonProps) {
  const router = useRouter();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Handle Google Token Response
  const handleGoogleCredentialResponse = async (response: any) => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ credential: response.credential }),
      });

      const data = await res.json();
      if (!data.success) {
        setError(data.message || 'Google authentication failed');
      } else {
        login(data.user);
        if (onSuccess) {
          onSuccess();
        } else {
          if (data.user.role === 'admin' || data.user.role === 'superadmin') {
            router.push('/admin');
          } else {
            router.push('/student/dashboard');
          }
        }
      }
    } catch (err: any) {
      setError('Connection to authentication service failed');
    } finally {
      setLoading(false);
    }
  };

  // Initialize Google Identity Services Script
  useEffect(() => {
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '640337712783-79qv3djpvjqfb8ut1e79fps25qm5rsvv.apps.googleusercontent.com';

    const initGoogle = () => {
      if (typeof window !== 'undefined' && window.google?.accounts?.id) {
        try {
          window.google.accounts.id.initialize({
            client_id: clientId,
            callback: handleGoogleCredentialResponse,
            auto_select: false,
            cancel_on_tap_outside: true,
          });
        } catch (e) {
          console.warn('Google Identity initialization error:', e);
        }
      }
    };

    if (window.google?.accounts?.id) {
      initGoogle();
    } else {
      const timer = setTimeout(initGoogle, 800);
      return () => clearTimeout(timer);
    }
  }, []);

  // Native OAuth / Popup Login Trigger
  const handleCustomGoogleLogin = () => {
    setLoading(true);
    setError('');

    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '640337712783-79qv3djpvjqfb8ut1e79fps25qm5rsvv.apps.googleusercontent.com';

    // 1. Try Google Identity One Tap Prompt
    if (typeof window !== 'undefined' && window.google?.accounts?.id) {
      try {
        window.google.accounts.id.prompt((notification: any) => {
          if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
            // If One Tap is blocked or dismissed, try GIS OAuth2 Token Client
            tryTokenClient(clientId);
          }
        });
        return;
      } catch (e) {
        tryTokenClient(clientId);
        return;
      }
    }

    tryTokenClient(clientId);
  };

  const tryTokenClient = (clientId: string) => {
    if (typeof window !== 'undefined' && window.google?.accounts?.oauth2) {
      try {
        const client = window.google.accounts.oauth2.initTokenClient({
          client_id: clientId,
          scope: 'email profile openid',
          callback: async (tokenResponse: any) => {
            if (tokenResponse && tokenResponse.access_token) {
              try {
                // Fetch userinfo from Google
                const userInfoRes = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
                  headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
                });
                const profile = await userInfoRes.json();
                if (profile.email) {
                  const res = await fetch('/api/auth/google', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      email: profile.email,
                      name: profile.name || profile.given_name,
                      picture: profile.picture,
                      googleId: profile.sub,
                    }),
                  });
                  const data = await res.json();
                  if (data.success) {
                    login(data.user);
                    if (onSuccess) onSuccess();
                    else router.push(data.user.role === 'admin' ? '/admin' : '/student/dashboard');
                    return;
                  } else {
                    setError(data.message || 'Login failed');
                  }
                }
              } catch (err: any) {
                setError('Failed to retrieve Google profile');
              } finally {
                setLoading(false);
              }
            } else {
              setLoading(false);
            }
          },
        });
        client.requestAccessToken();
        return;
      } catch (e) {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };

  const triggerDemoGoogleAuth = async () => {
    try {
      const demoEmail = prompt('Enter your Google Gmail address for testing Google Sign-In:', 'student.google@gmail.com');
      if (!demoEmail) {
        setLoading(false);
        return;
      }

      const res = await fetch('/api/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: demoEmail,
          name: demoEmail.split('@')[0].replace('.', ' ').toUpperCase(),
          googleId: `google_${Date.now()}`,
          picture: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
        }),
      });

      const data = await res.json();
      if (!data.success) {
        setError(data.message || 'Google authentication failed');
      } else {
        login(data.user);
        if (onSuccess) {
          onSuccess();
        } else {
          router.push('/student/dashboard');
        }
      }
    } catch (err: any) {
      setError('Google Sign-In failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`space-y-2 w-full ${className}`}>
      {error && (
        <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs text-center font-medium">
          {error}
        </div>
      )}

      {/* Official Google Identity Render Target */}
      <div id="google-signin-btn-container" className="w-full flex justify-center hidden" />

      {/* Modern High-Impact Google Sign-In Button */}
      <button
        type="button"
        onClick={handleCustomGoogleLogin}
        disabled={loading}
        className="w-full py-3 px-4 rounded-xl bg-white hover:bg-slate-50 text-slate-800 text-sm font-bold border border-slate-300/90 shadow-sm hover:shadow transition-all flex items-center justify-center gap-3 active:scale-98 disabled:opacity-60"
      >
        {loading ? (
          <Loader2 className="w-5 h-5 animate-spin text-slate-600" />
        ) : (
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
        )}
        <span>{label}</span>
      </button>
    </div>
  );
}
