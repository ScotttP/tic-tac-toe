//Modules
const gameBoard = (() => {
    'use strict';
    const _winningArray = [
        ['0','1','2'],['3','4','5'],['6','7','8'],
        ['0','3','6'],['1','4','7'],['2','5','8'],
        ['0','4','8'],['2','4','6']
    ];
    let currentGamboard = [];

    function updateGameboard () {
        console.log(currentGamboard)
    }
    return {
        updateGameboard: updateGameboard,

    }
})();

//Factory Funcitons
const players (name,mark) => {

}
