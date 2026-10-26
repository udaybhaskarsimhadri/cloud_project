import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Compass, Home, MapPin, ArrowLeft } from 'lucide-react';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-xl w-full text-center space-y-6">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="relative inline-block"
        >
          {/* Animated Compass Icon */}
          <div className="w-28 h-28 mx-auto rounded-3xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center border border-blue-200 dark:border-blue-800 shadow-xl shadow-blue-500/10">
            <Compass className="w-14 h-14 animate-spin-slow" />
          </div>
          <Badge variant="danger" className="absolute -bottom-2 left-1/2 -translate-x-1/2">
            Error 404
          </Badge>
        </motion.div>

        <div className="space-y-3">
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Off The Beaten Path!
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed max-w-md mx-auto">
            The trail you are looking for has been moved, closed, or never existed in our topological map. Let's get you back to safe camp.
          </p>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button
            variant="primary"
            icon={Home}
            onClick={() => navigate('/')}
            className="w-full sm:w-auto"
          >
            Return to Basecamp (Home)
          </Button>
          <Button
            variant="outline"
            icon={MapPin}
            onClick={() => navigate('/destinations')}
            className="w-full sm:w-auto"
          >
            Explore Active Destinations
          </Button>
        </div>

        {/* Helpful quick trail routes */}
        <div className="pt-8 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-500">
          <p className="font-semibold mb-2 uppercase tracking-wider">Suggested Trails:</p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link to="/destinations" className="text-blue-600 dark:text-blue-400 hover:underline">
              Popular Treks
            </Link>
            <span>•</span>
            <Link to="/about" className="text-blue-600 dark:text-blue-400 hover:underline">
              About AdventureX
            </Link>
            <span>•</span>
            <Link to="/contact" className="text-blue-600 dark:text-blue-400 hover:underline">
              Contact 24x7 Dispatch
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
