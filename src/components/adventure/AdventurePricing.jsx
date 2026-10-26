import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Tag, 
  Percent, 
  CheckCircle2, 
  Receipt, 
  GraduationCap, 
  Users2, 
  ShieldCheck,
  ArrowRight
} from 'lucide-react';
import Button from '../common/Button';

const AdventurePricing = ({ pricing, basePrice = 8999 }) => {
  const [couponCode, setCouponCode] = useState('');
  const [couponStatus, setCouponStatus] = useState(null);

  if (!pricing) return null;

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!couponCode.trim()) return;
    if (couponCode.toUpperCase() === 'ADVENTURE10') {
      setCouponStatus({ type: 'success', message: 'Coupon applied! Extra 10% discount enabled.' });
    } else {
      setCouponStatus({ type: 'error', message: 'Invalid or expired coupon code. Try ADVENTURE10' });
    }
  };

  const discountPercentage = Math.round(
    ((pricing.originalPrice - pricing.discountPrice) / pricing.originalPrice) * 100
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 pb-3 border-b border-slate-200 dark:border-slate-800">
        <Receipt className="w-5 h-5 text-blue-600 dark:text-blue-400" />
        <h3 className="font-extrabold text-2xl text-[#0F172A] dark:text-white">
          Transparent Expedition Pricing
        </h3>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Price Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Package Rate
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-black bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                Save {discountPercentage}%
              </span>
            </div>

            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-4xl font-black text-[#0F172A] dark:text-white">
                ₹{pricing.discountPrice.toLocaleString()}
              </span>
              <span className="text-base text-slate-400 line-through font-semibold">
                ₹{pricing.originalPrice.toLocaleString()}
              </span>
              <span className="text-xs text-slate-500 font-semibold">/ person</span>
            </div>

            <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-2 font-bold flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" />
              <span>Includes ₹{pricing.taxes} Govt Ecological Tax & GST</span>
            </p>
          </div>

          {/* Special Offers Grid */}
          <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800 space-y-3">
            <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800">
              <Users2 className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-[#0F172A] dark:text-white">Group Booking Discount</p>
                <p className="text-[11px] text-[#475569] dark:text-slate-300">{pricing.groupDiscount}</p>
              </div>
            </div>

            <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-amber-50/70 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800">
              <GraduationCap className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-[#0F172A] dark:text-white">Student Concession</p>
                <p className="text-[11px] text-[#475569] dark:text-slate-300">{pricing.studentDiscount}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Price Breakdown Table */}
        <div className="lg:col-span-2 p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <div>
            <h4 className="font-extrabold text-base text-[#0F172A] dark:text-white mb-4">
              Itemized Cost Breakdown (Zero Hidden Surcharges)
            </h4>

            <div className="space-y-3">
              {pricing.breakdown?.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-800 text-xs sm:text-sm">
                  <span className="text-[#475569] dark:text-slate-300 font-medium">{item.item}</span>
                  <span className="font-extrabold text-[#0F172A] dark:text-white">₹{item.amount.toLocaleString()}</span>
                </div>
              ))}
              <div className="flex items-center justify-between pt-2 text-sm sm:text-base font-black">
                <span className="text-[#0F172A] dark:text-white">Total Payable Amount</span>
                <span className="text-blue-600 dark:text-blue-400">₹{(pricing.discountPrice + pricing.taxes).toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Coupon Code Input Placeholder */}
          <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800">
            <form onSubmit={handleApplyCoupon} className="flex flex-col sm:flex-row gap-2.5">
              <div className="relative flex-1">
                <Tag className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="Enter Promo Code (e.g. ADVENTURE10)"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm font-semibold text-[#0F172A] dark:text-white placeholder-[#64748B] dark:placeholder-slate-400 focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-blue-500/20 uppercase"
                />
              </div>
              <Button
                type="submit"
                variant="secondary"
                size="sm"
                className="shrink-0"
              >
                Apply Coupon
              </Button>
            </form>

            {couponStatus && (
              <p className={`mt-2 text-xs font-semibold ${couponStatus.type === 'success' ? 'text-emerald-600' : 'text-rose-600'}`}>
                {couponStatus.message}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdventurePricing;
