'use client';

import { motion } from 'framer-motion';

const mockNotices = [
  { id: 1, title: 'Admissions Open 2026-27 🎓', description: 'We are now accepting applications for the upcoming academic year. Fast-track your enrollment today.', date: 'March 2026' },
  { id: 2, title: 'Annual Tech Fest 🚀', description: 'Join us for the biggest science and coding exhibition of the year.', date: 'Feb 28, 2026' },
  { id: 3, title: 'Parent-Teacher Summit 🤝', description: 'A seamless interaction session scheduled for classes VI-X this month.', date: 'March 2026' },
];

export default function Notices() {
  return (
    <section id="notices" className="section relative overflow-hidden">
      <div className="container relative z-10">
        
        {/* Animated Premium Notice Ticker */}
        <div className="glass-panel p-2 flex items-center gap-4 mb-20 overflow-hidden rounded-full border border-primary/30 shadow-[0_0_30px_rgba(255,51,102,0.15)] max-w-5xl mx-auto">
          <div className="flex items-center gap-2 text-white font-black shrink-0 whitespace-nowrap bg-gradient-main px-4 py-2 rounded-full shadow-lg">
            <span className="animate-pulse">🔥</span>
            LIVE ALERTS
          </div>
          <div className="flex-1 overflow-hidden relative">
            <motion.div
              animate={{ x: ["0%", "-100%"] }}
              transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
              className="whitespace-nowrap flex gap-12"
            >
              {[...mockNotices, ...mockNotices].map((notice, idx) => (
                <span key={idx} className="text-gray-300 font-semibold tracking-wide flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  {notice.title} <span className="text-gray-500 font-normal">({notice.date})</span>
                </span>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Notice Board Timeline */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">Notice Board 📣</h2>
            <p className="text-xl text-gray-400">Stay in sync with all critical updates instantly.</p>
          </div>

          <div className="space-y-6 relative before:absolute before:inset-0 before:ml-6 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-1 before:bg-gradient-to-b before:from-transparent before:via-primary/50 before:to-transparent">
            {mockNotices.map((notice, index) => (
              <motion.div 
                key={notice.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group"
              >
                {/* Glowing Timeline Dot */}
                <div className="flex items-center justify-center w-12 h-12 rounded-full border border-white/20 bg-bg-surface text-2xl shadow-[0_0_15px_rgba(255,255,255,0.1)] shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                  📅
                </div>
                
                {/* Premium Notice Card */}
                <div className="w-[calc(100%-4.5rem)] md:w-[calc(50%-3rem)] glass-card p-6">
                  <div className="flex flex-col gap-2 mb-4">
                    <span className="text-xs font-bold text-secondary uppercase tracking-widest bg-secondary/10 px-3 py-1 rounded-full w-fit">
                      {notice.date}
                    </span>
                    <h3 className="font-bold text-2xl text-white">{notice.title}</h3>
                  </div>
                  <p className="text-gray-400 text-base leading-relaxed">
                    {notice.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
