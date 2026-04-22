'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight, ArrowLeft, Loader2 } from 'lucide-react';
import Image from 'next/image';
import { supabase } from '@/lib/supabaseClient'; 
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast'; // ✅ Toast Added

export default function Login() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  // ইনপুট হ্যান্ডলার
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ইমেইল পাসওয়ার্ড লগিন ফাংশন
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) throw error;

      // সফল হলে
      toast.success('Login Successful!');
      
      // ১ সেকেন্ড পর হোমপেজে পাঠাবো (যাতে টোস্ট দেখা যায়)
      setTimeout(() => {
        // ✅ সরাসরি উইন্ডো রিফ্রেশ করে হোমপেজে পাঠানো হচ্ছে
        // এতে Navbar নতুন করে লোড হবে এবং Avatar দেখাবে
        window.location.href = '/'; 
      }, 1000);

    } catch (error) {
      toast.error(error.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };
  
  // Google Login ফাংশন
  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    if (error) toast.error(error.message);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-white dark:bg-black overflow-hidden relative">
      <Toaster position="top-center" /> {/* ✅ Toast Container */}

      {/* ব্যাকগ্রাউন্ড ব্লার এফেক্ট */}
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px] animate-pulse pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-10 p-6 z-10 relative">
        
        {/* বাম পাশ: ওয়েলকাম মেসেজ */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="hidden md:flex flex-col justify-center items-start p-10 bg-gray-50 dark:bg-gray-900/50 rounded-[3rem] border border-gray-100 dark:border-gray-800 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary to-pink-600 rounded-bl-[3rem] opacity-20" />
          
          <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-6">
            Welcome Back, <br/> <span className="text-primary">Parent!</span> 👋
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
            Log in to track your family's milestones, check local events, and connect with your community.
          </p>

          <div className="relative w-full h-64 bg-white dark:bg-gray-800 rounded-3xl shadow-xl flex items-center justify-center border border-gray-100 dark:border-gray-700">
              <div className="relative w-32 h-32">
                <Image src="/logo.png" fill className="object-contain animate-bounce" alt="Famies Logo" />
              </div>
          </div>
        </motion.div>

        {/* ডান পাশ: লগিন ফর্ম */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col justify-center p-8 md:p-12 bg-white/80 dark:bg-black/80 backdrop-blur-xl border border-gray-200 dark:border-gray-800 rounded-[2.5rem] shadow-2xl"
        >
          <div className="mb-6">
             <Link href="/" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-primary mb-6 transition-colors">
               <ArrowLeft size={16} /> Back to Home
             </Link>
             <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Login</h3>
             <p className="text-gray-500 text-sm">Enter your details to access your account.</p>
          </div>

          {/* Google Button */}
          <button 
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-700 font-bold py-3.5 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all shadow-sm mb-6"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.84z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            Continue with Google
          </button>

          {/* Divider */}
          <div className="relative flex items-center justify-center mb-6">
            <div className="border-t border-gray-200 dark:border-gray-700 w-full absolute"></div>
            <span className="bg-white dark:bg-gray-900 px-3 text-xs text-gray-400 relative z-10 uppercase font-medium tracking-wider">Or continue with email</span>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            {/* ইমেইল */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input 
                  name="email"
                  onChange={handleChange}
                  type="email" 
                  required
                  placeholder="hello@example.com"
                  className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl py-3.5 pl-12 pr-4 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  data-lpignore="true" 
                  autoComplete="off"
                />
              </div>
            </div>

            {/* পাসওয়ার্ড */}
            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
                <Link href="#" className="text-xs font-semibold text-primary hover:text-pink-600">Forgot Password?</Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input 
                  name="password"
                  onChange={handleChange}
                  type="password" 
                  required
                  placeholder="••••••••"
                  className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl py-3.5 pl-12 pr-4 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  data-lpignore="true" 
                  autoComplete="off"
                />
              </div>
            </div>

            {/* বাটন */}
            <button disabled={loading} className="w-full bg-primary hover:bg-pink-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/30 transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed">
              {loading ? <Loader2 className="animate-spin" /> : <>Sign In <ArrowRight size={20} /></>}
            </button>
          </form>

          {/* ফুটার লিংক */}
          <div className="mt-8 text-center">
            <p className="text-gray-500 text-sm">
              Don't have an account? {' '}
              <Link href="/register" className="font-bold text-primary hover:underline">
                Register Now
              </Link>
            </p>
          </div>
        </motion.div>

      </div>
    </div>
  );
}