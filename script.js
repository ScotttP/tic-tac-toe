//Modules
const gameBoard = (() => {
    'use strict';
    
    const gamePlayGrid = document.querySelector('.gamePlayGrid');
    let currentGamboard = [
        ['','',''],['','',''],['','','']
    ];
    const _winningCombinations = [
        ['a0','a1','a2'],['b0','b1','b2'],['c0','c1','c2'],
        ['a0','b0','c0'],['a1','b1','c1'],['a2','b2','c2'],
        ['a0','b1','c2'],['c0','b1','a2']
    ];
    

    function updateGameboard () {
        currentGamboard.splice()
        console.log(currentGamboard)
    }
    function createGrid () {
        for (let i = 0; i <= 8; i++){
            const div = document.createElement('div');
            div.setAttribute('id',i)
            gamePlayGrid.appendChild(div);
        }
    }
    return {
        updateGameboard: updateGameboard,
        createGrid: createGrid,
    }
})();
gameBoard.createGrid();
gameBoard.updateGameboard();
//Factory Functions

