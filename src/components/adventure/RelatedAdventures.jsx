import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Star, 
  Clock, 
  ArrowRight, 
  Compass,
  Sparkles
} from 'lucide-react';
import Card from '../common/Card';

const RelatedAdventures = ({ adventures = [], currentId = '' }) => {
  const navigate = useNavigate();

  // Filter out the current adventure and take 6 similar ones
  const related = adventures
    .filter((adv) => adv.id !== currentId)
    .slice(0, 6);

  if (related.length === 0) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <h3 className="font-extrabold text-2xl text-[#0F172A] dark:text-white">
              Related Expeditions
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-[#475569] dark:text-slate-400 mt-1">
            Discover other high-rated adventures recommended by our wilderness community.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {related.map((adv, idx) => (
          <motion.div
            key={adv.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.08 }}
          >
            <Card
              className="group h-full flex flex-col justify-between border-slate-200/90 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden bg-white dark:bg-slate-900"
              onClick={() => {
                navigate(`/adventure/${adv.id}`);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <div>
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={adv.images[0]}
                    alt={adv.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Category Pill */}
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-black bg-blue-600 text-white shadow-md">
                      {adv.category}
                    </span>
                  </div>

                  {/* Rating */}
                  <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-900/90 text-amber-400 text-xs font-bold border border-white/10 backdrop-blur-md">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span>{adv.rating}</span>
                  </div>

                  {/* Location in image footer */}
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <p className="text-xs text-slate-100 flex items-center gap-1 font-semibold truncate">
                      <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span className="truncate">{adv.destination}</span>
                    </p>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-semibold">
                    <span className="flex items-center gap-1 text-blue-600 dark:text-blue-400">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{adv.duration}</span>
                    </span>
                    <span>{adv.difficulty}</span>
                  </div>

                  <h4 className="text-base font-bold text-[#0F172A] dark:text-white line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {adv.name}
                  </h4>

                  <p className="text-xs text-[#475569] dark:text-slate-400 line-clamp-2 leading-relaxed">
                    {adv.description}
                  </p>
                </div>
              </div>

              {/* Pricing & Button */}
              <div className="px-5 pb-5 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-slate-500 block font-semibold">From</span>
                  <span className="text-lg font-black text-[#0F172A] dark:text-white">
                    ₹{adv.price.toLocaleString()}
                  </span>
                </div>

                <span className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-blue-700 group-hover:text-white transition-all shadow-xs">
                  <span>View</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default RelatedAdventures;
