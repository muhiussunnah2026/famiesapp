'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  Clock, Calendar, ChevronRight, Tag, 
  Share2, Bookmark, Lock, Unlock, ArrowRight, Loader2
} from 'lucide-react';

export default function SingleBlogPost() {
  const { slug } = useParams();
  const router = useRouter();
  
  const [post, setPost] = useState(null);
  const [recentPosts, setRecentPosts] = useState([]);
  const [popularPosts, setPopularPosts] = useState([]);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPostData = async () => {
      setLoading(true);
      
      // ১. বর্তমান পোস্ট লোড
      const { data: currentPost, error } = await supabase
        .from('articles')
        .select('*')
        .eq('slug', slug)
        .single();

      if (error || !currentPost) {
        setLoading(false);
        return; 
      }

      setPost(currentPost);

      // ২. বাকি সব পোস্ট লোড (সাইডবার ও রিলেটেড এর জন্য)
      const { data: allPosts } = await supabase
        .from('articles')
        .select('*')
        .neq('id', currentPost.id)
        .order('created_at', { ascending: false });

      if (allPosts) {
        // Recent Posts Logic
        const freeRecent = allPosts.filter(p => !p.is_premium).slice(0, 4);
        const paidRecent = allPosts.filter(p => p.is_premium).slice(0, 2);
        const mixedRecent = [...freeRecent, ...paidRecent].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        setRecentPosts(mixedRecent);

        // Popular Posts Logic
        const shuffled = [...allPosts].sort(() => 0.5 - Math.random());
        const freePop = shuffled.filter(p => !p.is_premium).slice(0, 3);
        const paidPop = shuffled.filter(p => p.is_premium).slice(0, 2);
        setPopularPosts([...freePop, ...paidPop]);

        // Related Posts Logic
        const related = allPosts.filter(p => p.category === currentPost.category).slice(0, 3);
        setRelatedPosts(related.length > 0 ? related : allPosts.slice(0, 3));
      }

      setLoading(false);
    };

    if (slug) fetchPostData();
  }, [slug]);

  const getReadTime = (text) => {
    const words = text ? text.split(/\s+/).length : 0;
    return Math.ceil(words / 200) + " min";
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-white dark:bg-black"><Loader2 className="animate-spin text-primary" size={40} /></div>;
  }

  if (!post) return null;

  return (
    <div className="min-h-screen bg-white dark:bg-black font-sans selection:bg-primary selection:text-white pb-20">
      
      {/* --- Breadcrumb Header --- */}
      <div className="bg-gray-50 dark:bg-gray-900/50 pt-32 pb-12 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-6 overflow-x-auto whitespace-nowrap">
            <Link href="/" className="hover:text-primary transition-colors">Hem</Link>
            <ChevronRight size={14} />
            <Link href="/blog" className="hover:text-primary transition-colors">Blogg</Link>
            <ChevronRight size={14} />
            <span className="text-primary font-bold bg-primary/10 px-3 py-1 rounded-full">{post.category}</span>
          </div>
          
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight mb-6 max-w-5xl">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 dark:text-gray-400 font-medium">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-purple-500 flex items-center justify-center text-white font-bold text-sm shadow-md">A</div>
              <span className="text-gray-900 dark:text-white">Admin Team</span>
            </div>
            <span className="flex items-center gap-1.5"><Calendar size={16}/> {new Date(post.created_at).toLocaleDateString('sv-SE')}</span>
            <span className="flex items-center gap-1.5"><Clock size={16}/> {getReadTime(post.content)} läsning</span>
            {post.is_premium && <span className="flex items-center gap-1 text-purple-600 font-bold bg-purple-50 dark:bg-purple-900/20 px-3 py-1 rounded-full border border-purple-100"><Lock size={14}/> Premium</span>}
          </div>
        </div>
      </div>

      {/* --- Main Layout --- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* ================= LEFT CONTENT (8 Cols) ================= */}
        <div className="lg:col-span-8 min-w-0">
          
          {/* Main Image */}
          <div className="relative w-full aspect-video rounded-[2rem] overflow-hidden mb-10 shadow-2xl border border-gray-100 dark:border-gray-800">
            {post.image_url ? (
              <img src={post.image_url} alt={post.title} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center text-gray-400">No Image</div>
            )}
          </div>

          <article className="max-w-none">
            {/* HTML Content Rendering */}
            <div 
              className="
                text-lg md:text-xl 
                font-normal 
                text-gray-600 dark:text-gray-300
                leading-relaxed 
                break-words hyphens-none
                
                [&_p]:mb-6 
                [&_h2]:text-3xl [&_h2]:font-bold [&_h2]:text-gray-900 [&_h2]:dark:text-white [&_h2]:mt-10 [&_h2]:mb-4 
                [&_h3]:text-2xl [&_h3]:font-bold [&_h3]:text-gray-900 [&_h3]:dark:text-white [&_h3]:mt-8 [&_h3]:mb-3 
                [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mb-6
                [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:mb-6
                [&_li]:mb-2
                [&_a]:text-primary [&_a]:underline [&_a]:font-medium
                [&_img]:rounded-3xl [&_img]:shadow-lg [&_img]:my-8 [&_img]:w-full
              "
              dangerouslySetInnerHTML={{ __html: post.content }} 
            />
          </article>

          {/* Tags & Share */}
          <div className="mt-16 pt-8 border-t border-gray-100 dark:border-gray-800 flex flex-wrap justify-between items-center gap-4">
            <div className="flex gap-2 flex-wrap">
              {['Family', 'Kids', 'Stockholm', 'Lifestyle'].map(tag => (
                <span key={tag} className="bg-gray-50 dark:bg-gray-900 text-gray-600 dark:text-gray-300 px-4 py-2 rounded-full text-sm font-bold flex items-center gap-1 hover:bg-gray-100 transition-colors cursor-pointer">
                  <Tag size={14}/> {tag}
                </span>
              ))}
            </div>
            <div className="flex gap-3">
              <button className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gray-50 dark:bg-gray-900 hover:bg-primary hover:text-white transition-all font-bold text-sm text-gray-600 dark:text-gray-300 group">
                <Share2 size={18} className="group-hover:scale-110 transition-transform"/> Dela
              </button>
              <button className="p-3 rounded-full bg-gray-50 dark:bg-gray-900 hover:bg-primary hover:text-white transition-all text-gray-600 dark:text-gray-300">
                <Bookmark size={20}/>
              </button>
            </div>
          </div>

        </div>

        {/* ================= RIGHT SIDEBAR (4 Cols) ================= */}
        <aside className="lg:col-span-4 space-y-10">
          
          {/* Recent Articles */}
          <div className="bg-white dark:bg-gray-900 rounded-[2rem] p-6 border border-gray-100 dark:border-gray-800 shadow-lg sticky top-24">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1.5 h-8 bg-primary rounded-full"></div>
              <h3 className="font-extrabold text-xl text-gray-900 dark:text-white">Recent Articles</h3>
            </div>
            <div className="space-y-6">
              {recentPosts.map((item) => (
                <Link href={`/blog/${item.slug}`} key={item.id} className="flex gap-4 group">
                  <div className="w-24 h-24 bg-gray-200 rounded-2xl overflow-hidden shrink-0 relative shadow-sm">
                    {item.image_url && <img src={item.image_url} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt=""/>}
                    {item.is_premium && <div className="absolute bottom-0 right-0 bg-black/70 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-tl-lg">PRO</div>}
                  </div>
                  <div className="flex flex-col justify-center">
                    <h4 className="font-bold text-sm text-gray-800 dark:text-white line-clamp-2 group-hover:text-primary transition-colors leading-snug mb-1.5">
                      {item.title}
                    </h4>
                    <p className="text-xs text-gray-500 font-medium flex items-center gap-1">
                      <Clock size={12}/> {getReadTime(item.content)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Popular/Trendy */}
          <div className="bg-gradient-to-br from-primary/5 to-purple-500/5 rounded-[2rem] p-8 border border-primary/10">
              <div className="flex items-center gap-3 mb-6">
              <div className="w-1.5 h-8 bg-purple-500 rounded-full"></div>
              <h3 className="font-extrabold text-xl text-gray-900 dark:text-white">Trending Now</h3>
            </div>
            <div className="space-y-4">
              {popularPosts.map((item, idx) => (
                <Link href={`/blog/${item.slug}`} key={item.id} className="flex items-center justify-between group p-3 rounded-2xl hover:bg-white dark:hover:bg-gray-800 transition-all border border-transparent hover:border-gray-100 dark:hover:border-gray-700">
                  <div className="flex items-center gap-4">
                    <span className="text-3xl font-black text-gray-200 dark:text-gray-700 group-hover:text-primary transition-colors w-8">0{idx + 1}</span>
                    <h4 className="font-bold text-sm text-gray-800 dark:text-white line-clamp-2 w-32 group-hover:text-primary transition-colors">
                      {item.title}
                    </h4>
                  </div>
                  {item.is_premium ? <Lock size={16} className="text-purple-500"/> : <Unlock size={16} className="text-green-500"/>}
                </Link>
              ))}
            </div>
          </div>

        </aside>
      </div>

      {/* ================= RELATED ARTICLES (FIXED) ================= */}
      <section className="bg-gray-50 dark:bg-gray-900/30 py-20 mt-10 border-t border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2">You Might Also Like</h2>
              <p className="text-gray-500">More articles selected just for you.</p>
            </div>
            <Link href="/blog" className="hidden md:flex text-sm font-bold text-white bg-black dark:bg-white dark:text-black px-6 py-3 rounded-full items-center gap-2 hover:opacity-80 transition-all shadow-lg hover:shadow-xl">
              View All <ArrowRight size={16}/>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedPosts.map((item) => (
              <motion.div 
                whileHover={{ y: -8 }}
                key={item.id} 
                className="bg-white dark:bg-gray-900 rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all border border-gray-100 dark:border-gray-800 h-full group"
              >
                {/* ✅ FIX 1: পুরো কার্ডকে ক্লিকেবল করা হয়েছে */}
                <Link href={`/blog/${item.slug}`} className="flex flex-col h-full w-full cursor-pointer">
                  
                  {/* Image Part */}
                  <div className="h-56 overflow-hidden relative">
                    {item.image_url ? (
                      <img src={item.image_url} alt="" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"/>
                    ) : (
                      <div className="w-full h-full bg-gray-200"/>
                    )}
                    <div className="absolute top-4 left-4 bg-white/90 dark:bg-black/80 backdrop-blur px-3 py-1 rounded-lg text-xs font-extrabold shadow-md uppercase tracking-wider text-primary">
                      {item.category}
                    </div>
                  </div>

                  {/* Content Part */}
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-3 line-clamp-2 leading-tight group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    
                    {/* ✅ FIX 2: Text Broken Fix - HTML Entities পার্স করা হবে */}
                    <div 
                      className="text-gray-500 text-sm line-clamp-3 mb-6 flex-grow leading-relaxed"
                      dangerouslySetInnerHTML={{ 
                        __html: item.content?.replace(/<[^>]+>/g, '').substring(0, 150) + "..." 
                      }} 
                    />

                    {/* ✅ FIX 3: Swedish Text */}
                    <div className="text-primary font-extrabold text-sm inline-flex items-center gap-2 group-hover:gap-3 transition-all mt-auto">
                      Läs mer <ArrowRight size={16}/>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-10 md:hidden text-center">
             <Link href="/blog" className="inline-flex text-sm font-bold text-white bg-black px-8 py-3 rounded-full items-center gap-2 shadow-lg">
              View All Articles <ArrowRight size={16}/>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}