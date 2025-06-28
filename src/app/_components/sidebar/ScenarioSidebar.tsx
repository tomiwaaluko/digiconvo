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
      emotionalTendency: 'Becomes upset easily, seeks reassurance'
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
      emotionalTendency: 'Takes criticism personally, needs encouragement'
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
      emotionalTendency: 'Defensive initially, becomes understanding over time'
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
      emotionalTendency: 'Values family harmony, fears change'
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
      emotionalTendency: 'Wants logical solutions, struggles with interpersonal dynamics'
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
      emotionalTendency: 'Initially frustrated, responds well to acknowledgment'
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
              className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={toggleSidebar}
            />
            
            <motion.div
              initial={{ x: -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="w-80 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 flex flex-col lg:relative fixed left-0 top-0 h-full z-50"
            >
            {/* Header */}
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Scenarios</h2>
                <button
                  onClick={toggleSidebar}
                  className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
              </div>
              
              {/* Category Filter */}
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`px-3 py-1 rounded-full text-sm transition-colors ${
                    selectedCategory === null
                      ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                  }`}
                >
                  All
                </button>
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-3 py-1 rounded-full text-sm transition-colors ${
                      selectedCategory === category
                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
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
                    className={`w-full text-left p-4 rounded-lg border transition-all ${
                      isSelected
                        ? 'border-blue-500 bg-blue-50 shadow-sm dark:border-blue-400 dark:bg-blue-900/30'
                        : 'border-gray-200 hover:border-gray-300 hover:shadow-sm dark:border-gray-600 dark:hover:border-gray-500 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-750'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <IconComponent className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${difficultyColors[scenario.difficulty]}`}>
                          {scenario.difficulty}
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
          className="fixed left-4 top-4 z-10 p-2 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md dark:shadow-gray-900/50 transition-shadow"
        >
          <ChevronRight className="w-4 h-4 text-gray-600 dark:text-gray-300" />
        </motion.button>
      )}
    </>
  );
}
