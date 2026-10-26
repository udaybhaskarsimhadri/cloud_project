import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Mountain, 
  Mail, 
  Phone, 
  MapPin, 
  ArrowRight, 
  Heart,
  ShieldCheck
} from 'lucide-react';
import { 
  FaInstagram, 
  FaFacebookF, 
  FaLinkedinIn, 
  FaYoutube 
} from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      {/* Upper Footer: Brand & Link Columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Col 1 & 2: Brand Information */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-blue-500 to-emerald-400 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
                <Mountain className="w-6 h-6 stroke-[2.2]" />
              </div>
              <div className="flex items-center">
                <span className="text-2xl font-black tracking-tight text-white">
                  Adventure
                </span>
                <span className="text-2xl font-black text-blue-400">
                  X
                </span>
              </div>
            </Link>
            
            <p className="text-sm text-slate-300 max-w-sm leading-relaxed">
              AdventureX is a cloud-native adventure tourism ecosystem connecting thrill-seekers with certified wilderness operators, epic trails, and unforgettable outdoor expeditions.
            </p>

            {/* Safety & Trust Badge */}
            <div className="pt-2 flex items-center gap-3 text-xs text-slate-300">
              <div className="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700/60 text-emerald-400">
                <ShieldCheck className="w-4 h-4" />
                <span className="font-semibold">100% Certified Guides</span>
              </div>
              <span className="text-slate-500">•</span>
              <span>ISO 9001 Safety Protocol</span>
            </div>

            {/* Social Icons */}
            <div className="pt-2 flex items-center gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-gradient-to-tr hover:from-amber-500 hover:to-rose-500 text-slate-300 hover:text-white flex items-center justify-center transition-all duration-200"
              >
                <FaInstagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-blue-600 text-slate-300 hover:text-white flex items-center justify-center transition-all duration-200"
              >
                <FaFacebookF className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-blue-700 text-slate-300 hover:text-white flex items-center justify-center transition-all duration-200"
              >
                <FaLinkedinIn className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-rose-600 text-slate-300 hover:text-white flex items-center justify-center transition-all duration-200"
              >
                <FaYoutube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 3: Company */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              Company
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/about" className="hover:text-blue-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <a href="#careers" onClick={(e) => { e.preventDefault(); alert('Careers portal coming in future module.'); }} className="hover:text-blue-400 transition-colors">
                  Careers
                </a>
              </li>
              <li>
                <a href="#blog" onClick={(e) => { e.preventDefault(); alert('Adventure Blog coming soon!'); }} className="hover:text-blue-400 transition-colors">
                  Blog & Stories
                </a>
              </li>
              <li>
                <Link to="/destinations" className="hover:text-blue-400 transition-colors">
                  All Destinations
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Support */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              Support
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/contact" className="hover:text-blue-400 transition-colors">
                  Contact Support
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-blue-400 transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <a href="#privacy" onClick={(e) => { e.preventDefault(); alert('Privacy Policy document.'); }} className="hover:text-blue-400 transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#terms" onClick={(e) => { e.preventDefault(); alert('Terms of Service document.'); }} className="hover:text-blue-400 transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          {/* Col 5: Direct Inquiries */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              Headquarters
            </h3>
            <ul className="space-y-3 text-sm text-slate-300">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>AdventureX Tower, Sector 44, Gurugram, India</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                <span>+91 (800) 456-7890</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span>expeditions@adventurex.com</span>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className="border-t border-slate-800/80 bg-slate-950/60 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} AdventureX Inc. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" /> for adventurers across the globe.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
