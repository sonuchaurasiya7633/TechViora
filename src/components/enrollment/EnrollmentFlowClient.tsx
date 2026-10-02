'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/Providers';
import {
  ShieldCheck,
  CheckCircle2,
  Lock,
  ArrowRight,
  Tag,
  AlertCircle,
  Loader2,
  Check,
  Copy,
  QrCode,
  Clock,
  Smartphone,
  Info,
  ChevronRight,
  ExternalLink,
  CreditCard,
} from 'lucide-react';

interface EnrollmentFlowClientProps {
  program: any;
  plans: any[];
  initialPlanSlug: string;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

export function EnrollmentFlowClient({
  program,
  plans,
  initialPlanSlug,
}: EnrollmentFlowClientProps) {
  const router = useRouter();
  const { user, login } = useAuth();

  const [selectedPlanSlug, setSelectedPlanSlug] = useState(
    initialPlanSlug || plans[0]?.slug || '3-months'
  );

  // Form Fields
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [collegeName, setCollegeName] = useState('');
  const [university, setUniversity] = useState('');
  const [course, setCourse] = useState('B.Tech');
  const [branch, setBranch] = useState('Computer Science');
  const [currentYear, setCurrentYear] = useState('3rd Year');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [githubUrl, setGithubUrl] = useState('');

  // Inline auth state for unauthenticated users
  const [authMode, setAuthMode] = useState<'register' | 'login'>('register');
  const [authPassword, setAuthPassword] = useState('');

  // Coupon State
  const [couponCodeInput, setCouponCodeInput] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<any>(null);
  const [couponError, setCouponError] = useState('');
  const [couponLoading, setCouponLoading] = useState(false);

  // Submission / Flow States
  const [step, setStep] = useState<'details' | 'payment_qr' | 'success'>('details');
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [copiedUpi, setCopiedUpi] = useState(false);

  // Order & Payment Data
  const [orderData, setOrderData] = useState<{
    orderId: string;
    amount: number;
    keyId: string;
    upiId: string;
    payeeName: string;
    qrDataUrl: string;
    uploadedQrUrl: string;
    createdAt?: string;
  } | null>(null);

  // UTR Input State
  const [utrNumber, setUtrNumber] = useState('');
  const [utrError, setUtrError] = useState('');
  const [verificationResult, setVerificationResult] = useState<any>(null);
  const [activeQrTab, setActiveQrTab] = useState<'uploaded' | 'dynamic'>('uploaded');

  // Pre-fill student data if logged in
  useEffect(() => {
    if (user) {
      setFullName(user.name || '');
      setEmail(user.email || '');
      fetch('/api/auth/me')
        .then((r) => r.json())
        .then((data) => {
          if (data.user?.profile) {
            const p = data.user.profile;
            if (p.collegeName) setCollegeName(p.collegeName);
            if (p.university) setUniversity(p.university);
            if (p.course) setCourse(p.course);
            if (p.branch) setBranch(p.branch);
            if (p.currentYear) setCurrentYear(p.currentYear);
            if (p.city) setCity(p.city);
            if (p.state) setState(p.state);
            if (p.linkedinUrl) setLinkedinUrl(p.linkedinUrl);
            if (p.githubUrl) setGithubUrl(p.githubUrl);
          }
          if (data.user?.phone) setMobileNumber(data.user.phone);
        })
        .catch(() => {});
    }
  }, [user]);

  // Load Razorpay script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const selectedPlan = plans.find((p) => p.slug === selectedPlanSlug) || plans[0];

  // Base price calculation
  let basePrice = selectedPlan?.salePrice || 599;
  if (program.customPricingEnabled && program.customPrices) {
    if (selectedPlan?.slug === '1-month' && program.customPrices.oneMonth) {
      basePrice = program.customPrices.oneMonth;
    } else if (selectedPlan?.slug === '45-days' && program.customPrices.fortyFiveDays) {
      basePrice = program.customPrices.fortyFiveDays;
    } else if (selectedPlan?.slug === '3-months' && program.customPrices.threeMonths) {
      basePrice = program.customPrices.threeMonths;
    } else if (selectedPlan?.slug === '6-months' && program.customPrices.sixMonths) {
      basePrice = program.customPrices.sixMonths;
    }
  }

  const discountAmount = appliedCoupon ? appliedCoupon.discountAmount : 0;
  const finalPayable = Math.max(0, basePrice - discountAmount);

  // Handle Coupon Apply
  const handleApplyCoupon = async () => {
    if (!couponCodeInput.trim()) return;
    setCouponLoading(true);
    setCouponError('');
    try {
      const res = await fetch('/api/coupon/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: couponCodeInput, amount: basePrice }),
      });
      const data = await res.json();
      if (!data.success) {
        setCouponError(data.message || 'Invalid coupon code');
        setAppliedCoupon(null);
      } else {
        setAppliedCoupon(data);
      }
    } catch (err: any) {
      setCouponError('Error validating coupon');
    } finally {
      setCouponLoading(false);
    }
  };

  // Helper for Student Auth
  const ensureAuthenticatedUser = async () => {
    let activeUser = user;
    if (!activeUser) {
      if (authMode === 'register') {
        if (!authPassword || authPassword.length < 6) {
          throw new Error('Please enter a password with at least 6 characters for your student account.');
        }
        const regRes = await fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: fullName,
            email,
            phone: mobileNumber,
            password: authPassword,
          }),
        });
        const regData = await regRes.json();
        if (!regData.success) {
          throw new Error(regData.message || 'Failed to create student account');
        }
        activeUser = regData.user;
        login(regData.user);
      } else {
        const loginRes = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password: authPassword }),
        });
        const loginData = await loginRes.json();
        if (!loginData.success) {
          throw new Error(loginData.message || 'Login failed. Please verify credentials.');
        }
        activeUser = loginData.user;
        login(loginData.user);
      }
    }
    return activeUser;
  };

  // Launch Razorpay Live Checkout Modal Directly
  const handleLaunchRazorpay = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setIsProcessing(true);

    try {
      await ensureAuthenticatedUser();

      const studentDetails = {
        fullName,
        email,
        mobileNumber,
        collegeName,
        university,
        course,
        branch,
        currentYear,
        city,
        state,
        linkedinUrl,
        githubUrl,
      };

      const orderRes = await fetch('/api/payment/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          programSlug: program.slug,
          planSlug: selectedPlanSlug,
          couponCode: appliedCoupon?.code || '',
          studentDetails,
        }),
      });

      const orderInfo = await orderRes.json();
      if (!orderInfo.success) {
        throw new Error(orderInfo.message || 'Could not initiate enrollment order');
      }

      setOrderData(orderInfo);

      const keyToUse = orderInfo.keyId || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_live_Tj6i2RzYNR1GHp';

      // Razorpay Checkout Options
      const rzpOptions: any = {
        key: keyToUse,
        amount: orderInfo.amount * 100,
        currency: orderInfo.currency || 'INR',
        name: 'TechViora',
        description: `Enrollment: ${program.title} (${selectedPlan.durationLabel})`,
        handler: async function (response: any) {
          try {
            const verifyRes = await fetch('/api/payment/verify', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: orderInfo.orderId,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                studentDetails,
              }),
            });

            const verifyData = await verifyRes.json();
            if (verifyData.success) {
              setVerificationResult(verifyData);
              setStep('success');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
              setErrorMessage(verifyData.message || 'Payment verification failed');
            }
          } catch (vErr: any) {
            setErrorMessage(vErr.message || 'Verification error');
          } finally {
            setIsProcessing(false);
          }
        },
        prefill: {
          name: fullName,
          email: email,
          contact: mobileNumber,
        },
        theme: {
          color: '#2563eb',
        },
        modal: {
          ondismiss: function () {
            setIsProcessing(false);
          },
        },
      };

      if (!orderInfo.orderId.startsWith('order_sim_') && !orderInfo.orderId.startsWith('ORD_')) {
        rzpOptions.order_id = orderInfo.orderId;
      }

      if (typeof window !== 'undefined' && window.Razorpay) {
        const rzp = new window.Razorpay(rzpOptions);
        rzp.on('payment.failed', function (resp: any) {
          setErrorMessage(resp.error?.description || 'Payment was declined.');
          setIsProcessing(false);
        });
        rzp.open();
      } else {
        // Fallback to QR/UPI view
        setStep('payment_qr');
        setIsProcessing(false);
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'An error occurred during payment launch');
      setIsProcessing(false);
    }
  };

  // Open Direct QR Code / UPI ID View
  const handleOpenUpiQrView = async () => {
    setErrorMessage('');
    setIsProcessing(true);
    try {
      await ensureAuthenticatedUser();
      const studentDetails = {
        fullName,
        email,
        mobileNumber,
        collegeName,
        university,
        course,
        branch,
        currentYear,
        city,
        state,
        linkedinUrl,
        githubUrl,
      };

      const orderRes = await fetch('/api/payment/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          programSlug: program.slug,
          planSlug: selectedPlanSlug,
          couponCode: appliedCoupon?.code || '',
          studentDetails,
        }),
      });

      const data = await orderRes.json();
      if (!data.success) {
        throw new Error(data.message || 'Could not generate order');
      }

      setOrderData(data);
      setStep('payment_qr');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: any) {
      setErrorMessage(err.message || 'Error generating QR payment');
    } finally {
      setIsProcessing(false);
    }
  };

  // Submit UTR Number
  const handleSubmitUtr = async (e: React.FormEvent) => {
    e.preventDefault();
    setUtrError('');

    if (!utrNumber.trim() || utrNumber.trim().length < 6) {
      setUtrError('Please enter a valid 12-digit UTR or Transaction Reference Number.');
      return;
    }

    setIsProcessing(true);
    try {
      const studentDetails = {
        fullName,
        email,
        mobileNumber,
        collegeName,
        university,
        course,
        branch,
        currentYear,
        city,
        state,
        linkedinUrl,
        githubUrl,
      };

      const verifyRes = await fetch('/api/payment/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId: orderData?.orderId,
          utrNumber: utrNumber.trim(),
          studentDetails,
          paymentTimestamp: new Date().toISOString(),
        }),
      });

      const resData = await verifyRes.json();
      if (!resData.success) {
        throw new Error(resData.message || 'UTR verification failed. Please check the UTR number.');
      }

      setVerificationResult(resData);
      setStep('success');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: any) {
      setUtrError(err.message || 'Verification error. Please retry.');
    } finally {
      setIsProcessing(false);
    }
  };

  const copyUpiIdToClipboard = () => {
    const upi = orderData?.upiId || 'sonu-6074@ptyes';
    navigator.clipboard.writeText(upi);
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2500);
  };

  const currentFormattedTime = new Date().toLocaleString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      {/* Header Banner */}
      <div className="mb-8 text-center sm:text-left flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-blue-900 via-slate-900 to-indigo-950 p-6 rounded-3xl text-white shadow-xl">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold uppercase tracking-wider mb-2 border border-blue-400/20">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
            Razorpay Live & UPI Payment Gateway
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            {program.title}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Secure Enrollment Portal • Razorpay Live ID: <code className="bg-white/10 px-2 py-0.5 rounded text-blue-300 font-mono">rzp_live_Tj6i2RzYNR1GHp</code>
          </p>
        </div>

        {/* Dynamic Step Tracker */}
        <div className="flex items-center gap-2 self-start sm:self-auto bg-white/5 backdrop-blur px-4 py-2 rounded-2xl border border-white/10 text-xs font-semibold">
          <span className={`px-2.5 py-1 rounded-lg ${step === 'details' ? 'bg-blue-600 text-white' : 'bg-emerald-500/20 text-emerald-400'}`}>
            1. Details
          </span>
          <ChevronRight className="w-4 h-4 text-slate-500" />
          <span className={`px-2.5 py-1 rounded-lg ${step === 'payment_qr' ? 'bg-blue-600 text-white' : step === 'success' ? 'bg-emerald-500/20 text-emerald-400' : 'text-slate-400'}`}>
            2. Checkout
          </span>
          <ChevronRight className="w-4 h-4 text-slate-500" />
          <span className={`px-2.5 py-1 rounded-lg ${step === 'success' ? 'bg-emerald-600 text-white' : 'text-slate-400'}`}>
            3. Enrolled
          </span>
        </div>
      </div>

      {/* STEP 1: DETAILS & CHECKOUT OPTIONS */}
      {step === 'details' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Form Column */}
          <div className="lg:col-span-7">
            <form onSubmit={handleLaunchRazorpay} className="space-y-6">
              {errorMessage && (
                <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-sm flex items-start gap-3 shadow-sm">
                  <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Step 1: Select Duration */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
                <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center font-bold">
                    1
                  </span>
                  Select Internship Duration
                </h2>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {plans.map((pl) => {
                    const isSelected = selectedPlanSlug === pl.slug;
                    return (
                      <button
                        key={pl.slug}
                        type="button"
                        onClick={() => setSelectedPlanSlug(pl.slug)}
                        className={`p-3.5 rounded-2xl text-left border transition-all ${
                          isSelected
                            ? 'border-blue-600 bg-blue-50/80 text-blue-950 font-bold ring-2 ring-blue-600/20 shadow-sm'
                            : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                        }`}
                      >
                        <div className="text-xs font-semibold text-slate-600">{pl.durationLabel}</div>
                        <div className="text-lg font-black text-slate-900 mt-1">
                          ₹{pl.salePrice}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: Student Account (If unauthenticated) */}
              {!user && (
                <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center font-bold">
                        2
                      </span>
                      Create Student Account
                    </h2>

                    <div className="flex items-center gap-2 text-xs">
                      <button
                        type="button"
                        onClick={() => setAuthMode('register')}
                        className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                          authMode === 'register' ? 'bg-blue-600 text-white shadow' : 'text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        New Student
                      </button>
                      <button
                        type="button"
                        onClick={() => setAuthMode('login')}
                        className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                          authMode === 'login' ? 'bg-blue-600 text-white shadow' : 'text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        Log in
                      </button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1">
                        Set Password *
                      </label>
                      <input
                        type="password"
                        required
                        placeholder="Min 6 characters for login access"
                        value={authPassword}
                        onChange={(e) => setAuthPassword(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Academic Details */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
                <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center font-bold">
                    {user ? '2' : '3'}
                  </span>
                  Student Academic Information
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      Full Name (As on Certificate) *
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. rahul@example.com"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      Mobile / WhatsApp Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value)}
                      placeholder="10-digit mobile number"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      College / Institute Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={collegeName}
                      onChange={(e) => setCollegeName(e.target.value)}
                      placeholder="e.g. SRM / IIT / NIT / State University"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      Course / Degree *
                    </label>
                    <select
                      value={course}
                      onChange={(e) => setCourse(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white font-medium"
                    >
                      <option value="B.Tech">B.Tech / B.E.</option>
                      <option value="BCA">BCA</option>
                      <option value="MCA">MCA</option>
                      <option value="B.Sc CS/IT">B.Sc CS / IT</option>
                      <option value="M.Tech">M.Tech</option>
                      <option value="Diploma">Diploma</option>
                      <option value="Other">Other Degree</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      Branch / Specialization *
                    </label>
                    <input
                      type="text"
                      required
                      value={branch}
                      onChange={(e) => setBranch(e.target.value)}
                      placeholder="e.g. CSE / IT / ECE / AI"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      Current Year *
                    </label>
                    <select
                      value={currentYear}
                      onChange={(e) => setCurrentYear(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white font-medium"
                    >
                      <option value="1st Year">1st Year</option>
                      <option value="2nd Year">2nd Year</option>
                      <option value="3rd Year">3rd Year</option>
                      <option value="Final Year">Final Year</option>
                      <option value="Passout / Fresher">Passout / Fresher</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      City & State *
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        required
                        placeholder="City"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                      <input
                        type="text"
                        required
                        placeholder="State"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Primary Action Button: Pay via Razorpay Live */}
              <div className="space-y-3">
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 text-white font-bold text-base hover:opacity-95 shadow-lg shadow-blue-600/25 transition-all flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Opening Secure Razorpay Gateway...
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-5 h-5" />
                      Pay ₹{finalPayable} via Razorpay (UPI, Cards, NetBanking, EMI)
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleOpenUpiQrView}
                  disabled={isProcessing}
                  className="w-full py-3 px-6 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-all flex items-center justify-center gap-2"
                >
                  <QrCode className="w-4 h-4 text-blue-400" />
                  Or Pay via Direct UPI ID (sonu-6074@ptyes) & QR Code
                </button>
              </div>
            </form>
          </div>

          {/* Right Summary Column */}
          <div className="lg:col-span-5">
            <div className="sticky top-24 space-y-6">
              <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-5">
                <h3 className="text-base font-bold text-slate-900 pb-3 border-b border-slate-100">
                  Order Summary
                </h3>

                <div className="space-y-3 text-xs">
                  <div className="flex justify-between text-slate-600">
                    <span className="font-medium text-slate-800">Domain:</span>
                    <span className="font-bold text-slate-900 text-right">{program.title}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Duration:</span>
                    <span className="font-semibold text-slate-900">{selectedPlan?.durationLabel}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Base Fee:</span>
                    <span className="font-semibold text-slate-900">₹{basePrice}</span>
                  </div>

                  {appliedCoupon && (
                    <div className="flex justify-between text-emerald-700 bg-emerald-50 p-2.5 rounded-xl font-medium border border-emerald-200/60">
                      <span>Coupon ({appliedCoupon.code}):</span>
                      <span>-₹{discountAmount}</span>
                    </div>
                  )}
                </div>

                {/* Coupon Code Input */}
                <div className="pt-3 border-t border-slate-100">
                  <label className="text-xs font-semibold text-slate-700 block mb-1.5 flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5 text-blue-600" />
                    Discount Coupon Code
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="e.g. WELCOME50"
                      value={couponCodeInput}
                      onChange={(e) => setCouponCodeInput(e.target.value.toUpperCase())}
                      className="flex-1 px-3 py-2 rounded-xl border border-slate-200 text-xs uppercase font-mono tracking-wider focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      type="button"
                      onClick={handleApplyCoupon}
                      disabled={couponLoading || !couponCodeInput}
                      className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition-colors disabled:opacity-50"
                    >
                      {couponLoading ? 'Checking...' : 'Apply'}
                    </button>
                  </div>
                  {couponError && (
                    <p className="text-[11px] text-rose-600 mt-1 font-medium">{couponError}</p>
                  )}
                  {appliedCoupon && (
                    <p className="text-[11px] text-emerald-600 mt-1 font-medium">{appliedCoupon.message}</p>
                  )}
                </div>

                {/* Total Amount */}
                <div className="pt-4 border-t border-slate-100 flex items-baseline justify-between">
                  <div>
                    <span className="text-xs text-slate-500 block font-medium">Total Amount Payable:</span>
                    <span className="text-3xl font-black text-slate-900">₹{finalPayable}</span>
                  </div>
                  <span className="text-xs text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg font-bold border border-emerald-200">
                    Live Verified
                  </span>
                </div>

                {/* Trust Badge */}
                <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-100 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-blue-900">
                    <ShieldCheck className="w-4 h-4 text-blue-600" />
                    Razorpay 256-Bit SSL PCI-DSS Security
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Instant activation upon payment completion. Your unique Enrollment ID will be generated immediately.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* STEP 2: DIRECT UPI ID & QR PAYMENT VIEW */}
      {step === 'payment_qr' && orderData && (
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
            {/* Card Header with Timestamp */}
            <div className="bg-slate-900 text-white p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-semibold text-emerald-400 uppercase tracking-widest block mb-1">
                  Active Payment Session
                </span>
                <h2 className="text-xl font-bold text-white">
                  Pay ₹{orderData.amount} via UPI / QR Code
                </h2>
                <div className="flex items-center gap-2 mt-1 text-xs text-slate-300">
                  <Clock className="w-3.5 h-3.5 text-blue-400" />
                  <span>Order Timestamp: <strong className="text-white font-mono">{currentFormattedTime}</strong></span>
                </div>
              </div>

              <div className="text-right sm:text-right">
                <span className="text-[11px] text-slate-400 block">Order Reference:</span>
                <span className="text-xs font-mono font-bold text-blue-300 bg-white/10 px-2.5 py-1 rounded-lg">
                  {orderData.orderId}
                </span>
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-8">
              {/* UPI ID Box */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50/80 p-5 rounded-2xl border border-blue-200/80 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-900 flex items-center gap-1.5">
                    <Smartphone className="w-4 h-4 text-blue-600" />
                    Official UPI ID
                  </span>
                  <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                    Verified Active
                  </span>
                </div>

                <div className="flex items-center justify-between gap-3 bg-white p-3 rounded-xl border border-blue-200 shadow-sm">
                  <div className="font-mono text-base sm:text-lg font-black text-slate-900 tracking-wide select-all">
                    {orderData.upiId}
                  </div>
                  <button
                    type="button"
                    onClick={copyUpiIdToClipboard}
                    className={`px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                      copiedUpi
                        ? 'bg-emerald-600 text-white shadow-sm'
                        : 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm'
                    }`}
                  >
                    {copiedUpi ? (
                      <>
                        <Check className="w-4 h-4" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        Copy UPI ID
                      </>
                    )}
                  </button>
                </div>

                <p className="text-xs text-slate-600">
                  Payee Name: <strong className="text-slate-800">{orderData.payeeName}</strong>
                </p>
              </div>

              {/* QR Code Display Tabs */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <QrCode className="w-4 h-4 text-blue-600" />
                    Scan QR Code to Pay
                  </span>

                  <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs font-semibold">
                    <button
                      type="button"
                      onClick={() => setActiveQrTab('uploaded')}
                      className={`px-3 py-1.5 rounded-lg transition-all ${
                        activeQrTab === 'uploaded'
                          ? 'bg-white text-slate-900 shadow-sm font-bold'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Official Scanner QR
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveQrTab('dynamic')}
                      className={`px-3 py-1.5 rounded-lg transition-all ${
                        activeQrTab === 'dynamic'
                          ? 'bg-white text-slate-900 shadow-sm font-bold'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Dynamic Amount QR
                    </button>
                  </div>
                </div>

                {/* QR Display */}
                <div className="flex flex-col items-center justify-center p-6 bg-slate-50 rounded-3xl border border-slate-200 text-center">
                  <div className="relative w-64 h-64 bg-white p-3 rounded-2xl shadow-md border border-slate-200 flex items-center justify-center overflow-hidden">
                    {activeQrTab === 'uploaded' ? (
                      <img
                        src={orderData.uploadedQrUrl}
                        alt="TechViora Payment QR Code"
                        className="w-full h-full object-contain rounded-xl"
                      />
                    ) : (
                      orderData.qrDataUrl && (
                        <img
                          src={orderData.qrDataUrl}
                          alt="Dynamic UPI QR"
                          className="w-full h-full object-contain"
                        />
                      )
                    )}
                  </div>

                  <p className="text-xs font-medium text-slate-600 mt-3">
                    Scan with <strong className="text-slate-900">Google Pay, PhonePe, Paytm, BHIM</strong> or any UPI App.
                  </p>

                  <a
                    href={`upi://pay?pa=${orderData.upiId}&pn=${encodeURIComponent(orderData.payeeName)}&am=${orderData.amount}&cu=INR`}
                    className="mt-3 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold inline-flex items-center gap-1.5 shadow-sm"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    Open UPI App Directly
                  </a>
                </div>
              </div>

              {/* UTR Submission Form */}
              <div className="pt-6 border-t border-slate-200">
                <form onSubmit={handleSubmitUtr} className="space-y-4">
                  <div className="bg-amber-50/80 border border-amber-200/80 rounded-2xl p-4 text-xs text-amber-900 space-y-1">
                    <div className="font-bold flex items-center gap-1.5">
                      <Info className="w-4 h-4 text-amber-600" />
                      Enter UTR Number After Completing Payment
                    </div>
                    <p>
                      Enter your 12-digit UTR / Transaction Reference ID below to confirm your enrollment.
                    </p>
                  </div>

                  {utrError && (
                    <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                      <span>{utrError}</span>
                    </div>
                  )}

                  <div>
                    <label className="text-xs font-bold text-slate-800 block mb-1.5">
                      12-Digit UTR / Transaction Reference Number *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 428901234567 or UPI/428901234567"
                      value={utrNumber}
                      onChange={(e) => setUtrNumber(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 font-mono text-sm tracking-widest focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white font-bold"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isProcessing || !utrNumber.trim()}
                    className="w-full py-4 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-base shadow-lg shadow-emerald-600/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Verifying UTR & Activating Enrollment...
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-5 h-5" />
                        Submit UTR & Activate Enrollment Now
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => setStep('details')}
                    className="w-full py-2 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
                  >
                    ← Back to Registration Details
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* STEP 3: SUCCESS CONFIRMATION SCREEN */}
      {step === 'success' && verificationResult && (
        <div className="max-w-2xl mx-auto bg-white rounded-3xl border border-slate-200 shadow-xl p-8 text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-widest border border-emerald-200">
              Payment & Enrollment Confirmed
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              Welcome to TechViora! 🎉
            </h2>
            <p className="text-sm text-slate-600">
              Your payment has been verified with timestamp logging. Your internship learning dashboard is now active.
            </p>
          </div>

          {/* Details Table */}
          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 text-xs text-left space-y-3 font-medium">
            <div className="flex justify-between border-b border-slate-200/80 pb-2">
              <span className="text-slate-500">Enrollment ID:</span>
              <strong className="text-slate-900 font-mono text-sm">{verificationResult.enrollmentId}</strong>
            </div>

            <div className="flex justify-between border-b border-slate-200/80 pb-2">
              <span className="text-slate-500">Payment ID:</span>
              <strong className="text-slate-900 font-mono">{verificationResult.paymentId}</strong>
            </div>

            <div className="flex justify-between border-b border-slate-200/80 pb-2">
              <span className="text-slate-500">Payment Timestamp:</span>
              <strong className="text-slate-900 font-mono">{verificationResult.paymentTimestamp}</strong>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-500">Selected Domain:</span>
              <strong className="text-slate-900">{program.title} ({selectedPlan.durationLabel})</strong>
            </div>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={() => router.push('/student/dashboard')}
              className="flex-1 py-3.5 px-6 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
            >
              Go to Student Dashboard
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
