import React, { useState } from 'react';
import { 
  X, 
  Mail, 
  Lock, 
  User, 
  Eye, 
  EyeOff, 
  Sparkles, 
  GraduationCap, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  Github,
  Globe
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Button } from '../common/Button';

export const AuthModal = () => {
  const { 
    isAuthModalOpen, 
    setIsAuthModalOpen, 
    authMode, 
    setAuthMode, 
    loginUser, 
    loginWithOAuth, 
    loginWithDemo 
  } = useApp();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [college, setCollege] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Please fill in all required fields.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      loginUser({
        name: name.trim() || email.split('@')[0] || 'Student',
        email: email.trim(),
        college: college.trim() || 'Institute of Technology'
      });
      setLoading(false);
      setIsAuthModalOpen(false);
    }, 400);
  };

  const handleOAuth = (provider) => {
    setLoading(true);
    setTimeout(() => {
      loginWithOAuth(provider);
      setLoading(false);
      setIsAuthModalOpen(false);
    }, 400);
  };

  const handleDemo = () => {
    loginWithDemo();
    setIsAuthModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#111728] border border-[#243356] rounded-3xl w-full max-w-md max-h-[92vh] overflow-y-auto shadow-2xl relative">
        
        {/* Close Button */}
        <button
          onClick={() => setIsAuthModalOpen(false)}
          className="absolute top-4 right-4 p-2 rounded-xl text-[#94A3B8] hover:text-white hover:bg-[#1E293B] transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="p-6 sm:p-7 border-b border-[#1A233A] text-center space-y-2">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#6366F1] to-[#22D3EE] text-white shadow-glow-purple mx-auto">
            <Sparkles className="w-6 h-6 fill-white" />
          </div>
          
          <h3 className="text-2xl font-extrabold text-white tracking-tight">
            {authMode === 'signin' ? 'Welcome to CareerOS' : 'Create Student Account'}
          </h3>
          <p className="text-xs text-[#94A3B8]">
            {authMode === 'signin' 
              ? 'Sign in to sync your AI roadmap, test scores, and resumes' 
              : 'Join thousands of students accelerating their placement journey'}
          </p>
        </div>

        <div className="p-6 sm:p-7 space-y-5">
          
          {/* Quick Demo Login Banner (for hackathon judges/evaluators) */}
          <div 
            onClick={handleDemo}
            className="p-3 rounded-2xl bg-[#182138] border border-[#6366F1]/60 hover:border-[#6366F1] cursor-pointer transition-all flex items-center justify-between group shadow-glow-purple"
          >
            <div className="flex items-center gap-2.5">
              <span className="text-lg">⚡</span>
              <div>
                <div className="text-xs font-bold text-white group-hover:text-[#38BDF8] transition-colors">
                  One-Click Demo Student Sign In
                </div>
                <div className="text-[10px] text-[#94A3B8]">
                  Instant access with preloaded Data Analyst blueprint
                </div>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-[#38BDF8] group-hover:translate-x-1 transition-transform" />
          </div>

          {/* Social / SSO Auth Buttons */}
          <div className="space-y-2.5">
            
            {/* Google */}
            <button
              onClick={() => handleOAuth('Google')}
              type="button"
              className="w-full flex items-center justify-center gap-3 px-4 py-2.5 rounded-xl bg-[#090D16] border border-[#232F4B] text-xs font-semibold text-white hover:bg-[#151D30] hover:border-[#3E4F77] transition-all"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
              <span>Continue with Google</span>
            </button>

            {/* GitHub */}
            <button
              onClick={() => handleOAuth('GitHub')}
              type="button"
              className="w-full flex items-center justify-center gap-3 px-4 py-2.5 rounded-xl bg-[#090D16] border border-[#232F4B] text-xs font-semibold text-white hover:bg-[#151D30] hover:border-[#3E4F77] transition-all"
            >
              <Github className="w-4 h-4 text-white" />
              <span>Continue with GitHub</span>
            </button>

            {/* University Campus SSO */}
            <button
              onClick={() => handleOAuth('University SSO')}
              type="button"
              className="w-full flex items-center justify-center gap-3 px-4 py-2.5 rounded-xl bg-[#0E1A2D] border border-[#1E3760] text-xs font-semibold text-[#38BDF8] hover:bg-[#132540] transition-all"
            >
              <GraduationCap className="w-4 h-4 text-[#38BDF8]" />
              <span>Student / University SSO</span>
            </button>

          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 my-4">
            <div className="flex-1 h-[1px] bg-[#1E293B]" />
            <span className="text-[11px] uppercase font-bold text-[#64748B] tracking-wider">or with email</span>
            <div className="flex-1 h-[1px] bg-[#1E293B]" />
          </div>

          {/* Error notification */}
          {error && (
            <div className="p-3 rounded-xl bg-red-950/60 border border-red-800 text-xs text-red-300">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3.5">
            
            {authMode === 'signup' && (
              <>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#94A3B8]">Full Name</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-[#64748B] absolute left-3.5 top-3" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Shiven Sharma"
                      className="w-full pl-10 pr-3.5 py-2.5 bg-[#090D16] border border-[#232F4B] rounded-xl text-xs sm:text-sm text-white placeholder-[#64748B] focus:outline-none focus:border-[#6366F1]"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#94A3B8]">College / University</label>
                  <div className="relative">
                    <GraduationCap className="w-4 h-4 text-[#64748B] absolute left-3.5 top-3" />
                    <input
                      type="text"
                      value={college}
                      onChange={(e) => setCollege(e.target.value)}
                      placeholder="e.g. National Institute of Technology"
                      className="w-full pl-10 pr-3.5 py-2.5 bg-[#090D16] border border-[#232F4B] rounded-xl text-xs sm:text-sm text-white placeholder-[#64748B] focus:outline-none focus:border-[#6366F1]"
                    />
                  </div>
                </div>
              </>
            )}

            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#94A3B8]">Student Email</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#64748B] absolute left-3.5 top-3" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="student@university.edu"
                  className="w-full pl-10 pr-3.5 py-2.5 bg-[#090D16] border border-[#232F4B] rounded-xl text-xs sm:text-sm text-white placeholder-[#64748B] focus:outline-none focus:border-[#6366F1]"
                />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-[#94A3B8]">Password</label>
                {authMode === 'signin' && (
                  <button 
                    type="button"
                    onClick={() => alert("Password reset link sent to your email!")}
                    className="text-[11px] text-[#38BDF8] hover:underline"
                  >
                    Forgot?
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#64748B] absolute left-3.5 top-3" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2.5 bg-[#090D16] border border-[#232F4B] rounded-xl text-xs sm:text-sm text-white placeholder-[#64748B] focus:outline-none focus:border-[#6366F1]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3 text-[#64748B] hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1 text-xs text-[#94A3B8]">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded bg-[#090D16] border-[#232F4B] text-[#6366F1] focus:ring-0"
                />
                <span>Remember this device</span>
              </label>
            </div>

            <Button
              type="submit"
              variant="primary"
              disabled={loading}
              className="w-full py-3 mt-2 text-sm font-semibold shadow-glow-purple"
            >
              {loading 
                ? 'Authenticating...' 
                : authMode === 'signin' ? 'Sign In to CareerOS →' : 'Create Account →'}
            </Button>

          </form>

          {/* Toggle between Sign In and Sign Up */}
          <div className="pt-2 text-center text-xs text-[#94A3B8]">
            {authMode === 'signin' ? (
              <p>
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={() => { setAuthMode('signup'); setError(''); }}
                  className="font-bold text-[#38BDF8] hover:underline"
                >
                  Sign up free
                </button>
              </p>
            ) : (
              <p>
                Already registered?{' '}
                <button
                  type="button"
                  onClick={() => { setAuthMode('signin'); setError(''); }}
                  className="font-bold text-[#38BDF8] hover:underline"
                >
                  Sign in here
                </button>
              </p>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
