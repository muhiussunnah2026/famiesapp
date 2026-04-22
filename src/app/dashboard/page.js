'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, PenTool, Users, LogOut, Save, Loader2, 
  Search, Plus, Settings, ExternalLink, 
  Trash2, Edit, DollarSign, UserCheck, 
  ChevronLeft, ChevronRight, Lock, Unlock, Link as LinkIcon, AlertTriangle, X
} from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import dynamic from 'next/dynamic';

// React Quill (No SSR)
const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });
import 'react-quill-new/dist/quill.snow.css';

// সুইডিশ ক্যাটাগরি লিস্ট
const DEFAULT_CATEGORIES = [
  "Bebis & Du", "Familjeliv & Pepp", "Fira & Njuta", "Lär & Utforska", 
  "Lek & Fart", "Mat & Mums", "Mys & Hitta på", "Ses & Hitta på", 
  "Tillgängligt för alla", "Utflykter & Kul", "Ut & Upptäck"
];

// 🔥 SUPER ADMIN EMAIL
const SUPER_ADMIN_EMAIL = "itsinjamul@gmail.com";

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview'); 

  // --- Initial Data Fetching ---
  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/login');
        return;
      }
      setUser(user);
      
      const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single();
      const userRole = profile?.role || 'user';
      setRole(userRole);

      if (userRole === 'editor') setActiveTab('content');
      if (userRole === 'user') setActiveTab('settings'); 
      
      setLoading(false);
    };
    checkUser();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
    toast.success('Logged out successfully');
  };

  if (loading) return <div className="h-screen w-full flex items-center justify-center bg-gray-50 dark:bg-black"><Loader2 className="animate-spin text-primary" size={40} /></div>;

  return (
    // ✅ লেআউট ফিক্স: h-screen এবং overflow-hidden প্যারেন্টে দেওয়া হয়েছে যাতে ডাবল স্ক্রলবার না আসে
    <div className="h-screen w-full bg-gray-50 dark:bg-black flex font-sans selection:bg-primary selection:text-white overflow-hidden">
      <Toaster position="top-right" />
      
      {/* --- SIDEBAR --- */}
      <aside className="w-72 bg-white/80 dark:bg-gray-900/80 backdrop-blur-2xl border-r border-gray-200 dark:border-gray-800 p-6 flex flex-col h-full z-30 transition-all shrink-0">
        <div className="mb-10 flex items-center gap-3 px-2 cursor-pointer" onClick={() => router.push('/')}>
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-purple-600 rounded-xl flex items-center justify-center text-white font-extrabold text-xl shadow-lg">F</div>
          <div>
            <span className="font-bold text-lg dark:text-white block leading-none">Famies</span>
            <span className="text-[10px] uppercase tracking-wider text-gray-500 font-bold">Dashboard</span>
          </div>
        </div>

        <nav className="space-y-2 flex-1 overflow-y-auto pr-2 custom-scrollbar">
          <div className="text-xs font-bold text-gray-400 uppercase px-4 mb-2 mt-2">Menu</div>
          
          {role === 'admin' && (
            <>
              <NavItem icon={<LayoutDashboard size={18}/>} label="Overview" isActive={activeTab === 'overview'} onClick={() => setActiveTab('overview')} />
              <NavItem icon={<Users size={18}/>} label="User Management" isActive={activeTab === 'users'} onClick={() => setActiveTab('users')} />
            </>
          )}

          {(role === 'admin' || role === 'editor') && (
             <NavItem icon={<PenTool size={18}/>} label="Content Studio" isActive={activeTab === 'content'} onClick={() => setActiveTab('content')} />
          )}

          <div className="text-xs font-bold text-gray-400 uppercase px-4 mb-2 mt-6">Settings</div>
          <NavItem icon={<Settings size={18}/>} label="My Profile" isActive={activeTab === 'settings'} onClick={() => setActiveTab('settings')} />
          <NavItem icon={<ExternalLink size={18}/>} label="View Website" onClick={() => router.push('/')} />
        </nav>

        <div className="pt-6 border-t border-gray-200 dark:border-gray-700 mt-auto">
           <div className="flex items-center gap-3 mb-4 px-2 bg-gray-50 dark:bg-gray-800/50 p-3 rounded-xl">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-purple-500 text-white flex items-center justify-center font-bold text-xs">
                {user?.email?.charAt(0).toUpperCase()}
              </div>
              <div className="overflow-hidden">
                <p className="text-xs font-bold truncate dark:text-white w-32">{user?.email}</p>
                <p className="text-[10px] text-gray-500 capitalize">{role}</p>
              </div>
           </div>
           <button onClick={handleLogout} className="w-full flex items-center gap-2 px-4 py-2.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors text-sm font-bold">
             <LogOut size={18} /> Sign Out
           </button>
        </div>
      </aside>

      {/* --- MAIN CONTENT AREA --- */}
      {/* ✅ এখানে overflow-y-auto দেওয়া হয়েছে যাতে শুধু কনটেন্ট এরিয়া স্ক্রল হয় */}
      <main className="flex-1 h-full overflow-y-auto p-8 md:p-12 relative scroll-smooth">
        <header className="mb-8 flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-extrabold dark:text-white mb-2 tracking-tight">
              {activeTab === 'overview' && `Welcome back, Admin! 👋`}
              {activeTab === 'content' && 'Content Studio ✍️'}
              {activeTab === 'users' && 'User Management 👥'}
              {activeTab === 'settings' && 'Account Settings ⚙️'}
            </h1>
            <p className="text-gray-500 font-medium">Here is what’s happening with your platform today.</p>
          </div>
        </header>

        <div className="relative z-10 pb-20">
          {activeTab === 'overview' && role === 'admin' && <OverviewTab />}
          {activeTab === 'content' && <ContentStudio user={user} />}
          {activeTab === 'users' && role === 'admin' && <UsersListTab />}
          {activeTab === 'settings' && <SettingsTab user={user} />}
        </div>
      </main>
    </div>
  );
}

// ------------------------------------------------------------------
// 🔥 1. CONTENT STUDIO
// ------------------------------------------------------------------
function ContentStudio({ user }) {
  const [mode, setMode] = useState('list');
  const [editingArticle, setEditingArticle] = useState(null);

  return (
    <div className="bg-white dark:bg-gray-900 rounded-[2rem] p-8 border border-gray-200 dark:border-gray-800 shadow-xl min-h-[600px]">
      {mode === 'list' ? (
        <ArticleList 
          onCreateNew={() => { setEditingArticle(null); setMode('editor'); }} 
          onEdit={(article) => { setEditingArticle(article); setMode('editor'); }} 
        />
      ) : (
        <ArticleEditor 
          user={user} 
          initialData={editingArticle} 
          onCancel={() => setMode('list')} 
          onSuccess={() => setMode('list')} 
        />
      )}
    </div>
  );
}

function ArticleList({ onCreateNew, onEdit }) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const ITEMS_PER_PAGE = 20;

  const fetchArticles = async () => {
    setLoading(true);
    const from = (page - 1) * ITEMS_PER_PAGE;
    const to = from + ITEMS_PER_PAGE - 1;

    const { data, count, error } = await supabase
      .from('articles')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(from, to);

    if (error) toast.error('Error fetching articles');
    else {
      setArticles(data || []);
      setTotalCount(count || 0);
    }
    setLoading(false);
  };

  useEffect(() => { fetchArticles(); }, [page]);

  const handleDelete = async (id) => {
    if(!confirm("Are you sure?")) return;
    const { error } = await supabase.from('articles').delete().eq('id', id);
    if(error) toast.error(error.message);
    else {
      toast.success("Article deleted");
      fetchArticles();
    }
  }

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold dark:text-white">All Published Articles ({totalCount})</h2>
        <button onClick={onCreateNew} className="bg-primary hover:bg-pink-600 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg">
          <Plus size={18} /> Create New
        </button>
      </div>

      {loading ? <div className="flex justify-center py-20"><Loader2 className="animate-spin text-primary"/></div> : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-100 dark:border-gray-800 text-xs uppercase text-gray-400">
                  <th className="py-4 px-4 font-bold">Title</th>
                  <th className="py-4 px-4 font-bold">Category</th>
                  <th className="py-4 px-4 font-bold">Access</th>
                  <th className="py-4 px-4 font-bold">Date</th>
                  <th className="py-4 px-4 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {articles.map((article) => (
                  <tr key={article.id} className="border-b border-gray-50 dark:border-gray-800/50 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group">
                    <td className="py-4 px-4 font-bold max-w-xs truncate">{article.title}</td>
                    <td className="py-4 px-4"><span className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-md text-xs">{article.category}</span></td>
                    <td className="py-4 px-4">
                      {article.is_premium ? <span className="flex items-center gap-1 text-purple-600 font-bold text-xs"><Lock size={12}/> Premium</span> : <span className="flex items-center gap-1 text-green-600 font-bold text-xs"><Unlock size={12}/> Free</span>}
                    </td>
                    <td className="py-4 px-4 text-xs text-gray-500">{new Date(article.created_at).toLocaleDateString()}</td>
                    <td className="py-4 px-4 text-right">
                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => onEdit(article)} className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100"><Edit size={16}/></button>
                        <button onClick={() => handleDelete(article.id)} className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100"><Trash2 size={16}/></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {totalPages > 1 && (
             <div className="flex items-center justify-center gap-2 mt-8">
               <button disabled={page === 1} onClick={() => setPage(p => p - 1)} className="p-2 rounded-lg border hover:bg-gray-50 disabled:opacity-50"><ChevronLeft size={16}/></button>
               {Array.from({length: totalPages}, (_, i) => i + 1).map(p => (
                 <button key={p} onClick={() => setPage(p)} className={`w-8 h-8 rounded-lg font-bold text-sm ${page === p ? 'bg-primary text-white' : 'hover:bg-gray-50'}`}>{p}</button>
               ))}
               <button disabled={page === totalPages} onClick={() => setPage(p => p + 1)} className="p-2 rounded-lg border hover:bg-gray-50 disabled:opacity-50"><ChevronRight size={16}/></button>
             </div>
          )}
        </>
      )}
    </div>
  );
}

function ArticleEditor({ user, initialData, onCancel, onSuccess }) {
  const [publishing, setPublishing] = useState(false);
  const [categories, setCategories] = useState(DEFAULT_CATEGORIES);
  const [isAddingCat, setIsAddingCat] = useState(false);
  const [newCat, setNewCat] = useState('');
  
  const [postData, setPostData] = useState({ 
    title: initialData?.title || '', 
    slug: initialData?.slug || '', 
    category: initialData?.category || '', 
    content: initialData?.content || '', 
    image_url: initialData?.image_url || '',
    is_premium: initialData?.is_premium || false
  });

  const modules = {
    toolbar: [[{ 'header': [1, 2, 3, false] }], ['bold', 'italic', 'underline', 'strike', 'blockquote'], [{ 'list': 'ordered'}, { 'list': 'bullet' }], [{ 'align': [] }], ['link', 'image'], ['clean']],
  };

  const handlePublish = async (e) => {
    e.preventDefault();
    setPublishing(true);
    
    let finalSlug = postData.slug.trim() 
      ? postData.slug.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '') 
      : postData.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '') + '-' + Date.now();

    const payload = {
      title: postData.title,
      slug: finalSlug,
      category: postData.category,
      content: postData.content,
      image_url: postData.image_url,
      excerpt: postData.content.replace(/<[^>]+>/g, '').substring(0, 100) + '...',
      is_premium: postData.is_premium,
      author_id: user.id
    };

    let error;
    if (initialData?.id) {
      const res = await supabase.from('articles').update(payload).eq('id', initialData.id);
      error = res.error;
    } else {
      const res = await supabase.from('articles').insert([payload]);
      error = res.error;
    }

    setPublishing(false);
    if (error) toast.error(error.message);
    else {
      toast.success(initialData ? 'Article updated!' : 'Article published!');
      onSuccess();
    }
  };

  return (
    <div>
      <div className="flex items-center gap-4 mb-6 border-b border-gray-100 dark:border-gray-800 pb-4">
        <button onClick={onCancel} className="p-2 hover:bg-gray-100 rounded-full transition-colors"><ChevronLeft/></button>
        <h2 className="text-xl font-bold dark:text-white">{initialData ? 'Edit Article' : 'Create New Article'}</h2>
      </div>

      <form onSubmit={handlePublish} className="space-y-6">
        <div className="space-y-4">
          <div>
             <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">Title</label>
             <input type="text" required value={postData.title} onChange={e => setPostData({...postData, title: e.target.value})} className="w-full p-4 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary/50 outline-none" />
          </div>
          <div>
             <label className="text-sm font-bold text-gray-500 ml-1 flex items-center gap-1"><LinkIcon size={14}/> Custom Post URL (Slug)</label>
             <input type="text" placeholder="e.g. my-custom-url-name (optional)" value={postData.slug} onChange={e => setPostData({...postData, slug: e.target.value})} className="w-full p-3 rounded-xl bg-gray-100 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary/50 outline-none text-sm text-gray-600" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2 relative">
             <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">Category</label>
             {!isAddingCat ? (
               <div className="flex gap-2">
                 <select value={postData.category} onChange={e => setPostData({...postData, category: e.target.value})} required className="w-full p-4 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary/50 outline-none appearance-none">
                   <option value="" disabled>Select Category</option>
                   {categories.map(c => <option key={c} value={c}>{c}</option>)}
                 </select>
                 <button type="button" onClick={() => setIsAddingCat(true)} className="p-4 bg-gray-100 dark:bg-gray-800 rounded-xl hover:bg-gray-200"><Plus size={20}/></button>
               </div>
             ) : (
               <div className="flex gap-2">
                 <input type="text" placeholder="New Cat" value={newCat} onChange={e => setNewCat(e.target.value)} className="w-full p-4 rounded-xl bg-gray-50 border border-primary focus:ring-2 focus:ring-primary/50 outline-none" autoFocus />
                 <button type="button" onClick={() => {if(newCat) {setCategories([...categories, newCat]); setPostData({...postData, category: newCat}); setIsAddingCat(false);}}} className="px-4 bg-primary text-white rounded-xl font-bold">Add</button>
                 <button type="button" onClick={() => setIsAddingCat(false)} className="px-4 bg-gray-200 rounded-xl"><X size={20}/></button>
               </div>
             )}
          </div>

          <div className="space-y-2">
             <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">Access Type</label>
             <div className="flex gap-4">
               <label className={`flex-1 flex items-center justify-center gap-2 p-4 rounded-xl border-2 cursor-pointer transition-all ${!postData.is_premium ? 'border-green-500 bg-green-50 text-green-700' : 'border-gray-200 text-gray-500'}`}>
                 <input type="radio" name="type" className="hidden" checked={!postData.is_premium} onChange={() => setPostData({...postData, is_premium: false})} />
                 <Unlock size={18}/> Free
               </label>
               <label className={`flex-1 flex items-center justify-center gap-2 p-4 rounded-xl border-2 cursor-pointer transition-all ${postData.is_premium ? 'border-purple-500 bg-purple-50 text-purple-700' : 'border-gray-200 text-gray-500'}`}>
                 <input type="radio" name="type" className="hidden" checked={postData.is_premium} onChange={() => setPostData({...postData, is_premium: true})} />
                 <Lock size={18}/> Premium
               </label>
             </div>
           </div>
        </div>

        <div className="space-y-2">
           <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">Cover Image URL</label>
           <input type="text" required value={postData.image_url} onChange={e => setPostData({...postData, image_url: e.target.value})} className="w-full p-4 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary/50 outline-none" />
        </div>

        <div className="space-y-2">
           <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">Content</label>
           <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
             <ReactQuill theme="snow" value={postData.content} onChange={(content) => setPostData({...postData, content})} modules={modules} className="h-64 mb-12 text-gray-900 dark:text-white" />
           </div>
        </div>

        <div className="flex justify-end pt-4 gap-4">
          <button type="button" onClick={onCancel} className="px-6 py-4 rounded-xl font-bold text-gray-500 hover:bg-gray-100">Cancel</button>
          <button disabled={publishing} className="bg-black dark:bg-white text-white dark:text-black px-8 py-4 rounded-xl font-bold shadow-xl hover:scale-105 transition-all flex items-center gap-2">
            {publishing ? <Loader2 className="animate-spin"/> : <><Save size={20}/> {initialData ? 'Update Article' : 'Publish Now'}</>}
          </button>
        </div>
      </form>
    </div>
  );
}

// ------------------------------------------------------------------
// 🔥 2. USER MANAGEMENT TAB (FIXED: Custom Modal & Instant Update)
// ------------------------------------------------------------------
function UsersListTab() {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('All'); 
  const [page, setPage] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const ITEMS_PER_PAGE = 50; 

  // 🔥 CUSTOM MODAL STATE
  const [modal, setModal] = useState({ isOpen: false, type: '', userId: '', newRole: '', inputValue: '' });

  const fetchProfiles = async () => {
    setLoading(true);
    let query = supabase.from('profiles').select('*', { count: 'exact' });
    
    const from = (page - 1) * ITEMS_PER_PAGE;
    const to = from + ITEMS_PER_PAGE - 1;
    
    query = query.order('created_at', { ascending: false }).range(from, to);

    const { data, count } = await query;
    if (data) {
      setProfiles(data);
      setTotalUsers(count || 0);
    }
    setLoading(false);
  };

  useEffect(() => { fetchProfiles(); }, [page, roleFilter]);

  // Modal Handlers
  const openRoleModal = (userId, newRole) => {
    setModal({ isOpen: true, type: 'role', userId, newRole, inputValue: '' });
  };

  const openDeleteModal = (userId) => {
    setModal({ isOpen: true, type: 'delete', userId, newRole: '', inputValue: '' });
  };

  const closeModal = () => {
    setModal({ isOpen: false, type: '', userId: '', newRole: '', inputValue: '' });
  };

  // ✅ CONFIRM ACTION & INSTANT UPDATE
  const handleConfirmAction = async () => {
    if (modal.inputValue !== 'confirmed') return;

    const toastId = toast.loading("Processing...");
    closeModal(); // Close modal immediately for better UX

    if (modal.type === 'role') {
      const { error } = await supabase.from('profiles').update({ role: modal.newRole }).eq('id', modal.userId);
      if (error) {
        toast.error("Failed to update role", { id: toastId });
      } else {
        toast.success(`Role updated to ${modal.newRole}`, { id: toastId });
        // 🔥 INSTANT UI UPDATE (Local State)
        setProfiles(prev => prev.map(p => p.id === modal.userId ? { ...p, role: modal.newRole } : p));
      }
    } else if (modal.type === 'delete') {
      const { error } = await supabase.from('profiles').delete().eq('id', modal.userId);
      if (error) {
        toast.error("Failed to delete", { id: toastId });
      } else {
        toast.success("User removed", { id: toastId });
        // 🔥 INSTANT UI UPDATE
        setProfiles(prev => prev.filter(p => p.id !== modal.userId));
      }
    }
  };

  // Filter Logic (Same as before)
  const filteredProfiles = profiles.filter(p => {
    const matchesSearch = p.email?.toLowerCase().includes(search.toLowerCase());
    const isSuperAdmin = p.email === SUPER_ADMIN_EMAIL;
    const isPaid = p.is_paid || isSuperAdmin;

    if (roleFilter === 'Free') return matchesSearch && !isPaid;
    if (roleFilter === 'Paid') return matchesSearch && isPaid;
    return matchesSearch;
  });

  const totalPages = Math.ceil(totalUsers / ITEMS_PER_PAGE);

  return (
    <div className="bg-white dark:bg-gray-900 rounded-[2rem] p-8 border border-gray-200 dark:border-gray-800 shadow-xl relative">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h2 className="text-xl font-bold dark:text-white">User Database</h2>
          <p className="text-sm text-gray-500 font-medium">Total Users: <span className="text-primary font-bold">{totalUsers}</span></p>
        </div>

        <div className="flex items-center gap-4">
           <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
              {['All', 'Free', 'Paid'].map(f => (
                <button 
                  key={f} 
                  onClick={() => { setRoleFilter(f); setPage(1); }}
                  className={`px-4 py-2 text-xs font-bold rounded-md transition-all ${roleFilter === f ? 'bg-white shadow text-black' : 'text-gray-500 hover:text-black'}`}
                >
                  {f} Users
                </button>
              ))}
           </div>
           <div className="relative">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16}/>
             <input type="text" placeholder="Search user..." value={search} onChange={e => setSearch(e.target.value)} className="pl-10 pr-4 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm focus:outline-none w-48"/>
           </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto min-h-[400px]">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-100 dark:border-gray-800 text-xs uppercase text-gray-400">
              <th className="py-4 px-4 font-bold">User Details</th>
              <th className="py-4 px-4 font-bold">Plan</th> 
              <th className="py-4 px-4 font-bold">Role</th>
              <th className="py-4 px-4 font-bold">Date</th>
              <th className="py-4 px-4 font-bold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {filteredProfiles.map((profile) => {
               const isSuperAdmin = profile.email === SUPER_ADMIN_EMAIL;
               const isPaid = profile.is_paid || isSuperAdmin;

               return (
                <tr key={profile.id} className="border-b border-gray-50 dark:border-gray-800/50 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                  <td className="py-4 px-4">
                    <div className="font-bold text-gray-900 dark:text-white">{profile.full_name || 'No Name'}</div>
                    <div className="text-xs text-gray-500">{profile.email}</div>
                  </td>
                  <td className="py-4 px-4">
                    {isPaid ? (
                      <span className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-xs font-bold border border-purple-200 shadow-sm">Paid</span>
                    ) : (
                      <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-bold border border-gray-200">Free</span>
                    )}
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-2 py-1 rounded text-xs font-bold capitalize ${profile.role === 'admin' ? 'text-red-500 bg-red-50' : 'text-blue-500 bg-blue-50'}`}>{profile.role}</span>
                  </td>
                  <td className="py-4 px-4 text-gray-500 text-xs">{new Date(profile.created_at).toLocaleDateString()}</td>
                  <td className="py-4 px-4 text-right">
                    <div className="flex justify-end gap-2">
                      <select 
                        value={profile.role} 
                        onChange={(e) => openRoleModal(profile.id, e.target.value)} 
                        className="text-xs bg-white border border-gray-200 rounded-lg p-1.5 cursor-pointer outline-none hover:border-primary transition-colors font-medium shadow-sm"
                      >
                        <option value="user">User</option>
                        <option value="editor">Editor</option>
                        <option value="admin">Admin</option>
                      </select>
                      <button onClick={() => openDeleteModal(profile.id)} className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"><Trash2 size={16}/></button>
                    </div>
                  </td>
                </tr>
               );
            })}
          </tbody>
        </table>
        {filteredProfiles.length === 0 && <p className="text-center text-gray-500 mt-10">No users found.</p>}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
         <div className="flex items-center justify-center gap-2 mt-8 pt-6 border-t border-gray-100 dark:border-gray-700">
           <button disabled={page === 1} onClick={() => setPage(p => p - 1)} className="px-3 py-1 rounded-lg border hover:bg-gray-50 disabled:opacity-50 text-sm font-medium">Prev</button>
           {Array.from({length: totalPages}, (_, i) => i + 1).map(p => (
             <button key={p} onClick={() => setPage(p)} className={`w-8 h-8 rounded-lg font-bold text-sm transition-all ${page === p ? 'bg-black text-white' : 'hover:bg-gray-100 text-gray-500'}`}>{p}</button>
           ))}
           <button disabled={page === totalPages} onClick={() => setPage(p => p + 1)} className="px-3 py-1 rounded-lg border hover:bg-gray-50 disabled:opacity-50 text-sm font-medium">Next</button>
         </div>
      )}

      {/* 🔥 CUSTOM MODAL (Fixed Overlay) */}
      <AnimatePresence>
        {modal.isOpen && (
          <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={closeModal} />
            
            {/* Modal Box */}
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }} 
              exit={{ scale: 0.95, opacity: 0 }} 
              className="bg-white dark:bg-gray-900 rounded-2xl p-6 w-full max-w-md shadow-2xl relative z-10 border border-gray-100 dark:border-gray-700"
            >
              <button onClick={closeModal} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"><X size={20}/></button>
              
              <div className="flex flex-col items-center text-center">
                <div className={`p-3 rounded-full mb-4 ${modal.type === 'delete' ? 'bg-red-100 text-red-500' : 'bg-blue-100 text-blue-500'}`}>
                  {modal.type === 'delete' ? <Trash2 size={24}/> : <AlertTriangle size={24}/>}
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {modal.type === 'delete' ? 'Delete User?' : 'Change User Role?'}
                </h3>
                
                <p className="text-sm text-gray-500 mb-6 leading-relaxed">
                  {modal.type === 'delete' 
                    ? 'Are you sure you want to permanently delete this user? This action cannot be undone.' 
                    : `Are you sure you want to change this user's role to "${modal.newRole}"?`}
                  <br/>
                  <span className="font-bold text-gray-700 dark:text-gray-300 mt-2 block">Type "confirmed" below to proceed.</span>
                </p>

                <input 
                  type="text" 
                  value={modal.inputValue}
                  onChange={(e) => setModal({...modal, inputValue: e.target.value})}
                  placeholder="Type confirmed"
                  className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-center font-bold text-sm focus:ring-2 focus:ring-primary/50 outline-none mb-6"
                  autoFocus
                />

                <div className="flex gap-3 w-full">
                  <button onClick={closeModal} className="flex-1 py-3 rounded-xl font-bold text-gray-500 hover:bg-gray-100 transition-colors">Cancel</button>
                  <button 
                    onClick={handleConfirmAction} 
                    disabled={modal.inputValue !== 'confirmed'}
                    className={`flex-1 py-3 rounded-xl font-bold text-white transition-all shadow-lg ${
                      modal.inputValue === 'confirmed' 
                        ? (modal.type === 'delete' ? 'bg-red-500 hover:bg-red-600' : 'bg-black hover:bg-gray-800') 
                        : 'bg-gray-300 cursor-not-allowed'
                    }`}
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}

// ------------------------------------------------------------------
// 🔥 3. SETTINGS TAB (EMAIL UPDATE ENABLED)
// ------------------------------------------------------------------
function SettingsTab({ user }) {
  const [formData, setFormData] = useState({ full_name: '', avatar_url: '', email: '' });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single();
      setFormData({ full_name: data?.full_name || '', avatar_url: data?.avatar_url || '', email: user.email });
    };
    if (user) fetchProfile();
  }, [user]);

  const handleUpdate = async (e) => {
    e.preventDefault(); 
    setSaving(true);
    
    try {
      const { error: profileError } = await supabase.from('profiles').update({ 
        full_name: formData.full_name, 
        avatar_url: formData.avatar_url 
      }).eq('id', user.id);
      
      if(profileError) throw profileError;

      // ✅ Email Update Logic
      if (formData.email !== user.email) {
        const { error: emailError } = await supabase.auth.updateUser({ email: formData.email });
        if (emailError) throw emailError;
        toast.success('Check both new and old emails to confirm change! 📧');
      } else {
        toast.success('Profile updated successfully!');
      }
    } catch (error) {
      toast.error('Update failed: ' + error.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-gray-900 rounded-[2rem] p-10 border border-gray-200 dark:border-gray-800 shadow-xl">
      <h2 className="text-2xl font-bold mb-6">Edit Profile</h2>
      <form onSubmit={handleUpdate} className="space-y-6">
        <div className="flex flex-col items-center gap-4">
           <div className="w-28 h-28 rounded-full overflow-hidden bg-gray-100 border-4 shadow-inner">
              {formData.avatar_url ? <img src={formData.avatar_url} className="w-full h-full object-cover"/> : <div className="w-full h-full flex items-center justify-center font-bold text-3xl text-gray-300">{user?.email?.[0]}</div>}
           </div>
           <input type="text" value={formData.avatar_url} onChange={e => setFormData({...formData, avatar_url: e.target.value})} placeholder="Image URL" className="w-full p-3 rounded-xl bg-gray-50 border text-sm"/>
        </div>
        
        <div className="space-y-4">
          <div>
             <label className="text-sm font-bold text-gray-700 ml-1">Full Name</label>
             <input type="text" value={formData.full_name} onChange={e => setFormData({...formData, full_name: e.target.value})} placeholder="Full Name" className="w-full p-4 rounded-xl bg-gray-50 border outline-none focus:ring-2 focus:ring-primary/50"/>
          </div>
          <div>
             <label className="text-sm font-bold text-gray-700 ml-1">Email Address</label>
             {/* ✅ Email Enabled */}
             <input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full p-4 rounded-xl bg-white border border-gray-200 outline-none focus:ring-2 focus:ring-primary/50" />
             <p className="text-xs text-gray-400 mt-1 ml-1">Changing email will send a confirmation link.</p>
          </div>
        </div>

        <button disabled={saving} className="w-full bg-black text-white font-bold py-4 rounded-xl shadow-lg hover:scale-[1.01] transition-all flex items-center justify-center gap-2">
          {saving ? <Loader2 className="animate-spin"/> : 'Save Changes'}
        </button>
      </form>
    </div>
  );
}

// ------------------------------------------------------------------
// 🔥 4. OVERVIEW TAB
// ------------------------------------------------------------------
function OverviewTab() {
  const [filter, setFilter] = useState('lifetime');
  const [stats, setStats] = useState({ total: 0, free: 0, paid: 0, revenue: 0 });
  useEffect(() => {
    const fetchStats = async () => {
      const { count: totalUsers } = await supabase.from('profiles').select('*', { count: 'exact', head: true });
      const { count: editors } = await supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('role', 'editor');
      let mockRevenue = 12500; if (filter === '30days') mockRevenue = 1200; if (filter === 'year') mockRevenue = 8500;
      setStats({ total: totalUsers || 0, free: (totalUsers || 0) - (editors || 0), paid: editors || 0, revenue: mockRevenue });
    };
    fetchStats();
  }, [filter]);
  return (
    <div className="space-y-8">
      <div className="flex justify-end mb-4"><div className="bg-white p-1 rounded-xl border flex gap-1">{['30 Days', 'This Year', 'Lifetime'].map((f) => { const val = f.toLowerCase().replace(' ', ''); return (<button key={val} onClick={() => setFilter(val)} className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${filter === val ? 'bg-primary text-white shadow-md' : 'text-gray-500 hover:bg-gray-100'}`}>{f}</button>)})}</div></div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard title="Total Users" value={stats.total} icon={<Users size={20} className="text-blue-500"/>} color="bg-blue-50" />
        <StatCard title="Free Users" value={stats.free} icon={<UserCheck size={20} className="text-green-500"/>} color="bg-green-50" />
        <StatCard title="Paid/Pro Users" value={stats.paid} icon={<Settings size={20} className="text-purple-500"/>} color="bg-purple-50" />
        <StatCard title="Total Revenue" value={`$${stats.revenue}`} icon={<DollarSign size={20} className="text-yellow-500"/>} color="bg-yellow-50" trend="+12%" />
      </div>
    </div>
  );
}

// --- Shared Components ---
function NavItem({ icon, label, isActive, onClick }) { return <button onClick={onClick} className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all font-medium text-sm ${isActive ? 'bg-primary text-white shadow-lg' : 'text-gray-500 hover:bg-white'}`}>{icon} <span>{label}</span></button>; }
function StatCard({ title, value, icon, color, trend }) { return <div className="bg-white p-6 rounded-[2rem] border shadow-lg flex justify-between"><div className="flex flex-col"><span className="text-xs font-bold text-gray-400 uppercase">{title}</span><span className="text-3xl font-extrabold">{value}</span>{trend && <span className="text-green-500 text-xs font-bold mt-1">{trend} vs last month</span>}</div><div className={`p-3 rounded-xl ${color}`}>{icon}</div></div>; }