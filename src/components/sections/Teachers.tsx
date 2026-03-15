'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

const mockTeachers = [
  { id: 1, name: 'Ajeet Sir', subject: 'Director', photoUrl: '/ajeetsirdirector.png.jpeg' },
  { id: 2, name: 'Hariom Sir', subject: 'Principal', photoUrl: '/hariomsirprincipal.png.jpeg' },
  { id: 3, name: 'Raman Sir', subject: 'Science', photoUrl: '/ramansirscience.png.jpeg' },
  { id: 4, name: 'Rinku Mam', subject: 'Hindi', photoUrl: '/rinkumamhindi.png.jpeg' },
  { id: 5, name: 'Hari Shankar Jha', subject: 'Maths', photoUrl: '/harishankarjhamaths.png.jpeg' },
];

export default function Teachers() {
  return (
    <section id="teachers" className="section relative">
      <div className="container relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
            Meet the <span className="text-gradient">Visionaries 🧠</span>
          </h2>
          <p className="text-xl text-gray-400">
            Our faculty consists of industry veterans and academic scholars dedicated to molding the leaders of tomorrow.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {mockTeachers.map((teacher, index) => (
            <motion.div
              key={teacher.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card group cursor-pointer"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-t-[20px]">
                <Image
                  src={teacher.photoUrl}
                  alt={teacher.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110 filter group-hover:brightness-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
                {/* Glowing Overlay border effect on image hover */}
                <div className="absolute inset-0 border-4 border-transparent group-hover:border-primary/50 transition-all duration-300 rounded-t-[20px] mix-blend-overlay z-10 pointer-events-none" />
                
                <div className="absolute inset-0 bg-gradient-to-t from-bg-base via-bg-base/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                
                <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col items-center text-center translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-2xl font-black text-white mb-2 drop-shadow-md">{teacher.name}</h3>
                  <div className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                    <p className="text-primary font-bold text-xs uppercase tracking-wider">{teacher.subject}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
