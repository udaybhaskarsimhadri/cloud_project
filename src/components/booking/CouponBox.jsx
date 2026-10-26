import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tag, Check, X, Sparkles, AlertCircle } from 'lucide-react';
import { bookingService } from '../../services/bookingService';

const EXAMPLE_COUPONS = ['WELCOME10', 'STUDENT15', 'FAMILY20'];

const CouponBox = ({ 
  appliedCoupon, 
  onApplyCoupon, 
  onRemoveCoupon, 
  travelerCount = 1, 
  subtotal = 0,
  onNotify
}) => {
  const [code, setCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleApply = (couponCodeToApply) => {
    const targetCode = couponCodeToApply || code;
    if (!targetCode.trim()) {
      setErrorMessage('Please enter a coupon code.');
      return;
    }

    setErrorMessage('');
    const result = bookingService.validateCoupon(targetCode, travelerCount, subtotal);

    if (result.valid) {
      onApplyCoupon(result);
      setCode('');
      if (onNotify) {
        onNotify(`Coupon ${result.couponCode} applied! You saved ₹${result.discountAmount.toLocaleString('en-IN')}.`, 'success');
      }
    } else {
      setErrorMessage(result.message);
    }
  };

  const handleRemove = () => {
    onRemoveCoupon();
    setErrorMessage('');
    if (onNotify) {
      onNotify('Coupon removed.', 'info');
    }
  };

  return (
    <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Tag className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <h4 className="font-extrabold text-sm text-[#0F172A] dark:text-white">
            Have a Promo Code?
          </h4>
        </div>

        {appliedCoupon && (
          <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
            Active
          </span>
        )}
      </div>

      {appliedCoupon ? (
        <div className="p-3 rounded-xl bg-emerald-50/80 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-7 h-7 rounded-lg bg-emerald-500 text-white flex items-center justify-center shrink-0">
              <Check className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <span className="font-black text-xs text-emerald-800 dark:text-emerald-300 block truncate">
                {appliedCoupon.couponCode} ({appliedCoupon.discountPercent}% Off)
              </span>
              <span className="text-[11px] text-emerald-700 dark:text-emerald-400 font-semibold block">
                Total savings: -₹{Math.round((subtotal * appliedCoupon.discountPercent) / 100).toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleRemove}
            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
            title="Remove coupon"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div className="space-y-2.5">
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Enter coupon code (e.g. WELCOME10)"
              value={code}
              onChange={(e) => {
                setCode(e.target.value.toUpperCase());
                setErrorMessage('');
              }}
              onKeyDown={(e) => e.key === 'Enter' && handleApply()}
              className="w-full text-xs uppercase px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-semibold"
            />
            <button
              type="button"
              onClick={() => handleApply()}
              className="px-4 py-2.5 rounded-xl font-bold text-xs bg-blue-600 hover:bg-blue-700 text-white transition-colors shrink-0 shadow-sm"
            >
              Apply
            </button>
          </div>

          {/* Quick preset chips */}
          <div className="flex items-center gap-1.5 flex-wrap pt-1">
            <span className="text-[10px] font-bold text-slate-400">Try:</span>
            {EXAMPLE_COUPONS.map((cpn) => (
              <button
                key={cpn}
                type="button"
                onClick={() => handleApply(cpn)}
                className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-slate-100 hover:bg-blue-50 dark:bg-slate-800 dark:hover:bg-blue-950/60 text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-300 border border-slate-200/80 dark:border-slate-700 transition-colors"
              >
                {cpn}
              </button>
            ))}
          </div>

          {errorMessage && (
            <div className="flex items-center gap-1.5 text-xs text-rose-600 dark:text-rose-400 font-semibold pt-1">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CouponBox;
