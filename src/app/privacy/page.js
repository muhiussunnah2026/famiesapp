"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { 
  Shield, Lock, Eye, Server, Share2, UserCheck, Globe, Bell, 
  FileText, MapPin, Smartphone, Database, Layers, 
  CheckCircle2, Clock, AlertTriangle 
} from "lucide-react";

// --- Animation Variants ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { type: "spring", stiffness: 100 }
  }
};

// Helper to highlight placeholders (Modified to handle block content)
const Placeholder = ({ children, isBlock }) => (
  <span className={`bg-rose-100 text-rose-600 font-bold px-2 py-0.5 rounded border border-rose-200 mx-1 ${isBlock ? 'inline-block my-1' : ''}`}>
    {children}
  </span>
);

export default function PrivacyPolicyPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);

  return (
    <div ref={containerRef} className="min-h-screen bg-white overflow-hidden relative text-slate-800">
      
      {/* 🌸 Soft Background Blobs (Matching Home Page) 🌸 */}
      <div className="fixed inset-0 z-0 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-rose-200/40 blur-[120px] mix-blend-multiply animate-blob"/>
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-emerald-100/60 blur-[120px] mix-blend-multiply animate-blob animation-delay-2000"/>
          <div className="absolute top-[40%] left-[30%] w-[40%] h-[40%] rounded-full bg-blue-100/40 blur-[120px] mix-blend-multiply animate-blob animation-delay-4000"/>
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 pt-32 pb-20 px-4 md:px-8">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="max-w-5xl mx-auto"
        >
          
          {/* Header Section */}
          <div className="text-center mb-16 relative">
             <motion.div variants={itemVariants}>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-100 text-rose-500 text-sm font-bold mb-6 shadow-sm">
                  <Shield className="w-4 h-4" /> Legal Document
                </div>
                <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 mb-6 tracking-tight">
                  Privacy <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-orange-400">Policy</span>
                </h1>
                <p className="text-slate-500 text-lg max-w-2xl mx-auto">
                  Transparency is key. Learn how we collect, use, and protect your data to give you the best experience on <span className="font-bold text-slate-800">Famies</span>.
                </p>
                <p className="mt-4 text-sm text-slate-400 font-medium">
                  Last Updated: <span className="text-slate-600">[20/01/2026]</span>
                </p>
             </motion.div>
          </div>

          {/* Glass Card Container */}
          <div className="bg-white/60 backdrop-blur-2xl border border-white/50 rounded-3xl shadow-xl shadow-slate-200/50 p-8 md:p-12 space-y-16">
            
            {/* 1. Introduction */}
            <Section>
              <SectionHeader icon={FileText} title="1. Introduction" />
              <div className="prose prose-lg max-w-none text-slate-600">
                <p className="text-xl leading-relaxed mb-6">
                  <span className="font-bold text-rose-600">Fam Map AB</span> ("we," "our," or "us") operates the 
                  <strong className="text-slate-900"> Famies mobile application</strong> (the "App"). 
                  This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our App.
                </p>
                <div className="p-5 bg-blue-50 border-l-4 border-blue-500 rounded-r-xl text-blue-800 font-medium shadow-sm">
                  By using the App, you agree to the collection and use of information in accordance with this Privacy Policy.
                </div>
              </div>
            </Section>

            {/* 2. Information We Collect */}
            <Section>
              <SectionHeader icon={Database} title="2. Information We Collect" />
              <p className="text-slate-600 mb-8 text-lg">We may collect the following categories of information to provide a better experience:</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InfoCard title="2.1 Personal Information" icon={UserCheck} color="rose">
                  <ul className="space-y-2 text-slate-600">
                    <li>• Name</li>
                    <li>• Email address</li>
                    <li>• Phone number</li>
                    <li>• Profile photo</li>
                    <li>• Age & Child Age Range</li>
                  </ul>
                </InfoCard>

                <InfoCard title="2.2 Account & Usage" icon={Layers} color="indigo">
                  <ul className="space-y-2 text-slate-600">
                    <li>• User ID & Login activity</li>
                    <li>• App interactions</li>
                    <li>• Content Engagement (Likes/Shares)</li>
                    <li>• Crash logs & performance</li>
                  </ul>
                </InfoCard>

                <InfoCard title="2.3 Device Information" icon={Smartphone} color="emerald">
                  <ul className="space-y-2 text-slate-600">
                    <li>• Device type & model</li>
                    <li>• OS version & App version</li>
                    <li>• Unique identifiers</li>
                    <li>• IP address & Language</li>
                  </ul>
                </InfoCard>

                <InfoCard title="2.4 Location & Content" icon={MapPin} color="orange">
                   <div className="space-y-2 mb-4 text-slate-600">
                    <div className="flex justify-between items-center bg-white/50 p-2 rounded">
                      <span>Precise GPS (Optional)</span> 
                      <span className="text-xs font-bold bg-green-100 text-green-700 px-2 py-1 rounded-full">Yes</span>
                    </div>
                    <div className="flex justify-between items-center bg-white/50 p-2 rounded">
                      <span>Approximate</span> 
                      <span className="text-xs font-bold bg-green-100 text-green-700 px-2 py-1 rounded-full">Yes</span>
                    </div>
                   </div>
                   <h5 className="font-bold text-slate-800 mt-4 mb-2 flex items-center gap-2 text-sm"><FileText className="w-4 h-4"/> 2.5 User Content</h5>
                   <p className="text-sm text-slate-500">Text, images, videos you upload.</p>
                </InfoCard>
              </div>
            </Section>

            {/* 3. How We Use Your Information */}
            <Section>
              <SectionHeader icon={Server} title="3. How We Use Your Information" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  "Provide and operate the App",
                  "Personalize content & match families",
                  "Improve app features & UX",
                  "Communicate with users",
                  "Send marketing messages",
                  "Ensure security & prevent fraud",
                  "Comply with legal obligations"
                ].map((item, index) => (
                  <motion.div 
                    key={index}
                    whileHover={{ scale: 1.01 }}
                    className="flex items-center gap-3 p-4 bg-white rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="bg-rose-100 p-1.5 rounded-full">
                      <CheckCircle2 className="w-4 h-4 text-rose-500" />
                    </div>
                    <span className="text-slate-700 font-medium">{item}</span>
                  </motion.div>
                ))}
              </div>
            </Section>

            {/* 4. Sharing and Disclosure */}
            <Section>
               <SectionHeader icon={Share2} title="4. Sharing and Disclosure" />
               <div className="space-y-8">
                  {/* 4.1 Service Providers */}
                  <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200">
                    <h3 className="text-xl font-bold text-slate-900 mb-4">4.1 Trusted Service Providers</h3>
                    <p className="mb-6 text-slate-600">We engage trusted third-party companies to help us operate the App. These providers process data according to their own privacy policies.</p>
                    
                    <h4 className="text-slate-400 font-bold mb-3 uppercase text-xs tracking-wider">Key Third-Party Partners:</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      <ProviderTag name="Firebase (Google)" services="Auth, Analytics, Database" />
                      <ProviderTag name="Appsflyer" services="Marketing Analytics" />
                      <ProviderTag name="RevenueCat" services="In-App Purchases" />
                      <ProviderTag name="Google Sign-In" services="Authentication" />
                      <ProviderTag name="Apple Sign-In" services="Authentication" />
                    </div>
                  </div>
                  
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-1 p-6 bg-white rounded-2xl border border-slate-100 shadow-sm">
                      <h4 className="font-bold text-slate-900 mb-2 text-lg">4.2 Legal Requirements</h4>
                      <p className="text-slate-600 text-sm">We may disclose your information if required by law or in response to valid legal requests.</p>
                    </div>
                    <div className="flex-1 p-6 bg-white rounded-2xl border border-slate-100 shadow-sm">
                      <h4 className="font-bold text-slate-900 mb-2 text-lg">4.3 Business Transfers</h4>
                      <p className="text-slate-600 text-sm">In connection with a merger, acquisition, or sale of assets, your information may be transferred.</p>
                    </div>
                  </div>
               </div>
            </Section>

            {/* 5 & 6. Retention and Security */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Section>
                <SectionHeader icon={Clock} title="5. Data Retention" small />
                <p className="text-slate-600 leading-relaxed">We retain personal information only for as long as necessary to fulfill the purposes described in this policy, unless a longer period is required by law.</p>
              </Section>
              <Section>
                <SectionHeader icon={Lock} title="6. Data Security" small />
                <p className="text-slate-600 mb-4 leading-relaxed">We implement strong administrative and technical measures (encryption, access controls) and use secure providers like Firebase.</p>
                <div className="text-xs text-rose-600 bg-rose-50 p-3 rounded-lg border border-rose-100 flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <span>No transmission method is 100% secure. We cannot guarantee absolute security.</span>
                </div>
              </Section>
            </div>

            {/* 7. User Rights */}
            <Section>
              <SectionHeader icon={Eye} title="7. Your Rights and Choices" />
              <p className="text-slate-600 mb-6">Depending on your location, you may have rights regarding your data.</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {['Access Data', 'Correct/Update', 'Request Deletion', 'Withdraw Consent'].map((right, i) => (
                  <motion.div whileHover={{scale: 1.05}} key={i} className="p-4 bg-white border border-slate-200 rounded-xl text-center font-bold text-slate-700 shadow-sm cursor-default hover:border-rose-300 hover:text-rose-500 transition-colors">
                    {right}
                  </motion.div>
                ))}
              </div>
              <div className="mt-6 text-center text-slate-500 text-sm">
                To exercise these rights, contact us at: <a href="mailto:privacy@famies.app" className="text-rose-500 font-bold hover:underline">privacy@famies.app</a>
              </div>
            </Section>

            {/* Remaining Sections (8-12) */}
            <div className="space-y-12 text-slate-600">
              <Section>
                <SectionHeader icon={UserCheck} title="8. Children’s Privacy" small />
                <p>The App is intended for parents/guardians. Children under 13 may only appear under parental control. We do not knowingly collect info from them without consent.</p>
              </Section>
              
              <Section>
                <SectionHeader icon={Globe} title="9. International Transfers" small />
                <p>Your information may be transferred to and processed in countries with different data protection laws. By using the App, you consent to this.</p>
              </Section>

              <Section>
                <SectionHeader icon={Share2} title="10. Community & Third-Party" small />
                <p>Famies is community-driven. We reserve the right to moderate content. We are not responsible for third-party links or services.</p>
              </Section>

              <Section>
                <SectionHeader icon={Bell} title="12. Changes to Policy" small />
                <p>We may update this policy periodically. Changes will be posted within the App with an updated effective date.</p>
              </Section>

              {/* 13. Contact Us - Clean Footer Style */}
              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-slate-50 p-10 rounded-3xl border border-slate-200 relative overflow-hidden"
              >
                 <SectionHeader icon={FileText} title="13. Contact Us" />
                 <p className="mb-8 text-lg">Have questions about this policy or our data practices?</p>
                 
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
                      <p className="text-xs text-slate-400 font-bold uppercase mb-1">Company</p>
                      <p className="font-bold text-slate-800">Fam Map AB</p>
                    </div>
                    <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
                      <p className="text-xs text-slate-400 font-bold uppercase mb-1">Email</p>
                      <a href="mailto:privacy@famies.app" className="font-bold text-rose-500 hover:underline">privacy@famies.app</a>
                    </div>
                    <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
                      <p className="text-xs text-slate-400 font-bold uppercase mb-1">Address</p>
                      <p className="font-bold text-slate-800 text-sm">
                        Sågvägen 38, 184 40 <br/> Åkersberga, Sweden
                      </p>
                    </div>
                 </div>
              </motion.div>

            </div>
          </div>
          {/* End Body */}
        </motion.div>
      </div>
      
      {/* Footer Decoration */}
      <div className="h-32 bg-gradient-to-t from-rose-50 to-transparent w-full mt-20"></div>
    </div>
  );
}

// --- Sub-Components for Structure & Animation ---

function Section({ children, className = "" }) {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, type: "spring", bounce: 0.3 }}
      className={`relative ${className}`}
    >
      {children}
    </motion.section>
  );
}

function SectionHeader({ icon: Icon, title, small }) {
  return (
    <div className={`flex items-center gap-3 mb-6 ${small ? 'mb-4' : ''}`}>
       <div className={`flex items-center justify-center rounded-xl bg-rose-50 border border-rose-100 text-rose-500 ${small ? 'p-2' : 'p-3'}`}>
         <Icon className={`${small ? 'w-5 h-5' : 'w-6 h-6'}`} />
       </div>
       <h2 className={`${small ? 'text-2xl' : 'text-3xl'} font-bold text-slate-900`}>
         {title}
       </h2>
    </div>
  );
}

function InfoCard({ title, icon: Icon, color, children }) {
  const colorMap = {
    rose: "bg-rose-50 border-rose-100 text-rose-500",
    indigo: "bg-indigo-50 border-indigo-100 text-indigo-500",
    emerald: "bg-emerald-50 border-emerald-100 text-emerald-500",
    orange: "bg-orange-50 border-orange-100 text-orange-500",
  };

  return (
    <motion.div 
      whileHover={{ scale: 1.02, translateY: -5 }}
      className={`p-6 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300 relative overflow-hidden group`}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className={`p-2 rounded-lg ${colorMap[color]}`}>
           <Icon className="w-5 h-5" />
        </div>
        <h3 className="text-lg font-bold text-slate-800">{title}</h3>
      </div>
      <div className="text-sm pl-1">
        {children}
      </div>
    </motion.div>
  );
}

function ProviderTag({ name, services }) {
  return (
    <div className="bg-white border border-slate-100 p-3 rounded-lg flex flex-col gap-1 shadow-sm">
      <span className="font-bold text-slate-700 text-sm">{name}</span>
      <span className="text-xs text-slate-400 leading-tight">{services}</span>
    </div>
  );
}