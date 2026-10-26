import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, 
  Film, 
  Sparkles, 
  X, 
  Eye, 
  Maximize2 
} from 'lucide-react';

const AdventureVideoGallery = ({ gallery = [] }) => {
  const [activeMedia, setActiveMedia] = useState(null);

  if (!gallery || gallery.length === 0) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 pb-3 border-b border-slate-200 dark:border-slate-800">
        <Film className="w-5 h-5 text-blue-600 dark:text-blue-400" />
        <h3 className="font-extrabold text-2xl text-[#0F172A] dark:text-white">
          Visual Media & 4K Aerial Footage
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {gallery.map((item, idx) => {
          const isVideo = item.type === 'video';
          const imgSrc = isVideo ? item.thumbnail : item.url;

          return (
            <motion.div
              key={idx}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              onClick={() => setActiveMedia(item)}
              className="group relative h-56 rounded-3xl overflow-hidden bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all cursor-pointer"
            >
              <img
                src={imgSrc}
                alt={item.caption || `Media ${idx + 1}`}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Video Play Badge overlay */}
              {isVideo && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-blue-600/90 text-white flex items-center justify-center shadow-xl group-hover:scale-115 transition-transform backdrop-blur-xs">
                    <Play className="w-6 h-6 fill-white ml-1" />
                  </div>
                </div>
              )}

              {/* Caption */}
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md mb-1 inline-block border border-white/20">
                  {isVideo ? '4K Drone Reel' : 'Trail Capture'}
                </span>
                <p className="text-xs font-bold truncate drop-shadow-sm">
                  {item.caption}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Video / Photo Preview Modal */}
      <AnimatePresence>
        {activeMedia && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-4xl bg-slate-950 rounded-3xl overflow-hidden shadow-2xl border border-slate-800"
            >
              <button
                type="button"
                onClick={() => setActiveMedia(null)}
                className="absolute top-4 right-4 z-20 p-2 text-white/80 hover:text-white rounded-full bg-black/50 hover:bg-black/80 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative aspect-video flex items-center justify-center bg-black">
                {activeMedia.type === 'video' ? (
                  <div className="text-center p-8 space-y-4 text-white">
                    <div className="w-20 h-20 mx-auto rounded-full bg-blue-600 flex items-center justify-center shadow-2xl">
                      <Play className="w-8 h-8 fill-white ml-1" />
                    </div>
                    <h4 className="text-xl font-bold">{activeMedia.caption}</h4>
                    <p className="text-sm text-slate-400 max-w-md mx-auto">
                      4K drone footage stream preview is simulated for high-resolution field captures.
                    </p>
                  </div>
                ) : (
                  <img
                    src={activeMedia.url}
                    alt={activeMedia.caption}
                    className="w-full h-full object-contain"
                  />
                )}
              </div>

              <div className="p-4 bg-slate-900 border-t border-slate-800 text-white flex items-center justify-between text-xs">
                <span>{activeMedia.caption}</span>
                <span className="text-slate-400 font-medium">AdventureX Media Archive</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdventureVideoGallery;
