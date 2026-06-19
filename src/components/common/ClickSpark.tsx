'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SparkEvent {
  id: number;
  x: number;
  y: number;
}

interface ClickSparkProps {
  sparkColor?: string;
  sparkCount?: number;
  sparkRadius?: number;
  sparkSize?: number;
  duration?: number;
}

export default function ClickSpark({
  sparkColor = '#fff',
  sparkCount = 8,
  sparkRadius = 40,
  sparkSize = 10,
  duration = 400,
}: ClickSparkProps) {
  const [sparks, setSparks] = useState<SparkEvent[]>([]);

  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      // Create a unique ID for each click event
      const newSpark = { id: Date.now(), x: e.clientX, y: e.clientY };
      setSparks((prev) => [...prev, newSpark]);

      // Remove the spark from state after the animation completes
      setTimeout(() => {
        setSparks((prev) => prev.filter((s) => s.id !== newSpark.id));
      }, duration);
    };

    window.addEventListener('click', handleGlobalClick);
    return () => window.removeEventListener('click', handleGlobalClick);
  }, [duration]);

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 999999 }}>
      <AnimatePresence>
        {sparks.map((spark) => (
          <div
            key={spark.id}
            style={{
              position: 'absolute',
              left: spark.x,
              top: spark.y,
            }}
          >
            {Array.from({ length: sparkCount }).map((_, index) => {
              const angle = (index / sparkCount) * Math.PI * 2;
              const angleDeg = angle * (180 / Math.PI);
              
              // Calculate end coordinates
              const targetX = Math.cos(angle) * sparkRadius;
              const targetY = Math.sin(angle) * sparkRadius;

              return (
                <motion.div
                  key={index}
                  initial={{ 
                    x: 0, 
                    y: 0, 
                    scaleX: 0, 
                    opacity: 1,
                    rotate: angleDeg 
                  }}
                  animate={{ 
                    x: targetX, 
                    y: targetY, 
                    scaleX: 1, 
                    opacity: 0 
                  }}
                  transition={{ 
                    duration: duration / 1000, 
                    ease: "easeOut" 
                  }}
                  style={{
                    position: 'absolute',
                    width: sparkSize,
                    height: 2,
                    backgroundColor: sparkColor,
                    transformOrigin: 'left center',
                    borderRadius: '2px',
                    boxShadow: `0 0 6px ${sparkColor}`,
                  }}
                />
              );
            })}
          </div>
        ))}
      </AnimatePresence>
    </div>
  );
}
