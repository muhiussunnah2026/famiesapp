'use client';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Lock, ArrowLeft, MapPin, Phone, Check, Star, Heart, ArrowRight, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';

export default function Register() {
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    fullName: '',
    city: '',
    mobile: '',
    email: '',
    password: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  
  const [validations, setValidations] = useState({
    minLength: false, hasUpper: false, hasLower: false, hasNumber: false, hasSpecial: false,
  });

  // পেজে ঢোকার সাথে সাথে আগের সেশন ক্লিয়ার
  useEffect(() => {
    const clear = async () => { await supabase.auth.signOut(); };
    clear();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const { password } = formData;
    setValidations({
      minLength: password.length >= 8,
      hasUpper: /[A-Z]/.test(password),
      hasLower: /[a-z]/.test(password),
      hasNumber: /[0-9]/.test(password),
      hasSpecial: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    });
  }, [formData.password]);

  // 🔥 ফাইনাল সাইন-আপ ফাংশন
  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // ১. সাইন-আপ রিকোয়েস্ট
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.fullName,
            city: formData.city,
            mobile: formData.mobile,
          },
        },
      });

      if (error) throw error;

      // ২. যদি সেশন পাওয়া যায় (স্বাভাবিক ফ্লো)
      if (data?.session) {
        toast.success('Account Created! Redirecting...');
        window.location.href = '/';
      } 
      // ৩. যদি ইউজার তৈরি হয় কিন্তু সেশন না থাকে (Supabase এরর বা কনফার্মেশন ইস্যু)
      else if (data?.user && !data?.session) {
        // আমরা ম্যানুয়ালি লগিন করাবো
        const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
            email: formData.email,
            password: formData.password
        });

        if (loginData?.session) {
            toast.success('Account Created! Redirecting...');
            window.location.href = '/';
        } else {
            // যদি এখানেও এরর দেয়, তার মানে সেটিংস ঠিক হয়নি
            console.error("Login Error:", loginError);
            if (loginError?.message.includes("Email not confirmed")) {
                toast.error("System Error: Supabase is forcing email confirmation. Please check 'Settings Reset' step.");
            } else {
                toast.error(loginError?.message || "Something went wrong");
            }
        }
      }

    } catch (error) {
      console.error("Signup Error:", error);
      const errMsg = error.message || "";

      if (errMsg.includes('already registered') || errMsg.includes('duplicate key')) {
        toast.error('User already exists! Redirecting to login...', { duration: 3000 });
        setTimeout(() => router.push('/login'), 2000);
      } else {
        toast.error(errMsg);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
    if (error) toast.error(error.message);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-white dark:bg-black relative px-4 py-24 md:py-32 overflow-y-auto md:overflow-hidden">
      <Toaster position="top-center" />
      
      {/* ব্যাকগ্রাউন্ড এবং ডিজাইন সেম থাকছে */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div animate={{ scale: [1, 1.2, 1], x: [0, 50, 0], y: [0, -50, 0] }} transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }} className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px]" />
        <motion.div animate={{ scale: [1.2, 1, 1.2], x: [0, -30, 0], y: [0, 30, 0] }} transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }} className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-secondary/20 rounded-full blur-[120px]" />
      </div>

      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8 z-10 relative">
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="bg-white/80 dark:bg-black/80 backdrop-blur-2xl border border-white/40 dark:border-gray-800/40 rounded-[2.5rem] shadow-2xl p-8 md:p-12 flex flex-col justify-center order-2 md:order-1">
          <div className="mb-6">
             <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-primary mb-3 transition-colors">
               <ArrowLeft size={16} /> Back to Home
             </Link>
             <h3 className="text-3xl font-bold text-gray-900 dark:text-white">Create Account</h3>
             <p className="text-gray-500 text-base mt-2">Join the Famies community today!</p>
          </div>

           <button onClick={handleGoogleSignup} className="w-full flex items-center justify-center gap-3 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-700 font-semibold py-3.5 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-all mb-6 text-base shadow-sm">
            <svg className="w-5 h-5" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.84z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" /></svg>
            Sign up with Google
          </button>

          <div className="relative flex items-center justify-center mb-6">
            <div className="border-t border-gray-200 dark:border-gray-700 w-full absolute"></div>
            <span className="bg-white/80 dark:bg-black/80 px-4 text-xs text-gray-400 relative z-10 uppercase font-bold tracking-wider">Or with email</span>
          </div>

          <form onSubmit={handleSignUp} className="space-y-5">
            <div className="relative group">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={20} />
              <input name="fullName" onChange={handleChange} required type="text" placeholder="Full Name" className="w-full bg-gray-50/50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-xl py-3.5 pl-12 pr-4 text-base focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-gray-400" autoComplete="off" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="relative group">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={20} />
                <input name="city" onChange={handleChange} required type="text" placeholder="Stockholm" className="w-full bg-gray-50/50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-xl py-3.5 pl-12 pr-2 text-base focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-gray-400" autoComplete="off" />
              </div>
              <div className="relative group">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={20} />
                <input name="mobile" onChange={handleChange} required type="tel" placeholder="+46..." className="w-full bg-gray-50/50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-xl py-3.5 pl-12 pr-2 text-base focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-gray-400" autoComplete="off" />
              </div>
            </div>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={20} />
              <input name="email" onChange={handleChange} required type="email" placeholder="Email Address" className="w-full bg-gray-50/50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-xl py-3.5 pl-12 pr-4 text-base focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-gray-400" autoComplete="off" />
            </div>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={20} />
              <input name="password" onChange={handleChange} onFocus={() => setIsPasswordFocused(true)} onBlur={() => setIsPasswordFocused(false)} required type="password" placeholder="Password" className="w-full bg-gray-50/50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-xl py-3.5 pl-12 pr-4 text-base focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-gray-400" autoComplete="off" />
              <AnimatePresence>
                {isPasswordFocused && (
                  <motion.div initial={{ opacity: 0, y: 10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10, scale: 0.95 }} className="absolute bottom-full left-0 mb-2 w-full p-4 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border border-gray-100 dark:border-gray-700 rounded-xl shadow-xl z-20">
                    <p className="text-xs text-gray-500 mb-3 font-bold uppercase tracking-wider">Security Check:</p>
                    <ul className="grid grid-cols-2 gap-2">
                      <RequirementItem isValid={validations.minLength} text="8+ chars" />
                      <RequirementItem isValid={validations.hasUpper} text="Uppercase" />
                      <RequirementItem isValid={validations.hasLower} text="Lowercase" />
                      <RequirementItem isValid={validations.hasNumber} text="Number" />
                      <RequirementItem isValid={validations.hasSpecial} text="Symbol" />
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <button disabled={loading} className="w-full bg-black dark:bg-white hover:bg-gray-900 text-white dark:text-black font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-[1.01] flex items-center justify-center gap-2 mt-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed">
              {loading ? <Loader2 className="animate-spin" /> : <>Create Account <ArrowRight size={20} /></>}
            </button>
          </form>
          <div className="mt-8 text-center">
            <p className="text-gray-500 text-sm">Already a member? <Link href="/login" className="font-bold text-primary hover:underline">Log in</Link></p>
          </div>
        </motion.div>
        
        {/* Visual Side */}
        <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="hidden md:flex flex-col justify-center items-start text-left p-10 bg-gradient-to-br from-primary/10 to-pink-500/10 backdrop-blur-xl border border-white/20 dark:border-gray-800/30 rounded-[2rem] shadow-2xl relative overflow-hidden order-1 md:order-2">
          <div className="relative z-10 mb-8">
            <div className="relative w-20 h-20 mb-4"><Image src="/logo.png" alt="Famies" fill className="object-contain drop-shadow-lg" /></div>
            <h2 className="text-4xl font-extrabold leading-tight mb-4 text-gray-900 dark:text-white">Family Life,<br/> <span className="text-primary">Simplified.</span></h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed max-w-xs">Join thousands of parents in Stockholm discovering events, tracking health, and building connections.</p>
          </div>
          <div className="relative z-10 w-full max-w-sm space-y-4 mb-6">
            <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="flex items-center gap-4 p-4 rounded-xl bg-white/40 dark:bg-black/40 backdrop-blur-lg border border-white/30 dark:border-white/10 shadow-md w-full text-left">
              <div className="p-3 bg-gradient-to-br from-primary to-pink-500 rounded-full shadow-lg shrink-0"><Star size={20} fill="white" className="text-white" /></div>
              <div><p className="font-bold text-lg text-gray-900 dark:text-white">Smart Events</p><p className="text-xs text-gray-600 dark:text-gray-400">Tailored for your kids</p></div>
            </motion.div>
            <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }} className="flex items-center gap-4 p-4 rounded-xl bg-white/40 dark:bg-black/40 backdrop-blur-lg border border-white/30 dark:border-white/10 shadow-md w-full text-left">
              <div className="p-3 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full shadow-lg shrink-0"><Heart size={20} fill="white" className="text-white" /></div>
              <div><p className="font-bold text-lg text-gray-900 dark:text-white">Parent Community</p><p className="text-xs text-gray-600 dark:text-gray-400">Connect safely nearby</p></div>
            </motion.div>
          </div>
          <div className="relative z-10 text-xs text-gray-500 dark:text-gray-400 font-medium mt-auto">© Famies Inc. Stockholm.</div>
        </motion.div>
      </div>
    </div>
  );
}

function RequirementItem({ isValid, text }) {
  return (
    <li className={`flex items-center gap-1.5 text-[10px] transition-all duration-300 ${isValid ? 'text-green-600 font-bold' : 'text-gray-400'}`}>
      <span className={`flex items-center justify-center w-3 h-3 rounded-full border ${isValid ? 'bg-green-100 border-green-500' : 'border-gray-300'}`}>{isValid && <Check size={8} className="text-green-600" />}</span>
      {text}
    </li>
  );
}