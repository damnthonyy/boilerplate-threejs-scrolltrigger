# Three.js + GSAP ScrollTrigger Demo

Un projet de démonstration qui combine Three.js pour le rendu 3D et GSAP ScrollTrigger pour créer des animations fluides basées sur le scroll.

## 🎯 Description

Ce projet présente un maillot 3D en mode wireframe qui s'anime au fur et à mesure que l'utilisateur fait défiler la page. L'animation est synchronisée avec le scroll et inclut des mouvements de caméra, des rotations de scène et des transitions visuelles.

## ✨ Fonctionnalités

- **Modèle 3D** : Maillot en mode wireframe avec matériau métallique
- **Animations fluides** : Synchronisées avec le scroll via GSAP ScrollTrigger
- **Environnement HDR** : Éclairage réaliste avec un environnement de studio
- **Transitions** : Mouvements de caméra et rotations de scène
- **Design responsive** : Interface adaptée à tous les écrans

## 🛠️ Technologies utilisées

- **Three.js** : Rendu 3D et gestion des modèles
- **GSAP** : Animations et transitions
- **ScrollTrigger** : Synchronisation avec le scroll
- **GLTFLoader** : Chargement des modèles 3D
- **RGBELoader** : Chargement des environnements HDR

## 📁 Structure du projet

```
threejs-gsap-scrolltrigger-demo/
├── assets/
│   ├── cat/                          # Modèle de chat (non utilisé)
│   │   ├── concrete_cat_statue_2k.gltf
│   │   ├── concrete_cat_statue.bin
│   │   └── textures/
│   ├── Tshirt00_fixed/               # Modèle de maillot principal
│   │   ├── Tshirt00_fixed.gltf
│   │   ├── Tshirt00_fixed.bin
│   │   └── textures/
│   └── studio_4k.hdr                 # Environnement HDR
├── index.html                        # Page principale
├── script.js                         # Animations GSAP
├── three-model.js                    # Configuration Three.js
├── style.css                         # Styles CSS
└── README.md                         # Documentation
```

## 🚀 Installation

1. **Cloner le projet**
   ```bash
   git clone [url-du-repo]
   cd threejs-gsap-scrolltrigger-demo
   ```

2. **Servir le projet**
   ```bash
   npx serve .
   ```

3. **Ouvrir dans le navigateur**
   ```
   http://localhost:3000
   ```

## 🎮 Utilisation

1. **Scroll vers le bas** pour déclencher les animations
2. **Observez** les mouvements de caméra et rotations
3. **Profitez** de l'effet wireframe sur fond noir

## ⚙️ Configuration

### Modifier les animations

Dans `script.js`, vous pouvez ajuster :

```javascript
boxAnimTl
  .to(scene.position, { z: 0.60 })      // Distance de la scène
  .to(camera.position, { y: 0.2 })      // Position de la caméra
  .to(scene.position, { x: 0.0 })       // Déplacement horizontal
  .to(scene.rotation, { z: 1.6 })       // Rotation Z
  .to(scene.rotation, { z: 0.02, y: 3.1 }, 'simultaneously')
  .to(camera.position, { x: 0.16 }, 'simultaneously')
  .to('#three-container', { opacity: 0, scale: 0 }, 'simultaneously');
```

### Changer le modèle 3D

Dans `three-model.js`, modifiez le chemin du modèle :

```javascript
loader.load(
  './assets/Tshirt00_fixed/Tshirt00_fixed.gltf',  // Votre modèle
  // ...
);
```

### Ajuster l'environnement

Remplacez `studio_4k.hdr` par votre propre environnement HDR :

```javascript
rgbeLoader.load('./assets/votre_environnement.hdr', function (texture) {
  // ...
});
```

## 🎨 Personnalisation

### Matériau du modèle

```javascript
tshirt.material = new THREE.MeshStandardMaterial({
  roughness: 0,        // 0 = très lisse, 1 = très rugueux
  wireframe: true,     // true = mode filaire, false = mode normal
  metalness: 1,        // 0 = non métallique, 1 = très métallique
});
```

### Éclairage

```javascript
// Lumière ambiante
light = new THREE.AmbientLight(0xffffff, 1);

// Lumière directionnelle
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.7);
directionalLight.position.set(0, 0, 1);
```

### Couleurs des sections

Dans `style.css` :

```css
#sections > section:nth-child(1) {
  background-color: black;  /* Couleur de fond */
}
```

## 🔧 Dépannage

### Le modèle ne s'affiche pas
- Vérifiez que les fichiers `.gltf` et `.bin` sont présents
- Vérifiez les chemins dans `three-model.js`
- Ouvrez la console pour voir les erreurs

### L'environnement HDR ne se charge pas
- Vérifiez que le fichier `.hdr` est dans le dossier `assets/`
- Vérifiez le nom du fichier dans `three-model.js`
- Assurez-vous que le serveur local fonctionne

### Les animations sont saccadées
- Réduisez la valeur `scrub` dans `script.js`
- Vérifiez les performances du navigateur
- Testez sur un autre navigateur

## 📚 Ressources utiles

- [Documentation Three.js](https://threejs.org/docs/)
- [Documentation GSAP](https://greensock.com/docs/)
- [ScrollTrigger Guide](https://greensock.com/docs/v3/Plugins/ScrollTrigger)
- [Modèles 3D gratuits](https://sketchfab.com/)
- [Environnements HDR](https://polyhaven.com/hdris)

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :
- Signaler des bugs
- Proposer des améliorations
- Ajouter de nouvelles fonctionnalités

---

**Créé avec <3 en utilisant Three.js et GSAP**