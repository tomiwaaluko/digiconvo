'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Mic, Square, BarChart3 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useChatStore } from '~/stores/chat';
import { ChatMessage } from './ChatMessage';
import { TypingIndicator } from './TypingIndicator';
import { WelcomeScreen } from '../welcome/WelcomeScreen';
import { SessionControls } from '../controls/SessionControls';

export function ChatInterface() {
  const [inputMessage, setInputMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const {
    messages,
    currentScenario,
    isTyping,
    addMessage,
    setIsTyping,
    toggleEmotionPanel,
    showEmotionPanel,
  } = useChatStore();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputMessage(e.target.value);
    
    // Auto-resize textarea
    const textarea = e.target;
    textarea.style.height = 'auto';
    textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    // Add user message
    addMessage({
      content: inputMessage,
      sender: 'user',
    });

    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response (replace with actual Gemini API call)
    setTimeout(() => {
      addMessage({
        content: generateMockResponse(inputMessage),
        sender: 'ai',
        emotion: {
          tone: 'Empathetic',
          intensity: Math.floor(Math.random() * 10) + 1,
          color: '#3B82F6'
        }
      });
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // TODO: Implement Whisper STT integration
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            {currentScenario ? (
              <div>
                <h1 className="text-xl font-semibold text-gray-900">
                  {currentScenario.title}
                </h1>
                <p className="text-sm text-gray-600">
                  Practicing with {currentScenario.persona.name} • {currentScenario.difficulty}
                </p>
              </div>
            ) : (
              <div>
                <h1 className="text-xl font-semibold text-gray-900">
                  DigiConvo
                </h1>
                <p className="text-sm text-gray-600">
                  Choose a scenario to start practicing conversations
                </p>
              </div>
            )}
          </div>
          
          <div className="flex items-center space-x-4">
            <SessionControls />
            
            <button
              onClick={toggleEmotionPanel}
              className={`p-2 rounded-lg transition-colors ${
                showEmotionPanel
                  ? 'bg-blue-100 text-blue-600'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <BarChart3 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto">
        {!currentScenario ? (
          <WelcomeScreen />
        ) : (
          <div className="p-6 space-y-4">
            {messages.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-8"
              >
                <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                  <h3 className="font-semibold text-blue-900 mb-2">
                    {currentScenario.title}
                  </h3>
                  <p className="text-blue-700 mb-4">
                    {currentScenario.description}
                  </p>
                  <div className="text-sm text-blue-600">
                    <p><strong>Persona:</strong> {currentScenario.persona.name}</p>
                    <p><strong>Personality:</strong> {currentScenario.persona.personality}</p>
                    <p><strong>Difficulty:</strong> {currentScenario.difficulty}</p>
                  </div>
                  <div className="mt-4 text-sm text-blue-600">
                    Start by introducing yourself or jumping right into the conversation.
                  </div>
                </div>
              </motion.div>
            )}
            
            <AnimatePresence>
              {messages.map((message, index) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChatMessage message={message} />
                </motion.div>
              ))}
            </AnimatePresence>
            
            {isTyping && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="bg-white border-t border-gray-200 p-6">
        <div className="flex items-end space-x-4">
          <div className="flex-1">
            <textarea
              value={inputMessage}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              placeholder={
                currentScenario
                  ? "Type your response..."
                  : "Select a scenario to start chatting..."
              }
              disabled={!currentScenario}
              className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
              rows={1}
              style={{ minHeight: '44px', maxHeight: '120px' }}
            />
          </div>
          
          <div className="flex space-x-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleRecording}
              className={`p-3 rounded-lg transition-colors ${
                isRecording
                  ? 'bg-red-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              disabled={!currentScenario}
            >
              {isRecording ? (
                <Square className="w-5 h-5" />
              ) : (
                <Mic className="w-5 h-5" />
              )}
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || !currentScenario || isTyping}
              className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              <Send className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Mock response generator (replace with actual Gemini API integration)
function generateMockResponse(userMessage: string): string {
  const responses = [
    "I understand this is difficult for you. Can you help me understand your perspective better?",
    "That's an interesting point. I hadn't considered it from that angle before.",
    "I can hear that you're frustrated. What would help make this conversation more productive?",
    "I appreciate you being direct with me. Let me think about what you've said.",
    "This is clearly important to you. Can we explore some solutions together?",
  ];
  
  const randomIndex = Math.floor(Math.random() * responses.length);
  return responses[randomIndex] ?? "I understand. Let me think about how to respond to that.";
}
