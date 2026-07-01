'use client';

import Script from 'next/script';
import React, { useEffect, useState } from 'react';

export type PetType = 'cat' | 'dog' | 'tiger';

interface PetCursorProps {
  /** The type of pet to display. Defaults to 'cat' */
  pet?: PetType;
}

export default function PetCursor({ pet = 'cat' }: PetCursorProps) {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkDesktop = () => {
      // Check both pointer capability and screen width to strictly target desktops
      const isFinePointer = window.matchMedia('(pointer: fine)').matches;
      const isLargeScreen = window.innerWidth >= 1024;
      setIsDesktop(isFinePointer && isLargeScreen);
    };
    
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  const getPetFile = (p: PetType) => {
    switch (p) {
      case 'dog':
        return '/dog.gif';
      case 'tiger':
        return '/tora.gif';
      case 'cat':
      default:
        return '/oneko.gif';
    }
  };

  const petFile = getPetFile(pet);

  // If the component is already loaded and the user changes the pet prop, 
  // we dynamically update the background image of the existing pet element.
  useEffect(() => {
    if (!isDesktop) return;
    const nekoEl = document.getElementById('oneko');
    if (nekoEl) {
      nekoEl.style.backgroundImage = `url(${petFile})`;
    }
  }, [petFile, isDesktop]);

  if (!isDesktop) return null;

  // Load the script and pass the initial pet file path
  return (
    <Script 
      src="/oneko.js" 
      strategy="afterInteractive" 
      data-cat={petFile} 
      onLoad={() => {
        const nekoEl = document.getElementById('oneko');
        if (nekoEl) {
          nekoEl.style.backgroundImage = `url(${petFile})`;
        }
      }}
    />
  );
}
