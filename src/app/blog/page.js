'use client';
import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  Search,
  Clock,
  ChevronRight,
  ChevronLeft,
  Tag,
  Sparkles,
  ArrowRight,
  Loader2,
  BookOpen,
  Crown,
  CheckCircle2,
  Lock,
  Calendar,
  Star,
} from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';

const ARTICLES_PER_PAGE = 9; // 3x3 below the featured hero

const CATEGORIES = [
  'Alla',
  'Bebis & Du',
  'Familjeliv & Pepp',
  'Fira & Njuta',
  'Lär & Utforska',
  'Lek & Fart',
  'Mat & Mums',
  'Mys & Hitta på',
  'Ses & Hitta på',
  'Tillgängligt för alla',
  'Utflykter & Kul',
  'Ut & Upptäck',
];

const PRICING_OPTIONS = [
  { value: 'All', label: 'Alla' },
  { value: 'Free', label: 'Gratis' },
  { value: 'Premium', label: 'Premium' },
];

export default function BlogPage() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchInput, setSearchInput] = useState('');
  const [activeCategory, setActiveCategory] = useState('Alla');
  const [pricing, setPricing] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);

  const [activeFilters, setActiveFilters] = useState({
    query: '',
    category: 'Alla',
    pricing: 'All',
  });

  useEffect(() => {
    const fetchArticles = async () => {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .order('created_at', { ascending: false });
      if (!error && data) setArticles(data);
      setLoading(false);
    };
    fetchArticles();
  }, []);

  const getReadTime = (text) => {
    const words = text ? text.replace(/<[^>]+>/g, '').split(/\s+/).length : 0;
    return Math.max(1, Math.ceil(words / 200)) + ' min';
  };

  const filtered = useMemo(() => {
    const q = activeFilters.query.toLowerCase();
    return articles.filter((a) => {
      const matchQ =
        !q ||
        a.title?.toLowerCase().includes(q) ||
        (a.excerpt || a.content || '').toLowerCase().includes(q);
      const matchCat =
        activeFilters.category === 'Alla' || a.category === activeFilters.category;
      const matchP =
        activeFilters.pricing === 'All' ||
        (activeFilters.pricing === 'Free' && !a.is_premium) ||
        (activeFilters.pricing === 'Premium' && a.is_premium);
      return matchQ && matchCat && matchP;
    });
  }, [articles, activeFilters]);

  // Featured = newest article of the *unfiltered* set, shown only on page 1
  // and when no filters are active, so it always highlights the latest post.
  const noFilters =
    activeFilters.query === '' &&
    activeFilters.category === 'Alla' &&
    activeFilters.pricing === 'All';

  const featured = noFilters && currentPage === 1 ? articles[0] : null;

  const gridSource = featured
    ? filtered.filter((a) => a.id !== featured.id)
    : filtered;

  const totalPages = Math.max(
    1,
    Math.ceil(gridSource.length / ARTICLES_PER_PAGE)
  );
  const pageItems = gridSource.slice(
    (currentPage - 1) * ARTICLES_PER_PAGE,
    currentPage * ARTICLES_PER_PAGE
  );

  const handleSearch = () => {
    setActiveFilters({
      query: searchInput,
      category: activeCategory,
      pricing,
    });
    setCurrentPage(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePage = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 200, behavior: 'smooth' });
  };

  const getPageNumbers = () => {
    if (totalPages <= 6) return Array.from({ length: totalPages }, (_, i) => i + 1);
    if (currentPage <= 3) return [1, 2, 3, 4, '...', totalPages];
    if (currentPage >= totalPages - 2)
      return [1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
  };

  return (
    <div className="min-h-screen w-full relative overflow-hidden pb-24 section selection:bg-primary selection:text-white">
      {/* HERO */}
      <section className="relative z-10 pt-32 md:pt-36 pb-10 px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full glass shadow-soft">
            <BookOpen size={14} className="text-primary" />
            <span className="text-xs font-bold uppercase tracking-wider text-ink-700 dark:text-ink-100">
              Famies Magasinet
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black text-ink-900 dark:text-white mb-5 leading-[1.02]">
            Tips, guider & <span className="text-brand-gradient">familjeidéer.</span>
          </h1>

          <p className="text-lg md:text-xl text-ink-500 dark:text-ink-300 font-medium max-w-2xl mx-auto">
            Riktiga tips från riktiga familjer. Plocka upp något nytt att göra —
            eller något nytt att tänka på.
          </p>
        </motion.div>
      </section>

      <div className="relative z-10 px-4 max-w-7xl mx-auto">
        {/* SEARCH + FILTER BAR */}
        <div className="glass rounded-3xl p-4 md:p-5 shadow-soft mb-6">
          <div className="flex flex-col md:flex-row gap-3 items-stretch">
            {/* Search */}
            <div className="relative flex-1">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-300 pointer-events-none"
                size={18}
              />
              <input
                type="text"
                placeholder="Sök artiklar efter titel eller ämne..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                className="w-full bg-white/70 dark:bg-ink-100/5 border border-ink-100/70 dark:border-ink-700/50 rounded-2xl pl-11 pr-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/40 text-ink-900 dark:text-white placeholder:text-ink-300"
              />
            </div>

            {/* Category select */}
            <div className="relative">
              <Tag
                className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-300 pointer-events-none"
                size={16}
              />
              <select
                value={activeCategory}
                onChange={(e) => setActiveCategory(e.target.value)}
                className="appearance-none bg-white/70 dark:bg-ink-100/5 border border-ink-100/70 dark:border-ink-700/50 rounded-2xl pl-11 pr-10 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/40 text-ink-900 dark:text-white font-medium cursor-pointer min-w-[200px]"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              <ChevronRight
                className="absolute right-3 top-1/2 -translate-y-1/2 rotate-90 text-ink-300 pointer-events-none"
                size={16}
              />
            </div>

            {/* Pricing select */}
            <div className="relative">
              <Sparkles
                className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-300 pointer-events-none"
                size={16}
              />
              <select
                value={pricing}
                onChange={(e) => setPricing(e.target.value)}
                className="appearance-none bg-white/70 dark:bg-ink-100/5 border border-ink-100/70 dark:border-ink-700/50 rounded-2xl pl-11 pr-10 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/40 text-ink-900 dark:text-white font-medium cursor-pointer min-w-[140px]"
              >
                {PRICING_OPTIONS.map((p) => (
                  <option key={p.value} value={p.value}>
                    {p.label}
                  </option>
                ))}
              </select>
              <ChevronRight
                className="absolute right-3 top-1/2 -translate-y-1/2 rotate-90 text-ink-300 pointer-events-none"
                size={16}
              />
            </div>

            {/* Search button */}
            <button
              onClick={handleSearch}
              className="press flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-primary text-white font-extrabold text-sm shadow-pink hover:shadow-glow-pink transition-all whitespace-nowrap"
            >
              <Search size={16} /> Sök
            </button>
          </div>
        </div>

        {/* Results count */}
        <p className="text-sm text-ink-500 dark:text-ink-300 mb-8 px-1">
          {loading ? (
            'Laddar artiklar...'
          ) : gridSource.length === 0 && !featured ? (
            'Inga artiklar hittade'
          ) : (
            <>
              Visar{' '}
              <strong className="text-ink-900 dark:text-white">
                {pageItems.length + (featured ? 1 : 0)}
              </strong>{' '}
              av{' '}
              <strong className="text-ink-900 dark:text-white">
                {filtered.length}
              </strong>{' '}
              artiklar
            </>
          )}
        </p>

        {loading ? (
          <div className="flex justify-center py-24">
            <Loader2 className="animate-spin text-primary" size={40} />
          </div>
        ) : filtered.length === 0 ? (
          <EmptyState
            hasFilters={
              activeFilters.query !== '' ||
              activeFilters.category !== 'Alla' ||
              activeFilters.pricing !== 'All'
            }
          />
        ) : (
          <>
            {/* FEATURED (1 line, full width) */}
            {featured && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="mb-10"
              >
                <FeaturedCard article={featured} readTime={getReadTime(featured.content)} />
              </motion.div>
            )}

            {/* 3×3 GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence mode="wait">
                {pageItems.map((article, index) => (
                  <motion.div
                    key={article.id}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 12 }}
                    transition={{ delay: (index % 9) * 0.05, duration: 0.45 }}
                  >
                    <ArticleCard
                      article={article}
                      readTime={getReadTime(article.content)}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* PAGINATION */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-16 flex-wrap">
                <button
                  onClick={() => handlePage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="press flex items-center gap-1.5 px-4 py-2.5 rounded-xl glass shadow-soft text-sm font-bold text-ink-900 dark:text-white disabled:opacity-30 transition-all"
                >
                  <ChevronLeft size={16} /> Föregående
                </button>

                {getPageNumbers().map((page, i) =>
                  page === '...' ? (
                    <span
                      key={`e-${i}`}
                      className="w-10 h-10 flex items-center justify-center text-ink-300"
                    >
                      …
                    </span>
                  ) : (
                    <button
                      key={page}
                      onClick={() => handlePage(page)}
                      className={`press w-10 h-10 rounded-xl text-sm font-black transition-all ${
                        currentPage === page
                          ? 'bg-primary text-white shadow-pink'
                          : 'glass text-ink-900 dark:text-white hover:-translate-y-0.5'
                      }`}
                    >
                      {page}
                    </button>
                  )
                )}

                <button
                  onClick={() => handlePage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="press flex items-center gap-1.5 px-4 py-2.5 rounded-xl glass shadow-soft text-sm font-bold text-ink-900 dark:text-white disabled:opacity-30 transition-all"
                >
                  Nästa <ChevronRight size={16} />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

/* ───────── FEATURED CARD (full width, 2 columns on md+) ───────── */
function FeaturedCard({ article, readTime }) {
  const href = `/blog/${article.slug}`;
  const date = article.created_at
    ? new Date(article.created_at).toLocaleDateString('sv-SE', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
    : '';

  return (
    <Link
      href={href}
      className="group relative grid md:grid-cols-[1.1fr_1fr] glass rounded-[2rem] md:rounded-[2.2rem] overflow-hidden shadow-soft hover:shadow-pink transition-all duration-500 hover:-translate-y-1"
    >
      {/* Featured ribbon */}
      <div className="absolute top-5 left-5 z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary text-white text-[10px] font-black uppercase tracking-wider shadow-pink">
        <Star size={12} className="fill-current" /> Utvald
      </div>

      {/* Image */}
      <div className="relative h-64 md:h-[26rem] overflow-hidden">
        {article.image_url ? (
          <img
            src={article.image_url}
            alt={article.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 bg-brand-gradient-soft flex items-center justify-center">
            <BookOpen size={48} className="text-primary/40" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/30 via-transparent to-transparent pointer-events-none" />

        {article.is_premium && (
          <div className="absolute top-5 right-5 z-10 flex items-center gap-1 px-2.5 py-1 rounded-full bg-ink-900/80 backdrop-blur text-white text-[10px] font-black">
            <Crown size={11} className="text-primary" /> PREMIUM
          </div>
        )}
      </div>

      {/* Body */}
      <div className="p-7 md:p-10 flex flex-col justify-center">
        <div className="flex items-center gap-2 mb-4 flex-wrap">
          <span className="px-2.5 py-1 rounded-full bg-primary/15 text-primary text-xs font-bold">
            {article.category || 'Artikel'}
          </span>
          {!article.is_premium ? (
            <span className="px-2 py-0.5 rounded-full bg-secondary/60 text-green-800 text-xs font-bold flex items-center gap-1">
              <CheckCircle2 size={11} /> Gratis
            </span>
          ) : (
            <span className="px-2 py-0.5 rounded-full bg-primary/20 text-primary text-xs font-bold flex items-center gap-1">
              <Crown size={11} /> Premium
            </span>
          )}
        </div>

        <h2 className="text-3xl md:text-4xl font-black text-ink-900 dark:text-white leading-tight mb-4 group-hover:text-primary transition-colors">
          {article.title}
        </h2>

        <div
          className="text-ink-500 dark:text-ink-300 text-base leading-relaxed mb-6 line-clamp-3"
          dangerouslySetInnerHTML={{
            __html:
              article.excerpt ||
              (article.content?.replace(/<[^>]+>/g, '').substring(0, 220) || '') +
                '...',
          }}
        />

        <div className="flex items-center gap-4 text-xs text-ink-500 dark:text-ink-300 font-semibold mb-6">
          <span className="flex items-center gap-1">
            <Clock size={13} /> {readTime}
          </span>
          {date && (
            <span className="flex items-center gap-1">
              <Calendar size={13} /> {date}
            </span>
          )}
        </div>

        <span className="inline-flex items-center gap-2 text-primary font-bold text-sm group-hover:gap-3 transition-all">
          Läs artikeln <ArrowRight size={16} />
        </span>
      </div>
    </Link>
  );
}

/* ───────── GRID ARTICLE CARD ───────── */
function ArticleCard({ article, readTime }) {
  const href = `/blog/${article.slug}`;
  const date = article.created_at
    ? new Date(article.created_at).toLocaleDateString('sv-SE', {
        day: 'numeric',
        month: 'short',
      })
    : '';

  return (
    <Link
      href={href}
      className="group relative glass rounded-3xl overflow-hidden shadow-soft h-full flex flex-col hover:-translate-y-1 hover:shadow-pink transition-all duration-500"
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        {article.image_url ? (
          <img
            src={article.image_url}
            alt={article.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="absolute inset-0 bg-brand-gradient-soft flex items-center justify-center">
            <BookOpen size={40} className="text-primary/40" />
          </div>
        )}

        <span className="absolute bottom-3 left-3 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur text-[10px] font-black uppercase tracking-wider text-ink-900 shadow-soft">
          {article.category || 'Artikel'}
        </span>

        {article.is_premium ? (
          <span className="absolute top-3 right-3 px-2 py-1 rounded-full bg-primary text-white text-[10px] font-black flex items-center gap-1 shadow-pink">
            <Crown size={10} /> PRO
          </span>
        ) : (
          <span className="absolute top-3 right-3 px-2 py-1 rounded-full bg-secondary/90 backdrop-blur text-green-800 text-[10px] font-black flex items-center gap-1">
            <CheckCircle2 size={10} /> FRI
          </span>
        )}
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-lg font-extrabold text-ink-900 dark:text-white leading-snug mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {article.title}
        </h3>

        <div
          className="text-ink-500 dark:text-ink-300 text-sm leading-relaxed line-clamp-2 mb-4 flex-1"
          dangerouslySetInnerHTML={{
            __html:
              article.excerpt ||
              (article.content?.replace(/<[^>]+>/g, '').substring(0, 140) || '') +
                '...',
          }}
        />

        {/* Meta */}
        <div className="flex items-center justify-between text-xs pt-3 border-t border-ink-100/70 dark:border-ink-700/50 text-ink-500 dark:text-ink-300 font-semibold">
          <span className="flex items-center gap-1">
            <Clock size={12} /> {readTime}
          </span>
          <span>{date}</span>
        </div>

        <div className="mt-3 flex items-center gap-1.5 text-sm font-bold text-primary group-hover:gap-2.5 transition-all">
          {article.is_premium ? (
            <>
              <Lock size={13} /> Lås upp & läs
            </>
          ) : (
            <>
              Läs mer <ArrowRight size={14} />
            </>
          )}
        </div>
      </div>
    </Link>
  );
}

/* ───────── EMPTY STATE ───────── */
function EmptyState({ hasFilters }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="w-20 h-20 rounded-3xl glass flex items-center justify-center mb-5 shadow-soft">
        <BookOpen className="text-primary" size={28} />
      </div>
      <h3 className="text-2xl md:text-3xl font-black text-ink-900 dark:text-white mb-3">
        {hasFilters ? 'Inga artiklar matchade' : 'Artiklar är på väg'}
      </h3>
      <p className="text-ink-500 dark:text-ink-300 max-w-md leading-relaxed">
        {hasFilters
          ? 'Prova en annan kategori, sökterm eller rensa filtren.'
          : 'Våra redaktörer skriver nytt innehåll varje vecka — titta in snart igen.'}
      </p>
    </div>
  );
}
