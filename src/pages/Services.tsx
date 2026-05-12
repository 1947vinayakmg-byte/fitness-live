import { motion } from 'framer-motion';
import { Dumbbell, Users, Activity, Heart, ShieldCheck, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Services() {
  const services = [
    {
      title: "Personal Training",
      desc: "One-on-one coaching tailored to your specific goals, body type, and fitness level.",
      icon: Users,
      color: "text-yellow-500"
    },
    {
      title: "CrossFit",
      desc: "High-intensity functional movements designed to improve overall fitness and stamina.",
      icon: Zap,
      color: "text-red-500"
    },
    {
      title: "Weight / Strength Training",
      desc: "Build muscle, increase bone density, and boost metabolism with our extensive free weights and machines.",
      icon: Dumbbell,
      color: "text-red-500"
    },
    {
      title: "Dedicated Women's Zone",
      desc: "A safe, comfortable, and fully equipped private workout area exclusively for women.",
      icon: Heart,
      color: "text-pink-500"
    }
  ];

  const equipment = [
    { name: "Bench Press", img: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop" },
    { name: "Dumbbells Set", img: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=2070&auto=format&fit=crop" },
    { name: "Cable Machine", img: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=2070&auto=format&fit=crop" },
    { name: "Barbell & Plates", img: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2070&auto=format&fit=crop" },
    { name: "Lat Pulldown", img: "https://images.unsplash.com/photo-1598971639058-fab3c3109a00?q=80&w=2070&auto=format&fit=crop" },
    { name: "Seated Row Machine", img: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=2070&auto=format&fit=crop" }
  ];

  return (
    <div className="w-full pt-8 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16 relative">
          <div className="absolute inset-0 flex items-center justify-center -z-10">
            <span className="text-8xl md:text-9xl font-heading font-black text-outline opacity-10 uppercase tracking-tighter select-none pointer-events-none">
              ELITE
            </span>
          </div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-heading font-bold text-zinc-900 dark:text-white uppercase tracking-tight mb-4"
          >
            Why Choose <span className="text-gradient">Us</span>
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="w-24 h-1 bg-red-600 mx-auto"
          />
        </div>

        {/* Benefits / Services */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          {services.map((service, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group bg-white dark:bg-zinc-900 p-8 rounded-2xl shadow-lg border border-zinc-200 dark:border-zinc-800 hover:border-red-600 transition-colors"
            >
              <div className="flex items-start gap-6">
                <div className={`p-4 rounded-xl bg-zinc-100 dark:bg-zinc-800 ${service.color} group-hover:scale-110 transition-transform`}>
                  <service.icon className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-2xl font-heading font-bold text-zinc-900 dark:text-white mb-3">{service.title}</h3>
                  <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">{service.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Dedicated Women's Zone Highlight */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative rounded-3xl overflow-hidden mb-24 border-4 border-pink-500/30"
        >
          <div className="absolute inset-0">
            <img 
              src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=2070&auto=format&fit=crop" 
              alt="Women's Workout Zone" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-linear-to-r from-zinc-950 via-zinc-950/80 to-transparent" />
          </div>
          <div className="relative z-10 p-8 md:p-16 max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-4">
              Dedicated <span className="text-pink-500">Women's Zone</span>
            </h2>
            <p className="text-xl text-zinc-300 mb-8">
              Train with confidence in our fully equipped, private workout area designed exclusively for women. Complete privacy, premium equipment, and a supportive environment.
            </p>
            <Link 
              to="/contact"
              className="inline-block bg-pink-600 hover:bg-pink-700 text-white px-8 py-4 rounded-full font-bold text-lg transition-colors"
            >
              Join the Community
            </Link>
          </div>
        </motion.div>

        {/* Equipment Gallery */}
        <div>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-zinc-900 dark:text-white mb-4">
              Our <span className="text-yellow-500">Facilities & Equipment</span>
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400">State-of-the-art machines for every muscle group.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {equipment.map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative h-64 rounded-2xl overflow-hidden bg-zinc-100 dark:bg-zinc-900 shadow-lg"
              >
                <img 
                  src={item.img} 
                  alt={item.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-linear-to-t from-zinc-950 via-zinc-950/20 to-transparent opacity-80" />
                <div className="absolute bottom-6 left-6 flex items-center gap-3">
                  <div className="w-2 h-8 bg-red-600 rounded-full" />
                  <h3 className="text-xl font-heading font-bold text-white">{item.name}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
