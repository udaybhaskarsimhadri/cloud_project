import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Share2, 
  Copy, 
  Check, 
  X, 
  MessageCircle, 
  Facebook, 
  Twitter, 
  Instagram,
  Sparkles
} from 'lucide-react';

const SocialShare = ({
  title = 'AdventureX Expedition',
  url = window.location.href,
  description = 'Check out this thrilling expedition on AdventureX!',
  isOpen = false,
  onClose = () => {},
  triggerButton = null
}) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const showModal = isOpen !== undefined ? isOpen : internalOpen;
  const handleClose = () => {
    if (onClose) onClose();
    setInternalOpen(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const shareOptions = [
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      color: 'bg-emerald-500 hover:bg-emerald-600',
      action: () => {
        window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(`${title} - ${description}\n${url}`)}`, '_blank');
      }
    },
    {
      name: 'X (Twitter)',
      icon: Twitter,
      color: 'bg-slate-900 hover:bg-black',
      action: () => {
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(`${title} on @AdventureX`)}&url=${encodeURIComponent(url)}`, '_blank');
      }
    },
    {
      name: 'Facebook',
      icon: Facebook,
      color: 'bg-blue-600 hover:bg-blue-700',
      action: () => {
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
      }
    },
    {
      name: 'Instagram',
      icon: Instagram,
      color: 'bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 hover:opacity-90',
      action: () => {
        handleCopy();
        alert('Expedition link copied! Paste it in your Instagram story or DM.');
      }
    }
  ];

  return (
    <>
      {triggerButton ? (
        <div onClick={() => setInternalOpen(true)}>{triggerButton}</div>
      ) : (
        <button
          type="button"
          onClick={() => setInternalOpen(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-blue-500 text-xs font-semibold shadow-xs transition-all"
        >
          <Share2 className="w-3.5 h-3.5" />
          <span>Share</span>
        </button>
      )}

      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="w-full max-w-sm rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-6 space-y-5 text-slate-800 dark:text-slate-100"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-black text-sm text-slate-900 dark:text-white">
                  <Share2 className="w-4 h-4 text-emerald-500" />
                  <span>Share with Adventurers</span>
                </div>
                <button
                  onClick={handleClose}
                  className="p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Title & Preview */}
              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs space-y-1">
                <p className="font-bold text-slate-900 dark:text-white line-clamp-1">{title}</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2">{description}</p>
              </div>

              {/* Social Channels Grid */}
              <div className="grid grid-cols-4 gap-3 text-center">
                {shareOptions.map((opt) => {
                  const Icon = opt.icon;
                  return (
                    <button
                      key={opt.name}
                      onClick={opt.action}
                      className="flex flex-col items-center gap-1.5 group cursor-pointer"
                    >
                      <div className={`w-12 h-12 rounded-2xl text-white flex items-center justify-center shadow-md transition-transform group-hover:scale-105 ${opt.color}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-bold text-slate-600 dark:text-slate-300">
                        {opt.name}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Copy URL Box */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Or Copy Direct Link
                </label>
                <div className="flex items-center gap-2 p-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80">
                  <input
                    type="text"
                    readOnly
                    value={url}
                    className="w-full bg-transparent px-2 text-xs text-slate-700 dark:text-slate-300 outline-none truncate font-mono"
                  />
                  <button
                    onClick={handleCopy}
                    className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs flex items-center gap-1 shrink-0 transition-colors"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SocialShare;
