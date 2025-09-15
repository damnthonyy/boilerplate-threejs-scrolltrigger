import { scene, camera } from './three-model.js';

/**
 * GSAP: ScrollTrigger
 */
gsap.registerPlugin(ScrollTrigger);

// Configuration par défaut
ScrollTrigger.defaults({
  immediateRender: false,
  ease: 'power2.out',
  scrub: 1.5,
});

// Détection mobile
const isMobile = window.innerWidth <= 768;

// Fonction pour ajuster la taille du modèle 3D
function adjustModelSize() {
  const isMobileNow = window.innerWidth <= 768;
  
  if (isMobileNow) {
    // Ajustements pour mobile
    if (scene.children.length > 0) {
      const tshirt = scene.children.find(child => child.type === 'Group' || child.isMesh);
      if (tshirt) {
        tshirt.scale.set(0.0003, 0.0003, 0.0003); // Taille mobile plus petite
        tshirt.position.set(0, -0.06, -0.2); // Position mobile
      }
    }
    
    // Ajuster la position de la caméra pour mobile
    camera.position.set(0, 0, 0.5);
    camera.fov = 50; // FOV encore plus large pour mobile
    camera.updateProjectionMatrix();
  } else {
    // Ajustements pour desktop - valeurs initiales
    if (scene.children.length > 0) {
      const tshirt = scene.children.find(child => child.type === 'Group' || child.isMesh);
      if (tshirt) {
        tshirt.scale.set(0.00045, 0.00045, 0.00045); // Taille initiale desktop
        tshirt.position.set(0, -0.06, 0); // Position initiale desktop
      }
    }
    
    // Position de caméra pour desktop - valeurs initiales
    camera.position.set(0, 0, 1);
    camera.fov = 35;
    camera.updateProjectionMatrix();
  }
}

// Appeler la fonction au chargement et au redimensionnement
adjustModelSize();
window.addEventListener('resize', adjustModelSize);

// Animation du modèle 3D pendant le scroll
let modelAnimTl = gsap.timeline({
  scrollTrigger: {
    trigger: '.hero-section',
    endTrigger: '.order-section',
    start: 'top top',
    end: 'bottom bottom',
    scrub: 1.5,
  },
});

if (isMobile) {
  // Pas d'animations sur mobile - maillot statique
  // Le maillot reste en position fixe
} else {
  // Animations pour desktop
  modelAnimTl
    .to(scene.position, { z: 0.5, duration: 0.5 })
    .to(camera.position, { x: 0.2, y: 0.15, duration: 0.5 })
    .to(camera.position, { x: -0.2, y: 0.20, duration: 1.5 })
    .to(camera.position, { x: 0.2, y: 0.20, duration: 1.5 })
    .to(scene.rotation, { y: -3, duration: 0.5 }, 'simultaneously')
    .to(scene.position, { x: 0.175, y: -0.01, duration: 1 }, 'simultaneously')
    .to(scene.position, { x: -0.1, y: -0.07, z: 0.05, duration: 1 }, 'simultaneously')
    .to(camera.position, { x: 0.2, y: 0.15, duration: 1 })
    .to('#three-container', { x: 0.2, y: 0.5, duration: 1 });
}

// Animations des éléments de contenu
gsap.utils.toArray('section').forEach((section, index) => {
  // Animation d'entrée des éléments
  const elements = section.querySelectorAll('h1, h2, h3, p, .brands-right, .logo-right, .number-display, .order-form, .order-background');
  
  elements.forEach((element, elementIndex) => {
    gsap.fromTo(element, 
      {
        opacity: 0,
        y: 50,
        scale: 0.9
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        },
        delay: elementIndex * 0.1
      }
    );
  });
});

// Animation spéciale pour le hero
gsap.timeline({
  scrollTrigger: {
    trigger: '.hero-section',
    start: 'top top',
    end: 'bottom top',
    scrub: 1
  }
})
.to('.hero-title', { scale: 1.1, duration: 0.5 })
.to('.hero-subtitle', { scale: 1.05, duration: 0.5 }, '-=0.3')
.to('.hero-description', { scale: 1.02, duration: 0.5 }, '-=0.2');

// Animation de parallaxe pour les sections
gsap.utils.toArray('section').forEach((section, index) => {
  if (index > 0) { // Skip hero section
    gsap.to(section, {
      y: -50,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1
      }
    });
  }
});

// Animation de rotation continue du modèle 3D pendant le scroll
let rotationTween = null;

// Fonction pour démarrer la rotation automatique
function startAutoRotation() {
  if (rotationTween) {
    rotationTween.kill();
  }
  
  rotationTween = gsap.to(scene.rotation, {
    y: '+=6.28', // Une rotation complète (2π radians)
    duration: 8,
    ease: 'none',
    repeat: -1
  });
}

// Fonction pour arrêter la rotation automatique
function stopAutoRotation() {
  if (rotationTween) {
    rotationTween.kill();
    rotationTween = null;
  }
}

// Démarrer la rotation automatique au début du scroll (mobile uniquement)
if (isMobile) {
  ScrollTrigger.create({
    trigger: '.hero-section',
    start: 'top top',
    end: 'bottom bottom',
    onEnter: startAutoRotation,
    onLeave: stopAutoRotation,
    onEnterBack: startAutoRotation,
    onLeaveBack: stopAutoRotation
  });
}

// Animation de pulsation pour le numéro
gsap.to('.number', {
  scale: 1.05,
  duration: 3,
  ease: 'power2.inOut',
  yoyo: true,
  repeat: -1
});

// Indicateur de scroll
const scrollIndicator = document.createElement('div');
scrollIndicator.className = 'scroll-indicator';
document.body.appendChild(scrollIndicator);

// Créer les dots pour chaque section
gsap.utils.toArray('section').forEach((section, index) => {
  const dot = document.createElement('div');
  dot.className = 'scroll-dot';
  if (index === 0) dot.classList.add('active');
  scrollIndicator.appendChild(dot);
  
  // Animation des dots
  ScrollTrigger.create({
    trigger: section,
    start: 'top center',
    end: 'bottom center',
    onEnter: () => {
      gsap.utils.toArray('.scroll-dot').forEach(d => d.classList.remove('active'));
      dot.classList.add('active');
    },
    onEnterBack: () => {
      gsap.utils.toArray('.scroll-dot').forEach(d => d.classList.remove('active'));
      dot.classList.add('active');
    }
  });
});

// Smooth scroll behavior
document.documentElement.style.scrollBehavior = 'smooth';