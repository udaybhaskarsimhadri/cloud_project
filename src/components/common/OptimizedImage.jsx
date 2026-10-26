import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Image as ImageIcon } from 'lucide-react';

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80';

const OptimizedImage = ({
  src,
  alt = 'Adventure expedition',
  className = '',
  containerClassName = '',
  fallback = FALLBACK_IMAGE,
  aspectRatio = null,
  ...props
}) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const imageSrc = error || !src ? fallback : src;

  return (
    <div className={`relative overflow-hidden ${containerClassName}`}>
      {/* Shimmer skeleton while loading */}
      {!loaded && !error && (
        <div className="absolute inset-0 bg-slate-200 dark:bg-slate-800 animate-pulse flex items-center justify-center">
          <ImageIcon className="w-6 h-6 text-slate-400 opacity-40" />
        </div>
      )}

      {/* Actual Image */}
      <img
        src={imageSrc}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        onError={() => {
          setError(true);
          setLoaded(true);
        }}
        className={`w-full h-full object-cover transition-opacity duration-500 ${
          loaded ? 'opacity-100' : 'opacity-0'
        } ${className}`}
        {...props}
      />
    </div>
  );
};

export default OptimizedImage;
