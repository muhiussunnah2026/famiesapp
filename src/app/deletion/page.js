"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { 
  Trash2, AlertTriangle, Smartphone, Mail, ShieldAlert, 
  CheckCircle2, Clock, Database, FileWarning, HelpCircle, 
  ArrowRight, XCircle, UserX 
} from "lucide-react";

// --- Components ---

// 1. Progress Bar
const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-rose-600 to-orange-500 origin-left z-50"
      style={{ scaleX }}
    />
  );
};

// 2. Section Card
const DeletionSection = ({ title, icon: Icon, children, danger }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      className={`group relative bg-white/70 backdrop-blur-xl border p-8 rounded-3xl shadow-lg transition-all duration-300 ${danger ? 'border-rose-200 shadow-rose-100/50' : 'border-white/50 shadow-slate-200/50'}`}
    >
      <div className="flex items-center gap-4 mb-6">
        <div className={`p-3 rounded-2xl border transition-transform duration-300 group-hover:scale-110 ${danger ? 'bg-rose-50 border-rose-100 text-rose-600' : 'bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-100 text-blue-600'}`}>
          <Icon className="w-6 h-6" />
        </div>
        <h2 className="text-2xl font-bold text-slate-800">{title}</h2>
      </div>
      
      <div className="text-slate-600 leading-relaxed text-sm md:text-base">
        {children}
      </div>
    </motion.div>
  );
};

// 3. Step Card for Instructions
const StepCard = ({ number, text }) => (
  <div className="flex items-center gap-4 p-4 bg-white rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-sm">
      {number}
    </div>
    <span className="font-medium text-slate-700">{text}</span>
  </div>
);

export default function DeletionPage() {
  return (
    <div className="min-h-screen bg-[#FDFCFE] text-slate-800 overflow-hidden font-sans selection:bg-rose-100 selection:text-rose-600">
      
      <ScrollProgress />

      {/* 🌸 Dynamic Background (Consistent Theme) */}
      <div className="fixed inset-0 z-0 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-rose-200/40 blur-[120px] mix-blend-multiply animate-blob"/>
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-orange-100/40 blur-[120px] mix-blend-multiply animate-blob animation-delay-2000"/>
          <div className="absolute top-[40%] left-[30%] w-[40%] h-[40%] rounded-full bg-slate-200/40 blur-[120px] mix-blend-multiply animate-blob animation-delay-4000"/>
      </div>

      <div className="relative z-10 pt-32 pb-20 px-4 md:px-8 max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-50 border border-rose-100 shadow-sm text-sm font-semibold text-rose-600 mb-6">
              <UserX className="w-4 h-4" /> Data Control
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight">
              Account Deletion <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-orange-500">Manual</span>
            </h1>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto">
              We respect your right to control your data. Here is everything you need to know about deleting your Famies account.
            </p>
          </motion.div>
        </div>

        {/* Content Grid */}
        <div className="space-y-8">

          {/* 1. Introduction */}
          <DeletionSection title="Introduction" icon={ShieldAlert}>
            <p className="mb-4">
              At <strong>Famies</strong>, we respect your right to control your personal data. You can request deletion of your account and associated personal data at any time. This page explains how to delete your account and what happens after deletion.
            </p>
            <div className="flex items-start gap-3 p-4 bg-rose-50 border border-rose-100 rounded-xl text-rose-800">
              <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <p className="text-sm font-medium">
                <strong>Important:</strong> Account deletion is intended to be <span className="underline decoration-wavy">permanent</span> and cannot normally be undone once completed.
              </p>
            </div>
          </DeletionSection>

          {/* 2. How to Delete (In-App) */}
          <DeletionSection title="How to Delete (In-App)" icon={Smartphone}>
            <p className="mb-6">You can delete your account directly in the App following these steps:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <StepCard number="1" text="Open Famies App and log in." />
              <StepCard number="2" text="Go to Profile or Settings." />
              <StepCard number="3" text="Scroll to the bottom." />
              <StepCard number="4" text="Tap 'Delete Account'." />
            </div>
            <div className="mt-6 flex items-center justify-center p-4 bg-slate-50 rounded-xl border border-slate-100 text-sm text-slate-500 italic text-center">
              "Once confirmed, your deletion request will be processed and your account may be deactivated during processing."
            </div>
          </DeletionSection>

          {/* 3. Alternative (Email) */}
          <DeletionSection title="Alternative Request" icon={Mail}>
            <p className="mb-4">If you cannot delete your account in the App, you may request deletion by email:</p>
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div className="space-y-3">
                <div className="flex flex-col md:flex-row gap-2">
                  <span className="font-bold text-slate-700 w-24">To:</span>
                  <a href="mailto:privacy@famies.app" className="text-blue-600 font-medium hover:underline">privacy@famies.app</a>
                </div>
                <div className="flex flex-col md:flex-row gap-2">
                  <span className="font-bold text-slate-700 w-24">Subject:</span>
                  <span className="text-slate-600">Account Deletion Request</span>
                </div>
                <div className="flex flex-col md:flex-row gap-2">
                  <span className="font-bold text-slate-700 w-24">Include:</span>
                  <span className="text-slate-600">Your account email address & User ID (if available).</span>
                </div>
              </div>
            </div>
            <p className="mt-4 text-xs text-slate-400">For security, we may ask you to confirm ownership of the account before processing.</p>
          </DeletionSection>

          {/* 4 & 5 Grid: What Deleted vs Retained */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <DeletionSection title="What Will Be Deleted" icon={Trash2} danger>
              <ul className="space-y-3">
                <li className="flex gap-2 items-start"><XCircle className="w-4 h-4 text-rose-500 mt-1"/> <span>Profile information (name, email, photo)</span></li>
                <li className="flex gap-2 items-start"><XCircle className="w-4 h-4 text-rose-500 mt-1"/> <span>Account identifiers & login access</span></li>
                <li className="flex gap-2 items-start"><XCircle className="w-4 h-4 text-rose-500 mt-1"/> <span>User-generated content (where feasible)</span></li>
              </ul>
              <p className="mt-4 text-xs text-slate-400">Note: Some content may remain anonymized to maintain platform integrity.</p>
            </DeletionSection>

            <DeletionSection title="What May Be Retained" icon={Database}>
              <ul className="space-y-3">
                <li className="flex gap-2 items-start"><CheckCircle2 className="w-4 h-4 text-emerald-500 mt-1"/> <span>Data required for legal/tax compliance</span></li>
                <li className="flex gap-2 items-start"><CheckCircle2 className="w-4 h-4 text-emerald-500 mt-1"/> <span>Transaction records (for chargebacks/fraud)</span></li>
                <li className="flex gap-2 items-start"><CheckCircle2 className="w-4 h-4 text-emerald-500 mt-1"/> <span>Security & audit logs</span></li>
              </ul>
              <p className="mt-4 text-xs text-slate-400">Any retention is limited to what is permitted under applicable law (GDPR).</p>
            </DeletionSection>
          </div>

          {/* 6. Effects of Deletion */}
          <DeletionSection title="Effects of Deletion" icon={FileWarning}>
            <ul className="space-y-3 mb-6">
              <li className="flex gap-3 bg-white p-3 rounded-lg border border-slate-100 shadow-sm">
                <ArrowRight className="w-5 h-5 text-slate-400"/>
                <span>You will lose access to the App and associated services.</span>
              </li>
              <li className="flex gap-3 bg-white p-3 rounded-lg border border-slate-100 shadow-sm">
                <ArrowRight className="w-5 h-5 text-slate-400"/>
                <span>Deleted data and content cannot normally be recovered.</span>
              </li>
            </ul>
            <div className="p-4 bg-orange-50 border-l-4 border-orange-400 rounded-r-xl">
              <h4 className="font-bold text-orange-800 mb-1">Subscriptions Warning</h4>
              <p className="text-sm text-orange-700">
                Deleting your account does <strong>NOT</strong> automatically cancel subscriptions. You must cancel them via Apple App Store or Google Play settings manually.
              </p>
            </div>
          </DeletionSection>

          {/* 7. Timeline */}
          <DeletionSection title="Timeline" icon={Clock}>
            <div className="flex items-center gap-6">
              <div className="text-center p-4 bg-white rounded-2xl shadow-sm border border-slate-100 min-w-[120px]">
                <span className="block text-3xl font-black text-slate-900">30</span>
                <span className="text-xs uppercase font-bold text-slate-400">Days</span>
              </div>
              <p>Deletion requests are typically processed within 30 days. Your account may be deactivated during this time.</p>
            </div>
            <p className="mt-4 text-sm text-slate-500">
              *In fraud, legal, or dispute cases, deletion may take longer where required by law.
            </p>
          </DeletionSection>

          {/* 8 & 9. Help & Legal (Footer Style) */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-slate-900 to-slate-800 p-8 rounded-3xl text-white relative overflow-hidden"
          >
             <div className="absolute right-0 top-0 -mt-10 -mr-10 w-40 h-40 bg-rose-500/20 blur-[80px] rounded-full pointer-events-none"/>
             
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               {/* Contact */}
               <div>
                 <div className="flex items-center gap-2 mb-4">
                   <HelpCircle className="w-5 h-5 text-rose-400"/>
                   <h3 className="text-xl font-bold">Need Help?</h3>
                 </div>
                 <p className="text-slate-400 mb-4 text-sm">If you have issues deleting your account:</p>
                 <a href="mailto:privacy@famies.app" className="block text-lg font-medium hover:text-rose-400 transition-colors mb-1">privacy@famies.app</a>
                 <p className="text-sm text-slate-500">
                   Fam Map AB (org.nr 559429-0768)<br/>
                   Sågvägen 38, 184 40 Åkersberga, Sweden
                 </p>
               </div>

               {/* GDPR */}
               <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                 <h4 className="font-bold text-rose-200 mb-2">Legal Rights (GDPR)</h4>
                 <p className="text-sm text-slate-300 leading-relaxed mb-3">
                   Under the EU GDPR, you may have the "right to be forgotten". If you believe we have not handled your request appropriately, you may contact the Swedish data protection authority (IMY).
                 </p>
               </div>
             </div>
          </motion.div>

        </div>
      </div>
      
      <div className="h-24 bg-gradient-to-t from-white to-transparent w-full mt-10"></div>
    </div>
  );
}