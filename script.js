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
    
    startButton.addEventListener('click', initialStart,false)
    
    function initialStart() {
        playerNames = Players(player1Name,player2Name);
        resetButton.addEventListener('click', reset, false)
        
        xCount = 0;
        oCount = 0;
        
        if (playerNames.player1Name === undefined || playerNames.player1Name === '' 
        && playerNames.player2Name === undefined || playerNames.player2Name === ''){
            alert("Please Enter Your Name.")
            return
        }else{
                startButton.disabled = true;
                resetButton.disabled = true;

                currentPlayerTurn.innerText = `${playerNames.player1Name} TURN`

                gridbuttons.forEach((div) => {//calls the functions when clicked on a square
                    div.addEventListener('click', addFunctions,false)

                    function addFunctions() { //adds the render,updategameboard functions and is called when clicked on
                        let id = div.id;
                        if (playerNames.player1Name === '' || playerNames.player2Name === ''){
                            alert("Please Enter Your Name.")
                            return
                        }else{

                            render(id,currentPlayerTurn,playerNames)//this renders on the board needs to be gamePlay.currentPlayerTurn because it's in the gamePlay module and not global
                                
                            if (document.getElementById(id).innerText === 'X'){ //if the grid at a certain id contains an X, increase the count of X.
                                ++xCount
                                console.log(document.getElementById(id).innerText)
                                    
                            }
                            if (document.getElementById(id).innerText === 'O'){//if the grid at a certain id contains an O, increase the count of O.
                                ++oCount
                                console.log(document.getElementById(id).innerText)
                            }

                            updateGameboard(id,playerNames,div);
                            console.log(`Current X Count: ${xCount}`)
                            console.log(`Current O Count: ${oCount}`)
                        
                    }
                    div.removeEventListener('click', addFunctions,false) 
                    }
                    
                })
        
        }
        //startButton.removeEventListener('click',initialStart,false) // removes the initital start fucntion
    }
    
    function updateGameboard (id,playerNames,div) {
        currentGameBoard.splice(id,1,id);
        if (xCount >= 3 || oCount >= 3){
            gamePlay.compareWin(currentGameBoard,_winningCombinations,playerNames,xCount,oCount,div) //calls compare win function in the 
        }
    }
    
    function render (id,currentPlayerTurn,playerNames) {//toggle function between player turn
       console.log(currentPlayerTurn.innerText)
       
            if (currentPlayerTurn.innerText === `${playerNames.player1Name} TURN` || 
            currentPlayerTurn.innerText === '' ){
                document.getElementById(id).innerText = 'X';
                currentPlayerTurn.innerText = `${playerNames.player2Name} TURN`;
                
            }else if (currentPlayerTurn.innerText === `${playerNames.player2Name} TURN`){
                document.getElementById(id).innerText = 'O';
                currentPlayerTurn.innerText =`${playerNames.player1Name} TURN`;
            }else{
               
            }
       

    }

    function reset () {
        playerNames = Players(player1Name,player2Name);//makes the player names available
        
        gameBoard.currentGameBoard = ['','','','','','','','',''];
        currentGameBoard = ['','','','','','','','',''];
        for (let i = 0; i <=8; i++){
            document.getElementById(i).innerText = '';
        }

        document.getElementById('player1Name').value = '';
        document.getElementById('player2Name').value = '';
        player1Name = '';
        player2Name = '';
        playerNames.player1Name = '';
        playerNames.player2Name = '';
        gameBoard.currentPlayerTurn.innerText = '';
        xCount = 0;
        oCount = 0;
        resetButton.disabled = true;
        //resetButton.removeEventListener('click', reset, false) 
        startButton.disabled = false;
        //startButton.addEventListener('click', initialStart, false) // adds the start listener back since the game ended.
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

    function compareWin (currentGameBoard,_winningCombinations,playerNames,xCount,oCount,div) {
        if (currentGameBoard.includes(_winningCombinations[0][0,1,2]) 
        || currentGameBoard.includes(_winningCombinations[1][3,4,5]) 
        || currentGameBoard.includes(_winningCombinations[2][6,7,8]) 
        || currentGameBoard.includes(_winningCombinations[3][0,3,6]) 
        || currentGameBoard.includes(_winningCombinations[4][1,4,7]) 
        || currentGameBoard.includes(_winningCombinations[5][2,5,8]) 
        || currentGameBoard.includes(_winningCombinations[6][0,4,8])
        || currentGameBoard.includes(_winningCombinations[7][2,4,6])){
            checkSign(playerNames,xCount,oCount,div);
            }
    }
    function checkSign(playerNames,xCount,oCount,div) { 
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
           

        }else if (xCount === 5 && oCount === 4 || xCount === 4 && oCount === 5){
            gameBoard.currentPlayerTurn.innerText = "TIE!"
            xCount = 0;
            oCount = 0;
            resetButton.disabled = false;
            startButton.disabled = false;
            
        }
        
    }
    
    return{compareWin,checkSign}
})();







