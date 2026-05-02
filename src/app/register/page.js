'use client';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User,
  Mail,
  Lock,
  ArrowLeft,
  MapPin,
  Phone,
  Check,
  Star,
  Heart,
  ArrowRight,
  Loader2,
  Sparkles,
} from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function Register() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    fullName: '',
    city: '',
    mobile: '',
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  const [validations, setValidations] = useState({
    minLength: false,
    hasUpper: false,
    hasLower: false,
    hasNumber: false,
    hasSpecial: false,
  });

  useEffect(() => {
    (async () => {
      await supabase.auth.signOut();
    })();
  }, []);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  useEffect(() => {
    const p = formData.password;
    setValidations({
      minLength: p.length >= 8,
      hasUpper: /[A-Z]/.test(p),
      hasLower: /[a-z]/.test(p),
      hasNumber: /[0-9]/.test(p),
      hasSpecial: /[!@#$%^&*(),.?":{}|<>]/.test(p),
    });
  }, [formData.password]);

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
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

      if (data?.session) {
        toast.success('Konto skapat! Omdirigerar...');
        window.location.href = '/';
      } else if (data?.user && !data?.session) {
        const { data: loginData, error: loginError } =
          await supabase.auth.signInWithPassword({
            email: formData.email,
            password: formData.password,
          });

        if (loginData?.session) {
          toast.success('Konto skapat! Omdirigerar...');
          window.location.href = '/';
        } else {
          toast.error(loginError?.message || 'Något blev fel');
        }
      }
    } catch (error) {
      const errMsg = error.message || '';
      if (
        errMsg.includes('already registered') ||
        errMsg.includes('duplicate key')
      ) {
        toast.error('Användaren finns redan. Omdirigerar till inloggning...', {
          duration: 3000,
        });
        setTimeout(() => router.push('/login'), 1800);
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
    <div className="min-h-screen w-full flex items-center justify-center relative px-4 py-24 md:py-28 overflow-hidden section">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-8 lg:gap-12 z-10 relative items-center">
        {/* LEFT, form */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative order-2 lg:order-1"
        >
          <div className="absolute -inset-4 rounded-[3rem] bg-brand-gradient-soft blur-3xl opacity-60 pointer-events-none" />

          <div className="relative glass rounded-[2.2rem] md:rounded-[2.5rem] shadow-soft p-7 md:p-10">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-semibold text-ink-500 dark:text-ink-300 hover:text-primary mb-5 transition-colors"
            >
              <ArrowLeft size={15} /> Tillbaka till startsidan
            </Link>

            <h3 className="text-3xl md:text-4xl font-black text-ink-900 dark:text-white mb-2 leading-tight">
              Skapa konto
            </h3>
            <p className="text-ink-500 dark:text-ink-300 text-sm mb-6">
              Gratis. 30 sekunder. Inget kreditkort.
            </p>

            <button
              onClick={handleGoogleSignup}
              className="press w-full flex items-center justify-center gap-3 bg-white dark:bg-ink-100/5 text-ink-900 dark:text-white border border-ink-100/70 dark:border-ink-700/50 font-bold py-3.5 rounded-2xl hover:border-primary/50 transition-all shadow-soft mb-5 text-[15px]"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.84z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              Registrera med Google
            </button>

            <div className="relative flex items-center justify-center my-5">
              <div className="border-t border-ink-100/70 dark:border-ink-700/50 w-full absolute" />
              <span className="glass px-3 text-xs text-ink-500 dark:text-ink-300 relative z-10 uppercase font-bold tracking-wider rounded-full py-1">
                eller med e-post
              </span>
            </div>

            <form onSubmit={handleSignUp} className="space-y-4">
              <FormInput
                icon={User}
                name="fullName"
                type="text"
                placeholder="Fullständigt namn"
                onChange={handleChange}
              />
              <div className="grid grid-cols-2 gap-4">
                <FormInput
                  icon={MapPin}
                  name="city"
                  type="text"
                  placeholder="Stockholm"
                  onChange={handleChange}
                />
                <FormInput
                  icon={Phone}
                  name="mobile"
                  type="tel"
                  placeholder="+46..."
                  onChange={handleChange}
                />
              </div>
              <FormInput
                icon={Mail}
                name="email"
                type="email"
                placeholder="E-postadress"
                onChange={handleChange}
              />
              <div className="relative group">
                <Lock
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-300 group-focus-within:text-primary transition-colors"
                  size={18}
                />
                <input
                  name="password"
                  onChange={handleChange}
                  onFocus={() => setIsPasswordFocused(true)}
                  onBlur={() => setIsPasswordFocused(false)}
                  required
                  type="password"
                  placeholder="Lösenord"
                  className="w-full bg-white/70 dark:bg-ink-100/5 border border-ink-100/70 dark:border-ink-700/50 rounded-2xl py-3.5 pl-12 pr-4 text-ink-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/40 transition-all placeholder:text-ink-300"
                />
                <AnimatePresence>
                  {isPasswordFocused && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.97 }}
                      transition={{ duration: 0.2 }}
                      className="absolute bottom-full left-0 mb-2 w-full p-4 glass rounded-2xl shadow-soft z-20"
                    >
                      <p className="text-xs text-ink-500 mb-3 font-black uppercase tracking-wider">
                        Säkerhetskrav
                      </p>
                      <ul className="grid grid-cols-2 gap-2">
                        <RequirementItem
                          isValid={validations.minLength}
                          text="8+ tecken"
                        />
                        <RequirementItem
                          isValid={validations.hasUpper}
                          text="Versal"
                        />
                        <RequirementItem
                          isValid={validations.hasLower}
                          text="Gemen"
                        />
                        <RequirementItem
                          isValid={validations.hasNumber}
                          text="Siffra"
                        />
                        <RequirementItem
                          isValid={validations.hasSpecial}
                          text="Symbol"
                        />
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <button
                disabled={loading}
                className="press w-full bg-primary text-white font-extrabold py-4 rounded-2xl shadow-pink hover:shadow-glow-pink transition-all flex items-center justify-center gap-2 mt-2 text-lg disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <>
                    Skapa konto <ArrowRight size={20} />
                  </>
                )}
              </button>
            </form>

            <div className="mt-7 text-center">
              <p className="text-ink-500 dark:text-ink-300 text-sm">
                Har du redan ett konto?{' '}
                <Link
                  href="/login"
                  className="font-black text-primary hover:underline"
                >
                  Logga in
                </Link>
              </p>
            </div>
          </div>
        </motion.div>

        {/* RIGHT, visual panel */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="hidden lg:flex flex-col justify-center relative order-1 lg:order-2"
        >
          <div className="absolute -inset-6 rounded-[3rem] bg-brand-gradient-soft blur-3xl opacity-70 pointer-events-none" />

          <div className="relative glass rounded-[2.5rem] p-10 shadow-soft overflow-hidden">
            <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-primary/25 blur-3xl animate-float-y" />
            <div className="absolute -bottom-10 -left-10 w-56 h-56 rounded-full bg-secondary/40 blur-3xl animate-float-y-slow" />

            <div className="relative">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass shadow-soft text-xs font-bold uppercase tracking-wider text-primary mb-6">
                <Sparkles size={12} /> Kom igång gratis
              </div>

              <div className="relative w-20 h-20 mb-5 rounded-2xl overflow-hidden ring-1 ring-black/10 shadow-pink">
                <Image
                  src="/logo-black.webp"
                  alt="Famies"
                  fill
                  className="object-cover"
                />
              </div>

              <h2 className="text-4xl md:text-5xl font-black leading-[1.05] mb-4 text-ink-900 dark:text-white">
                Familjeliv,<br />
                <span className="text-brand-gradient">förenklat.</span>
              </h2>
              <p className="text-ink-500 dark:text-ink-200 text-base leading-relaxed max-w-sm mb-8">
                Gör som över 10 000 föräldrar i Stockholm som slutat googla på
                lördagar.
              </p>

              <div className="space-y-3.5 max-w-sm">
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="flex items-center gap-4 p-4 rounded-2xl glass shadow-soft"
                >
                  <div className="p-2.5 bg-primary rounded-xl shadow-pink shrink-0">
                    <Star size={18} fill="white" className="text-white" />
                  </div>
                  <div>
                    <p className="font-extrabold text-ink-900 dark:text-white">
                      Smarta evenemang
                    </p>
                    <p className="text-xs text-ink-500 dark:text-ink-300">
                      anpassat efter era barn
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  animate={{ y: [0, 5, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
                  className="flex items-center gap-4 p-4 rounded-2xl glass shadow-soft"
                >
                  <div className="p-2.5 bg-secondary rounded-xl shadow-mint shrink-0">
                    <Heart size={18} fill="currentColor" className="text-green-800" />
                  </div>
                  <div>
                    <p className="font-extrabold text-ink-900 dark:text-white">
                      Tips från riktiga familjer
                    </p>
                    <p className="text-xs text-ink-500 dark:text-ink-300">
                      nära där ni bor
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function FormInput({ icon: Icon, name, type, placeholder, onChange }) {
  return (
    <div className="relative group">
      <Icon
        className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-300 group-focus-within:text-primary transition-colors"
        size={18}
      />
      <input
        name={name}
        onChange={onChange}
        required
        type={type}
        placeholder={placeholder}
        className="w-full bg-white/70 dark:bg-ink-100/5 border border-ink-100/70 dark:border-ink-700/50 rounded-2xl py-3.5 pl-12 pr-4 text-ink-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/40 transition-all placeholder:text-ink-300"
        autoComplete="off"
      />
    </div>
  );
}

function RequirementItem({ isValid, text }) {
  return (
    <li
      className={`flex items-center gap-1.5 text-[11px] transition-all duration-300 ${
        isValid ? 'text-green-700 font-bold' : 'text-ink-300'
      }`}
    >
      <span
        className={`flex items-center justify-center w-3.5 h-3.5 rounded-full border transition-all ${
          isValid
            ? 'bg-secondary border-green-600'
            : 'border-ink-300'
        }`}
      >
        {isValid && <Check size={9} className="text-green-800" strokeWidth={3} />}
      </span>
      {text}
    </li>
  );
}
