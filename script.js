//Modules
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
            let playerMarker = "X"; // needs to be able to switch to O function for this
            updateGameboard(id,playerMarker);
            render(id,playerMarker)//this renders on the board
        })
    })
    function updateGameboard (id,playerMarker) {
        currentGamboard.splice(id,1,playerMarker)
        console.log(currentGamboard)
    }

    return {updateGameboard}
})();

const displayController = (() => {
    'use strict';
  
})();

//Factory Functions

const Players = (name,marker) => {
    
}

function render (id,playerMarker) {
    document.getElementById(id).innerText = playerMarker;
}
