
//const escapeStringRegexp = require('escape-string-regexp');

//only characters tested by game
let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ 1234567890!"#%&,<=>@~_`;:'


function Crossword(width, height) {
    this.width = width;
    this.height = height;

    this.clues = this.cluesMaker(height, width);
    this.possibleMatches = Array(height * width).fill(characters);
    this.solutions = Array(height * width).fill('');
}

Crossword.prototype.cluesMaker = function (height, width) {
    let clues = {};
    for (let i = 0; i < width; i++) {
        let key = 'X' + i;
        clues[key] = [];
    }

    for (let j = 0; j < height; j++) {
        let key = 'Y' + j;
        clues[key] = [];
    }

    return clues;
}


//exp must be input as String.raw`template literal`--> Is there any way to change this?
//cell is a string 
Crossword.prototype.addClue = function (cell, exp) {
    if (cell[0] !== 'X' && cell[0] !== 'Y') {
        throw Error('There are only two directions, X and Y.')
    }

    else if (cell[1] < 0 || (cell[0] === 'X' && cell[1] >= this.width) || (cell[0] === 'Y' && cell[1] >= this.height)) {
        throw Error('Index out of bounds')
    } 

    this.clues[cell].push(exp);

    }


module.exports = Crossword;