'use client';

import { motion } from 'framer-motion';
import { Brain, Sparkles } from 'lucide-react';

interface LoadingIndicatorProps {
  message?: string;
}

export function LoadingIndicator({ message = "AI is thinking..." }: LoadingIndicatorProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="flex items-center justify-center p-8"
    >
      <div className="text-center">
        <div className="relative mb-4">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-12 h-12 border-4 border-blue-200 border-t-blue-500 rounded-full"
          />
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <Brain className="w-6 h-6 text-blue-500" />
          </motion.div>
        </div>
        
        <div className="flex items-center space-x-2 text-gray-600">
          <Sparkles className="w-4 h-4" />
          <span className="text-sm">{message}</span>
          <motion.div
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            <Sparkles className="w-4 h-4" />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
