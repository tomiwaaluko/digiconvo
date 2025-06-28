import { ChatInterface } from "~/app/_components/chat/ChatInterface";
import { ScenarioSidebar } from "~/app/_components/sidebar/ScenarioSidebar";
import { EmotionPanel } from "~/app/_components/emotion/EmotionPanel";
import { MobileNavigation } from "~/app/_components/navigation/MobileNavigation";
import { FloatingActionButton } from "~/app/_components/ui/FloatingActionButton";

export default function Home() {
  return (
    <div className="flex h-screen bg-gray-50 relative">
      <MobileNavigation />
      
      <div className="hidden lg:block">
        <ScenarioSidebar />
      </div>
      
      <div className="lg:hidden">
        <ScenarioSidebar />
      </div>
      
      <div className="flex-1 flex flex-col min-w-0">
        <ChatInterface />
      </div>
      
      <div className="hidden xl:block">
        <EmotionPanel />
      </div>
      
      <div className="xl:hidden">
        <EmotionPanel />
      </div>
      
      <FloatingActionButton />
    </div>
  );
}
