'use client';
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, ArrowLeft, Calendar, Clock, ChevronRight, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';

export default function BlogSlider() {
  const [posts, setPosts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const autoPlayRef = useRef(null);

  // ১. ডাটা ফেচ করা
  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(9); 

      if (!error && data) {
        setPosts(data);
      }
      setLoading(false);
    };

    fetchPosts();
  }, []);

  // ২. অটো প্লে (৩.৫ সেকেন্ড পর পর)
  useEffect(() => {
    startAutoPlay();
    return () => stopAutoPlay();
  }, [currentIndex, posts.length]);

  const startAutoPlay = () => {
    stopAutoPlay();
    if (posts.length > 3) {
      autoPlayRef.current = setInterval(() => {
        nextSlide();
      }, 3500);
    }
  };

  const stopAutoPlay = () => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
  };

  // ৩. স্লাইড লজিক
  const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 768;
  const visibleCards = isDesktop ? 3 : 1;
  const maxIndex = posts.length > visibleCards ? posts.length - visibleCards : 0;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
  };

  const getReadTime = (content) => {
    const text = content?.replace(/<[^>]+>/g, '') || '';
    const words = text.split(/\s+/).length;
    return Math.ceil(words / 200) + " min";
  };

  if (loading) return <div className="py-20 flex justify-center"><Loader2 className="animate-spin text-primary" size={32}/></div>;
  if (posts.length === 0) return null;

  return (
    <section
      className="py-20 md:py-28 overflow-hidden relative section"
      onMouseEnter={stopAutoPlay}
      onMouseLeave={startAutoPlay}
    >
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none">
         <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-primary font-bold tracking-wider uppercase text-sm mb-2 block">Inspiration</span>
            <h2 className="text-4xl md:text-5xl font-black text-ink-900 dark:text-white leading-tight">
              Senaste <span className="text-brand-gradient">artiklar</span> & tips.
            </h2>
          </motion.div>

          {/* Controls */}
          <div className="hidden md:flex gap-3">
            <button onClick={prevSlide} className="p-4 rounded-full border border-gray-200 dark:border-gray-800 transition-all hover:bg-primary hover:text-white hover:border-primary active:scale-95 group">
              <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform"/>
            </button>
            <button onClick={nextSlide} className="p-4 rounded-full border border-gray-200 dark:border-gray-800 transition-all hover:bg-primary hover:text-white hover:border-primary active:scale-95 group">
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform"/>
            </button>
          </div>
        </div>

        {/* --- Slider Track --- */}
        <div className="overflow-hidden py-4 -mx-4 px-4">
          <motion.div 
            className="flex gap-6 md:gap-8"
            animate={{ 
              x: `-${currentIndex * (isDesktop ? 34.5 : 100)}%` 
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            style={{ width: '100%' }} 
          >
            {posts.map((post) => (
              <motion.div 
                key={post.id}
                className="
                  flex-shrink-0 
                  w-full 
                  md:w-[calc(33.333%-22px)] 
                  group
                "
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="bg-white dark:bg-gray-900 rounded-[2rem] overflow-hidden border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 h-full flex flex-col">
                  
                  {/* Image */}
                  <div className="relative h-64 overflow-hidden">
                    {post.image_url ? (
                      <img src={post.image_url} alt={post.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
                    ) : (
                      <div className="w-full h-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-400">No Image</div>
                    )}
                    <div className="absolute top-4 left-4 bg-white/95 dark:bg-black/95 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-primary shadow-lg">
                      {post.category || 'Artikel'}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-7 flex flex-col flex-grow">
                    <div className="flex items-center gap-4 text-xs text-gray-500 font-bold uppercase tracking-wide mb-4">
                      <span className="flex items-center gap-1.5"><Calendar size={14} className="text-primary"/> {new Date(post.created_at).toLocaleDateString('sv-SE')}</span>
                      <span className="flex items-center gap-1.5"><Clock size={14} className="text-primary"/> {getReadTime(post.content)}</span>
                    </div>

                    <h3 className="text-xl font-extrabold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-primary transition-colors leading-tight">
                      <Link href={`/inspiration/${post.slug}`}>{post.title}</Link>
                    </h3>
                    
                    {/* ✅ FIX: 200 Characters Limit + line-clamp-2 ensures roughly 2 lines */}
                    <div 
                      className="text-gray-500 dark:text-gray-400 text-sm line-clamp-2 mb-6 flex-grow leading-relaxed font-medium"
                      dangerouslySetInnerHTML={{ __html: post.content?.substring(0, 200).replace(/<[^>]+>/g, '') + "..." }} 
                    />

                    {/* ✅ FIX: Button Text Swedish */}
                    <Link href={`/inspiration/${post.slug}`} className="inline-flex items-center gap-2 text-sm font-bold text-gray-900 dark:text-white group-hover:text-primary transition-all group-hover:gap-3 mt-auto">
                      Läs mer <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* --- View All Button --- */}
        <div className="mt-14 text-center">
          <Link href="/inspiration">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="press px-10 py-4 rounded-full bg-primary hover:bg-primary-500 text-white font-extrabold text-lg shadow-pink flex items-center gap-3 mx-auto transition-all"
            >
              Se alla artiklar <ChevronRight size={20} className="stroke-[3px]" />
            </motion.button>
          </Link>
        </div>

      </div>
    </section>
  );
}