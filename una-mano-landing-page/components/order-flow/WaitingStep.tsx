'use client';

import { motion } from 'framer-motion';
import { Clock, MapPin, ArrowLeft, User } from 'lucide-react';
import { useState, useEffect } from 'react';

interface Helper {
  id: string;
  name: string;
  photo: string;
  distance: string;
  type: 'ayudante' | 'tecnico';
  reputation: string;
  rating?: number;
}

export function WaitingStep({ 
  helper, 
  onCancel,
  onTimeout,
  onAccepted 
}: { 
  helper: Helper; 
  onCancel: () => void;
  onTimeout: () => void;
  onAccepted: () => void;
}) {
  const [elapsedTime, setElapsedTime] = useState(0);

  // Simulación de polling cada 1 segundo
  useEffect(() => {
    const interval = setInterval(() => {
      setElapsedTime(prev => prev + 1);
      
      // Simulación: después de 10 segundos, el ayudante responde
      if (elapsedTime >= 10) {
        // 80% de probabilidad de aceptar
        if (Math.random() > 0.2) {
          onAccepted();
        } else {
          onTimeout();
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [elapsedTime, onTimeout, onAccepted]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getTypeLabel = (type: 'ayudante' | 'tecnico') => {
    return type === 'tecnico' ? 'Técnico' : 'Ayudante';
  };

  const estimatedTime = helper.distance.includes('8') ? '15-20 min' : 
                        helper.distance.includes('12') ? '20-25 min' : 
                        '25-30 min';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-md mx-auto">
        {/* Botón de retroceso */}
        <motion.button
          onClick={onCancel}
          className="mb-8 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
          whileHover={{ x: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          <span className="text-sm">Cancelar pedido</span>
        </motion.button>

        {/* Contenido principal centrado */}
        <div className="text-center flex flex-col items-center">
          {/* Ícono animado suave - Pulso */}
          <motion.div
            className="mb-8 relative"
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
              <Clock className="w-10 h-10 text-blue-600" />
            </div>
            
            {/* Anillo de pulso */}
            <motion.div
              className="absolute inset-0 w-20 h-20 bg-blue-200 rounded-full opacity-30"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.3, 0, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>

          {/* Título */}
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-2xl font-bold text-gray-900 mb-4"
          >
            Esperando confirmación
          </motion.h1>

          {/* Texto informativo */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-lg text-gray-700 mb-8 max-w-sm leading-relaxed"
          >
            {helper.name} recibió tu pedido.<br />
            Te avisaremos apenas responda.
          </motion.p>

          {/* Card del ayudante */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8 w-full max-w-sm"
          >
            <div className="flex items-center space-x-4">
              {/* Foto del ayudante */}
              <div className="relative">
                <img
                  src={helper.photo}
                  alt={helper.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                {/* Indicador de estado */}
                <motion.div
                  className="absolute bottom-0 right-0 w-4 h-4 bg-yellow-500 rounded-full border-2 border-white"
                  animate={{
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </div>
              
              {/* Información del ayudante */}
              <div className="flex-1 text-left">
                <div className="flex items-center space-x-2 mb-2">
                  <User className="w-4 h-4 text-gray-500" />
                  <h3 className="font-semibold text-gray-900">{helper.name}</h3>
                </div>
                
                <div className="flex items-center space-x-2 mb-1">
                  <span className="text-sm text-gray-500">🏷️</span>
                  <span className="text-sm text-gray-600">{getTypeLabel(helper.type)}</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600">{helper.distance}</span>
                  <span className="text-sm text-gray-400">•</span>
                  <span className="text-sm text-gray-600">{estimatedTime}</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Tiempo transcurrido */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="text-sm text-gray-500"
          >
            Tiempo de espera: <span className="font-medium">{formatTime(elapsedTime)}</span>
          </motion.div>

          {/* Texto adicional de tranquilidad */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="mt-4 text-sm text-gray-400 max-w-xs"
          >
            La mayoría de los ayudantes responden en menos de 2 minutos
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
}
