import { create } from 'zustand';

export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  emotion?: {
    tone: string;
    intensity: number;
    color: string;
  };
}

export interface Scenario {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  persona: {
    name: string;
    personality: string;
    emotionalTendency: string;
  };
}

export interface EmotionAnalysis {
  primaryEmotion: string;
  intensity: number;
  confidence: number;
  suggestions: string[];
  color: string;
}

interface ChatState {
  // Chat state
  messages: Message[];
  currentScenario: Scenario | null;
  isTyping: boolean;
  sessionId: string | null;
  
  // Emotion analysis
  currentEmotion: EmotionAnalysis | null;
  emotionHistory: EmotionAnalysis[];
  
  // UI state
  sidebarOpen: boolean;
  showEmotionPanel: boolean;
  
  // Actions
  addMessage: (message: Omit<Message, 'id' | 'timestamp'>) => void;
  setCurrentScenario: (scenario: Scenario) => void;
  setIsTyping: (typing: boolean) => void;
  setCurrentEmotion: (emotion: EmotionAnalysis) => void;
  toggleSidebar: () => void;
  toggleEmotionPanel: () => void;
  clearChat: () => void;
  startNewSession: () => void;
}

export const useChatStore = create<ChatState>((set, _get) => ({
  // Initial state
  messages: [],
  currentScenario: null,
  isTyping: false,
  sessionId: null,
  currentEmotion: null,
  emotionHistory: [],
  sidebarOpen: true,
  showEmotionPanel: true,
  
  // Actions
  addMessage: (message) => {
    const newMessage: Message = {
      id: crypto.randomUUID(),
      timestamp: new Date(),
      ...message,
    };
    set((state) => ({
      messages: [...state.messages, newMessage],
    }));
  },
  
  setCurrentScenario: (scenario) => {
    set({ currentScenario: scenario });
  },
  
  setIsTyping: (typing) => {
    set({ isTyping: typing });
  },
  
  setCurrentEmotion: (emotion) => {
    set((state) => ({
      currentEmotion: emotion,
      emotionHistory: [...state.emotionHistory, emotion],
    }));
  },
  
  toggleSidebar: () => {
    set((state) => ({ sidebarOpen: !state.sidebarOpen }));
  },
  
  toggleEmotionPanel: () => {
    set((state) => ({ showEmotionPanel: !state.showEmotionPanel }));
  },
  
  clearChat: () => {
    set({
      messages: [],
      currentEmotion: null,
      emotionHistory: [],
    });
  },
  
  startNewSession: () => {
    set({
      sessionId: crypto.randomUUID(),
      messages: [],
      currentEmotion: null,
      emotionHistory: [],
    });
  },
}));
