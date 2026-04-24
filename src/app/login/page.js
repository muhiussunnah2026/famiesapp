'use client';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight, ArrowLeft, Loader2, Sparkles, Heart } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });
      if (error) throw error;

      toast.success('Välkommen tillbaka!');
      setTimeout(() => {
        window.location.href = '/';
      }, 900);
    } catch (error) {
      toast.error(error.message || 'Det gick inte att logga in');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
    if (error) toast.error(error.message);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center overflow-hidden relative py-24 px-4 section">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-8 lg:gap-12 z-10 relative items-center">
        {/* LEFT — welcome panel (hidden on mobile) */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="hidden lg:flex flex-col justify-center relative"
        >
          <div className="absolute -inset-6 rounded-[3rem] bg-brand-gradient-soft blur-3xl opacity-70 pointer-events-none" />

          <div className="relative glass rounded-[2.5rem] p-10 shadow-soft overflow-hidden">
            {/* Decorative blob */}
            <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-primary/25 blur-3xl animate-float-y" />
            <div className="absolute -bottom-10 -left-10 w-56 h-56 rounded-full bg-secondary/40 blur-3xl animate-float-y-slow" />

            <div className="relative">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass shadow-soft text-xs font-bold uppercase tracking-wider text-primary mb-6">
                <Heart size={12} className="fill-current" /> Välkommen tillbaka
              </div>

              <h2 className="text-4xl md:text-5xl font-black text-ink-900 dark:text-white leading-[1.05] mb-5">
                Logga in. <br />
                <span className="text-brand-gradient">Fortsätt upptäck.</span>
              </h2>

              <p className="text-lg text-ink-500 dark:text-ink-200 leading-relaxed mb-8">
                Fortsätt där du slutade — nya evenemang, sparade tips och
                familjeidéer nära dig.
              </p>

              {/* Float logo */}
              <div className="relative w-full h-56 glass rounded-3xl flex items-center justify-center shadow-soft">
                <div className="relative w-28 h-28 animate-float-y">
                  <Image
                    src="/logo.png"
                    fill
                    className="object-contain"
                    alt="Famies Logo"
                  />
                </div>

                {/* Floating badges */}
                <div className="absolute top-6 right-6 glass px-3 py-1.5 rounded-full text-xs font-bold text-ink-900 dark:text-white flex items-center gap-1.5 shadow-pink animate-float-y-slow">
                  <Sparkles size={12} className="text-primary" />
                  10 000+ familjer
                </div>
                <div className="absolute bottom-6 left-6 glass px-3 py-1.5 rounded-full text-xs font-bold text-ink-900 dark:text-white flex items-center gap-1.5 shadow-mint animate-float-y">
                  ⭐ 4.8 / 5
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* RIGHT — form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="absolute -inset-4 rounded-[3rem] bg-brand-gradient-soft blur-3xl opacity-60 pointer-events-none" />

          <div className="relative glass rounded-[2.2rem] md:rounded-[2.5rem] shadow-soft p-7 md:p-10">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-semibold text-ink-500 dark:text-ink-300 hover:text-primary mb-6 transition-colors"
            >
              <ArrowLeft size={15} /> Tillbaka till startsidan
            </Link>

            <h3 className="text-3xl md:text-4xl font-black text-ink-900 dark:text-white mb-2 leading-tight">
              Logga in
            </h3>
            <p className="text-ink-500 dark:text-ink-300 text-sm mb-7">
              Fyll i dina uppgifter för att komma åt ditt konto.
            </p>

            {/* Google */}
            <button
              onClick={handleGoogleLogin}
              className="press w-full flex items-center justify-center gap-3 bg-white dark:bg-ink-100/5 text-ink-900 dark:text-white border border-ink-100/70 dark:border-ink-700/50 font-bold py-3.5 rounded-2xl hover:border-primary/50 transition-all shadow-soft mb-5"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.84z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              Fortsätt med Google
            </button>

            {/* Divider */}
            <div className="relative flex items-center justify-center my-5">
              <div className="border-t border-ink-100/70 dark:border-ink-700/50 w-full absolute" />
              <span className="bg-surface px-3 text-xs text-ink-500 dark:text-ink-300 relative z-10 uppercase font-bold tracking-wider glass rounded-full py-1">
                eller fortsätt med e-post
              </span>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-bold text-ink-700 dark:text-ink-100 ml-1">
                  E-postadress
                </label>
                <div className="relative group">
                  <Mail
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-300 group-focus-within:text-primary transition-colors"
                    size={18}
                  />
                  <input
                    name="email"
                    onChange={handleChange}
                    type="email"
                    required
                    placeholder="anna@exempel.se"
                    className="w-full bg-white/70 dark:bg-ink-100/5 border border-ink-100/70 dark:border-ink-700/50 rounded-2xl py-3.5 pl-12 pr-4 text-ink-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/40 transition-all placeholder:text-ink-300"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center ml-1">
                  <label className="text-sm font-bold text-ink-700 dark:text-ink-100">
                    Lösenord
                  </label>
                  <Link
                    href="#"
                    className="text-xs font-bold text-primary hover:underline"
                  >
                    Glömt lösenord?
                  </Link>
                </div>
                <div className="relative group">
                  <Lock
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-300 group-focus-within:text-primary transition-colors"
                    size={18}
                  />
                  <input
                    name="password"
                    onChange={handleChange}
                    type="password"
                    required
                    placeholder="••••••••"
                    className="w-full bg-white/70 dark:bg-ink-100/5 border border-ink-100/70 dark:border-ink-700/50 rounded-2xl py-3.5 pl-12 pr-4 text-ink-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/40 transition-all placeholder:text-ink-300"
                  />
                </div>
              </div>

              <button
                disabled={loading}
                className="press w-full bg-primary text-white font-extrabold py-4 rounded-2xl shadow-pink hover:shadow-glow-pink transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <>
                    Logga in <ArrowRight size={18} />
                  </>
                )}
              </button>
            </form>

            <div className="mt-7 text-center">
              <p className="text-ink-500 dark:text-ink-300 text-sm">
                Har du inget konto?{' '}
                <Link
                  href="/register"
                  className="font-black text-primary hover:underline"
                >
                  Registrera dig
                </Link>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
