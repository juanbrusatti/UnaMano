'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, Camera, Send, Circle, MapPin } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

interface Helper {
  id: string;
  name: string;
  photo: string;
  distance: string;
  type: 'ayudante' | 'tecnico';
  reputation: string;
  rating?: number;
}

interface Message {
  id: string;
  sender: 'user' | 'helper' | 'system';
  content: string;
  timestamp: Date;
  type?: 'text' | 'image' | 'system';
}

type ChatStatus = 'active' | 'on_the_way' | 'helping' | 'finished';

export function ChatStep({ 
  helper, 
  onBack,
  onComplete,
  onReport 
}: { 
  helper: Helper; 
  onBack: () => void;
  onComplete: () => void;
  onReport: () => void;
}) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [chatStatus, setChatStatus] = useState<ChatStatus>('active');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    // Mensaje automático del sistema al iniciar el chat
    const systemMessage: Message = {
      id: 'system-1',
      sender: 'system',
      content: `👋 Hola, soy ${helper.name}. Contame brevemente qué pasó así te ayudo mejor.`,
      timestamp: new Date(),
      type: 'system'
    };
    setMessages([systemMessage]);
  }, [helper.name]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getStatusInfo = () => {
    switch (chatStatus) {
      case 'active':
        return { icon: Circle, color: 'text-green-500', label: 'En línea' };
      case 'on_the_way':
        return { icon: MapPin, color: 'text-blue-500', label: 'En camino' };
      case 'helping':
        return { icon: MapPin, color: 'text-orange-500', label: 'Ayudando' };
      case 'finished':
        return { icon: Circle, color: 'text-gray-500', label: 'Finalizado' };
      default:
        return { icon: Circle, color: 'text-green-500', label: 'En línea' };
    }
  };

  const handleSendMessage = () => {
    if (inputText.trim()) {
      const newMessage: Message = {
        id: `user-${Date.now()}`,
        sender: 'user',
        content: inputText.trim(),
        timestamp: new Date(),
        type: 'text'
      };
      
      setMessages(prev => [...prev, newMessage]);
      setInputText('');
      
      // Simular respuesta del ayudante después de 2 segundos
      setTimeout(() => {
        const helperResponse: Message = {
          id: `helper-${Date.now()}`,
          sender: 'helper',
          content: 'Entendido. Ya voy para ayudarte.',
          timestamp: new Date(),
          type: 'text'
        };
        setMessages(prev => [...prev, helperResponse]);
        
        // Cambiar estado a "en camino" después de la respuesta
        setChatStatus('on_the_way');
      }, 2000);
    }
  };

  const handleQuickReply = (reply: string) => {
    setInputText(reply);
  };

  const suggestedMessages = [
    'Es una urgencia',
    'Necesito ayuda técnica',
    'No es urgente'
  ];

  const StatusIcon = getStatusInfo().icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-50 flex flex-col"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.3 }}
        className="bg-white border-b border-gray-200 px-4 py-3 flex items-center space-x-3"
      >
        <motion.button
          onClick={onBack}
          className="text-gray-400 hover:text-gray-600 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ArrowLeft className="w-5 h-5" />
        </motion.button>

        <img
          src={helper.photo}
          alt={helper.name}
          className="w-10 h-10 rounded-full object-cover"
        />

        <div className="flex-1">
          <h3 className="font-semibold text-gray-900">{helper.name}</h3>
          <div className="flex items-center space-x-1">
            <StatusIcon className={`w-3 h-3 ${getStatusInfo().color} fill-current`} />
            <span className="text-sm text-gray-600">{getStatusInfo().label}</span>
          </div>
        </div>
      </motion.div>

      {/* Cuerpo del chat */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {messages.map((message, index) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs px-4 py-2 rounded-2xl ${
                message.sender === 'system'
                  ? 'bg-gray-200 text-gray-700 text-center text-sm mx-auto'
                  : message.sender === 'user'
                  ? 'bg-blue-600 text-white rounded-br-none'
                  : 'bg-white text-gray-900 rounded-bl-none border border-gray-200'
              }`}
            >
              {message.content}
            </div>
          </motion.div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Mensajes sugeridos (chips) */}
      {messages.length <= 1 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.3 }}
          className="px-4 pb-2"
        >
          <div className="flex space-x-2 overflow-x-auto">
            {suggestedMessages.map((suggestion, index) => (
              <motion.button
                key={suggestion}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + index * 0.1, duration: 0.2 }}
                onClick={() => handleQuickReply(suggestion)}
                className="bg-white border border-gray-300 text-gray-700 px-3 py-1 rounded-full text-sm whitespace-nowrap hover:bg-gray-50 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {suggestion}
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}

      {/* Input */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.3 }}
        className="bg-white border-t border-gray-200 px-4 py-3"
      >
        <div className="flex items-center space-x-2">
          <motion.button
            className="text-gray-400 hover:text-gray-600 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Camera className="w-5 h-5" />
          </motion.button>

          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Escribe un mensaje..."
            className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <motion.button
            onClick={handleSendMessage}
            disabled={!inputText.trim()}
            className={`p-2 rounded-full transition-colors ${
              inputText.trim()
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
            whileHover={{ scale: inputText.trim() ? 1.1 : 1 }}
            whileTap={{ scale: inputText.trim() ? 0.9 : 1 }}
          >
            <Send className="w-4 h-4" />
          </motion.button>
        </div>

        {/* Botón para finalizar ayuda */}
        
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.3 }}
            onClick={onComplete}
            className="w-full mt-3 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors text-sm"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            🏁 Finalizar ayuda
          </motion.button>

        {/* Botón para reportar problema */}
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.3 }}
          onClick={onReport}
          className="w-full mt-2 bg-red-50 hover:bg-red-100 text-red-600 font-medium py-2 px-4 rounded-lg transition-colors text-sm border border-red-200"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          🚨 Reportar un problema
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
