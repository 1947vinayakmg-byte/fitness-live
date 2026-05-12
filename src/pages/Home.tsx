import { motion } from 'framer-motion';
import { ArrowRight, Star, MapPin, Clock, Phone, Dumbbell, Users, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';
import Hero from '../assets/my-workout.jpg';
import Transformations from '../assets/before-after1.jpg';
import Transform2 from '../assets/before-after2.jpg';
import Transform3 from '../assets/before-after3.jpg';
import { useEffect, useState } from 'react';
import { auth } from '../firebase';
import { onAuthStateChanged, User } from 'firebase/auth';

export default function Home({ user }: { user: any }) {
  // Remove internal user state and useEffect since user is now a prop

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative min-h-[95vh] flex items-center justify-center overflow-hidden bg-zinc-950 pt-20">
        <div className="absolute inset-0 z-0 opacity-40">
          <img 
            src={Hero} 
            alt="Gym Interior" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-linear-to-t from-zinc-950 via-zinc-950/60 to-transparent" />
        </div>

        {/* Aesthetic Background Text */}
        <div className="absolute inset-0 z-0 flex items-center justify-center overflow-hidden pointer-events-none">
          <span className="text-[20vw] font-heading font-black text-outline opacity-10 uppercase tracking-tighter select-none">
            STRENGTH
          </span>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-6xl mx-auto py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block mb-6 px-4 py-1.5 rounded-full border border-red-500/30 bg-red-500/10 text-red-500 text-xs md:text-sm font-bold uppercase tracking-[0.2em] animate-pulse">
              The Ultimate Fitness Destination
            </div>
            <h1 className="font-heading font-bold text-5xl md:text-8xl lg:text-9xl text-white uppercase tracking-tighter mb-8 leading-[0.9]">
              Build Your <span className="text-gradient">Empire.</span><br />
              Train Like a <span className="text-red-600">Champion.</span>
            </h1>
            <p className="text-xl md:text-3xl text-zinc-400 font-medium mb-12 max-w-3xl mx-auto">
              Fitness City <span className="text-zinc-600 mx-2">|</span> Where Strength Meets Style
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link 
                to={user ? "/profile" : "/contact"}
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-full font-bold text-lg transition-colors flex items-center justify-center gap-2 min-w-[200px]"
              >
                {user ? "Go to Profile" : "Join Now"}
              </Link>
              {!user && (
                <Link 
                  to="/login"
                  className="bg-white/10 backdrop-blur-md border-2 border-white/20 text-white hover:bg-white/20 px-8 py-4 rounded-full font-bold text-lg transition-all flex items-center justify-center gap-2 min-w-[200px]"
                >
                  Login / Signup
                </Link>
              )}
              <a 
                href="tel:9964290488" 
                className="w-full sm:w-auto bg-transparent border-2 border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-zinc-950 px-8 py-4 rounded-full font-bold text-lg transition-all flex items-center justify-center gap-2"
              >
                <Phone className="w-5 h-5" /> Call Us
              </a>
            </div>
            
            <div className="mt-12 inline-flex items-center gap-4 bg-zinc-900/80 backdrop-blur-sm border border-zinc-800 px-6 py-3 rounded-full">
              <Clock className="w-5 h-5 text-yellow-500" />
              <span className="text-zinc-200 text-sm md:text-base font-medium">Open: 5 AM - 11 AM | 5 PM - 9 PM</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Stats / Features */}
      <section className="py-16 bg-zinc-100 dark:bg-zinc-950 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: Star, label: "Google Rating", value: "4.7/5", color: "text-yellow-500", bg: "bg-yellow-500/10" },
              { icon: Users, label: "Active Members", value: "500+", color: "text-red-500", bg: "bg-red-500/10" },
              { icon: Dumbbell, label: "Equipment", value: "Premium", color: "text-blue-500", bg: "bg-blue-500/10" },
              { icon: Activity, label: "Expert Training", value: "Available", color: "text-green-500", bg: "bg-green-500/10" },
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white dark:bg-zinc-900 p-8 rounded-3xl shadow-lg border border-zinc-200 dark:border-zinc-800 flex flex-col items-center text-center group hover:border-red-600 transition-colors"
              >
                <div className={`p-4 rounded-2xl ${stat.bg} ${stat.color} mb-6 group-hover:scale-110 transition-transform`}>
                  <stat.icon className="w-8 h-8" />
                </div>
                <h3 className="text-3xl md:text-4xl font-heading font-black text-zinc-900 dark:text-white mb-2">{stat.value}</h3>
                <p className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-[0.2em]">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Membership Teaser */}
      <section className="py-24 bg-zinc-50 dark:bg-zinc-950 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-grid opacity-10 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-7xl font-heading font-bold text-zinc-900 dark:text-white mb-6 uppercase tracking-tighter">
              Choose Your <span className="text-gradient">Empire</span>
            </h2>
            <p className="text-xl md:text-2xl text-zinc-600 dark:text-zinc-400 max-w-3xl mx-auto font-medium">
              Experience premium equipment, expert trainers, and a community that pushes you to be your best.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {[
              { duration: "1 Month", price: "1500", color: "bg-purple-600", text: "text-white" },
              { duration: "3 Months", price: "3500", color: "bg-red-600", text: "text-white" },
              { duration: "6 Months", price: "5000", color: "bg-green-600", text: "text-white" },
              { duration: "12 Months", price: "9000", color: "bg-yellow-500", text: "text-zinc-950" },
              { duration: "12 Months (Couple)", price: "12000", color: "bg-pink-500", text: "text-white" },
            ].map((plan, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`${plan.color} ${plan.text} p-8 rounded-3xl shadow-xl flex flex-col justify-between transform hover:-translate-y-2 transition-all duration-300 relative group overflow-hidden`}
              >
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform" />
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.2em] mb-4 opacity-80">Membership Plan</p>
                  <p className="text-2xl font-heading font-bold mb-1">{plan.duration}</p>
                  <div className="flex items-baseline gap-1 mb-8">
                    <span className="text-4xl font-heading font-black">₹{plan.price}</span>
                  </div>
                </div>
                <Link 
                  to="/contact"
                  className="w-full bg-zinc-950 text-white py-3 rounded-xl font-bold text-sm text-center hover:bg-zinc-800 transition-colors uppercase tracking-widest"
                >
                  Join Now
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Facilities Teaser */}
      <section className="py-10 bg-zinc-100 dark:bg-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-5xl font-heading font-bold text-zinc-900 dark:text-white mb-4">
                Premium <span className="text-gradient">Facilities</span>
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400 max-w-xl">
                Equipped with the best machines for your transformation.
              </p>
            </div>
            <Link to="/services" className="hidden md:flex items-center gap-2 text-red-600 hover:text-red-500 font-bold uppercase tracking-widest text-xs">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Strength Zone", img: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=2070&auto=format&fit=crop" },
              { title: "Cardio Area", img: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop" },
              { title: "Women's Workout Zone", img: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=2070&auto=format&fit=crop" }
            ].map((facility, i) => (
              <div key={i} className="group relative h-96 rounded-3xl overflow-hidden shadow-xl">
                <img 
                  src={facility.img} 
                  alt={facility.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-linear-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <div className="w-8 h-1 bg-yellow-500 mb-4 rounded-full" />
                  <h3 className="text-3xl font-heading font-bold text-white uppercase tracking-tighter">{facility.title}</h3>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center md:hidden">
            <Link to="/services" className="inline-flex items-center gap-2 text-yellow-500 font-medium">
              View All Facilities <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials & Transformations */}
      <section className="py-10 bg-zinc-100 dark:bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-center text-zinc-900 dark:text-white mb-16 uppercase tracking-tighter">
            Real People. <span className="text-gradient">Real Results.</span>
          </h2>
          
          {/* Transformations Section */}
          <div className="mb-16">
            <h3 className="text-2xl font-heading font-bold text-zinc-900 dark:text-white mb-8">Success Stories</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { img: Transformations, name: "90 Day Transformation", desc: "Lost 25kg & Gained Muscle" },
                { img: Transform2, name: "60 Day Transformation", desc: "Built 5kg Pure Muscle" },
                { img: Transform3, name: "120 Day Transformation", desc: "Lost 30kg & Total Body Recomposition" },
              ].map((transformation, i) => (
                <div key={i} className="group relative h-[450px] rounded-3xl overflow-hidden shadow-2xl">
                  <img 
                    src={transformation.img}
                    alt={transformation.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-zinc-950 via-zinc-950/20 to-transparent opacity-90" />
                  <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                    <div className="w-12 h-1 bg-red-600 mb-4 rounded-full" />
                    <h3 className="text-2xl font-heading font-bold text-white mb-2">{transformation.name}</h3>
                    <p className="text-red-500 font-bold text-sm uppercase tracking-widest">{transformation.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Reviews Section */}
          <div>
            <h3 className="text-2xl font-heading font-bold text-zinc-900 dark:text-white mb-8">Customer Reviews</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { name: "Rahul S.", text: "Best gym in Bagalkot! The trainers are very supportive and the equipment is top-notch. Highly recommend the personal training.", rating: 5 },
                { name: "Priya M.", text: "The dedicated women's zone makes me feel so comfortable. Great atmosphere and very clean facility.", rating: 5 },
                { name: "Amit K.", text: "Transformed my body in 3 months! The personalized diet and workout plans really work. Highly motivated by the trainers.", rating: 5 },
                { name: "Anjali P.", text: "Best investment for my health! The gym is well-maintained and the staff is super friendly and helpful.", rating: 5 },
              ].map((review, i) => (
                <div key={i} className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-lg border border-zinc-200 dark:border-zinc-800">
                  <div className="flex text-yellow-500 mb-3">
                    {[...Array(review.rating)].map((_, j) => <Star key={j} className="w-5 h-5 fill-current" />)}
                  </div>
                  <p className="text-zinc-600 dark:text-zinc-300 italic mb-4 text-sm">"{review.text}"</p>
                  <p className="font-bold text-zinc-900 dark:text-white text-sm">— {review.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Location & Timings */}
      <section className="py-10 bg-white dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="relative">
                <span className="absolute -top-12 -left-8 text-7xl font-heading font-black text-outline opacity-10 uppercase tracking-tighter select-none pointer-events-none">
                  LOCATION
                </span>
                <h2 className="text-3xl md:text-5xl font-heading font-bold text-zinc-900 dark:text-white mb-4">
                  Find <span className="text-gradient">Us</span>
                </h2>
                <p className="text-zinc-600 dark:text-zinc-400">Visit us today and take the first step towards your fitness goals.</p>
              </div>
              
              <div className="bg-zinc-50 dark:bg-zinc-950 p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 space-y-6">
                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-red-600 shrink-0 mt-1" />
                  <div>
                    <h4 className="text-lg font-bold text-zinc-900 dark:text-white mb-1">Location</h4>
                    <p className="text-zinc-600 dark:text-zinc-400">Fitness City Gym, Bagalkot, Karnataka</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <Clock className="w-6 h-6 text-yellow-500 shrink-0 mt-1" />
                  <div>
                    <h4 className="text-lg font-bold text-zinc-900 dark:text-white mb-1">Timings</h4>
                    <p className="text-zinc-600 dark:text-zinc-400">Morning: 5:00 AM – 11:00 AM</p>
                    <p className="text-zinc-600 dark:text-zinc-400">Evening: 5:00 PM – 9:00 PM</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <Phone className="w-6 h-6 text-green-500 shrink-0 mt-1" />
                  <div>
                    <h4 className="text-lg font-bold text-zinc-900 dark:text-white mb-1">Contact</h4>
                    <p className="text-zinc-600 dark:text-zinc-400">+91 9964290488</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="h-96 lg:h-auto rounded-2xl overflow-hidden border-2 border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-800">
              {/* Google Maps Embed */}
              <iframe 
                src="https://maps.google.com/maps?q=Fitness+City+Gym,+Bagalkot,+Karnataka&t=&z=14&ie=UTF8&iwloc=&output=embed" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Fitness City Gym Location"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-24 relative overflow-hidden bg-zinc-950">
        <div className="absolute inset-0 bg-red-600 opacity-90" />
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-black/20 rounded-full blur-3xl" />
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-7xl font-heading font-bold text-white mb-6 uppercase tracking-tighter">
            Ready to <span className="text-zinc-950">Transform?</span>
          </h2>
          <p className="text-xl md:text-2xl text-red-50 font-medium mb-12">
            Join Fitness City today and start building the best version of yourself.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link 
              to={user ? "/profile" : "/contact"}
              className="bg-zinc-950 hover:bg-black text-white px-10 py-5 rounded-2xl font-bold text-lg transition-all hover:scale-105 shadow-xl flex items-center justify-center gap-2 min-w-[220px]"
            >
              {user ? "View My Progress" : "Join Now"}
            </Link>
            <a 
              href="https://wa.me/919964290488" 
              target="_blank" 
              rel="noreferrer"
              className="bg-white text-red-600 hover:bg-zinc-100 px-10 py-5 rounded-2xl font-bold text-lg transition-all hover:scale-105 shadow-xl flex items-center justify-center gap-2 min-w-[220px]"
            >
              Call / WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
