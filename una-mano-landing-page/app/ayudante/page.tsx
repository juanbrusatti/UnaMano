'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Toggle } from '@/components/ui/toggle';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

export default function AyudantePage() {
  const [isAvailable, setIsAvailable] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading user's current availability status
  useEffect(() => {
    // TODO: Fetch current availability status from the server
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handleToggleAvailability = async () => {
    setIsLoading(true);
    try {
      // TODO: Update availability status on the server
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API call
      setIsAvailable(!isAvailable);
    } catch (error) {
      console.error('Error updating availability:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold text-center mb-8">Panel del Ayudante</h1>
      
      <Card className="w-full max-w-md mx-auto shadow-lg overflow-hidden">
        <div className={`h-2 ${isAvailable ? 'bg-green-500' : 'bg-gray-300'}`}></div>
        <CardHeader className="text-center pt-8 pb-6">
          <div className={`mx-auto flex items-center justify-center h-16 w-16 rounded-full ${isAvailable ? 'bg-green-100' : 'bg-gray-100'} mb-4`}>
            {isAvailable ? (
              <svg className="h-8 w-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg className="h-8 w-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
          </div>
          <CardTitle className={`text-2xl font-semibold ${isAvailable ? 'text-green-700' : 'text-gray-700'}`}>
            {isAvailable ? 'Estás disponible' : 'No estás disponible'}
          </CardTitle>
          <CardDescription className="mt-2 text-gray-500">
            {isAvailable 
              ? 'Te notificaremos cuando alguien necesite ayuda cerca de ti.'
              : 'Activa el botón para estar disponible y ayudar a otros.'}
          </CardDescription>
        </CardHeader>
        <CardContent className="px-8 pb-8">
          <button
            onClick={handleToggleAvailability}
            disabled={isLoading}
            className={`w-full py-4 px-6 rounded-xl text-lg font-medium transition-all duration-300 flex items-center justify-center space-x-3 ${
              isAvailable
                ? 'bg-green-50 text-green-700 border-2 border-green-200 hover:bg-green-100 hover:border-green-300'
                : 'bg-gray-50 text-gray-700 border-2 border-gray-200 hover:bg-gray-100 hover:border-gray-300'
            } focus:outline-none focus:ring-2 focus:ring-offset-2 ${
              isAvailable ? 'focus:ring-green-300' : 'focus:ring-gray-300'
            }`}
          >
            {isLoading ? (
              <Loader2 className="h-6 w-6 animate-spin" />
            ) : (
              <>
                <span className={`inline-flex items-center justify-center h-6 w-6 rounded-full mr-2 ${
                  isAvailable ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-500'
                }`}>
                  {isAvailable ? '✓' : '○'}
                </span>
                <span>{isAvailable ? 'Disponible' : 'No disponible'}</span>
                <span className={`ml-auto text-sm font-normal ${
                  isAvailable ? 'text-green-600' : 'text-gray-500'
                }`}>
                  {isAvailable ? 'Activado' : 'Desactivado'}
                </span>
              </>
            )}
          </button>
          
          <p className="mt-6 text-center text-gray-500 text-sm">
            {isAvailable ? (
              <>
                <span className="flex items-center justify-center">
                  <svg className="h-4 w-4 text-green-500 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 3.636a1 1 0 010 1.414 7 7 0 109.9 0 1 1 0 111.414-1.414 9 9 0 11-12.728 0 1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Estás visible para personas que necesiten ayuda
                </span>
              </>
            ) : (
              'Cuando actives la disponibilidad, podrás recibir solicitudes de ayuda cercanas.'
            )}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
