'use client';

import { motion } from 'framer-motion';
import { Bot } from 'lucide-react';

export function TypingIndicator() {
  return (
    <div className="flex justify-start mb-4">
      <div className="flex items-end space-x-2">
        <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-300 flex items-center justify-center">
          <Bot className="w-4 h-4" />
        </div>
        
        <div className="bg-white border border-gray-200 dark:bg-gray-800 dark:border-gray-600 rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm">
          <div className="flex space-x-1">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
