'use client';

import React, { useEffect, useRef } from 'react';

export default function StarCursor() {
  const starRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Respect user preference for reduced motion
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReducedMotion) return;

    const starEl = starRef.current;
    if (!starEl) return;

    // Initialize position in the center
    let starX = window.innerWidth / 2;
    let starY = window.innerHeight / 2;
    let mouseX = starX;
    let mouseY = starY;

    const speed = 8;
    let animationFrameId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    document.addEventListener('mousemove', onMouseMove);

    const animate = () => {
      const diffX = mouseX - starX;
      const diffY = mouseY - starY;
      const distance = Math.sqrt(diffX ** 2 + diffY ** 2);

      let scaleX = 1;

      // Follow cursor logic
      if (distance > 10) {
        starX += (diffX / distance) * speed;
        starY += (diffY / distance) * speed;
        
        // Flip the icon based on the horizontal direction it is moving
        if (diffX < 0) {
            scaleX = -1; // Moving left, flip horizontally
        } else {
            scaleX = 1; // Moving right, face normal
        }
      }

      // Update element position
      starEl.style.left = `${starX}px`;
      starEl.style.top = `${starY}px`;
      
      // Update SVG transform (flip instead of spin, so custom icons look good)
      const svg = starEl.querySelector('svg');
      if (svg) {
        // We use a small rotation to make it feel dynamic + flip direction
        const rotation = (diffX / distance) * 15 || 0; // Lean into the movement
        svg.style.transform = `scaleX(${scaleX}) rotate(${scaleX === -1 ? -rotation : rotation}deg)`;
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      ref={starRef}
      style={{
        position: 'fixed',
        pointerEvents: 'none',
        zIndex: 999999,
        width: '32px',
        height: '32px',
        transform: 'translate(-50%, -50%)',
        willChange: 'left, top',
      }}
    >
      <svg
        viewBox="0 0 24 24"
        fill="#FFD700"
        stroke="#FFA500"
        strokeWidth="1"
        style={{
          width: '100%',
          height: '100%',
          filter: 'drop-shadow(0 0 8px rgba(255, 215, 0, 0.8))',
          willChange: 'transform',
          transition: 'transform 0.1s ease',
        }}
      >
        <path d="M7.82 19H15V18C15 15.79 16.79 14 19 14H19.74L17.84 5.56C17.63 4.65 16.82 4 15.89 4H12V6H15.89L17.29 12.25H17.28C15.12 12.9 13.47 14.73 13.09 17H7.82C7.34 15.66 5.96 14.76 4.4 15.06C3.22 15.29 2.27 16.26 2.05 17.44C1.7 19.34 3.16 21 5 21C6.3 21 7.4 20.16 7.82 19M5 19C4.45 19 4 18.55 4 18S4.45 17 5 17 6 17.45 6 18 5.55 19 5 19M19 15C17.34 15 16 16.34 16 18S17.34 21 19 21 22 19.66 22 18 20.66 15 19 15M19 19C18.45 19 18 18.55 18 18S18.45 17 19 17 20 17.45 20 18 19.55 19 19 19Z" />
      </svg>
    </div>
  );
}
