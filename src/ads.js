import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls.js';
import { GUI } from 'dat.gui'; // Import dat.GUI
// Import custom object creation functions
import { 
    createChair, createdesk, createaircon, 
    createflower, createframe, createdispenser, created_design1, 
    created_design2, created_design3, created_floor, created_hallchairs,
    created_cheaproom, created_fence, created_statue, created_ceiling,
    created_nearstatue 
  } from './js/objects.js';
  

  import { loadWall } from './js/design.js';
  

//================================================================
// Scene Setup
//================================================================
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x2f303d); // Default background color
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('webgl-container').appendChild(renderer.domElement);


const textureLoader = new THREE.TextureLoader();

//================================================================
// Fog Setup
//================================================================
let fogDensity = 0; // Adjusted density for fog
let fogColor = new THREE.Color(0xaaaaaa); // Set initial fog color (light gray)
scene.fog = new THREE.FogExp2(fogColor, fogDensity); // Exponential fog (color, density)


// Lighting setup
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Soft ambient light
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(10, 50, 10);
directionalLight.castShadow = true;
scene.add(directionalLight);



//================================================================
// Wall Setup (Front, Back, Left, Right)
//================================================================

// Front Wall
const frontWallTexture = textureLoader.load('images/texture/tile.jpg'); // Front wall texture
frontWallTexture.wrapS = THREE.RepeatWrapping;
frontWallTexture.wrapT = THREE.RepeatWrapping;
frontWallTexture.repeat.set(30, 10); // Scale texture to fit

const frontWallMaterial = new THREE.MeshStandardMaterial({ 
    map: frontWallTexture, 
    side: THREE.DoubleSide, 
    roughness: 0, 
    metalness: 0.5 // Optional: for added shininess
});
const frontWall = new THREE.Mesh(new THREE.BoxGeometry(100, 40, 1), frontWallMaterial);
frontWall.position.z = -50;
frontWall.castShadow = true;
frontWall.receiveShadow = true;
scene.add(frontWall);

// Back Wall
const backWallTexture = textureLoader.load('/images/texture/tile.jpg'); // Back wall texture
backWallTexture.wrapS = THREE.RepeatWrapping;
backWallTexture.wrapT = THREE.RepeatWrapping;
backWallTexture.repeat.set(30, 10); // Adjust the repeat scale

const backWallMaterial = new THREE.MeshStandardMaterial({ 
    map: backWallTexture, 
    side: THREE.DoubleSide, 
    roughness: 0, 
    metalness: 0.5
});
const backWall = new THREE.Mesh(new THREE.BoxGeometry(100, 40, 1), backWallMaterial);
backWall.position.z = 50;
backWall.castShadow = true;
backWall.receiveShadow = true;
scene.add(backWall);

// Left Wall
const leftWallTexture = textureLoader.load('/images/texture/tile.jpg'); // Left wall texture
leftWallTexture.wrapS = THREE.RepeatWrapping;
leftWallTexture.wrapT = THREE.RepeatWrapping;
leftWallTexture.repeat.set(30, 10); // Adjust the repeat scale

const leftWallMaterial = new THREE.MeshStandardMaterial({ 
    map: leftWallTexture, 
    side: THREE.DoubleSide, 
    roughness: 0, 
    metalness: 0.5
});
const leftWall = new THREE.Mesh(new THREE.BoxGeometry(1, 40, 100), leftWallMaterial);
leftWall.position.set(-52, 2, -1);
leftWall.scale.set(1, 2, 0.6);
leftWall.castShadow = true;
leftWall.receiveShadow = true;
scene.add(leftWall);

// Left Wall 1 (unique name for second wall)
const leftWall1Texture = textureLoader.load('/images/texture/tile.jpg'); // Left wall texture
leftWall1Texture.wrapS = THREE.RepeatWrapping;
leftWall1Texture.wrapT = THREE.RepeatWrapping;
leftWall1Texture.repeat.set(30, 10); // Adjust the repeat scale

const leftWall1Material = new THREE.MeshStandardMaterial({ 
    map: leftWall1Texture, 
    side: THREE.DoubleSide, 
    roughness: 0, 
    metalness: 0.5
});
const leftWall1 = new THREE.Mesh(new THREE.BoxGeometry(40, 35, 1), leftWall1Material);
leftWall1.scale.set(8, 0.3, 0.3);
leftWall1.position.set(-44, 20, 35);
leftWall1.castShadow = true;
leftWall1.receiveShadow = true;
scene.add(leftWall1);

// Right Wall
const rightWallTexture = textureLoader.load('/images/texture/tile.jpg'); // Right wall texture
rightWallTexture.wrapS = THREE.RepeatWrapping;
rightWallTexture.wrapT = THREE.RepeatWrapping;
rightWallTexture.repeat.set(30, 10); // Adjust the repeat scale

const rightWallMaterial = new THREE.MeshStandardMaterial({ 
    map: rightWallTexture, 
    side: THREE.DoubleSide, 
    roughness: 0, 
    metalness: 0.5
});
const rightWall = new THREE.Mesh(new THREE.BoxGeometry(40, 35, 1), rightWallMaterial);
rightWall.position.x = 50;
rightWall.castShadow = true;
rightWall.receiveShadow = true;
scene.add(rightWall);

//================================================================
// Ceiling and Floor Setup
//================================================================

// Ceiling
const ceilingTexture = textureLoader.load('/images/texture/tile.jpg'); // Ceiling texture
ceilingTexture.wrapS = THREE.RepeatWrapping;
ceilingTexture.wrapT = THREE.RepeatWrapping;
ceilingTexture.repeat.set(30, 10); // Adjust the repeat scale

const ceilingMaterial = new THREE.MeshStandardMaterial({ 
    map: ceilingTexture, 
    side: THREE.DoubleSide, 
    roughness: 0, 
    metalness: 0.5
});
const ceiling = new THREE.Mesh(new THREE.BoxGeometry(40, 35, 1), ceilingMaterial);
ceiling.rotation.x = Math.PI / 2;
ceiling.position.y = 22; // Place it above the floor
ceiling.receiveShadow = true;
scene.add(ceiling);

// Floor
const floorTexture = textureLoader.load('/images/texture/tile.jpg'); // Floor texture (same texture as ceiling)
floorTexture.wrapS = THREE.RepeatWrapping;
floorTexture.wrapT = THREE.RepeatWrapping;
floorTexture.repeat.set(30, 10); // Adjust the repeat scale

const floorMaterial = new THREE.MeshStandardMaterial({ 
    map: floorTexture, 
    side: THREE.DoubleSide, 
    roughness: 0, 
    metalness: 0.5
});
const floor = new THREE.Mesh(new THREE.BoxGeometry(40, 35, 1), floorMaterial);
floor.rotation.x = Math.PI / -2; // Rotate to make it horizontal
floor.position.y = 0; // Place it on the ground
floor.receiveShadow = true;
scene.add(floor);

// New Floor (Renamed to alternateFloor to avoid confusion)
const alternateFloorTexture = textureLoader.load('/images/texture/tile.jpg'); // Same texture as floor
alternateFloorTexture.wrapS = THREE.RepeatWrapping;
alternateFloorTexture.wrapT = THREE.RepeatWrapping;
alternateFloorTexture.repeat.set(30, 10); // Adjust the repeat scale

const alternateFloorMaterial = new THREE.MeshStandardMaterial({ 
    map: alternateFloorTexture, 
    side: THREE.DoubleSide, 
    roughness: 0, 
    metalness: 0.5
});
const alternateFloor = new THREE.Mesh(new THREE.BoxGeometry(40, 35, 1), alternateFloorMaterial);
alternateFloor.rotation.x = Math.PI / -2; // Rotate to make it horizontal
alternateFloor.position.y = 0; // Place it on the ground
alternateFloor.receiveShadow = true;
scene.add(alternateFloor);

// Walls (Normal vertical walls with unique names)
const wall1 = new THREE.Mesh(new THREE.BoxGeometry(40, 35, 1), frontWallMaterial);
wall1.position.set(45, 10, 25); // Position (x, y, z)
wall1.receiveShadow = true;
scene.add(wall1);

const wall2 = new THREE.Mesh(new THREE.BoxGeometry(40, 35, 1), frontWallMaterial);
wall2.position.set(20, 10, 30); // Position (x, y, z)
wall2.rotation.y = Math.PI / 2; // Rotate 90 degrees for sidewall
wall2.receiveShadow = true;
scene.add(wall2);

const wallLeft = new THREE.Mesh(new THREE.BoxGeometry(40, 35, 1), frontWallMaterial);
wallLeft.position.set(24, 10, 33.6); // Position (x, y, z)
wallLeft.rotation.y = Math.PI / 2; // Rotate for side orientation
wallLeft.receiveShadow = true;
scene.add(wallLeft);

const wallTop = new THREE.Mesh(new THREE.BoxGeometry(40, 35, 1), frontWallMaterial);
wallTop.position.set(24, 10, 50); // Position (x, y, z)
wallTop.rotation.y = Math.PI; // Rotate 180 degrees
wallTop.receiveShadow = true;
scene.add(wallTop);

const ceilingWall = new THREE.Mesh(new THREE.BoxGeometry(40, 35, 1), frontWallMaterial);
ceilingWall.position.set(24, 22, 25); // Position (x, y, z)
ceilingWall.rotation.x = Math.PI / 2; // Rotate to make it horizontal
ceilingWall.receiveShadow = true;
scene.add(ceilingWall);

// Carpet (floor texture)
const carpetTexture = textureLoader.load('/images/texture/carpet2.jpg');
carpetTexture.wrapS = THREE.RepeatWrapping;
carpetTexture.wrapT = THREE.RepeatWrapping;
carpetTexture.repeat.set(10, 10); // Adjust the repeat scale for the carpet texture

const carpetMaterial = new THREE.MeshStandardMaterial({
  map: carpetTexture,
  side: THREE.DoubleSide,
  roughness: 0.7,
  metalness: 0.1
});

// Carpet (floor)
const carpet = new THREE.Mesh(new THREE.BoxGeometry(40, 35, 1), carpetMaterial);
carpet.position.set(24, 0, 25); // Position (x, y, z)
carpet.rotation.x = -Math.PI / 2; // Rotate to place it on the floor
carpet.receiveShadow = true;
scene.add(carpet);

// After adding all walls to the scene
const wallBoundingBoxes = [];

// Assuming you have an array of wall meshes
const walls = [frontWall, backWall, leftWall, rightWall, ceiling, floor, wall1, wall2, wallLeft, wallTop, ceilingWall, carpet, alternateFloor, leftWall1]; // Add all wall meshes here

walls.forEach(wall => {
    const box = new THREE.Box3().setFromObject(wall);
    wallBoundingBoxes.push(box);
});




//================================================================
// GUI Setup
//================================================================
const gui = new GUI();

// Light Intensity Control
const lightFolder = gui.addFolder('Lighting');
const ambientLightControl = lightFolder.add(ambientLight, 'intensity', 0, 2).name('Ambient Light Intensity');
const directionalLightControl = lightFolder.add(directionalLight, 'intensity', 0, 2).name('Directional Light Intensity');

// Directional Light Direction Controls
const lightDirectionFolder = gui.addFolder('Light Direction');
const initialLightPosition = {
  x: -15.36,
  y: -50,
  z: 50
};

// Set initial position of the directional light
directionalLight.position.set(initialLightPosition.x, initialLightPosition.y, initialLightPosition.z);

// Initialize GUI controls for light position
lightDirectionFolder.add(initialLightPosition, 'x', -50, 50).name('Light X Position').onChange((value) => {
  directionalLight.position.x = value;
});
lightDirectionFolder.add(initialLightPosition, 'y', -50, 50).name('Light Y Position').onChange((value) => {
  directionalLight.position.y = value;
});
lightDirectionFolder.add(initialLightPosition, 'z', -50, 50).name('Light Z Position').onChange((value) => {
  directionalLight.position.z = value;
});

// Fog Controls
const fogFolder = gui.addFolder('Fog');
const fogIntensityControl = fogFolder.add({ fogDensity: fogDensity }, 'fogDensity', 0, 0.1).name('Fog Density').onChange((value) => {
  scene.fog.density = value;
});

const fogColorControl = fogFolder.addColor({ fogColor: fogColor.getHex() }, 'fogColor').name('Fog Color').onChange((value) => {
  scene.fog.color.set(value);
});

//================================================================
// Initialize the GUI
//================================================================
lightFolder.open(); // Open the lighting folder
lightDirectionFolder.open(); // Open the light direction folder
fogFolder.open(); // Open the fog folder


camera.position.set(37, 6, 11); // Set camera position


// FPSControls class (integrated from your provided code)
class FPSControls {
  constructor(camera, scene) {
      this.camera = camera;
      this.scene = scene;
      this.pointerLockControls = new PointerLockControls(camera, document.body);

      scene.add(this.pointerLockControls.getObject()); // Use getObject()

      document.addEventListener('click', () => this.pointerLockControls.lock());

      this.velocity = new THREE.Vector3(0, 0, 0);
      this.acceleration = new THREE.Vector3(250, 2130, 250);
      this.deceleration = new THREE.Vector3(-10, -55, -10);
      this.move = { forward: false, backward: false, left: false, right: false };
      this.isStanding = true;
      this.isEditMode = false; // Track whether we are in edit mode


      // Initialize Audio Listener and Sounds
      this.listener = new THREE.AudioListener();
      this.camera.add(this.listener); // Attach the listener to the camera
  
      
      // First walking sound
      this.walkSound = new THREE.Audio(this.listener);
      const audioLoader = new THREE.AudioLoader();
      audioLoader.load('/sounds/Sound Effects - Walking on Tile Floor.mp3', (buffer) => {
        this.walkSound.setBuffer(buffer);
        this.walkSound.setLoop(true); // Set to loop if desired
        this.walkSound.setVolume(0.5); // Adjust volume as needed
      });
  
      // Second walking sound
      this.secondWalkSound = new THREE.Audio(this.listener);
      audioLoader.load('/sounds/Walking Through Water Sound Effect.mp3', (buffer) => {
        this.secondWalkSound.setBuffer(buffer);
        this.secondWalkSound.setLoop(true);
        this.secondWalkSound.setVolume(0.5); // Adjust volume as needed
      });
  

      document.addEventListener('keydown', (e) => this._onKeyDown(e), false);
      document.addEventListener('keyup', (e) => this._onKeyUp(e), false);

       // Add event listener for the "Enter First Person Mode" button
    const firstPersonBtn = document.getElementById('firstPersonBtn');
    firstPersonBtn.addEventListener('click', () => this.enterFirstPersonMode());

    // Add event listener for the "Enter Edit Mode" button
    const editModeBtn = document.getElementById('editModeBtn');
    editModeBtn.addEventListener('click', () => this.enterEditMode());

    // Add a scroll wheel listener to handle zoom only in edit mode
    document.addEventListener('wheel', (event) => this.handleScroll(event), { passive: false });
     // Create the target marker in the game
     this.createTargetMarker();
  }

  createTargetMarker() {
    const targetPosition = new THREE.Vector3(-61, 4, -40); // The target position
  
    // Create a small sphere to act as the marker
    const geometry = new THREE.SphereGeometry(0.2, 32, 32); // Small sphere with radius 0.2
    const material = new THREE.MeshBasicMaterial({ 
      color: 0xff0000,      // Red color
      transparent: true,    // Enable transparency
      opacity: 0.0         // Set the opacity to 50% (you can adjust this value)
    });
    const marker = new THREE.Mesh(geometry, material);
  
    // Set the marker's position to the target position
    marker.position.copy(targetPosition);
  
    // Add the marker to the scene
    this.scene.add(marker);
  }


  enterFirstPersonMode() {
    // Activates pointer lock controls when the button is clicked
    this.pointerLockControls.lock(); // This will activate the pointer lock
    this.isEditMode = false; // Disable edit mode when entering first-person view
  }

  enterEditMode() {
    this.isEditMode = true; // Enable edit mode (fly mode)
    this.velocity.set(0, 0, 0); // Reset velocity
  }
  handleScroll(event) {
    // Disable zoom on scroll in both modes
    event.preventDefault(); // Prevent the page from scrolling
  }

  _onKeyDown(event) {
    switch (event.code) {
      case 'KeyW': this.move.forward = true; break;
      case 'KeyS': this.move.backward = true; break;
      case 'KeyA': this.move.left = true; break;
      case 'KeyD': this.move.right = true; break;
      case 'Space': // Jump (move up in Edit Mode)
        if (this.isEditMode) {
          this.move.up = true;
        } else if (this.isStanding) {
          this.velocity.y += 15; // Adjust jump height as needed
          this.isStanding = false;
        }
        break;
      case 'ShiftLeft': // Move down in Edit Mode
        if (this.isEditMode) {
          this.move.down = true;
        }
        break;
    }
  }





  _onKeyUp(event) {
      switch (event.code) {
          case 'KeyW': this.move.forward = false; break;
          case 'KeyS': this.move.backward = false; break;
          case 'KeyA': this.move.left = false; break;
          case 'KeyD': this.move.right = false; break;
          case 'Space': break;
      }
  }

  update(delta) {
    const speedMultiplier = 1; // Adjust speed multiplier here
    const frameDeceleration = new THREE.Vector3(
        this.velocity.x * this.deceleration.x,
        this.deceleration.y,
        this.velocity.z * this.deceleration.z
    );
    frameDeceleration.multiplyScalar(delta);
    this.velocity.add(frameDeceleration);

    const direction = new THREE.Vector3();
    this.camera.getWorldDirection(direction);

    const forward = new THREE.Vector3(direction.x, 0, direction.z).normalize();
    const right = new THREE.Vector3().crossVectors(this.camera.up, forward).normalize();

    if (this.move.forward) this.velocity.addScaledVector(forward, this.acceleration.z * delta);
    if (this.move.backward) this.velocity.addScaledVector(forward, -this.acceleration.z * delta);
    if (this.move.left) this.velocity.addScaledVector(right, this.acceleration.x * delta);
    if (this.move.right) this.velocity.addScaledVector(right, -this.acceleration.x * delta);

    // Create a bounding box for the character
    const characterBox = new THREE.Box3().setFromCenterAndSize(
        this.pointerLockControls.getObject().position,
        new THREE.Vector3(1, 1.8, 1) // Adjust size based on your character's dimensions
    );
    

    // Check for collisions with walls
    for (const wallBox of wallBoundingBoxes) {
        if (characterBox.intersectsBox(wallBox)) {
            // Collision detected, revert position
            this.pointerLockControls.getObject().position.sub(this.velocity.clone().multiplyScalar(delta));
            this.velocity.set(0, 0, 0); // Stop movement
            break; // Exit loop after collision
        }
    }

    
    // Update camera position
    const position = this.pointerLockControls.getObject().position;
    position.addScaledVector(this.velocity, delta);

    // Apply gravity
    if (position.y < 5) {
        this.velocity.y = 0;
        position.y = 5;
        this.isStanding = true;
    }
}
}

// Instantiate FPSControls
const controls = new FPSControls(camera, scene);

// Load zombie model
const loader = new GLTFLoader();
let zombie;
loader.load('/images/models/zombie_monster_slasher_necromorph.glb', (gltf) => {
    zombie = gltf.scene;
    zombie.scale.set(5, 5, 5);
    zombie.position.set(-20, 0, -20);
    zombie.castShadow = true;
    scene.add(zombie);
});

// Zombie movement (unchanged)
function updateZombie() {
    if (zombie) {
        const playerPosition = camera.position;
        const zombiePosition = zombie.position;
        const distanceToPlayer = playerPosition.distanceTo(zombiePosition);

        if (distanceToPlayer < 50) { // Simple chase behavior
            const direction = new THREE.Vector3();
            direction.subVectors(playerPosition, zombiePosition).normalize();
            zombie.position.addScaledVector(direction, 0.02); // Adjust zombie speed
        }
    }
}



// Animation loop
function animate() {
    requestAnimationFrame(animate);

    if (controls.pointerLockControls.isLocked) {
        const delta = clock.getDelta(); // Get time delta for smooth movement
        controls.update(delta); // Update FPS controls
    }

    updateZombie(); // Update zombie movement
    renderer.render(scene, camera);
}



const clock = new THREE.Clock();

/*

createChair(scene);
    createdesk(scene);
    createaircon(scene);

    createflower(scene);
    createframe(scene);
    createdispenser(scene);
    created_design1(scene);
    created_design2(scene);
    created_design3(scene);
    created_floor(scene);
    created_hallchairs(scene);
    created_fence(scene);
    created_cheaproom(scene);
    created_nearstatue(scene);
    
    created_ceiling(scene);
    created_statue(scene)
  */


animate();