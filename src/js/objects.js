// Import necessary Three.js components
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

// Initialize the loader
const loader = new GLTFLoader();

// Function to load and return a chair model
export function createChair(scene) {
    return new Promise((resolve, reject) => {
        loader.load(
            '/images/models/day_20__old_office_chair.glb', // Path to your .glb model
            (gltf) => {
                const chair = gltf.scene;
                chair.position.set(40, 2, -42); // Set chair position
                chair.scale.set(7,5,5); // Set scale
                chair.rotation.x = Math.PI / 4; // Tilt backward (30 degrees)
                chair.rotation.z = -Math.PI / 1.9; // Tilt sideways (45 degrees)

                chair.castShadow = true; // Ensure the chair casts shadows
                chair.receiveShadow = true; // Ensure the chair receives shadows
                scene.add(chair); // Add to scene
                resolve(chair); // Resolve when the chair is added to the scene
            },
            undefined, // Optional progress callback
            (error) => { 
                console.error('Error loading chair model:', error); 
                reject(error); // Reject if there's an error
            }
        );
    });
}

// Function to load and return a table model
export function createdesk(scene) {
    return new Promise((resolve, reject) => {
        loader.load(
            '/images/models/office_desk.glb', // Path to your .glb model
            (gltf) => {
                const desk = gltf.scene;
                desk.position.set(40, 0.050, 33); // Set table position
                desk.scale.set(0.130,0.130,0.130); // Set scale
                desk.rotation.y = Math.PI / -1;
                desk.castShadow = true; // Ensure the table casts shadows
                desk.receiveShadow = true; // Ensure the table receives shadows
                scene.add(desk); // Add to scene
                resolve(desk); // Resolve when the table is added to the scene
            },
            undefined, // Optional progress callback
            (error) => { 
                console.error('Error loading desk model:', error); 
                reject(error); // Reject if there's an error
            }
        );
    });
}
// Function to load and return a table model
export function createaircon(scene) {
    return new Promise((resolve, reject) => {
        loader.load(
            '/images/models/old_aircon.glb', // Path to your .glb model
            (gltf) => {
                const aircon = gltf.scene;
                aircon.position.set(34, 9, 28); // Set table position
                aircon.scale.set(0.8,0.8,0.8); // Set scale
                aircon.rotation.y = Math.PI / -2;
                aircon.castShadow = true; // Ensure the table casts shadows
                aircon.receiveShadow = true; // Ensure the table receives shadows
                scene.add(aircon); // Add to scene
                resolve(aircon); // Resolve when the table is added to the scene
            },
            undefined, // Optional progress callback
            (error) => { 
                console.error('Error loading aircon model:', error); 
                reject(error); // Reject if there's an error
            }
        );
    });
}
export function createflower(scene) {
    return new Promise((resolve, reject) => {
        loader.load(
            '/images/models/flowering_cannabis_plant_in_a_pot.glb', // Path to your .glb model
            (gltf) => {
                const flower = gltf.scene;
                flower.position.set(26.4, 0, 35); // Set table position
                flower.scale.set(0.030,0.030,0.030); // Set scale
                flower.rotation.y = Math.PI / -2;
                flower.castShadow = true; // Ensure the table casts shadows
                flower.receiveShadow = true; // Ensure the table receives shadows
                scene.add(flower); // Add to scene
                resolve(flower); // Resolve when the table is added to the scene
            },
            undefined, // Optional progress callback
            (error) => { 
                console.error('Error loading flower model:', error); 
                reject(error); // Reject if there's an error
            }
        );
    });
}
export function createframe(scene) {
    return new Promise((resolve, reject) => {
        loader.load(
            '/images/models/picture_frame.glb', // Path to your .glb model
            (gltf) => {
                const frame = gltf.scene;
                frame.position.set(46, 0, 43); // Set table position
                frame.scale.set(1.3,1.3,1.3); // Set scale
                frame.rotation.y = Math.PI / -2;
                frame.castShadow = true; // Ensure the table casts shadows
                frame.receiveShadow = true; // Ensure the table receives shadows
                scene.add(frame); // Add to scene
                resolve(frame); // Resolve when the table is added to the scene
            },
            undefined, // Optional progress callback
            (error) => { 
                console.error('Error loading frame model:', error); 
                reject(error); // Reject if there's an error
            }
        );
    });
}
export function createdispenser(scene) {
    return new Promise((resolve, reject) => {
        loader.load(
            '/images/models/water_dispenser.glb', // Path to your .glb model
            (gltf) => {
                const dispenser = gltf.scene;
                dispenser.position.set(28, 4, 30); // Set table position
                dispenser.scale.set(3,3,3); // Set scale
                dispenser.rotation.y = Math.PI / 100;
                dispenser.castShadow = true; // Ensure the table casts shadows
                dispenser.receiveShadow = true; // Ensure the table receives shadows
                scene.add(dispenser); // Add to scene
                resolve(dispenser); // Resolve when the table is added to the scene
            },
            undefined, // Optional progress callback
            (error) => { 
                console.error('Error loading dispenser model:', error); 
                reject(error); // Reject if there's an error
            }
        );
    });
}

export function created_design1(scene) {
    return new Promise((resolve, reject) => {
        loader.load(
            '/images/models/isometric_office.glb', 
            (gltf) => {
                const design1 = gltf.scene;
                design1.position.set(10, 0, -30); 
                design1.scale.set(6,5,6); 
                design1.rotation.y = Math.PI / 100;
                design1.castShadow = true; 
                design1.receiveShadow = true;
                scene.add(design1); 
                resolve(design1); 
            },
            undefined, 
            (error) => { 
                console.error('Error loading design1 model:', error); 
                reject(error); 
            }
        );
    });
}

export function created_design2(scene) {
    return new Promise((resolve, reject) => {
        loader.load(
            '/images/models/office_of_a_crane_operator.glb', 
            (gltf) => {
                const design2 = gltf.scene;
                design2.position.set(-75, -1, 40); 
                design2.scale.set(7,5,4); 
                design2.rotation.y = Math.PI / -2;
                design2.castShadow = true; 
                design2.receiveShadow = true;
                scene.add(design2); 
                resolve(design2); 
            },
            undefined, 
            (error) => { 
                console.error('Error loading design2 model:', error); 
                reject(error); 
            }
        );
    });
}

export function created_design3(scene) {
    return new Promise((resolve, reject) => {
        loader.load(
            '/images/models/building_hallway.glb', 
            (gltf) => {
                const design3 = gltf.scene;
                design3.position.set(-115, -39, -40); 
                design3.scale.set(0.120,0.110,0.120); 
                design3.rotation.y = Math.PI ;
                design3.castShadow = true; 
                design3.receiveShadow = true;
                scene.add(design3); 
                resolve(design3); 
            },
            undefined, 
            (error) => { 
                console.error('Error loading design3 model:', error); 
                reject(error); 
            }
        );
    });
}


export function created_floor(scene) {
    return new Promise((resolve, reject) => {
        loader.load(
            '/images/models/checkered_tile_floor.glb',
            (gltf) => {
                const floor = gltf.scene;

                // Iterate over all children and update the materials
                floor.traverse((child) => {
                    if (child.isMesh) {
                        if (child.material) {
                            child.material.roughness = 0; // Set roughness to 0
                          
                            child.material.needsUpdate = true; // Ensure the material is updated
                        }
                    }
                });

                floor.position.set(0, 1, 0);
                floor.scale.set(0.410, 0.5, 0.450);
                floor.rotation.y = Math.PI / -2;
                floor.castShadow = true;
                floor.receiveShadow = true;
                scene.add(floor);
                resolve(floor);
            },
            undefined,
            (error) => {
                console.error('Error loading floor model:', error);
                reject(error);
            }
        );
    });
}


export function created_hallchairs(scene) {
    return new Promise((resolve, reject) => {
        loader.load(
            '/images/models/waiting_chair.glb', 
            (gltf) => {
                const hallchairs = gltf.scene;
                hallchairs.position.set(-15, -1, 47); 
                hallchairs.scale.set(6,6,6); 
                hallchairs.rotation.y = Math.PI ;
                hallchairs.castShadow = true; 
                hallchairs.receiveShadow = true;
                scene.add(hallchairs); 
                resolve(hallchairs); 
            },
            undefined, 
            (error) => { 
                console.error('Error loading hallchairs model:', error); 
                reject(error); 
            }
        );
    });
}

export function created_cheaproom(scene) {
    return new Promise((resolve, reject) => {
        loader.load(
            '/images/models/low_poly_90s_office_cubicle.glb', 
            (gltf) => {
                const cheaproom = gltf.scene;
                cheaproom.position.set(39, -1, 6.2); 
                cheaproom.scale.set(9,6,9); 
                cheaproom.rotation.y = Math.PI/2;
                cheaproom.castShadow = true; 
                cheaproom.receiveShadow = true;
                scene.add(cheaproom); 
                resolve(cheaproom); 
            },
            undefined, 
            (error) => { 
                console.error('Error loading cheaproom model:', error); 
                reject(error); 
            }
        );
    });
}

export function created_fence(scene) {
    return new Promise((resolve, reject) => {
        loader.load(
            '/images/models/simple_metal_fence.glb', 
            (gltf) => {
                const fence = gltf.scene;
                fence.position.set(-45, 7, -40); 
                fence.scale.set(1.2,2,1.2); 
                fence.rotation.y = Math.PI/-6;
                fence.castShadow = true; 
                fence.receiveShadow = true;
                scene.add(fence); 
                resolve(fence); 
            },
            undefined, 
            (error) => { 
                console.error('Error loading fence model:', error); 
                reject(error); 
            }
        );
    });
}



export function created_statue(scene) {
    return new Promise((resolve, reject) => {
        loader.load(
            '/images/models/statue_of_edward_snowden.glb', 
            (gltf) => {
                const fence = gltf.scene;
                fence.position.set(29, 7, -28); 
                fence.scale.set(2,2,2); 
                fence.rotation.y = Math.PI/2;
                fence.castShadow = true; 
                fence.receiveShadow = true;
                scene.add(fence); 
                resolve(fence); 
            },
            undefined, 
            (error) => { 
                console.error('Error loading fence model:', error); 
                reject(error); 
            }
        );
    });
}




export function created_nearstatue(scene) {
    return new Promise((resolve, reject) => {
        loader.load(
            '/images/models/water_dispenser.glb', 
            (gltf) => {
                const nearstatue = gltf.scene;
                nearstatue.position.set(28, 6, -18); // Set table position
                nearstatue.scale.set(3,3,3); // Set scale
                nearstatue.rotation.y = Math.PI/2;
                nearstatue.castShadow = true; 
                nearstatue.receiveShadow = true;
                scene.add(nearstatue); 
                resolve(nearstatue); 
            },
            undefined, 
            (error) => { 
                console.error('Error loading nearstatue model:', error); 
                reject(error); 
            }
        );
    });
}

export function created_ceiling(scene) {
    return new Promise((resolve, reject) => {
        loader.load(
            '/images/models/abandoned_office_ceiling.glb', 
            (gltf) => {
                const ceiling = gltf.scene;
                ceiling.position.set(-149, 20, 100); 
                ceiling.scale.set(2, 2, 2); 
                ceiling.rotation.y = Math.PI / 2;
                ceiling.castShadow = true; 
                ceiling.receiveShadow = true;

                // Iterate through all materials and set roughness to 0
                ceiling.traverse((child) => {
                    if (child.isMesh) {
                        child.material = child.material.clone(); // Clone material to avoid modifying the original material
                        child.material.roughness = 0;  // Set roughness to 0 for shiny appearance
                    }
                });

                scene.add(ceiling); 
                resolve(ceiling); 
            },
            undefined, 
            (error) => { 
                console.error('Error loading ceiling model:', error); 
                reject(error); 
            }
        );
    });
}
export function created_fallingceiling(scene) {
    return new Promise((resolve, reject) => {
        loader.load(
            'images/models/abandoned_office_ceiling.glb', 
            (gltf) => {
                const fallceiling = gltf.scene;

                // Set initial position, scale, and base rotation
                fallceiling.position.set(-27, -16.3, 54); 
                fallceiling.scale.set(1, 12, 1); 
                fallceiling.rotation.y = Math.PI / 2; // Initial Y-axis rotation (90 degrees)

                // Tilt the model slightly side by side (roll rotation)
                fallceiling.rotation.z = Math.PI / 8; // Tilt by 10 degrees

                // Enable shadows
                fallceiling.castShadow = true; 
                fallceiling.receiveShadow = true;

                // Add to the scene
                scene.add(fallceiling); 
                resolve(fallceiling); 
            },
            undefined, 
            (error) => { 
                console.error('Error loading fallceiling model:', error); 
                reject(error); 
            }
        );
    });
}

