'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, 
  Briefcase, 
  Users, 
  Home, 
  ChevronLeft, 
  ChevronRight,
  Star,
  Clock,
  User
} from 'lucide-react';
import { useChatStore, type Scenario } from '~/stores/chat';

const mockScenarios: Scenario[] = [
  {
    id: '1',
    title: 'Relationship Breakup',
    description: 'Practice ending a romantic relationship with empathy and clarity',
    category: 'Personal',
    difficulty: 'hard',
    persona: {
      name: 'Alex',
      personality: 'Emotional and defensive',
      emotionalTendency: 'Becomes upset easily, seeks reassurance',
      gender: 'MALE',
      voiceName: 'Kore', 

    }
  },
  {
    id: '2',
    title: 'Performance Review',
    description: 'Give constructive feedback to an underperforming employee',
    category: 'Professional',
    difficulty: 'medium',
    persona: {
      name: 'Jordan',
      personality: 'Professional but sensitive',
      emotionalTendency: 'Takes criticism personally, needs encouragement',
      gender: 'MALE',
      voiceName: 'Gacrux',
    }
  },
  {
    id: '3',
    title: 'Friend Conflict',
    description: 'Address a betrayal or misunderstanding with a close friend',
    category: 'Social',
    difficulty: 'medium',
    persona: {
      name: 'Sam',
      personality: 'Stubborn but caring',
      emotionalTendency: 'Defensive initially, becomes understanding over time',
      gender: 'MALE',
      voiceName: 'Rasalgethi',
    }
  },
  {
    id: '4',
    title: 'Family Disagreement',
    description: 'Navigate a heated family discussion about important decisions',
    category: 'Family',
    difficulty: 'hard',
    persona: {
      name: 'Casey',
      personality: 'Traditional and protective',
      emotionalTendency: 'Values family harmony, fears change',
      gender: 'FEMALE',
      voiceName: 'Sadaltager',
    }
  },
  {
    id: '5',
    title: 'Team Conflict Resolution',
    description: 'Mediate between two team members who are not getting along',
    category: 'Professional',
    difficulty: 'medium',
    persona: {
      name: 'Taylor',
      personality: 'Analytical but frustrated',
      emotionalTendency: 'Wants logical solutions, struggles with interpersonal dynamics',
      gender: 'FEMALE',
      voiceName: 'Alnilam',
    }
  },
  {
    id: '6',
    title: 'Difficult Customer',
    description: 'Handle a frustrated customer with professionalism and empathy',
    category: 'Professional',
    difficulty: 'easy',
    persona: {
      name: 'Morgan',
      personality: 'Demanding but reasonable',
      emotionalTendency: 'Initially frustrated, responds well to acknowledgment',
      gender: 'FEMALE',
      voiceName: 'Iapetus',
    }
  },
  {
    id: '7',
  title: 'Participating in a KnightHacks Hackathon',
  description: 'You are paricipating in a high stressed hackathon that is extremely difficult but fun',
  category: 'Professional',
  difficulty: 'hard',
  persona: {
    name: 'Faris',
    personality: 'Strong willed and determined to win',
    emotionalTendency: 'Very determined and will do anything to win',
    gender: 'MALE',
    voiceName: 'Puck',
  }

  }
];

const categoryIcons = {
  Personal: Heart,
  Professional: Briefcase,
  Social: Users,
  Family: Home,
};

const difficultyColors = {
  easy: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  hard: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
};

export function ScenarioSidebar() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { sidebarOpen, toggleSidebar, currentScenario, setCurrentScenario, startNewSession } = useChatStore();

  const categories = Array.from(new Set(mockScenarios.map(s => s.category)));
  const filteredScenarios = selectedCategory 
    ? mockScenarios.filter(s => s.category === selectedCategory)
    : mockScenarios;

  const handleScenarioSelect = (scenario: Scenario) => {
    setCurrentScenario(scenario);
    startNewSession();
    // Close sidebar on mobile after selection
    if (window.innerWidth < 1024) {
      toggleSidebar();
    }
  };

  return (
    <>
      <AnimatePresence>
        {sidebarOpen && (
          <>
            {/* Mobile Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 bg-black/50 dark:bg-black/70 z-40"
              onClick={toggleSidebar}
            />
            
            <motion.div
              initial={{ x: -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="w-80 theme-surface theme-border-r flex flex-col lg:relative fixed left-0 top-0 h-full z-50 shadow-xl theme-shadow"
            >
            {/* Header */}
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Scenarios</h2>
                <button
                  onClick={toggleSidebar}
                  className="p-1 rounded-md theme-hover theme-text-secondary cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
              </div>
              
              {/* Category Filter */}
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`px-3 py-1 rounded-full text-sm transition-colors cursor-pointer ${
                    selectedCategory === null
                      ? 'theme-accent theme-text-accent'
                      : 'theme-secondary theme-text-secondary theme-hover'
                  }`}
                >
                  All
                </button>
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-3 py-1 rounded-full text-sm transition-colors cursor-pointer ${
                      selectedCategory === category
                        ? 'theme-accent theme-text-accent'
                        : 'theme-secondary theme-text-secondary theme-hover'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Scenarios List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {filteredScenarios.map((scenario) => {
                const IconComponent = categoryIcons[scenario.category as keyof typeof categoryIcons];
                const isSelected = currentScenario?.id === scenario.id;
                
                return (
                  <motion.button
                    key={scenario.id}
                    onClick={() => handleScenarioSelect(scenario)}
                    className={`w-full text-left p-4 rounded-lg border transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? 'theme-border-accent theme-surface-accent shadow-sm'
                        : 'theme-border theme-hover theme-surface'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <IconComponent className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${difficultyColors[scenario.difficulty]}`}>
                          {scenario.difficulty.charAt(0).toUpperCase() + scenario.difficulty.slice(1)}
                        </span>
                      </div>
                      {isSelected && (
                        <Star className="w-4 h-4 text-blue-500 dark:text-blue-400 fill-current" />
                      )}
                    </div>
                    
                    <h3 className="font-medium text-gray-900 dark:text-white mb-1">
                      {scenario.title}
                    </h3>
                    
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                      {scenario.description}
                    </p>
                    
                    <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
                      <div className="flex items-center space-x-1">
                        <User className="w-3 h-3" />
                        <span>{scenario.persona.name}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>15-20 min</span>
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Collapsed Sidebar Toggle */}
      {!sidebarOpen && (
        <motion.button
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          onClick={toggleSidebar}
          className="fixed left-4 top-4 z-10 p-2 theme-surface rounded-lg theme-border shadow-sm hover:shadow-md theme-shadow transition-shadow"
        >
          <ChevronRight className="w-4 h-4 theme-text-secondary" />
        </motion.button>
      )}
    </>
  );
}
