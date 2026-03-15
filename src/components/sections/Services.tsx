'use client';

import { motion } from 'framer-motion';

const services = [
  {
    title: 'Top-Tier Academics',
    description: 'A rigorous, modern curriculum designed to foster critical thinking and innovation.',
    emoji: '📚',
  },
  {
    title: 'Elite Faculty',
    description: 'Learn from highly qualified educators dedicated to student success and mentorship.',
    emoji: '👨‍🎓',
  },
  {
    title: 'Smart Classrooms',
    description: 'Fully tech-enabled spaces for an interactive, immersive learning experience.',
    emoji: '💻',
  },
  {
    title: 'Sports & Athletics',
    description: 'Extensive facilities to build physical fitness, discipline, and teamwork.',
    emoji: '🏃‍♂️',
  },
  {
    title: 'Arts & Culture',
    description: 'A vibrant space for students to express creativity through music, drama, and art.',
    emoji: '🎨',
  },
  {
    title: 'Global Exposure',
    description: 'Tours, seminars, and exchanges preparing students for the real world.',
    emoji: '🌍',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "linear" as const } },
};

export default function Services() {
  return (
    <section className="section bg-black/40 relative">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02] mix-blend-overlay pointer-events-none" />
      
      <div className="container relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-secondary/30 bg-secondary/10 mb-6">
            <span className="text-secondary text-sm font-bold uppercase tracking-widest">Our Offerings</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-8 leading-tight tracking-tight">
            Designed for <br/> <span className="text-hero-gradient hover:scale-[1.02] transition-transform inline-block origin-left">Absolute Brilliance</span>
          </h2>
          <p>
            We don't just teach; we provide an elite environment engineered to create leaders of tomorrow. 🌟
          </p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {services.map((service, index) => (
            <motion.div key={index} variants={itemVariants} className="h-full w-full max-w-full overflow-hidden">
              <div className="glass-card p-6 md:p-8 lg:p-12 h-full flex flex-col items-center text-center group relative w-full">
                
                {/* Glowing Orb Background */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-primary/10 rounded-full blur-[60px] transition-all duration-700 group-hover:bg-primary/20 group-hover:scale-150 -z-10" />
                
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl md:rounded-3xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 shadow-[inset_0_1px_rgba(255,255,255,0.2)] flex items-center justify-center mb-6 md:mb-8 backdrop-blur-md transition-transform duration-500 group-hover:-translate-y-2 group-hover:shadow-[0_10px_20px_rgba(0,0,0,0.3)] shrink-0">
                  <span className="text-3xl md:text-4xl">{service.emoji}</span>
                </div>
                
                <h3 className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4 tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-all w-full leading-snug">{service.title}</h3>
                <p className="flex-1 text-sm md:text-base lg:text-lg w-full leading-relaxed">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
