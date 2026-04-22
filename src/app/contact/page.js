'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MessageSquare, User, Send, Sparkles, PenTool, Check, Loader2, ArrowRight } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';
import toast from 'react-hot-toast'; // 👈 টোস্ট ইম্পোর্ট

export default function Contact() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // লোডিং টোস্ট
    const loadingToast = toast.loading('Sending your message...', {
      style: { background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(10px)', border: '1px solid #eee' }
    });

    try {
      // ডাটাবেসে ইনসার্ট
      const { error } = await supabase
        .from('contact_messages')
        .insert([formData]);

      if (error) throw error;

      // ✅ সাকসেস টোস্ট
      toast.success(
        <span className="flex flex-col">
          <span className="font-bold text-lg">Message Sent! 🎉</span>
          <span className="text-sm text-gray-500 font-normal">We'll get back to you soon.</span>
        </span>, 
        { id: loadingToast, duration: 5000 }
      );

      setSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });

    } catch (error) {
      console.error(error);
      // ❌ এরর টোস্ট (আসল কারণ দেখাবে)
      toast.error(
        <span className="flex flex-col">
          <span className="font-bold">Failed to send 😢</span>
          <span className="text-xs text-gray-500 font-normal mt-1">{error.message || "Something went wrong"}</span>
        </span>,
        { id: loadingToast }
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-white dark:bg-black relative overflow-hidden font-sans selection:bg-primary selection:text-white py-20 px-4 flex items-center justify-center">
      
      {/* ... (বাকি ডিজাইন কোড হুবহু আগের মতোই থাকবে, শুধু return এর ভেতরের অংশ) ... */}
      
      {/* --- ১. ডাইনামিক অ্যানিমেটেড ব্যাকগ্রাউন্ড --- */}
      <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <motion.div 
           animate={{ scale: [1, 1.4, 1], rotate: [0, 60, 0], opacity: [0.3, 0.5, 0.3] }}
           transition={{ duration: 18, repeat: Infinity }}
           className="absolute top-[-10%] left-[-10%] w-[700px] h-[700px] bg-blue-500/20 rounded-full blur-[140px]"
        />
        <motion.div 
           animate={{ scale: [1.2, 1, 1.2], x: [0, 80, 0], opacity: [0.3, 0.6, 0.3] }}
           transition={{ duration: 15, repeat: Infinity }}
           className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-primary/20 rounded-full blur-[140px]"
        />
      </div>

      {/* --- মেইন গ্রিড লেআউট --- */}
      <div className="relative z-10 w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* --- বাম পাশ --- */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-left space-y-8"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6 text-primary font-bold shadow-sm">
               <MessageSquare size={16} />
               <span className="text-sm">We are listening</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight mb-6">
              Let’s Create <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">Something Amazing.</span>
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-lg">
              Have a question, feedback, or just want to say hello? We are here for you. Drop us a message!
            </p>
          </div>

          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="p-8 rounded-[2rem] bg-gradient-to-br from-white/60 to-white/30 dark:from-gray-900/60 dark:to-gray-900/30 backdrop-blur-xl border border-white/50 dark:border-white/10 shadow-2xl relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-[40px] -mr-10 -mt-10" />
            
            <div className="flex items-start gap-5">
              <div className="w-12 h-12 bg-primary text-white rounded-xl flex items-center justify-center shrink-0 shadow-lg rotate-3 group-hover:rotate-6 transition-transform">
                <Sparkles size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Request Tools or Articles</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                  "Any kind of tools or article request you have, just let us know! We will make that for you <span className="font-bold text-primary underline decoration-wavy">for free</span>."
                </p>
              </div>
            </div>
          </motion.div>

          <div className="flex items-center gap-6 text-gray-500 dark:text-gray-400 font-medium">
             <span className="flex items-center gap-2"><Mail size={18} className="text-primary"/> support@famies.app</span>
             <span className="flex items-center gap-2"><MapPinIcon size={18} className="text-primary"/> Stockholm, Sweden</span>
          </div>
        </motion.div>


        {/* --- ডান পাশ: ফর্ম --- */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
           <div className="relative bg-white/70 dark:bg-gray-900/70 backdrop-blur-3xl border border-white/50 dark:border-white/10 rounded-[2.5rem] shadow-2xl p-8 md:p-12">
             
             {!success ? (
               <form onSubmit={handleSubmit} className="space-y-6">
                 
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">Your Name</label>
                      <div className="relative group">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={18} />
                        <input name="name" required value={formData.name} onChange={handleChange} type="text" placeholder="John Doe" 
                          className="w-full bg-white/50 dark:bg-black/20 border border-gray-200 dark:border-gray-700 rounded-xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-primary/50 outline-none transition-all"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">Email Address</label>
                      <div className="relative group">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={18} />
                        <input name="email" required value={formData.email} onChange={handleChange} type="email" placeholder="john@example.com" 
                          className="w-full bg-white/50 dark:bg-black/20 border border-gray-200 dark:border-gray-700 rounded-xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-primary/50 outline-none transition-all"
                        />
                      </div>
                    </div>
                 </div>

                 <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">Subject</label>
                    <div className="relative group">
                      <PenTool className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={18} />
                      <input name="subject" required value={formData.subject} onChange={handleChange} type="text" placeholder="Request for a new tool..." 
                        className="w-full bg-white/50 dark:bg-black/20 border border-gray-200 dark:border-gray-700 rounded-xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-primary/50 outline-none transition-all"
                      />
                    </div>
                 </div>

                 <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">Message</label>
                    <div className="relative group">
                      <textarea name="message" required value={formData.message} onChange={handleChange} rows="4" placeholder="Tell us more about your idea..." 
                        className="w-full bg-white/50 dark:bg-black/20 border border-gray-200 dark:border-gray-700 rounded-xl py-4 px-5 focus:ring-2 focus:ring-primary/50 outline-none transition-all resize-none"
                      ></textarea>
                    </div>
                 </div>

                 <button disabled={loading} className="w-full bg-gradient-to-r from-gray-900 to-black dark:from-white dark:to-gray-200 text-white dark:text-black font-bold py-4 rounded-xl shadow-xl hover:scale-[1.01] transition-all flex items-center justify-center gap-2">
                    {loading ? <Loader2 className="animate-spin" /> : <>Send Message <Send size={18} /></>}
                 </button>
               </form>
             ) : (
               <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-16">
                  <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                    <Check className="text-green-600 w-12 h-12" strokeWidth={3} />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Message Sent! 🚀</h2>
                  <p className="text-gray-600 dark:text-gray-300 text-lg mb-8">
                    Thanks for reaching out. We've received your request and will get back to you shortly!
                  </p>
                  <button onClick={() => setSuccess(false)} className="text-primary font-bold hover:underline flex items-center justify-center gap-2 mx-auto">
                    Send another message <ArrowRight size={16} />
                  </button>
               </motion.div>
             )}

           </div>
           
           <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-gradient-to-br from-primary/20 to-purple-500/20 rounded-[3rem] blur-3xl opacity-50" />
        </motion.div>

      </div>
    </div>
  );
}

function MapPinIcon({ size, className }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
            <circle cx="12" cy="10" r="3"/>
        </svg>
    )
}