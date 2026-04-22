'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Lock, Clock, ChevronRight, ChevronLeft, Filter, Sparkles, ArrowRight, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';

// --- ১. কনফিগারেশন ---
const ITEMS_PER_PAGE = 9;

const categories = [
  "Alla", 
  "Bebis & Du", "Familjeliv & Pepp", "Fira & Njuta", "Lär & Utforska", 
  "Lek & Fart", "Mat & Mums", "Mys & Hitta på", "Ses & Hitta på", 
  "Tillgängligt för alla", "Utflykter & Kul", "Ut & Upptäck"
];

export default function Blog() {
  // State Management
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [activeCategory, setActiveCategory] = useState("Alla");
  const [filterType, setFilterType] = useState("All"); 
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // --- ২. ডাটাবেস থেকে আর্টিকেল ফেচ করা ---
  useEffect(() => {
    const fetchArticles = async () => {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data) {
        setArticles(data);
      }
      setLoading(false);
    };
    fetchArticles();
  }, []);

  // --- ৩. রিডিং টাইম ক্যালকুলেটর (হেল্পার) ---
  const getReadTime = (text) => {
    const wordsPerMinute = 200;
    const words = text ? text.split(/\s+/).length : 0;
    return Math.ceil(words / wordsPerMinute) + " min";
  };

  // --- ৪. মেইন ফিল্টারিং লজিক ---
  const filteredArticles = articles.filter(article => {
    const matchCategory = activeCategory === "Alla" || article.category === activeCategory;
    const matchType = filterType === "All" || (filterType === "Premium" ? article.is_premium : !article.is_premium);
    const matchSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchType && matchSearch;
  });

  // --- ৫. প্যাজিনেশন লজিক ---
  const totalPages = Math.ceil(filteredArticles.length / ITEMS_PER_PAGE);
  const currentArticles = filteredArticles.slice(
    (currentPage - 1) * ITEMS_PER_PAGE, 
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen w-full bg-white dark:bg-black relative overflow-hidden font-sans selection:bg-primary selection:text-white pb-20">
      
      {/* --- অ্যানিমেটেড ব্যাকগ্রাউন্ড --- */}
      <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <motion.div 
           animate={{ scale: [1, 1.2, 1], x: [0, 50, 0] }}
           transition={{ duration: 20, repeat: Infinity }}
           className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[150px]"
        />
        <motion.div 
           animate={{ scale: [1.2, 1, 1.2], x: [0, -50, 0] }}
           transition={{ duration: 15, repeat: Infinity }}
           className="absolute top-40 left-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[150px]"
        />
      </div>

      {/* ================= HERO SECTION ================= */}
      <section className="relative z-10 pt-32 pb-12 px-4 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 dark:bg-white/10 backdrop-blur-md border border-white/20 mb-6 shadow-sm">
            <Sparkles size={14} className="text-primary" />
            <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">Kunskap & Inspiration</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 dark:text-white mb-6 leading-tight">
            Famies <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600">Magazine.</span>
          </h1>

          {/* Search Bar */}
          <div className="relative max-w-lg mx-auto group mt-8">
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-purple-600 rounded-full blur opacity-20 group-hover:opacity-40 transition-opacity" />
            <div className="relative bg-white dark:bg-gray-900 rounded-full shadow-xl flex items-center p-2 border border-gray-100 dark:border-gray-700">
               <Search className="text-gray-400 ml-4" size={20} />
               <input 
                 type="text" 
                 placeholder="Sök artiklar..." 
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}
                 className="w-full bg-transparent border-none focus:ring-0 text-gray-900 dark:text-white px-4 py-2 placeholder:text-gray-400 focus:outline-none"
               />
            </div>
          </div>
        </motion.div>
      </section>

      {/* ================= MAIN CONTENT LAYOUT ================= */}
      <div className="relative z-10 px-4 max-w-7xl mx-auto">
        
        {/* Filters Area */}
        <div className="mb-10 space-y-4 flex flex-col items-center">
          {/* Category Chips */}
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => { setActiveCategory(cat); setCurrentPage(1); }}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all border ${
                  activeCategory === cat 
                  ? 'bg-primary text-white border-primary shadow-lg shadow-primary/30' 
                  : 'bg-white/60 dark:bg-gray-800/60 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:bg-white hover:shadow-md'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Type Filter (Free/Premium) */}
          <div className="flex items-center gap-4 text-sm font-medium text-gray-600 dark:text-gray-400 bg-white/40 dark:bg-gray-900/40 p-2 rounded-xl border border-white/20 inline-flex backdrop-blur-sm">
              <span className="ml-2 flex items-center gap-1"><Filter size={14}/> Filter:</span>
              {['All', 'Free', 'Premium'].map(type => (
                <button
                  key={type}
                  onClick={() => { setFilterType(type); setCurrentPage(1); }}
                  className={`px-3 py-1 rounded-lg transition-colors ${
                    filterType === type 
                    ? 'bg-black dark:bg-white text-white dark:text-black shadow-md' 
                    : 'hover:bg-white/50 dark:hover:bg-gray-800'
                  }`}
                >
                  {type}
                </button>
              ))}
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
            <div className="flex justify-center py-20"><Loader2 className="animate-spin text-primary" size={40}/></div>
        ) : (
            <>
              {/* Articles Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <AnimatePresence mode='wait'>
                  {currentArticles.map((article, index) => (
                    <motion.div 
                      key={article.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ delay: index * 0.05 }}
                      className="group relative bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-[1.5rem] overflow-hidden border border-white/50 dark:border-gray-700 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 flex flex-col h-full"
                    >
                      {/* ✅ FIX: পুরো কার্ড ক্লিকেবল করার জন্য Link সবার বাইরে */}
                      <Link href={`/blog/${article.slug}`} className="flex flex-col h-full w-full cursor-pointer">
                        
                        {/* Image */}
                        <div className="relative h-64 w-full bg-gray-200 dark:bg-gray-800 overflow-hidden">
                          {article.image_url ? (
                            <img src={article.image_url} alt={article.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"/>
                          ) : (
                            <div className="absolute inset-0 bg-gradient-to-br from-gray-300 to-gray-400 dark:from-gray-700 dark:to-gray-800" /> 
                          )}
                          
                          {article.is_premium && (
                            <div className="absolute top-3 right-3 bg-white/90 dark:bg-black/90 backdrop-blur text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1 shadow-md z-10 border border-white/20">
                              <Lock size={10} className="text-primary" />
                              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600">PREMIUM</span>
                            </div>
                          )}
                          <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur text-white text-[10px] font-bold px-2 py-1 rounded-md border border-white/10">
                            {article.category}
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-6 flex flex-col flex-grow">
                          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-3 font-medium">
                            <span className="flex items-center gap-1"><Clock size={14}/> {getReadTime(article.content)}</span>
                            <span className="flex items-center gap-1">
                              {new Date(article.created_at).toLocaleDateString('sv-SE')}
                            </span>
                          </div>

                          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 leading-tight group-hover:text-primary transition-colors">
                            {article.title}
                          </h3>
                          
                          {/* ✅ FIX: ডেসক্রিপশন টেক্সট ক্লিন করা */}
                          <div 
                            className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3 mb-6 leading-relaxed flex-grow"
                            dangerouslySetInnerHTML={{ 
                              __html: article.excerpt || article.content?.replace(/<[^>]+>/g, '').substring(0, 150) + "..." 
                            }} 
                          />

                          <div className="mt-auto inline-flex items-center text-primary font-bold text-sm gap-1 group-hover:gap-2 transition-all">
                            Läs mer <ArrowRight size={16} />
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-20">
                  <button 
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="p-3 rounded-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 disabled:opacity-30 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
                  >
                    <ChevronLeft size={20} />
                  </button>

                  <div className="flex items-center gap-2 bg-white/50 dark:bg-gray-900/50 backdrop-blur-md px-4 py-2 rounded-full border border-gray-200 dark:border-gray-700">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`w-8 h-8 rounded-full text-sm font-bold flex items-center justify-center transition-all ${
                          currentPage === page 
                          ? 'bg-primary text-white shadow-lg shadow-primary/30' 
                          : 'text-gray-600 dark:text-gray-400 hover:bg-white dark:hover:bg-gray-800'
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                  </div>

                  <button 
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="p-3 rounded-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 disabled:opacity-30 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              )}
            </>
        )}

        {currentArticles.length === 0 && !loading && (
            <div className="text-center py-20 text-gray-500">No articles found matching your criteria.</div>
        )}
      </div>

    </div>
  );
}