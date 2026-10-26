import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  Camera 
} from 'lucide-react';

const DestinationGallery = ({ images = [], destinationName = 'Destination' }) => {
  const [activeLightboxIndex, setActiveLightboxIndex] = useState(null);

  const openLightbox = (index) => {
    setActiveLightboxIndex(index);
  };

  const closeLightbox = () => {
    setActiveLightboxIndex(null);
  };

  const nextImage = (e) => {
    e?.stopPropagation();
    setActiveLightboxIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e) => {
    e?.stopPropagation();
    setActiveLightboxIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div>
      {/* Grid of gallery images */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((img, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: idx * 0.05 }}
            onClick={() => openLightbox(idx)}
            className={`relative group rounded-3xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl border border-slate-200 dark:border-slate-800 ${
              idx === 0 ? 'sm:col-span-2 sm:row-span-2 h-80 sm:h-96' : 'h-44 sm:h-46'
            }`}
          >
            <img
              src={img}
              alt={`${destinationName} scenic photo ${idx + 1}`}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              loading="lazy"
            />
            {/* Dark gradient on hover */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <span className="p-3 rounded-full bg-white/20 backdrop-blur-md text-white border border-white/30 transform scale-75 group-hover:scale-100 transition-transform">
                <Maximize2 className="w-5 h-5" />
              </span>
            </div>
            <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md text-white text-[11px] font-semibold px-2.5 py-1 rounded-full opacity-80 group-hover:opacity-100 transition-opacity flex items-center gap-1 border border-white/10">
              <Camera className="w-3 h-3" />
              <span>Photo {idx + 1}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeLightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
          >
            {/* Top Toolbar */}
            <div className="absolute top-6 left-6 right-6 flex items-center justify-between text-white z-50">
              <div>
                <h4 className="font-bold text-lg">{destinationName}</h4>
                <p className="text-xs text-slate-300">
                  Image {activeLightboxIndex + 1} of {images.length}
                </p>
              </div>

              <button
                onClick={closeLightbox}
                className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                aria-label="Close Lightbox"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Main Lightbox Image */}
            <motion.div
              key={activeLightboxIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl max-h-[82vh] overflow-hidden rounded-2xl shadow-2xl"
            >
              <img
                src={images[activeLightboxIndex]}
                alt={`${destinationName} gallery preview`}
                className="w-full h-full object-contain max-h-[80vh] rounded-2xl"
              />
            </motion.div>

            {/* Nav Arrows */}
            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={prevImage}
                  className="absolute left-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/15 hover:bg-white/30 text-white backdrop-blur-md border border-white/20 transition-all cursor-pointer"
                  aria-label="Previous Image"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  type="button"
                  onClick={nextImage}
                  className="absolute right-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/15 hover:bg-white/30 text-white backdrop-blur-md border border-white/20 transition-all cursor-pointer"
                  aria-label="Next Image"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DestinationGallery;
