'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { MapPin, Star, ArrowLeft } from 'lucide-react';
import { useState } from 'react';

type HelperType = 'ayudante' | 'tecnico';

interface Helper {
  id: string;
  name: string;
  photo: string;
  distance: string;
  type: HelperType;
  reputation: string;
  rating?: number;
}

export function HelperStep({ onBack, onHelperSelect }: { onBack: () => void; onHelperSelect: (helper: Helper) => void }) {
  const [selectedHelper, setSelectedHelper] = useState<Helper | null>(null);

  // Datos de ejemplo - en producción vendrían de una API
  const helpers: Helper[] = [
    {
      id: '1',
      name: 'Carlos Rodríguez',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      distance: 'a 8 min',
      type: 'ayudante',
      reputation: 'Ayudó 14 veces',
      rating: 4.8
    },
    {
      id: '2',
      name: 'María González',
      photo: 'https://images.unsplash.com/photo-1494790108755-2616b332c1cd?w=150&h=150&fit=crop&crop=face',
      distance: 'a 12 min',
      type: 'tecnico',
      reputation: 'Ayudó 23 veces',
      rating: 4.9
    },
    {
      id: '3',
      name: 'Luis Martínez',
      photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      distance: 'a 15 min',
      type: 'ayudante',
      reputation: 'Ayudó 8 veces',
      rating: 4.7
    }
  ];

  const handleHelperSelect = (helper: Helper) => {
    setSelectedHelper(helper);
  };

  const handleSubmit = () => {
    if (selectedHelper) {
      onHelperSelect(selectedHelper);
    }
  };

  const getTypeColor = (type: HelperType) => {
    return type === 'tecnico' 
      ? 'bg-blue-100 text-blue-800' 
      : 'bg-green-100 text-green-800';
  };

  const getTypeLabel = (type: HelperType) => {
    return type === 'tecnico' ? 'Técnico' : 'Ayudante';
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-md mx-auto">
        {/* Botón de retroceso */}
        <motion.button
          onClick={onBack}
          className="mb-6 flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          whileHover={{ x: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Volver
        </motion.button>

        {/* Título principal */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Alguien puede darte una mano
          </h1>
          <p className="text-gray-600">
            Estas personas están cerca y listas para ayudarte
          </p>
        </motion.div>

        {/* Cards de ayudantes */}
        <div className="space-y-4 mb-8">
          {helpers.map((helper, index) => (
            <motion.div
              key={helper.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className={`relative bg-white rounded-2xl shadow-sm border-2 transition-all cursor-pointer hover:shadow-md ${
                selectedHelper?.id === helper.id 
                  ? 'border-blue-500 shadow-md' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => handleHelperSelect(helper)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="p-4">
                <div className="flex items-center space-x-4">
                  {/* Foto */}
                  <div className="relative">
                    <img
                      src={helper.photo}
                      alt={helper.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    {selectedHelper?.id === helper.id && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center"
                      >
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </motion.div>
                    )}
                  </div>

                  {/* Información */}
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 text-lg">
                      {helper.name}
                    </h3>
                    
                    <div className="flex items-center space-x-3 mt-1">
                      {/* Distancia */}
                      <div className="flex items-center text-gray-600 text-sm">
                        <MapPin className="w-4 h-4 mr-1" />
                        {helper.distance}
                      </div>
                      
                      {/* Tipo */}
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(helper.type)}`}>
                        {getTypeLabel(helper.type)}
                      </span>
                    </div>

                    {/* Reputación */}
                    <div className="flex items-center mt-2">
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
                      <span className="ml-2 text-sm text-gray-600">
                        {helper.reputation}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Botón de acción */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="space-y-3"
        >
          <motion.button
            onClick={handleSubmit}
            disabled={!selectedHelper}
            className="w-full py-4 text-lg font-semibold bg-blue-400 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors rounded-lg"
            whileHover={{ scale: selectedHelper ? 1.02 : 1 }}
            whileTap={{ scale: selectedHelper ? 0.98 : 1 }}
          >
            {selectedHelper ? `Pedir una mano a ${selectedHelper.name}` : 'Selecciona a alguien'}
          </motion.button>
          
          <p className="text-center text-sm text-gray-500">
            Elegís por confianza, no por precio
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}
