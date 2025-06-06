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
    created_nearstatue ,created_fallingceiling, created_dead , created_fallingdebris
  } from './js/objects.js';
  


  

//================================================================
// Scene Setup
//================================================================

// Define boundary limits for player movement
const boundaryMinX = -50; // Minimum X boundary
const boundaryMaxX = 50;  // Maximum X boundary
const boundaryMinY = 0;   // Minimum Y boundary (ground level)
const boundaryMaxY = 120;  // Maximum Y boundary (height limit)
const boundaryMinZ = -50; // Minimum Z boundary
const boundaryMaxZ = 50;  // Maximum Z boundary

function checkPlayerBounds(playerPosition) {
  if (playerPosition.x < boundaryMinX || playerPosition.x > boundaryMaxX ||
      playerPosition.y < boundaryMinY || playerPosition.y > boundaryMaxY ||
      playerPosition.z < boundaryMinZ || playerPosition.z > boundaryMaxZ) {
    resetPlayerPosition();
  }
}

function resetPlayerPosition() {
  // Set the player's position to a safe location
  camera.position.set(0, 5, 0); // Example reset position
  console.log("You have been reset to a safe location!"); // Console message
}

//================================================================
// Scene Setup
//================================================================
const scene = new THREE.Scene();
//scene.background = new THREE.Color(0x2f303d); // Default background color
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('webgl-container').appendChild(renderer.domElement);


const textureLoader = new THREE.TextureLoader();

//================================================================
// Fog Setup
//================================================================
//let fogDensity = 0.06; // Adjusted density for fog
let fogDensity = 0; // Adjusted density for fog
let fogColor = new THREE.Color(0x000000); // Set initial fog color (black)
scene.fog = new THREE.FogExp2(fogColor, fogDensity); // Exponential fog (color, density)



//================================================================
// Lighting Setup
//================================================================
const ambientLight = new THREE.AmbientLight(0xffffff, 2); // Ambient light to illuminate all objects
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 5); // White directional light
directionalLight.position.set(50, 50, 50).normalize(); // Light source position
scene.add(directionalLight);

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // For softer shadows


/*
//================================================================
// Lighting Setup
//================================================================
const ambientLight = new THREE.AmbientLight(0x635900, 0.1); // Ambient light to illuminate all objects
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0x635900, 0.010); // White directional light
directionalLight.position.set(-15.36, -50, 50).normalize(); // Light source position
scene.add(directionalLight);

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // For softer shadows




const localizedDirectionalLight = new THREE.DirectionalLight(0xffcc00, 1.0);

// Position it in your specific area
localizedDirectionalLight.position.set(-15.36, -50, 50); // Position it at (-115, -39, -40)

// Set the light's target to the area you want to illuminate
localizedDirectionalLight.target.position.set(29, 7, -28); // Focus it downward toward the ground

// Enable shadows for more localized effects
localizedDirectionalLight.castShadow = true;
localizedDirectionalLight.shadow.mapSize.width = 1024;  // Higher value for better resolution
localizedDirectionalLight.shadow.mapSize.height = 1024;
localizedDirectionalLight.shadow.camera.near = 0.1;  // Set the shadow camera near
localizedDirectionalLight.shadow.camera.far = 500;  // Set the shadow camera far (to control distance)

// Add the light to the scene
scene.add(localizedDirectionalLight);
scene.add(localizedDirectionalLight.target);
*/


/*
//================================================================
// Sound Setup with Auto-Play Attempt
//================================================================
let audioContext;

document.addEventListener('click', function() {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }
  // Resume the AudioContext if it's suspended
  if (audioContext.state === 'suspended') {
    audioContext.resume();
  }

  // Now you can safely start playing audio
  playAudio();
});

// Function to play three audio files at once, looping indefinitely
function playAudio() {
  const audio1 = new Audio('/sounds/Sound Effects Heavy Rain and Thunder.mp3');
  const audio2 = new Audio('/sounds/Underwater Pool - Sound Effect (HD).mp3');
  const audio3 = new Audio('/sounds/Free Horror Ambience (Dark Project).mp3');

  audio1.volume = 1;
  audio2.volume = 1;
  audio3.volume = 1; // Adjust this value (0.0 to 1.0) to control the volume of the third sound

  // Enable looping for all three audio files
  audio1.loop = true;
  audio2.loop = true;
  audio3.loop = true;

  // Play all three sounds at once
  audio1.play().catch(error => console.error('Error playing audio1:', error));
  audio2.play().catch(error => console.error('Error playing audio2:', error));
  audio3.play().catch(error => console.error('Error playing audio3:', error));
}

// Example button to trigger audio playback
const playButton = document.createElement('button');
playButton.textContent = 'Play Audio';
playButton.onclick = playAudio;
document.body.appendChild(playButton);


*/


// Load the sound effect
const sparkSound = new Audio('/sounds/Electricity spark sound effects HQ.mp3'); // Replace with the correct sound file path
sparkSound.volume = 1.0; // Set the volume to maximum (range: 0.0 to 1.0)


// Wait for the sound to be loaded and ensure the duration is valid before using it
sparkSound.addEventListener('loadedmetadata', () => {
  // The sound is loaded and duration is available, you can start using it
  console.log('Sound loaded, duration:', sparkSound.duration);
});

function flickerLight() {
  const flashCount = Math.floor(Math.random() * 6) + 3; // Random flashes (3 to 8)
  let currentFlash = 0;

  function flash() {
    if (currentFlash < flashCount) {
      // Decide if the light should flicker
      const isFlickering = Math.random() > 0.5; // 50% chance of flickering

      if (isFlickering) {
        // Flickering: Set random light intensity and play the sound
        ambientLight.intensity = Math.random() * 0.7 + 0.1; // Intensity: 0.1 to 0.8
        
        // Start the sound at a random time within its duration, but check if duration is valid
        if (sparkSound.paused && !isNaN(sparkSound.duration)) {
          const randomStartTime = Math.random() * sparkSound.duration; // Random start between 0 and the sound's duration
          sparkSound.currentTime = randomStartTime; // Set the random start time
          sparkSound.play();
        }
      } else {
        // Not flickering: Dim the light and stop the sound
        ambientLight.intensity = 1; // Normal ambient light
        if (!sparkSound.paused) {
          sparkSound.pause(); // Stop the sound if it's playing
        }
      }

      currentFlash++;

      // Random delay between each flash (50ms to 150ms)
      setTimeout(flash, Math.random() * 100 + 50);
    } else {
      // End of flashes: Dim the light, stop the sound, and wait for the next sequence
      ambientLight.intensity = 0.1; // Minimal ambient light during delay
      if (!sparkSound.paused) {
        sparkSound.pause(); // Ensure sound is stopped
      }
      setTimeout(flickerLight, 5000); // 5-second delay before the next sequence
    }
  }

  flash(); // Start the flashing sequence
}

// Start the flickering effect
flickerLight();




//================================================================
// Wall Setup (Front, Back, Left, Right)
//================================================================

// Front Wall
const frontWallTexture = textureLoader.load('/images/texture/tile.jpg'); // Front wall texture
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

// Left Wall 1
const left1WallTexture = textureLoader.load('/images/texture/tile.jpg'); // Left wall texture
left1WallTexture.wrapS = THREE.RepeatWrapping;
left1WallTexture.wrapT = THREE.RepeatWrapping;
left1WallTexture.repeat.set(30, 10); // Adjust the repeat scale

const left1WallMaterial = new THREE.MeshStandardMaterial({ 
    map: left1WallTexture, 
    side: THREE.DoubleSide, 
    roughness: 0, 
    metalness: 0.5
});
const left1Wall = new THREE.Mesh(new THREE.BoxGeometry(1, 40, 100), left1WallMaterial);
left1Wall.scale.set(8, 0.3, 0.3);
left1Wall.position.set(-44, 20, 35);

left1Wall.castShadow = true;
left1Wall.receiveShadow = true;
scene.add(left1Wall);

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
const rightWall = new THREE.Mesh(new THREE.BoxGeometry(1, 40, 100), rightWallMaterial);
rightWall.position.x = 50;
rightWall.castShadow = true;
rightWall.receiveShadow = true;
scene.add(rightWall);

//================================================================
// Ceiling and Floor Setup
//================================================================
/*
// Ceiling
const ceilingTexture2 = textureLoader.load('/images/texture/tile.jpg'); // Ceiling texture
ceilingTexture2.wrapS = THREE.RepeatWrapping;
ceilingTexture2.wrapT = THREE.RepeatWrapping;
ceilingTexture2.repeat.set(30, 10); // Adjust the repeat scale

const ceilingMaterial = new THREE.MeshStandardMaterial({ 
    map: ceilingTexture2,
    side: THREE.DoubleSide, 
    roughness: 0, 
    metalness: 0.5
});
const ceiling = new THREE.Mesh(new THREE.PlaneGeometry(100, 100), ceilingMaterial);
ceiling.rotation.x = Math.PI / 2;
ceiling.position.y = 22; // Place it above the floor
ceiling.receiveShadow = true;
scene.add(ceiling);
*/
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
const floor = new THREE.Mesh(new THREE.PlaneGeometry(100, 100), floorMaterial);
floor.rotation.x = Math.PI / -2; // Rotate to make it horizontal
floor.position.y = 0; // Place it on the ground
floor.receiveShadow = true;
scene.add(floor);




/*

// New Floor (Renamed to alternateFloor to avoid confusion)
const NORMALLTexture = textureLoader.load(''); // Same texture as floor
NORMALLTexture.wrapS = THREE.RepeatWrapping;
NORMALLTexture.wrapT = THREE.RepeatWrapping;
NORMALLTexture.repeat.set(30, 10); // Adjust the repeat scale

const NORMALLTextureFloorMaterial = new THREE.MeshStandardMaterial({ 
    map: NORMALLTexture, 
    side: THREE.DoubleSide, 
    roughness: 0, 
    metalness: 0.5
});
const NORMAL = new THREE.Mesh(new THREE.BoxGeometry(40, 35, 1), NORMALLTextureFloorMaterial);
NORMAL.receiveShadow = true;
scene.add(NORMAL);

*/




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
alternateFloor.rotation.y = Math.PI / 2; // Rotate to make it horizontal
alternateFloor.position.set(33, 2, 25.3); // Set position
                    //nipis     //width    //heigh
alternateFloor.scale.set(0.040,         1,          22); // Shrink width to create space for the door
alternateFloor.receiveShadow = true;
scene.add(alternateFloor);



//left

const LEFT1Texture = textureLoader.load('/images/texture/tile.jpg'); // Same texture as floor
LEFT1Texture .wrapS = THREE.RepeatWrapping;
LEFT1Texture .wrapT = THREE.RepeatWrapping;
LEFT1Texture .repeat.set(30, 10); // Adjust the repeat scale

const LEFT1TextureMaterial = new THREE.MeshStandardMaterial({ 
    map: LEFT1Texture , 
    side: THREE.DoubleSide, 
    roughness: 0, 
    metalness: 0.5
});
const LEFT1Floor = new THREE.Mesh(new THREE.BoxGeometry(40, 35, 1), LEFT1TextureMaterial);
LEFT1Floor.rotation.y = Math.PI / 2; // Rotate to make it horizontal
LEFT1Floor.position.set(24, 2, 50); // Set position
                    //nipis     //width    //heigh
LEFT1Floor.scale.set(0.1, 0.5, 2); // Shrink width to create space for the door
LEFT1Floor.receiveShadow = true;
scene.add(LEFT1Floor);


//top
const topTexture = textureLoader.load('/images/texture/tile.jpg'); // Same texture as floor
topTexture .wrapS = THREE.RepeatWrapping;
topTexture .wrapT = THREE.RepeatWrapping;
topTexture .repeat.set(30, 10); // Adjust the repeat scale

const top1TextureMaterial = new THREE.MeshStandardMaterial({ 
    map: topTexture , 
    side: THREE.DoubleSide, 
    roughness: 0, 
    metalness: 0.5
});
const topFloor = new THREE.Mesh(new THREE.BoxGeometry(40, 35, 1), top1TextureMaterial);
topFloor.rotation.y = Math.PI / 2; // Rotate to make it horizontal
topFloor.position.set(24, 16, 45); // Set position
                    //nipis     //width    //heigh
                    topFloor.scale.set(0.3, 0.4, 2); // Shrink width to create space for the door
                    topFloor.receiveShadow = true;
scene.add(topFloor);

//ceiling room
const ceilingTexture = textureLoader.load('/images/texture/tile.jpg'); // Same texture as floor
ceilingTexture .wrapS = THREE.RepeatWrapping;
ceilingTexture .wrapT = THREE.RepeatWrapping;
ceilingTexture .repeat.set(30, 10); // Adjust the repeat scale

const ceilingTextureMaterial = new THREE.MeshStandardMaterial({ 
    map: ceilingTexture , 
    side: THREE.DoubleSide, 
    roughness: 0, 
    metalness: 0.5
});
const ceiling1 = new THREE.Mesh(new THREE.BoxGeometry(40, 35, 1), ceilingTextureMaterial);
ceiling1.rotation.x = Math.PI / 2; // Rotate to make it horizontal
ceiling1.position.set(42, 13.4, 45); // Set position
                    //nipis     //width    //heigh
                    ceiling1.scale.set(0.8, 1, 0.5); // Shrink width to create space for the door
                    ceiling1.receiveShadow = true;
scene.add(ceiling1);

//carpet

const carpetTexture = textureLoader.load('/images/texture/tile.jpg'); // Same texture as floor
carpetTexture .wrapS = THREE.RepeatWrapping;
carpetTexture .wrapT = THREE.RepeatWrapping;
carpetTexture .repeat.set(30, 10); // Adjust the repeat scale

const carpetTextureTextureMaterial = new THREE.MeshStandardMaterial({ 
    map: carpetTexture , 
    side: THREE.DoubleSide, 
    roughness: 0, 
    metalness: 0.5
});
const carpet = new THREE.Mesh(new THREE.BoxGeometry(40, 35, 1), carpetTextureTextureMaterial);
carpet.rotation.x = Math.PI / 2; // Rotate to make it horizontal
carpet.position.set(37, -0, 35); // Set position
                    //nipis     //width    //heigh
                    carpet.scale.set(0.4, 0.5, 0.2); // Shrink width to create space for the door
                    carpet.receiveShadow = true;
scene.add(carpet);

//OFFICE AREA-------------------------------------------------------------------

//right wall second path
const RWSPTexture = textureLoader.load('/images/texture/tile.jpg'); // Same texture as floor
RWSPTexture .wrapS = THREE.RepeatWrapping;
RWSPTexture .wrapT = THREE.RepeatWrapping;
RWSPTexture .repeat.set(30, 10); // Adjust the repeat scale

const RWSPTextureTextureMaterial = new THREE.MeshStandardMaterial({ 
    map: RWSPTexture , 
    side: THREE.DoubleSide, 
    roughness: 0, 
    metalness: 0.5
});
const RWSP = new THREE.Mesh(new THREE.BoxGeometry(40, 35, 1), RWSPTextureTextureMaterial);
RWSP.rotation.y = Math.PI / 2; // Rotate to make it horizontal
RWSP.position.set(24, 2, 17); // Set position
                    //nipis     //width    //heigh
                    RWSP.scale.set(1.2, 1, 2); // Shrink width to create space for the door
                    RWSP.receiveShadow = true;
scene.add(RWSP);

//left wall second path
const LWSPTexture = textureLoader.load('/images/texture/tile.jpg'); // Same texture as floor
LWSPTexture .wrapS = THREE.RepeatWrapping;
LWSPTexture .wrapT = THREE.RepeatWrapping;
LWSPTexture .repeat.set(30, 10); // Adjust the repeat scale

const LWSPTextureTextureMaterial = new THREE.MeshStandardMaterial({ 
    map: LWSPTexture , 
    side: THREE.DoubleSide, 
    roughness: 0, 
    metalness: 0.5
});
const LWSP = new THREE.Mesh(new THREE.BoxGeometry(40, 35, 1), LWSPTextureTextureMaterial);
LWSP.rotation.y = Math.PI / 2; // Rotate to make it horizontal
LWSP.position.set(24, 2, -24); // Set position
                    //nipis     //width    //heigh
                    LWSP.scale.set(0.5, 1, 2); // Shrink width to create space for the door
                    LWSP.receiveShadow = true;
scene.add(LWSP);


//top second path

const TSPTexture = textureLoader.load('/images/texture/tile.jpg'); // Same texture as floor
TSPTexture.wrapS = THREE.RepeatWrapping;
TSPTexture.wrapT = THREE.RepeatWrapping;
TSPTexture.repeat.set(5, 5); // Adjust the repeat scale

const TSPTextureMaterial = new THREE.MeshStandardMaterial({ 
    map: TSPTexture, 
    side: THREE.DoubleSide, 
    roughness: 0, 
    metalness: 0.5
});
const TSP = new THREE.Mesh(new THREE.BoxGeometry(40, 35, 1), TSPTextureMaterial);
TSP.rotation.y = Math.PI / 2; // Rotate to make it horizontal
TSP.position.set(24, 18, -11); // Set position
TSP.scale.set(2, 0.4, 2); // Shrink width to create space for the door
TSP.receiveShadow = true;
scene.add(TSP);



//entrance wall

const ENT1Texture = textureLoader.load('/images/texture/tile.jpg'); // Same texture as floor
ENT1Texture .wrapS = THREE.RepeatWrapping;
ENT1Texture .wrapT = THREE.RepeatWrapping;
ENT1Texture .repeat.set(30, 10); // Adjust the repeat scale

const ENT1TextureMaterial = new THREE.MeshStandardMaterial({ 
    map: ENT1Texture , 
    side: THREE.DoubleSide, 
    roughness: 0, 
    metalness: 0.5
});
const ENT1 = new THREE.Mesh(new THREE.BoxGeometry(40, 35, 1), ENT1TextureMaterial);

ENT1.position.set(35, 2, 23.6); // Set position
                    //nipis     //width    //heigh
                    ENT1.scale.set(0.653, 2, 2); // Shrink width to create space for the door
                    TSP.receiveShadow = true;
scene.add(ENT1);


//entrance wall 2

const ENT2Texture = textureLoader.load('/images/texture/tile.jpg'); // Same texture as floor
ENT2Texture .wrapS = THREE.RepeatWrapping;
ENT2Texture .wrapT = THREE.RepeatWrapping;
ENT2Texture .repeat.set(30, 10); // Adjust the repeat scale

const ENT2TextureMaterial = new THREE.MeshStandardMaterial({ 
    map: ENT2Texture , 
    side: THREE.DoubleSide, 
    roughness: 0, 
    metalness: 0.5
});
const ENT2 = new THREE.Mesh(new THREE.BoxGeometry(40, 35, 1), ENT2TextureMaterial);

ENT2.position.set(14, 2, -30); // Set position
                    //nipis     //width    //heigh
                    ENT2.scale.set(0.5, 1, 2); // Shrink width to create space for the door
                    ENT2.receiveShadow = true;
scene.add(ENT2);



// After adding all walls to the scene
const wallBoundingBoxes = [];

// Assuming you have an array of wall meshes
const walls = [frontWall, backWall, leftWall, rightWall, 
    floor , alternateFloor, LEFT1Floor , topFloor , ceiling1
    , carpet , RWSP , LWSP , TSP , ENT1 , ENT2 , 





]; // Add all wall meshes here

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
function hideGUI() {
  const guiContainer = document.querySelector('.dg.ac'); // Default class for dat.GUI
  if (guiContainer) {
    guiContainer.style.display = 'none';
  }
}


// Hide the GUI
hideGUI();
lightFolder.close(); // Open the lighting folder
lightDirectionFolder.close(); // Open the light direction folder
fogFolder.close(); // Open the fog folder


// Set camera position
// Set camera position
camera.position.set(7, 14,7);

// Rotate camera to look downward (45 degrees downward)
camera.rotation.x = -Math.PI / 2; // Convert 45 degrees to radians (downward tilt)

// Rotate camera 30 degrees to the left (yaw rotation)
//camera.rotation.y = -Math.PI / 20; // Convert 30 degrees to radians (left rotation)




// FPSControls class (integrated from your provided code)
class FPSControls {
  constructor(camera, scene) {
      this.camera = camera;
      this.scene = scene;
      this.pointerLockControls = new PointerLockControls(camera, document.body);

      scene.add(this.pointerLockControls.getObject()); // Use getObject()

      document.addEventListener('click', () => this.pointerLockControls.lock());

      this.velocity = new THREE.Vector3(0, 0, 0);
      this.acceleration = new THREE.Vector3(340, 2130, 340); //speed sa player 
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
          this.velocity.y += 12; // Adjust jump height as needed
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
        this.velocity.y = 1;
        position.y = 5;
        this.isStanding = true;
    }

    

    // Play both walking sounds when moving
    if (this.move.forward || this.move.backward || this.move.left || this.move.right) {
      if (!this.walkSound.isPlaying) {
        this.walkSound.play(); // Play the first sound
      }
      if (!this.secondWalkSound.isPlaying) {
        this.secondWalkSound.play(); // Play the second sound
      }
      position.y += Math.sin(Date.now() / 100) * 0.10; // Bump effect
    } else {
      if (this.walkSound.isPlaying) {
        this.walkSound.stop(); // Stop the first sound
      }
      // Delay stopping the second sound by 1 second
      if (this.secondWalkSound.isPlaying) {
        setTimeout(() => {
          this.secondWalkSound.stop(); // Stop the second sound after 1 second delay
        }, 1000); // 1000 milliseconds = 1 second
      }
    }
  }
}






// Instantiate FPSControls
const controls = new FPSControls(camera, scene);



const loader = new GLTFLoader();



/*
let walkingModel; 
let walkingMixer;

loader.load('/images/models/nathan_animated_003_-_walking_3d_man.glb', (gltf) => {
    walkingModel = gltf.scene;
    walkingMixer = new THREE.AnimationMixer(walkingModel);
    walkingModel.scale.set(0.0080, 0.0080, 0.0080);

    // Traverse the model to find and "cut" specific parts
    walkingModel.traverse((child) => {
        if (child.isMesh) {
            // Example: Remove or hide specific parts
            if (child.name === 'Head' || child.name === 'Torso') {
                child.visible = false; // Hide the part
                // OR remove it completely:
                // walkingModel.remove(child);
            }
        }
    });

    // Play walking animation
    gltf.animations.forEach((clip) => {
        const action = walkingMixer.clipAction(clip);
        action.play();
    });

    scene.add(walkingModel);
});


*/



//flood
// --------------------------------------------------------------------------------[Water Shader for Raging Sea]
// Vertex Shader for Water
const waterVertexShader = `
  uniform float time;
  varying vec2 vUv;
  varying float vWaveHeight;

  void main() {
    vUv = uv;

    // Increase wave height by changing amplitude
    float waveAmplitude = 12.0;  // Increase the wave height
    float waveFrequency = 0.;  // Control wave frequency (lower = wider waves)

    // Create waving effect based on sine and cosine functions
    vec3 newPosition = position;
    float waveHeight = sin(position.x * waveFrequency + time * 1.5) * waveAmplitude + 
                       cos(position.z * waveFrequency + time * 1.5) * waveAmplitude;

    // Apply wave height to y position
    newPosition.y += waveHeight;

    vWaveHeight = waveHeight;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
  }
`;


// Fragment Shader for Water
const waterFragmentShader = `
  uniform float time;
  uniform sampler2D normalMap;  // Normal map for water
  uniform vec3 lightPosition;   // Light source position
  uniform vec3 waterColor;      // Single color for the water
  varying vec2 vUv;
  varying float vWaveHeight;

  void main() {
    // Sample normal map to get water surface normals
    vec3 normal = texture2D(normalMap, vUv).rgb;
    normal = normalize(normal * 2.0 - 1.0); // Convert normal to [-21,1] range

    // Light reflection and refraction based on wave surface
    vec3 lightDir = normalize(lightPosition - gl_FragCoord.xyz);
    float diff = max(dot(normal, lightDir), 0.0);
    
    // Combine the water color with light and shadow effects
vec3 color = waterColor * diff * 0.8 + vec3(47.0/255.0, 56.0/255.0, 61.0/255.0) * (1.0 - diff);




    gl_FragColor = vec4(color, 0.5); // Set the alpha value for transparency (11 for semi-transparent)
  }
`;


//flood




// Load water model
let water1;  // Declare water globally
let waterMixer;  // Declare a global mixer variable

loader.load('/images/models/water_wave_for_ar.glb', (gltf) => {
  water1 = gltf.scene;
  water1.scale.set(0.3, 0.3, 0.31);
  water1.position.set(20, 24, 20); // Starting position of the water
  water1.castShadow = true;
  water1.receiveShadow = true;
    scene.add(water1);

    // Make the water darker by adjusting its material
    water1.traverse((child) => {
        if (child.isMesh) {
            if (child.material) {
                child.material.color = new THREE.Color(0x001a33); // Dark blue
                child.material.emissive = new THREE.Color(0x000000); // No emissive light
                child.material.needsUpdate = true; // Update the material
            }
        }
    });

    if (gltf.animations && gltf.animations.length) {
      waterMixer = new THREE.AnimationMixer(water1);
      gltf.animations.forEach((clip) => {
          const action = waterMixer.clipAction(clip);
          action.play(); // Play the animation
      });
  }
});





// Load normal map texture for the water
const normalTexture = textureLoader.load('/images/texture/waterNormalMap.jpg'); // Load normal map texture

const waterMaterial = new THREE.ShaderMaterial({
  vertexShader: waterVertexShader,
  fragmentShader: waterFragmentShader,
  uniforms: {
    time: { value: 10 },
    normalMap: { value: normalTexture },
    lightPosition: { value: directionalLight.position },
    waterColor: { value: new THREE.Color(0.9, 0.9, 0.9) },
  },
  side: THREE.DoubleSide,
  transparent: true,
  opacity: 0.2,
  wireframe: false,
  depthWrite: false,
});

const waterGeometry = new THREE.PlaneGeometry(900, 900, 512, 512); // Increase segments for better wave definition
const water = new THREE.Mesh(waterGeometry, waterMaterial);
water.rotation.x = -Math.PI * 0.5; // Rotate water to lie flat
water.position.set(0, 1.5, 0); // Position the water at the bottom
water.scale.set(0.130, 0.130, 0.130); // Position the water at the bottom
scene.add(water);











//================================================================
// Character (Zombie) Setup
//================================================================

let isFirstPerson = false;
let isZombieMoving = true; // Track whether the zombie should move
let zombieState = "patrolling"; // Initial state of the zombie
const clock = new THREE.Clock();

//================================================================
// Screen Effects (Damage Overlay)
//================================================================
const damageOverlay = document.getElementById('damage-overlay');

// Function to make the screen flicker red
function triggerRedFlicker() {
  let flickerCount = 0; // Count flickers
  const maxFlickers = 5; // Total number of flickers

  const interval = setInterval(() => {
    damageOverlay.style.opacity = damageOverlay.style.opacity === '0' ? '1' : '0';
    flickerCount++;
    if (flickerCount >= maxFlickers * 2) {
      clearInterval(interval);
      damageOverlay.style.opacity = '0'; // Ensure it ends in a non-visible state
    }
  }, 100); // Flicker interval (in milliseconds)
}

// Attack sound setup
const attackSound = new Audio('/sounds/Monsterscream.mp3'); // Add your attack sound file here
attackSound.volume = 1; // Max volume
attackSound.playbackRate = 2; // Slightly increase playback speed for intensity

function onZombieAttack() {
  triggerRedFlicker();
  console.log('Player attacked by zombie!');

  // Play the attack sound
  attackSound.play();

  // Ensure the zombie doesn't tilt during the attack
  zombie.rotation.x = 0;  // Reset X-axis rotation (no tilt)
  zombie.rotation.z = 0;  // Reset Z-axis rotation (no tilt)

 // Make the zombie's face directly toward a point lower than the camera's position when attacking
const directionToCameraLower = new THREE.Vector3();
directionToCameraLower.subVectors(camera.position, zombie.position);
directionToCameraLower.y -= 1; // Lower the target by 1 unit (adjust as needed)
directionToCameraLower.normalize();

// Calculate the angle to rotate towards the lower target (Y-axis rotation)
const angleLower = Math.atan2(directionToCameraLower.x, directionToCameraLower.z); // Use directionToCameraLower here
zombie.rotation.y = angleLower;
  // Trigger the attack animation here if any
  // For example:
  // zombieAnimation.play("attack_animation");

  // Camera shake logic
  const shakeDuration = 0.2; // Shake duration in seconds
  const shakeMagnitude = 0.1; // Magnitude of shake (how far the camera moves)

  const originalCameraPosition = camera.position.clone(); // Store the original position
  const originalFOV = camera.fov; // Store the original FOV
  
  // Set the zoom effect (zoom in the camera)
  const zoomDuration = 0.2; // Duration of zoom effect in seconds
  const zoomMagnitude = 30; // The field of view to zoom into (smaller means more zoomed in)
  camera.fov = zoomMagnitude; // Set the camera to zoom in

  let shakeTime = 0;
  let zoomTime = 0;

  function shakeCamera() {
    if (shakeTime < shakeDuration) {
      // Apply random movement to the camera position
      camera.position.x = originalCameraPosition.x + (Math.random() - 0.5) * shakeMagnitude;
      camera.position.y = originalCameraPosition.y + (Math.random() - 0.5) * shakeMagnitude;
      camera.position.z = originalCameraPosition.z + (Math.random() - 0.5) * shakeMagnitude;

      shakeTime += 0.016; // Assume 60 FPS, so 1 frame = 0.016s
      requestAnimationFrame(shakeCamera); // Continue shaking
    } else {
      // Restore the camera to its original position after the shake
      camera.position.copy(originalCameraPosition);
    }
  }

  function zoomCamera() {
    if (zoomTime < zoomDuration) {
      // Gradually zoom back to the original FOV
      camera.fov = THREE.MathUtils.lerp(camera.fov, originalFOV, zoomTime / zoomDuration);
      camera.updateProjectionMatrix(); // Update the camera's projection matrix to apply the FOV change

      zoomTime += 0.016; // Assume 60 FPS, so 1 frame = 0.016s
      requestAnimationFrame(zoomCamera); // Continue zooming
    } else {
      // Reset the camera's FOV after zoom effect
      camera.fov = originalFOV;
      camera.updateProjectionMatrix();
    }
  }
  
  // Start the shake and zoom effects
  shakeCamera();
  zoomCamera();
}

//================================================================
// Zombie Movement (AI Behavior)
//================================================================
// Square boundaries (min and max coordinates ```javascript
const minX = -40, maxX = 40;
const minZ = -40, maxZ = 40;

let currentTarget = new THREE.Vector3();  // Current target position for the zombie
let isMovingToTarget = false;  // Flag to track if the zombie is moving to a new target
const wanderDistance = 50; // Distance at which the zombie starts wandering

// Update zombie state and movement
function updateZombie() {
  if (zombie) {
    const playerPosition = camera.position;
    const zombiePosition = zombie.position;
    const distanceToPlayer = playerPosition.distanceTo(zombiePosition);
    const direction = new THREE.Vector3();
    direction.subVectors(playerPosition, zombiePosition).normalize();






    
    switch (zombieState) {
      case "patrolling":
        patrolRandomly();
        if (distanceToPlayer < 32) {
          zombieState = "chasing"; // Start chasing if within range
        }
        break;

      case "chasing":
        chasePlayer(direction, distanceToPlayer);
        if (distanceToPlayer < 5) {
        
          zombieState = "attacking"; // Attack if extremely close
        } else if (distanceToPlayer > 50) {
          zombieState = "patrolling"; // Return to patrol if too far away
          isMovingToTarget = false;  // Reset movement flag to trigger new patrol target
        } else if (distanceToPlayer > wanderDistance) {
          zombieState = "wandering"; // Start wandering if player is far away
        }
        
        break;

      case "attacking":
        onZombieAttack(); // Trigger red flicker effect when attacking
        if (distanceToPlayer < 1) {
          gameOver(); // Trigger game over if zombie catches player
        } else if (distanceToPlayer > 30) {
          zombieState = "chasing"; // Continue chasing if player is still close
          damageOverlay.style.opacity = '0'; // Stop the red flicker when player is too far
        } else if (distanceToPlayer > 5) {
          zombieState = "chasing"; // Stop attacking and go back to chasing
          damageOverlay.style.opacity = '0'; // Stop the red flicker
        }
        break;

      case "wandering":
        wanderRandomly();
        if (distanceToPlayer < wanderDistance) {
          zombieState = "chasing"; // Return to chasing if player is within range
        }
        break;
    }
  }
}



//================================================================
// Game Over Effect with Delay
//================================================================

let gameOverState = false; // Track the game over state
const gameoverSound = new Audio('/sounds/Game Over Sound Effect - SFX.mp3');  // Replace with actual path

function gameOver() {
  // Stop all animations
  if (mixer) {
    mixer.stopAllAction();  // Stop all animations
  }

 // Set the gameOverState flag to true
gameOverState = true;

// Add a delay before showing the "Game Over" message
setTimeout(() => {
  // Display "Game Over" message
  const gameOverMessage = document.createElement('div');
  gameoverSound.play();
  gameOverMessage.style.position = 'absolute';
  gameOverMessage.style.top = '50%';
  gameOverMessage.style.left = '50%';
  gameOverMessage.style.transform = 'translate(-50%, -50%)';
  gameOverMessage.style.fontSize = '48px';
  gameOverMessage.style.fontFamily = 'Courier New, Courier, monospace';
  gameOverMessage.style.color = 'red';
  gameOverMessage.style.fontWeight = 'bold';
  gameOverMessage.innerText = 'GAME OVER\nPress Ctrl + R to restart';
  document.body.appendChild(gameOverMessage);

  // Create the image element
  const gameOverImage = document.createElement('img');
  gameOverImage.src = '/images/pics/bloodscreen.png'; // Correct image path
  gameOverImage.style.position = 'absolute';
  gameOverImage.style.position = 'fixed';
  gameOverImage.style.top = '0';
  gameOverImage.style.left = '0';
  gameOverImage.style.width = '100%';
  gameOverImage.style.height = '100%';
  gameOverImage.style.filter = 'contrast(41)';
  gameOverImage.style.opacity = '0.3';
  gameOverImage.style.zIndex = '-5'; // Set the z-index behind other elements
  document.body.appendChild(gameOverImage); // Append the image to the body

  // Listen for 'Ctrl + R' key press to restart the game
  document.addEventListener('keydown', (event) => {
    if (event.ctrlKey && event.key === 'r') {
      restartGame();  // Restart the game when Ctrl + R is pressed
      document.body.removeChild(gameOverMessage);  // Remove the game over message
      document.body.removeChild(gameOverImage);  // Remove the image as well
    }
  });
}, 2000); // Delay for 2 seconds before showing the message

// Play the key collection sound
gameoverSound.play();
}


//================================================================
// Game Restart Function
//================================================================
function restartGame() {
  // Reset game state
  zombie.position.set(-40, 0, 20); // Reset zombie position
  camera.position.set(0, 14, 24); // Reset camera position
  zombieState = "patrolling"; // Reset zombie state
  isZombieMoving = true; // Enable zombie movement

  // Restart the animation
  if (mixer) {
    mixer.stopAllAction();  // Stop any active animation
    gltf.animations.forEach((clip) => {
      mixer.clipAction(clip).play(); // Play animations again
    });
  }

  // Additional reset logic (if needed)
  // Reset the player's position, game variables, etc.

  // You can call any necessary functions to reset the game scene here
  // For example: resetPlayerPosition(), resetGameEnvironment(), etc.
}








// Patrol randomly within the square area
function patrolRandomly() {
  if (!isMovingToTarget) {
    // Set a random target within the defined area
    currentTarget.set(
      Math.random() * (maxX - minX) + minX,  // Random x within the range
      0,  // Y remains constant (since this is a flat 2D plane for movement)
      Math.random() * (maxZ - minZ) + minZ   // Random z within the range
    );
    isMovingToTarget = true;  // Start moving to the new target
  }

  // Move zombie towards the target
  const distanceToTarget = zombie.position.distanceTo(currentTarget);
  
  if (distanceToTarget < 1) {
    // If the zombie reaches the target, stop moving and pick a new target
    isMovingToTarget = false;
    currentTarget.set(
      Math.random() * (maxX - minX) + minX,  // Random x within the range
      0,  // Y remains constant (since this is a flat 2D plane for movement)
      Math.random() * (maxZ - minZ) + minZ   // Random z within the range
    );
  } else {
    // Move towards the target
    const direction = new THREE.Vector3();
    direction.subVectors(currentTarget, zombie.position).normalize();

    // Update zombie's rotation to face the target
    const angle = Math.atan2(direction.x, direction.z);  // Calculate the angle
    zombie.rotation.y = angle;  // Make the zombie face the target

    const patrolSpeed = 0.04;  // Patrol speed
    zombie.position.addScaledVector(direction, patrolSpeed);  // Move towards the target
  }

  // Optional: Randomly rotate slightly to simulate looking around
  if (Math.random() < 0.04) {
    zombie.rotation.y += (Math.random() - 0.5) * Math.PI / 4; // Randomly adjust rotation
  }
}

// Chase the player
function chasePlayer(direction, distanceToPlayer) {
  if (distanceToPlayer < 10) {
    zombie.position.addScaledVector(direction, 0.04); // Speed up when closer to the player
    zombie.lookAt(camera.position); // Always face the player

    // Ensure zombie remains upright during chase
    zombie.rotation.x = 0;  // Lock tilt on X-axis
    zombie.rotation.z = 0;  // Lock tilt on Z-axis
  }

  // Ensure zombie stays on the ground (y = 0)
  zombie.position.y = 1; // Adjust this value based on your scene

}

// Wander randomly within the defined area
function wanderRandomly() {
  if (!isMovingToTarget) {
    // Set a random target within the defined area
    currentTarget.set(
      Math.random() * (maxX - minX) + minX,  // Random x within the range
      0,  // Y remains constant (since this is a flat 2D plane for movement)
      Math.random() * (maxZ - minZ) + minZ   // Random z within the range
    );
    isMovingToTarget = true;  // Start moving to the new target
  }

  // Move zombie towards the target
  const distanceToTarget = zombie.position.distanceTo(currentTarget);
  
  if (distanceToTarget < 1) {
    // If the zombie reaches the target, stop moving and pick a new target
    isMovingToTarget = false;
    currentTarget.set(
      Math.random() * (maxX - minX) + minX,  // Random x within the range
      0,  // Y remains constant (since this is a flat 2D plane for movement)
      Math.random() * (maxZ - minZ) + minZ   // Random z within the range
    );
  } else {
    // Move towards the target
    const direction = new THREE.Vector3();
    direction.subVectors(currentTarget, zombie.position).normalize();

    // Update zombie's rotation to face the target
    const angle = Math.atan2(direction.x, direction.z);  // Calculate the angle
    zombie.rotation.y = angle;  // Make the zombie face the target

    const wanderSpeed = 0.05;  // Wander speed
    zombie.position.addScaledVector(direction, wanderSpeed);  // Move towards the target
  }

  // Optional: Randomly rotate slightly to simulate looking around
  if (Math.random() < 0.04) {
    zombie.rotation.y += (Math.random() - 0.5) * Math.PI / 4; // Randomly adjust rotation
  }
}

//================================================================
// Character (Zombie) Setup
//================================================================

let zombie, mixer;

loader.load('/images/models/character_spiderwatch_wrangler_-_take_two.glb', (gltf) => {
  zombie = gltf.scene;
  zombie.scale.set(14, 14,14 );
  zombie.position.set(20, 4, 20); // Starting position of the zombie
  zombie.castShadow = true;
  zombie.receiveShadow = true;
  scene.add(zombie);

  // Initialize the animation mixer for the zombie
  mixer = new THREE.AnimationMixer(zombie);

  gltf.animations.forEach((clip) => {
    const action = mixer.clipAction(clip);
    action.play(); // Play animations
    action.timeScale = 0.5; // Slow down the animation by 50%
  });
});

//================================================================
// Input and Controls
//================================================================
document.addEventListener('click', () => {
  if (!isFirstPerson) {
    pointerLockControls.lock(); // Enable first-person mode
    isFirstPerson = true;
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && isFirstPerson) {
    pointerLockControls.unlock(); // Exit first-person mode
    isFirstPerson = false;
  }
});
// First zombie sound
const zombieSound1 = new Audio('/sounds/gnoll sound.mp3');
zombieSound1.loop = true; // Loop for continuous sound

// Second zombie sound (can be the same sound or a different one)
const zombieSound2 = new Audio('/sounds/Walk-mont.mp3');
zombieSound2.loop = true; // Loop for continuous sound

function zombieFollowPlayer() {
  if (isZombieMoving && zombie) {
    const playerPosition = camera.position;
    const zombiePosition = zombie.position;

    const direction = new THREE.Vector3();
    direction.subVectors(playerPosition, zombiePosition).normalize();

    zombie.lookAt(playerPosition);

    const distanceToPlayer = playerPosition.distanceTo(zombiePosition);

    let speed = 0.030; // Base zombie speed

    // Adjust volume based on distance (closer = louder)
    let volume = 0;

    if (distanceToPlayer <= 8) {
      // At 8 units or less, volume is at maximum (1)
      volume = 1;
    } else if (distanceToPlayer > 8 && distanceToPlayer <= 20) {
      // Between 8 and 20 units, volume stays high (near max)
      volume = 1;
    } else if (distanceToPlayer > 20 && distanceToPlayer <= 26) {
      // Between 20 and 26 units, gradually fade out the sound
      volume = Math.max(0, 1 - (distanceToPlayer - 20) / 6);
    } else {
      // Beyond 26 units, pause both sounds and reset
      zombieSound1.pause();
      zombieSound2.pause();
      zombieSound1.currentTime = 0;
      zombieSound2.currentTime = 0;
      zombieSound1.volume = 0;
      zombieSound2.volume = 0;
    }

    // Play the sounds if the player is within range
    if (distanceToPlayer <= 26) {
      if (zombieSound1.paused) {
        zombieSound1.play(); // Start the first sound if not playing
      }
      if (zombieSound2.paused) {
        zombieSound2.play(); // Start the second sound if not playing
      }

      // Apply adjusted volume to both sounds
      zombieSound1.volume = volume;
      zombieSound2.volume = volume;
    }

    // Adjust playback rate based on distance (closer = higher pitch)
    const maxPlaybackRate = 1.5; // Maximum pitch (close)
    const minPlaybackRate = 0.5; // Minimum pitch (far)
    let playbackRate = THREE.MathUtils.mapLinear(
      distanceToPlayer,
      35, // max distance (far)
      1,  // min distance (close)
      minPlaybackRate,
      maxPlaybackRate
    );
    playbackRate = THREE.MathUtils.clamp(playbackRate, minPlaybackRate, maxPlaybackRate);

    zombieSound1.playbackRate = playbackRate;
    zombieSound2.playbackRate = playbackRate;

    if (distanceToPlayer < 1) {
      speed = 0.2; // Increase zombie speed when very close
      zombie.position.y = -12;
      // Attack player if extremely close
      if (distanceToPlayer < 5) {
        onZombieAttack(); // Trigger attack
      }
    }

    // Move zombie towards the player
    zombie.position.addScaledVector(direction, speed);
  }
}



//================================================================
// Candle Setup and Interactions
//================================================================

let lightObject;

let pointLight; // For candle-like light

let candleMixer;
// Load the .glb model for the candle
// Load the .glb model for the candle
loader.load(
  '/images/models/',
  function (gltf) {
    lightObject = gltf.scene;

    // Position and scale the model
    lightObject.position.set(2.3, -4, -1.5);
    lightObject.scale.set(21, 21, 21); 
    lightObject.rotation.x = Math.PI / -23;

    // Add the model to the camera
    camera.add(lightObject);

    // Create a yellow point light (simulating candle light)
    pointLight = new THREE.PointLight(0xFFFF00, 1, 10); // Yellow light, intensity of 1, range 10
    pointLight.position.set(0, 0, 0); // Place it at the camera's position
    pointLight.scale.set(110, 110, 110); 
    camera.add(pointLight);

    // Create an AnimationMixer if the model has animations
    if (gltf.animations && gltf.animations.length) {
      candleMixer = new THREE.AnimationMixer(lightObject); // Use candleMixer for the candle
      gltf.animations.forEach((clip) => {
        candleMixer.clipAction(clip).play(); // Play all animations
      });
    }

    // Optional: Log the object to check it's been added to the camera
    console.log(lightObject);
  },
  undefined, // Optional: onProgress callback
  function (error) { // onError callback
    console.error('An error occurred while loading the model:', error);
  }
);




















//================================================================
// Key Setup and Interactions
//================================================================
let hasKey = false;  // Flag to check if the player has the key
let hasUsedKey = false;  // Flag to check if the key has been used
let boundDoor = null;  // The specific door this key is bound to

// Sound effect for collecting the key
const keyCollectSound = new Audio('/sounds/key.mp3');  // Replace with actual path

// Sound effect for opening the door
const doorOpenSound = new Audio('/sounds/Door.mp3');  // Replace with actual path
doorOpenSound.volume = 1.0;  // Set volume to maximum

// Load the .glb model for the key
let keyObject;
loader.load('/images/models/metal_credit_card.glb', function (gltf) {
  keyObject = gltf.scene; // The loaded key model
  keyObject.position.set(-35, 3, 19);
  keyObject.scale.set(0.4, 0.4, 0.4); // Adjust scale if needed
  scene.add(keyObject);
  keyObject.rotation.x = Math.PI / 2;
}, undefined, function (error) {
  console.error(error);
});

// Bind the key to a specific door
function bindKeyToDoor(door) {
  boundDoor = door;  // Assign the key to open this door
}

// Export functions for key-related interactions
export function showKeyCollectNote() {
  const keyCollectNote = document.getElementById('key-collect-note');
  if (keyCollectNote) {
    keyCollectNote.style.display = 'block';  // Show the key collect note
  }
}

export function hideKeyCollectNote() {
  const keyCollectNote = document.getElementById('key-collect-note');
  if (keyCollectNote) {
    keyCollectNote.style.display = 'none';  // Hide the key collect note
  }
}

// Function to check proximity to key and show note
function checkProximityToKey(playerPosition) {
  if (keyObject) {
    const keyPosition = keyObject.position.clone();
    const distance = playerPosition.distanceTo(keyPosition);

    if (distance < 5 && !hasKey) {  // Only show note if the player doesn't already have the key
      showKeyCollectNote();
      document.addEventListener('keydown', onKeyPress);
    } else {
      hideKeyCollectNote();
    }
  }
}

// Handle key press to collect the key
function onKeyPress(event) {
  if (event.key === 'c' && !hasUsedKey) {  // Only collect key if it hasn't been used yet
    const distanceToKey = camera.position.distanceTo(keyObject.position);
    if (distanceToKey < 15) {
      onKeyCollected();
      hideKeyCollectNote();
      keyCollectSound.play();  // Play the sound when the key is collected
    }
  }
}

// Function to collect the key
function onKeyCollected() {
  if (keyObject) {
    // Remove the key from its current position in the scene
    scene.remove(keyObject);

    // Attach the key to the camera
    camera.add(keyObject);

    // Position the key in front of the camera (e.g., 2 units forward, 0.5 units up)
    keyObject.position.set(0.2, -0.5, -1); // Adjust as needed
    
    // Adjust the scale to make the key visible but not too large
    keyObject.scale.set(0.3, 0.4, 0.3); // Fine-tune scale if needed
  }


  hasKey = true; // Update the flag

  // Hide the key collect note
  hideKeyCollectNote();

  // Play the key collection sound
  keyCollectSound.play();

  // Show the key in the inventory UI (optional)
  const keyImageContainer = document.getElementById('key-image-container');
  if (keyImageContainer) {
    keyImageContainer.style.display = 'block';
  }
}


//================================================================
// Door Setup and Interactions
//================================================================

// Load the texture for the door
const doorTexture = textureLoader.load('images/texture/moderndoor.jpg'); // Set your image path

// Set the texture to repeat
doorTexture.wrapS = THREE.RepeatWrapping;  // Repeat the texture on the X-axis
doorTexture.wrapT = THREE.RepeatWrapping;  // Repeat the texture on the Y-axis

// Adjust the number of times the texture repeats (adjust these values as needed)
doorTexture.repeat.set(1, 1);  // Repeat the texture 2 times along X, 3 times along Y

// Create a material with the loaded texture
const doorMaterial = new THREE.MeshStandardMaterial({
  map: doorTexture,  // Apply the texture to the material

  side: THREE.DoubleSide  // Optionally, apply texture to both sides of the door
});

// Define the door geometry (size of the door)
const doorGeometry = new THREE.BoxGeometry(3, 6, 0.2); // Width, height, depth of the door

// Create the door mesh with the geometry and material
const door = new THREE.Mesh(doorGeometry, doorMaterial);

// Position the door in your scene (adjust position as needed)
door.position.set(24, 4,44); // Example position (x, y, z)
door.rotation.y = Math.PI / -2;
door.scale.set(3,2, 7); // Example position (x, y, z)

// Add the door to the scene
scene.add(door);

// Bind the key to this door
bindKeyToDoor(door);

let doorOpen = false; // Flag to track if the door is open

function checkProximityToDoor(playerPosition) {
  const doorPosition = door.position.clone();
  const distanceToDoor = playerPosition.distanceTo(doorPosition);

  if (distanceToDoor < 10) { // You can adjust the distance to your needs
    if (hasKey && !doorOpen && !hasUsedKey && boundDoor === door) {  // Ensure the key is bound to this door
      // Display a prompt to open the door if the player has the key
      showDoorOpenNote();  // Function to show a prompt on the screen (optional)
      document.addEventListener('keydown', onDoorPress);
    } else {
      // Display a different message if the player doesn't have the key
      showNoKeyNote();  // Function to show a "no key" message
      document.removeEventListener('keydown', onDoorPress);
    }
  } else {
    hideDoorNote();  // Hide the door prompt when not close
    document.removeEventListener('keydown', onDoorPress);
  }
}

// Handle "E" key press to open the door
function onDoorPress(event) {
  if (event.key === 'e') {
    if (hasKey && !hasUsedKey && boundDoor === door) {  // Only open this specific door with the key
      openDoor();  // Function to open the door
      doorOpenSound.play();  // Play the sound when the door opens
    } else {
      alert('You need the correct key to open the door!');  // Alert if the player doesn't have the key or tries to open the wrong door
    }
  }
}

function openDoor() {
  if (doorOpen) return; // Prevent reopening if already open
  doorOpen = true;

  // Animate the door's position to simulate it opening
  const doorTargetPosition = door.position.clone();
  doorTargetPosition.z -= 5.4; // Move the door 5 units to the left (adjust as needed)
  
  const animationDuration = 1; // 1-second animation
  let startTime = performance.now();

  function animateDoor() {
    const elapsedTime = (performance.now() - startTime) / 50000; // Time elapsed in seconds
    if (elapsedTime < animationDuration) {
      // Lerp (smooth transition) between current position and target position
      door.position.lerp(doorTargetPosition, elapsedTime / animationDuration);
      requestAnimationFrame(animateDoor);
    } else {
      // Ensure the door ends up at the final position
      door.position.copy(doorTargetPosition);
    }
  }

  animateDoor();

  // Play door open sound
  doorOpenSound.play();

  // Mark the key as used
  hasUsedKey = true;

  // Remove the key from the camera and scene
  if (keyObject) {
    camera.remove(keyObject); // Detach from the camera
    keyObject = null; // Fully remove the key reference
    const keyImageContainer = document.getElementById('key-image-container');
  if (keyImageContainer) {
    keyImageContainer.style.display = 'none';  // Hide the key image
  }
  }

  // Hide the inventory image
  hideKeyImage();
}


// Show the door prompt
function showDoorOpenNote() {
  const doorNote = document.getElementById('door-open-note');
  if (doorNote) {
    doorNote.style.display = 'block';  // Show the "Press E to open the door" note
  }
}

// Hide the door prompt
function hideDoorNote() {
  const doorNote = document.getElementById('door-open-note');
  if (doorNote) {
    doorNote.style.display = 'none';  // Hide the door prompt
  }
}

// Show the "no key" message
function showNoKeyNote() {
  const noKeyNote = document.getElementById('no-key-note');
  if (noKeyNote) {
    noKeyNote.style.display = 'block';  // Show "You need the key" note
  }
}



// Import necessary Three.js components

import TWEEN from '@tweenjs/tween.js';

// Initialize audio elements for each action with max volume
const wrongPasswordSound = new Audio('/sounds/Sound effect WRONG ANSWER.mp3');
const correctPasswordSound = new Audio('/sounds/Correct answer Sound effect.mp3');
const typingSound = new Audio('/sounds/enter button on a keyboard sound effect (royalty free).mp3');
const deviceInteractionSound = new Audio('/sounds/90s PC boot sequence with sound HD.mp3');
const doorOpenSound1 = new Audio('/sounds/Faction Vault Door Open (Fortnite Sound) - Sound Effect for editing.mp3');  // Path to the door open sound effect




wrongPasswordSound.volume = 1.0;
correctPasswordSound.volume = 1.0;
typingSound.volume = 1.0;
deviceInteractionSound.volume = 1.0;
doorOpenSound1.volume = 1.0;  // Set volume to maximum


// Create the password door and device
let passwordDoor, passwordDevice;
let correctPassword = "1532";  // Correct password
let enteredPassword = "";  // Holds the player's input
let isInteracting = false;  // To check if the player is interacting
let interactionUI;  // UI elements for instructions
let inputDiv;  // Password input div
let playerPosition;  // Store player's position for distance check
let deviceInteracted = false;  // To track if the device has been interacted with already

const customDoorTexture = textureLoader.load('/images/texture/glass.jpg');  // Set your image path

// Set texture wrapping
customDoorTexture.wrapS = THREE.RepeatWrapping;  // Repeat the texture on the X-axis
customDoorTexture.wrapT = THREE.RepeatWrapping;  // Repeat the texture on the Y-axis

// Adjust the number of times the texture repeats
customDoorTexture.repeat.set(1, 1);  // Repeat the texture 1 time along X, 1 time along Y

// Create material with transparency and smoothness
const customDoorMaterial = new THREE.MeshStandardMaterial({
  map: customDoorTexture,        // Apply the texture
  transparent: true,             // Enable transparency
  opacity: 0.7,                  // Set semi-transparency (adjust 0 to 1 for desired effect)
  roughness: 0,                  // Make the material completely smooth
  side: THREE.DoubleSide         // Apply the texture to both sides
});

// Define geometry for the door
const customDoorGeometry = new THREE.BoxGeometry(1, 3, 0.2); // Width, height, depth of the door

// Create the door mesh
const texturedPasswordDoor = new THREE.Mesh(customDoorGeometry, customDoorMaterial);

// Position and scale the door
texturedPasswordDoor.position.set(23, 7, -42); // Same position as the original door
texturedPasswordDoor.rotation.y = Math.PI / 2;
texturedPasswordDoor.scale.set(16, 6, 4);  // Example scale (width, height, depth)

// Add the door to the scene
scene.add(texturedPasswordDoor);



const modelPath = '/images/models/simple_mini-atm.glb';  // Path to your .glb file

// Initialize passwordDevice as null initially
passwordDevice = null;

// Load the .glb model and add it to the scene
loader.load(modelPath, function (gltf) {
  passwordDevice = gltf.scene;
  passwordDevice.scale.set(0.0030, 0.0030, 0.0030); 
  passwordDevice.position.set(27, 6, -49.2); 
  passwordDevice.rotation.y = Math.PI / -2;
  scene.add(passwordDevice);
  console.log("Green device manager loaded");
}, undefined, function (error) {
  console.error("Error loading the GLTF model:", error);
});

// Create the UI instructions (hidden initially)
function createInteractionUI() {
  interactionUI = document.createElement('div');
  interactionUI.style.position = 'absolute';
  interactionUI.style.top = '10px';
  interactionUI.style.left = '50%';
  interactionUI.style.transform = 'translateX(-50%)';
  interactionUI.style.color = 'white';
  interactionUI.style.fontSize = '20px';
  interactionUI.style.fontFamily = 'Arial, sans-serif';
  interactionUI.innerHTML = ""; // Initially empty
  document.body.appendChild(interactionUI);
}
createInteractionUI();

// Handle key events for interaction
let typingTimeout;  // Timer for typing sound
function handleKeyPress(event) {
  if (event.key === 'e' && !isInteracting && !deviceInteracted) {
    if (isNearDevice()) {
      startPasswordInput();
      playDeviceInteractionSound();  // Play device interaction sound
    }
  } else if (event.key === 'q' && isInteracting) {
    quitInteraction();
    playDeviceInteractionSound();  // Play device interaction sound when closing
  } else if (isInteracting && event.key >= '0' && event.key <= '9') {
    enteredPassword += event.key;
    updatePasswordDisplay();
    playTypingSound();  // Play typing sound for entering password
    resetTypingSoundTimeout();  // Reset typing sound timeout to continue playing
  } else if (isInteracting && event.key === 'Enter') {
    validatePassword(enteredPassword);
  } else if (isInteracting && event.key === 'Backspace') {
    enteredPassword = enteredPassword.slice(0, -1);
    updatePasswordDisplay();
    playTypingSound();  // Play typing sound for backspace
    resetTypingSoundTimeout();  // Reset typing sound timeout to continue playing
  }
}
window.addEventListener('keydown', handleKeyPress);

// Handle mouse interaction (detect if player is looking at the device)
function onMouseMove(event) {
  const mouse = new THREE.Vector2();
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  const raycaster = new THREE.Raycaster();
  raycaster.setFromCamera(mouse, camera);

  const intersects = raycaster.intersectObjects([passwordDevice]);

  if (intersects.length > 0 && !isInteracting && isNearDevice() && !deviceInteracted) {
    interactionUI.innerHTML = "Press E to Interact with the Device Manager";  // Show instructions if near device
  } else if (intersects.length === 0 && !isInteracting) {
    interactionUI.innerHTML = "";  // Clear instructions when not near the device
  }
}
window.addEventListener('mousemove', onMouseMove);

// Check if player is near the device (within 15 tiles, assuming each tile is 1 unit in 3D space)
function isNearDevice() {
  if (!passwordDevice) return false;  // Make sure the device is loaded

  playerPosition = camera.position;
  const devicePosition = passwordDevice.position;
  const distance = playerPosition.distanceTo(devicePosition);
  console.log("Distance to device:", distance);  // Log the distance to the device
  return distance <= 8;  // 8 units distance check (adjust as needed)
}

// Start the password input process
function startPasswordInput() {
  isInteracting = true;
  playDeviceInteractionSound();  // Play sound for interaction
  interactionUI.innerHTML = "Enter Password:";

  inputDiv = document.createElement('div');
  inputDiv.style.position = 'absolute';
  inputDiv.style.top = '50%';
  inputDiv.style.left = '50%';
  inputDiv.style.transform = 'translate(-50%, -50%)';
  inputDiv.style.backgroundColor = 'rgba(0,0,0,0.8)';
  inputDiv.style.padding = '20px';
  inputDiv.style.borderRadius = '10px';
  inputDiv.style.color = 'white';
  inputDiv.style.fontFamily = 'fantasy';  // Set font to fantasy
  inputDiv.innerHTML = ` 
    <p style="font-size: 30px;">Entered Password: ${enteredPassword}</p>
    <p>Press Enter to Submit</p>
  `;
  document.body.appendChild(inputDiv);
}

// Update the password display (show the entered password)
function updatePasswordDisplay() {
  if (inputDiv) {
    inputDiv.innerHTML = ` 
      <p style="font-size: 30px; color: ${isCorrectPassword() ? 'green' : 'red'};">Entered Password: ${enteredPassword}</p>
      <p>Press Enter to Submit</p>
    `;
  }
}

// Validate the entered password
function validatePassword(password) {
  console.log("Entered Password:", password);  // Debugging the entered password
  if (password === correctPassword) {
    openPasswordDoor();
    showPasswordMessage(true);
    playCorrectPasswordSound();  // Play correct password sound
    setTimeout(() => quitInteraction(), 2000); // Delay before quitting interaction
    deviceInteracted = true;
  } else {
    showPasswordMessage(false);
    playWrongPasswordSound();  // Play wrong password sound
    enteredPassword = ""; // Reset password input to try again
  }
}

// Check if the entered password is correct
function isCorrectPassword() {
  return enteredPassword === correctPassword;
}

// Show password validation message with styling
function showPasswordMessage(isCorrect) {
  const messageDiv = document.createElement('div');
  messageDiv.style.position = 'absolute';
  messageDiv.style.top = '60%';
  messageDiv.style.left = '50%';
  messageDiv.style.transform = 'translateX(-50%)';
  messageDiv.style.color = isCorrect ? 'green' : 'red';
  messageDiv.style.fontFamily = 'fantasy';
  messageDiv.style.fontSize = '30px';
  messageDiv.style.textAlign = 'center';
  
  if (isCorrect) {
    messageDiv.innerHTML = "Correct! Password accepted. Door is open.";
  } else {
    messageDiv.innerHTML = "Wrong password! Try again.";
  }

  document.body.appendChild(messageDiv);

  // Remove the message after 3 seconds
  setTimeout(() => {
    document.body.removeChild(messageDiv);
  }, 3000);
}

// Open the password door (trigger animation or door movement)
// Open the password door (trigger animation or door movement)
function openPasswordDoor() {
  // Play the door sound only if it's not already playing
  if (doorOpenSound1.paused || doorOpenSound1.ended) {
    doorOpenSound1.play();
  }

  // Animate the door opening (slide the door very slightly upward on the y-axis)
  const openDoorAnimation = new TWEEN.Tween(texturedPasswordDoor.position)
    .to({ y: texturedPasswordDoor.position.y + 11 }, 6000)  // Slide the door by a very small amount on the y-axis
    .easing(TWEEN.Easing.Quadratic.Out)
    .start();

  // Ensure the sound plays for the duration of the door opening animation
  setTimeout(() => {
    // Stop the sound after the animation is complete
    doorOpenSound1.pause();
    doorOpenSound1.currentTime = 0;  // Reset sound to the beginning
  }, 6000); // Match this duration with the animation time (6000ms)
}


// Quit the interaction (if the player presses Q)
function quitInteraction() {
  isInteracting = false;
  enteredPassword = ""; // Reset password input
  interactionUI.innerHTML = "";  // Hide the interaction prompt
  
  // Stop the device interaction sound if it's playing
  if (!deviceInteractionSound.paused) {
    deviceInteractionSound.pause();
    deviceInteractionSound.currentTime = 0;  // Reset sound to the beginning
  }
  
  if (inputDiv) {
    document.body.removeChild(inputDiv);
  }
}

// Update the interaction UI based on proximity to the device
function updateInteractionUI() {
  if (passwordDevice && isNearDevice() && !isInteracting && !deviceInteracted) {
    interactionUI.innerHTML = "Press E to Interact with the Device Manager";  // Show message when near
  } else if (!isNearDevice() || deviceInteracted) {
    interactionUI.innerHTML = "";  // Hide message when not near or already interacted
  }
}

// Define sound functions outside the animate loop
function playWrongPasswordSound() {
  wrongPasswordSound.play();
}

function playCorrectPasswordSound() {
  correctPasswordSound.play();
}

function playTypingSound() {
  if (typingTimeout) clearTimeout(typingTimeout);  // Stop any previous typing sound
  typingSound.play();
}

function stopTypingSound() {
  typingSound.pause();
  typingSound.currentTime = 0;  // Reset sound to start
}

function resetTypingSoundTimeout() {
  if (typingTimeout) clearTimeout(typingTimeout);
  typingTimeout = setTimeout(stopTypingSound, 1000);  // Stop sound if no typing happens in 1 second
}

function playDeviceInteractionSound() {
  deviceInteractionSound.play();
}





function animate() {
  if (gameOverState) return; // Stop everything if the game is over
  requestAnimationFrame(animate);
  TWEEN.update();  // Ensure TWEEN animations are updated in the loop
  updateInteractionUI(); // Check proximity to device and update UI

  const delta = clock.getDelta(); // Get time delta for smooth movement

  // Update the time uniform for the water material
  waterMaterial.uniforms.time.value += delta; // Increment time based on the delta time

  if (waterMixer) {
    waterMixer.update(delta); // Update the water animation
}
  /*
  if (walkingMixer) walkingMixer.update(delta); // Update the new animation mixer

  // Update the model's position to match the camera's position
  if (walkingModel) {
      walkingModel.position.set(camera.position.x, camera.position.y - .5, camera.position.z); // Adjust Y to show feet
  }
  */

  if (candleMixer) {
    candleMixer.update(delta); // Update the candle animation
  }
  
  if (mixer) {
    mixer.update(delta); // Update the mixer for other animations
  }

  // Update FPS controls
  if (controls.pointerLockControls.isLocked) {
      controls.update(delta);
  }

  updateZombie(); // Update zombie movement
  zombieFollowPlayer(); // Ensure the zombie follows the player
  
  const playerPosition = camera.position;

  checkPlayerBounds(playerPosition);
  
  checkProximityToKey(playerPosition);
  checkProximityToDoor(playerPosition);

  // Player's distance to the password device
  if (isNearDevice() && !isInteracting) {
    interactionUI.innerHTML = "Press E to Interact with the Device Manager"; // Prompt to interact
  }

  renderer.render(scene, camera);
  }
  
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
    /*
    created_ceiling(scene);
    created_statue(scene)
    
    created_fallingceiling(scene);
  
    created_dead(scene);
    created_fallingdebris(scene);
    */
animate();