// Import necessary Three.js components
import * as THREE from 'three';

// Function to create and return a wall with an image texture
// Function to load and return a wall with an image texture
export function loadWall(scene, position, imagePath) {
    // If no position is provided, use a default
    position = position || { x: 0, y: 2, z: 0 };

    return new Promise((resolve, reject) => {
        // Load the texture
        const textureLoader = new THREE.TextureLoader();
        const texture = textureLoader.load(imagePath, () => {
            // Texture loaded successfully
            // Set wrapping and repeating properties for the texture
            texture.wrapS = THREE.RepeatWrapping;
            texture.wrapT = THREE.RepeatWrapping;
            texture.repeat.set(10, 10); // Adjust scaling of the texture to fit
        }, undefined, (error) => {
            console.error('Error loading texture:', error);
            reject(error); // Reject if there's an error loading the texture
        });

        // Create a simple box geometry for the wall
        const wallGeometry = new THREE.BoxGeometry(40, 35, 1); // Adjust dimensions as needed
1
        // Use the loaded texture as the material
        const wallMaterial = new THREE.MeshStandardMaterial({ map: texture });

        // Create the wall mesh
        const wall = new THREE.Mesh(wallGeometry, wallMaterial);

        // Set position, scale, and shadows
        wall.position.set(position.x, position.y, position.z); // Set wall position
        wall.castShadow = true; // Ensure the wall casts shadows
        wall.receiveShadow = true; // Ensure the wall receives shadows

        // Add wall to the scene
        scene.add(wall);

        resolve(wall); // Resolve when the wall is added to the scene
    });
}




