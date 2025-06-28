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

export function EmotionPanel() {
  const { showEmotionPanel, toggleEmotionPanel, currentEmotion } =
    useChatStore();

  // Use mock data for now
  // const displayEmotion = currentEmotion ?? mockEmotionData;

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
              className="bg-opacity-50 fixed inset-0 z-40 bg-black xl:hidden"
              onClick={toggleEmotionPanel}
            />

            <motion.div
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 300, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed top-0 right-0 z-50 flex h-full w-80 flex-col border-l border-gray-200 bg-white xl:relative"
            >
              {/* Header */}
              <div className="border-b border-gray-200 p-6">
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Brain className="h-5 w-5 text-blue-500" />
                    <h2 className="text-lg font-semibold text-gray-900">
                      Emotion Analysis
                    </h2>
                  </div>
                  <button
                    onClick={toggleEmotionPanel}
                    className="rounded-md p-1 hover:bg-gray-100"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>

                <p className="text-sm text-gray-600">
                  Real-time emotional tone analysis powered by Google Gemini
                </p>
              </div>

              {/* Current Emotion */}
              {currentEmotion ? (
                <div className="flex-1 overflow-y-auto">
                  {/* Current Emotion Section */}
                  <div className="border-b border-gray-200 p-6">
                    <div className="mb-4">
                      <div className="mb-2 flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700">
                          Current Tone
                        </span>
                        <div className="flex items-center space-x-1">
                          <Activity className="h-4 w-4 text-green-500" />
                          <span className="text-xs text-green-600">Live</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div
                          className="h-4 w-4 rounded-full"
                          style={{ backgroundColor: currentEmotion.color }}
                        />
                        <span className="text-lg font-semibold text-gray-900">
                          {currentEmotion.primaryEmotion}
                        </span>
                      </div>
                    </div>
                    {/* Intensity Meter */}
                    <div className="mb-4">
                      <div className="mb-2 flex items-center justify-between">
                        <span className="text-sm text-gray-600">Intensity</span>
                        <span className="text-sm font-medium text-gray-900">
                          {currentEmotion.intensity}/10
                        </span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-gray-200">
                        <motion.div
                          className="h-2 rounded-full"
                          style={{ backgroundColor: currentEmotion.color }}
                          initial={{ width: 0 }}
                          animate={{
                            width: `${currentEmotion.intensity * 10}%`,
                          }}
                          transition={{ duration: 0.5 }}
                        />
                      </div>
                    </div>
                    {/* Confidence */}
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Confidence</span>
                      <span className="font-medium text-gray-900">
                        {currentEmotion.confidence}%
                      </span>
                    </div>
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
          className="fixed top-4 right-4 z-10 rounded-lg border border-gray-200 bg-white p-2 shadow-sm transition-shadow hover:shadow-md"
        >
          <ChevronLeft className="h-4 w-4" />
        </motion.button>
      )}
    </>
  );
}
