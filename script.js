document.addEventListener('DOMContentLoaded', () => {
    const noiseCanvas = document.getElementById('noiseCanvas');
    const noiseCtx = noiseCanvas.getContext('2d');
    const rainCanvas = document.getElementById('rainCanvas');
    const rainCtx = rainCanvas.getContext('2d');
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    const noiseSize = 200;
    const radius = noiseSize / 2;
    const rainDrops = [];
    const wind = 1; // Wind strength

    function resizeCanvas() {
        noiseCanvas.width = window.innerWidth;
        noiseCanvas.height = window.innerHeight;
        rainCanvas.width = window.innerWidth;
        rainCanvas.height = window.innerHeight;
    }

    function createNoise() {
        const imageData = noiseCtx.createImageData(noiseSize, noiseSize);
        const data = imageData.data;

        for (let i = 0; i < data.length; i += 4) {
            const value = Math.random() * 255;
            data[i] = value;
            data[i + 1] = value;
            data[i + 2] = value;
            data[i + 3] = 255;
        }

        const gradient = noiseCtx.createRadialGradient(radius, radius, 0, radius, radius, radius);
        gradient.addColorStop(0, 'rgba(255,255,255,1)');
        gradient.addColorStop(1, 'rgba(255,255,255,0)');

        noiseCtx.clearRect(0, 0, noiseCanvas.width, noiseCanvas.height);
        noiseCtx.putImageData(imageData, mouseX - radius, mouseY - radius);
        noiseCtx.globalCompositeOperation = 'destination-in';
        noiseCtx.fillStyle = gradient;
        noiseCtx.fillRect(mouseX - radius, mouseY - radius, noiseSize, noiseSize);
        noiseCtx.globalCompositeOperation = 'source-over';
    }

    function handleMouseMove(event) {
        mouseX = event.clientX;
        mouseY = event.clientY;
    }

    function createRainDrop() {
        return {
            x: Math.random() * rainCanvas.width,
            y: Math.random() * rainCanvas.height,
            speed: Math.random() * 2 + 2,
            width: 2,
            height: 10
        };
    }

    for (let i = 0; i < 5000; i++) {
        rainDrops.push(createRainDrop());
    }

    function drawRain() {
        rainCtx.clearRect(0, 0, rainCanvas.width, rainCanvas.height);
        rainDrops.forEach(drop => {
            drop.y += drop.speed;
            drop.x += wind;

            if (drop.y > rainCanvas.height - drop.height) {
                drop.y = 0;
                drop.x = Math.random() * rainCanvas.width;
                drop.speed = Math.random() * 2 + 2;
            }

            if (drop.x > rainCanvas.width) {
                drop.x = 0;
            }

            rainCtx.fillStyle = 'rgba(255, 255, 255, 1)';
            rainCtx.fillRect(drop.x, drop.y, drop.width, drop.height);
        });

        requestAnimationFrame(drawRain);
    }

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);
    resizeCanvas();
    drawRain();

    function loop() {
        createNoise();
        requestAnimationFrame(loop);
    }

    loop();
});
