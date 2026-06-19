'use client';

import Script from 'next/script';
import React, { useEffect } from 'react';

export type PetType = 'cat' | 'dog' | 'tiger';

interface PetCursorProps {
  /** The type of pet to display. Defaults to 'cat' */
  pet?: PetType;
}

export default function PetCursor({ pet = 'cat' }: PetCursorProps) {
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
    const nekoEl = document.getElementById('oneko');
    if (nekoEl) {
      nekoEl.style.backgroundImage = `url(${petFile})`;
    }
  }, [petFile]);

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
