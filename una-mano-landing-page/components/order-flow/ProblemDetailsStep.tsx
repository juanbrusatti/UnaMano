'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Camera, Upload, Clock, Calendar, ArrowLeft, HandHelping } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LocationStep } from './LocationStep';
import { HelperStep } from './HelperStep';

type TimeOption = {
  id: string;
  label: string;
  needsTimeInput?: boolean;
  needsDateInput?: boolean;
};

export function ProblemDetailsStep({ onBack }: { onBack: () => void }) {
  const [description, setDescription] = useState('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [showTimeInput, setShowTimeInput] = useState(false);
  const [showDateInput, setShowDateInput] = useState(false);
  const [customTime, setCustomTime] = useState('');
  const [customDate, setCustomDate] = useState('');
  const router = useRouter();

  const timeOptions: TimeOption[] = [
    { id: 'now', label: 'Lo antes posible' },
    { id: 'today', label: 'Hoy', needsTimeInput: true },
    { id: 'tomorrow', label: 'Mañana', needsTimeInput: true },
    { id: 'custom', label: 'Elegir fecha y hora', needsTimeInput: true, needsDateInput: true },
  ];

  const handleTimeSelect = (option: TimeOption) => {
    setSelectedTime(option.id);
    setShowTimeInput(option.needsTimeInput || false);
    setShowDateInput(option.needsDateInput || false);
  };

  const [showLocationStep, setShowLocationStep] = useState(false);
  const [showHelperStep, setShowHelperStep] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí manejaremos el envío del formulario
    console.log({
      description,
      timeOption: selectedTime,
      customTime: selectedTime !== 'now' ? customTime : null,
      customDate: selectedTime === 'custom' ? customDate : null,
    });
    // Mostrar pantalla de ubicación
    setShowLocationStep(true);
  };

  const handleLocationConfirm = () => {
    // Aquí iría la lógica para confirmar la ubicación
    console.log('Ubicación confirmada');
    // Ocultar pantalla de ubicación y mostrar pantalla de ayudantes
    setShowLocationStep(false);
    setTimeout(() => setShowHelperStep(true), 100);
  };

  const handleHelperSelect = (helper: any) => {
    // Aquí iría la lógica para seleccionar un ayudante
    console.log('Ayudante seleccionado:', helper);
    // Navegar a la siguiente pantalla
    // router.push('/confirmacion');
  };

  if (showLocationStep) {
    return <LocationStep onConfirm={handleLocationConfirm} />;
  }

  if (showHelperStep) {
    return <HelperStep onBack={() => setShowHelperStep(false)} onHelperSelect={handleHelperSelect} />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-md mx-auto">
        <button
          onClick={onBack}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Atrás
        </button>

        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Contanos un poco más
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Descripción */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              ¿Qué paso?
            </label>
            <div className="relative rounded-md shadow-sm">
              <input
                type="text"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Ej: se rompió la llave del baño"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>

          {/* Foto (opcional) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Foto (opcional)
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-xl">
              <div className="space-y-1 text-center">
                <div className="flex text-gray-600 justify-center">
                  <Camera className="w-10 h-10" />
                </div>
                <div className="flex text-sm text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none"
                  >
                    <div className="flex items-center">
                      <Upload className="w-4 h-4 mr-2" />
                      <span>Subir una foto</span>
                    </div>
                    <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                  </label>
                </div>
                <p className="text-xs text-center text-gray-500">PNG, JPG, GIF hasta 10MB</p>
              </div>
            </div>
          </div>

          {/* Selección de tiempo */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              ¿Cuándo necesitás la mano?
            </label>
            <div className="space-y-3">
              {timeOptions.map((option) => (
                <div key={option.id} className="flex items-center">
                  <input
                    id={option.id}
                    name="time-option"
                    type="radio"
                    checked={selectedTime === option.id}
                    onChange={() => handleTimeSelect(option)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <label htmlFor={option.id} className="ml-3 block text-sm font-medium text-gray-700">
                    {option.label}
                  </label>
                </div>
              ))}

              {showTimeInput && (
                <div className="ml-7 mt-2 flex items-center">
                  <Clock className="w-5 h-5 text-gray-400 mr-2" />
                  <input
                    type="time"
                    value={customTime}
                    onChange={(e) => setCustomTime(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
              )}

              {showDateInput && (
                <div className="ml-7 mt-2 flex items-center">
                  <Calendar className="w-5 h-5 text-gray-400 mr-2" />
                  <input
                    type="date"
                    value={customDate}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => setCustomDate(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
              )}
            </div>
          </div>

          {/* Botón de búsqueda */}
          <div className="pt-4">
            <Button 
              type="submit" 
              className="w-full py-6 text-lg bg-green-600 hover:bg-green-700 focus:ring-green-500 focus:ring-offset-2"
            >   
            
               <HandHelping className="w-6 h-6 mr-2" /> Buscar una mano cerca
            </Button>
          </div>
        </form>
      </div>
    </motion.div>
  );
}
