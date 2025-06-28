'use client';

import { motion } from 'framer-motion';
import { RotateCcw, Save, Download, Settings } from 'lucide-react';
import { useChatStore } from '~/stores/chat';
import { useNotificationStore } from '../ui/NotificationContainer';

export function SessionControls() {
  const { currentScenario, messages, startNewSession } = useChatStore();
  const { addNotification } = useNotificationStore();

  const handleNewSession = () => {
    startNewSession();
    addNotification({
      type: 'success',
      title: 'New Session Started',
      message: 'Previous conversation cleared. Ready for a fresh start!',
    });
  };

  const handleSaveSession = () => {
    // TODO: Implement session saving to Supabase
    addNotification({
      type: 'info',
      title: 'Session Saved',
      message: 'Your conversation has been saved for later review.',
    });
  };

  const handleExportSession = () => {
    if (!currentScenario || messages.length === 0) {
      addNotification({
        type: 'error',
        title: 'Export Failed',
        message: 'There is no session data to export.',
      });
      return;
    }
    
    const sessionData = {
      scenario: currentScenario,
      messages: messages,
      timestamp: new Date().toISOString(),
    };
    
    const blob = new Blob([JSON.stringify(sessionData, null, 2)], {
      type: 'application/json',
    });
    
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `digiconvo-session-${new Date().getTime()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    
    addNotification({
      type: 'success',
      title: 'Session Exported',
      message: 'Your conversation data has been downloaded.',
    });
  };

  if (!currentScenario) return null;

  return (
    <div className="flex items-center space-x-2">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleNewSession}
        className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
        title="Start new session"
      >
        <RotateCcw className="w-4 h-4" />
      </motion.button>
      
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleSaveSession}
        className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
        title="Save session"
        disabled={messages.length === 0}
      >
        <Save className="w-4 h-4" />
      </motion.button>
      
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleExportSession}
        className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
        title="Export session"
        disabled={messages.length === 0}
      >
        <Download className="w-4 h-4" />
      </motion.button>
      
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
        title="Settings"
      >
        <Settings className="w-4 h-4" />
      </motion.button>
    </div>
  );
}
