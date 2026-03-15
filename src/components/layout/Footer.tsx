import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="relative bg-[#030305] pt-20 pb-10 border-t border-white/10 overflow-hidden">
      
      {/* Footer Ambient Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-64 bg-primary/20 blur-[150px] rounded-full pointer-events-none" />

      <div className="container relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand & About */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-4 mb-6 group">
              <div className="relative w-12 h-12 filter group-hover:brightness-110 transition-all shrink-0">
                <Image 
                  src="/logo.png" 
                  alt="Gyan Jyoti Gurukulam Logo" 
                  fill 
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-poppins font-black text-2xl leading-tight text-white group-hover:text-primary transition-colors">
                  Gyan Jyoti Gurukulam
                </span>
                <span className="text-xs text-muted-foreground uppercase tracking-widest font-semibold mt-0.5">
                  Est. 2000
                </span>
              </div>
            </Link>
            <p className="text-gray-400 mb-8 max-w-md leading-relaxed text-lg">
              Empowering the next generation with cutting-edge education, unshakeable morals, and unstoppable ambition. 🚀
            </p>
            <div className="flex items-center gap-4">
              {['Facebook', 'Twitter', 'Instagram'].map((social) => (
                <a key={social} href="#" className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary hover:border-primary transition-all duration-300 hover:-translate-y-1 shadow-lg">
                  <span className="text-sm font-bold">{social[0]}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-white pb-2 border-b border-primary/30 inline-block">Explore</h3>
            <ul className="flex flex-col gap-4">
              <li><Link href="#about" className="text-gray-400 hover:text-white transition-colors font-medium text-lg">About Us</Link></li>
              <li><Link href="#notices" className="text-gray-400 hover:text-white transition-colors font-medium text-lg">Notice Board</Link></li>
              <li><Link href="#teachers" className="text-gray-400 hover:text-white transition-colors font-medium text-lg">Our Mentors</Link></li>
              <li><Link href="#activities" className="text-gray-400 hover:text-white transition-colors font-medium text-lg">Gallery</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-white pb-2 border-b border-primary/30 inline-block">Contact</h3>
            <ul className="flex flex-col gap-5">
              <li className="flex items-start gap-4 text-gray-400 text-lg">
                <span className="text-2xl">📍</span>
                <span>Jandaha, Vaishali, Bihar 844505, India</span>
              </li>
              <li className="flex items-center gap-4 text-gray-400 text-lg">
                <span className="text-2xl">📞</span>
                <span>+91 75638 78121</span>
              </li>
              <li className="flex items-center gap-4 text-gray-400 text-lg">
                <span className="text-2xl">✉️</span>
                <span>info@gyanjyoti.edu.in</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-6 pb-4">
          <p className="text-gray-500 font-medium text-center md:text-left">
            &copy; {new Date().getFullYear()} Gyan Jyoti Gurukulam. All rights reserved.
          </p>
          <div className="flex flex-col items-center md:items-end gap-3 text-center md:text-right">
            <div className="px-6 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
              <p className="text-sm font-medium text-gray-400">
                Developed by <span className="font-bold text-gradient text-lg ml-1">Anurag</span> 💻
              </p>
            </div>
            <p className="text-sm text-gray-500">
              Want to develop a premium website? <br className="md:hidden" />
              Contact: <a href="mailto:anuragkumar36474@gmail.com" className="text-primary hover:text-white transition-colors">anuragkumar36474@gmail.com</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
