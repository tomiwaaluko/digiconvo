"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  TrendingUp,
  Brain,
  AlertCircle,
  ChevronRight,
  ChevronLeft,
  Activity,
} from "lucide-react";
import { useChatStore } from "~/stores/chat";
import { themeClasses, cx } from "~/lib/theme-classes";

// Mock emotion data - replace with real Gemini analysis

const emotionColors = {
  Happy: "#10B981",
  Sad: "#6B7280",
  Angry: "#EF4444",
  Anxious: "#F59E0B",
  Empathetic: "#3B82F6",
  Frustrated: "#DC2626",
  Calm: "#059669",
  Excited: "#8B5CF6",
};

// Mock emotion data for when no real analysis is available
const mockEmotionData = {
  primaryEmotion: "Neutral",
  intensity: 5,
  confidence: 75,
  color: "#6B7280",
  suggestions: [
    "Consider asking open-ended questions to encourage discussion",
    "Try to express your thoughts more clearly"
  ]
};

export function EmotionPanel() {
  const { showEmotionPanel, toggleEmotionPanel, currentEmotion } =
    useChatStore();

  // Use mock data when no current emotion is available
  const displayEmotion = currentEmotion ?? mockEmotionData;

  return (
    <>
      <AnimatePresence>
        {showEmotionPanel && (
          <>
            {/* Mobile Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="xl:hidden fixed inset-0 bg-black/50 dark:bg-black/70 z-40"
              onClick={toggleEmotionPanel}
            />

            <motion.div
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 300, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className={cx(
                'w-80 border-l flex flex-col xl:relative fixed right-0 top-0 h-full z-50 shadow-xl',
                themeClasses.background,
                themeClasses.layout.transition
              )}
            >
            {/* Header */}
            <div className={cx('p-6 border-b', themeClasses.backgroundSecondary)}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Brain className="w-5 h-5 text-blue-500 dark:text-blue-400" />
                  <h2 className={cx('text-lg font-semibold', themeClasses.textPrimary)}>Emotion Analysis</h2>
                </div>
                <button
                  onClick={toggleEmotionPanel}
                  className={cx('p-1 rounded-md transition-colors', themeClasses.buttonSecondary)}
                >
                  <ChevronRight className={cx('w-4 h-4', themeClasses.textSecondary)} />
                </button>
              </div>
              
              <p className={cx('text-sm', themeClasses.textSecondary)}>
                Real-time emotional tone analysis powered by Google Gemini
              </p>
            </div>

            {/* Current Emotion */}
            <div className="p-6 border-b theme-border">
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium theme-text-secondary">Current Tone</span>
                  <div className="flex items-center space-x-1">
                    <Activity className="w-4 h-4 text-green-500" />
                    <span className="text-xs text-green-600 dark:text-green-400">Live</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: displayEmotion.color }}
                  />
                  <span className="text-lg font-semibold theme-text">
                    {displayEmotion.primaryEmotion}
                  </span>
                </div>
              </div>

              {/* Intensity Meter */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm theme-text-muted">Intensity</span>
                  <span className="text-sm font-medium theme-text">
                    {displayEmotion.intensity}/10
                  </span>
                </div>
                <div className="w-full theme-secondary rounded-full h-2">
                  <motion.div
                    className="h-2 rounded-full"
                    style={{ backgroundColor: displayEmotion.color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${displayEmotion.intensity * 10}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>

              {/* Confidence */}
              <div className="flex items-center justify-between text-sm">
                <span className="theme-text-muted">Confidence</span>
                <span className="font-medium theme-text">{displayEmotion.confidence}%</span>
              </div>
            </div>

            {/* Suggestions */}
            <div className="p-6 border-b theme-border">
              <div className="flex items-center space-x-2 mb-3">
                <AlertCircle className="w-4 h-4 text-amber-500" />
                <h3 className="font-medium theme-text">Suggestions</h3>
              </div>
              
              <div className="space-y-2">
                {displayEmotion.suggestions.map((suggestion, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800"
                  >
                    <p className="text-sm text-amber-800 dark:text-amber-200">{suggestion}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Emotion History */}
            <div className="flex-1 p-6">
              <div className="flex items-center space-x-2 mb-4">
                <TrendingUp className="w-4 h-4 theme-text-muted" />
                <h3 className="font-medium theme-text">Emotion Timeline</h3>
              </div>

              <div className="space-y-3">
                {/* Mock historical data */}
                {[
                  { emotion: 'Neutral', time: '2 min ago', intensity: 5 },
                  { emotion: 'Curious', time: '5 min ago', intensity: 6 },
                  { emotion: 'Empathetic', time: '8 min ago', intensity: 7 },
                  { emotion: 'Concerned', time: '12 min ago', intensity: 8 },
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between py-2">
                    <div className="flex items-center space-x-3">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ 
                          backgroundColor: emotionColors[item.emotion as keyof typeof emotionColors] || '#6B7280' 
                        }}
                      />
                      <div>
                        <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{item.emotion}</span>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{item.time}</p>
                      </div>
                    </div>
                    <div className="text-xs theme-text-muted">{item.intensity}/10</div>
                  </div>
                  {/* Suggestions Section */}
                  <div className="border-b border-gray-200 p-6">
                    <div className="mb-3 flex items-center space-x-2">
                      <AlertCircle className="h-4 w-4 text-amber-500" />
                      <h3 className="font-medium text-gray-900">Suggestions</h3>
                    </div>
                    <div className="space-y-2">
                      {currentEmotion.suggestions.map((suggestion, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="rounded-lg border border-amber-200 bg-amber-50 p-3"
                        >
                          <p className="text-sm text-amber-800">{suggestion}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-1 flex-col items-center justify-center p-6 text-center text-gray-500">
                  <Brain className="mx-auto mb-4 h-12 w-12 text-gray-300" />
                  <h3 className="mb-2 font-semibold text-gray-700">
                    Awaiting Analysis
                  </h3>
                  <p className="text-sm">
                    Your message&apos;s emotional tone will appear here once you
                    send it.
                  </p>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Collapsed Panel Toggle */}
      {!showEmotionPanel && (
        <motion.button
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          onClick={toggleEmotionPanel}
          className="fixed right-4 top-4 z-10 p-2 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md dark:shadow-gray-900/50 transition-shadow"
        >
          <ChevronLeft className="w-4 h-4 text-gray-600 dark:text-gray-300" />
        </motion.button>
      )}
    </>
  );
}
