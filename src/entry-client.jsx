import { h, render } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import './assets/styles.css';

function App() {
  // State for showing the key collected note and key image
  const [showKeyNote, setShowKeyNote] = useState(false);
  const [showKeyImage, setShowKeyImage] = useState(false);

  useEffect(() => {
    // Start animation for image6 after a delay of 13000 milliseconds (13 seconds)
    setTimeout(() => {
      const image = document.querySelector('#key-image');
      if (image) {
        image.style.display = 'block';  // Show key image when collected
      }
    }, 10000);  // Delay after which the key image should appear

    // Logic for handling note displays (e.g., Press C to collect, Press E to open door)
    setTimeout(() => {
      setShowKeyNote(true); // Display 'Press C to collect key' note
    }, 5000); // Display the note after 5 seconds

    setTimeout(() => {
      setShowKeyImage(true); // Display key image after collecting
    }, 10000);

    setTimeout(() => {
      setShowKeyImage(false); // Hide key image after some time
    }, 15000);
  }, []);

  return (
    <div>
      <div id="webgl-container"></div>

      <div id="controls">
        <button id="firstPersonBtn" className="control-btn" style={{ display: 'none' }}>Enter First Person Mode</button>
        <button id="editModeBtn" className="control-btn">Edit Mode</button>
      </div>

      <div id="damage-overlay"></div>

      {/* Key Collection Note */}
      {showKeyNote && <div id="key-collect-note" className="note">Press C to collect the key</div>}

      {/* Key Image Container (Shown after the key is collected) */}
      {showKeyImage && (
        <div id="key-image-container">
          <img id="key-image" src="./images/pics/key.png" alt="Collected Key" style={{ display: 'block' }} />
        </div>
      )}

      <div id="door-open-note" className="note" style={{ display: 'none' }}>Press E to unlock the door</div>

      <div className="inventory">
        <h1>INVENTORY</h1>
      </div>
      <div className="inventory2">
        <img src="./images/pics/candleinventory.png" alt="" />
      </div>

      <script type="module" src="/main.js"></script>
    </div>
  );
}

render(<App />, document.getElementById('app'));
