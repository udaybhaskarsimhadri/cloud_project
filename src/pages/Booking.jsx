import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  ArrowRight, 
  Check, 
  ShieldCheck, 
  Sparkles, 
  Compass, 
  AlertTriangle,
  Lock
} from 'lucide-react';

import { ADVENTURES_DATA } from '../data/adventuresData';
import { bookingService } from '../services/bookingService';
import { MEAL_OPTIONS } from '../data/bookingData';

import BookingStepper from '../components/booking/BookingStepper';
import BookingCalendar from '../components/booking/BookingCalendar';
import TravelerForm from '../components/booking/TravelerForm';
import EquipmentSelector from '../components/booking/EquipmentSelector';
import MealSelector from '../components/booking/MealSelector';
import PriceSummary from '../components/booking/PriceSummary';
import CouponBox from '../components/booking/CouponBox';
import BookingSummary from '../components/booking/BookingSummary';
import BookingConfirmation from '../components/booking/BookingConfirmation';
import Toast from '../components/common/Toast';
import Button from '../components/common/Button';
import BookingAIAssistant from '../components/ai/BookingAIAssistant';

const Booking = () => {
  const { adventureId } = useParams();
  const navigate = useNavigate();

  // Find adventure
  const adventure = ADVENTURES_DATA.find((adv) => adv.id === adventureId) || ADVENTURES_DATA[0];
  const defaultAdventurePrice = adventure?.pricing?.discountPrice || adventure?.discountPrice || adventure?.price || 8999;

  // Stepper state (1 to 5)
  const [currentStep, setCurrentStep] = useState(1);

  // Booking Form State with initial default batch
  const [selectedBatch, setSelectedBatch] = useState(() => ({
    id: 'may-batch-1',
    month: 'May',
    startDate: 'May 12, 2026',
    endDate: 'May 16, 2026',
    duration: adventure?.duration || '5 Days / 4 Nights',
    price: defaultAdventurePrice,
    availableSeats: 4,
    totalSeats: 14,
    status: 'Limited Seats'
  }));

  // Synchronize batch price when adventure changes
  useEffect(() => {
    setSelectedBatch({
      id: 'may-batch-1',
      month: 'May',
      startDate: 'May 12, 2026',
      endDate: 'May 16, 2026',
      duration: adventure?.duration || '5 Days / 4 Nights',
      price: defaultAdventurePrice,
      availableSeats: 4,
      totalSeats: 14,
      status: 'Limited Seats'
    });
  }, [adventureId]);

  const [travelers, setTravelers] = useState([
    {
      fullName: '',
      email: '',
      phone: '',
      age: '',
      gender: 'Male',
      nationality: 'Indian',
      idType: 'Passport',
      emergencyContact: '',
      medicalConditions: ''
    }
  ]);

  const [selectedEquipment, setSelectedEquipment] = useState([]);
  const [selectedMeal, setSelectedMeal] = useState('Vegetarian Feast');
  const [selectedTransport, setSelectedTransport] = useState('Airport / Rail Hub Pickup & Transfer');
  const [insuranceIncluded, setInsuranceIncluded] = useState(true);
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  // Dialog & Submission State
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Toast Notification State
  const [toast, setToast] = useState({ isOpen: false, message: '', type: 'success' });

  const triggerToast = (message, type = 'success') => {
    setToast({ isOpen: true, message, type });
  };

  // Scroll to top when step changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentStep]);

  if (!adventure) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4 py-20 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-md w-full text-center space-y-4 p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl">
          <AlertTriangle className="w-10 h-10 text-amber-500 mx-auto" />
          <h2 className="text-xl font-bold text-[#0F172A] dark:text-white">
            Expedition Not Found
          </h2>
          <p className="text-xs text-[#475569] dark:text-slate-400">
            Please choose an active adventure to initiate booking.
          </p>
          <Link to="/destinations">
            <Button variant="primary">Browse Expeditions</Button>
          </Link>
        </div>
      </div>
    );
  }

  // Dynamic Price calculations - immediately reacts to all user selections
  const basePrice = selectedBatch?.price || defaultAdventurePrice;
  const transportPrice = selectedTransport.includes('Pickup') ? 250 : 0;
  const insurancePrice = insuranceIncluded ? 299 : 0;
  const mealOption = MEAL_OPTIONS.find((m) => m.name === selectedMeal);
  const mealPrice = mealOption?.price || 0;

  const validTravelerCount = Math.max(1, travelers.length);
  const adventureCost = basePrice * validTravelerCount;
  const equipmentCost = selectedEquipment.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const transportCost = transportPrice * validTravelerCount;
  const insuranceCost = insurancePrice * validTravelerCount;
  const mealCost = mealPrice * validTravelerCount;

  const subtotal = adventureCost + equipmentCost + transportCost + insuranceCost + mealCost;
  const taxes = Math.round(subtotal * 0.05);

  // Dynamic percentage discount based on current live subtotal
  const discountAmount = appliedCoupon
    ? Math.round((subtotal * appliedCoupon.discountPercent) / 100)
    : 0;

  const grandTotal = Math.max(0, subtotal + taxes - discountAmount);

  // Validation before proceeding
  const handleNextStep = () => {
    if (currentStep === 1) {
      if (!selectedBatch) {
        triggerToast('Please select an available departure date batch.', 'error');
        return;
      }
    } else if (currentStep === 2) {
      const lead = travelers[0];
      if (!lead.fullName?.trim()) {
        triggerToast('Please enter the primary lead traveler full name.', 'error');
        return;
      }
      if (!lead.email?.trim() || !lead.email.includes('@')) {
        triggerToast('Please provide a valid email address for booking confirmation.', 'error');
        return;
      }
      if (!lead.phone?.trim()) {
        triggerToast('Please provide a phone number for emergency mountain dispatch.', 'error');
        return;
      }
      if (!lead.age) {
        triggerToast('Please specify the lead traveler age.', 'error');
        return;
      }
    }

    if (currentStep < 5) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setShowConfirmModal(true);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  // Final confirmation & create booking
  const handleFinalConfirmBooking = async () => {
    setIsSubmitting(true);
    try {
      const bookingPayload = {
        adventureId: adventure.id,
        adventureName: adventure.name,
        adventureImage: adventure.images?.[0] || '',
        destination: adventure.destination,
        category: adventure.category,
        organizer: adventure.organizer || { name: 'AdventureX Guides', company: 'Certified Alpine Crew' },
        travelDate: {
          startDate: selectedBatch.startDate,
          endDate: selectedBatch.endDate,
          duration: selectedBatch.duration || adventure.duration
        },
        travelers,
        selectedEquipment,
        mealPreference: selectedMeal,
        transportation: selectedTransport,
        insuranceIncluded,
        pricing: {
          baseRatePerPerson: basePrice,
          travelerCount: travelers.length,
          adventureCost,
          equipmentCost,
          transportCost,
          insuranceCost,
          mealCost,
          subtotal,
          taxes,
          couponCode: appliedCoupon ? appliedCoupon.couponCode : null,
          discountAmount,
          grandTotal
        }
      };

      const newBooking = await bookingService.createBooking(bookingPayload);
      setIsSubmitting(false);
      setShowConfirmModal(false);

      triggerToast('Booking Successful! Expedition confirmed.', 'success');

      // Navigate to success page with booking state
      setTimeout(() => {
        navigate('/booking/success', { state: { booking: newBooking } });
      }, 400);

    } catch (err) {
      setIsSubmitting(false);
      triggerToast('Failed to lock reservation. Please try again.', 'error');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/60 dark:bg-slate-950 py-10 lg:py-16 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Breadcrumb & Back Link */}
        <div className="mb-6 flex items-center justify-between">
          <Link
            to={`/adventure/${adventure.id}`}
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to {adventure.name}</span>
          </Link>

          <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
            <ShieldCheck className="w-4 h-4" />
            <span>Bank-Grade 256-Bit SSL Secured</span>
          </div>
        </div>

        {/* Stepper Progress */}
        <BookingStepper 
          currentStep={currentStep} 
          onStepClick={(step) => setCurrentStep(step)} 
        />

        {/* Main 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Multi-Step Interactive Form (8 cols on lg) */}
          <div className="lg:col-span-8 space-y-6">
            {/* Part 10: AI Booking Assistant */}
            <BookingAIAssistant adventure={adventure} />

            <AnimatePresence mode="wait">
              {currentStep === 1 && (
                <motion.div
                  key="step-1"
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 15 }}
                  transition={{ duration: 0.25 }}
                >
                  <BookingCalendar
                    adventure={adventure}
                    selectedBatch={selectedBatch}
                    onSelectBatch={(batch) => setSelectedBatch(batch)}
                  />
                </motion.div>
              )}

              {currentStep === 2 && (
                <motion.div
                  key="step-2"
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 15 }}
                  transition={{ duration: 0.25 }}
                >
                  <TravelerForm
                    travelers={travelers}
                    onChangeTravelers={(updated) => setTravelers(updated)}
                  />
                </motion.div>
              )}

              {currentStep === 3 && (
                <motion.div
                  key="step-3"
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 15 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-10"
                >
                  <EquipmentSelector
                    selectedEquipment={selectedEquipment}
                    onChangeEquipment={(eq) => setSelectedEquipment(eq)}
                    travelerCount={travelers.length}
                  />

                  <MealSelector
                    selectedMeal={selectedMeal}
                    onSelectMeal={(m) => setSelectedMeal(m)}
                    selectedTransport={selectedTransport}
                    onSelectTransport={(t) => setSelectedTransport(t)}
                    insuranceIncluded={insuranceIncluded}
                    onToggleInsurance={() => setInsuranceIncluded(!insuranceIncluded)}
                    travelerCount={travelers.length}
                  />
                </motion.div>
              )}

              {currentStep === 4 && (
                <motion.div
                  key="step-4"
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 15 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-6"
                >
                  <div className="pb-3 border-b border-slate-200 dark:border-slate-800">
                    <h3 className="font-extrabold text-xl sm:text-2xl text-[#0F172A] dark:text-white">
                      Price Calculation & Coupons
                    </h3>
                    <p className="text-xs sm:text-sm text-[#475569] dark:text-slate-400 mt-1">
                      Transparent rates automatically recalculated based on your participants and equipment selections.
                    </p>
                  </div>

                  <CouponBox
                    appliedCoupon={appliedCoupon}
                    onApplyCoupon={(cpn) => setAppliedCoupon(cpn)}
                    onRemoveCoupon={() => setAppliedCoupon(null)}
                    travelerCount={travelers.length}
                    subtotal={subtotal}
                    onNotify={(msg, type) => triggerToast(msg, type)}
                  />

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
                </motion.div>
              )}

              {currentStep === 5 && (
                <motion.div
                  key="step-5"
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 15 }}
                  transition={{ duration: 0.25 }}
                >
                  <BookingSummary
                    adventure={adventure}
                    selectedBatch={selectedBatch}
                    travelers={travelers}
                    selectedEquipment={selectedEquipment}
                    selectedMeal={selectedMeal}
                    selectedTransport={selectedTransport}
                    insuranceIncluded={insuranceIncluded}
                    appliedCoupon={appliedCoupon}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Stepper Navigation Buttons */}
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between gap-4">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className="px-5 py-3 rounded-2xl font-bold text-xs sm:text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Previous Step</span>
                </button>
              ) : (
                <div />
              )}

              <button
                type="button"
                onClick={handleNextStep}
                className="px-7 py-3 rounded-2xl font-bold text-xs sm:text-sm bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg shadow-blue-500/25 flex items-center gap-2 transition-all cursor-pointer"
              >
                <span>{currentStep === 5 ? 'Confirm & Book Expedition' : 'Continue to Next Step'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column: Sticky Sidebar Overview & Pricing (4 cols on lg) */}
          <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-28">
            {/* Quick Mini Adventure Info Card */}
            <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl overflow-hidden shrink-0">
                <img
                  src={adventure.images?.[0]}
                  alt={adventure.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] font-black uppercase tracking-wider text-blue-600 dark:text-blue-400 block truncate">
                  {adventure.category} • {adventure.destination}
                </span>
                <h4 className="font-extrabold text-sm text-[#0F172A] dark:text-white truncate">
                  {adventure.name}
                </h4>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold block">
                  {adventure.duration}
                </span>
              </div>
            </div>

            {/* Promo Code Box */}
            <CouponBox
              appliedCoupon={appliedCoupon}
              onApplyCoupon={(cpn) => setAppliedCoupon(cpn)}
              onRemoveCoupon={() => setAppliedCoupon(null)}
              travelerCount={travelers.length}
              subtotal={subtotal}
              onNotify={(msg, type) => triggerToast(msg, type)}
            />

            {/* Instant Price Breakdown Summary */}
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

            {/* Trust Assurance Card */}
            <div className="p-5 rounded-2xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/30 space-y-2.5 text-xs text-[#475569] dark:text-slate-300">
              <div className="flex items-center gap-2 font-bold text-blue-700 dark:text-blue-300">
                <Sparkles className="w-4 h-4" />
                <span>AdventureX Guarantee</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                Free cancellation up to 7 days before departure. 100% verified UIAGM mountain guides with satellite communication coverage.
              </p>
            </div>
          </aside>

        </div>
      </div>

      {/* Confirmation Modal */}
      <BookingConfirmation
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={handleFinalConfirmBooking}
        adventure={adventure}
        selectedBatch={selectedBatch}
        travelerCount={travelers.length}
        totalAmount={grandTotal}
        isSubmitting={isSubmitting}
      />

      {/* Toast Notification */}
      <Toast
        isOpen={toast.isOpen}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast((prev) => ({ ...prev, isOpen: false }))}
      />
    </div>
  );
};

export default Booking;
