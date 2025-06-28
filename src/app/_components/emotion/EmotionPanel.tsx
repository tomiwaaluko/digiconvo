'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { 
  TrendingUp, 
  Brain, 
  AlertCircle, 
  ChevronRight,
  ChevronLeft,
  Activity
} from 'lucide-react';
import { useChatStore } from '~/stores/chat';

// Mock emotion data - replace with real Gemini analysis
const mockEmotionData = {
  primaryEmotion: 'Empathetic',
  intensity: 7,
  confidence: 85,
  suggestions: [
    'Consider acknowledging their feelings first',
    'Use "I" statements to avoid defensiveness',
    'Ask open-ended questions to understand better'
  ],
  color: '#3B82F6'
};

const emotionColors = {
  'Happy': '#10B981',
  'Sad': '#6B7280',
  'Angry': '#EF4444',
  'Anxious': '#F59E0B',
  'Empathetic': '#3B82F6',
  'Frustrated': '#DC2626',
  'Calm': '#059669',
  'Excited': '#8B5CF6',
};

export function EmotionPanel() {
  const { showEmotionPanel, toggleEmotionPanel, currentEmotion } = useChatStore();

  // Use mock data for now
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
              className="xl:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={toggleEmotionPanel}
            />
            
            <motion.div
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 300, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="w-80 bg-white border-l border-gray-200 flex flex-col xl:relative fixed right-0 top-0 h-full z-50"
            >
            {/* Header */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Brain className="w-5 h-5 text-blue-500" />
                  <h2 className="text-lg font-semibold text-gray-900">Emotion Analysis</h2>
                </div>
                <button
                  onClick={toggleEmotionPanel}
                  className="p-1 rounded-md hover:bg-gray-100"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              
              <p className="text-sm text-gray-600">
                Real-time emotional tone analysis powered by Google Gemini
              </p>
            </div>

            {/* Current Emotion */}
            <div className="p-6 border-b border-gray-200">
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Current Tone</span>
                  <div className="flex items-center space-x-1">
                    <Activity className="w-4 h-4 text-green-500" />
                    <span className="text-xs text-green-600">Live</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: displayEmotion.color }}
                  />
                  <span className="text-lg font-semibold text-gray-900">
                    {displayEmotion.primaryEmotion}
                  </span>
                </div>
              </div>

              {/* Intensity Meter */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Intensity</span>
                  <span className="text-sm font-medium text-gray-900">
                    {displayEmotion.intensity}/10
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
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
                <span className="text-gray-600">Confidence</span>
                <span className="font-medium text-gray-900">{displayEmotion.confidence}%</span>
              </div>
            </div>

            {/* Suggestions */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center space-x-2 mb-3">
                <AlertCircle className="w-4 h-4 text-amber-500" />
                <h3 className="font-medium text-gray-900">Suggestions</h3>
              </div>
              
              <div className="space-y-2">
                {displayEmotion.suggestions.map((suggestion, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-3 bg-amber-50 rounded-lg border border-amber-200"
                  >
                    <p className="text-sm text-amber-800">{suggestion}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Emotion History */}
            <div className="flex-1 p-6">
              <div className="flex items-center space-x-2 mb-4">
                <TrendingUp className="w-4 h-4 text-gray-500" />
                <h3 className="font-medium text-gray-900">Emotion Timeline</h3>
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
                        <span className="text-sm font-medium text-gray-900">{item.emotion}</span>
                        <p className="text-xs text-gray-500">{item.time}</p>
                      </div>
                    </div>
                    <div className="text-xs text-gray-500">{item.intensity}/10</div>
                  </div>
                ))}
              </div>
            </div>
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
          className="fixed right-4 top-4 z-10 p-2 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
        >
          <ChevronLeft className="w-4 h-4" />
        </motion.button>
      )}
    </>
  );
}
