import * as THREE from 'three';

export class FPSControls {
  constructor(camera, scene, pointerLockControls) {
    this.camera = camera;
    this.scene = scene;
    this.pointerLockControls = pointerLockControls;
    this.velocity = new THREE.Vector3(0, 0, 0);
    this.acceleration = new THREE.Vector3(250, 2130, 250);
    this.deceleration = new THREE.Vector3(-10, -55, -10); // WeaffollowPlayerker gravity
    this.move = { forward: false, backward: false, left: false, right: false };
    this.isStanding = true;
    this.isEditMode = false; // Track whether we are in edit mode

    // Initialize Audio Listener and Sounds
    this.listener = new THREE.AudioListener();
    this.camera.add(this.listener); // Attach the listener to the camera

    // First walking sound
    this.walkSound = new THREE.Audio(this.listener);
    const audioLoader = new THREE.AudioLoader();
    audioLoader.load('sounds/Sound Effects - Walking on Tile Floor.mp3', (buffer) => {
      this.walkSound.setBuffer(buffer);
      this.walkSound.setLoop(true); // Set to loop if desired
      this.walkSound.setVolume(0.5); // Adjust volume as needed
    });

    // Second walking sound
    this.secondWalkSound = new THREE.Audio(this.listener);
    audioLoader.load('sounds/Walking Through Water Sound Effect.mp3', (buffer) => {
      this.secondWalkSound.setBuffer(buffer);
      this.secondWalkSound.setLoop(true);
      this.secondWalkSound.setVolume(0.5); // Adjust volume as needed
    });

    // Add event listeners for key events
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
      case 'Space': this.move.up = false; break;
      case 'ShiftLeft': this.move.down = false; break;
    }
  }

  update(delta) {
    const targetPosition = new THREE.Vector3(-61, 4, -40); // The target position
    const tolerance = 4; // Tolerance to account for small differences in position

    const position = this.pointerLockControls.object.position;

    // Check if the player is within the target position (with tolerance)
    if (
      Math.abs(position.x - targetPosition.x) < tolerance &&
      Math.abs(position.y - targetPosition.y) < tolerance &&
      Math.abs(position.z - targetPosition.z) < tolerance
    ) {
      // Trigger game finish
      this.gameFinished();
      return;
    }

    // Boost the speed when in Edit Mode (Flying mode)
    const speedMultiplier = this.isEditMode ? 10 : 1; // Adjust this multiplier for desired speed increase

    const frameDeceleration = new THREE.Vector3(
      this.velocity.x * this.deceleration.x,
      this.deceleration.y,
      this.velocity.z * this.deceleration.z
    );
    frameDeceleration.multiplyScalar(delta);
    this.velocity.add(frameDeceleration);

    const direction = new THREE.Vector3();
    this.camera.getWorldDirection(direction); // Get the camera's forward direction

    // Normalize the camera's forward and right vectors
    const forward = new THREE.Vector3(direction.x, 0, direction.z).normalize();
    const right = new THREE.Vector3().crossVectors(this.camera.up, forward).normalize();
    const up = this.camera.up; // Up direction for flying (vertical movement)

    // Handle movement in 6 directions (forward, backward, left, right, up, down)
    if (this.move.forward) this.velocity.addScaledVector(forward, this.acceleration.z * delta * speedMultiplier);
    if (this.move.backward) this.velocity.addScaledVector(forward, -this.acceleration.z * delta * speedMultiplier);
    if (this.move.left) this.velocity.addScaledVector(right, this.acceleration.x * delta * speedMultiplier);
    if (this.move.right) this.velocity.addScaledVector(right, -this.acceleration.x * delta * speedMultiplier);

    // Allow moving up and down in edit mode (flying)
    if (this.move.up) this.velocity.addScaledVector(up, this.acceleration.y * delta * speedMultiplier);
    if (this.move.down) this.velocity.addScaledVector(up, -this.acceleration.y * delta * speedMultiplier);

    // Raycasting to detect walls or models with a larger buffer zone (e.g., 1.5 units buffer)
    const bufferDistance = 1.5;  // Increase this value to create more space between player and objects
    const raycaster = new THREE.Raycaster(position, forward, 0, bufferDistance); // Adjust ray distance
    const intersects = raycaster.intersectObjects(this.scene.children, true); // Check for intersections with all objects in the scene

    // In Edit Mode (Flying), reset vertical velocity to prevent falling
    if (this.isEditMode) {
      this.velocity.y = 0; // Disable gravity effect
      position.addScaledVector(this.velocity, delta);
    } else {
      // In first-person mode, apply gravity and collision
      position.addScaledVector(this.velocity, delta);
      if (position.y < 5) {
        this.velocity.y = 0;
        position.y = 5;
        this.isStanding = true;
      }

      // Position clamping to prevent getting inside walls or models with buffer
      if (intersects.length > 0) {
        // If an object is in front, clamp the position to avoid getting too close
        position.sub(this.velocity.clone().multiplyScalar(delta));
        this.velocity.set(0, this.velocity.y, 0); // Stop movement along the collision axis
      }
    }

    // Play both walking sounds when moving
    if (this.move.forward || this.move.backward || this.move.left || this.move.right) {
      if (!this.walkSound.isPlaying) {
        this.walkSound.play(); // Play the first sound
      }
      if (!this.secondWalkSound.isPlaying) {
        this.secondWalkSound.play(); // Play the second sound
      }
      position.y += Math.sin(Date.now() / 100) * 0.090; // Bump effect
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










  gameFinished() {
    // Create a black screen that will fade in
    const whiteScreen = document.createElement('div');
    whiteScreen.style.position = 'absolute';
    whiteScreen.style.top = 0;
    whiteScreen.style.left = 0;
    whiteScreen.style.width = '100vw';
    whiteScreen.style.height = '100vh';
    whiteScreen.style.backgroundColor = 'black';
    whiteScreen.style.zIndex = 1000;
    whiteScreen.style.opacity = 0; // Start with 0 opacity for the fade effect
    whiteScreen.style.transition = 'opacity 35s ease-out'; // Smooth fade-in over 35 seconds
    document.body.appendChild(whiteScreen);
  
    // Create the image element
    const imageElement = document.createElement('img');
    imageElement.src = 'images/texture/test.jpg'; // Path to your image
    imageElement.style.position = 'absolute';
    imageElement.style.top = '50%';
    imageElement.style.left = '50%';
    imageElement.style.transform = 'translate(-50%, -50%)';
    imageElement.style.width = 'auto';
    imageElement.style.height = 'auto';
    imageElement.style.zIndex = 1100;
    imageElement.style.opacity = 0; // Start with 0 opacity
    imageElement.style.transition = 'opacity 35s ease-out'; // Smooth fade-in for the image
    imageElement.style.pointerEvents = 'none'; // Disable interaction with the image
  
    // Append the image element to the body
    document.body.appendChild(imageElement);
  
    // Set up audio context for smoother control
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  
    // Load and configure the "Running in Water" sound
    const soundWater = new Audio('sounds/The Lobotomy.mp3');
    const track = audioContext.createMediaElementSource(soundWater);
    const gainNode = audioContext.createGain();
    track.connect(gainNode).connect(audioContext.destination);
    gainNode.gain.value = 0; // Start with 0 volume
  
    // Set playback speed to 2x
    soundWater.playbackRate = 2.0;
  
    // Fade in the white screen and image element after a delay
    setTimeout(() => {
      whiteScreen.style.opacity = 1; // Fade in the white screen
      imageElement.style.opacity = 1; // Fade in the image element
  
      // Start playing the "Running in Water" sound
      soundWater.play();
  
      // Gradually increase the volume for the "Running in Water" sound
      const fadeInDuration = 1000; // Fade-in duration in ms
      const currentTime = audioContext.currentTime;
      gainNode.gain.linearRampToValueAtTime(1, currentTime + fadeInDuration / 1000);
    }, 2000); // Delay the fade-in and sound start by 2000ms (2 seconds)
  
    // Restart the game when CTRL + R is pressed
    document.addEventListener('keydown', (event) => {
      if (event.ctrlKey && event.key === 'r') {
        window.location.reload(); // Reload the page to restart the game
      }
    });
  }
  








  
  }
  
  
