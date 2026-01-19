import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

/**
 * Terminal Boot Sequence Component
 * 
 * A stylized terminal boot animation with CRT effects, scanlines, and vignette.
 * Displays a sequential boot sequence with typed-out system messages and animations.
 * 
 * Design Philosophy: Retro-futuristic terminal aesthetic with modern motion design
 * - CRT scanlines and grain effects for authenticity
 * - Color-coded message types (success, warning, error, system, hero)
 * - Smooth auto-scrolling terminal output
 * - Responsive design for mobile and desktop
 */

interface BootLine {
  id: string;
  text: string;
  delay?: number;
  style?: 'normal' | 'success' | 'warning' | 'error' | 'system' | 'hero';
}

const BOOT_SEQUENCE: BootLine[] = [
  { id: '1', text: 'RAJAI.SYS BIOS v2.0.26', style: 'system', delay: 100 },
  { id: '2', text: 'Copyright (C) 2026 Raj Shah Industries', style: 'system', delay: 50 },
  { id: '3', text: 'CPUs: 16 Cores Detected', delay: 150 },
  { id: '4', text: 'Memory Test: 64GB OK', style: 'success', delay: 100 },
  { id: '5', text: 'Initializing Neural Engine...', delay: 200 },
  { id: '6', text: '  > Loading logic modules... [OK]', style: 'success', delay: 50 },
  { id: '7', text: '  > Loading creative drive... [OK]', style: 'success', delay: 50 },
  { id: '8', text: '  > Calibrating UI/UX sensors... [OK]', style: 'success', delay: 50 },
  { id: '9', text: 'Mounting File Systems:', style: 'system', delay: 100 },
  { id: '10', text: '  /dev/projects    [MOUNTED]', style: 'warning', delay: 100 },
  { id: '11', text: '  /dev/skills      [MOUNTED]', style: 'warning', delay: 100 },
  { id: '12', text: '  /dev/experience  [MOUNTED]', style: 'warning', delay: 100 },
  { id: '13', text: 'Network Interface Initialized (IPv6)', delay: 250 },
  { id: '14', text: 'Establishing secure connection...', delay: 400 },
  { id: '15', text: 'Access Granted.', style: 'success', delay: 200 },
  { id: '16', text: 'Welcome to the system.', style: 'hero', delay: 800 },
];

const BootSequence: React.FC = () => {
  const [lines, setLines] = useState<BootLine[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new lines are added
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines]);

  // Boot sequence animation
  useEffect(() => {
    const runSequence = async () => {
      for (const line of BOOT_SEQUENCE) {
        const processingTime = line.delay || 100;
        await new Promise((resolve) => setTimeout(resolve, processingTime));
        setLines((prev) => [...prev, line]);
      }
      setIsComplete(true);
    };

    runSequence();
  }, []);

  const getLineStyles = (style?: string): string => {
    switch (style) {
      case 'success':
        return 'text-emerald-600 dark:text-emerald-400 font-medium';
      case 'warning':
        return 'text-orange-500 dark:text-orange-400 font-medium';
      case 'error':
        return 'text-red-600 dark:text-red-400 font-bold';
      case 'system':
        return 'text-muted-foreground font-bold pt-2 pb-1';
      case 'hero':
        return 'text-primary dark:text-orange-400 font-bold text-lg pt-4 pb-2 animate-pulse';
      default:
        return 'text-foreground/90';
    }
  };

  const formatTimestamp = (): string => {
    return new Date().toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-background flex items-center justify-center p-4 font-mono overflow-hidden">
      {/* CRT Scanlines & Grain Effect */}
      <div className="absolute inset-0 pointer-events-none z-20 opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-100 contrast-150 mix-blend-overlay" />
      <div
        className="absolute inset-0 pointer-events-none z-20 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.05)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03)]"
        style={{ backgroundSize: '100% 3px, 3px 100%' }}
      />

      {/* Vignette Effect */}
      <div className="absolute inset-0 pointer-events-none z-10 bg-[radial-gradient(circle_at_center,transparent_50%,rgba(0,0,0,0.1)_100%)]" />

      {/* Terminal Window */}
      <motion.div
        className="relative z-30 w-full max-w-2xl bg-card/90 backdrop-blur-sm border border-border shadow-2xl rounded-lg overflow-hidden flex flex-col h-[500px] md:h-[600px]"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Terminal Header */}
        <div className="bg-muted px-4 py-2 flex items-center justify-between border-b border-border select-none">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-destructive/60" />
            <div className="w-3 h-3 rounded-full bg-amber-400/60" />
            <div className="w-3 h-3 rounded-full bg-emerald-400/60" />
          </div>
          <div className="text-xs text-muted-foreground font-bold tracking-widest uppercase opacity-70">
            root@rajai-sys:~
          </div>
          <div className="w-12 text-right text-[10px] text-muted-foreground font-mono">
            BASH
          </div>
        </div>

        {/* Terminal Body */}
        <div
          ref={scrollRef}
          className="flex-1 p-6 overflow-y-auto font-mono text-sm md:text-base space-y-1.5 scrollbar-hide text-shadow"
        >
          {lines.map((line) => (
            <div key={line.id} className={getLineStyles(line.style)}>
              {!['system', 'hero'].includes(line.style || '') && (
                <span className="opacity-40 mr-2 text-xs select-none">[{formatTimestamp()}]</span>
              )}
              {line.text}
            </div>
          ))}

          {/* Active Cursor Line */}
          {isComplete ? (
            <div className="text-primary dark:text-orange-400 font-bold text-lg pt-4 pb-2">
              System ready for interaction.
            </div>
          ) : (
            <div className="flex items-center text-primary dark:text-orange-400 mt-2">
              <span className="mr-2 font-bold">{'>'}</span>
              <motion.div
                animate={{ opacity: [1, 0] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
                className="w-2.5 h-5 bg-primary dark:bg-orange-400"
              />
            </div>
          )}
        </div>

        {/* Status Footer */}
        <div className="px-4 py-1.5 bg-muted/50 border-t border-border flex justify-between items-center text-[10px] font-mono text-muted-foreground select-none">
          <span>MEM: 64GB OK</span>
          <span>CPU: 4%</span>
        </div>
      </motion.div>
    </div>
  );
};

export default BootSequence;
