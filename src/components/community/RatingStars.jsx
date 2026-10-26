import React, { useState } from 'react';
import { Star } from 'lucide-react';

const SIZES = {
  xs: 'w-3 h-3',
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6',
  xl: 'w-8 h-8'
};

const RatingStars = ({
  rating = 5,
  setRating = null,
  maxStars = 5,
  size = 'md',
  showScore = false,
  interactive = false,
  className = ''
}) => {
  const [hoverRating, setHoverRating] = useState(0);

  const starSize = SIZES[size] || SIZES.md;
  const currentRating = hoverRating || rating;

  return (
    <div className={`inline-flex items-center gap-1 ${className}`}>
      <div className="flex items-center gap-0.5">
        {[...Array(maxStars)].map((_, index) => {
          const starVal = index + 1;
          const isFilled = starVal <= currentRating;
          const isHalf = !isFilled && starVal - 0.5 <= currentRating;

          return (
            <button
              type="button"
              key={index}
              disabled={!interactive}
              onClick={() => interactive && setRating && setRating(starVal)}
              onMouseEnter={() => interactive && setHoverRating(starVal)}
              onMouseLeave={() => interactive && setHoverRating(0)}
              className={`${
                interactive
                  ? 'cursor-pointer hover:scale-110 transition-transform'
                  : 'cursor-default'
              } p-0.5 focus:outline-none`}
              aria-label={`${starVal} Star`}
            >
              <Star
                className={`${starSize} transition-colors ${
                  isFilled
                    ? 'text-amber-400 fill-amber-400'
                    : isHalf
                    ? 'text-amber-400 fill-amber-400/50'
                    : 'text-slate-300 dark:text-slate-600'
                }`}
              />
            </button>
          );
        })}
      </div>

      {showScore && (
        <span className="text-xs font-black text-slate-700 dark:text-slate-200 ml-1">
          {Number(rating).toFixed(1)}
        </span>
      )}
    </div>
  );
};

export default RatingStars;
