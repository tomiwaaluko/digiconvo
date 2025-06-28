"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Mic, Square, BarChart3 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useChatStore } from "~/stores/chat";
import { ChatMessage } from "~/app/_components/chat/ChatMessage";
import { TypingIndicator } from "~/app/_components/chat/TypingIndicator";
import { WelcomeScreen } from "../welcome/WelcomeScreen";
import { SessionControls } from "../controls/SessionControls";

import { api } from "~/trpc/react";

export function ChatInterface() {
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
        sender: 'ai',
      });
      setIsTyping(false);
    },
    onError: (error) => {
      console.error("AI reply failed:", error);
      addMessage({
        content: "Sorry, I encountered an error. Please try again.",
        sender: 'ai',
      });
      setIsTyping(false);
    },
  })

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
      messages: [...currentMessages, {sender: 'user', content: userMessageContent}],
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
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            {currentScenario ? (
              <div>
                <h1 className="text-xl font-semibold text-gray-900">
                  {currentScenario.title}
                </h1>
                <p className="text-sm text-gray-600">
                  Practicing with {currentScenario.persona.name} •{" "}
                  {currentScenario.difficulty}
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
              className={`rounded-lg p-2 transition-colors ${
                showEmotionPanel
                  ? "bg-blue-100 text-blue-600"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              <BarChart3 className="h-5 w-5" />
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
                <div className="rounded-xl border border-blue-200 bg-blue-50 p-6">
                  <h3 className="mb-2 font-semibold text-blue-900">
                    {currentScenario.title}
                  </h3>
                  <p className="mb-4 text-blue-700">
                    {currentScenario.description}
                  </p>
                  <div className="text-sm text-blue-600">
                    <p>
                      <strong>Persona:</strong> {currentScenario.persona.name}
                    </p>
                    <p>
                      <strong>Personality:</strong>{" "}
                      {currentScenario.persona.personality}
                    </p>
                    <p>
                      <strong>Difficulty:</strong> {currentScenario.difficulty}
                    </p>
                  </div>
                  <div className="mt-4 text-sm text-blue-600">
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
      <div className="border-t border-gray-200 bg-white p-6">
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
              className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none disabled:bg-gray-50 disabled:text-gray-500"
              rows={1}
              style={{ minHeight: "44px", maxHeight: "120px" }}
            />
          </div>

          <div className="flex space-x-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleRecording}
              className={`rounded-lg p-3 transition-colors ${
                isRecording
                  ? "bg-red-500 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
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
              className="rounded-lg bg-blue-500 p-3 text-white transition-colors hover:bg-blue-600 disabled:cursor-not-allowed disabled:bg-gray-300"
            >
              <Send className="h-5 w-5" />
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}
