'use client';

import { motion } from 'framer-motion';
import { AlertTriangle, UserX, Shield, MessageSquare, ArrowLeft, Send } from 'lucide-react';
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

type ReportType = 'no_arrived' | 'no_helped' | 'inappropriate' | 'other';

export function ReportStep({ 
  helper, 
  onBack,
  onSubmit 
}: { 
  helper: Helper; 
  onBack: () => void;
  onSubmit: (report: { type: ReportType; description: string }) => void;
}) {
  const router = useRouter();
  const [selectedType, setSelectedType] = useState<ReportType | null>(null);
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getTypeLabel = (type: 'ayudante' | 'tecnico') => {
    return type === 'tecnico' ? 'Técnico' : 'Ayudante';
  };

  const reportOptions = [
    {
      type: 'no_arrived' as ReportType,
      icon: UserX,
      title: 'No llegó',
      description: 'El ayudante nunca llegó al lugar'
    },
    {
      type: 'no_helped' as ReportType,
      icon: Shield,
      title: 'No ayudó',
      description: 'El ayudante llegó pero no resolvió el problema'
    },
    {
      type: 'inappropriate' as ReportType,
      icon: AlertTriangle,
      title: 'Comportamiento inapropiado',
      description: 'El ayudante se comportó de manera inadecuada'
    },
    {
      type: 'other' as ReportType,
      icon: MessageSquare,
      title: 'Otro',
      description: 'Otro tipo de problema'
    }
  ];

  const handleSubmit = async () => {
    if (!selectedType || !description.trim()) return;

    setIsSubmitting(true);
    
    // Simular envío del reporte
    setTimeout(() => {
      onSubmit({
        type: selectedType,
        description: description.trim()
      });
      
      // Volver al inicio después de enviar
      router.push('/');
    }, 1500);
  };

  const selectedOption = reportOptions.find(option => option.type === selectedType);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-b from-red-50 to-white py-12 px-4 sm:px-6 lg:px-8"
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

        {/* Contenido principal */}
        <div className="text-center">
          {/* Título */}
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-2xl font-bold text-gray-900 mb-4"
          >
            Reportar un problema
          </motion.h1>

          {/* Info del ayudante */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 mb-8 inline-flex items-center space-x-3"
          >
            <img
              src={helper.photo}
              alt={helper.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            
            <div className="text-left">
              <h3 className="font-semibold text-gray-900">{helper.name}</h3>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">🏷️</span>
                <span className="text-sm text-gray-600">{getTypeLabel(helper.type)}</span>
              </div>
            </div>
          </motion.div>

          {/* Opciones de reporte */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="space-y-3 mb-6"
          >
            {reportOptions.map((option, index) => (
              <motion.button
                key={option.type}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1, duration: 0.3 }}
                onClick={() => setSelectedType(option.type)}
                className={`w-full p-4 rounded-xl border-2 transition-all duration-300 flex items-center space-x-3 ${
                  selectedType === option.type
                    ? 'border-red-500 bg-red-50'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
                whileHover={{ scale: selectedType === option.type ? 1 : 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <option.icon className={`w-6 h-6 ${
                  selectedType === option.type ? 'text-red-600' : 'text-gray-600'
                }`} />
                <div className="flex-1 text-left">
                  <h4 className={`font-semibold ${
                    selectedType === option.type ? 'text-red-900' : 'text-gray-900'
                  }`}>
                    {option.title}
                  </h4>
                  <p className={`text-sm ${
                    selectedType === option.type ? 'text-red-700' : 'text-gray-600'
                  }`}>
                    {option.description}
                  </p>
                </div>
              </motion.button>
            ))}
          </motion.div>

          {/* Descripción adicional */}
          {selectedType && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.3 }}
              className="mb-8"
            >
              <label className="block text-sm font-medium text-gray-700 mb-2 text-left">
                Describe lo que pasó (opcional)
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Cuéntanos más detalles sobre lo que ocurrió..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                rows={4}
              />
            </motion.div>
          )}

          {/* Botón de envío */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: selectedType ? 0.4 : 0 }}
            onClick={handleSubmit}
            disabled={!selectedType || isSubmitting}
            className={`w-full py-4 px-6 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2 ${
              !selectedType || isSubmitting
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-red-600 hover:bg-red-700 text-white'
            }`}
            whileHover={{ scale: (!selectedType || isSubmitting) ? 1 : 1.02 }}
            whileTap={{ scale: (!selectedType || isSubmitting) ? 1 : 0.98 }}
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Enviando...</span>
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                <span>Enviar reporte</span>
              </>
            )}
          </motion.button>

          {/* Nota informativa */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mt-6 text-sm text-gray-400"
          >
            Nos tomamos muy en serio los reportes y actuaremos de inmediato
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
}
