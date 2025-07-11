'use client';

import { motion } from 'framer-motion';
import { Brain, MessageCircle, BarChart3, Mic, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function WelcomeScreen() {
  return (
    <div className="flex-1 flex items-center justify-center p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl text-center"
      >
        {/* Logo/Title */}
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Brain className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome to DigiConvo
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Practice difficult conversations with AI-powered emotional intelligence
          </p>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          <div className="p-6 theme-surface rounded-xl theme-border shadow-sm">
            <MessageCircle className="w-8 h-8 text-blue-500 mx-auto mb-3" />
            <h3 className="font-semibold theme-text mb-2">Realistic Conversations</h3>
            <p className="text-sm theme-text-muted">
              Engage with AI personas that respond emotionally and contextually to your communication style
            </p>
          </div>
          
          <div className="p-6 theme-surface rounded-xl theme-border shadow-sm">
            <BarChart3 className="w-8 h-8 text-green-500 mx-auto mb-3" />
            <h3 className="font-semibold theme-text mb-2">Emotion Analysis</h3>
            <p className="text-sm theme-text-muted">
              Get real-time feedback on emotional tone and suggestions for better communication
            </p>
          </div>
          
          <div className="p-6 theme-surface rounded-xl theme-border shadow-sm">
            <Mic className="w-8 h-8 text-purple-500 mx-auto mb-3" />
            <h3 className="font-semibold theme-text mb-2">Voice Integration</h3>
            <p className="text-sm theme-text-muted">
              Practice with voice input and output for more immersive conversation training
            </p>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-xl p-6 border border-blue-200 dark:border-gray-600"
        >
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
            Ready to get started?
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Choose a scenario from the sidebar to begin practicing your conversation skills.
          </p>
          
          {/* Image Analysis CTA Button */}
          <div className="mb-6">
            <Link href="/upload">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 px-6 py-3 font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer"
                style={{
                  backgroundColor: 'rgb(239 246 255)', // blue-50
                  color: 'rgb(37 99 235)', // blue-600
                }}
              >
                <span>Also Try New Image Analysis!</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </Link>
          </div>
          
          <div className="flex items-center justify-center space-x-2 text-sm text-blue-600 dark:text-blue-400">
            <span>Powered by</span>
            <div className="font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Google Gemini
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}