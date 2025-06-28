"use client";

import React from "react";
import { ChatInterface } from "~/app/_components/chat/ChatInterface";
import { ScenarioSidebar } from "~/app/_components/sidebar/ScenarioSidebar";
import { EmotionPanel } from "~/app/_components/emotion/EmotionPanel";
import { MobileNavigation } from "~/app/_components/navigation/MobileNavigation";
import { FloatingActionButton } from "~/app/_components/ui/FloatingActionButton";
import { useChatStore } from "~/stores/chat";
import { WelcomeScreen } from "~/app/_components/welcome/WelcomeScreen";

export default function ChatApp() {
  const { 
    sidebarOpen, 
    showEmotionPanel, 
    messages, 
    currentScenario,
    toggleSidebar,
    toggleEmotionPanel 
  } = useChatStore();

  // Show welcome screen in the main chat area if no scenario is selected
  const showWelcomeInChat = !currentScenario;

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Scenario Sidebar */}
      <ScenarioSidebar />

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {showWelcomeInChat ? <WelcomeScreen /> : <ChatInterface />}
      </div>

      {/* Emotion Panel */}
      <EmotionPanel />

      {/* Mobile Navigation */}
      <div className="lg:hidden">
        <MobileNavigation />
      </div>

      {/* Floating Action Button for mobile */}
      <div className="lg:hidden">
        <FloatingActionButton />
      </div>
    </div>
  );
}
