/**
 * star.js
 * A lightweight vanilla JS script that creates a glowing star that follows the cursor.
 * Just include this script in your HTML file to use it!
 */
(function initStarCursor() {
  // Respect user preference for reduced motion
  const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (isReducedMotion) return;

  // Create the main container for the star
  const starEl = document.createElement('div');
  starEl.id = 'star-cursor';
  
  // Style the container so it floats above everything and ignores clicks
  Object.assign(starEl.style, {
    position: 'fixed',
    pointerEvents: 'none',
    zIndex: '999999',
    width: '32px',
    height: '32px',
    transform: 'translate(-50%, -50%)',
    willChange: 'left, top',
  });

  // Inject a glowing golden star SVG
  starEl.innerHTML = `
    <svg viewBox="0 0 24 24" fill="#FFD700" stroke="#FFA500" stroke-width="1" 
         style="width: 100%; height: 100%; filter: drop-shadow(0 0 8px rgba(255, 215, 0, 0.8)); will-change: transform;">
        <path d="M7.82 19H15V18C15 15.79 16.79 14 19 14H19.74L17.84 5.56C17.63 4.65 16.82 4 15.89 4H12V6H15.89L17.29 12.25H17.28C15.12 12.9 13.47 14.73 13.09 17H7.82C7.34 15.66 5.96 14.76 4.4 15.06C3.22 15.29 2.27 16.26 2.05 17.44C1.7 19.34 3.16 21 5 21C6.3 21 7.4 20.16 7.82 19M5 19C4.45 19 4 18.55 4 18S4.45 17 5 17 6 17.45 6 18 5.55 19 5 19M19 15C17.34 15 16 16.34 16 18S17.34 21 19 21 22 19.66 22 18 20.66 15 19 15M19 19C18.45 19 18 18.55 18 18S18.45 17 19 17 20 17.45 20 18 19.55 19 19 19Z" />
    </svg>
  `;

  document.body.appendChild(starEl);

  // Initialize position in the center of the screen
  let starX = window.innerWidth / 2;
  let starY = window.innerHeight / 2;
  let mouseX = starX;
  let mouseY = starY;

  // Configuration
  const speed = 8; // How fast the star moves towards the cursor
  let rotation = 0; // Current rotation of the star

  // Update target coordinates when mouse moves
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // Main animation loop
  function animate() {
    const diffX = mouseX - starX;
    const diffY = mouseY - starY;
    const distance = Math.sqrt(diffX ** 2 + diffY ** 2);

    // If the star is more than 10 pixels away, move it towards the cursor
    if (distance > 10) {
      starX += (diffX / distance) * speed;
      starY += (diffY / distance) * speed;
      
      // Spin faster when moving
      rotation += speed;
    } else {
      // Idle animation: spin very slowly
      rotation += 0.5;
    }

    // Apply the updated coordinates
    starEl.style.left = `${starX}px`;
    starEl.style.top = `${starY}px`;
    
    // Apply the rotation exclusively to the SVG
    starEl.querySelector('svg').style.transform = `rotate(${rotation}deg)`;

    requestAnimationFrame(animate);
  }

  // Kick off the animation loop
  requestAnimationFrame(animate);
})();
