'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useChatStore } from '~/stores/chat';
import { themeClasses, cx } from '~/lib/theme-classes';

export function MobileNavigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { sidebarOpen, toggleSidebar, showEmotionPanel, toggleEmotionPanel } = useChatStore();

  // Close mobile menu when screen size changes
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="lg:hidden">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className={cx(
          'fixed top-4 right-4 z-50 p-2 rounded-lg border shadow-lg cursor-pointer',
          themeClasses.card,
          themeClasses.layout.transition
        )}
      >
        {isMobileMenuOpen ? (
          <X className={cx('w-5 h-5', themeClasses.textSecondary)} />
        ) : (
          <Menu className={cx('w-5 h-5', themeClasses.textSecondary)} />
        )}
      </button>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 dark:bg-black/70 z-40"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className={cx(
                'fixed top-0 right-0 h-full w-80 border-l shadow-2xl z-50 p-6',
                themeClasses.background,
                themeClasses.layout.transition
              )}
            >
              <div className="mt-12 space-y-4">
                <button
                  onClick={() => {
                    toggleSidebar();
                    setIsMobileMenuOpen(false);
                  }}
                  className={cx(
                    'w-full text-left p-3 rounded-lg transition-colors cursor-pointer',
                    themeClasses.buttonSecondary,
                    themeClasses.textPrimary
                  )}
                >
                  {sidebarOpen ? 'Hide Scenarios' : 'Show Scenarios'}
                </button>
                
                <button
                  onClick={() => {
                    toggleEmotionPanel();
                    setIsMobileMenuOpen(false);
                  }}
                  className={cx(
                    'w-full text-left p-3 rounded-lg transition-colors cursor-pointer',
                    themeClasses.buttonSecondary,
                    themeClasses.textPrimary
                  )}
                >
                  {showEmotionPanel ? 'Hide Emotion Panel' : 'Show Emotion Panel'}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
