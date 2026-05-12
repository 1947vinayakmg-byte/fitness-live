import { useState, useMemo, Suspense, useEffect } from 'react';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'motion/react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, Float, ContactShadows, useGLTF } from '@react-three/drei';
import { Calculator, Info, AlertCircle, CheckCircle2, ChevronRight } from 'lucide-react';
import { cn } from '../lib/utils';

import maleFitModel from '../assets/male-fit.glb?url';
import femaleFitModel from '../assets/female-fit.glb?url';

// 3D Model Component
function BodyModel({ bmi, category, gender }: { bmi: number | null, category: string, gender: 'male' | 'female' }) {
  const maleModel = useGLTF(maleFitModel);
  const femaleModel = useGLTF(femaleFitModel);
  
  const activeScene = useMemo(() => {
    return gender === 'male' ? maleModel.scene.clone() : femaleModel.scene.clone();
  }, [gender, maleModel.scene, femaleModel.scene]);

  const targetScaleX = useMemo(() => {
    if (!bmi) return 1;
    if (bmi < 18.5) return 0.75; // Underweight
    if (bmi < 25) return 1;      // Normal
    if (bmi < 30) return 1.35;   // Overweight
    return 1.7;                 // Obese
  }, [bmi]);

  const modelColor = useMemo(() => {
    if (!bmi) return null; // No BMI yet
    if (bmi < 18.5) return '#facc15'; // Yellow
    if (bmi < 25) return null;        // Normal -> Keep original color
    if (bmi < 30) return '#f97316';   // Orange
    return '#ef4444';                 // Red
  }, [bmi]);

  useEffect(() => {
    activeScene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        if (mesh.material) {
          // Clone material to avoid mutating the cached material across unmounts
          if (!mesh.userData.originalMaterialCloned) {
            mesh.material = (mesh.material as THREE.Material).clone();
            mesh.userData.originalMaterialCloned = true;
            if ('color' in mesh.material) {
              mesh.userData.originalColor = (mesh.material as THREE.MeshStandardMaterial).color.clone();
            }
          }
          if ('color' in mesh.material && mesh.userData.originalColor) {
            if (modelColor) {
              (mesh.material as THREE.MeshStandardMaterial).color.set(modelColor);
            } else {
              (mesh.material as THREE.MeshStandardMaterial).color.copy(mesh.userData.originalColor);
            }
          }
        }
      }
    });
  }, [activeScene, modelColor]);

  return (
    <group position={[0, -1.2, 0]}>
      <Suspense fallback={null}>
         <primitive 
            object={activeScene} 
            scale={[1.5 * targetScaleX, 1.5, 1.5 * targetScaleX]} 
            position={[0, 0, 0]} 
          />
      </Suspense>
      
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]} receiveShadow>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="#292524" transparent opacity={0.2} />
      </mesh>
      <ContactShadows opacity={0.5} scale={10} blur={1.5} far={4.5} />
    </group>
  );
}

export function BMICalculator() {
  const [height, setHeight] = useState<string>('');
  const [weight, setWeight] = useState<string>('');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [bmi, setBmi] = useState<number | null>(null);
  const [category, setCategory] = useState<string>('');

  const calculateBMI = (e: React.FormEvent) => {
    e.preventDefault();
    const h = parseFloat(height) / 100; // convert cm to m
    const w = parseFloat(weight);
    
    if (h > 0 && w > 0) {
      const bmiValue = w / (h * h);
      setBmi(parseFloat(bmiValue.toFixed(1)));
      
      if (bmiValue < 18.5) setCategory('Underweight');
      else if (bmiValue < 25) setCategory('Normal weight');
      else if (bmiValue < 30) setCategory('Overweight');
      else setCategory('Obese');
    }
  };

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'Underweight': return 'text-yellow-500';
      case 'Normal weight': return 'text-green-500';
      case 'Overweight': return 'text-orange-500';
      case 'Obese': return 'text-red-500';
      default: return 'text-primary';
    }
  };

  const getCategoryDescription = (cat: string) => {
    switch (cat) {
      case 'Underweight': return 'You are below the healthy weight range. Consider consulting a nutritionist.';
      case 'Normal weight': return 'Great job! You are in the healthy weight range for your height.';
      case 'Overweight': return 'You are slightly above the healthy range. Regular exercise and a balanced diet can help.';
      case 'Obese': return 'Your weight is in the obese range. We recommend consulting a healthcare professional.';
      default: return '';
    }
  };

  return (
    <div className="min-h-screen bg-background pt-24 pb-12">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center relative"
        >
          <div className="absolute inset-0 flex items-center justify-center -z-10">
            <span className="text-8xl md:text-9xl font-heading font-black text-outline opacity-10 uppercase tracking-tighter select-none pointer-events-none">
              STATS
            </span>
          </div>
          <h1 className="mb-4 font-heading text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            BMI <span className="text-gradient">Calculator</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Understand your body composition with our interactive 3D BMI calculator. 
            Input your details below to see your results and visual representation.
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Calculator Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-2xl border border-border bg-card p-8 shadow-xl"
          >
            <div className="mb-8 flex items-center gap-3">
              <div className="rounded-lg bg-primary/10 p-2 text-primary">
                <Calculator className="h-6 w-6" />
              </div>
              <h2 className="text-2xl font-bold">Calculate Now</h2>
            </div>

            <form onSubmit={calculateBMI} className="space-y-6">
              <div className="space-y-3">
                <label className="text-sm font-medium text-foreground/80">Gender</label>
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setGender('male')}
                    className={cn(
                      "flex-1 rounded-lg border py-3 px-4 flex items-center justify-center gap-2 transition-all",
                      gender === 'male' 
                        ? "border-primary bg-primary/10 text-primary font-bold" 
                        : "border-border bg-background text-muted-foreground hover:border-primary/50"
                    )}
                  >
                    Male
                  </button>
                  <button
                    type="button"
                    onClick={() => setGender('female')}
                    className={cn(
                      "flex-1 rounded-lg border py-3 px-4 flex items-center justify-center gap-2 transition-all",
                      gender === 'female' 
                        ? "border-primary bg-primary/10 text-primary font-bold" 
                        : "border-border bg-background text-muted-foreground hover:border-primary/50"
                    )}
                  >
                    Female
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground/80">Height (cm)</label>
                <input
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  placeholder="e.g. 175"
                  className="w-full rounded-lg border border-border bg-background px-4 py-3 outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground/80">Weight (kg)</label>
                <input
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder="e.g. 70"
                  className="w-full rounded-lg border border-border bg-background px-4 py-3 outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
                  required
                />
              </div>
              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 py-4 font-bold text-primary-foreground transition-all hover:bg-primary/90 hover:scale-[1.02] active:scale-95"
              >
                Calculate BMI
                <ChevronRight className="h-5 w-5" />
              </button>
            </form>

            <AnimatePresence>
              {bmi && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-8 overflow-hidden"
                >
                  <div className="rounded-xl bg-primary/5 p-6 border border-primary/10">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-lg font-medium">Your BMI Result</span>
                      <span className={cn("text-3xl font-black", getCategoryColor(category))}>
                        {bmi}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      {category === 'Normal weight' ? (
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                      ) : (
                        <AlertCircle className="h-5 w-5 text-primary" />
                      )}
                      <span className={cn("font-bold", getCategoryColor(category))}>
                        {category}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground italic mb-6">
                      {getCategoryDescription(category)}
                    </p>
                    {category !== 'Normal weight' && (
                      <a 
                        href={`https://wa.me/919964290488?text=${encodeURIComponent(`Hello! I just checked my BMI on Fitness City. My BMI is ${bmi} (${category}). I would like to consult an expert for a personalized diet and training plan.`)}`}
                        target="_blank"
                        rel="noreferrer"
                        className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#25D366] hover:bg-[#128C7E] px-6 py-3 font-bold text-white transition-all shadow-[0_0_15px_rgba(37,211,102,0.5)] hover:scale-[1.02] active:scale-95"
                      >
                        Consult Our Experts
                      </a>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="mt-8 rounded-lg bg-muted/50 p-4">
              <div className="flex gap-3">
                <Info className="h-5 w-5 text-primary shrink-0" />
                <p className="text-xs text-muted-foreground">
                  Body Mass Index (BMI) is a measure of body fat based on height and weight that applies to adult men and women. 
                  Please note this is a general indicator and doesn't account for muscle mass or bone density.
                </p>
              </div>
            </div>
          </motion.div>

          {/* 3D Visualizer */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="relative min-h-[400px] rounded-2xl border border-border bg-card/50 overflow-hidden shadow-xl"
          >
            <div className="absolute top-4 left-4 z-10 rounded-full bg-background/80 backdrop-blur px-4 py-1 text-xs font-medium border border-border">
              3D Body Visualization
            </div>
            
            <Canvas shadows className="h-full w-full">
              <PerspectiveCamera makeDefault position={[0, 1.5, 5]} fov={50} />
              <ambientLight intensity={0.5} />
              <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
              <pointLight position={[-10, -10, -10]} intensity={0.5} />
              <Environment preset="city" />
              
              <BodyModel bmi={bmi} category={category} gender={gender} />
              
              <OrbitControls 
                enablePan={false} 
                minDistance={3} 
                maxDistance={8} 
                minPolarAngle={Math.PI / 4}
                maxPolarAngle={Math.PI / 1.5}
              />
            </Canvas>

            {!bmi && (
              <div className="absolute inset-0 flex items-center justify-center bg-background/20 backdrop-blur-[2px] pointer-events-none">
                <p className="text-sm font-medium text-muted-foreground animate-pulse">
                  Enter your details to see the 3D preview
                </p>
              </div>
            )}
          </motion.div>
        </div>

        {/* BMI Categories Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12"
        >
          <h3 className="text-xl font-bold mb-6">BMI Categories</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { label: 'Underweight', range: '< 18.5', color: 'bg-yellow-500' },
              { label: 'Normal', range: '18.5 – 24.9', color: 'bg-green-500' },
              { label: 'Overweight', range: '25 – 29.9', color: 'bg-orange-500' },
              { label: 'Obese', range: '≥ 30', color: 'bg-red-500' },
            ].map((cat) => (
              <div key={cat.label} className="rounded-xl border border-border bg-card p-4 flex items-center gap-4">
                <div className={cn("h-3 w-3 rounded-full", cat.color)} />
                <div>
                  <p className="font-bold text-sm">{cat.label}</p>
                  <p className="text-xs text-muted-foreground">{cat.range}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
