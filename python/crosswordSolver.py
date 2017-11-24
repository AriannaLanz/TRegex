from crosswordMaker import Crossword

def crosswordSolver (crossword):
    index = 0
    while True:
        if index < 0:
            raise ValueError('No solution')
            
        backtrack(crossword, index)

        crossword.solutions[index] = crossword.possibleMatches[index][0]
        crossword.possibleMatches[index] = crossword.possibleMatches[index][1:]
        
        if checkSolutions(crossword):
            if all(crossword.solutions):
                solution = ''.join(crossword.solutions)
                return solution
            index += 1
        else:
            backtrack(crossword, index)

                
def checkSolutions(crossword):
    for i in xrange(crossword.height):
        start = crossword.width * i
        rowSolution = ''.join(crossword.solutions[start: crossword.width + start])
        print rowSolution
        key = 'Y' + str(i)
        
        clues = crossword.clues[key]
        
        for clue in clues:
            if not partialMatch(rowSolution, clue, crossword.width):
                return False
            
    for j in xrange(crossword.width):        
        colSolution = ''.join(crossword.solutions[j::crossword.width])
        print colSolution

        key =  'X' + str(j)
        
        clues = crossword.clues[key]
        
        for clue in clues:
            print (partialMatch(colSolution, clue, crossword.height))
            if not partialMatch(colSolution, clue, crossword.height):
                return False; 

    return True


def partialMatch(string, exp, maximum):
    print string
    print exp
    partial = len(string) != maximum
    regexObj = re.compile(exp)

    if regexObj.fullmatch(string, partial=partial):
        return True
    return False

def backtrack(crossword, index):
    if not crossword.possibleMatches[index]:
        crossword.solutions[index] = ''
        crossword.possibleMatches[index] = crossword.characters
        index -= 1

    
