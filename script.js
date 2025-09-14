import { scene, camera } from './three-model.js';

/**
 * GSAP: ScrollTrigger
 */
gsap.registerPlugin(ScrollTrigger);

// scene.rotation.set(-7.14 , -0.66 , -0.06);
// camera.position.set(0, 0, 5);

ScrollTrigger.defaults({
  immediateRender: false,
  ease: 'power1.inOut',
  scrub: 1,
});

let boxAnimTl = gsap.timeline({
  scrollTrigger: {
    trigger: '.section-one',
    endTrigger: '.section-four',
    start: 'top top',
    end: 'bottom bottom',
    scrub: 1,
  },
});

boxAnimTl
  .to(scene.position, { z: 0.60 }) 
  .to(camera.position, { y: 0.2 })
  .to(scene.rotation, { y: -3 })
  .to(scene.rotation, { y: -7 })
  .to(scene.position, { z: -0.60 })
  .to(scene.rotation, { z: 0.02, y: 3.1 }, 'simultaneously')
  .to(camera.position, { x: 0.16 }, 'simultaneously')
  .to('#three-container', { opacity: 0, scale: 0 }, 'simultaneously');
