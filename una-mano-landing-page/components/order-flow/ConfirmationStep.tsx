'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { CheckCircle, MapPin, ArrowLeft, Home } from 'lucide-react';

interface Helper {
  id: string;
  name: string;
  photo: string;
  distance: string;
  type: 'ayudante' | 'tecnico';
  reputation: string;
  rating?: number;
}

export function ConfirmationStep({ 
  helper, 
  onBack 
}: { 
  helper: Helper; 
  onBack: () => void;
}) {
  const router = useRouter();

  const handleGoHome = () => {
    router.push('/');
  };

  const getTypeLabel = (type: 'ayudante' | 'tecnico') => {
    return type === 'tecnico' ? 'Técnico' : 'Ayudante';
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
        {/* Botón de retroceso (muy sutil) */}
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
          {/* 1. Ícono / Visual - Check grande y calmado */}
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

          {/* 2. Mensaje principal */}
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-3xl font-bold text-gray-900 mb-6"
          >
            Pedido enviado
          </motion.h1>

          {/* 3. Subtexto tranquilizador - EL ALMA DE LA PANTALLA */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="text-lg text-gray-700 mb-12 max-w-sm leading-relaxed"
          >
            Ya avisamos a la persona que elegiste.<br />
            Te vamos a avisar apenas confirme.
          </motion.p>

          {/* 4. Info mínima del ayudante */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-12 w-full max-w-sm"
          >
            <div className="flex items-center space-x-4">
              {/* Foto del ayudante */}
              <img
                src={helper.photo}
                alt={helper.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              
              {/* Información del ayudante */}
              <div className="flex-1 text-left">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="text-sm text-gray-500">👤</span>
                  <h3 className="font-semibold text-gray-900">{helper.name}</h3>
                </div>
                
                <div className="flex items-center space-x-2 mb-1">
                  <span className="text-sm text-gray-500">📍</span>
                  <span className="text-sm text-gray-600">{helper.distance}</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">🏷️</span>
                  <span className="text-sm text-gray-600">{getTypeLabel(helper.type)}</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* 5. CTA secundario muy suave */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            onClick={handleGoHome}
            className="text-gray-500 hover:text-gray-700 transition-colors text-sm font-medium"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Volver al inicio
          </motion.button>

          {/* 6. Microcopy final de marca */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            className="mt-16 text-sm text-gray-400"
          >
            Estamos para darte una mano
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
}
