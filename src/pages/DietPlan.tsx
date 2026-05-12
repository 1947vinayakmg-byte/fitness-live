import { motion } from 'framer-motion';
import { Apple, Flame, Dumbbell, Calculator } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function DietPlan() {
  const plans = [
    {
      title: "Weight Loss",
      icon: Flame,
      color: "text-red-500",
      bg: "bg-red-500/10",
      border: "border-red-500/30",
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=2070&auto=format&fit=crop",
      description: "A calorie-deficit approach focusing on high protein and fiber to keep you full while burning fat.",
      foods: [
        "Lean proteins (Chicken breast, Fish, Tofu)",
        "Leafy greens & cruciferous vegetables",
        "Complex carbs (Oats, Sweet potato)",
        "Healthy fats (Avocado, Olive oil, Nuts)",
        "Green tea & plenty of water"
      ]
    },
    {
      title: "Weight Gain",
      icon: Apple,
      color: "text-yellow-500",
      bg: "bg-yellow-500/10",
      border: "border-yellow-500/30",
      image: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?q=80&w=2069&auto=format&fit=crop",
      description: "A calorie-surplus diet designed to help you pack on healthy mass without excessive fat gain.",
      foods: [
        "Whole eggs & Dairy (Milk, Paneer, Cheese)",
        "Dense carbs (Rice, Pasta, Potatoes)",
        "Nuts & Nut butters (Peanut butter, Almonds)",
        "Red meat & Poultry",
        "Mass gainer shakes (Oats + Banana + Whey)"
      ]
    },
    {
      title: "Natural Muscle Gain",
      icon: Dumbbell,
      color: "text-green-500",
      bg: "bg-green-500/10",
      border: "border-green-500/30",
      image: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?q=80&w=2070&auto=format&fit=crop",
      description: "A balanced macronutrient profile to support intense training and optimal muscle recovery.",
      foods: [
        "Whey protein & Casein",
        "Lean meats (Chicken, Turkey, Beef)",
        "Eggs & Greek yogurt",
        "Quinoa, Brown rice, Lentils",
        "Berries & Antioxidant-rich foods"
      ]
    }
  ];

  return (
    <div className="w-full pt-8 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16 relative">
          <div className="absolute inset-0 flex items-center justify-center -z-10">
            <span className="text-8xl md:text-9xl font-heading font-black text-outline opacity-10 uppercase tracking-tighter select-none pointer-events-none">
              FUEL
            </span>
          </div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-heading font-bold text-zinc-900 dark:text-white uppercase tracking-tight mb-4"
          >
            Nutrition & <span className="text-gradient">Diet Plans</span>
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="w-24 h-1 bg-red-600 mx-auto mb-6"
          />
          <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto mb-8">
            Training is only half the battle. Fuel your body with the right nutrients to achieve your specific goals.
          </p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Link 
              to="/bmi" 
              className="inline-flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-zinc-900 px-8 py-4 rounded-full font-bold text-lg transition-all shadow-[0_0_15px_rgba(234,179,8,0.5)] hover:scale-105"
            >
              <Calculator className="w-6 h-6" />
              Check Your BMI
            </Link>
          </motion.div>
        </div>

        {/* Diet Plans Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          {plans.map((plan, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`bg-white dark:bg-zinc-900 rounded-3xl p-8 border-2 ${plan.border} shadow-lg relative overflow-hidden`}
            >
              <div className={`absolute top-0 right-0 w-32 h-32 ${plan.bg} rounded-bl-full -z-10`} />
              
              <div className="h-48 -mx-8 -mt-8 mb-6 overflow-hidden">
                <img 
                  src={plan.image} 
                  alt={plan.title} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="flex items-center gap-4 mb-6">
                <div className={`p-3 rounded-xl bg-zinc-100 dark:bg-zinc-800 ${plan.color}`}>
                  <plan.icon className="w-8 h-8" />
                </div>
                <h2 className="text-2xl font-heading font-bold text-zinc-900 dark:text-white">{plan.title}</h2>
              </div>
              
              <p className="text-zinc-600 dark:text-zinc-400 mb-8 min-h-20">
                {plan.description}
              </p>
              
              <h3 className="font-bold text-zinc-900 dark:text-white mb-4 uppercase tracking-wider text-sm">Recommended Foods:</h3>
              <ul className="space-y-3">
                {plan.foods.map((food, j) => (
                  <li key={j} className="flex items-start gap-3 text-zinc-600 dark:text-zinc-300">
                    <div className={`w-1.5 h-1.5 rounded-full mt-2 shrink-0 ${plan.color.replace('text-', 'bg-')}`} />
                    <span>{food}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Disclaimer / CTA */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 md:p-12 text-center max-w-4xl mx-auto shadow-xl"
        >
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-zinc-900 dark:text-white mb-4">
            Need a Personalized Diet Plan?
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 mb-8 max-w-2xl mx-auto">
            Our expert nutritionists and trainers can create a custom meal plan tailored to your exact body type, allergies, and fitness goals.
          </p>
          <a 
            href="https://wa.me/919964290488?text=I%20need%20a%20personalized%20diet%20plan." 
            target="_blank" 
            rel="noreferrer"
            className="inline-block bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-full font-bold text-lg transition-colors shadow-[0_0_15px_rgba(220,38,38,0.5)]"
          >
            Consult Our Experts
          </a>
        </motion.div>

      </div>
    </div>
  );
}
