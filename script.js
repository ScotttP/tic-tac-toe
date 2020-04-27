//Modules
const gameBoard = ((playerMarker,currentPlayerTurn) => {
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
            gamePlay.render(id,playerMarker,currentPlayerTurn)//this renders on the board
            
        })
    })
    function updateGameboard (id) {
        currentGamboard.splice(id,1,id)
        console.log(currentGamboard)
    }

    return {updateGameboard}
})();

const gamePlay = (() => {
    'use strict';
    let playerMarker;
    let currentPlayerTurn;
    function render (id,playerMarker,currentPlayerTurn) {
       currentPlayerTurn = document.getElementById('playerTurnText').innerText
        if (currentPlayerTurn = 'Player 1'){
            playerMarker = 'X'
        }else{playerMarker = 'O'}
        document.getElementById(id).innerText = playerMarker;
    
    }

    return{currentPlayerTurn,playerMarker,render}
})();

//Factory Functions

const Players = (name,marker) => {
    
}




