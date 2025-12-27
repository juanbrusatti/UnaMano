'use client';

import { motion } from 'framer-motion';
import { Clock, AlertCircle, ArrowLeft, RefreshCw, Users, X } from 'lucide-react';
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

type RejectionReason = 'rejected' | 'timeout';

export function RejectedStep({ 
  helper, 
  reason,
  onFindAnother,
  onRetry,
  onCancel 
}: { 
  helper: Helper; 
  reason: RejectionReason;
  onFindAnother: () => void;
  onRetry: () => void;
  onCancel: () => void;
}) {
  const router = useRouter();

  const getTypeLabel = (type: 'ayudante' | 'tecnico') => {
    return type === 'tecnico' ? 'Técnico' : 'Ayudante';
  };

  const getTitle = () => {
    return `${helper.name.split(' ')[0]} no pudo aceptar`;
  };

  const getSubtitle = () => {
    if (reason === 'rejected') {
      return 'No te preocupes, hay más personas listas para ayudarte.';
    } else {
      return 'No te preocupes, hay más personas listas para ayudarte.';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-b from-orange-50 to-white py-12 px-4 sm:px-6 lg:px-8"
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
          {/* Ícono neutro */}
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
            <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center">
              {reason === 'rejected' ? (
                <AlertCircle className="w-10 h-10 text-orange-600" />
              ) : (
                <Clock className="w-10 h-10 text-orange-600" />
              )}
            </div>
          </motion.div>

          {/* Título */}
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-2xl font-bold text-gray-900 mb-4"
          >
            {getTitle()}
          </motion.h1>

          {/* Texto tranquilizador */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="text-lg text-gray-700 mb-12 max-w-sm leading-relaxed"
          >
            {getSubtitle()}
          </motion.p>

          {/* Opciones */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="w-full max-w-sm space-y-3"
          >
            {/* Opción 1: Buscar otro ayudante (CTA principal) */}
            <motion.button
              onClick={onFindAnother}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Users className="w-5 h-5" />
              <span>Buscar otro ayudante</span>
            </motion.button>

            {/* Opción 2: Reintentar con el mismo (solo si fue timeout) */}
            {reason === 'timeout' && (
              <motion.button
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ delay: 1, duration: 0.3 }}
                onClick={onRetry}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <RefreshCw className="w-4 h-4" />
                <span>Reintentar con {helper.name.split(' ')[0]}</span>
              </motion.button>
            )}

            {/* Opción 3: Cancelar pedido */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.5 }}
              onClick={onCancel}
              className="text-gray-500 hover:text-gray-700 transition-colors text-sm font-medium flex items-center justify-center space-x-1"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <X className="w-4 h-4" />
              <span>Cancelar pedido</span>
            </motion.button>
          </motion.div>

          {/* Info del ayudante (sutil) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.5 }}
            className="mt-8 text-sm text-gray-400 max-w-xs"
          >
            <div className="flex items-center justify-center space-x-2">
              <img
                src={helper.photo}
                alt={helper.name}
                className="w-8 h-8 rounded-full object-cover"
              />
              <span>{helper.name} • {getTypeLabel(helper.type)}</span>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
