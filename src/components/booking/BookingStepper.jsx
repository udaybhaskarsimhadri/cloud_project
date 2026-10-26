import React from 'react';
import { motion } from 'framer-motion';
import { Check, Calendar, Users, PackagePlus, Receipt, CheckCircle2 } from 'lucide-react';

const STEPS = [
  { id: 1, label: 'Select Date', icon: Calendar, description: 'Choose batch' },
  { id: 2, label: 'Traveler Details', icon: Users, description: 'Participant info' },
  { id: 3, label: 'Extras & Meals', icon: PackagePlus, description: 'Gear & logistics' },
  { id: 4, label: 'Price & Coupons', icon: Receipt, description: 'Instant calculation' },
  { id: 5, label: 'Booking Summary', icon: CheckCircle2, description: 'Review & confirm' }
];

const BookingStepper = ({ currentStep, onStepClick }) => {
  return (
    <div className="w-full py-4 mb-8">
      {/* Desktop Stepper */}
      <div className="hidden sm:flex items-center justify-between relative">
        {/* Background track line */}
        <div className="absolute top-1/2 left-0 right-0 h-1 -translate-y-1/2 bg-slate-200 dark:bg-slate-800 z-0" />
        
        {/* Active progress track line */}
        <div 
          className="absolute top-1/2 left-0 h-1 -translate-y-1/2 bg-gradient-to-r from-blue-600 to-emerald-500 z-0 transition-all duration-500"
          style={{ width: `${((currentStep - 1) / (STEPS.length - 1)) * 100}%` }}
        />

        {STEPS.map((step) => {
          const isCompleted = step.id < currentStep;
          const isActive = step.id === currentStep;
          const Icon = step.icon;

          return (
            <div 
              key={step.id} 
              className="relative z-10 flex flex-col items-center"
            >
              <button
                type="button"
                onClick={() => isCompleted && onStepClick && onStepClick(step.id)}
                disabled={!isCompleted}
                className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-sm transition-all duration-300 shadow-md ${
                  isCompleted
                    ? 'bg-emerald-500 text-white cursor-pointer hover:scale-105 ring-4 ring-emerald-500/20'
                    : isActive
                    ? 'bg-blue-600 text-white ring-4 ring-blue-500/25 scale-110 shadow-blue-500/30'
                    : 'bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed'
                }`}
                aria-label={`Step ${step.id}: ${step.label}`}
              >
                {isCompleted ? (
                  <Check className="w-5 h-5 stroke-[2.5]" />
                ) : (
                  <Icon className="w-5 h-5" />
                )}
              </button>

              <div className="text-center mt-2.5">
                <span
                  className={`block text-xs font-bold transition-colors ${
                    isActive
                      ? 'text-[#0F172A] dark:text-white'
                      : isCompleted
                      ? 'text-emerald-600 dark:text-emerald-400'
                      : 'text-slate-400 dark:text-slate-500'
                  }`}
                >
                  {step.label}
                </span>
                <span className="hidden md:block text-[11px] text-slate-500 dark:text-slate-400">
                  {step.description}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Mobile Stepper Header */}
      <div className="sm:hidden flex items-center justify-between p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-sm shadow-md">
            {currentStep} / {STEPS.length}
          </div>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Step {currentStep} of {STEPS.length}
            </span>
            <h4 className="text-sm font-extrabold text-[#0F172A] dark:text-white">
              {STEPS[currentStep - 1]?.label}
            </h4>
          </div>
        </div>

        {/* Mini progress pill */}
        <div className="w-24 bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
          <div 
            className="h-full bg-blue-600 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / STEPS.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default BookingStepper;
