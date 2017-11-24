var Crossword = require('./crosswordMaker');

require('./partialMatchParser');


let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ 1234567890!"#%&,<=>@~_`;:'


function crosswordSolver(crossword) {

    let index = 0;

    let cont = true;

    while (cont) {
        if (index < 0) {
            throw Error('I think there might have been a mistake.')
        }

        backtrack(crossword, index);

        crossword.solutions[index] = crossword.possibleMatches[index].slice(0, 1);
        crossword.possibleMatches[index] = crossword.possibleMatches[index].slice(1);

        if (checkSolutions(crossword)) {
            if (crossword.solutions.every(e => e.length !== 0)) {
                let solution = crossword.solutions.join('')
                return solution;
            }
            index++;
        }

        else { backtrack(crossword, index); }
    }

}


function checkSolutions(crossword) {
    //check all rows
    for (let i = 0; i < crossword.height; i++) {
        const start = crossword.width * i;
        const rowSolutionSlice = crossword.solutions.slice(start, crossword.width + start);
        const rowSolution = rowSolutionSlice.join('');

        let key = 'Y' + i;

        let clue = crossword.clues[key];
        //can't stop execution of function within a forEach, so we use a for loop

        for (let ii = 0; ii < clue.length; ii++) {
            if (!partialMatch(rowSolution, clue[ii])) {
                return false;
            }
        }
    }

    //check all columns
    for (let j = 0; j < crossword.width; j++) {
        const solutionsRay = crossword.solutions.slice(j).filter((element, index) => {
            return index % this.width === 0;
        })

        const colSolution = solutionsRay.join('');

        let key = 'X' + j;

        let clue = crossword.clues[key];
        for (let jj = 0; jj < clue.length; jj++) {
            if (!partialMatch(colSolution, clue[jj])) {
                return false;
            }
        }
    }

    return true;
}

function partialMatch(str, exp) {

    var regexObj = new RegExp(exp);
    var partialMatchRegex = regexObj.toPartialMatchRegex();
    var result = partialMatchRegex.exec(str);
    var matchType = regexObj.exec(str) ? 'Full match' : result && result[0] ? 'Partial match' : 'No match';

    if (str === '' || (matchType === 'Full match' || matchType === 'Partial match')) {
        return true;
    }

    return false;
}

function backtrack(crossword, index) {
    if (!crossword.possibleMatches[index]) {
        crossword.solutions[index] = '';
        crossword.possibleMatches[index] = characters;
        index--;
    }
}
