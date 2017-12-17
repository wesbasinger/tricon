import triangles from './triangles';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');


const gameState = {
    firstRect: null,
    secondRect: null,
    thirdRect: null
}

const dividedWidth = canvas.width/7
const dividedHeight = canvas.height/4

const drawBoardOutline = (dividedWidth, dividedHeight) => {
    for (let i=0; i<3; i++) {
        
        let x = dividedWidth + 2*i*dividedWidth;
        let y = dividedHeight
        
        ctx.strokeRect(x, y, dividedWidth, dividedHeight*2)
    }
}

const getMousePos = (evt) =>{
    const rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
}

canvas.addEventListener('click', (event) => {
    
    const mousePos = getMousePos(event);
    
    // vertical bounds are the same for all
    const upperBound = dividedHeight;
    
    const lowerBound = dividedHeight*3;
    
    if (mousePos.y < upperBound || mousePos.y > lowerBound) {
        console.log("none");
    } else if ((mousePos.x > dividedWidth) && ( mousePos.x < dividedWidth*2) && !gameState.firstRect) {
       
       let index = Math.floor(Math.random()*triangles.length)
       
       gameState.firstRect = index;
       
       let origin = {
           x: (dividedWidth + dividedWidth/2) - 50,
           y: (dividedHeight + dividedHeight/2) + 50
       }
       
       drawTriangle(triangles[index], origin)
       
    } else if ((mousePos.x > dividedWidth*3) && ( mousePos.x < dividedWidth*4) && !gameState.secondRect) {
        
        let index = Math.floor(Math.random()*triangles.length)
        
        gameState.secondRect = index;
        
        let origin = {
           x: (dividedWidth*3 + dividedWidth/2) - 50,
           y: (dividedHeight + dividedHeight/2) + 50
        }

       drawTriangle(triangles[index], origin)
       
    } else if ((mousePos.x > dividedWidth*5) && ( mousePos.x < dividedWidth*6) && !gameState.thirdRect) {
        let index = Math.floor(Math.random()*triangles.length)
        
        gameState.secondRect = index;
        
        let origin = {
            x: (dividedWidth*5 + dividedWidth/2) - 50,
            y: (dividedHeight + dividedHeight/2) + 50
        }
        
        drawTriangle(triangles[index], origin)
        
    } else {
        console.log("None");
    }

})


const drawTriangle = (triangle, origin) => {
    ctx.beginPath();
    ctx.moveTo(triangle.A.x + origin.x, triangle.A.y + origin.y);
    ctx.lineTo(triangle.B.x + origin.x, triangle.B.y + origin.y);
    ctx.lineTo(triangle.C.x + origin.x, triangle.C.y + origin.y);
    ctx.fill();
}

drawBoardOutline(dividedWidth, dividedHeight);
