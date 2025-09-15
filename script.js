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

modelAnimTl
  .to(scene.position, { z: 0.5, duration: 0.5 })
  .to(camera.position, { x: 0.2, y: 0.15, duration: 0.5 })
  .to(camera.position, { x: -0.2 ,y:0.20, duration: 1.5 })
  .to(camera.position, { x: 0.2, y: 0.20, duration: 1.5 })
  .to(scene.rotation, { y: -3, duration: 0.5 },'simultaneously')
  .to(scene.position, { x:0.175, y:-0.01, duration: 1 },'simultaneously')
  .to(scene.position, { x: -0.1 ,y:-0.01, z:0.05, duration: 1 },'simultaneously')

  .to(camera.position, { x: 0.2 ,y:0.15, duration: 1 },)
  .to('#three-container', { x:0.2, y:0.5, duration: 1 },);

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

// Animation de rotation continue du modèle 3D - DÉSACTIVÉE
// gsap.to(scene.rotation, {
//   y: '+=2',
//   duration: 20,
//   ease: 'none',
//   repeat: -1
// });

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