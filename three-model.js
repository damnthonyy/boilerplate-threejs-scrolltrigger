import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';

// variables
let container = document.querySelector('#three-container');
let camera, scene, renderer, light;

// scene
scene = new THREE.Scene();

// camera
const isMobile = window.innerWidth <= 768;
const fov = isMobile ? 50 : 35;
const aspect = container.clientWidth / container.clientHeight;
const near = 0.01;
const far = 1000;
camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = isMobile ? 0.3 : 1;
light = new THREE.AmbientLight(0xffffff, 1);
scene.add(light);

// renderer
renderer = new THREE.WebGLRenderer({
  antialias: true,
  alpha: true,
});
renderer.setSize(container.clientWidth, container.clientHeight);
renderer.setPixelRatio(window.devicePixelRatio);

container.appendChild(renderer.domElement);

//
// var geometry = new THREE.BoxGeometry();
// var material = new THREE.MeshNormalMaterial();
// var box = new THREE.Mesh(geometry, material);
// box.position.set(-2, 0.0, 0.0);
// scene.add(box);
// Instantiate a loader
const loader = new GLTFLoader();

// Optional: Provide a DRACOLoader instance to decode compressed mesh data
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('/examples/jsm/libs/draco/');
loader.setDRACOLoader(dracoLoader);

// Load a glTF resource
loader.load(
  // resource URL
  './assets/Tshirt00_fixed/Tshirt00_fixed.gltf',
  // called when the resource is loaded
  function (gltf) {
    scene.add(gltf.scene);

    gltf.animations; // Array<THREE.AnimationClip>
    gltf.scene; // THREE.Group
    gltf.scenes; // Array<THREE.Group>
    gltf.cameras; // Array<THREE.Camera>
    gltf.asset; // Object

    const tshirt = gltf.scene.children[0];
    tshirt.position.set(0, -0.06, 0);
    
    // Ajuster la taille selon l'appareil
    const isMobile = window.innerWidth <= 768;
    if (isMobile) {
      tshirt.scale.set(0.0003, 0.0003, 0.0003); // Taille mobile plus petite
      tshirt.position.set(0, -0.06, -0.2); // Position mobile
    } else {
      tshirt.scale.set(0.00045, 0.00045, 0.00045); // Taille desktop
    }
    tshirt.material=new THREE.MeshStandardMaterial({
      roughness: 0.9,
    });
  },
  // called while loading is progressing
  function (xhr) {
    console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
  },
  // called when loading has errors
  function (error) {
    console.log('An error happened');
  }
);

// White directional light at half intensity shining from the top.
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.7);
directionalLight.position.set(0, 0, 1);
scene.add(directionalLight);

// Charger l'environnement HDR
const rgbeLoader = new RGBELoader();
rgbeLoader.load('./assets/studio_4k.hdr', function (texture) {
  texture.mapping = THREE.EquirectangularReflectionMapping;
  scene.background = null;
  scene.environment = texture;
});

//
(function animate() {
  // box.rotation.y += 0.01;
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
})();

export { scene, camera };