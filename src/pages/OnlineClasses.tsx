import { motion } from 'framer-motion';
import { Video, Laptop, Calendar, PlayCircle } from 'lucide-react';

export default function OnlineClasses() {
  const classes = [
    {
      title: "HIIT Home Burn",
      trainer: "Vikram Singh",
      time: "Mon, Wed, Fri - 7:00 AM",
      level: "Intermediate to Advanced",
      description: "High-intensity interval training that requires zero equipment. Burn maximum calories in 45 minutes right from your living room.",
      image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=2070&auto=format&fit=crop"
    },
    {
      title: "Yoga & Flexibility",
      trainer: "Neha Sharma",
      time: "Tue, Thu - 6:30 AM",
      level: "All Levels",
      description: "Start your day with mindfulness, stretching, and core strengthening. Perfect for recovery and improving overall mobility.",
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=2020&auto=format&fit=crop"
    },
    {
      title: "Bodyweight Strength",
      trainer: "Rahul Dev",
      time: "Mon, Wed, Fri - 6:00 PM",
      level: "Beginner to Intermediate",
      description: "Learn how to build muscle using just your body weight. Focus on push-ups, squats, lunges, and core stability.",
      image: "https://images.unsplash.com/photo-1599058917212-d750089bc07e?q=80&w=2069&auto=format&fit=crop"
    }
  ];

  return (
    <div className="w-full pt-8 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 relative">
          <div className="absolute inset-0 flex items-center justify-center -z-10">
            <span className="text-8xl md:text-9xl font-heading font-black text-outline opacity-10 uppercase tracking-tighter select-none pointer-events-none">
              REMOTE
            </span>
          </div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-heading font-bold text-zinc-900 dark:text-white uppercase tracking-tight mb-4"
          >
            Online <span className="text-gradient">Classes</span>
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="w-24 h-1 bg-yellow-500 mx-auto mb-6"
          />
          <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            Train from anywhere. Join our expert trainers for live home workouts and interactive online sessions.
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {[
            { icon: Video, title: "Live HD Streaming", desc: "Crystal clear video and audio so you never miss a cue from your trainer." },
            { icon: Laptop, title: "No Equipment Needed", desc: "Most of our home workouts are designed to use just your bodyweight." },
            { icon: Calendar, title: "Flexible Schedule", desc: "Morning and evening batches available to fit your busy lifestyle." }
          ].map((feature, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white dark:bg-zinc-900 p-8 rounded-2xl shadow-lg border border-zinc-200 dark:border-zinc-800 text-center"
            >
              <div className="w-16 h-16 mx-auto bg-red-600/10 dark:bg-red-900/20 rounded-full flex items-center justify-center mb-6">
                <feature.icon className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-heading font-bold text-zinc-900 dark:text-white mb-3">{feature.title}</h3>
              <p className="text-zinc-600 dark:text-zinc-400">{feature.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Class Schedule / Examples */}
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-center text-zinc-900 dark:text-white mb-12">
          Featured <span className="text-yellow-500">Home Workouts</span>
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          {classes.map((cls, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden shadow-lg border border-zinc-200 dark:border-zinc-800 flex flex-col"
            >
              <div className="h-48 relative overflow-hidden">
                <img 
                  src={cls.image} 
                  alt={cls.title} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-linear-to-t from-zinc-900/80 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    {cls.level}
                  </span>
                </div>
              </div>
              
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-2xl font-heading font-bold text-zinc-900 dark:text-white mb-2">{cls.title}</h3>
                <p className="text-yellow-500 font-medium mb-4">Trainer: {cls.trainer}</p>
                <p className="text-zinc-600 dark:text-zinc-400 mb-6 flex-1">{cls.description}</p>
                
                <div className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400 mb-6 bg-zinc-100 dark:bg-zinc-800 p-3 rounded-lg">
                  <Calendar className="w-4 h-4 text-red-500" />
                  <span>{cls.time}</span>
                </div>
                
                <a 
                  href={`https://wa.me/919964290488?text=I%20want%20to%20join%20the%20online%20class:%20${encodeURIComponent(cls.title)}`}
                  target="_blank" 
                  rel="noreferrer"
                  className="w-full bg-zinc-900 dark:bg-zinc-100 hover:bg-red-600 dark:hover:bg-red-600 text-white dark:text-zinc-900 hover:text-white dark:hover:text-white px-4 py-3 rounded-xl font-bold transition-colors flex items-center justify-center gap-2"
                >
                  <PlayCircle className="w-5 h-5" /> Join Class
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-red-600 rounded-3xl p-8 md:p-12 text-center max-w-4xl mx-auto shadow-xl relative overflow-hidden"
        >
          <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
          <div className="relative z-10">
            <h2 className="text-2xl md:text-4xl font-heading font-bold text-white mb-4">
              Start Your Home Transformation
            </h2>
            <p className="text-red-100 mb-8 max-w-2xl mx-auto text-lg">
              Get access to all our live online classes and recorded sessions. Train with the best from the comfort of your home.
            </p>
            <a 
              href="https://wa.me/919964290488?text=I%20want%20to%20subscribe%20to%20Online%20Classes" 
              target="_blank" 
              rel="noreferrer"
              className="inline-block bg-white text-red-600 hover:bg-zinc-100 px-8 py-4 rounded-full font-bold text-lg transition-colors shadow-lg"
            >
              Subscribe Now
            </a>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
