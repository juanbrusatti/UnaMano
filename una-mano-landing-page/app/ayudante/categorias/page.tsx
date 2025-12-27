'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Wrench, Droplets, PlugZap, Home, Scissors, HandHelping } from 'lucide-react';

const categories = [
  { id: 'plomero', name: 'Plomero', icon: <Droplets className="h-6 w-6" /> },
  { id: 'gasista', name: 'Gasista', icon: <Droplets className="h-6 w-6" /> },
  { id: 'electricista', name: 'Electricista', icon: <PlugZap className="h-6 w-6" /> },
  { id: 'albañil', name: 'Albañil', icon: <Home className="h-6 w-6" /> },
  { id: 'jardinero', name: 'Jardinero', icon: <Scissors className="h-6 w-6" /> },
  { id: 'ayudante', name: 'Ayudante Casual', icon: <HandHelping className="h-6 w-6" /> },
  { id: 'tecnico', name: 'Técnico en Aire Acondicionado', icon: <Wrench className="h-6 w-6" /> },
  { id: 'pintor', name: 'Pintor', icon: <Wrench className="h-6 w-6" /> },
];

export default function CategoriasPage() {
  const router = useRouter();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories(prev => 
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleContinue = () => {
    if (selectedCategories.length === 0) return;
    setIsSubmitting(true);
    // guardar categorias en el backend
    setTimeout(() => {
      router.push('/ayudante');
    }, 500);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-3xl font-bold text-center mb-2">¿En qué podés ayudar?</h1>
      <p className="text-center text-gray-600 mb-8">
        Seleccioná las categorías en las que te sentís cómodo ayudando a otros
      </p>
      
      <Card className="w-full max-w-2xl mx-auto shadow-lg overflow-hidden">
        <div className="h-2 bg-blue-500"></div>
        <CardHeader className="text-center pt-8 pb-6">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 mb-4">
            <Wrench className="h-8 w-8 text-blue-600" />
          </div>
          <CardTitle className="text-2xl font-semibold text-gray-800">
            Tus habilidades
          </CardTitle>
          <CardDescription className="mt-2 text-gray-500">
            Seleccioná todas las categorías en las que podés ofrecer ayuda
          </CardDescription>
        </CardHeader>
        
        <CardContent className="px-6 pb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
            {categories.map((category) => {
              const isSelected = selectedCategories.includes(category.id);
              return (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => toggleCategory(category.id)}
                  className={`flex items-center p-4 rounded-lg border-2 transition-all duration-200 ${
                    isSelected
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:border-blue-300 bg-white hover:bg-gray-50'
                  }`}
                >
                  <div className={`p-2 rounded-full mr-3 ${
                    isSelected ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-500'
                  }`}>
                    {category.icon}
                  </div>
                  <span className="font-medium text-left">{category.name}</span>
                  {isSelected && (
                    <CheckCircle2 className="ml-auto h-5 w-5 text-blue-500" />
                  )}
                </button>
              );
            })}
          </div>
          
          <Button
            onClick={handleContinue}
            disabled={selectedCategories.length === 0 || isSubmitting}
            className="w-full py-6 text-lg font-medium transition-colors"
          >
            {isSubmitting ? (
              'Cargando...'
            ) : (
              `Continuar con ${selectedCategories.length} ${selectedCategories.length === 1 ? 'categoría' : 'categorías'}`
            )}
          </Button>
          
          <p className="mt-4 text-center text-sm text-gray-500">
            Podrás modificar estas preferencias más adelante en tu perfil.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
