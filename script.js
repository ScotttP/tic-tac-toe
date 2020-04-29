//Modules

const gamePlay = (() => {
    'use strict';
    
    let currentPlayerTurn = document.getElementById('playerTurnText');
    currentPlayerTurn.innerText = 'Player 1'
    function render (id,currentPlayerTurn) {
        
        if (currentPlayerTurn.innerText ==='Player 1'){
            document.getElementById(id).innerText = 'X';
            currentPlayerTurn.innerText = 'Player 2'
            
        }else if(currentPlayerTurn.textContent==='Player 2'){
            document.getElementById(id).innerText = 'O';
            currentPlayerTurn.innerText ="Player 1"
        }else{console.log(currentPlayerTurn.innerText)}
       
    }
    return{currentPlayerTurn,render}
})();

const gameBoard = ((currentPlayerTurn) => {
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
            gamePlay.render(id,gamePlay.currentPlayerTurn)//this renders on the board
        })
    })
    function updateGameboard (id) {
        currentGamboard.splice(id,1,id)
        console.log(currentGamboard)
    }
    
    return {updateGameboard}
})();

//Factory Functions

const Players = (name,marker) => {
    
}




