'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import { motion } from 'framer-motion';
import { User, Mail, Camera, Save, Loader2, ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';
import Image from 'next/image';

export default function Settings() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({ full_name: '', avatar_url: '', email: '' });
  const [avatarFile, setAvatarFile] = useState(null);

  useEffect(() => {
    const getProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push('/login'); return; }
      setUser(user);

      const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single();
      setFormData({
        full_name: data?.full_name || '',
        avatar_url: data?.avatar_url || '',
        email: user.email
      });
      setLoading(false);
    };
    getProfile();
  }, [router]);

  // ছবি আপলোড লজিক
  const uploadAvatar = async () => {
    if (!avatarFile) return formData.avatar_url;
    
    const fileExt = avatarFile.name.split('.').pop();
    const fileName = `${user.id}-${Date.now()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage.from('images').upload(filePath, avatarFile);
    if (uploadError) throw uploadError;

    // পাবলিক ইউআরএল পাওয়া
    const { data } = supabase.storage.from('images').getPublicUrl(filePath);
    return data.publicUrl;
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const publicUrl = await uploadAvatar();

      const { error } = await supabase.from('profiles').update({
        full_name: formData.full_name,
        avatar_url: publicUrl,
      }).eq('id', user.id);

      if (error) throw error;
      
      setFormData(prev => ({ ...prev, avatar_url: publicUrl }));
      toast.success('Profile updated successfully!');
      router.refresh();
    } catch (error) {
      toast.error('Error updating profile!');
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin text-primary"/></div>;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black py-20 px-4">
      <div className="max-w-2xl mx-auto">
        <button onClick={() => router.back()} className="flex items-center gap-2 text-gray-500 hover:text-primary mb-6 font-bold">
          <ArrowLeft size={20}/> Back
        </button>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-10 shadow-2xl border border-gray-100 dark:border-gray-800">
          <h1 className="text-3xl font-extrabold dark:text-white mb-2">Account Settings</h1>
          <p className="text-gray-500 mb-10">Update your personal details and public profile.</p>

          <form onSubmit={handleUpdate} className="space-y-8">
            
            {/* Avatar Section */}
            <div className="flex flex-col items-center gap-4">
               <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-gray-100 dark:border-gray-800 shadow-inner group">
                  {formData.avatar_url || avatarFile ? (
                    <img src={avatarFile ? URL.createObjectURL(avatarFile) : formData.avatar_url} alt="Avatar" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-tr from-primary to-purple-500 flex items-center justify-center text-white text-4xl font-bold">
                      {user.email[0].toUpperCase()}
                    </div>
                  )}
                  {/* Overlay Upload */}
                  <label className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                    <Camera className="text-white"/>
                    <input type="file" accept="image/*" className="hidden" onChange={e => setAvatarFile(e.target.files[0])} />
                  </label>
               </div>
               <p className="text-xs text-gray-400">Click image to upload new photo</p>
            </div>

            {/* Inputs */}
            <div className="space-y-4">
              <div className="space-y-2">
                 <label className="text-sm font-bold ml-1 text-gray-700 dark:text-gray-300">Full Name</label>
                 <div className="relative">
                   <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18}/>
                   <input type="text" value={formData.full_name} onChange={e => setFormData({...formData, full_name: e.target.value})} className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary/50 outline-none" placeholder="Your Name"/>
                 </div>
              </div>

              <div className="space-y-2 opacity-60 cursor-not-allowed">
                 <label className="text-sm font-bold ml-1 text-gray-700 dark:text-gray-300">Email Address (Read Only)</label>
                 <div className="relative">
                   <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18}/>
                   <input type="email" value={formData.email} disabled className="w-full pl-12 pr-4 py-4 bg-gray-100 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700 outline-none text-gray-500"/>
                 </div>
              </div>
            </div>

            <button disabled={saving} className="w-full bg-primary text-white font-bold py-4 rounded-xl shadow-lg hover:bg-pink-600 transition-all flex items-center justify-center gap-2">
              {saving ? <Loader2 className="animate-spin"/> : <><Save size={20}/> Save Changes</>}
            </button>

          </form>
        </motion.div>
      </div>
    </div>
  );
}