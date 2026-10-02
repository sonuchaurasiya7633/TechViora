'use client';

import React, { useState, useEffect } from 'react';
import { 
  Settings, Sliders, DollarSign, Award, ShieldCheck, Mail, 
  CreditCard, Key, Save, CheckCircle2, AlertCircle, Plus, Trash2, Loader2, Sparkles 
} from 'lucide-react';

interface PricingPlan {
  _id?: string;
  name: string;
  durationMonths: number;
  durationLabel: string;
  price: number;
  originalPrice: number;
  isPopular?: boolean;
  isActive: boolean;
  features: string[];
}

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState<'PRICING' | 'LMS' | 'CERTIFICATES' | 'GATEWAYS' | 'GENERAL'>('PRICING');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  // Plans state
  const [plans, setPlans] = useState<PricingPlan[]>([]);

  // Platform settings state
  const [settings, setSettings] = useState({
    siteName: 'TechViora',
    supportEmail: 'support@techviora.in',
    contactPhone: '+91 98765 43210',
    address: 'TechViora Learning Solutions, Bengaluru, Karnataka, India',
    upiId: 'sonu-6074@ptyes',
    upiPayeeName: 'TechViora Learning',
    cloudinaryCloudName: '',
    cloudinaryApiKey: '',
    // Progress calculation weights
    weightLessons: 50,
    weightAssignments: 20,
    weightProjects: 20,
    weightQuizzes: 10,
    // Certificate configuration
    certSignatoryName: 'Dr. Rajesh Sharma',
    certSignatoryTitle: 'Head of Engineering & Academics, TechViora',
    certPassingThreshold: 75,
    certAutoApproval: true
  });

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    try {
      setLoading(true);
      const [plansRes, settingsRes] = await Promise.all([
        fetch('/api/admin/plans'),
        fetch('/api/admin/settings')
      ]);

      const plansData = await plansRes.json();
      const settingsData = await settingsRes.json();

      if (plansData.success && plansData.plans?.length) {
        setPlans(plansData.plans);
      } else {
        // Default default 4 plans
        setPlans([
          {
            name: '1 Month Kickstart',
            durationMonths: 1,
            durationLabel: '1 Month (4 Weeks)',
            price: 299,
            originalPrice: 999,
            isActive: true,
            features: [
              'Core Domain Curriculum',
              'Self-Paced Guided Modules',
              'Practice Assignments & Quizzes',
              'Verified Digital Certificate',
              'Email Support'
            ]
          },
          {
            name: '45 Days Intensive',
            durationMonths: 1.5,
            durationLabel: '45 Days (6 Weeks)',
            price: 399,
            originalPrice: 1299,
            isActive: true,
            features: [
              'Everything in 1 Month',
              'Intermediate Real-World Assignments',
              'Guided Minor Project with Source Code',
              'Certificate with Verifiable QR Code',
              'Direct Doubt Support Forum'
            ]
          },
          {
            name: '3 Months Professional',
            durationMonths: 3,
            durationLabel: '3 Months (12 Weeks)',
            price: 599,
            originalPrice: 1999,
            isPopular: true,
            isActive: true,
            features: [
              'Complete End-to-End Curriculum',
              'Production-Grade Major Capstone Project',
              'Admin Code Review & Actionable Feedback',
              'Letter of Recommendation for Top Performers',
              'Certificate of Excellence with QR Verification'
            ]
          },
          {
            name: '6 Months Mastery',
            durationMonths: 6,
            durationLabel: '6 Months (24 Weeks)',
            price: 999,
            originalPrice: 2999,
            isActive: true,
            features: [
              'Full Advanced Tech Specialization',
              'Multiple Enterprise Project Implementations',
              'Resume & Portfolio Review Assistance',
              'Priority 1-on-1 Admin Evaluation',
              'Lifetime Curriculum & Updates Access'
            ]
          }
        ]);
      }

      if (settingsData.success && settingsData.settings) {
        setSettings(prev => ({ ...prev, ...settingsData.settings }));
      }
    } catch (err) {
      console.error('Fetch settings error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handlePlanChange = (index: number, field: keyof PricingPlan, value: any) => {
    const updated = [...plans];
    updated[index] = { ...updated[index], [field]: value };
    setPlans(updated);
  };

  const handleAddFeature = (planIndex: number) => {
    const updated = [...plans];
    updated[planIndex].features.push('New Plan Benefit');
    setPlans(updated);
  };

  const handleRemoveFeature = (planIndex: number, featIndex: number) => {
    const updated = [...plans];
    updated[planIndex].features = updated[planIndex].features.filter((_, i) => i !== featIndex);
    setPlans(updated);
  };

  const handleFeatureTextChange = (planIndex: number, featIndex: number, text: string) => {
    const updated = [...plans];
    updated[planIndex].features[featIndex] = text;
    setPlans(updated);
  };

  const handleSaveAll = async () => {
    try {
      setSaving(true);
      setSuccessMsg('');

      // 1. Save pricing plans
      const plansRes = await fetch('/api/admin/plans', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plans })
      });

      // 2. Save settings
      const settingsRes = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      });

      const pData = await plansRes.json();
      const sData = await settingsRes.json();

      if (pData.success && sData.success) {
        setSuccessMsg('All platform configuration settings have been updated successfully!');
        setTimeout(() => setSuccessMsg(''), 4000);
      } else {
        alert(pData.error || sData.error || 'Failed to update settings');
      }
    } catch (err) {
      console.error('Save error', err);
      alert('Network or server error while updating settings');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600 mb-3" />
        <p className="text-sm text-slate-500">Loading system configuration...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-6xl pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
            <Settings className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            Platform Configuration & Settings
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Manage dynamic pricing, LMS grading rules, certificate issuance credentials, and payment gateways.
          </p>
        </div>

        <button
          onClick={handleSaveAll}
          disabled={saving}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 shadow-md transition-all shadow-indigo-600/20"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          Save All Changes
        </button>
      </div>

      {successMsg && (
        <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-sm flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-emerald-600" />
          {successMsg}
        </div>
      )}

      {/* Tabs */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 gap-2 overflow-x-auto">
        {[
          { id: 'PRICING', label: 'Dynamic Pricing Plans', icon: DollarSign },
          { id: 'LMS', label: 'Progress & Grading Weights', icon: Sliders },
          { id: 'CERTIFICATES', label: 'Digital Certificates', icon: Award },
          { id: 'GATEWAYS', label: 'API Keys & Gateways', icon: Key },
          { id: 'GENERAL', label: 'Platform Info', icon: Mail }
        ].map(tab => {
          const Icon = tab.icon;
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-semibold border-b-2 transition-all whitespace-nowrap ${
                active
                  ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                  : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* TAB 1: DYNAMIC PRICING */}
      {activeTab === 'PRICING' && (
        <div className="space-y-6">
          <div className="p-4 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900/60 text-xs text-indigo-900 dark:text-indigo-200 flex items-start gap-3">
            <DollarSign className="w-5 h-5 flex-shrink-0 text-indigo-600 mt-0.5" />
            <div>
              <p className="font-semibold text-sm">Dynamic Pricing Architecture</p>
              <p className="mt-0.5">
                All prices and duration plans configured below are immediately reflected across the website, enrollment checkouts, and Razorpay server validations. No pricing is hardcoded.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {plans.map((plan, pIdx) => (
              <div
                key={pIdx}
                className={`bg-white dark:bg-slate-900 rounded-2xl p-6 border shadow-sm flex flex-col justify-between ${
                  plan.isPopular
                    ? 'border-indigo-500 ring-2 ring-indigo-500/20'
                    : 'border-slate-200 dark:border-slate-800'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Tier {pIdx + 1}
                    </span>
                    <div className="flex items-center gap-4">
                      <label className="flex items-center gap-1.5 text-xs font-semibold cursor-pointer">
                        <input
                          type="checkbox"
                          checked={plan.isPopular || false}
                          onChange={(e) => handlePlanChange(pIdx, 'isPopular', e.target.checked)}
                          className="rounded text-indigo-600 focus:ring-indigo-500"
                        />
                        <span>⭐ Popular</span>
                      </label>
                      <label className="flex items-center gap-1.5 text-xs font-semibold cursor-pointer">
                        <input
                          type="checkbox"
                          checked={plan.isActive}
                          onChange={(e) => handlePlanChange(pIdx, 'isActive', e.target.checked)}
                          className="rounded text-indigo-600 focus:ring-indigo-500"
                        />
                        <span>Active</span>
                      </label>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div>
                      <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">
                        Plan Name
                      </label>
                      <input
                        type="text"
                        value={plan.name}
                        onChange={(e) => handlePlanChange(pIdx, 'name', e.target.value)}
                        className="w-full px-3 py-1.5 text-sm rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">
                        Duration Label
                      </label>
                      <input
                        type="text"
                        value={plan.durationLabel}
                        onChange={(e) => handlePlanChange(pIdx, 'durationLabel', e.target.value)}
                        className="w-full px-3 py-1.5 text-sm rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div>
                      <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">
                        Sale Price (₹) *
                      </label>
                      <input
                        type="number"
                        value={plan.price}
                        onChange={(e) => handlePlanChange(pIdx, 'price', Number(e.target.value))}
                        className="w-full px-3 py-1.5 text-sm font-bold text-indigo-600 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">
                        Original Price (₹)
                      </label>
                      <input
                        type="number"
                        value={plan.originalPrice}
                        onChange={(e) => handlePlanChange(pIdx, 'originalPrice', Number(e.target.value))}
                        className="w-full px-3 py-1.5 text-sm rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-500"
                      />
                    </div>
                  </div>

                  {/* Features list */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-[11px] font-bold uppercase text-slate-500">
                        Plan Deliverables & Features
                      </label>
                      <button
                        type="button"
                        onClick={() => handleAddFeature(pIdx)}
                        className="text-[11px] font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
                      >
                        <Plus className="w-3 h-3" /> Add Feature
                      </button>
                    </div>

                    <div className="space-y-2">
                      {plan.features?.map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-center gap-2">
                          <input
                            type="text"
                            value={feat}
                            onChange={(e) => handleFeatureTextChange(pIdx, fIdx, e.target.value)}
                            className="flex-1 px-3 py-1 text-xs rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white"
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveFeature(pIdx, fIdx)}
                            className="p-1 text-slate-400 hover:text-rose-600 rounded"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: LMS PROGRESS & GRADING WEIGHTS */}
      {activeTab === 'LMS' && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
              Overall Completion Formula Weights
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Configure how much weight each learning component carries toward a student's total progress percentage. Total should sum to 100%.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
              <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                Lessons Completed
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={settings.weightLessons}
                  onChange={(e) => setSettings({ ...settings, weightLessons: Number(e.target.value) })}
                  className="w-full px-3 py-2 text-base font-bold rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-indigo-600"
                />
                <span className="font-bold text-slate-400">%</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">Default: 50%</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
              <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                Assignments Graded
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={settings.weightAssignments}
                  onChange={(e) => setSettings({ ...settings, weightAssignments: Number(e.target.value) })}
                  className="w-full px-3 py-2 text-base font-bold rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-indigo-600"
                />
                <span className="font-bold text-slate-400">%</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">Default: 20%</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
              <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                Major Projects Approved
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={settings.weightProjects}
                  onChange={(e) => setSettings({ ...settings, weightProjects: Number(e.target.value) })}
                  className="w-full px-3 py-2 text-base font-bold rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-indigo-600"
                />
                <span className="font-bold text-slate-400">%</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">Default: 20%</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
              <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                Quizzes Passed
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={settings.weightQuizzes}
                  onChange={(e) => setSettings({ ...settings, weightQuizzes: Number(e.target.value) })}
                  className="w-full px-3 py-2 text-base font-bold rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-indigo-600"
                />
                <span className="font-bold text-slate-400">%</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">Default: 10%</p>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-indigo-50 dark:bg-indigo-950/40 rounded-xl border border-indigo-100 dark:border-indigo-900 text-xs">
            <span className="font-semibold text-slate-700 dark:text-slate-300">Total Sum:</span>
            <span className={`font-bold text-sm ${
              settings.weightLessons + settings.weightAssignments + settings.weightProjects + settings.weightQuizzes === 100
                ? 'text-emerald-600'
                : 'text-rose-600'
            }`}>
              {settings.weightLessons + settings.weightAssignments + settings.weightProjects + settings.weightQuizzes}%
              {settings.weightLessons + settings.weightAssignments + settings.weightProjects + settings.weightQuizzes !== 100 && ' (Must sum to 100%)'}
            </span>
          </div>
        </div>
      )}

      {/* TAB 3: CERTIFICATES CONFIG */}
      {activeTab === 'CERTIFICATES' && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
          <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
            Certificate Issuance & Authority
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                Authorized Signatory Name
              </label>
              <input
                type="text"
                value={settings.certSignatoryName}
                onChange={(e) => setSettings({ ...settings, certSignatoryName: e.target.value })}
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                Signatory Title & Designation
              </label>
              <input
                type="text"
                value={settings.certSignatoryTitle}
                onChange={(e) => setSettings({ ...settings, certSignatoryTitle: e.target.value })}
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                Minimum Progress Threshold for Certificate (%)
              </label>
              <input
                type="number"
                value={settings.certPassingThreshold}
                onChange={(e) => setSettings({ ...settings, certPassingThreshold: Number(e.target.value) })}
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white"
              />
              <p className="text-[11px] text-slate-400 mt-1">Students can generate certificate once reaching this completion %</p>
            </div>

            <div className="flex items-center gap-3 pt-6">
              <input
                type="checkbox"
                id="certAutoApproval"
                checked={settings.certAutoApproval}
                onChange={(e) => setSettings({ ...settings, certAutoApproval: e.target.checked })}
                className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500"
              />
              <label htmlFor="certAutoApproval" className="text-sm font-medium text-slate-700 dark:text-slate-300 cursor-pointer">
                Auto-generate verifiable certificate upon 100% course + capstone completion
              </label>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: API KEYS & GATEWAYS */}
      {activeTab === 'GATEWAYS' && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
          <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
            Payment & Media Storage Integrations
          </h3>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-3">
            <h4 className="text-xs font-bold uppercase text-indigo-600 flex items-center gap-2">
              <CreditCard className="w-4 h-4" /> Direct UPI Payment Gateway
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                  Active UPI ID
                </label>
                <input
                  type="text"
                  value={settings.upiId}
                  onChange={(e) => setSettings({ ...settings, upiId: e.target.value })}
                  placeholder="sonu-6074@ptyes"
                  className="w-full px-3.5 py-2 text-xs font-mono rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 font-bold text-blue-600"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                  Payee Business / Name
                </label>
                <input
                  type="text"
                  value={settings.upiPayeeName}
                  onChange={(e) => setSettings({ ...settings, upiPayeeName: e.target.value })}
                  placeholder="TechViora Learning"
                  className="w-full px-3.5 py-2 text-xs font-mono rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"
                />
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-3">
            <h4 className="text-xs font-bold uppercase text-indigo-600 flex items-center gap-2">
              <Key className="w-4 h-4" /> Cloudinary Media Storage
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                  Cloud Name
                </label>
                <input
                  type="text"
                  value={settings.cloudinaryCloudName}
                  onChange={(e) => setSettings({ ...settings, cloudinaryCloudName: e.target.value })}
                  placeholder="techviora"
                  className="w-full px-3.5 py-2 text-xs font-mono rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                  API Key
                </label>
                <input
                  type="text"
                  value={settings.cloudinaryApiKey}
                  onChange={(e) => setSettings({ ...settings, cloudinaryApiKey: e.target.value })}
                  placeholder="1234567890"
                  className="w-full px-3.5 py-2 text-xs font-mono rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: PLATFORM INFO */}
      {activeTab === 'GENERAL' && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
            General Contact & Brand Info
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                Platform Name
              </label>
              <input
                type="text"
                value={settings.siteName}
                onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                Student Support Email
              </label>
              <input
                type="email"
                value={settings.supportEmail}
                onChange={(e) => setSettings({ ...settings, supportEmail: e.target.value })}
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                Support Helpline / WhatsApp
              </label>
              <input
                type="text"
                value={settings.contactPhone}
                onChange={(e) => setSettings({ ...settings, contactPhone: e.target.value })}
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                Official Registered Address
              </label>
              <input
                type="text"
                value={settings.address}
                onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
