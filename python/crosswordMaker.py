import regex as re
from crosswordMaker import Crossword
from crosswordSolver import crosswordSolver


class Crossword(object):

    # represents all the available characters for this puzzle
    characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ 1234567890!"#%&,<=>@~_`;:'

    def __init__(self, width, height):
        self.width = width
        self.height = height
        self.clues = dict(
            [('X' + str(i), [])
                for i in xrange(self.width)]
            + 
            [('Y' + str(j), [])
                for j in xrange(self.height)]
        )
        self.solutions = ['' for _ in xrange(self.width * self.height)]
        self.possibleMatches = [self.characters
                for _ in xrange(self.width * self.height)]
        
        
    def addClue(self, cell, exp):
        if cell[0] is not 'X' and cell[0] is not 'Y':
            raise ValueError('There are only two directions, X and Y.')
        elif int(cell[1]) < 0 or (cell[0] is 'X' and int(cell[1]) >= self.width) or (cell[0] is 'Y' and int(cell[1]) >= self.height):
            raise ValueError('Index out of bounds')
            
        self.clues[cell].append(exp);
        