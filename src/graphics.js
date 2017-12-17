const drawBoardOutline = (ctx, canvas, dividedWidth, dividedHeight) => {
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for (let i=0; i<3; i++) {
        
        let x = dividedWidth + 2*i*dividedWidth;
        let y = dividedHeight
        
        ctx.strokeRect(x, y, dividedWidth, dividedHeight*2)
    }
}

const drawTriangle = (ctx, triangle, origin) => {
    ctx.beginPath();
    ctx.moveTo(triangle.A.x + origin.x, triangle.A.y + origin.y);
    ctx.lineTo(triangle.B.x + origin.x, triangle.B.y + origin.y);
    ctx.lineTo(triangle.C.x + origin.x, triangle.C.y + origin.y);
    ctx.fill();
}

export { drawBoardOutline, drawTriangle };