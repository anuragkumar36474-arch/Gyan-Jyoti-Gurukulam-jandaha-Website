'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative min-h-[100vh] w-full flex items-center justify-center pt-20 overflow-hidden">
      
      {/* Decorative Blur Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/30 rounded-full blur-[120px] mix-blend-screen -z-10 animate-pulse" style={{ animationDuration: '8s' }} />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-secondary/20 rounded-full blur-[150px] mix-blend-screen -z-10 animate-pulse" style={{ animationDuration: '12s' }} />

      <div className="container relative z-10 flex flex-col items-center text-center">
        
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl mx-auto flex flex-col items-center"
        >
          {/* Badge */}
          <div className="mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md shadow-[0_0_20px_rgba(255,51,102,0.15)]">
            <span className="text-xl">🎓</span>
            <span className="text-sm font-semibold tracking-wide text-gray-300">Defining Excellence Since 2000</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-8 leading-[1.1] tracking-tight">
            The Future of <br/>
            <span className="text-gradient relative">
              Education
              <span className="absolute -right-16 -top-8 text-6xl emoji-float hidden md:inline-block">🚀</span>
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-2xl font-medium leading-relaxed">
            Empowering young minds with world-class curriculum, deep moral values, and an environment engineered for greatness. 🌟
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center w-full sm:w-auto">
            <Link href="#about" className="btn-super text-lg px-10 group">
              Explore Campus 🏫
            </Link>
            <Link href="#notices" className="btn-super-outline text-lg px-10">
              View Bulletins 📌
            </Link>
          </div>
        </motion.div>

        {/* Floating Metrics / Proof */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="mt-20 md:mt-32 w-full max-w-5xl"
        >
          <div className="glass-card p-6 md:p-8 flex flex-col md:flex-row items-center justify-around gap-8 text-center">
            <div>
              <div className="text-4xl text-gradient font-bold mb-2">25+</div>
              <div className="text-sm font-semibold text-gray-400 uppercase tracking-widest">Years Legacy 🏆</div>
            </div>
            <div className="hidden md:block w-px h-16 bg-white/10" />
            <div>
              <div className="text-4xl text-gradient font-bold mb-2">10k+</div>
              <div className="text-sm font-semibold text-gray-400 uppercase tracking-widest">Alumni 🎓</div>
            </div>
            <div className="hidden md:block w-px h-16 bg-white/10" />
            <div>
              <div className="text-4xl text-gradient font-bold mb-2">100%</div>
              <div className="text-sm font-semibold text-gray-400 uppercase tracking-widest">Safe Campus 🛡️</div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay pointer-events-none z-50"></div>
    </section>
  );
}
