import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Maximize2, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles,
  Camera,
  Layers
} from 'lucide-react';

const AdventureGallery = ({ images = [], title = 'Adventure Gallery' }) => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  if (!images || images.length === 0) return null;

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!lightboxOpen) return;
      if (e.key === 'Escape') setLightboxOpen(false);
      if (e.key === 'ArrowRight') setActiveIdx((prev) => (prev + 1) % images.length);
      if (e.key === 'ArrowLeft') setActiveIdx((prev) => (prev - 1 + images.length) % images.length);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, images.length]);

  const handleNext = () => setActiveIdx((prev) => (prev + 1) % images.length);
  const handlePrev = () => setActiveIdx((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <Camera className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <h3 className="font-extrabold text-xl text-[#0F172A] dark:text-white">
            Expedition Gallery
          </h3>
          <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300">
            {images.length} Photos
          </span>
        </div>
        <button
          type="button"
          onClick={() => setLightboxOpen(true)}
          className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <Maximize2 className="w-3.5 h-3.5" />
          <span>Fullscreen Lightbox</span>
        </button>
      </div>

      {/* Main Preview Container with Image Zoom on Hover */}
      <div 
        className="relative h-80 sm:h-[460px] rounded-3xl overflow-hidden bg-slate-900 shadow-xl border border-slate-200/80 dark:border-slate-800 group cursor-pointer"
        onClick={() => setLightboxOpen(true)}
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={activeIdx}
            src={images[activeIdx]}
            alt={`${title} view ${activeIdx + 1}`}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: isZoomed ? 1.15 : 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.4 }}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            onMouseEnter={() => setIsZoomed(true)}
            onMouseLeave={() => setIsZoomed(false)}
          />
        </AnimatePresence>

        {/* Gradient shadow overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

        {/* Floating Controls on Main Image */}
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white pointer-events-none">
          <div className="bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-bold border border-white/20">
            <span>{activeIdx + 1} of {images.length}</span>
          </div>
          <div className="bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-bold border border-white/20 flex items-center gap-1.5">
            <Maximize2 className="w-3.5 h-3.5 text-amber-400" />
            <span>Click to expand</span>
          </div>
        </div>

        {/* Left/Right Fast Carousel Buttons on Large Preview */}
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); handlePrev(); }}
          className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur-md border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer shadow-lg"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); handleNext(); }}
          className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur-md border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer shadow-lg"
          aria-label="Next image"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Thumbnails Row */}
      <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-2 sm:gap-3">
        {images.map((img, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setActiveIdx(idx)}
            className={`relative h-20 sm:h-24 rounded-2xl overflow-hidden border-2 transition-all cursor-pointer ${
              activeIdx === idx
                ? 'border-blue-600 dark:border-blue-400 scale-[1.03] shadow-md ring-2 ring-blue-500/30'
                : 'border-transparent opacity-70 hover:opacity-100 hover:border-slate-300 dark:hover:border-slate-700'
            }`}
          >
            <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
            {activeIdx === idx && (
              <div className="absolute inset-0 bg-blue-600/15 pointer-events-none" />
            )}
          </button>
        ))}
      </div>

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-lg p-4 sm:p-8"
          >
            {/* Top Bar with Close */}
            <div className="absolute top-6 left-6 right-6 flex items-center justify-between text-white z-20">
              <div className="flex items-center gap-3">
                <span className="font-extrabold text-lg">{title}</span>
                <span className="text-sm text-slate-400 font-medium">({activeIdx + 1} / {images.length})</span>
              </div>
              <button
                type="button"
                onClick={() => setLightboxOpen(false)}
                className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
                aria-label="Close lightbox"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Navigation Arrows */}
            <button
              type="button"
              onClick={handlePrev}
              className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/15 hover:bg-white/30 text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all cursor-pointer z-20"
              aria-label="Previous Lightbox Image"
            >
              <ChevronLeft className="w-7 h-7" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/15 hover:bg-white/30 text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all cursor-pointer z-20"
              aria-label="Next Lightbox Image"
            >
              <ChevronRight className="w-7 h-7" />
            </button>

            {/* Lightbox Center Image */}
            <motion.div
              key={activeIdx}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.3 }}
              className="max-w-6xl max-h-[80vh] overflow-hidden rounded-2xl shadow-2xl relative"
            >
              <img
                src={images[activeIdx]}
                alt={`Lightbox view ${activeIdx + 1}`}
                className="w-full h-full max-h-[80vh] object-contain mx-auto"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdventureGallery;
