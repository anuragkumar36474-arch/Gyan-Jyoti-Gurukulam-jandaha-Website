'use client';

import { motion } from 'framer-motion';

const reasons = [
  {
    title: 'Future-Ready',
    description: 'We integrate modern tech with proven methodologies.',
    emoji: '🚀',
  },
  {
    title: 'Secure Campus',
    description: '24/7 security ensuring complete peace of mind.',
    emoji: '🛡️',
  },
  {
    title: 'Deep Values',
    description: 'Strong focus on ethics and personal responsibility.',
    emoji: '❤️',
  },
  {
    title: 'Global Perspective',
    description: 'Access to seminars that build worldly awareness.',
    emoji: '🌐',
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-[#0f0f13] relative overflow-hidden py-24 lg:py-32 border-y border-white/10">
      
      {/* Dynamic Laser Lines Background */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute left-1/4 top-0 w-[1px] h-full bg-gradient-to-b from-transparent via-primary/50 to-transparent" />
        <div className="absolute right-1/4 top-0 w-[1px] h-full bg-gradient-to-b from-transparent via-secondary/50 to-transparent" />
      </div>

      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          <div className="lg:col-span-5 relative">
            <div className="absolute -inset-10 bg-gradient-main opacity-10 blur-[100px] rounded-full z-0" />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative z-10"
            >
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-[1.1] tracking-tight text-white">
                The <span className="text-hero-gradient">Ultimate</span> <br/> Choice. ✨
              </h2>
              <p className="text-gray-400 text-xl leading-relaxed mb-10 font-medium">
                Gyan Jyoti Gurukulam isn't just a school. It's an elite launchpad for your child's future, trusted by thousands since 2000.
              </p>
              
              <div className="flex items-center gap-6 text-white font-bold text-lg">
                <div className="flex -space-x-4">
                  {[1,2,3].map(i => (
                    <div key={i} className="w-14 h-14 rounded-full border-[3px] border-[#030305] bg-gradient-to-br from-gray-800 to-black flex items-center justify-center font-bold shadow-xl z-20 hover:z-30 hover:-translate-y-1 transition-transform cursor-default">
                      {['👩‍🎓', '👨‍🏫', '🏆'][i-1]}
                    </div>
                  ))}
                  <div className="w-14 h-14 rounded-full border-[3px] border-[#030305] bg-primary flex items-center justify-center font-black text-sm shadow-xl z-20 hover:z-30 hover:-translate-y-1 transition-transform">
                    +10k
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-xl tracking-tight leading-none text-white drop-shadow-sm">Trusted Parents</span>
                  <span className="text-sm font-semibold text-primary mt-1">Across the Nation</span>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 lg:gap-6">
              {reasons.map((reason, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="glass-card p-10 flex flex-col items-center text-center hover:scale-[1.03] transition-transform cursor-default relative overflow-hidden group"
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="w-20 h-20 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 shadow-inner group-hover:-translate-y-2 transition-transform duration-500">
                    <span className="text-4xl">{reason.emoji}</span>
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-3 text-white tracking-tight">{reason.title}</h3>
                  <p className="text-gray-400 font-medium leading-relaxed text-base">{reason.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
