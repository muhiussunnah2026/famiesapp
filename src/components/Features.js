'use client';
import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
// আইকনগুলো ফিচারের সাথে মিল রেখে ইম্পোর্ট করা হলো
import { Tag, MessageCircle, Sparkles, LayoutGrid, CalendarCheck, MapPin, Info, Users, MessageSquare, UserCircle } from 'lucide-react';
import Image from 'next/image';

// ১০টি ফিচার (তোমার অ্যাপের স্ক্রিনশট অনুযায়ী অপটিমাইজ করা)
const features = [
  { 
    id: 1, 
    title: "Tips från familjer som är som din.", 
    description: "Upptäck platser, aktiviteter och upplevelser som andra familjer redan testat och som lyfts genom ett smart urval.", 
    icon: <Tag />, 
    color: "bg-pink-500", 
    text: "text-pink-500", 
    image: "/feature1.png" // notifications.png
  },
  { 
    id: 2, 
    title: "Famies följer med där du är.", 
    description: "Se vad som finns där du bor och i närheten.", 
    icon: <MessageCircle />, 
    color: "bg-blue-500", 
    text: "text-blue-500", 
    image: "/feature2.png" // messages_requests.png
  },
  { 
    id: 3, 
    title: "Slipp leta", 
    description: "Hitta något som funkar direkt utan att googla, scrolla runt eller fastna i idétorka.", 
    icon: <Sparkles />, 
    color: "bg-orange-500", 
    text: "text-orange-500", 
    image: "/feature3.png" // messages_requests_details_tips.png
  },
  { 
    id: 4, 
    title: "Vad ska vi göra idag?", 
    description: "Byggt för vardagar och helger i familjelivet.", 
    icon: <LayoutGrid />, 
    color: "bg-purple-500", 
    text: "text-purple-500", 
    image: "/feature4.png" // home_feed.jpg
  },
  { 
    id: 5, 
    title: "Alltid något nytt", 
    description: "För familjelivet, från småbarnsåren till större barn och nya behov.", 
    icon: <CalendarCheck />, 
    color: "bg-green-500", 
    text: "text-green-500", 
    image: "/feature5.png" // messages_invites_invited_parents_admin.png
  }
];

export default function Features() {
  const [activeFeature, setActiveFeature] = useState(0);

  return (
    <section className="relative w-full bg-white dark:bg-black py-20">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* হেডার */}
        <div className="text-center mb-16 md:mb-24">
          <div className="inline-block px-4 py-1.5 mb-4 rounded-full bg-primary/10 text-primary font-bold text-sm tracking-wide uppercase">
            För familjelivet
          </div>
          <h2 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white mb-6">
            Därför funkar <span className="text-primary">Famies</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Tips, aktiviteter och familjeupplevelser. Nära dig.
          </p>
        </div>

        {/* মেইন কন্টেইনার */}
        <div className="flex flex-col lg:flex-row items-start relative gap-10">
          
          {/* --- বাম পাশ: স্টিকি মোবাইল + ইন্ডিকেটর --- */}
          <div className="hidden lg:flex w-full lg:w-1/2 sticky top-24 h-[80vh] items-center justify-center gap-10">
            
            {/* ১. মোবাইল ফ্রেম */}
            <div className="relative w-[320px] h-[650px] bg-gray-900 rounded-[3.5rem] border-[12px] border-gray-900 shadow-2xl overflow-hidden ring-4 ring-gray-100 dark:ring-gray-800">
              
              {/* ডাইনামিক ফিচার ইমেজ লুপ */}
              {features.map((feature, index) => (
                <motion.div
                  key={feature.id}
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: activeFeature === index ? 1 : 0,
                    scale: activeFeature === index ? 1 : 1.05
                  }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 bg-white dark:bg-gray-800 flex items-center justify-center"
                >
                  <div className="relative w-full h-full bg-white dark:bg-gray-800">
                    <Image 
                      src={feature.image} 
                      alt={feature.title} 
                      fill 
                      className="object-cover"
                      priority={index < 2} 
                    />
                    {/* হালকা শ্যাডো ওভারলে */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-transparent"></div>
                  </div>
                </motion.div>
              ))}
              
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-36 h-7 bg-gray-900 rounded-b-3xl z-20"></div>
            </div>

            {/* ২. সাইড ইন্ডিকেটর (Side Indicators) - ফোনের ডান পাশে */}
            <div className="flex flex-col gap-3 justify-center h-full">
               {features.map((feature, index) => (
                 <div
                   key={index}
                   className={`w-2 rounded-full transition-all duration-500 ease-in-out
                     ${activeFeature === index 
                       ? `h-12 ${feature.color}` // Active: লম্বা এবং রঙিন
                       : 'h-2 bg-gray-300 dark:bg-gray-700' // Inactive: ছোট এবং ধূসর
                     }
                   `}
                 />
               ))}
            </div>

          </div>

          {/* --- ডান পাশ: টেক্সট কন্টেন্ট (Simple Scrollable Cards) --- */}
          <div className="w-full lg:w-1/2 flex flex-col pt-10 lg:pt-0 pl-0 lg:pl-10">
            {features.map((feature, index) => (
              <FeatureItem 
                key={feature.id} 
                feature={feature} 
                index={index} 
                activeFeature={activeFeature} 
                setActiveFeature={setActiveFeature} 
              />
            ))}
            <div className="h-[20vh]"></div>
          </div>

        </div>
      </div>
    </section>
  );
}

function FeatureItem({ feature, index, activeFeature, setActiveFeature }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-50% 0px -50% 0px" });
  const isActive = activeFeature === index;

  useEffect(() => {
    if (isInView) {
      setActiveFeature(index);
    }
  }, [isInView, index, setActiveFeature]);

  return (
    // কার্ড ডিজাইন
    <div ref={ref} className="flex flex-row min-h-[50vh] mb-4 group relative items-center">
      
      {/* কার্ড কন্টেন্ট */}
      <div className={`flex flex-col justify-center flex-1 p-8 lg:p-10 rounded-[2rem] transition-all duration-500 border 
        ${isActive 
          ? 'bg-white dark:bg-gray-900 shadow-2xl shadow-gray-200/50 dark:shadow-none border-gray-100 dark:border-gray-800 opacity-100 scale-100' 
          : 'bg-transparent border-transparent opacity-30 scale-95 grayscale'}`}>
        
        {/* আইকন */}
        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-md transition-all duration-500 ${feature.color} text-white`}>
          {React.cloneElement(feature.icon, { size: 30 })}
        </div>
        
        {/* টাইটেল */}
        <h3 className={`text-2xl md:text-3xl font-bold mb-4 transition-colors duration-300 ${isActive ? feature.text : 'text-gray-400'}`}>
          {feature.title}
        </h3>
        
        {/* ডেসক্রিপশন */}
        <p className={`text-lg leading-relaxed mb-6 transition-colors duration-300 ${isActive ? 'text-gray-600 dark:text-gray-300' : 'text-gray-400'}`}>
          {feature.description}
        </p>

        {/* স্টেপ নম্বর */}
        {isActive && (
          <motion.div 
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "auto" }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mt-auto"
          >
             <span className={`flex items-center justify-center w-8 h-8 rounded-full text-white text-sm font-bold shadow-sm ${feature.color}`}>
                {index + 1}
             </span>
             <div className="h-1 w-12 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.8 }}
                  className={`h-full ${feature.color}`}
                />
             </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}