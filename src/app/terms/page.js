"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { 
  Scale, ShieldCheck, User, Users, FileText, CreditCard, Lock, 
  Link as LinkIcon, AlertTriangle, RefreshCw, Gavel, Mail, 
  CheckCircle2, ArrowRight, XCircle, Globe, Shield 
} from "lucide-react";

// --- Components ---

// 1. Progress Bar Component
const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-rose-500 to-orange-400 origin-left z-50"
      style={{ scaleX }}
    />
  );
};

// 2. Section Card Component
const TermSection = ({ number, title, icon: Icon, children }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
      className="group relative bg-white/70 backdrop-blur-xl border border-white/50 p-8 rounded-3xl shadow-lg shadow-slate-200/50 hover:shadow-xl hover:shadow-rose-100/50 transition-all duration-300"
    >
      <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity">
        <span className="text-6xl font-black text-slate-900">{number}</span>
      </div>
      
      <div className="flex items-center gap-4 mb-6">
        <div className="p-3 bg-gradient-to-br from-rose-50 to-orange-50 rounded-2xl border border-rose-100 text-rose-500 group-hover:scale-110 transition-transform duration-300">
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

export default function TermsOfUsePage() {
  return (
    <div className="min-h-screen bg-[#FDFCFE] text-slate-800 overflow-hidden font-sans selection:bg-rose-100 selection:text-rose-600">
      
      <ScrollProgress />

      {/* 🌸 Dynamic Background (Same as Privacy) */}
      <div className="fixed inset-0 z-0 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-rose-200/40 blur-[120px] mix-blend-multiply animate-blob"/>
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-blue-100/40 blur-[120px] mix-blend-multiply animate-blob animation-delay-2000"/>
          <div className="absolute top-[40%] left-[30%] w-[40%] h-[40%] rounded-full bg-orange-100/40 blur-[120px] mix-blend-multiply animate-blob animation-delay-4000"/>
      </div>

      <div className="relative z-10 pt-32 pb-20 px-4 md:px-8 max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm text-sm font-semibold text-slate-500 mb-6">
              <Scale className="w-4 h-4 text-rose-500" /> Terms of Use
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 mb-6 tracking-tight">
              Rules of the <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-orange-400">App</span>
            </h1>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto">
              Please read these terms carefully before using Famies. They govern your relationship with our application.
            </p>
            <p className="mt-6 font-mono text-sm text-slate-400 bg-white/50 inline-block px-4 py-2 rounded-lg border border-slate-100">
              Effective Date: <span className="text-slate-700 font-bold">20/01/2026</span>
            </p>
          </motion.div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 gap-8">

          {/* 1. Introduction */}
          <TermSection number="01" title="Introduction" icon={FileText}>
            <p className="mb-4">
              These Terms of Use (“Terms”) govern your access to and use of the <strong className="text-slate-900">Famies mobile application</strong> (the “App”), operated by <strong>Fam Map AB</strong> (org.nr 559429-0768) (“we”, “our”, “us”).
            </p>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-xl mb-4 text-blue-900">
              By accessing or using the App, you agree to be bound by these Terms. If you do not agree, you must not use the App.
            </div>
            <p>
              These Terms should be read together with our <strong>Privacy Policy</strong>. If there is any conflict regarding personal data processing, the Privacy Policy shall prevail.
            </p>
          </TermSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* 1. Eligibility */}
            <TermSection number="01" title="Eligibility (Age & Family)" icon={Users}>
              <p className="mb-2">The App is intended for parents and legal guardians.</p>
              <ul className="space-y-2 text-sm">
                <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0"/> You must be at least 16 to create an account independently.</li>
                <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0"/> Under 18? You represent you have parent/guardian permission.</li>
                <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0"/> Children under 13 may only appear under parental supervision.</li>
              </ul>
            </TermSection>

            {/* 2. User Accounts */}
            <TermSection number="02" title="User Accounts" icon={User}>
              <p className="mb-2">To access features, you may need an account. You agree to:</p>
              <ul className="space-y-2 text-sm">
                <li className="flex gap-2"><ArrowRight className="w-4 h-4 text-slate-400"/> Provide accurate, complete, and up-to-date info.</li>
                <li className="flex gap-2"><ArrowRight className="w-4 h-4 text-slate-400"/> Keep login credentials confidential.</li>
                <li className="flex gap-2"><ArrowRight className="w-4 h-4 text-slate-400"/> Be responsible for all activity under your account.</li>
              </ul>
            </TermSection>
          </div>

          {/* 3. Acceptable Use */}
          <TermSection number="03" title="Acceptable Use & Community" icon={ShieldCheck}>
            <p className="mb-4">Famies is a community-driven platform. You agree to maintain a positive tone. You must <strong>NOT</strong>:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                "Violate laws or regulations", 
                "Infringe IP or privacy rights", 
                "Upload harmful/abusive content", 
                "Post sexual content involving minors (Zero Tolerance)", 
                "Spam, scam, or manipulate",
                "Reverse engineer or misuse the App"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 p-3 bg-white rounded-lg border border-slate-100 shadow-sm">
                  <XCircle className="w-4 h-4 text-rose-400 flex-shrink-0" /> <span className="text-sm font-medium">{item}</span>
                </div>
              ))}
            </div>
          </TermSection>

          {/* 4. Chat Rules */}
          <TermSection number="04" title="Chat & Messaging Rules" icon={Mail}>
            <p className="mb-3">If the App includes chat, you agree to use it responsibly. You must NOT:</p>
            <ul className="list-disc pl-5 space-y-1 mb-3 text-sm marker:text-rose-400">
              <li>Harass, threaten, or bully others.</li>
              <li>Send illegal, sexually explicit, or abusive messages.</li>
              <li>Attempt to move minors to off-platform channels.</li>
            </ul>
            <p className="text-xs text-slate-500 italic bg-slate-50 p-2 rounded">We may monitor and remove messages for safety and compliance.</p>
          </TermSection>

          {/* 5. Moderation */}
          <TermSection number="05" title="Moderation & Enforcement" icon={Shield}>
            <p className="text-sm">To protect users, Fam Map reserves the right to remove content, suspend accounts, or limit access at any time, with or without notice, if we believe behavior violates these Terms or creates risk.</p>
          </TermSection>

          {/* 6. User Content */}
          <TermSection number="06" title="User-Generated Content" icon={FileText}>
            <p className="mb-3">If you upload content ("User Content"):</p>
            <ul className="space-y-2 text-sm">
              <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-green-500"/> You retain ownership.</li>
              <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-green-500"/> You grant us a license to use it to operate and improve the App.</li>
              <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-green-500"/> You warrant you own the rights and it violates no laws.</li>
            </ul>
          </TermSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* 7. Subscriptions */}
            <TermSection number="07" title="Payments & Subs" icon={CreditCard}>
              <ul className="space-y-2 text-sm">
                <li className="flex gap-2"><ArrowRight className="w-4 h-4 text-slate-400"/> Processed via Apple/Google Stores.</li>
                <li className="flex gap-2"><ArrowRight className="w-4 h-4 text-slate-400"/> Prices displayed at purchase.</li>
                <li className="flex gap-2"><ArrowRight className="w-4 h-4 text-slate-400"/> Auto-renewal unless canceled via store settings.</li>
                <li className="flex gap-2"><ArrowRight className="w-4 h-4 text-slate-400"/> Refunds governed by store policies.</li>
              </ul>
            </TermSection>

            {/* 8. IP */}
            <TermSection number="08" title="Intellectual Property" icon={Lock}>
              <p>The App and all content (software, design, logos) are owned by <strong>Fam Map</strong> and protected by laws.</p>
              <p className="mt-2 text-sm font-bold text-rose-500">Do not copy or modify without permission.</p>
            </TermSection>
          </div>

          {/* 9 - 11 Group */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             <div className="md:col-span-1">
                <TermSection number="09" title="Third-Party Services" icon={LinkIcon}>
                  <p className="text-sm">We are not a party to transactions with third parties (tickets, bookings). We do not guarantee their services or accuracy.</p>
                </TermSection>
             </div>
             <div className="md:col-span-1">
                <TermSection number="10" title="Recommendations" icon={Gavel}>
                  <p className="text-sm">Event data and listings may change or be inaccurate. No guarantee is given regarding partner data availability.</p>
                </TermSection>
             </div>
             <div className="md:col-span-1">
                <TermSection number="11" title="User Responsibility" icon={AlertTriangle}>
                  <p className="text-sm">You are responsible for verifying details (safety, age, pricing) before acting. You use the App at your own risk.</p>
                </TermSection>
             </div>
          </div>

          {/* 13 & 14 Liability */}
          <TermSection number="13-14" title="Disclaimers & Liability" icon={AlertTriangle}>
            <div className="flex flex-col gap-4">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                <h4 className="font-bold mb-1">"AS IS" Basis</h4>
                <p className="text-sm">We do not guarantee the App will be uninterrupted, error-free, or fully secure.</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                <h4 className="font-bold mb-1">Limitation of Liability</h4>
                <p className="text-sm">Fam Map shall not be liable for indirect damages, loss of profits, or data, to the max extent permitted by Swedish law.</p>
              </div>
            </div>
          </TermSection>

          {/* 15. Indemnification */}
          <TermSection number="15" title="Indemnification" icon={ShieldCheck}>
             <p>You agree to indemnify Fam Map from claims arising out of your use of the App, your User Content, or your violation of these Terms.</p>
          </TermSection>

          {/* 16-17 Changes & Law */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <TermSection number="16" title="Changes to Terms" icon={RefreshCw}>
              <p>We may update these Terms. Continued use implies acceptance. Material changes will be notified.</p>
            </TermSection>
            <TermSection number="17" title="Governing Law" icon={Globe}>
              <p>Governed by <strong>Swedish law</strong>. Disputes handled by Swedish courts (Stockholm District Court), unless mandatory consumer rules apply.</p>
            </TermSection>
          </div>

          {/* 18. Contact Us */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-slate-900 to-slate-800 p-10 rounded-3xl text-white relative overflow-hidden"
          >
             <div className="absolute right-0 top-0 -mt-10 -mr-10 w-40 h-40 bg-rose-500/20 blur-[80px] rounded-full pointer-events-none"/>
             
             <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-white/10 rounded-xl backdrop-blur-md">
                  <Mail className="w-6 h-6 text-rose-400" />
                </div>
                <h2 className="text-3xl font-bold">Contact Us</h2>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <p className="text-slate-400 text-xs font-bold uppercase mb-1">Company</p>
                  <p className="font-medium text-lg">Fam Map AB</p>
                  <p className="text-xs text-slate-500">org.nr 559429-0768</p>
                </div>
                <div>
                  <p className="text-slate-400 text-xs font-bold uppercase mb-1">Email</p>
                  <a href="mailto:privacy@famies.app" className="font-medium text-lg hover:text-rose-400 transition-colors">privacy@famies.app</a>
                </div>
                <div>
                  <p className="text-slate-400 text-xs font-bold uppercase mb-1">Address</p>
                  <p className="font-medium">
                    Sågvägen 38<br/>
                    184 40 Åkersberga, Sweden
                  </p>
                </div>
             </div>
          </motion.div>

        </div>
      </div>
      
      {/* Footer Space */}
      <div className="h-24 bg-gradient-to-t from-white to-transparent w-full"></div>
    </div>
  );
}