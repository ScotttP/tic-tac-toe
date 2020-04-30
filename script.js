//Modules

const gamePlay = (() => {
    'use strict';
    function compareWin (currentGameBoard,_winningCombinations) {
        if (currentGameBoard.includes(_winningCombinations[0][0,1,2]) 
        || currentGameBoard.includes(_winningCombinations[1][3,4,5]) 
        || currentGameBoard.includes(_winningCombinations[2][6,7,8]) 
        || currentGameBoard.includes(_winningCombinations[3][0,3,6]) 
        || currentGameBoard.includes(_winningCombinations[4][1,4,7]) 
        || currentGameBoard.includes(_winningCombinations[5][2,5,8]) 
        || currentGameBoard.includes(_winningCombinations[6][0,4,8])
        || currentGameBoard.includes(_winningCombinations[7][2,4,6])  ){
            checkSign();
            }
    }
    function checkSign() { 
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
            gameBoard.currentPlayerTurn.innerText = `${Players.player2Name} Wins!`
            reset.resetButton.disabled = false;
        }else{
            
        }
        
    }

    return{compareWin}
})();

const gameBoard = (() => {
    'use strict';
    
    let currentPlayerTurn = document.getElementById('playerTurnText');
    currentPlayerTurn.innerText = 'Player 1 Turn'

    const gamePlayGrid = document.querySelector('.gamePlayGrid');
    const gridbuttons = gamePlayGrid.querySelectorAll('div');
    
    let currentGameBoard = ['','','','','','','','',''];
    const _winningCombinations = [
        ['0','1','2','','','','','',''],['','','','3','4','5','','',''],
        ['','','','','','','6','7','8'],['0','','','3','','','6','',''],
        ['','1','','','4','','','7',''],['','','2','','','5','','','8'],
        ['0','','','','4','','','','8'],['','','2','','4','','6','',''],
    ];
    
    gridbuttons.forEach((div) => {
        div.addEventListener('click', () => {
            let id = div.id;
            render(id,currentPlayerTurn)//this renders on the board needs to be gamePlay.currentPlayerTurn because it's in the gamePlay module and not global
            updateGameboard(id);
        })
    })
    function updateGameboard (id) {
        currentGameBoard.splice(id,1,id);
        //if the X count is >= 3 or O count is >= 3, call compare win function.
        gamePlay.compareWin(currentGameBoard,_winningCombinations);
    }
    
    function render (id,currentPlayerTurn) {
        document.getElementById(id).innerText === '';
        if (document.getElementById(id).innerText=== ''){
            if (currentPlayerTurn.innerText ==='Player 1 Turn'){
                document.getElementById(id).innerText = 'X';
                currentPlayerTurn.innerText = 'Player 2 Turn';
                
            }else{
                document.getElementById(id).innerText = 'O';
                currentPlayerTurn.innerText ='Player 1 Turn';
            }
        }

    }

    return {updateGameboard,render,currentPlayerTurn,currentGameBoard}
})();

const reset = (() => {
    
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
        gameBoard.currentPlayerTurn.innerText = 'Player 1 Turn'
        console.log(Players.player1Name)
    }
    return{resetBoardDisplay,resetButton}
})();

//Factory Functions

const Players = () => {
    let startButton = document.querySelector('#startButton')
    startButton.addEventListener('click', () => {
        player1Name = document.getElementById('player1Name').value
        player2Name = document.getElementById('player2Name').value
    })
    
    return{player1Name,player2Name}
}





