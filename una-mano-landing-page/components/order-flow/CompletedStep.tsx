'use client';

import { motion } from 'framer-motion';
import { CheckCircle, Star, ArrowLeft } from 'lucide-react';
import { useState } from 'react';
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

export function CompletedStep({ 
  helper, 
  onBack,
  onReport 
}: { 
  helper: Helper; 
  onBack: () => void;
  onReport: () => void;
}) {
  const router = useRouter();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [hoveredStar, setHoveredStar] = useState(0);

  const getTypeLabel = (type: 'ayudante' | 'tecnico') => {
    return type === 'tecnico' ? 'Técnico' : 'Ayudante';
  };

  const handleStarClick = (starNumber: number) => {
    setRating(starNumber);
  };

  const handleStarHover = (starNumber: number) => {
    setHoveredStar(starNumber);
  };

  const handleStarLeave = () => {
    setHoveredStar(0);
  };

  const handleFinish = () => {
    // Aquí iría la lógica para guardar el rating y comentario
    console.log({
      helperId: helper.id,
      rating,
      comment: comment.trim() || null,
      timestamp: new Date()
    });
    
    // Volver al inicio
    router.push('/');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-b from-green-50 to-white py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-md mx-auto">
        {/* Botón de retroceso */}
        <motion.button
          onClick={onBack}
          className="mb-8 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
          whileHover={{ x: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          <span className="text-sm">Volver</span>
        </motion.button>

        {/* Contenido principal centrado */}
        <div className="text-center flex flex-col items-center">
          {/* Ícono check de finalización */}
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
            <CheckCircle className="w-20 h-20 text-green-500" />
          </motion.div>

          {/* Título */}
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-2xl font-bold text-gray-900 mb-4"
          >
            ¿Todo salió bien?
          </motion.h1>

          {/* Texto informativo */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="text-lg text-gray-700 mb-8 max-w-sm leading-relaxed"
          >
            Tu ayuda con {helper.name.split(' ')[0]} finalizó.
          </motion.p>

          {/* Info del ayudante (card compacta) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 mb-8 w-full max-w-sm"
          >
            <div className="flex items-center space-x-3">
              <img
                src={helper.photo}
                alt={helper.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              
              <div className="flex-1 text-left">
                <h3 className="font-semibold text-gray-900">{helper.name}</h3>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">🏷️</span>
                  <span className="text-sm text-gray-600">{getTypeLabel(helper.type)}</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Sistema de rating */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="mb-8 w-full max-w-sm"
          >
            <label className="block text-sm font-medium text-gray-700 mb-3 text-center">
              ⭐ Califica tu experiencia
            </label>
            <div className="flex justify-center space-x-2 mb-4">
              {[1, 2, 3, 4, 5].map((starNumber) => (
                <motion.button
                  key={starNumber}
                  onClick={() => handleStarClick(starNumber)}
                  onMouseEnter={() => handleStarHover(starNumber)}
                  onMouseLeave={handleStarLeave}
                  className="p-1 transition-colors"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.8 }}
                >
                  <Star
                    className={`w-8 h-8 transition-colors ${
                      starNumber <= (hoveredStar || rating)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                </motion.button>
              ))}
            </div>
            <div className="text-center text-sm text-gray-600">
              {rating === 0 ? 'Selecciona una calificación' : 
               rating === 1 ? 'Malo' :
               rating === 2 ? 'Regular' :
               rating === 3 ? 'Bueno' :
               rating === 4 ? 'Muy bueno' : 'Excelente'}
            </div>
          </motion.div>

          {/* Comentario opcional */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            className="w-full max-w-sm mb-8"
          >
            <label className="block text-sm font-medium text-gray-700 mb-2 text-center">
              Comentario (opcional)
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Cuéntanos cómo fue tu experiencia..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              rows={3}
            />
          </motion.div>

          {/* CTA Finalizar */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.5 }}
            onClick={handleFinish}
            disabled={rating === 0}
            className={`w-full max-w-sm py-4 px-6 rounded-lg font-semibold transition-all duration-300 ${
              rating > 0
                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
            whileHover={{ scale: rating > 0 ? 1.02 : 1 }}
            whileTap={{ scale: rating > 0 ? 0.98 : 1 }}
          >
            Finalizar
          </motion.button>

          {/* Nota informativa */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6, duration: 0.5 }}
            className="mt-6 text-sm text-gray-400 max-w-xs"
          >
            Tu feedback nos ayuda a mejorar el servicio
          </motion.p>

          {/* Botón para reportar problema */}
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 0.5 }}
            onClick={onReport}
            className="mt-4 text-red-600 hover:text-red-700 text-sm font-medium transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            🚨 Reportar un problema
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
