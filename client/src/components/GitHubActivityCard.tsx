import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Database, Activity, RefreshCw } from 'lucide-react';

export function GitHubActivityCard() {
  const [logs, setLogs] = useState<string[]>([]);
  const [syncPhase, setSyncPhase] = useState(0);

  const mockLogs = [
    '> GITHUB_PROTOCOL_INITIALIZED',
    '> AUTHENTICATING_NEURAL_LINK...',
    '> CONNECTED: Hey-Astreon',
    '> FETCHING_REPO: Dynamic-Quiz-Management-System',
    '> ANALYZING_COMMIT_HISTORIES...',
    '> FETCHING_REPO: AI-CRM-HCP-Interaction-Logging-Module',
    '> SYNCING_NEURAL_NODES: 100%',
    '> SYSTEM_INTEGRITY_VERIFIED'
  ];

  useEffect(() => {
    let currentIdx = 0;
    const interval = setInterval(() => {
      if (currentIdx < mockLogs.length) {
        setLogs(prev => [...prev, mockLogs[currentIdx]]);
        currentIdx++;
      } else {
        setSyncPhase(p => (p + 1) % 4);
        setLogs([mockLogs[0], mockLogs[2], mockLogs[6], mockLogs[7]]);
        currentIdx = 3; // Keep last few logs
      }
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="card-premium p-6 overflow-hidden relative group">
      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
        <Activity size={80} className="text-[#00f5ff]" />
      </div>

      <div className="flex items-center gap-3 mb-6 border-b border-[rgba(233,30,140,0.2)] pb-4">
        <Terminal className="text-[#ff6eb4]" size={20} />
        <h3 className="font-orbitron font-bold text-lg text-[#fdf0ff]">GITHUB PROTOCOL</h3>
        <div className="ml-auto flex items-center gap-2">
          <RefreshCw size={12} className="text-[#00f5ff] animate-spin-slow" />
          <span className="text-[10px] text-[#00f5ff] font-mono tracking-tighter">LIVE_SYNC</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-black/40 border border-[#e91e8c]/20 p-3 rounded">
          <p className="text-[10px] text-[#ff6eb4] font-mono mb-1">DATA_NODES</p>
          <p className="text-xl font-bold font-orbitron">12+</p>
        </div>
        <div className="bg-black/40 border border-[#00f5ff]/20 p-3 rounded">
          <p className="text-[10px] text-[#00f5ff] font-mono mb-1">COMMIT_FREQ</p>
          <p className="text-xl font-bold font-orbitron">0.98</p>
        </div>
      </div>

      {/* Pseudo-Terminal Logs */}
      <div className="bg-black/60 rounded p-4 font-mono text-[11px] h-32 overflow-hidden border border-[rgba(155,89,182,0.1)]">
        {logs.filter(Boolean).map((log, i) => (
          <motion.div 
            key={`${log}-${i}`}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className={`mb-1 ${(log && typeof log === 'string' && log.includes('VERIFIED')) ? 'text-green-400' : 'text-[#fdf0ff]/60'}`}
          >
            {log}
          </motion.div>
        ))}
        <motion.span animate={{ opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 0.8 }} className="inline-block w-2 h-3 bg-[#ff6eb4] align-middle ml-1" />
      </div>

      <div className="mt-6 flex justify-between items-center text-[10px] font-mono text-[#fdf0ff]/40">
        <div className="flex items-center gap-2">
          <Database size={10} />
          <span>STABLE_REPLICATION</span>
        </div>
        <a 
          href="https://github.com/Hey-Astreon" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-[#ff6eb4] hover:underline hover:text-[#ff6eb4]/80 transition-all font-bold"
        >
          VIEW_GRID_PROFILE
        </a>
      </div>
    </div>
  );
}
