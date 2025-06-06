<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HOME</title>

    <!-- Updated favicon path -->
    <link rel="icon" type="image/png" href="./images/Websiteview/earthlogo.png">
    
    <!-- Link to your CSS file -->
    <link rel="stylesheet" href="/src/styles.css">
</head>
<body>
    <!-- Header with navigation links -->
    <header>
        <nav>
            <ul>
                <li><a href="#home">Home</a></li>
              
            </ul>
        </nav>
    </header>

    <!-- Home section with Three.js 3D canvas -->
    <section id="home">
        <canvas class="webgl"></canvas>
   
        <!-- Updated paths for GIFs -->
        <div class="tech1">
            <img src="./images/GIF/tech1.gif" alt="Technology Animation 1">
        </div>
        <div class="tech2">
            <img src="./images/GIF/tech2.gif" alt="Technology Animation 2">
        </div>

        <div class="info1">
            <h1>Earth: Our Blue Planet</h1>
            <p>Earth, the third planet from the Sun, is a remarkable and vibrant world that supports a vast diversity of life. 
                Its surface is covered with expansive oceans, dense forests, and towering mountains, providing a rich
                 environment for a wide array of ecosystems. Earth’s atmosphere, composed of nitrogen, oxygen, and 
                 trace gases, shields life from harmful solar radiation and helps maintain a stable climate. With its unique 
                 combination of water, oxygen, and a protective magnetic field, Earth stands as the only known planet capable 
                 of sustaining life in the universe. Throughout history, humanity has evolved, creating cultures, technologies,
                  and societies that continue to shape the planet’s future. </p>
                  

       </div>
    </section>
    
    <div class="notice">
        <h1>DAILY NEWS!</h1>
    </div>
 
    <!-- Updated paths for slider images -->
    <div class="sliders">
        <div class="slider-item">
            <img src="./images/news/asteroid.png" alt="Asteroid in Earth orbit" class="slider-image">
            <h1>Asteroid Approaching Earth's Orbit</h1>
        </div>
        <div class="slider-item">
            <img src="./images/news/Firstman.png" alt="First man on the moon" class="slider-image">
            <h1>First Man to Walk on the Moon</h1>
        </div>
        <div class="slider-item">
            <img src="./images/news/alien.png" alt="UFO" class="slider-image">
            <h1>Are UFOs Watching Us?</h1>
        </div>
        <div class="slider-item">
            <img src="./images/news/satellite.png" alt="Global satellites" class="slider-image">
            <h1>Global Satellites Now Orbiting</h1>
        </div>
        <div class="slider-item">
            <img src="./images/news/debres.png" alt="Galaxy Exploration" class="slider-image">
            <h1>Space Debris is in an Alarming State</h1>
        </div>
    </div>

  

    <!-- Footer -->

    <!-- Link to your JS files -->
    <script src="/main.js" type="module"></script>

</body>
</html>
