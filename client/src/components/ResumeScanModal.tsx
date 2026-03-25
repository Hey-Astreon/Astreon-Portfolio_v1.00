import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Download, X, Search, ShieldCheck } from 'lucide-react';

export function ResumeScanModal({ isOpen, onClose, onDownload }: { isOpen: boolean; onClose: () => void; onDownload: () => void }) {
  const [scanProgress, setScanProgress] = useState(0);
  const [isScanned, setIsScanned] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setScanProgress(0);
      setIsScanned(false);
      const interval = setInterval(() => {
        setScanProgress(p => {
          if (p >= 100) {
            clearInterval(interval);
            setTimeout(() => setIsScanned(true), 500);
            return 100;
          }
          return p + 2;
        });
      }, 30);
      return () => clearInterval(interval);
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />
          
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-lg bg-[#0d0a14] border border-[#e91e8c]/30 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(233,30,140,0.2)]"
          >
            {/* Header */}
            <div className="p-4 border-b border-[#e91e8c]/20 flex justify-between items-center bg-[#e91e8c]/5">
              <div className="flex items-center gap-3">
                <FileText className="text-[#e91e8c]" size={20} />
                <h3 className="font-orbitron font-bold text-sm tracking-widest">NEURAL_CV_REPLICATION</h3>
              </div>
              <button onClick={onClose} className="text-[#ff6eb4] hover:scale-110 transition-transform">
                <X size={20} />
              </button>
            </div>

            {/* Content Area */}
            <div className="p-8 relative">
              <div className="aspect-[3/4] bg-black/40 border border-[#00f5ff]/20 rounded-lg relative overflow-hidden flex flex-col items-center justify-center p-6 text-center">
                
                {/* Visual Representation of Resume */}
                <div className="w-full h-full opacity-30 pointer-events-none select-none">
                  <div className="h-4 w-1/2 bg-[#00f5ff] mb-4" />
                  <div className="h-2 w-full bg-[#fdf0ff]/20 mb-2" />
                  <div className="h-2 w-full bg-[#fdf0ff]/20 mb-2" />
                  <div className="h-2 w-3/4 bg-[#fdf0ff]/20 mb-8" />
                  <div className="h-4 w-1/3 bg-[#e91e8c] mb-4" />
                  <div className="h-2 w-full bg-[#fdf0ff]/20 mb-2" />
                  <div className="h-2 w-5/6 bg-[#fdf0ff]/20 mb-2" />
                </div>

                <div className="absolute inset-0 flex flex-col items-center justify-center">
                   {!isScanned ? (
                     <div className="flex flex-col items-center gap-4">
                       <Search size={40} className="text-[#00f5ff] animate-pulse" />
                       <div className="w-48 h-1 bg-[#00f5ff]/20 rounded-full overflow-hidden">
                         <motion.div 
                           style={{ width: `${scanProgress}%` }}
                           className="h-full bg-[#00f5ff]"
                         />
                       </div>
                       <p className="font-mono text-[10px] text-[#00f5ff] tracking-widest mt-2 uppercase">Integrity Scan: {scanProgress}%</p>
                     </div>
                   ) : (
                     <motion.div 
                       initial={{ opacity: 0, scale: 0.8 }}
                       animate={{ opacity: 1, scale: 1 }}
                       className="flex flex-col items-center gap-4"
                     >
                        <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center border border-green-500/30 shadow-[0_0_20px_rgba(34,197,94,0.2)]">
                          <ShieldCheck className="text-green-500" size={32} />
                        </div>
                        <h4 className="font-orbitron font-bold text-lg">SCAN COMPLETE</h4>
                        <p className="font-mono text-[10px] text-[#fdf0ff]/50 px-8">Neural data verified for high-end full-stack integration protocols.</p>
                        
                        <button 
                          onClick={onDownload}
                          className="mt-6 flex items-center gap-2 bg-[#e91e8c] hover:bg-[#ff6eb4] text-white px-8 py-3 rounded-md font-bold text-xs uppercase tracking-widest shadow-[0_0_15px_rgba(233,30,140,0.5)] transition-all transform hover:-translate-y-1"
                        >
                          <Download size={16} />
                          Extract CV
                        </button>
                     </motion.div>
                   )}
                </div>

                {/* Scan Line */}
                {!isScanned && (
                  <motion.div 
                    animate={{ top: ['0%', '100%'] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                    className="absolute left-0 right-0 h-[2px] bg-[#00f5ff] shadow-[0_0_10px_#00f5ff] z-20"
                  />
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 bg-black/40 border-t border-[#e91e8c]/10 text-center">
              <span className="text-[9px] font-mono text-[#fdf0ff]/30 tracking-tighter uppercase">Ayushi Raj // AR_ARCHITECT_REPLICATION_V3.0</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
