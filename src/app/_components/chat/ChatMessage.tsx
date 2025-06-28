'use client';

import { motion } from 'framer-motion';
import { Bot, User } from 'lucide-react';
import type { Message } from '~/stores/chat';

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.sender === 'user';

  return (
    <motion.div
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className={`flex max-w-[70%] ${isUser ? 'flex-row-reverse' : 'flex-row'} items-end space-x-2`}>
        {/* Avatar */}
        <div className={`flex-shrink-0 ${isUser ? 'ml-2' : 'mr-2'}`}>
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              isUser
                ? 'bg-blue-500 text-white dark:bg-blue-600'
                : 'bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-300'
            }`}
          >
            {isUser ? (
              <User className="w-4 h-4" />
            ) : (
              <Bot className="w-4 h-4" />
            )}
          </div>
        </div>

        {/* Message Bubble */}
        <div
          className={`px-4 py-3 rounded-2xl shadow-sm ${
            isUser
              ? 'bg-blue-500 text-white rounded-br-sm dark:bg-blue-600'
              : 'bg-white text-gray-900 rounded-bl-sm border border-gray-200 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600'
          }`}
        >
          <p className="text-sm leading-relaxed whitespace-pre-wrap">
            {message.content}
          </p>
          
          {/* Emotion indicator */}
          {message.emotion && (
            <div className="mt-2 flex items-center space-x-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: message.emotion.color }}
              />
              <span className={`text-xs ${isUser ? 'text-blue-100' : 'text-gray-500'}`}>
                {message.emotion.tone} ({message.emotion.intensity}/10)
              </span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
