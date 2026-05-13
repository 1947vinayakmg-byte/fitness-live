import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, ArrowLeft, Key, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [step, setStep] = useState(1); // 1: Email, 2: New Password, 3: Success
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCheckEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch(`/_/backend/api/users/get-user/${email}`);
      const data = await response.json();
      
      if (data.success) {
        setStep(2);
      } else {
        setError("Email not found. Please enter a registered email.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch("/_/backend/api/users/reset-password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, newPassword }),
      });

      const data = await response.json();
      if (data.success) {
        setStep(3);
      } else {
        setError(data.message || "Failed to reset password.");
      }
    } catch (err) {
      setError("Error resetting password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center p-4 bg-zinc-100 dark:bg-zinc-950">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white dark:bg-zinc-900 rounded-2xl shadow-xl overflow-hidden border border-zinc-200 dark:border-zinc-800"
      >
        <div className="p-8">
          <div className="mb-6">
            <Link to="/login" className="text-zinc-500 hover:text-zinc-900 dark:hover:text-white flex items-center gap-2 text-sm transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back to Login
            </Link>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-3xl font-heading font-bold text-zinc-900 dark:text-white mb-2 uppercase tracking-tight">
              {step === 1 ? "Forgot Password?" : step === 2 ? "Reset Password" : "Password Reset!"}
            </h1>
            <p className="text-zinc-500 dark:text-zinc-400">
              {step === 1 
                ? "Enter your email to verify your account" 
                : step === 2 
                ? "Create a strong new password for your account" 
                : "Your password has been successfully updated."}
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400 text-sm">
              {error}
            </div>
          )}

          {step === 1 && (
            <form onSubmit={handleCheckEmail} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl focus:ring-2 focus:ring-yellow-500 outline-none transition-all dark:text-white"
                    placeholder="name@example.com"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-yellow-500 hover:bg-yellow-600 text-black font-bold rounded-xl shadow-lg shadow-yellow-500/20 transition-all flex items-center justify-center gap-2"
              >
                {loading ? 'Verifying...' : 'Verify Email'}
              </button>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleResetPassword} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">New Password</label>
                <div className="relative">
                  <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl focus:ring-2 focus:ring-yellow-500 outline-none transition-all dark:text-white"
                    placeholder="••••••••"
                    required
                    minLength={6}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl shadow-lg shadow-red-600/20 transition-all flex items-center justify-center gap-2"
              >
                {loading ? 'Resetting...' : 'Update Password'}
              </button>
            </form>
          )}

          {step === 3 && (
            <div className="text-center space-y-6">
              <div className="flex justify-center">
                <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-10 h-10 text-green-500" />
                </div>
              </div>
              <p className="text-zinc-600 dark:text-zinc-300">
                You can now log in with your new password.
              </p>
              <Link
                to="/login"
                className="block w-full py-3 bg-zinc-950 dark:bg-white text-white dark:text-black font-bold rounded-xl hover:opacity-90 transition-all"
              >
                Go to Login
              </Link>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
