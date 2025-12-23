'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ProblemDetailsStep } from './ProblemDetailsStep';

type ProblemOption = {
  id: string;
  icon: string;
  label: string;
  description?: string;
};

export function ProblemTypeStep() {
  const router = useRouter();

  const problemOptions: ProblemOption[] = [
    { id: 'broken', icon: '🔧', label: 'Se rompió algo' },
    { id: 'leak', icon: '🚿', label: 'Gotea / pierde' },
    { id: 'not_working', icon: '⚡', label: 'No funciona' },
    { id: 'help_needed', icon: '🪛', label: 'Necesito ayuda en casa' },
    { id: 'other', icon: '❓', label: 'Otro problema' },
  ];

  const [selectedOption, setSelectedOption] = useState<ProblemOption | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleOptionSelect = (option: ProblemOption) => {
    setIsTransitioning(true);
    // Pequeño retraso para permitir la animación
    setTimeout(() => {
      setSelectedOption(option);
      setIsTransitioning(false);
    }, 300);
  };

  const handleBack = () => {
    setIsTransitioning(true);
    // Pequeño retraso para permitir la animación
    setTimeout(() => {
      setSelectedOption(null);
      setIsTransitioning(false);
    }, 300);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto relative">
        <AnimatePresence mode="wait">
          {!selectedOption ? (
            <motion.div
              key="problem-type"
              initial={{ opacity: 1, x: 0 }}
              animate={{ 
                opacity: isTransitioning ? 0.5 : 1,
                x: isTransitioning ? -20 : 0,
              }}
              transition={{ duration: 0.3 }}
              className={isTransitioning ? 'pointer-events-none' : ''}
            >
              <div className="text-center mb-10">
                <motion.h1 
                  className="text-3xl font-bold text-gray-900 mb-2"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  ¿Qué te pasó?
                </motion.h1>
                <motion.p 
                  className="text-gray-600"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  No hace falta explicar mucho.
                </motion.p>
              </div>

              <motion.div 
                className="space-y-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {problemOptions.map((option, index) => (
                  <motion.button
                    key={option.id}
                    onClick={() => handleOptionSelect(option)}
                    className="w-full flex items-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 hover:border-blue-200"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + (index * 0.05) }}
                  >
                    <span className="text-3xl mr-4" role="img" aria-hidden="true">
                      {option.icon}
                    </span>
                    <span className="text-lg font-medium text-gray-900">
                      {option.label}
                    </span>
                  </motion.button>
                ))}
              </motion.div>

              <motion.div 
                className="mt-10 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <p className="text-sm text-gray-500">
                  ¿Eres un profesional?{' '}
                  <button 
                    className="text-blue-600 hover:text-blue-800 font-medium"
                    onClick={() => {}}
                  >
                    Ofrece tus servicios
                  </button>
                </p>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="problem-details"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <ProblemDetailsStep onBack={handleBack} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
