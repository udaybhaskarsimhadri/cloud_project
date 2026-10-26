import React from 'react';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Calendar, 
  Users, 
  Utensils, 
  Package, 
  Car, 
  ShieldCheck, 
  Clock, 
  Sparkles,
  Receipt,
  Lock
} from 'lucide-react';
import PriceSummary from './PriceSummary';
import { MEAL_OPTIONS } from '../../data/bookingData';

const BookingSummary = ({
  adventure,
  selectedBatch,
  travelers = [],
  selectedEquipment = [],
  selectedMeal = 'Vegetarian Feast',
  selectedTransport = 'Self Arrival',
  insuranceIncluded = false,
  appliedCoupon = null
}) => {
  if (!adventure) return null;

  const transportPrice = selectedTransport.includes('Pickup') ? 25 : 0;
  const insurancePrice = insuranceIncluded ? 29 : 0;
  const mealOption = MEAL_OPTIONS.find((m) => m.name === selectedMeal);
  const mealPrice = mealOption?.price || 0;
  const basePrice = selectedBatch?.price || adventure.pricing?.discountPrice || adventure.discountPrice || adventure.price || 8999;
  const primaryTraveler = travelers[0] || {};

  return (
    <div className="space-y-6">
      {/* Adventure Card Overview */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row gap-6 items-start">
        <div className="w-full md:w-48 h-36 rounded-2xl overflow-hidden relative shrink-0">
          <img
            src={adventure.images?.[0] || 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b'}
            alt={adventure.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full text-[10px] font-black bg-blue-600 text-white shadow-md">
            {adventure.category}
          </div>
        </div>

        <div className="flex-1 space-y-2">
          <h3 className="font-extrabold text-xl text-[#0F172A] dark:text-white">
            {adventure.name}
          </h3>

          <div className="flex flex-wrap items-center gap-3 text-xs text-[#475569] dark:text-slate-400 font-semibold">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-emerald-500" />
              <span>{adventure.destination}</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-blue-500" />
              <span>{adventure.duration}</span>
            </span>
          </div>

          <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 pt-1">
            {adventure.experienceSummary || adventure.description}
          </p>
        </div>
      </div>

      {/* Selected Expedition Logistics Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Date and Batch */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1.5">
          <span className="flex items-center gap-1.5 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            <Calendar className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            Confirmed Travel Dates
          </span>
          <p className="font-extrabold text-sm sm:text-base text-[#0F172A] dark:text-white">
            {selectedBatch ? `${selectedBatch.startDate} – ${selectedBatch.endDate}` : 'Dates to be selected'}
          </p>
          <span className="text-xs text-slate-500 dark:text-slate-400 block">
            Duration: {selectedBatch?.duration || adventure.duration}
          </span>
        </div>

        {/* Travelers List */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1.5">
          <span className="flex items-center gap-1.5 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            <Users className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            Travelers ({travelers.length})
          </span>
          <p className="font-extrabold text-sm sm:text-base text-[#0F172A] dark:text-white truncate">
            Lead: {primaryTraveler.fullName || 'Primary Traveler'} ({primaryTraveler.age || '—'} yrs)
          </p>
          {travelers.length > 1 && (
            <span className="text-xs text-slate-500 dark:text-slate-400 block truncate">
              Plus {travelers.length - 1} companion {travelers.length - 1 === 1 ? 'traveler' : 'travelers'}: {travelers.slice(1).map(t => t.fullName || 'Guest').join(', ')}
            </span>
          )}
        </div>

        {/* Meals & Transport */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1.5">
          <span className="flex items-center gap-1.5 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            <Utensils className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            Catering & Logistics
          </span>
          <p className="font-extrabold text-sm text-[#0F172A] dark:text-white">
            Dietary: {selectedMeal}
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Transport: {selectedTransport}
          </p>
        </div>

        {/* Equipment & Insurance */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1.5">
          <span className="flex items-center gap-1.5 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            <Package className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            Gear & Insurance
          </span>
          <p className="font-extrabold text-sm text-[#0F172A] dark:text-white">
            {selectedEquipment.length > 0 
              ? `${selectedEquipment.reduce((s, i) => s + i.quantity, 0)} rental gear items` 
              : 'Standard personal gear'}
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Medical Shield: {insuranceIncluded ? 'Included (₹5,00,000 cover)' : 'Declined'}
          </p>
        </div>
      </div>

      {/* Itemized Price Breakdown */}
      <PriceSummary
        basePrice={basePrice}
        travelerCount={travelers.length}
        selectedEquipment={selectedEquipment}
        transportPrice={transportPrice}
        insurancePrice={insurancePrice}
        mealPrice={mealPrice}
        selectedMeal={selectedMeal}
        selectedTransport={selectedTransport}
        appliedCoupon={appliedCoupon}
      />

      {/* Payment Method Notice with Disabled Online Payment Button */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-extrabold text-sm sm:text-base text-[#0F172A] dark:text-white">
              Expedition Payment Method
            </h4>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              Booking is processed and saved locally
            </span>
          </div>
          <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
            Local Mode
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 space-y-2">
          <button
            type="button"
            disabled
            className="w-full py-3 px-4 rounded-xl font-bold text-xs sm:text-sm bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400 cursor-not-allowed flex items-center justify-center gap-2 border border-slate-300/80 dark:border-slate-600 select-none opacity-80"
            title="Online Payment Coming Soon"
          >
            <Lock className="w-4 h-4 text-slate-400" />
            <span>Online Payment Coming Soon</span>
          </button>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 text-center">
            Online payment gateway integration will activate in subsequent releases. You can confirm and save your booking right now.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BookingSummary;
