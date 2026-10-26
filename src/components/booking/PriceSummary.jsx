import React from 'react';
import { motion } from 'framer-motion';
import { 
  Receipt, 
  ShieldCheck, 
  Users, 
  Package, 
  Percent, 
  Car,
  Utensils,
  Sparkles
} from 'lucide-react';

const PriceSummary = ({
  basePrice = 8999,
  travelerCount = 1,
  selectedEquipment = [],
  transportPrice = 0,
  insurancePrice = 0,
  mealPrice = 0,
  selectedMeal = '',
  selectedTransport = '',
  appliedCoupon = null,
  showTitle = true,
  className = ''
}) => {
  // Dynamic Calculations
  const validTravelerCount = Math.max(1, travelerCount);
  const adventureCost = basePrice * validTravelerCount;
  
  const equipmentCharges = selectedEquipment.reduce(
    (sum, item) => sum + (item.price * item.quantity), 
    0
  );
  
  const transportationCharges = transportPrice * validTravelerCount;
  const insuranceCharges = insurancePrice * validTravelerCount;
  const mealCharges = mealPrice * validTravelerCount;

  const subtotal = adventureCost + equipmentCharges + transportationCharges + insuranceCharges + mealCharges;
  
  // 5% standard state alpine & ecological permit fee / tax
  const taxes = Math.round(subtotal * 0.05);

  // Dynamic percentage coupon calculation
  const discount = appliedCoupon 
    ? Math.round((subtotal * appliedCoupon.discountPercent) / 100) 
    : 0;

  const finalTotal = Math.max(0, subtotal + taxes - discount);

  return (
    <div className={`p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 ${className}`}>
      {showTitle && (
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <Receipt className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <h4 className="font-extrabold text-base text-[#0F172A] dark:text-white">
              Expedition Price Summary
            </h4>
          </div>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
            Live Calculation
          </span>
        </div>
      )}

      {/* Itemized Line Items */}
      <div className="space-y-2.5 text-xs sm:text-sm">
        
        {/* Base Expedition Cost */}
        <div className="flex items-center justify-between text-[#475569] dark:text-slate-300">
          <span className="flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-slate-400" />
            <span>Adventure Cost (₹{basePrice.toLocaleString('en-IN')} × {validTravelerCount} {validTravelerCount === 1 ? 'traveler' : 'travelers'})</span>
          </span>
          <span className="font-bold text-[#0F172A] dark:text-white">
            ₹{adventureCost.toLocaleString('en-IN')}
          </span>
        </div>

        {/* Equipment Charges */}
        {equipmentCharges > 0 && (
          <div className="flex items-center justify-between text-[#475569] dark:text-slate-300">
            <span className="flex items-center gap-1.5">
              <Package className="w-3.5 h-3.5 text-slate-400" />
              <span>Gear & Equipment Rental</span>
            </span>
            <span className="font-bold text-[#0F172A] dark:text-white">
              +₹{equipmentCharges.toLocaleString('en-IN')}
            </span>
          </div>
        )}

        {/* Meal / Catering Preference */}
        <div className="flex items-center justify-between text-[#475569] dark:text-slate-300">
          <span className="flex items-center gap-1.5">
            <Utensils className="w-3.5 h-3.5 text-slate-400" />
            <span>Catering ({selectedMeal || 'Standard Diet'})</span>
          </span>
          <span className="font-bold text-[#0F172A] dark:text-white">
            {mealCharges > 0 ? `+₹${mealCharges.toLocaleString('en-IN')}` : 'Included (₹0)'}
          </span>
        </div>

        {/* Transportation */}
        <div className="flex items-center justify-between text-[#475569] dark:text-slate-300">
          <span className="flex items-center gap-1.5">
            <Car className="w-3.5 h-3.5 text-slate-400" />
            <span>Transfer ({transportPrice > 0 ? `Hub Pickup × ${validTravelerCount}` : 'Self Arrival'})</span>
          </span>
          <span className="font-bold text-[#0F172A] dark:text-white">
            {transportationCharges > 0 ? `+₹${transportationCharges.toLocaleString('en-IN')}` : 'Self Arrival (₹0)'}
          </span>
        </div>

        {/* Insurance */}
        <div className="flex items-center justify-between text-[#475569] dark:text-slate-300">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
            <span>Medical Shield ({insurancePrice > 0 ? `₹${insurancePrice.toLocaleString('en-IN')} × ${validTravelerCount}` : 'Declined'})</span>
          </span>
          <span className="font-bold text-[#0F172A] dark:text-white">
            {insuranceCharges > 0 ? `+₹${insuranceCharges.toLocaleString('en-IN')}` : 'Declined (₹0)'}
          </span>
        </div>

        {/* Taxes and Forest Permits */}
        <div className="flex items-center justify-between text-[#475569] dark:text-slate-300">
          <span>Forest Permits & Eco Taxes (5%)</span>
          <span className="font-bold text-[#0F172A] dark:text-white">
            +₹{taxes.toLocaleString('en-IN')}
          </span>
        </div>

        {/* Coupon Discount */}
        {appliedCoupon && (
          <div className="flex items-center justify-between text-emerald-600 dark:text-emerald-400 font-bold pt-1">
            <span className="flex items-center gap-1.5">
              <Percent className="w-3.5 h-3.5" />
              <span>Promo ({appliedCoupon.couponCode} -{appliedCoupon.discountPercent}%)</span>
            </span>
            <span>-₹{discount.toLocaleString('en-IN')}</span>
          </div>
        )}
      </div>

      {/* Grand Total */}
      <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-baseline justify-between">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
            Final Total
          </span>
          <span className="text-[11px] text-slate-400">
            Automatically updated
          </span>
        </div>

        <div className="text-right">
          <span className="text-2xl sm:text-3xl font-black text-[#0F172A] dark:text-white">
            ₹{finalTotal.toLocaleString('en-IN')}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PriceSummary;
