"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Mic, Square, BarChart3, Home } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useChatStore } from "~/stores/chat";
import { ChatMessage } from "~/app/_components/chat/ChatMessage";
import { TypingIndicator } from "~/app/_components/chat/TypingIndicator";
import { WelcomeScreen } from "../welcome/WelcomeScreen";
import { SessionControls } from "../controls/SessionControls";
import { ThemeToggle } from "../theme/ThemeToggle";
import {
  themeClasses,
  cx,
  composeButton,
  composeInput,
} from "~/lib/theme-classes";

import { api } from "~/trpc/react";

export function ChatInterface() {
  // GitHub Copilot Prompt:
  // On this `/chat` page, I need help with layout alignment and spacing consistency.
  // 1. At the **bottom of the page**, the text input bar and its buttons (e.g., mic and send) should be **perfectly vertically centered** and aligned horizontally within the same row. Currently, they appear slightly misaligned or uneven.
  // 2. Ensure there is **consistent padding and margin** between the input field and its surrounding components (like the borders and button containers).
  // 3. At the **top of the page**, inside the navbar/header, the spacing between the buttons (e.g., theme toggle, profile, analysis toggle) is inconsistent. Please apply **uniform spacing** (like `gap-x-4` or equivalent) between them.
  // 4. Use Tailwind utility classes (e.g., `flex`, `items-center`, `gap-*`, `justify-between`, `p-*`, `mb-*`, `h-full`, etc.) to fix these issues where appropriate.
  // The goal is to create clean visual symmetry and even padding/margins between interactive components on both the top and bottom of the chat interface.
  
  // FIXES APPLIED:
  // ✅ Header: Changed from `flex items-center mx-4` to `flex items-center gap-4` for uniform button spacing
  // ✅ Input Area: Changed from `items-end space-x-4` to `items-center gap-3` for perfect vertical alignment
  // ✅ Input Area: Reduced padding from `p-6` to `p-4` for better proportion
  // ✅ Buttons: Added fixed height (`h-11 w-11`) and `flex items-center justify-center` for consistent sizing
  // ✅ Buttons: Changed from `space-x-2` to `gap-2` for modern gap-based spacing
  
  const [inputMessage, setInputMessage] = useState("");
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
    setCurrentEmotion,
    playAiAudio,
    clearCurrentScenario,
  } = useChatStore();

  const analyzeTone = api.gemini.toneAnalysis.useMutation({
    onSuccess: (data) => {
      // Type assertion to ensure data matches EmotionAnalysis interface
      const emotionData = data as {
        primaryEmotion: string;
        intensity: number;
        confidence: number;
        suggestions: string[];
        color: string;
      };
      setCurrentEmotion(emotionData);
    },
    onError: (error) => {
      console.error("Failed tone analysis:", error);
      // You could have a `setErrorMessage` action in your store here.
    },
  });

  const getReply = api.gemini.getAiScenarioReply.useMutation({
    onSuccess: (data) => {
      addMessage({
        content: data.reply,
        sender: "ai",
      });
      if (data.audioContent && data.mimeType) {
        playAiAudio(data.audioContent, data.mimeType);
      }
      setIsTyping(false);
    },
    onError: (error) => {
      console.error("AI reply failed:", error);
      addMessage({
        content: "Sorry, I encountered an error. Please try again.",
        sender: "ai",
      });
      setIsTyping(false);
    },
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputMessage(e.target.value);

    // Auto-resize textarea
    const textarea = e.target;
    textarea.style.height = "auto";
    textarea.style.height = Math.min(textarea.scrollHeight, 120) + "px";
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || !currentScenario) return;

    const userMessageContent = inputMessage;
    const currentMessages = useChatStore.getState().messages;

    // 1. Immediately add the user's message to the UI for a snappy feel.
    addMessage({
      content: userMessageContent,
      sender: "user",
    });

    // 2. Immediately clear the input field.
    setInputMessage("");

    // 3. In the background, send the user's message for tone analysis.
    //    This will update the EmotionPanel automatically when it's done.
    //    We don't need to `await` this if we want the UI to remain responsive.
    analyzeTone.mutate({ text: userMessageContent });
    // 4. Set the typing indicator for the AI's conversational reply.
    setIsTyping(true);

    getReply.mutate({
      messages: [
        ...currentMessages,
        { sender: "user", content: userMessageContent },
      ],
      scenario: currentScenario,
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      void handleSendMessage();
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // TODO: Implement Whisper STT integration
  };
  return (
    <div
      className={cx(
        themeClasses.layout.container,
        themeClasses.layout.fullHeight,
        themeClasses.background,
      )}
    >
      {/* Header */}
      <div
        className={cx(
          "border-b",
          themeClasses.backgroundSecondary,
          themeClasses.spacing.px6,
          themeClasses.spacing.py4,
        )}
      >
        <div className={themeClasses.layout.spaceBetween}>
          <div>
            {currentScenario ? (
              <div>
                <h1
                  className={cx(
                    themeClasses.typography.xl,
                    themeClasses.typography.semibold,
                    themeClasses.textPrimary,
                  )}
                >
                  {currentScenario.title}
                </h1>
                <p
                  className={cx(
                    themeClasses.typography.sm,
                    themeClasses.textSecondary,
                  )}
                >
                  Practicing with {currentScenario.persona.name} •{" "}
                  {currentScenario.difficulty.charAt(0).toUpperCase() + currentScenario.difficulty.slice(1)}
                </p>
              </div>
            ) : (
              <div>
                <h1
                  className={cx(
                    themeClasses.typography.xl,
                    themeClasses.typography.semibold,
                    themeClasses.textPrimary,
                  )}
                >
                  DigiConvo
                </h1>
                <p
                  className={cx(
                    themeClasses.typography.sm,
                    themeClasses.textSecondary,
                  )}
                >
                  Choose a scenario to start practicing conversations
                </p>
              </div>
            )}
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            {currentScenario && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={clearCurrentScenario}
                className={cx(
                  'rounded-lg px-3 py-2 transition-colors flex items-center gap-2',
                  themeClasses.buttonSecondary
                )}
                title="Return to Welcome Screen"
              >
                <Home className="h-4 w-4" />
                <span className="text-sm font-medium hidden sm:inline">Home</span>
              </motion.button>
            )}
            <SessionControls />
            <button
              onClick={toggleEmotionPanel}
              className={cx(
                'rounded-lg px-3 py-2 transition-colors flex items-center justify-center cursor-pointer',
                showEmotionPanel
                  ? "bg-blue-100 text-blue-600"
                  : themeClasses.buttonSecondary,
              )}
              title="Toggle Emotion Analysis Panel"
            >
              <BarChart3 className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto">
        {!currentScenario ? (
          <WelcomeScreen />
        ) : (
          <div className="space-y-4 p-6">
            {messages.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="py-8 text-center"
              >
                <div className="rounded-xl border border-blue-200 bg-blue-50 p-6 shadow-sm dark:border-blue-800 dark:bg-blue-900/20 dark:shadow-black/10">
                  <h3 className="mb-2 font-semibold text-blue-900 dark:text-blue-100">
                    {currentScenario.title}
                  </h3>
                  <p className="mb-4 text-blue-700 dark:text-blue-200">
                    {currentScenario.description}
                  </p>
                  <div className="text-sm text-blue-600 dark:text-blue-300">
                    <p>
                      <strong>Persona:</strong> {currentScenario.persona.name}
                    </p>
                    <p>
                      <strong>Personality:</strong>{" "}
                      {currentScenario.persona.personality
                        .split(' ')
                        .map(word => {
                          const lowerWord = word.toLowerCase();
                          return (lowerWord === 'and' || lowerWord === 'but') ? lowerWord : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
                        })
                        .join(' ')}
                    </p>
                    <p>
                      <strong>Difficulty:</strong> {currentScenario.difficulty.charAt(0).toUpperCase() + currentScenario.difficulty.slice(1)}
                    </p>
                  </div>
                  <div className="mt-4 text-sm text-blue-600 dark:text-blue-300">
                    Start by introducing yourself or jumping right into the
                    conversation.
                  </div>
                </div>
              </motion.div>
            )}

            <AnimatePresence>
              {messages.map((message, _index) => (
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
      <div className={cx('border-t', themeClasses.backgroundSecondary, 'p-4')}>
        <div className="flex items-center gap-3">
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
              className={cx(composeInput(), 'disabled:opacity-50 h-11 resize-none flex items-center')}
              rows={1}
              style={{ minHeight: "44px", maxHeight: "120px" }}
            />
          </div>

          <div className="flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleRecording}
              className={cx(
                'rounded-lg p-3 h-11 w-11 flex items-center justify-center transition-colors',
                isRecording
                  ? "bg-red-500 text-white"
                  : themeClasses.buttonSecondary,
              )}
              disabled={!currentScenario}
            >
              {isRecording ? (
                <Square className="h-5 w-5" />
              ) : (
                <Mic className="h-5 w-5" />
              )}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || !currentScenario || isTyping}
              className={cx(composeButton('primary'), 'disabled:cursor-not-allowed disabled:opacity-50 h-11 w-11 flex items-center justify-center')}
            >
              <Send className="h-5 w-5" />
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}
