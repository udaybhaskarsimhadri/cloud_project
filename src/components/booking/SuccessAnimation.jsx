import React from 'react';
import { motion } from 'framer-motion';
import { Check, Sparkles } from 'lucide-react';

const SuccessAnimation = () => {
  return (
    <div className="relative flex items-center justify-center my-6">
      {/* Background pulsating concentric rings */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: [1, 1.35, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute w-36 h-36 rounded-full bg-emerald-500/10 pointer-events-none"
      />
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
        className="absolute w-28 h-28 rounded-full bg-emerald-500/20 pointer-events-none"
      />

      {/* Main Checkmark Icon Container */}
      <motion.div
        initial={{ scale: 0, rotate: -45 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{
          type: 'spring',
          stiffness: 260,
          damping: 20,
          delay: 0.1
        }}
        className="w-20 h-20 rounded-full bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center text-white shadow-xl shadow-emerald-500/30 relative z-10"
      >
        <motion.div
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <Check className="w-10 h-10 stroke-[3]" />
        </motion.div>
      </motion.div>

      {/* Confetti spark particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0.5],
            x: Math.cos((i * 60 * Math.PI) / 180) * 55,
            y: Math.sin((i * 60 * Math.PI) / 180) * 55
          }}
          transition={{ duration: 1.2, delay: 0.4 + i * 0.08, repeat: Infinity, repeatDelay: 2.5 }}
          className="absolute w-2 h-2 rounded-full bg-amber-400"
        />
      ))}
    </div>
  );
};

export default SuccessAnimation;
