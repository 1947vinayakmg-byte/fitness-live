import { motion } from 'framer-motion';
import { Target, Award, Heart } from 'lucide-react';
import trainer1 from '../assets/pankaj.jpg';
import trainer2 from '../assets/mallu.jpg';
import Intro from '../assets/my-workout2.jpg';
  
export default function About() {
  
  return (
    <div className="w-full pt-8 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16 relative">
          <div className="absolute inset-0 flex items-center justify-center -z-10">
            <span className="text-8xl md:text-9xl font-heading font-black text-outline opacity-10 uppercase tracking-tighter select-none pointer-events-none">
              LEGACY
            </span>
          </div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-heading font-bold text-zinc-900 dark:text-white uppercase tracking-tight mb-4"
          >
            About <span className="text-gradient">Us</span>
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="w-24 h-1 bg-red-600 mx-auto"
          />
        </div>

        {/* Intro Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-heading font-bold text-zinc-900 dark:text-white">
              Fitness City Gym in Bagalkot
            </h2>
            <p className="text-xl text-zinc-600 dark:text-zinc-400 font-medium">
              Your ultimate destination for strength, fitness & transformation.
            </p>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Founded with a passion for health and community, Fitness City is more than just a gym. We are a community of dedicated individuals striving for excellence. Our state-of-the-art facility provides everything you need to build your empire and train like a champion.
            </p>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Whether you are a beginner looking to start your fitness journey or an experienced athlete aiming for the next level, our expert trainers and premium equipment are here to support you every step of the way.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="relative h-100 rounded-2xl overflow-hidden shadow-2xl border-4 border-zinc-100 dark:border-zinc-100"
          >
            <img 
              src={Intro}
              alt="Gym Interior" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-red-600/10 mix-blend-multiply" />
          </motion.div>
        </div>

        {/* Core Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {[
            { icon: Target, title: "Mission", desc: "To empower individuals to achieve their peak physical and mental potential through expert guidance and premium facilities." },
            { icon: Award, title: "Excellence", desc: "We provide top-tier equipment and maintain the highest standards of cleanliness and professionalism." },
            { icon: Heart, title: "Community", desc: "Fostering a supportive, inclusive environment where everyone feels welcome, especially in our dedicated women's zone." }
          ].map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white dark:bg-zinc-900 p-8 rounded-2xl shadow-lg border border-zinc-200 dark:border-zinc-800 text-center"
            >
              <div className="w-16 h-16 mx-auto bg-red-600/10 dark:bg-red-900/20 rounded-full flex items-center justify-center mb-6">
                <item.icon className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-heading font-bold text-zinc-900 dark:text-white mb-3">{item.title}</h3>
              <p className="text-zinc-600 dark:text-zinc-400">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Trainers Section */}
        <div className="relative">
          <div className="absolute -top-12 left-0 right-0 flex justify-center -z-10">
             <span className="text-7xl md:text-8xl font-heading font-black text-outline opacity-5 uppercase tracking-tighter select-none pointer-events-none">
              EXPERTS
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-center text-zinc-900 dark:text-white mb-12">
            Meet Our <span className="text-gradient">Trainers</span>
          </h2>
          
          <div className="flex flex-wrap justify-center gap-8 max-w-5xl mx-auto"> 
            {[
              { name: "Pankaj", role: "Head Coach / Turning excuses into results Fat loss | Muscle building Your transformation starts here", img: trainer1 },
              { name: "Mallu", role: " MUSCLE BULDER / Mr Vijayapur Title Winner NPC Mr Karnataka 2021 /22🏅 Mr jamkhandi 2022 🏅", img: trainer2 },
              
            ].map((trainer, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative rounded-2xl overflow-hidden bg-zinc-100 dark:bg-zinc-900 shadow-lg w-full max-w-sm"
              >
                <div className="aspect-3/4">
                  <img 
                    src={trainer.img} 
                    alt={trainer.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 grayscale group-hover:grayscale-0"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="absolute inset-0 bg-linear-to-t from-zinc-950 via-zinc-950/40 to-transparent opacity-80" />
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 transition-transform">
                  <h3 className="text-xl font-heading font-bold text-white mb-1">{trainer.name}</h3>
                  <p className="text-yellow-500 text-sm font-medium">{trainer.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
