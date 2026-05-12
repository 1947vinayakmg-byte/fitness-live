import { Instagram, MapPin, Phone, Mail, Clock, Dumbbell } from 'lucide-react';
import logoImg from '../assets/logo.png';

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-zinc-950 border-t border-zinc-200 dark:border-red-900/30 text-zinc-600 dark:text-zinc-300 py-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-11 h-11 rounded-full overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-sm flex items-center justify-center bg-white">
                  <img 
                  src={logoImg} alt="Gym Logo" className="w-full h-full object-cover rounded-full" 
/>
              </div>
              <h3 className="font-heading font-bold text-2xl text-zinc-900 dark:text-white">
                FITNESS <span className="text-yellow-500">CITY</span>
              </h3>
            </div>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-xs">
              Your ultimate destination for strength, fitness & transformation in Bagalkot. Build your empire. Train like a champion.
            </p>
            <div className="flex space-x-4 pt-2">
              <a 
                href="https://www.instagram.com/fitnesscity29?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" 
                target="_blank" 
                rel="noreferrer"
                className="w-12 h-12 rounded-full bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center text-pink-600 hover:bg-red-600 hover:text-white transition-colors"
              >
                <Instagram className="w-8 h-8" />
              </a> 
              
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-heading font-semibold text-lg text-zinc-900 dark:text-white">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-red-500 shrink-0" />
                <span>Bagalkot, Karnataka</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-red-500 shrink-0" />
                <span>+91 9964290488</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-red-500 shrink-0" />
                <span>info@fitnesscity.com</span>
              </li>
            </ul>
          </div>

          {/* Timings */}
          <div className="space-y-4">
            <h4 className="font-heading font-semibold text-lg text-zinc-900 dark:text-white">Opening Hours</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-yellow-500 shrink-0" />
                <div>
                  <p className="font-medium text-zinc-900 dark:text-white">Morning</p>
                  <p className="text-zinc-500 dark:text-zinc-400">5:00 AM – 11:00 AM</p>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-yellow-500 shrink-0" />
                <div>
                  <p className="font-medium text-zinc-900 dark:text-white">Evening</p>
                  <p className="text-zinc-500 dark:text-zinc-400">5:00 PM – 9:00 PM</p>
                </div>
              </li>
            </ul>
          </div>

        </div>
        
        <div className="mt-12 pt-8 border-t border-zinc-200 dark:border-zinc-800 text-center text-sm text-zinc-500 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© {new Date().getFullYear()} Fitness City Gym. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <span className="text-yellow-500">★</span>
            <span className="text-yellow-500">★</span>
            <span className="text-yellow-500">★</span>
            <span className="text-yellow-500">★</span>
            <span className="text-yellow-500">★</span>
            <span className="ml-2 text-zinc-900 dark:text-white font-medium">4.7 Google Rating</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
