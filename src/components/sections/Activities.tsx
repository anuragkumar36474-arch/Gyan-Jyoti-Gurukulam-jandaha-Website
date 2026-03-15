'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const mockActivities = [
  { id: 1, title: 'Annual Sports Meet', category: 'Sports', emoji: '🏅', date: 'Dec 15, 2023', imageUrl: '/annualsports.png.jpeg' },
  { id: 2, title: 'Science Exhibition', category: 'Academics', emoji: '🔬', date: 'Nov 20, 2023', imageUrl: '/scienceexhibition.png.jpeg' },
  { id: 3, title: 'Cultural Festival', category: 'Cultural', emoji: '🎭', date: 'Oct 05, 2023', imageUrl: '/cultural.png.jpeg' },
  { id: 4, title: 'Inter-School Quiz Bowl', category: 'Academics', emoji: '🏆', date: 'Aug 25, 2023', imageUrl: '/quiz.png.jpeg' },
  { id: 5, title: 'Yoga Day Celebration', category: 'Wellness', emoji: '🧘‍♂️', date: 'Jun 21, 2023', imageUrl: '/yoga.png.jpeg' },
];

export default function Activities() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section id="activities" className="section relative bg-[#0f0f13] border-y border-white/10">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 mb-6">
            <span className="text-primary text-sm font-bold uppercase tracking-widest text-glow">Gallery Showcase</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            A Glimpse of <span className="text-gradient">Greatness 📸</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockActivities.map((activity, index) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card group cursor-pointer"
              onClick={() => setSelectedImage(activity.imageUrl)}
            >
              <div className="relative aspect-video overflow-hidden rounded-t-[20px]">
                <Image
                  src={activity.imageUrl}
                  alt={activity.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110 blur-[2px] group-hover:blur-0 filter brightness-75 group-hover:brightness-100"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f13] via-transparent to-transparent opacity-90" />
                <div className="absolute top-4 left-4">
                  <span className="bg-white/10 backdrop-blur-md text-white text-sm font-bold px-3 py-1.5 rounded-full border border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.1)] flex items-center gap-2">
                    {activity.emoji} {activity.category}
                  </span>
                </div>
              </div>
              <div className="p-6 relative flex flex-col items-center text-center">
                {/* Decorative glow on hover */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-primary/20 blur-[30px] rounded-full group-hover:bg-primary/40 transition-colors" />
                
                <h3 className="font-bold text-xl text-white mb-2 group-hover:text-primary transition-colors relative z-10">{activity.title}</h3>
                <p className="text-gray-400 text-sm font-semibold uppercase tracking-wider relative z-10">{activity.date}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* High-End Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 backdrop-blur-2xl"
            onClick={() => setSelectedImage(null)}
          >
            <button 
              className="absolute top-8 right-8 text-white hover:text-primary transition-colors bg-white/10 w-12 h-12 flex items-center justify-center rounded-full backdrop-blur-md border border-white/20 hover:scale-110"
              onClick={() => setSelectedImage(null)}
            >
              ✕
            </button>
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-6xl aspect-video rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(255,51,102,0.3)] border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedImage}
                alt="Enlarged view"
                fill
                className="object-contain"
                sizes="100vw"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
