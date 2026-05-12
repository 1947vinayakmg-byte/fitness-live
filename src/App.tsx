import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingButton from './components/FloatingButton';
import { Popup } from './components/Popup';
import { BannerPopup } from './components/Bannerpopup';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import DietPlan from './pages/DietPlan';
import { BMICalculator } from './pages/BMICalculator';
import OnlineClasses from './pages/OnlineClasses';
import ContactForm from './components/ContactForm';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import ForgotPassword from './pages/ForgotPassword';
import ProtectedRoute from './components/ProtectedRoute';

export default function App() {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark' || 
        (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  useEffect(() => {
    // Check Firebase Auth
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        const localUser = localStorage.getItem("user");
        if (localUser) {
          setUser(JSON.parse(localUser));
        } else {
          setUser(null);
        }
      }
    });

    const localUser = localStorage.getItem("user");
    if (localUser) {
      setUser(JSON.parse(localUser));
    }

    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-zinc-100 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 font-sans transition-colors duration-300">
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} user={user} />
        <main className="pt-16">
          <Routes>
            <Route path="/" element={<Home user={user} />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/diet-plan" element={<DietPlan />} />
            <Route path="/bmi" element={<BMICalculator />} />
            <Route path="/online-classes" element={<OnlineClasses />} /> 
            <Route path="/contact" element={<ContactForm />} />                       
            <Route path="/login" element={<Login setUser={setUser} />} />
            <Route path="/signup" element={<Signup setUser={setUser} />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/profile" element={
              <ProtectedRoute>
                <Profile setUser={setUser} />
              </ProtectedRoute>
            } />
            {/* Handle the typo /profil the user mentioned */}
            <Route path="/profil" element={<Navigate to="/profile" replace />} />
          </Routes>
        </main>
        <Footer />
        <FloatingButton />
        <BannerPopup />
        <Popup />
      </div>
    </Router>
  );
}
