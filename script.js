//Factory Functions
const Players = (player1Name,player2Name) => {
    player1Name = document.getElementById('player1Name').value
    player2Name = document.getElementById('player2Name').value
    return(player1Name,player2Name)
}
//Modules

const gameBoard = ((player2Name,player1Name,xCount,oCount) => {
    'use strict';
    let startButton = document.querySelector('#startButton')

    let currentPlayerTurn = document.getElementById('playerTurnText');
    currentPlayerTurn.innerText = 'P1 Turn'

    const gamePlayGrid = document.querySelector('.gamePlayGrid');
    const gridbuttons = gamePlayGrid.querySelectorAll('div');
    
    let currentGameBoard = ['','','','','','','','',''];
    const _winningCombinations = [
        ['0','1','2','','','','','',''],['','','','3','4','5','','',''],
        ['','','','','','','6','7','8'],['0','','','3','','','6','',''],
        ['','1','','','4','','','7',''],['','','2','','','5','','','8'],
        ['0','','','','4','','','','8'],['','','2','','4','','6','',''],
    ];

        xCount = 0;
        oCount = 0;
        
    startButton.addEventListener('click', () => {
        let playerNames = Players(player1Name,player2Name);
        
        //console.log(playerNames.player1Name)
        // console.log(playerNames.player2Name)// showing as undefined.
        // if (playerNames.player1Name === undefined || playerNames.player1Name === null 
        // || playerNames.player2Name === undefined || playerNames.player2Name === null){
        //     alert("Please Enter Your Name.")
        // }else{
            gridbuttons.forEach((div) => {
                div.addEventListener('click', () => {
                    let id = div.id;
                    render(id,currentPlayerTurn,playerNames)//this renders on the board needs to be gamePlay.currentPlayerTurn because it's in the gamePlay module and not global
                        if (document.getElementById(id).innerText === 'X'){
                            ++xCount 
                        }else{
                            ++oCount
                        }
                    updateGameboard(id,xCount,oCount);
                    
                    })
                })
            //}
            
    })

    function updateGameboard (id,xCount,oCount) {
        currentGameBoard.splice(id,1,id);
        if (xCount >= 3 || oCount >= 3){
         gamePlay.compareWin(currentGameBoard,_winningCombinations,xCount,oCount);
        }
       
        
    }
    
    function render (id,currentPlayerTurn,playerNames) {
        document.getElementById(id).innerText === '';
        if (document.getElementById(id).innerText=== ''){
            if (currentPlayerTurn.innerText === `P1 Turn`){ // ${playerNames.player1Name} 
                document.getElementById(id).innerText = 'X';
                currentPlayerTurn.innerText = `P2 Turn`;//${playerNames.player2Name}
                
            }else{
                document.getElementById(id).innerText = 'O';
                currentPlayerTurn.innerText =`P1 Turn`;//${playerNames.player1Name} 
            }
        }

    }
     
    // }

    return {updateGameboard,render,currentPlayerTurn,currentGameBoard,xCount,oCount}
})();

const gamePlay = (() => {
    'use strict';

    function compareWin (currentGameBoard,_winningCombinations,xCount,oCount) {
        if (currentGameBoard.includes(_winningCombinations[0][0,1,2]) 
        || currentGameBoard.includes(_winningCombinations[1][3,4,5]) 
        || currentGameBoard.includes(_winningCombinations[2][6,7,8]) 
        || currentGameBoard.includes(_winningCombinations[3][0,3,6]) 
        || currentGameBoard.includes(_winningCombinations[4][1,4,7]) 
        || currentGameBoard.includes(_winningCombinations[5][2,5,8]) 
        || currentGameBoard.includes(_winningCombinations[6][0,4,8])
        || currentGameBoard.includes(_winningCombinations[7][2,4,6])  ){
            checkSign(xCount,oCount);
            }
    }
    function checkSign(xCount,oCount) { 
        if(document.getElementById(0).innerText === 'X' && document.getElementById(1).innerText === 'X' && document.getElementById(2).innerText === 'X'
        || document.getElementById(3).innerText === 'X' && document.getElementById(4).innerText === 'X' && document.getElementById(5).innerText === 'X'
        || document.getElementById(6).innerText === 'X' && document.getElementById(7).innerText === 'X' && document.getElementById(8).innerText === 'X'
        || document.getElementById(0).innerText === 'X' && document.getElementById(3).innerText === 'X' && document.getElementById(6).innerText === 'X'
        || document.getElementById(1).innerText === 'X' && document.getElementById(4).innerText === 'X' && document.getElementById(7).innerText === 'X'
        || document.getElementById(2).innerText === 'X' && document.getElementById(5).innerText === 'X' && document.getElementById(8).innerText === 'X'
        || document.getElementById(0).innerText === 'X' && document.getElementById(4).innerText === 'X' && document.getElementById(8).innerText === 'X'
        || document.getElementById(2).innerText === 'X' && document.getElementById(4).innerText === 'X' && document.getElementById(6).innerText === 'X'){
            gameBoard.currentPlayerTurn.innerText = `${Players.player1Name} Wins!`
            reset.resetButton.disabled = false;
            
        }else if (document.getElementById(0).innerText === 'O' && document.getElementById(1).innerText === 'O' && document.getElementById(2).innerText === 'O'
        || document.getElementById(3).innerText === 'O' && document.getElementById(4).innerText === 'O' && document.getElementById(5).innerText === 'O'
        || document.getElementById(6).innerText === 'O' && document.getElementById(7).innerText === 'O' && document.getElementById(8).innerText === 'O'
        || document.getElementById(0).innerText === 'O' && document.getElementById(3).innerText === 'O' && document.getElementById(6).innerText === 'O'
        || document.getElementById(1).innerText === 'O' && document.getElementById(4).innerText === 'O' && document.getElementById(7).innerText === 'O'
        || document.getElementById(2).innerText === 'O' && document.getElementById(5).innerText === 'O' && document.getElementById(8).innerText === 'O'
        || document.getElementById(0).innerText === 'O' && document.getElementById(4).innerText === 'O' && document.getElementById(8).innerText === 'O'
        || document.getElementById(2).innerText === 'O' && document.getElementById(4).innerText === 'O' && document.getElementById(6).innerText === 'O'){
            gameBoard.currentPlayerTurn.innerText = `${player2Name} Wins!`
            reset.resetButton.disabled = false;
        }else if (xCount === 5 && oCount === 4 || xCount === 4 && oCount === 5 ){
            gameBoard.currentPlayerTurn.innerText = "Tie!"
            reset.resetButton.disabled = false;
        }
        
    }

    return{compareWin}
})();

const reset = ((xCount,oCount) => {
    
    let resetButton = document.querySelector('#resetButton')
    resetButton.disabled = true;
    resetButton.addEventListener('click',(e) => {
        resetBoardDisplay();
        resetButton.disabled = true;
    })
    function resetBoardDisplay(){
        gameBoard.currentGameBoard = ['','','','','','','','',''];
        for (let i = 0; i <=8; i++){
            document.getElementById(i).innerText = '';
        }
        gameBoard.currentPlayerTurn.innerText = `P1 Turn`//${playerNames.player1Name}
        xCount = 0;
        oCount = 0;
        console.log(xCount)
        console.log(oCount)
    }
    return{resetBoardDisplay,resetButton,xCount,oCount}
})();







