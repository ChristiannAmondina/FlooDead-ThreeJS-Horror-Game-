// Import necessary Three.js components
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

// Initialize the loader
const loader = new GLTFLoader();

// Function to load and return a chair model
export function createblood(scene) {
    return new Promise((resolve, reject) => {
        loader.load(
            '/images/models/small_blood_splatter.glb', // Path to your .glb model
            (gltf) => {
                const blood = gltf.scene;
                blood.position.set(25.2, 4, 36); // Set chair position
                blood.scale.set(12,12,12); // Set scale
                blood.rotation.y = Math.PI / -2;
                blood.castShadow = true; // Ensure the chair casts shadows
                blood.receiveShadow = true; // Ensure the chair receives shadows
                scene.add(blood); // Add to scene
                resolve(blood); // Resolve when the chair is added to the scene
            },
            undefined, // Optional progress callback
            (error) => { 
                console.error('Error loading blood model:', error); 
                reject(error); // Reject if there's an error
            }
        );
    });
}

