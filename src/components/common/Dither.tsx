"use client";

import { useRef, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const waveVertexShader = `
precision highp float;
varying vec2 vUv;
void main() {
  vUv = uv;
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  vec4 viewPosition = viewMatrix * modelPosition;
  gl_Position = projectionMatrix * viewPosition;
}
`;

const waveFragmentShader = `
precision highp float;
uniform vec2 resolution;
uniform float time;
uniform float waveSpeed;
uniform float waveFrequency;
uniform float waveAmplitude;
uniform vec3 waveColor;
uniform vec2 mousePos;
uniform int enableMouseInteraction;
uniform float mouseRadius;
uniform float colorNum;
uniform float pixelSize;
uniform sampler2D uMap;

vec4 mod289(vec4 x) { return x - floor(x * (1.0/289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
vec2 fade(vec2 t) { return t*t*t*(t*(t*6.0-15.0)+10.0); }

float cnoise(vec2 P) {
  vec4 Pi = floor(P.xyxy) + vec4(0.0,0.0,1.0,1.0);
  vec4 Pf = fract(P.xyxy) - vec4(0.0,0.0,1.0,1.0);
  Pi = mod289(Pi);
  vec4 ix = Pi.xzxz;
  vec4 iy = Pi.yyww;
  vec4 fx = Pf.xzxz;
  vec4 fy = Pf.yyww;
  vec4 i = permute(permute(ix) + iy);
  vec4 gx = fract(i * (1.0/41.0)) * 2.0 - 1.0;
  vec4 gy = abs(gx) - 0.5;
  vec4 tx = floor(gx + 0.5);
  gx = gx - tx;
  vec2 g00 = vec2(gx.x, gy.x);
  vec2 g10 = vec2(gx.y, gy.y);
  vec2 g01 = vec2(gx.z, gy.z);
  vec2 g11 = vec2(gx.w, gy.w);
  vec4 norm = taylorInvSqrt(vec4(dot(g00,g00), dot(g01,g01), dot(g10,g10), dot(g11,g11)));
  g00 *= norm.x; g01 *= norm.y; g10 *= norm.z; g11 *= norm.w;
  float n00 = dot(g00, vec2(fx.x, fy.x));
  float n10 = dot(g10, vec2(fx.y, fy.y));
  float n01 = dot(g01, vec2(fx.z, fy.z));
  float n11 = dot(g11, vec2(fx.w, fy.w));
  vec2 fade_xy = fade(Pf.xy);
  vec2 n_x = mix(vec2(n00, n01), vec2(n10, n11), fade_xy.x);
  return 2.3 * mix(n_x.x, n_x.y, fade_xy.y);
}

const int OCTAVES = 4;
float fbm(vec2 p) {
  float value = 0.0;
  float amp = 1.0;
  float freq = waveFrequency;
  for (int i = 0; i < OCTAVES; i++) {
    value += amp * abs(cnoise(p));
    p *= freq;
    amp *= waveAmplitude;
  }
  return value;
}

float pattern(vec2 p) {
  vec2 p2 = p - time * waveSpeed;
  return fbm(p + fbm(p2)); 
}

const float bayerMatrix8x8[64] = float[64](
  0.0/64.0, 48.0/64.0, 12.0/64.0, 60.0/64.0,  3.0/64.0, 51.0/64.0, 15.0/64.0, 63.0/64.0,
  32.0/64.0,16.0/64.0, 44.0/64.0, 28.0/64.0, 35.0/64.0,19.0/64.0, 47.0/64.0, 31.0/64.0,
  8.0/64.0, 56.0/64.0,  4.0/64.0, 52.0/64.0, 11.0/64.0,59.0/64.0,  7.0/64.0, 55.0/64.0,
  40.0/64.0,24.0/64.0, 36.0/64.0, 20.0/64.0, 43.0/64.0,27.0/64.0, 39.0/64.0, 23.0/64.0,
  2.0/64.0, 50.0/64.0, 14.0/64.0, 62.0/64.0,  1.0/64.0,49.0/64.0, 13.0/64.0, 61.0/64.0,
  34.0/64.0,18.0/64.0, 46.0/64.0, 30.0/64.0, 33.0/64.0,17.0/64.0, 45.0/64.0, 29.0/64.0,
  10.0/64.0,58.0/64.0,  6.0/64.0, 54.0/64.0,  9.0/64.0,57.0/64.0,  5.0/64.0, 53.0/64.0,
  42.0/64.0,26.0/64.0, 38.0/64.0, 22.0/64.0, 41.0/64.0,25.0/64.0, 37.0/64.0, 21.0/64.0
);

vec3 dither(vec2 uv, vec3 color) {
  vec2 scaledCoord = floor(uv * resolution / pixelSize);
  int x = int(mod(scaledCoord.x, 8.0));
  int y = int(mod(scaledCoord.y, 8.0));
  float threshold = bayerMatrix8x8[y * 8 + x] - 0.25;
  float step = 1.0 / (colorNum - 1.0);
  color += threshold * step;
  float bias = 0.2;
  color = clamp(color - bias, 0.0, 1.0);
  return floor(color * (colorNum - 1.0) + 0.5) / (colorNum - 1.0);
}

void main() {
  vec2 stretchUv = gl_FragCoord.xy / resolution.xy;
  vec2 fitUv = stretchUv;
  
  float mapAspect = 2000.0 / 857.0; // Aspect ratio of simplemaps world map
  float screenAspect = resolution.x / resolution.y;
  
  if (screenAspect > mapAspect) {
    float scaleY = mapAspect / screenAspect;
    fitUv.y = (fitUv.y - 0.5) / scaleY + 0.5;
  } else {
    float scaleX = screenAspect / mapAspect;
    fitUv.x = (fitUv.x - 0.5) / scaleX + 0.5;
  }
  
  // Blend 55% perfect aspect ratio fit and 45% full screen stretch to pull the map edges inwards
  vec2 mapUv = mix(fitUv, stretchUv, 0.45);
  
  // Scale by 0.95 (zoom out slightly) to ensure Australia & New Zealand on the right are fully visible
  mapUv = (mapUv - 0.5) / 0.95 + 0.5;
  
  // Determine if this pixel is on land (inside the continents)
  float isLand = 0.0;
  if (mapUv.x >= 0.0 && mapUv.x <= 1.0 && mapUv.y >= 0.0 && mapUv.y <= 1.0) {
    vec4 mapColor = texture2D(uMap, mapUv);
    isLand = mapColor.a > 0.05 ? 1.0 : 0.0;
  }
  
  vec2 normalizedPixelSize = pixelSize / resolution;
  vec2 uvPixel = normalizedPixelSize * floor(gl_FragCoord.xy / pixelSize);
  
  vec2 uvNoise = uvPixel - 0.5;
  uvNoise.x *= resolution.x / resolution.y;
  
  float f = pattern(uvNoise);
  
  if (enableMouseInteraction == 1) {
    vec2 mouseNDC = (mousePos / resolution - 0.5) * vec2(1.0, -1.0);
    mouseNDC.x *= resolution.x / resolution.y;
    float dist = length(uvNoise - mouseNDC);
    float effect = 1.0 - smoothstep(0.0, mouseRadius, dist);
    f -= 0.5 * effect;
  }
  
  // Mix between a base level of continental glow and the wave ripples
  // The effect is masked by isLand so it only renders on the world map continents!
  float intensity = mix(0.12, 1.0, clamp(f, 0.0, 1.0)) * isLand;
  
  vec3 col = waveColor * intensity;
  float maxColorVal = max(waveColor.r, max(waveColor.g, waveColor.b));
  
  vec3 ditheredCol = vec3(0.0);
  float alpha = 0.0;
  
  if (maxColorVal < 0.6) {
    // Light mode: Pure dark dots on light background
    // Dither virtual white/gray to produce the bayer pattern properly
    vec3 virtualCol = vec3(1.0) * intensity;
    vec3 dCol = dither(gl_FragCoord.xy / resolution.xy, virtualCol);
    float ditheredVal = max(dCol.r, max(dCol.g, dCol.b));
    
    ditheredCol = waveColor; // Output color is exactly the dark gray we passed
    alpha = clamp(ditheredVal * 0.18, 0.0, 1.0); // Solid visible opacity for light mode
  } else {
    // Dark mode: Dynamic neon colors on dark background
    vec3 dCol = dither(gl_FragCoord.xy / resolution.xy, col);
    float ditheredVal = max(dCol.r, max(dCol.g, dCol.b));
    
    ditheredCol = dCol; // Output color is dithered neon color
    alpha = clamp(ditheredVal * 0.28, 0.0, 1.0); // Original dark mode opacity
  }
  
  gl_FragColor = vec4(ditheredCol, alpha);
}
`;

interface WaveUniforms {
  [key: string]: THREE.IUniform<any>;
  time: THREE.IUniform<number>;
  resolution: THREE.IUniform<THREE.Vector2>;
  waveSpeed: THREE.IUniform<number>;
  waveFrequency: THREE.IUniform<number>;
  waveAmplitude: THREE.IUniform<number>;
  waveColor: THREE.IUniform<THREE.Color>;
  mousePos: THREE.IUniform<THREE.Vector2>;
  enableMouseInteraction: THREE.IUniform<number>;
  mouseRadius: THREE.IUniform<number>;
  colorNum: THREE.IUniform<number>;
  pixelSize: THREE.IUniform<number>;
  uMap: THREE.IUniform<THREE.Texture | null>;
}

interface DitheredWavesProps {
  waveSpeed: number;
  waveFrequency: number;
  waveAmplitude: number;
  waveColor: [number, number, number];
  colorNum: number;
  pixelSize: number;
  disableAnimation: boolean;
  enableMouseInteraction: boolean;
  mouseRadius: number;
  mapTexture: THREE.CanvasTexture;
}

function DitheredWaves({
  waveSpeed,
  waveFrequency,
  waveAmplitude,
  waveColor,
  colorNum,
  pixelSize,
  disableAnimation,
  enableMouseInteraction,
  mouseRadius,
  mapTexture,
}: DitheredWavesProps) {
  const mesh = useRef<THREE.Mesh>(null);
  const mouseRef = useRef(new THREE.Vector2());
  const { viewport, size, gl } = useThree();

  const waveUniformsRef = useRef<WaveUniforms>({
    time: { value: 0 },
    resolution: { value: new THREE.Vector2(0, 0) },
    waveSpeed: { value: waveSpeed },
    waveFrequency: { value: waveFrequency },
    waveAmplitude: { value: waveAmplitude },
    waveColor: { value: new THREE.Color(...waveColor) },
    mousePos: { value: new THREE.Vector2(0, 0) },
    enableMouseInteraction: { value: enableMouseInteraction ? 1 : 0 },
    mouseRadius: { value: mouseRadius },
    colorNum: { value: colorNum },
    pixelSize: { value: pixelSize },
    uMap: { value: mapTexture },
  });

  useEffect(() => {
    const dpr = gl.getPixelRatio();
    const newWidth = Math.floor(size.width * dpr);
    const newHeight = Math.floor(size.height * dpr);
    const currentRes = waveUniformsRef.current.resolution.value;
    if (currentRes.x !== newWidth || currentRes.y !== newHeight) {
      currentRes.set(newWidth, newHeight);
    }
  }, [size, gl]);

  // Keep texture reference updated in uniforms if it changes
  useEffect(() => {
    waveUniformsRef.current.uMap.value = mapTexture;
  }, [mapTexture]);

  // Global mouse event listener to capture mouse position anywhere on the screen
  useEffect(() => {
    if (!enableMouseInteraction) return;
    const handleWindowMouseMove = (e: MouseEvent) => {
      const rect = gl.domElement.getBoundingClientRect();
      const dpr = gl.getPixelRatio();
      mouseRef.current.set(
          (e.clientX - rect.left) * dpr,
          (e.clientY - rect.top) * dpr
      );
    };
    window.addEventListener("mousemove", handleWindowMouseMove);
    return () => window.removeEventListener("mousemove", handleWindowMouseMove);
  }, [enableMouseInteraction, gl]);

  const prevColor = useRef([...waveColor]);
  useFrame(({ clock }) => {
    const u = waveUniformsRef.current;

    if (!disableAnimation) {
      u.time.value = clock.getElapsedTime();
    }

    if (u.waveSpeed.value !== waveSpeed) u.waveSpeed.value = waveSpeed;
    if (u.waveFrequency.value !== waveFrequency) u.waveFrequency.value = waveFrequency;
    if (u.waveAmplitude.value !== waveAmplitude) u.waveAmplitude.value = waveAmplitude;
    if (u.colorNum.value !== colorNum) u.colorNum.value = colorNum;
    if (u.pixelSize.value !== pixelSize) u.pixelSize.value = pixelSize;

    if (!prevColor.current.every((v, i) => v === waveColor[i])) {
      u.waveColor.value.set(...waveColor);
      prevColor.current = [...waveColor];
    }

    u.enableMouseInteraction.value = enableMouseInteraction ? 1 : 0;
    u.mouseRadius.value = mouseRadius;

    if (enableMouseInteraction) {
      u.mousePos.value.copy(mouseRef.current);
    }
  });

  return (
      <mesh ref={mesh} scale={[viewport.width, viewport.height, 1]}>
        <planeGeometry args={[1, 1]} />
        <shaderMaterial
            vertexShader={waveVertexShader}
            fragmentShader={waveFragmentShader}
            uniforms={waveUniformsRef.current}
            transparent={true}
            depthWrite={false}
        />
      </mesh>
  );
}

interface DitherProps {
  waveSpeed?: number;
  waveFrequency?: number;
  waveAmplitude?: number;
  waveColor?: [number, number, number];
  colorNum?: number;
  pixelSize?: number;
  disableAnimation?: boolean;
  enableMouseInteraction?: boolean;
  mouseRadius?: number;
}

export default function Dither({
  waveSpeed = 0.05,
  waveFrequency = 3,
  waveAmplitude = 0.3,
  waveColor = [0.05, 0.08, 0.18],
  colorNum = 4,
  pixelSize = 2,
  disableAnimation = false,
  enableMouseInteraction = true,
  mouseRadius = 1,
}: DitherProps) {
  const [mounted, setMounted] = useState(false);
  const [mapTexture, setMapTexture] = useState<THREE.CanvasTexture | null>(null);
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Monitor theme changes on root html tag to update wave colors
  useEffect(() => {
    if (!mounted) return;
    setIsLight(document.documentElement.classList.contains("light"));

    const observer = new MutationObserver(() => {
      setIsLight(document.documentElement.classList.contains("light"));
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, [mounted]);

  // Safe client-side vector parsing and canvas rendering of the world map SVG
  useEffect(() => {
    if (!mounted) return;

    fetch("/world-map-solid.svg")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch world map");
        return res.text();
      })
      .then((svgText) => {
        const parser = new DOMParser();
        const svgDoc = parser.parseFromString(svgText, "image/svg+xml");
        
        // Retrieve viewBox resolution bounds
        const svgElement = svgDoc.querySelector("svg");
        const viewBox = svgElement?.getAttribute("viewBox") || svgElement?.getAttribute("viewbox") || "0 0 2000 857";
        const [, , wStr, hStr] = viewBox.split(" ");
        const width = parseFloat(wStr) || 2000;
        const height = parseFloat(hStr) || 857;

        // Render to offscreen canvas
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        
        if (ctx) {
          ctx.clearRect(0, 0, width, height);
          
          const paths = svgDoc.getElementsByTagName("path");
          for (let i = 0; i < paths.length; i++) {
            const p = paths[i];
            const d = p.getAttribute("d");
            if (d) {
              ctx.fillStyle = "#ffffff";
              
              // Rasterize SVG path string natively
              const path2D = new Path2D(d);
              ctx.fill(path2D);
            }
          }
          
          const texture = new THREE.CanvasTexture(canvas);
          texture.minFilter = THREE.LinearFilter;
          texture.magFilter = THREE.LinearFilter;
          texture.needsUpdate = true;
          setMapTexture(texture);
        }
      })
      .catch((err) => {
        console.error("Could not load /world-map-solid.svg texture:", err);
      });
  }, [mounted]);

  // Prevent SSR crashes by rendering only on the client once mounted and texture is ready
  if (!mounted || !mapTexture) return null;

  // Gray #404040 [0.25, 0.25, 0.25] only for milk-white theme, normal neon blue for dark theme
  const activeWaveColor: [number, number, number] = isLight
    ? [0.25, 0.25, 0.25] // Dark Gray (#404040) for milk white theme
    : waveColor;        // Revert to original neon blue/indigo for dark theme

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      <Canvas
        className="w-full h-full"
        camera={{ position: [0, 0, 6] }}
        dpr={1}
        gl={{ antialias: true, alpha: true, preserveDrawingBuffer: true }}
      >
        <DitheredWaves
          waveSpeed={waveSpeed}
          waveFrequency={waveFrequency}
          waveAmplitude={waveAmplitude}
          waveColor={activeWaveColor}
          colorNum={colorNum}
          pixelSize={pixelSize}
          disableAnimation={disableAnimation}
          enableMouseInteraction={enableMouseInteraction}
          mouseRadius={mouseRadius}
          mapTexture={mapTexture}
        />
      </Canvas>
    </div>
  );
}
