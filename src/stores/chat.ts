import { create } from "zustand";
import { audioPlayer } from "~/lib/audioPlayerService";

export interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
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
  difficulty: "easy" | "medium" | "hard";
  persona: {
    name: string;
    personality: string;
    emotionalTendency: string;
    gender: 'MALE' | 'FEMALE' | 'NEUTRAL';
    voiceName: string;
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
  isSpeechEnabled: boolean;
  isSpeaking: boolean;
  

  // Emotion analysis
  currentEmotion: EmotionAnalysis | null;
  emotionHistory: EmotionAnalysis[];

  // UI state
  sidebarOpen: boolean;
  showEmotionPanel: boolean;

  // Actions
  addMessage: (message: Omit<Message, "id" | "timestamp">) => void;
  setCurrentScenario: (scenario: Scenario) => void;
  setIsTyping: (typing: boolean) => void;
  setCurrentEmotion: (emotion: EmotionAnalysis) => void;
  toggleSidebar: () => void;
  toggleEmotionPanel: () => void;
  clearChat: () => void;
  startNewSession: () => void;
  playAiAudio: (audioData: string, mimeType: string) => void; 
  stopSpeaking: () => void;
  toggleSpeech: () => void;
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
  isSpeechEnabled: true,
  isSpeaking: false,

  // Actions
  toggleSpeech: () => {
    // We use get() here to check the current state before updating it
    if (_get().isSpeechEnabled) {
      _get().stopSpeaking(); // Stop any current speech if turning off
    }
    set((state) => ({ isSpeechEnabled: !state.isSpeechEnabled }));
  },
  playAiAudio: (audioData: string, mimeType: string) => {
  // First, check if the user has speech enabled
  if (_get().isSpeechEnabled) {
    // Let the rest of the app know that the AI has started speaking
    set({ isSpeaking: true });

    // Now, call the play method with ALL THREE required arguments
    audioPlayer.play(
      audioData,      // Argument 1: The base64 audio string
      mimeType,       // Argument 2: The audio format (e.g., 'audio/L16;rate=24000')
      () => {         // Argument 3: The "onEnd" callback function
        // This function will be executed automatically when the audio finishes
        console.log("Audio finished, setting isSpeaking to false.");
        set({ isSpeaking: false });
      }
    );
  }
},
  stopSpeaking: () => {
    audioPlayer.stop();
    set({ isSpeaking: false });
  },
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
