'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const campusImages = [
  '/campus.png.jpeg',
  '/campus1.png.jpeg',
  '/campus3.png.jpeg',
  '/campus4.png.jpeg',
  '/campus5.png.jpeg'
];

const stats = [
  { label: 'Years of Excellence', value: '25+', emoji: '🎖️' },
  { label: 'Expert Teachers', value: '45+', emoji: '👨‍🏫' },
  { label: 'Happy Students', value: '1,500+', emoji: '🎒' },
  { label: 'Success Rate', value: '99%', emoji: '📈' },
];

export default function About() {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % campusImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="about" className="section relative">
      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 mb-6">
              <span className="text-primary text-sm font-bold uppercase tracking-widest">Who We Are</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-8 leading-tight">
              Igniting Minds, <br/>
              <span className="text-hero-gradient">Shaping Futures</span>
            </h2>
            
            <p className="mb-6">
              Established in 2000 in Jandaha, Vaishali, Gyan Jyoti Gurukulam is an institution built on the foundations of trust, modern academic rigor, and traditional values. 💡
            </p>
            <p className="mb-12">
              We provide a safe, high-tech, and nurturing ecosystem where every child's potential is unlocked to its maximum capacity.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 w-full max-w-full">
              {stats.map((stat, idx) => (
                <div key={idx} className="glass-card p-6 md:p-8 lg:p-10 group flex flex-col items-center text-center w-full">
                  <div className="flex flex-col items-center gap-3 md:gap-4 w-full">
                    <div className="text-3xl md:text-4xl w-14 h-14 md:w-16 md:h-16 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 shadow-inner group-hover:scale-110 transition-transform shrink-0">
                      {stat.emoji}
                    </div>
                    <div className="w-full">
                      <div className="text-2xl md:text-3xl lg:text-4xl font-black text-white mb-1 md:mb-2 drop-shadow-sm leading-none">{stat.value}</div>
                      <div className="text-xs md:text-sm font-bold text-gray-500 uppercase tracking-widest leading-snug">{stat.label}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Realistic Campus Visuals */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative h-[650px] rounded-[32px] glass-card overflow-hidden flex items-center justify-center p-2"
          >
            {/* Inner rounded container mapping to uploaded campus photos */}
            <div className="relative w-full h-full rounded-[24px] overflow-hidden bg-[#050508] border border-white/5 flex flex-col items-center justify-center group">
              
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={currentImage}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.2, ease: "easeInOut" }}
                  className="absolute inset-0 w-full h-full"
                >
                  <Image 
                    src={campusImages[currentImage]} 
                    alt="Main Campus Overview" 
                    fill 
                    className="object-cover transition-transform duration-[10000ms] ease-linear scale-110 filter brightness-90"
                    priority={currentImage === 0}
                  />
                </motion.div>
              </AnimatePresence>
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none z-10" />
              
              {/* Pagination Dots */}
              <div className="absolute top-6 right-6 flex gap-2 z-20">
                {campusImages.map((_, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setCurrentImage(idx)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentImage ? 'w-6 bg-primary cursor-default' : 'w-2 bg-white/30 hover:bg-white/50 cursor-pointer'}`}
                  />
                ))}
              </div>
              
              <div className="absolute bottom-6 left-6 right-6 z-20">
                {/* Thumbnails to show all photos - made more subtle */}
                <div className="flex justify-center gap-2">
                  {campusImages.map((img, idx) => (
                    <div 
                      key={idx} 
                      onClick={() => setCurrentImage(idx)}
                      className={`relative w-12 h-12 rounded-lg overflow-hidden cursor-pointer transition-all duration-300 border-2 ${idx === currentImage ? 'border-primary scale-110 shadow-lg shadow-primary/20' : 'border-white/10 opacity-60 hover:opacity-100 scale-100'}`}
                    >
                      <Image src={img} alt={`Campus ${idx}`} fill className="object-cover" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
