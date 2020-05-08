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
    let startButton = document.querySelector('#startButton');
    let resetButton = document.querySelector('#resetButton');
    const gamePlayGrid = document.querySelector('.gamePlayGrid');
    const gridbuttons = gamePlayGrid.querySelectorAll('div');

    let currentPlayerTurn = document.getElementById('playerTurnText');
    let playerNames;

    let xCount;
    let oCount;
    
    let currentGameBoard = ['','','','','','','','',''];
    const _winningCombinations = [
        ['0','1','2','','','','','',''],['','','','3','4','5','','',''],
        ['','','','','','','6','7','8'],['0','','','3','','','6','',''],
        ['','1','','','4','','','7',''],['','','2','','','5','','','8'],
        ['0','','','','4','','','','8'],['','','2','','4','','6','',''],
    ];
    
    startButton.addEventListener('click', () => {
        settingNamesAndMarkerCount()
    })
    resetButton.addEventListener('click', () => {
        reset()
    })
    gridbuttons.forEach(div => {
        let id = div.id;
        div.addEventListener('click', () => {// this adds the render function and updateGameboard function
            if (document.getElementById(id).innerText === ''){
                getUpdateFunctions(id)
                }
            })
        })
    
    function settingNamesAndMarkerCount() {
        playerNames = Players(player1Name,player2Name);
    
        xCount = 0;
        oCount = 0;
        
        startButton.disabled = true;
        resetButton.disabled = false;
        
        if (playerNames.player1Name === '' || playerNames.player2Name === ''){
            alert("Please Enter Your Name.")
            return
        }else{
        currentPlayerTurn.innerText = `${playerNames.player1Name} TURN`

        }
    }
      
    function getUpdateFunctions(id) { //calls the render,updategameboard functions and is called when clicked on
    
    render(id,currentPlayerTurn,playerNames)//this renders on the board needs to be gamePlay.currentPlayerTurn because it's in the gamePlay module and not global
        if (document.getElementById(id).innerText === 'X'){ //if the grid at a certain id contains an X, increase the count of X.
            ++xCount 
        }else if (document.getElementById(id).innerText === 'O'){//if the grid at a certain id contains an O, increase the count of O.
            ++oCount
        }
    updateGameboard(id,playerNames);
    }
    
    function updateGameboard (id,playerNames) {
        currentGameBoard.splice(id,1,id);
        gamePlay.compareWin(currentGameBoard,_winningCombinations,playerNames,xCount,oCount) //calls compare win function in the 
    }
    
    function render (id,currentPlayerTurn,playerNames) {//toggle function between player turn

        if (currentPlayerTurn.innerText === `${playerNames.player1Name} TURN` || 
        currentPlayerTurn.innerText === '' ){
            document.getElementById(id).innerText = 'X';
            currentPlayerTurn.innerText = `${playerNames.player2Name} TURN`;
        }else if (currentPlayerTurn.innerText === `${playerNames.player2Name} TURN`){
            document.getElementById(id).innerText = 'O';
            currentPlayerTurn.innerText =`${playerNames.player1Name} TURN`;
        }

    }
    function reset () {
        playerNames = Players(player1Name,player2Name);//makes the player names available
        
        gameBoard.currentPlayerTurn.innerText = '';
        gameBoard.currentGameBoard = ['','','','','','','','',''];
        currentGameBoard = ['','','','','','','','',''];

        for (let i = 0; i <=8; i++){
            document.getElementById(i).innerText = '';
        }

        document.getElementById('player1Name').value = '';
        document.getElementById('player2Name').value = '';
        xCount = 0;
        oCount = 0;
        resetButton.disabled = true;
        startButton.disabled = false;

        // removal of listeners. prevents the functions from being repeated when the reset button is clicked.
        startButton.removeEventListener('click', () => {
            settingNamesAndMarkerCount(); 
        })  
        gridbuttons.forEach(div => {
            div.removeEventListener('click', () => {
                getUpdateFunctions();
            })
        })
        resetButton.removeEventListener('click', () => {
            reset();
        })
        
    }
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

    function compareWin (currentGameBoard,_winningCombinations,playerNames,xCount,oCount) {
        if (currentGameBoard.includes(_winningCombinations[0][0,1,2]) 
        || currentGameBoard.includes(_winningCombinations[1][3,4,5]) 
        || currentGameBoard.includes(_winningCombinations[2][6,7,8]) 
        || currentGameBoard.includes(_winningCombinations[3][0,3,6]) 
        || currentGameBoard.includes(_winningCombinations[4][1,4,7]) 
        || currentGameBoard.includes(_winningCombinations[5][2,5,8]) 
        || currentGameBoard.includes(_winningCombinations[6][0,4,8])
        || currentGameBoard.includes(_winningCombinations[7][2,4,6])){
            checkSign(playerNames,xCount,oCount);
            }
    }
    function checkSign(playerNames,xCount,oCount) { 
        if(document.getElementById(0).innerText === 'X' && document.getElementById(1).innerText === 'X' && document.getElementById(2).innerText === 'X'
        || document.getElementById(3).innerText === 'X' && document.getElementById(4).innerText === 'X' && document.getElementById(5).innerText === 'X'
        || document.getElementById(6).innerText === 'X' && document.getElementById(7).innerText === 'X' && document.getElementById(8).innerText === 'X'
        || document.getElementById(0).innerText === 'X' && document.getElementById(3).innerText === 'X' && document.getElementById(6).innerText === 'X'
        || document.getElementById(1).innerText === 'X' && document.getElementById(4).innerText === 'X' && document.getElementById(7).innerText === 'X'
        || document.getElementById(2).innerText === 'X' && document.getElementById(5).innerText === 'X' && document.getElementById(8).innerText === 'X'
        || document.getElementById(0).innerText === 'X' && document.getElementById(4).innerText === 'X' && document.getElementById(8).innerText === 'X'
        || document.getElementById(2).innerText === 'X' && document.getElementById(4).innerText === 'X' && document.getElementById(6).innerText === 'X'){
            gameBoard.currentPlayerTurn.innerText = `${playerNames.player1Name} WINS!`
            xCount = 0;
            oCount = 0;
            resetButton.disabled = false;
            startButton.disabled = false;
        }else if (document.getElementById(0).innerText === 'O' && document.getElementById(1).innerText === 'O' && document.getElementById(2).innerText === 'O'
        || document.getElementById(3).innerText === 'O' && document.getElementById(4).innerText === 'O' && document.getElementById(5).innerText === 'O'
        || document.getElementById(6).innerText === 'O' && document.getElementById(7).innerText === 'O' && document.getElementById(8).innerText === 'O'
        || document.getElementById(0).innerText === 'O' && document.getElementById(3).innerText === 'O' && document.getElementById(6).innerText === 'O'
        || document.getElementById(1).innerText === 'O' && document.getElementById(4).innerText === 'O' && document.getElementById(7).innerText === 'O'
        || document.getElementById(2).innerText === 'O' && document.getElementById(5).innerText === 'O' && document.getElementById(8).innerText === 'O'
        || document.getElementById(0).innerText === 'O' && document.getElementById(4).innerText === 'O' && document.getElementById(8).innerText === 'O'
        || document.getElementById(2).innerText === 'O' && document.getElementById(4).innerText === 'O' && document.getElementById(6).innerText === 'O'){
            gameBoard.currentPlayerTurn.innerText = `${playerNames.player2Name} WINS!`
            xCount = 0;
            oCount = 0;
            resetButton.disabled = false;
            startButton.disabled = false;
        }else if(xCount === 5 && oCount === 4 || xCount === 4 && oCount === 5){
            gameBoard.currentPlayerTurn.innerText = "TIE!"
            xCount = 0;
            oCount = 0;
            resetButton.disabled = false;
            startButton.disabled = false;
            
        }
        
    }
    
    return{compareWin,checkSign}
})();
