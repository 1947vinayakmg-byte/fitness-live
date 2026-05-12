import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Calendar, LogOut, Settings, Award, Clock, Heart, Dumbbell, X, Save, CheckCircle } from 'lucide-react';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';

interface UserData {
  name: string;
  email: string;
  membershipPlan: string;
  joinedAt: string;
  photo?: string;
  age?: string;
  weight?: string;
  height?: string;
}

export default function Profile({ setUser }: { setUser: (user: any) => void }) {
  const [user, setLocalUser] = useState<any>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editName, setEditName] = useState('');
  const [editAge, setEditAge] = useState('');
  const [editWeight, setEditWeight] = useState('');
  const [editHeight, setEditHeight] = useState('');
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const savedUser = localStorage.getItem("user");
      if (savedUser) {
        const parsedUser = JSON.parse(savedUser);
        setLocalUser(parsedUser);
        
        try {
          const response = await fetch(`http://localhost:8000/api/users/get-user/${parsedUser.email}`);
          const data = await response.json();
          if (data.success) {
            setUserData(data.user);
            setEditName(data.user.name || '');
            setEditAge(data.user.age || '');
            setEditWeight(data.user.weight || '');
            setEditHeight(data.user.height || '');
            // Update local storage with latest data
            localStorage.setItem("user", JSON.stringify(data.user));
          }
        } catch (error) {
          console.error("Error fetching fresh user data:", error);
          // Fallback to local storage data if fetch fails
          setUserData(parsedUser);
          setEditName(parsedUser.name || '');
        }
      } else {
        navigate("/login");
      }
      setLoading(false);
    };

    fetchUserData();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      localStorage.removeItem("user");
      await signOut(auth);
      setUser(null);
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setSaving(true);
    try {
      const response = await fetch("http://localhost:8000/api/users/update-profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: user.email,
          name: editName,
          age: editAge,
          weight: editWeight,
          height: editHeight
        }),
      });

      const data = await response.json();
      if (data.success) {
        setUserData(data.user);
        localStorage.setItem("user", JSON.stringify(data.user));
        setIsEditModalOpen(false);
      } else {
        alert(data.message || "Failed to update profile");
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert("Error updating profile");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-100 dark:bg-zinc-950">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
      </div>
    );
  }

  if (!user) return null;

  const plans = [
    { name: 'Silver', price: '₹1500', duration: '1 Month', features: ['General Training', 'Standard Equipment', 'Locker Access'] },
    { name: 'Gold', price: '₹3500', duration: '3 Months', features: ['General Training', 'Standard Equipment', 'Locker Access', 'Diet Plan'] },
    { name: 'Platinum', price: '₹5000', duration: '6 Months', features: ['General Training', 'Standard Equipment', 'Locker Access', 'Diet Plan', 'Personal Trainer'] },
    { name: 'Diamond', price: '₹9000', duration: '12 Months', features: ['All Access', 'Premium Equipment', 'Private Locker', 'Custom Diet', 'Pro Trainer'] }
  ];

  return (
    <div className="min-h-[calc(100vh-64px)] bg-zinc-100 dark:bg-zinc-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-zinc-900 rounded-3xl shadow-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 mb-8"
        >
          <div className="h-32 bg-linear-to-r from-yellow-400 to-yellow-600 dark:from-yellow-600 dark:to-yellow-800 relative">
            <div className="absolute -bottom-12 left-8">
              <div className="w-24 h-24 rounded-2xl bg-white dark:bg-zinc-800 p-1 shadow-lg border-4 border-zinc-100 dark:border-zinc-950">
                {userData?.photo ? (
                  <img src={userData.photo} alt="Profile" className="w-full h-full rounded-xl object-cover" />
                ) : (
                  <div className="w-full h-full rounded-xl bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center">
                    <User className="w-12 h-12 text-zinc-400" />
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="pt-16 pb-8 px-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="text-3xl font-heading font-bold text-zinc-900 dark:text-white uppercase tracking-tight">
                {userData?.name || 'Member'}
              </h1>
              <p className="text-zinc-500 dark:text-zinc-400 flex items-center gap-2 mt-1">
                <Mail className="w-4 h-4" />
                {user.email}
              </p>
            </div>
            
            <div className="flex gap-3">
              <button 
                onClick={() => setIsEditModalOpen(true)}
                className="px-6 py-2.5 bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white font-semibold rounded-xl hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-all flex items-center gap-2"
              >
                <Settings className="w-4 h-4" />
                Edit Profile
              </button>
              <button 
                onClick={handleLogout}
                className="px-6 py-2.5 bg-red-500/10 text-red-500 font-semibold rounded-xl hover:bg-red-500/20 transition-all flex items-center gap-2 border border-red-500/20"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Workouts', value: '24', color: 'text-yellow-500' },
            { label: 'Age', value: userData?.age || '-', color: 'text-blue-500' },
            { label: 'Weight', value: userData?.weight ? `${userData.weight}kg` : '-', color: 'text-green-500' },
            { label: 'Height', value: userData?.height ? `${userData.height}cm` : '-', color: 'text-purple-500' }
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm"
            >
              <p className={`text-2xl font-bold ${stat.color} mb-1`}>{stat.value}</p>
              <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Membership Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="md:col-span-2 space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm"
            >
              <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-6 flex items-center gap-2">
                <Award className="w-5 h-5 text-yellow-500" />
                My Membership Plans
              </h2>
              <div className="space-y-4">
                {plans.map((plan) => {
                  const isActive = userData?.membershipPlan === plan.name;
                  return (
                    <div 
                      key={plan.name}
                      className={`p-6 rounded-2xl border transition-all ${
                        isActive 
                          ? 'bg-yellow-500/10 border-yellow-500/50' 
                          : 'bg-zinc-50 dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-700'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-lg font-bold text-zinc-900 dark:text-white">{plan.name} Plan</h3>
                            {isActive && (
                              <span className="bg-yellow-500 text-black text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">Active</span>
                            )}
                          </div>
                          <p className="text-sm text-zinc-500">{plan.duration}</p>
                        </div>
                        <span className="text-xl font-bold text-zinc-900 dark:text-white">{plan.price}</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {plan.features.map(f => (
                          <span key={f} className="text-[10px] bg-zinc-200 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-300 px-2 py-1 rounded-md">
                            {f}
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>

          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm sticky top-24"
            >
              <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-6 flex items-center gap-2">
                <Heart className="w-5 h-5 text-red-500" />
                Current Status
              </h2>
              <div className="text-center">
                <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-10 h-10 text-green-500" />
                </div>
                <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-1">
                  {userData?.membershipPlan === 'None' ? 'No Active Plan' : 'Account Active'}
                </h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6">
                  {userData?.membershipPlan === 'None' 
                    ? 'Subscribe to a plan to start your journey.' 
                    : `You are currently on the ${userData?.membershipPlan} plan.`}
                </p>
                <button 
                  onClick={() => navigate('/services')}
                  className="w-full py-3 bg-zinc-900 dark:bg-white text-white dark:text-black font-bold rounded-xl hover:opacity-90 transition-opacity"
                >
                  {userData?.membershipPlan === 'None' ? 'Browse Plans' : 'Upgrade Plan'}
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      <AnimatePresence>
        {isEditModalOpen && (
          <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-zinc-900 w-full max-w-md rounded-3xl overflow-hidden shadow-2xl"
            >
              <div className="p-6 border-b border-zinc-200 dark:border-zinc-800 flex justify-between items-center">
                <h3 className="text-xl font-bold text-zinc-900 dark:text-white">Edit Profile</h3>
                <button onClick={() => setIsEditModalOpen(false)} className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <form onSubmit={handleUpdateProfile} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Full Name</label>
                  <input 
                    type="text" 
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl outline-none focus:ring-2 focus:ring-yellow-500 dark:text-white"
                  />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Age</label>
                    <input 
                      type="number" 
                      value={editAge}
                      onChange={(e) => setEditAge(e.target.value)}
                      className="w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl outline-none focus:ring-2 focus:ring-yellow-500 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Weight (kg)</label>
                    <input 
                      type="number" 
                      value={editWeight}
                      onChange={(e) => setEditWeight(e.target.value)}
                      className="w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl outline-none focus:ring-2 focus:ring-yellow-500 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Height (cm)</label>
                    <input 
                      type="number" 
                      value={editHeight}
                      onChange={(e) => setEditHeight(e.target.value)}
                      className="w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl outline-none focus:ring-2 focus:ring-yellow-500 dark:text-white"
                    />
                  </div>
                </div>
                
                <button 
                  type="submit"
                  disabled={saving}
                  className="w-full py-3 bg-yellow-500 hover:bg-yellow-600 text-black font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 mt-4"
                >
                  {saving ? 'Saving...' : (
                    <>
                      <Save className="w-5 h-5" />
                      Save Changes
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
