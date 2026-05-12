import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

export default function FloatingButton() {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-row items-center gap-3 sm:gap-4">

      {/* Join/WhatsApp Button */}
      <motion.a
        href="https://wa.me/919964290488?text=Hi!%20I%20want%20to%20book%20a%20Free%20Trial%20for%201%20week."
        target="_blank"
        rel="noreferrer"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 200, damping: 20 }}
        className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-full shadow-[0_0_20px_rgba(34,197,94,0.4)] transition-transform hover:scale-105"
      >
        <MessageCircle className="w-6 h-6" />
        <span className="font-medium hidden sm:inline">Book Free Trial For 1 Week</span>
      </motion.a>
    </div>
  );
}
