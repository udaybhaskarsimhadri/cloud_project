import React from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, 
  LifeBuoy, 
  Moon, 
  Tent, 
  Compass, 
  Footprints, 
  Radio, 
  Plus, 
  Minus, 
  PackageCheck,
  Sparkles
} from 'lucide-react';
import { EQUIPMENT_CATALOG } from '../../data/bookingData';

const ICON_MAP = {
  Shield: Shield,
  LifeBuoy: LifeBuoy,
  Moon: Moon,
  Tent: Tent,
  Compass: Compass,
  Footprints: Footprints,
  Radio: Radio
};

const EquipmentSelector = ({ 
  selectedEquipment = [], 
  onChangeEquipment, 
  travelerCount = 1 
}) => {
  const getQuantity = (id) => {
    const found = selectedEquipment.find((item) => item.id === id);
    return found ? found.quantity : 0;
  };

  const handleUpdateQuantity = (item, delta) => {
    const currentQty = getQuantity(item.id);
    const newQty = Math.max(0, Math.min(travelerCount * 2, currentQty + delta));

    let updated = [...selectedEquipment];
    const index = updated.findIndex((i) => i.id === item.id);

    if (newQty === 0) {
      if (index !== -1) {
        updated.splice(index, 1);
      }
    } else {
      if (index !== -1) {
        updated[index] = { ...item, quantity: newQty };
      } else {
        updated.push({ ...item, quantity: newQty });
      }
    }

    onChangeEquipment(updated);
  };

  const totalEquipmentCost = selectedEquipment.reduce(
    (sum, item) => sum + item.price * item.quantity, 
    0
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <PackageCheck className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <h3 className="font-extrabold text-xl sm:text-2xl text-[#0F172A] dark:text-white">
              Expedition Equipment Rental
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-[#475569] dark:text-slate-400 mt-1">
            Top-tier certified mountaineering & outdoor gear. Pre-sanitized and calibrated prior to departure.
          </p>
        </div>

        {totalEquipmentCost > 0 && (
          <div className="px-3.5 py-1.5 rounded-xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-xs font-bold text-blue-700 dark:text-blue-300">
            Total Gear: +₹{totalEquipmentCost.toLocaleString('en-IN')}
          </div>
        )}
      </div>

      {/* Grid of Equipment Items */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {EQUIPMENT_CATALOG.map((item) => {
          const qty = getQuantity(item.id);
          const isSelected = qty > 0;
          const Icon = ICON_MAP[item.icon] || Shield;

          return (
            <motion.div
              key={item.id}
              whileHover={{ scale: 1.008 }}
              className={`p-5 rounded-3xl border transition-all duration-200 flex flex-col justify-between ${
                isSelected
                  ? 'bg-blue-50/50 dark:bg-blue-950/30 border-blue-400 dark:border-blue-700 shadow-md ring-1 ring-blue-500/20'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-3">
                    <div className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-colors ${
                      isSelected
                        ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-sm sm:text-base text-[#0F172A] dark:text-white">
                        {item.name}
                      </h4>
                      <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                        {item.category} • ₹{item.price.toLocaleString('en-IN')} / {item.perUnit}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-[#475569] dark:text-slate-400 line-clamp-2 my-2">
                  {item.description}
                </p>
              </div>

              {/* Quantity Selector */}
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  {qty > 0 ? (
                    <span className="text-blue-600 dark:text-blue-400">
                      ₹{(item.price * qty).toLocaleString('en-IN')} total
                    </span>
                  ) : (
                    'Not added'
                  )}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleUpdateQuantity(item, -1)}
                    disabled={qty === 0}
                    className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 flex items-center justify-center hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    aria-label={`Decrease ${item.name}`}
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>

                  <span className="w-7 text-center font-black text-sm text-[#0F172A] dark:text-white">
                    {qty}
                  </span>

                  <button
                    type="button"
                    onClick={() => handleUpdateQuantity(item, 1)}
                    className="w-8 h-8 rounded-xl bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center transition-colors shadow-sm"
                    aria-label={`Increase ${item.name}`}
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default EquipmentSelector;
