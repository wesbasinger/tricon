const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const drawRectangle = (x, y, width, height, color) => {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
}

drawRectangle(10, 10, 100, 100, "green");

drawRectangle(200, 200, 100, 100, "red");