import triangles from './triangles';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const gameState = {
    dipSwitch : [0, 0, 0],
    firstRect: null,
    secondRect: null,
    thirdRect: null,
    cash: 1000
}

const cashSpan = document.querySelector("#cash");

cashSpan.innerHTML = gameState.cash;

const messageSpan = document.querySelector('#message');

const resetButton = document.querySelector('#reset')

resetButton.addEventListener('click', ()=> {
    reset();
})


const dividedWidth = canvas.width/7
const dividedHeight = canvas.height/4

const drawBoardOutline = (dividedWidth, dividedHeight) => {
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
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
       gameState.dipSwitch[0] = 1;
       
       let origin = {
           x: (dividedWidth + dividedWidth/2) - 50,
           y: (dividedHeight + dividedHeight/2) + 50
       }
       
       drawTriangle(triangles[index], origin)
       
    } else if ((mousePos.x > dividedWidth*3) && ( mousePos.x < dividedWidth*4) && !gameState.secondRect) {
        
        let index = Math.floor(Math.random()*triangles.length)
        
        gameState.secondRect = index;
        gameState.dipSwitch[1] = 1;
        
        let origin = {
           x: (dividedWidth*3 + dividedWidth/2) - 50,
           y: (dividedHeight + dividedHeight/2) + 50
        }

       drawTriangle(triangles[index], origin)
       
    } else if ((mousePos.x > dividedWidth*5) && ( mousePos.x < dividedWidth*6) && !gameState.thirdRect) {
        let index = Math.floor(Math.random()*triangles.length)
        
        gameState.secondRect = index;
        gameState.dipSwitch[2] = 1;
        
        let origin = {
            x: (dividedWidth*5 + dividedWidth/2) - 50,
            y: (dividedHeight + dividedHeight/2) + 50
        }
        
        drawTriangle(triangles[index], origin)
        
    }
    
    console.log(gameState.dipSwitch)
    
    if((gameState.dipSwitch[0] === 1) && (gameState.dipSwitch[1] === 1) && (gameState.dipSwitch[2] === 1)) {
        
        roundOver(determineWinnings(gameState));
    }

})

const roundOver = (result) => {
    
    gameState.cash += result.winnings;
    
    cashSpan.innerHTML = "";
    cashSpan.innerHTML = gameState.cash;
    
    messageSpan.innerHTML = "";
    messageSpan.innerHTML = result.message;
    
}

const reset = () => {
    gameState.dipSwitch = [0, 0, 0];
    gameState.firstRect = null;
    gameState.secondRect = null;
    gameState.thirdRect = null;
    
    messageSpan.innerHTML = "";
    
    drawBoardOutline(dividedWidth, dividedHeight);

}


const drawTriangle = (triangle, origin) => {
    ctx.beginPath();
    ctx.moveTo(triangle.A.x + origin.x, triangle.A.y + origin.y);
    ctx.lineTo(triangle.B.x + origin.x, triangle.B.y + origin.y);
    ctx.lineTo(triangle.C.x + origin.x, triangle.C.y + origin.y);
    ctx.fill();
}

const determineWinnings = ({firstRect, secondRect, thirdRect}) => {
    // all three rectangles are same
    if ((firstRect === secondRect) && (secondRect === thirdRect)) {
        return {
            winnings: 5000,
            message: "Jackpot!"
        }
    } else if ((firstRect === secondRect) ||
                (firstRect === thirdRect) ||
                (secondRect === thirdRect)) {
        return {
            winnings: 1000,
            message: "Lucky pair!"
        }    
    } else if ((firstRect !== secondRect) && 
                (firstRect !== thirdRect) &&
                (secondRect !== thirdRect)){
        return {
            winnings: 500,
            message: "Wild Three!"
        }
    } else {
        return {
            winnings: -200,
            message: "LP - go drink a juicebox!"
        }
    }
}

drawBoardOutline(dividedWidth, dividedHeight);
