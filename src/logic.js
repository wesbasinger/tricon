const determineWinnings = ({firstRect, secondRect, thirdRect}) => {
    // all three rectangles are same
    console.log("first rect " + firstRect);
    console.log("second rect " + secondRect);
    console.log("third rect" + thirdRect)
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

export { determineWinnings}