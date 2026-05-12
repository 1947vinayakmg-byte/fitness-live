import React, { useState, useRef } from 'react';
import { CreditCard, Phone, Calendar, User, Activity, AlertCircle, MapPin, Mail, Dumbbell, Clock, Users } from 'lucide-react';
import CongratulationsPage from './CongratulationsPage';
import { auth, db } from '../firebase';
import { doc, updateDoc } from 'firebase/firestore';

const ContactForm = () => {
  const [paymentMode, setPaymentMode] = useState('cash');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const dobRef = useRef<HTMLInputElement>(null);
  const joiningDateRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    emergencyNumber: '',
    email: '',
    dob: '',
    sex: '',
    joiningDate: '',
    membershipType: '',
    address: '',
    healthIssues: '',
    hasNoHealthIssues: false,
    personalTrainer: '',
    duration: '',
    instructorName: '',
    terms: false,
  });

  const getPickerDate = (dateStr: string) => {
    if (!dateStr || typeof dateStr !== 'string') return '';
    const parts = dateStr.split('/');
    if (parts.length === 3) {
      return `${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}`;
    }
    return '';
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    let finalValue = value;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;

    // Convert date picker output (YYYY-MM-DD) natively to Day/Month/Year (DD/MM/YYYY) format inside form state
    if (type === 'date' && value) {
      const parts = value.split('-');
      if (parts.length === 3) {
        finalValue = `${parts[2]}/${parts[1]}/${parts[0]}`;
      }
    }

    setFormData(prev => {
      const newData = {
        ...prev,
        [name]: type === 'checkbox' ? checked : finalValue,
      };

      // Automatically handle the "No Issues" logic
      if (name === 'hasNoHealthIssues') {
        newData.healthIssues = checked ? 'No Issues' : (prev.healthIssues === 'No Issues' ? '' : prev.healthIssues);
      }

      return newData;
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  // Immediately show the congratulations page to the user
  setIsSubmitted(true);

  try {
    // Update membership plan in Firestore if user is logged in
    const user = auth.currentUser;
    if (user && formData.membershipType) {
      const planName = formData.membershipType === '1500' ? 'Silver' : 
                       formData.membershipType === '3000' ? 'Gold' : 
                       formData.membershipType === '5000' ? 'Platinum' : 
                       formData.membershipType === '9000' ? 'Diamond' : 
                       formData.membershipType === '1200' ? 'Couple' : 'None';
      
      updateDoc(doc(db, 'users', user.uid), {
        membershipPlan: planName
      }).catch(err => console.error("Firestore update error:", err));
    }

    // PASTE YOUR NEW GOOGLE DEPLOYMENT URL HERE
    const scriptURL = "https://script.google.com/macros/s/AKfycbzgZit9MmMUyQqupWMYdMMmLFU-R1tdXVh_DaaLH1DPASdWMP0e7NoIv54zuesikNTo/exec"; 
    
    const currentDateTime = new Date().toLocaleString();
    
    // Using URLSearchParams is often more reliable for Apps Script 'e.parameter'
    const params = new URLSearchParams();
    Object.entries(formData).forEach(([key, value]) => {
      params.append(key, String(value));
    });
    params.append('timestamp', currentDateTime);

    // Fire off the network request in the background without waiting
    fetch(scriptURL, {
      method: "POST",
      mode: "no-cors", // Keeps it simple for cross-origin requests
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
    }).catch(error => {
      console.error("Error submitting form:", error);
    });

  } catch (error) {
    console.error("Error setting up form submission:", error);
  }
};

  const handleCloseCongratulations = () => {
    setIsSubmitted(false);
    // Reset form
    setFormData({
      fullName: '',
      phone: '',
      emergencyNumber: '',
      email: '',
      dob: '',
      sex: '',
      joiningDate: '',
      membershipType: '',
      address: '',
      healthIssues: '',
      hasNoHealthIssues: false,
      personalTrainer: '',
      duration: '',
      instructorName: '',
      terms: false,
    });
  };

  return (
    <>
      <div className="max-w-4xl mx-auto bg-white/5 backdrop-blur-md p-8 lg:p-12 rounded-3xl shadow-[0_0_40px_rgba(0,0,0,0.1)] border border-white/10 dark:bg-gray-900/50">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-red-500 to-orange-500 mb-4">
            Gym Membership Form
          </h2>
          <p className="text-gray-500 dark:text-gray-400">
            Join our fitness family today. Please fill out all required details.
          </p>
          <h6 className="text-4xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-red-500 to-orange-500 mb-4">
            Admission Fee: 500 Rs</h6>
        </div>

        <form className="space-y-8" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Full Name */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                <User size={16} /> Full Name *
              </label>
              <input 
                type="text" 
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                required 
                className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-red-500 outline-none transition-all text-gray-900 dark:text-gray-100" 
                placeholder="Enter your full name" 
              />
            </div>

            {/* Phone Number */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                <Phone size={16} /> Phone Number *
              </label>
              <input 
                type="tel" 
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required 
                className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-red-500 outline-none transition-all text-gray-900 dark:text-gray-100" 
                placeholder="Enter your phone number" 
              />
            </div>

            {/* Emergency Number */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                <AlertCircle size={16} className="text-red-500" /> Emergency Number *
              </label>
              <input 
                type="tel" 
                name="emergencyNumber"
                value={formData.emergencyNumber}
                onChange={handleInputChange}
                required 
                className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-red-500 outline-none transition-all text-gray-900 dark:text-gray-100" 
                placeholder="Emergency contact number" 
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                <Mail size={16} /> E-mail (optional)
              </label>
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-red-500 outline-none transition-all text-gray-900 dark:text-gray-100" 
                placeholder="your@email.com" 
              />
            </div>

            {/* Date of Birth */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                <Calendar size={16} /> Date of Birth *
              </label>
              <div className="flex gap-2 relative">
                <input 
                  type="text" 
                  name="dob"
                  value={formData.dob}
                  onChange={handleInputChange}
                  required 
                  placeholder="DD/MM/YYYY"
                  className="flex-1 w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-red-500 outline-none transition-all text-gray-900 dark:text-gray-100" 
                />
                <button 
                  type="button"
                  onClick={() => {
                    try {
                      dobRef.current?.showPicker();
                    } catch (e) {
                      dobRef.current?.focus();
                    }
                  }}
                  className="flex items-center justify-center bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  title="Open Calendar"
                >
                  <Calendar size={24} className="text-red-500" />
                </button>
                <input 
                  ref={dobRef}
                  type="date"
                  name="dob"
                  value={getPickerDate(formData.dob)}
                  onChange={handleInputChange}
                  className="sr-only"
                  aria-hidden="true"
                />
              </div>
            </div>

            {/* Sex */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                <Users size={16} /> Sex *
              </label>
              <select 
                name="sex"
                value={formData.sex}
                onChange={handleInputChange}
                required 
                className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-red-500 outline-none transition-all text-gray-900 dark:text-gray-100"
              >
                <option value="">Select your gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Admission Date */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                <Calendar size={16} /> Admission/Joining Date *
              </label>
              <div className="flex gap-2 relative">
                <input 
                  type="text" 
                  name="joiningDate"
                  value={formData.joiningDate}
                  onChange={handleInputChange}
                  required 
                  placeholder="DD/MM/YYYY"
                  className="flex-1 w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-red-500 outline-none transition-all text-gray-900 dark:text-gray-100" 
                />
                <button 
                  type="button"
                  onClick={() => {
                    try {
                      joiningDateRef.current?.showPicker();
                    } catch (e) {
                      joiningDateRef.current?.focus();
                    }
                  }}
                  className="flex items-center justify-center bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  title="Open Calendar"
                >
                  <Calendar size={24} className="text-red-500" />
                </button>
                <input 
                  ref={joiningDateRef}
                  type="date"
                  name="joiningDate"
                  value={getPickerDate(formData.joiningDate)}
                  onChange={handleInputChange}
                  className="sr-only"
                  aria-hidden="true"
                />
              </div>
            </div>

            {/* Membership Type */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                <CreditCard size={16} /> Membership Type *
              </label>
              <select 
                name="membershipType"
                value={formData.membershipType}
                onChange={handleInputChange}
                required 
                className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-red-500 outline-none transition-all text-gray-900 dark:text-gray-100"
              >
                <option value="">Select a plan</option>
                <option value="1500">Silver (1500 Rs/1 Month)</option>
                <option value="3000">Gold (3500 Rs/3 Month)</option>
                <option value="5000">Platinum (5000 Rs/6 Month)</option>
                <option value="9000">Diamond (9000 Rs/12 Month)</option>
                <option value="1200">For Couple (1200 Rs/12 Month)</option>
              </select>
            </div>

          </div>

        {/* Present Address */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
            <MapPin size={16} /> Present Address (Optional)
          </label>
          <textarea 
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            rows={3} 
            className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-red-500 outline-none transition-all text-gray-900 dark:text-gray-100" 
            placeholder="Enter your full address here..."
          ></textarea>
        </div>

        {/* Health Issues */}
        <div className="space-y-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
              <Activity size={16} /> Health Related Issues *
            </label>
            <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 cursor-pointer bg-gray-100 dark:bg-gray-800 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
              <input 
                type="checkbox" 
                name="hasNoHealthIssues"
                checked={formData.hasNoHealthIssues}
                onChange={handleInputChange}
                className="w-4 h-4 rounded border-gray-300 dark:border-gray-600 text-red-600 focus:ring-red-500 bg-white dark:bg-gray-900"
              />
              I don't have any health issues
            </label>
          </div>
          <textarea 
            name="healthIssues"
            value={formData.healthIssues}
            onChange={handleInputChange}
            required={!formData.hasNoHealthIssues} 
            disabled={formData.hasNoHealthIssues}
            rows={3} 
            className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-red-500 outline-none transition-all text-gray-900 dark:text-gray-100 disabled:opacity-50 disabled:cursor-not-allowed" 
            placeholder={formData.hasNoHealthIssues ? "No issues specified." : "Describe any heart problems, BP, or other issues..."}
          ></textarea>
        </div>

        {/* Personal Trainer & Instructor */}
        <div className="bg-gray-50 dark:bg-gray-800/40 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 space-y-6">
          <h3 className="text-lg font-bold flex items-center gap-2 text-gray-800 dark:text-white">
            <Dumbbell size={20} className="text-red-500" /> Training Details
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                <User size={16} /> Personal Trainer *
              </label>
              <select 
                name="personalTrainer"
                value={formData.personalTrainer}
                onChange={handleInputChange}
                required 
                className="w-full px-4 py-3 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-red-500 outline-none transition-all text-gray-900 dark:text-gray-100"
              >
                <option value="">Select Personal Trainer</option>
                <option value="Pankaj">Pankaj</option>
                <option value="mallu">Mallu</option>
                <option value="No Need">No Need</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                <Clock size={16} /> Duration 
              </label>
              <input 
                type="text" 
                name="duration"
                value={formData.duration}
                onChange={handleInputChange}
                required 
                className="w-full px-4 py-3 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-red-500 outline-none transition-all text-gray-900 dark:text-gray-100" 
                placeholder="e.g. 3 Months" 
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                <User size={16} /> Instructor Name *
              </label>
              <select 
                name="instructorName"
                value={formData.instructorName}
                onChange={handleInputChange}
                required 
                className="w-full px-4 py-3 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-red-500 outline-none transition-all text-gray-900 dark:text-gray-100"
              >
                <option value="">Select Instructor</option>
                <option value="pankaj">Pankaj</option>
                <option value="mallu">Mallu</option>
                <option value="No Need">No Need</option>
              </select>
            </div>
          </div>
        </div>

        {/* Payment Section */}
        <div className="bg-gray-50 dark:bg-gray-800/40 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 space-y-4">
          <h3 className="text-lg font-bold flex items-center gap-2 text-gray-800 dark:text-white">
            <CreditCard size={20} className="text-red-500" /> Payment Details
          </h3>
          
          <div className="space-y-4">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Payment Mode *
            </label>
            <div className="flex flex-col sm:flex-row gap-4">
              <label className={`flex-1 flex items-center justify-center gap-2 p-4 rounded-xl cursor-pointer border-2 transition-all ${paymentMode === 'cash' ? 'border-red-500 bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400' : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-red-200 dark:hover:border-red-500/50'}`}>
                <input type="radio" name="payment" value="cash" className="hidden" onChange={() => setPaymentMode('cash')} checked={paymentMode === 'cash'} />
                <span className="font-semibold">Cash</span>
              </label>

              <label className={`flex-1 flex items-center justify-center gap-2 p-4 rounded-xl cursor-pointer border-2 transition-all ${paymentMode === 'online' ? 'border-green-500 bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-400' : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-green-200 dark:hover:border-green-500/50'}`}>
                <input type="radio" name="payment" value="online" className="hidden" onChange={() => setPaymentMode('online')} checked={paymentMode === 'online'} />
                <span className="font-semibold">Online (WhatsApp)</span>
              </label>
            </div>

            {paymentMode === 'online' && (
              <div className="mt-4 bg-green-50 dark:bg-green-900/30 p-5 rounded-xl border border-green-200 dark:border-green-800 flex flex-col items-center text-center space-y-4 transition-all duration-500">
                <p className="text-green-800 dark:text-green-300 font-medium">To complete your online payment securely, please message us on WhatsApp.</p>
                <a href="https://wa.me/919964290488?text=I%20want%20to%20pay%20for%20the%20gym%20membership" target="_blank" rel="noopener noreferrer" className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full font-semibold transition-colors flex items-center justify-center gap-2 shadow-sm w-full sm:w-auto">
                  <Phone size={18} />
                  Pay via WhatsApp (+91 9964290488)
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Terms and Conditions */}
        <div className="flex items-start gap-3 mt-6">
          <input 
            type="checkbox" 
            name="terms"
            id="terms"
            checked={formData.terms}
            onChange={handleInputChange}
            required 
            className="mt-1 w-5 h-5 rounded border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-red-600 focus:ring-red-500 shadow-sm transition-all" 
          />
          <label htmlFor="terms" className="text-sm text-gray-700 dark:text-gray-300 leading-tight">
            Here by I agree to abide by the rules and regulations of The FITNESS CITY and to respect and enforce all decision of The FITNESS CITY. *
          </label>
        </div>

        {/* Submit */}
        <button type="submit" className="w-full bg-linear-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 text-white font-bold py-4 px-8 rounded-xl shadow-[0_4px_14px_0_rgba(239,68,68,0.39)] hover:shadow-[0_6px_20px_rgba(239,68,68,0.23)] transition-all transform hover:-translate-y-0.5 mt-8 text-lg">
          Submit Form
        </button>

        {/* Cleanliness Note */}
        <p className="text-center text-sm text-red-500 dark:text-red-400 mt-4 font-medium italic">
          Note: Maintain the cleanliness of the gym, use proper shoes and clothes.
        </p>
      </form>
    </div>

    {isSubmitted && <CongratulationsPage onClose={handleCloseCongratulations} />}
    </>
  );
};

export default ContactForm;
