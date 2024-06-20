document.addEventListener("DOMContentLoaded", function() {
    const canvas = document.getElementById('hexCanvas');
    const ctx = canvas.getContext('2d');
    const drawButton = document.getElementById('drawButton');
    const layersInput = document.getElementById('layers');
    const sideLengthInput = document.getElementById('sideLength');

    function drawHexagon(ctx, x, y, size, color) {
        ctx.beginPath();
        ctx.moveTo(x + size * Math.cos(0), y + size * Math.sin(0));

        for (let side = 1; side < 7; side++) {
            ctx.lineTo(x + size * Math.cos(side * 2 * Math.PI / 6), y + size * Math.sin(side * 2 * Math.PI / 6));
        }

        ctx.fillStyle = color;
        ctx.fill();
        ctx.stroke();
    }

    function hexGridPosition(layer, size) {
        const positions = [];
        for (let q = -layer; q <= layer; q++) {
            for (let r = -layer; r <= layer; r++) {
                if (-layer <= q && q <= layer && -layer <= r && r <= layer && -layer <= q + r && q + r <= layer) {
                    const x = canvas.width / 2 + (3 / 2) * size * q;
                    const y = canvas.height / 2 + Math.sqrt(3) * size * (r + q / 2);
                    positions.push({ x, y });
                }
            }
        }
        return positions;
    }

    function clearCanvas(ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    function drawHexagonGrid(ctx, size, layers) {
        const colors = ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd', '#8c564b'];
        const allPositions = [];
        
        for (let layer = layers; layer >= 0; layer--) {
            const positions = hexGridPosition(layer, size);
            const color = colors[layer % colors.length];
            for (const pos of positions) {
                allPositions.push({ pos, color });
            }
        }

        let index = 0;
        function drawNextHexagon() {
            if (index < allPositions.length) {
                const { pos, color } = allPositions[index];
                drawHexagon(ctx, pos.x, pos.y, size, color);
                index++;
                setTimeout(drawNextHexagon, 100); 
            }
        }
        drawNextHexagon();
    }

    drawButton.addEventListener('click', function() {
        const layers = parseInt(layersInput.value, 10);
        const sideLength = parseInt(sideLengthInput.value, 10);
        clearCanvas(ctx);
        drawHexagonGrid(ctx, sideLength, layers);
    });

    drawHexagonGrid(ctx, parseInt(sideLengthInput.value, 10), parseInt(layersInput.value, 10));
});
