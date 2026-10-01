'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/Providers';
import {
  ShieldCheck,
  CreditCard,
  CheckCircle2,
  Lock,
  ArrowRight,
  Sparkles,
  Tag,
  AlertCircle,
  Loader2,
  Check,
  User,
  GraduationCap,
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

  // Submission / Loading State
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Pre-fill student data if logged in
  useEffect(() => {
    if (user) {
      setFullName(user.name || '');
      setEmail(user.email || '');
      // Fetch profile data
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

  // Load Razorpay checkout script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
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

  // Handle Enrollment & Payment
  const handleSubmitEnrollment = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setIsProcessing(true);

    try {
      let activeUser = user;

      // If user is not logged in, authenticate them first
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
          // Login existing
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

      // Step 2: Create Order via Backend (Server-Side Price Calculation)
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

      const orderData = await orderRes.json();
      if (!orderData.success) {
        throw new Error(orderData.message || 'Could not initiate enrollment order');
      }

      // Step 3: Trigger Razorpay Checkout or Instant Verification Sandbox
      const rzpOptions: any = {
        key: orderData.keyId,
        amount: orderData.amount * 100,
        currency: orderData.currency || 'INR',
        name: 'TechViora',
        description: `Enrollment: ${program.title} (${selectedPlan.durationLabel})`,
        handler: async function (response: any) {
          try {
            // Step 4: Verify Payment Signature on Backend
            const verifyRes = await fetch('/api/payment/verify', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: orderData.orderId,
                razorpay_payment_id: response.razorpay_payment_id || `pay_mock_${Date.now()}`,
                razorpay_signature: response.razorpay_signature || 'mock_signature_valid',
                studentDetails,
              }),
            });

            const verifyData = await verifyRes.json();
            if (verifyData.success) {
              router.push('/student/dashboard?enrolled=true');
            } else {
              setErrorMessage(verifyData.message || 'Payment verification failed');
              setIsProcessing(false);
            }
          } catch (vErr: any) {
            setErrorMessage(vErr.message || 'Verification error');
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

      if (!orderData.orderId.startsWith('order_sim_')) {
        rzpOptions.order_id = orderData.orderId;
      }

      if (typeof window !== 'undefined' && window.Razorpay) {
        const rzp = new window.Razorpay(rzpOptions);
        rzp.on('payment.failed', function (resp: any) {
          setErrorMessage(resp.error?.description || 'Payment was declined or cancelled.');
          setIsProcessing(false);
        });
        rzp.open();
      } else {
        // Fallback sandbox verify if client SDK is blocked
        const verifyRes = await fetch('/api/payment/verify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            razorpay_order_id: orderData.orderId,
            razorpay_payment_id: `pay_mock_${Date.now()}`,
            razorpay_signature: 'mock_signature_valid',
            studentDetails,
          }),
        });

        const verifyData = await verifyRes.json();
        if (verifyData.success) {
          router.push('/student/dashboard?enrolled=true');
        } else {
          throw new Error(verifyData.message || 'Verification failed');
        }
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'An unexpected error occurred during enrollment');
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8 text-center sm:text-left">
        <span className="text-xs font-bold text-blue-600 uppercase tracking-widest block mb-1">
          Secure Enrollment Portal
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
          Enrollment: {program.title}
        </h1>
        <p className="text-sm text-slate-600 mt-1">
          Complete your student registration details and proceed to secure checkout.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Form Column (8 cols) */}
        <div className="lg:col-span-7">
          <form onSubmit={handleSubmitEnrollment} className="space-y-6">
            {errorMessage && (
              <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-sm flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Step 1: Duration Selection */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-soft space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center">
                    1
                  </span>
                  Select Internship Duration
                </h2>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {plans.map((pl) => {
                  const isSelected = selectedPlanSlug === pl.slug;
                  return (
                    <button
                      key={pl.slug}
                      type="button"
                      onClick={() => setSelectedPlanSlug(pl.slug)}
                      className={`p-3 rounded-xl text-left border transition-all ${
                        isSelected
                          ? 'border-blue-600 bg-blue-50 text-blue-950 font-bold ring-2 ring-blue-600/20'
                          : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                      }`}
                    >
                      <div className="text-xs font-semibold">{pl.durationLabel}</div>
                      <div className="text-base font-black text-slate-900 mt-1">
                        ₹{pl.salePrice}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Student Account (if not logged in) */}
            {!user && (
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-soft space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center">
                      2
                    </span>
                    Create Student Account
                  </h2>

                  <div className="flex items-center gap-2 text-xs">
                    <button
                      type="button"
                      onClick={() => setAuthMode('register')}
                      className={`px-2.5 py-1 rounded font-medium ${
                        authMode === 'register' ? 'bg-blue-600 text-white' : 'text-slate-600'
                      }`}
                    >
                      New Student
                    </button>
                    <button
                      type="button"
                      onClick={() => setAuthMode('login')}
                      className={`px-2.5 py-1 rounded font-medium ${
                        authMode === 'login' ? 'bg-blue-600 text-white' : 'text-slate-600'
                      }`}
                    >
                      Already Enrolled? Log in
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      Account Password *
                    </label>
                    <input
                      type="password"
                      required
                      placeholder="Enter a secure password (min 6 characters)"
                      value={authPassword}
                      onChange={(e) => setAuthPassword(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Academic Information */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-soft space-y-4">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center">
                  {user ? '2' : '3'}
                </span>
                Student & Academic Information
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
                    placeholder="e.g. SRM Institute of Science and Technology"
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
                    Current Year of Study *
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

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    GitHub Profile (Optional)
                  </label>
                  <input
                    type="url"
                    placeholder="https://github.com/username"
                    value={githubUrl}
                    onChange={(e) => setGithubUrl(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    LinkedIn Profile (Optional)
                  </label>
                  <input
                    type="url"
                    placeholder="https://linkedin.com/in/username"
                    value={linkedinUrl}
                    onChange={(e) => setLinkedinUrl(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Desktop Proceed Button */}
            <button
              type="submit"
              disabled={isProcessing}
              className="w-full py-4 px-6 rounded-xl bg-blue-600 text-white font-bold text-base hover:bg-blue-700 shadow-md shadow-blue-500/30 transition-all flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Processing Enrollment & Payment...
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  Proceed to Secure Payment (₹{finalPayable})
                </>
              )}
            </button>
          </form>
        </div>

        {/* Right Summary Column (5 cols) */}
        <div className="lg:col-span-5">
          <div className="sticky top-24 space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-soft space-y-5">
              <h3 className="text-base font-bold text-slate-900 pb-3 border-b border-slate-100">
                Order Summary
              </h3>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span className="font-medium text-slate-800">Selected Domain:</span>
                  <span className="font-bold text-slate-900 text-right">{program.title}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Plan Duration:</span>
                  <span className="font-semibold text-slate-900">{selectedPlan?.durationLabel}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Original Fee:</span>
                  <span className="text-slate-400 line-through">₹{selectedPlan?.originalPrice || 999}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Program Fee:</span>
                  <span className="font-semibold text-slate-900">₹{basePrice}</span>
                </div>

                {appliedCoupon && (
                  <div className="flex justify-between text-emerald-700 bg-emerald-50 p-2 rounded-lg font-medium">
                    <span>Coupon ({appliedCoupon.code}):</span>
                    <span>-₹{discountAmount}</span>
                  </div>
                )}
              </div>

              {/* Coupon Input */}
              <div className="pt-3 border-t border-slate-100">
                <label className="text-xs font-semibold text-slate-700 block mb-1.5 flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-blue-600" />
                  Have a Discount Coupon?
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="e.g. WELCOME50"
                    value={couponCodeInput}
                    onChange={(e) => setCouponCodeInput(e.target.value.toUpperCase())}
                    className="flex-1 px-3 py-2 rounded-lg border border-slate-200 text-xs uppercase font-mono tracking-wider focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={handleApplyCoupon}
                    disabled={couponLoading || !couponCodeInput}
                    className="px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition-colors disabled:opacity-50"
                  >
                    {couponLoading ? 'Checking...' : 'Apply'}
                  </button>
                </div>
                {couponError && (
                  <p className="text-[11px] text-rose-600 mt-1">{couponError}</p>
                )}
                {appliedCoupon && (
                  <p className="text-[11px] text-emerald-600 mt-1 font-medium">{appliedCoupon.message}</p>
                )}
              </div>

              {/* Total Payable */}
              <div className="pt-4 border-t border-slate-100 flex items-baseline justify-between">
                <div>
                  <span className="text-xs text-slate-500 block">Total Amount:</span>
                  <span className="text-2xl font-black text-slate-900">₹{finalPayable}</span>
                </div>
                <span className="text-[11px] text-emerald-700 bg-emerald-50 px-2 py-1 rounded font-semibold border border-emerald-200">
                  One-time payment
                </span>
              </div>

              {/* Trust Badge */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 text-[11px] text-slate-600 space-y-1.5">
                <div className="flex items-center gap-2 font-semibold text-slate-800">
                  <ShieldCheck className="w-4 h-4 text-blue-600" />
                  Verified Registration Guaranteed
                </div>
                <p>
                  Your unique enrollment ID and learning dashboard will be unlocked immediately upon confirmation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
