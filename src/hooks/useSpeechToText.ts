// src/hooks/useSpeechToText.ts
'use client';

import { useState, useEffect, useRef } from 'react';

interface SpeechToTextHook {
  isListening: boolean;
  transcript: string;
  startListening: () => void;
  stopListening: () => void;
}

const hasSpeechRecognition =
  typeof window !== 'undefined' &&
  ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window);

export function useSpeechToText(): SpeechToTextHook {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    if (!hasSpeechRecognition) {
      console.warn('Speech Recognition is not supported in this browser.');
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognitionRef.current = new SpeechRecognition();
    const recognition = recognitionRef.current;

    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let finalTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        
        // --- THIS IS THE FIX ---
        // 1. Store the current result in a variable for safety and readability.
        const result = event.results[i];

        // 2. Check if the result and its first alternative (result[0]) exist before using them.
        if (result && result[0] && result.isFinal) {
          finalTranscript += result[0].transcript;
        }
      }
      setTranscript(prev => prev + finalTranscript);
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      console.error('Speech recognition error', event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };
    
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      setTranscript('');
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch(error) {
        console.error("Error starting speech recognition:", error);
      }
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      try {
        recognitionRef.current.stop();
        setIsListening(false);
      } catch(error) {
        console.error("Error stopping speech recognition:", error);
      }
    }
  };

  return { isListening, transcript, startListening, stopListening };
}