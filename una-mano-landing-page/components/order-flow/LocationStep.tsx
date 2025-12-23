'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Locate, MapPin, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';

export function LocationStep({ onConfirm }: { onConfirm: () => void }) {
  const [isLoading, setIsLoading] = useState(true);
  const [locationFound, setLocationFound] = useState(false);

  // Simulamos la búsqueda de ubicación
  useEffect(() => {
    const timer = setTimeout(() => {
      setLocationFound(true);
      setIsLoading(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4 sm:px-6 lg:px-8 flex flex-col"
    >
      <div className="max-w-md mx-auto flex-1 flex flex-col">
        <div className="text-center flex-1 flex flex-col items-center justify-center">
          <div className="relative w-40 h-40 mb-8 flex items-center justify-center">
            {/* Punto central */}
            <motion.div
              className="absolute"
              style={{
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <div className="w-6 h-6 bg-blue-500 rounded-full" />
            </motion.div>

            {/* Anillos concéntricos */}
            {[1].map((i) => (
              <motion.div
                key={i}
                className="absolute border-2 border-blue-400 rounded-full"
                style={{
                  width: `${i * 60}px`,
                  height: `${i * 60}px`,
                  top: '40%',
                  left: '39%',
                  transform: 'translate(-50%, -50%)',
                }}
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.2, 0.5, 0.2],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.5,
                  ease: 'easeInOut',
                }}
              />
            ))}
            {[2].map((i) => (
              <motion.div
                key={i}
                className="absolute border-2 border-blue-400 rounded-full"
                style={{
                  width: `${i * 60}px`,
                  height: `${i * 60}px`,
                  top: '22%',
                  left: '21%',
                  transform: 'translate(-50%, -50%)',
                }}
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.2, 0.5, 0.2],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.5,
                  ease: 'easeInOut',
                }}
              />
            ))}
            {[3].map((i) => (
              <motion.div
                key={i}
                className="absolute border-2 border-blue-400 rounded-full"
                style={{
                  width: `${i * 60}px`,
                  height: `${i * 60}px`,
                  top: '4%',
                  left: '2%',
                  transform: 'translate(-50%, -50%)',
                }}
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.2, 0.5, 0.2],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.5,
                  ease: 'easeInOut',
                }}
              />
            ))}

            {/* Icono de ubicación */}
            <motion.div
              className="absolute"
              style={{
                top: '30%',
                left: '42.5%',
                transform: 'translate(-50%, -50%)',
              }}
              initial={{ scale: 0 }}
              animate={{ 
                scale: 1,
                y: [0, -10, 0],
              }}
              transition={{
                y: {
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                },
                scale: {
                  type: 'spring',
                  stiffness: 100,
                  damping: 10,
                }
              }}
            >
              <MapPin className="w-12 h-12 text-blue-600" fill="currentColor" />
            </motion.div>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {isLoading ? 'Buscando ayuda cerca de ti' : '¡Ubicación encontrada!'}
          </h2>
          
          {isLoading ? (
            <motion.p 
              className="text-gray-600 mb-8"
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Buscando una mano disponible...
            </motion.p>
          ) : (
            <p className="text-gray-600 mb-8">
              Hemos encontrado varios que quieren darte una mano.
            </p>
          )}

          <div className="text-sm text-gray-500 mb-8 max-w-xs">
            <p>Usamos tu ubicación solo para encontrar a alguien cercano.</p>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: locationFound ? 1 : 0.5,
            y: locationFound ? 0 : 20,
          }}
          transition={{ delay: locationFound ? 0.5 : 0 }}
          className="pt-4"
        >
          <Button
            onClick={onConfirm}
            disabled={!locationFound}
            className={`w-full py-6 text-lg transition-all duration-300 ${
              locationFound 
                ? 'bg-green-600 hover:bg-green-700' 
                : 'bg-gray-300 cursor-not-allowed'
            }`}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Buscando...
              </>
            ) : (
              <>
                <Locate className="w-5 h-5 mr-2" />
                Confirmar ubicación
              </>
            )}
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
}