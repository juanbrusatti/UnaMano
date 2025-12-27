'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

// Esta página redirige a la selección de categorías
export default function AyudantePage() {
  const router = useRouter();
  
  useEffect(() => {
    // Redirigir a la selección de categorías
    router.push('/ayudante/categorias');
  }, [router]);
  
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Loader2 className="h-8 w-8 animate-spin" />
    </div>
  );
}
