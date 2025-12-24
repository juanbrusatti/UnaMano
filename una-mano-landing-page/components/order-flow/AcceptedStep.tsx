'use client';

import { motion } from 'framer-motion';
import { CheckCircle, MapPin, Star, MessageCircle, X } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Helper {
  id: string;
  name: string;
  photo: string;
  distance: string;
  type: 'ayudante' | 'tecnico';
  reputation: string;
  rating?: number;
}

export function AcceptedStep({ 
  helper, 
  onCancel,
  onGoToChat 
}: { 
  helper: Helper; 
  onCancel: () => void;
  onGoToChat: () => void;
}) {
  const router = useRouter();

  const getTypeLabel = (type: 'ayudante' | 'tecnico') => {
    return type === 'tecnico' ? 'Técnico' : 'Ayudante';
  };

  const estimatedTime = helper.distance.includes('8') ? '10-15 min' : 
                        helper.distance.includes('12') ? '15-20 min' : 
                        '20-25 min';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-b from-green-50 to-white py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-md mx-auto">
        {/* Contenido principal centrado */}
        <div className="text-center flex flex-col items-center">
          {/* Ícono check verde de celebración */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ 
              delay: 0.2,
              duration: 0.6,
              ease: "easeOut"
            }}
            className="mb-8"
          >
            <CheckCircle className="w-24 h-24 text-green-500" />
          </motion.div>

          {/* Título celebratorio */}
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-3xl font-bold text-gray-900 mb-4"
          >
            ¡{helper.name.split(' ')[0]} aceptó ayudarte!
          </motion.h1>

          {/* Card ampliada del ayudante */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8 w-full max-w-sm"
          >
            <div className="flex items-start space-x-4">
              {/* Foto del ayudante */}
              <div className="relative">
                <img
                  src={helper.photo}
                  alt={helper.name}
                  className="w-20 h-20 rounded-full object-cover"
                />
                {/* Indicador de estado confirmado */}
                <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
              </div>
              
              {/* Información del ayudante */}
              <div className="flex-1 text-left">
                <h3 className="font-semibold text-gray-900 text-lg mb-2">{helper.name}</h3>
                
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-sm text-gray-500">🏷️</span>
                  <span className="text-sm font-medium text-gray-700">{getTypeLabel(helper.type)}</span>
                </div>
                
                <div className="flex items-center space-x-2 mb-3">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600">{helper.distance}</span>
                  <span className="text-sm text-gray-400">•</span>
                  <span className="text-sm text-gray-600">{estimatedTime}</span>
                </div>

                {/* Rating */}
                <div className="flex items-center space-x-2">
                  <div className="flex items-center text-yellow-500">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(helper.rating || 0) ? 'fill-current' : ''
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600 font-medium">
                    {helper.rating?.toFixed(1) || '4.8'}
                  </span>
                  <span className="text-sm text-gray-400">
                    ({helper.reputation})
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* CTA principal - Ir al chat */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
            onClick={onGoToChat}
            className="w-full max-w-sm bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-lg transition-colors mb-4 flex items-center justify-center space-x-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <MessageCircle className="w-5 h-5" />
            <span>Ir al chat</span>
          </motion.button>

          {/* CTA secundario - Cancelar ayuda */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            onClick={onCancel}
            className="text-gray-500 hover:text-gray-700 transition-colors text-sm font-medium flex items-center space-x-1"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <X className="w-4 h-4" />
            <span>Cancelar ayuda</span>
          </motion.button>

          {/* Nota informativa */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.5 }}
            className="mt-8 text-sm text-gray-400 max-w-xs"
          >
            Podrás cancelar la ayuda antes de enviar el primer mensaje
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
}
