'use client';

import { motion } from 'framer-motion';

export default function Location() {
  return (
    <section id="location" className="section relative bg-bg-base border-t border-white/10 overflow-hidden">
      
      {/* Background Mesh */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 mb-6">
            <span className="text-primary text-sm font-bold uppercase tracking-widest text-glow">School Campus</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
            Find Us on the <span className="text-gradient">Map 🗺️</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 overflow-hidden glass-card p-2">
          
          {/* Contact Information Form */}
          <div className="lg:col-span-5 p-8 md:p-12 flex flex-col justify-center bg-white/5 rounded-l-2xl border-r border-white/10">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-3xl font-black text-white mb-8">Reach Out 📫</h3>
              
              <ul className="space-y-8 mb-12">
                <li className="flex items-start gap-5">
                  <div className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center text-3xl shrink-0 border border-white/10 shadow-lg">
                    📍
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-lg mb-1">Campus Address</h4>
                    <p className="text-gray-400 leading-relaxed font-medium">
                      PG6M+WW8, Yadav Chowk, <br/>
                      Yadav Colony, Hazrat Jandaha, <br/>
                      Bihar 844505, India
                    </p>
                  </div>
                </li>
                
                <li className="flex items-center gap-5">
                  <div className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center text-3xl shrink-0 border border-white/10 shadow-lg">
                    📞
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-lg mb-1">Direct Line</h4>
                    <p className="text-primary font-bold text-lg">+91 75638 78121</p>
                  </div>
                </li>

                <li className="flex items-center gap-5">
                  <div className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center text-3xl shrink-0 border border-white/10 shadow-lg">
                    ✉️
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-lg mb-1">Email Connect</h4>
                    <p className="text-gray-400 font-medium">info@gyanjyoti.edu.in</p>
                  </div>
                </li>
              </ul>

              <a 
                href="https://maps.google.com/?q=Gyan+Jyoti+Gurukulam+Hazrat+Jandaha+Bihar" 
                target="_blank" 
                rel="noreferrer"
                className="btn-super w-full group"
              >
                Get Directions 🧭
              </a>
            </motion.div>
          </div>

          {/* Map Embed */}
          <div className="lg:col-span-7 h-[450px] lg:h-auto rounded-r-2xl overflow-hidden relative group">
            <div className="absolute inset-0 bg-primary/20 mix-blend-color pointer-events-none group-hover:opacity-0 transition-opacity duration-700 z-10" />
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14389.263884391121!2d85.3905139!3d25.6276807!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ed454b5df56f91%3A0x6eebfb3228a01f5f!2sJandaha%2C%20Bihar%20844505!5e0!3m2!1sen!2sin!4v1710522000000!5m2!1sen!2sin" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full object-cover filter contrast-125 saturate-150"
              title="Gyan Jyoti Gurukulam Location"
            ></iframe>
          </div>
          
        </div>
      </div>
    </section>
  );
}
