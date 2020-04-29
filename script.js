//Modules

const gamePlay = (() => {
    'use strict';
    
    let currentPlayerTurn = document.getElementById('playerTurnText');
    currentPlayerTurn.innerText = 'Player 1 Turn'

    function render (id,currentPlayerTurn) {
        
        if (currentPlayerTurn.innerText ==='Player 1 Turn'){
            document.getElementById(id).innerText = 'X';
            currentPlayerTurn.innerText = 'Player 2 Turn'
            
        }else if(currentPlayerTurn.textContent==='Player 2 Turn'){
            document.getElementById(id).innerText = 'O';
            currentPlayerTurn.innerText ='Player 1 Turn'
        }else{
            return
        }
       
    }

    
    return{currentPlayerTurn,render}
})();

const gameBoard = (() => {
    'use strict';
    
    const gamePlayGrid = document.querySelector('.gamePlayGrid');
    const gridbuttons = gamePlayGrid.querySelectorAll('div');

    let currentGamboard =['','','','','','','','',''];
    const _winningCombinations = [
        ['0','1','2','','','','','',''],['','','','3','4','5','','',''],
        ['','','','','','','6','7','8'],['0','','','3','','','6','',''],
        ['','1','','','4','','','7',''],['','','2','','','5','','','8'],
        ['0','','','','4','','','','8'],['','','2','','4','','6','',''],
    ];
    gridbuttons.forEach((div) => {
        div.addEventListener('click', () => {
            let id = div.id;
            updateGameboard(id);
            gamePlay.render(id,gamePlay.currentPlayerTurn)//this renders on the board needs to be gamePlay.currentPlayerTurn because it's in the gamePlay module and not global
        })
    })
    function updateGameboard (id) {
        currentGamboard.splice(id,1,id)
        compareWin(currentGamboard);
    }
    function compareWin (currentGamboard) {
        console.log(currentGamboard)
        console.log(_winningCombinations)
    }
    
    return {updateGameboard}
})();

//Factory Functions

const Players = (name,marker) => {
    
}




