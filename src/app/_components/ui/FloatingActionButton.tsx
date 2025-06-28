'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Mic, Square, Volume2, VolumeX } from 'lucide-react';
import { useState } from 'react';

export function FloatingActionButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const actions = [
    {
      icon: isRecording ? Square : Mic,
      label: isRecording ? 'Stop Recording' : 'Voice Input',
      color: isRecording ? 'bg-red-500' : 'bg-blue-500',
      onClick: () => setIsRecording(!isRecording),
    },
    {
      icon: isMuted ? VolumeX : Volume2,
      label: isMuted ? 'Unmute' : 'Mute',
      color: 'bg-purple-500',
      onClick: () => setIsMuted(!isMuted),
    },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-30">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute bottom-16 right-0 space-y-3"
          >
            {actions.map((action, index) => (
              <motion.button
                key={action.label}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: index * 0.1 }}
                onClick={action.onClick}
                className={`${action.color} text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all flex items-center space-x-2 group`}
              >
                <action.icon className="w-5 h-5" />
                <span className="hidden group-hover:block whitespace-nowrap text-sm pr-2">
                  {action.label}
                </span>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="bg-gradient-to-br from-blue-500 to-purple-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all"
      >
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <Plus className="w-6 h-6" />
        </motion.div>
      </motion.button>
    </div>
  );
}
