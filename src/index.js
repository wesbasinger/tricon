import triangles from './triangles';
import { drawBoardOutline, drawTriangle } from './graphics';
import { determineWinnings } from './logic';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// vertical bounds are the same for all
const upperBound = dividedHeight;
const lowerBound = dividedHeight*3;

// set global dimensioning
const dividedWidth = canvas.width/7
const dividedHeight = canvas.height/4

const gameState = {
    dipSwitch : [0, 0, 0],
    firstRect: null,
    secondRect: null,
    thirdRect: null,
    cash: 1000
}

// get handles on DOM elements and do bootstrapping
const cashSpan = document.querySelector("#cash");

cashSpan.innerHTML = gameState.cash;

const messageSpan = document.querySelector('#message');

const resetButton = document.querySelector('#reset')

resetButton.addEventListener('click', ()=> {
    reset();
})


const getMousePos = (evt) =>{
    const rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
}

// all the main logic for the game resides around clicks inside the canvas element
canvas.addEventListener('click', (event) => {
    
    const mousePos = getMousePos(event);
    const index = Math.floor(Math.random()*triangles.length)

    
    if ((mousePos.x > dividedWidth) && ( mousePos.x < dividedWidth*2) && !gameState.firstRect) {
       
       gameState.firstRect = index;
       gameState.dipSwitch[0] = 1;
       
       let origin = {
           x: (dividedWidth + dividedWidth/2) - 50,
           y: (dividedHeight + dividedHeight/2) + 50
       }
       
       drawTriangle(ctx, triangles[index], origin)
       
    } else if ((mousePos.x > dividedWidth*3) && ( mousePos.x < dividedWidth*4) && !gameState.secondRect) {
        
        gameState.secondRect = index;
        gameState.dipSwitch[1] = 1;
        
        let origin = {
           x: (dividedWidth*3 + dividedWidth/2) - 50,
           y: (dividedHeight + dividedHeight/2) + 50
        }

       drawTriangle(ctx, triangles[index], origin)
       
    } else if ((mousePos.x > dividedWidth*5) && ( mousePos.x < dividedWidth*6) && !gameState.thirdRect) {

        gameState.thirdRect = index;
        gameState.dipSwitch[2] = 1;
        
        let origin = {
            x: (dividedWidth*5 + dividedWidth/2) - 50,
            y: (dividedHeight + dividedHeight/2) + 50
        }
        
        drawTriangle(ctx, triangles[index], origin)
        
    }
    
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
    
    drawBoardOutline(ctx, canvas, dividedWidth, dividedHeight);

}


drawBoardOutline(ctx, canvas, dividedWidth, dividedHeight);
