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
            winnings: 400,
            message: "Lucky pair!"
        }    
    } else {
        return {
            winnings: -600,
            message: "LP - go drink a juicebox!"
        }
    }
}

export { determineWinnings}