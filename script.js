//Factory Functions
const Players = () => {
    let uPlayer1Name = document.getElementById('player1Name').value
    let uPlayer2Name = document.getElementById('player2Name').value
    player1Name= uPlayer1Name.toUpperCase();
    player2Name = uPlayer2Name.toUpperCase();
    
    return {player1Name,player2Name}
}
//Modules


const gameBoard = (() => {
    'use strict';
    let startButton = document.querySelector('#startButton')
    
    let currentPlayerTurn = document.getElementById('playerTurnText');
    let playerNames;

    let xCount;
    let oCount;

    const gamePlayGrid = document.querySelector('.gamePlayGrid');
    const gridbuttons = gamePlayGrid.querySelectorAll('div');
    
    let currentGameBoard = ['','','','','','','','',''];
    const _winningCombinations = [
        ['0','1','2','','','','','',''],['','','','3','4','5','','',''],
        ['','','','','','','6','7','8'],['0','','','3','','','6','',''],
        ['','1','','','4','','','7',''],['','','2','','','5','','','8'],
        ['0','','','','4','','','','8'],['','','2','','4','','6','',''],
    ];
    
    startButton.addEventListener('click', () => {
        playerNames = Players(player1Name,player2Name);
        
        xCount = 0;
        oCount = 0;

        if (playerNames.player1Name === undefined || playerNames.player1Name === '' 
        || playerNames.player2Name === undefined || playerNames.player2Name === ''){
            alert("Please Enter Your Name.")
            return
        }else{
            startButton.disabled = true;
            resetButton.disabled = true;

            currentPlayerTurn.innerText = `${playerNames.player1Name} TURN`

            gridbuttons.forEach((div) => {
                div.addEventListener('click', () => {
                    let id = div.id;
                    if (playerNames.player1Name === '' || playerNames.player2Name === ''){
                        alert("Please Enter Your Name.")
                        return
                    }
                    console.log(xCount)
                    console.log(oCount)
                    render(id,currentPlayerTurn,playerNames)//this renders on the board needs to be gamePlay.currentPlayerTurn because it's in the gamePlay module and not global
                        if (document.getElementById(id).innerText === 'X'){
                            xCount += 1
                        }else{
                            oCount += 1
                        }
                    updateGameboard(id,playerNames);
                    
                    })
                })
            }
    })

    function updateGameboard (id,playerNames) {
        currentGameBoard.splice(id,1,id);
        if (xCount >= 3 || oCount >= 3){
         gamePlay.compareWin(currentGameBoard,_winningCombinations,playerNames);
        }
       
        
    }
    
    function render (id,currentPlayerTurn) {
        document.getElementById(id).innerText === '';
        if (document.getElementById(id).innerText=== ''){
            if (currentPlayerTurn.innerText === `${playerNames.player1Name} TURN`){
                document.getElementById(id).innerText = 'X';
                currentPlayerTurn.innerText = `${playerNames.player2Name} TURN`;
                
            }else{
                document.getElementById(id).innerText = 'O';
                currentPlayerTurn.innerText =`${playerNames.player1Name} TURN`;
            }
        }

    }
    let resetButton = document.querySelector('#resetButton');
   
    resetButton.addEventListener('click',(e) => {
        playerNames = Players(player1Name,player2Name);
        currentGameBoard = ['','','','','','','','',''];
        for (let i = 0; i <=8; i++){
            document.getElementById(i).innerText = '';
        }
        
        document.getElementById('player1Name').value = '';
        document.getElementById('player2Name').value = '';
        playerNames.player1Name = '';
        playerNames.player2Name = '';
        gameBoard.currentPlayerTurn.innerText = '';
        xCount = 0;
        oCount = 0;
        resetButton.disabled = true;
        startButton.disabled = false;
    })

    return {
        currentPlayerTurn,
        currentGameBoard,
        xCount,
        oCount,
        startButton,
        resetButton}
})();

const gamePlay = (() => {
    'use strict';

    function compareWin (currentGameBoard,_winningCombinations,playerNames) {
        if (currentGameBoard.includes(_winningCombinations[0][0,1,2]) 
        || currentGameBoard.includes(_winningCombinations[1][3,4,5]) 
        || currentGameBoard.includes(_winningCombinations[2][6,7,8]) 
        || currentGameBoard.includes(_winningCombinations[3][0,3,6]) 
        || currentGameBoard.includes(_winningCombinations[4][1,4,7]) 
        || currentGameBoard.includes(_winningCombinations[5][2,5,8]) 
        || currentGameBoard.includes(_winningCombinations[6][0,4,8])
        || currentGameBoard.includes(_winningCombinations[7][2,4,6])){
            checkSign(playerNames);
            }
    }
    function checkSign(playerNames) { 
        if(document.getElementById(0).innerText === 'X' && document.getElementById(1).innerText === 'X' && document.getElementById(2).innerText === 'X'
        || document.getElementById(3).innerText === 'X' && document.getElementById(4).innerText === 'X' && document.getElementById(5).innerText === 'X'
        || document.getElementById(6).innerText === 'X' && document.getElementById(7).innerText === 'X' && document.getElementById(8).innerText === 'X'
        || document.getElementById(0).innerText === 'X' && document.getElementById(3).innerText === 'X' && document.getElementById(6).innerText === 'X'
        || document.getElementById(1).innerText === 'X' && document.getElementById(4).innerText === 'X' && document.getElementById(7).innerText === 'X'
        || document.getElementById(2).innerText === 'X' && document.getElementById(5).innerText === 'X' && document.getElementById(8).innerText === 'X'
        || document.getElementById(0).innerText === 'X' && document.getElementById(4).innerText === 'X' && document.getElementById(8).innerText === 'X'
        || document.getElementById(2).innerText === 'X' && document.getElementById(4).innerText === 'X' && document.getElementById(6).innerText === 'X'){
            gameBoard.currentPlayerTurn.innerText = `${playerNames.player1Name} WINS!`
            gameBoard.xCount = 0
            gameBoard.oCount = 0;
            resetButton.disabled = false;
            
        }else if (document.getElementById(0).innerText === 'O' && document.getElementById(1).innerText === 'O' && document.getElementById(2).innerText === 'O'
        || document.getElementById(3).innerText === 'O' && document.getElementById(4).innerText === 'O' && document.getElementById(5).innerText === 'O'
        || document.getElementById(6).innerText === 'O' && document.getElementById(7).innerText === 'O' && document.getElementById(8).innerText === 'O'
        || document.getElementById(0).innerText === 'O' && document.getElementById(3).innerText === 'O' && document.getElementById(6).innerText === 'O'
        || document.getElementById(1).innerText === 'O' && document.getElementById(4).innerText === 'O' && document.getElementById(7).innerText === 'O'
        || document.getElementById(2).innerText === 'O' && document.getElementById(5).innerText === 'O' && document.getElementById(8).innerText === 'O'
        || document.getElementById(0).innerText === 'O' && document.getElementById(4).innerText === 'O' && document.getElementById(8).innerText === 'O'
        || document.getElementById(2).innerText === 'O' && document.getElementById(4).innerText === 'O' && document.getElementById(6).innerText === 'O'){
            gameBoard.currentPlayerTurn.innerText = `${playerNames.player1Name} WINS!`
            gameBoard.xCount = 0
            gameBoard.oCount = 0;
            resetButton.disabled = false;
            
            
        }else if (gameBoard.xCount >= 5 && gameBoard.oCount >= 4){
            gameBoard.currentPlayerTurn.innerText = "TIE!"
            gameBoard.xCount = 0
            gameBoard.oCount = 0;
            resetButton.disabled = false;
           
        }
        
    }
    
    return{compareWin,checkSign}
})();







