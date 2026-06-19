"use client";

import { useRef, useEffect, useState, useCallback, ReactNode, CSSProperties } from "react";
import { gsap } from "gsap";
import "./pixel-transition.css";

interface PixelTransitionProps {
  firstContent: ReactNode;
  secondContent: ReactNode;
  gridSize?: number;
  pixelColor?: string;
  animationStepDuration?: number;
  once?: boolean;
  className?: string;
  style?: CSSProperties;
}

export default function PixelTransition({
  firstContent,
  secondContent,
  gridSize = 7,
  pixelColor = "currentColor",
  animationStepDuration = 0.3,
  once = false,
  className = "",
  style = {},
}: PixelTransitionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pixelGridRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef<HTMLDivElement>(null);
  const delayedCallRef = useRef<gsap.core.Tween | null>(null);

  const [isActive, setIsActive] = useState(false);

  // Build the pixel grid
  useEffect(() => {
    const pixelGridEl = pixelGridRef.current;
    if (!pixelGridEl) return;

    pixelGridEl.innerHTML = "";

    for (let row = 0; row < gridSize; row++) {
      for (let col = 0; col < gridSize; col++) {
        const pixel = document.createElement("div");
        pixel.classList.add("pixel-transition__pixel");
        pixel.style.backgroundColor = pixelColor;

        const size = 100 / gridSize;
        pixel.style.width = `${size}%`;
        pixel.style.height = `${size}%`;
        pixel.style.position = "absolute";
        pixel.style.left = `${col * size}%`;
        pixel.style.top = `${row * size}%`;

        pixelGridEl.appendChild(pixel);
      }
    }
  }, [gridSize, pixelColor]);

  const animatePixels = useCallback(
    (activate: boolean) => {
      const pixelGridEl = pixelGridRef.current;
      const activeEl = activeRef.current;
      if (!pixelGridEl || !activeEl) return;

      const pixels = pixelGridEl.querySelectorAll(".pixel-transition__pixel");
      if (!pixels.length) return;

      // Kill any pending delayed call
      if (delayedCallRef.current) {
        delayedCallRef.current.kill();
        delayedCallRef.current = null;
      }
      
      // Kill all running tweens on the pixels so they don't conflict when moving mouse quickly
      gsap.killTweensOf(pixels);

      if (activate) {
        // Animate pixels IN (cover the first content)
        gsap.to(pixels, {
          opacity: 1,
          duration: animationStepDuration,
          stagger: {
            amount: animationStepDuration,
            from: "random",
          },
          onComplete: () => {
            // Show the second content
            setIsActive(true);
            activeEl.classList.add("is-visible");

            // Then animate pixels OUT to reveal second content
            gsap.to(pixels, {
              opacity: 0,
              duration: animationStepDuration,
              delay: 0.1,
              stagger: {
                amount: animationStepDuration,
                from: "random",
              },
            });
          },
        });
      } else {
        // Animate pixels IN (cover the second content)
        gsap.to(pixels, {
          opacity: 1,
          duration: animationStepDuration,
          stagger: {
            amount: animationStepDuration,
            from: "random",
          },
          onComplete: () => {
            // Hide the second content
            setIsActive(false);
            activeEl.classList.remove("is-visible");

            // Then animate pixels OUT to reveal first content
            gsap.to(pixels, {
              opacity: 0,
              duration: animationStepDuration,
              delay: 0.1,
              stagger: {
                amount: animationStepDuration,
                from: "random",
              },
            });
          },
        });
      }
    },
    [animationStepDuration]
  );

  const handleEnter = useCallback(() => {
    animatePixels(true);
  }, [animatePixels]);

  const handleLeave = useCallback(() => {
    if (once) return;
    animatePixels(false);
  }, [animatePixels, once]);

  // Check for touch device on client side
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  useEffect(() => {
    setIsTouchDevice(
      "ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        window.matchMedia("(pointer: coarse)").matches
    );
  }, []);

  return (
    <div
      ref={containerRef}
      className={`pixel-transition ${className}`}
      style={style}
      onMouseEnter={isTouchDevice ? undefined : handleEnter}
      onMouseLeave={isTouchDevice ? undefined : handleLeave}
      onClick={isTouchDevice ? () => animatePixels(!isActive) : undefined}
    >
      <div className="pixel-transition__content">
        <div className="pixel-transition__default">{firstContent}</div>
        <div ref={activeRef} className="pixel-transition__active">
          {secondContent}
        </div>
        <div ref={pixelGridRef} className="pixel-transition__grid" />
      </div>
    </div>
  );
}
