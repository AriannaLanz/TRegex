from selenium import webdriver
from bs4 import BeautifulSoup
from bs4.element import Tag
import itertools
import re

def scrapeAndSolve(urlString): 
    puzzle = urlString

    # Create a browser instance and scrape the puzzle from the given URL
    browser = webdriver.PhantomJS()
    browser.get(puzzle)
    pageSoup = BeautifulSoup(browser.page_source, "html.parser")

    XSoup = pageSoup.find_all(re.compile('div'), class_ = "clue")
    YSoup = pageSoup.find_all(re.compile('th'), class_ = "clue")

    
    XClues = [ tag.contents[0] for soup in XSoup for tag in soup.contents if type(tag) == Tag and len(tag.contents) > 0 ]
    YClues = [ tag.contents[0] for soup in YSoup for tag in soup.contents if type(tag) == Tag and len(tag.contents) > 0 ]

    width = len(XClues)
    height = len(YClues)

    cw = Crossword(width, height)

    for i in xrange(width):
        cw.addClue('X' + str(i), horizClues[i])

    for j in xrange(height):
        cw.addClue('Y' + str(j), vertClues[j])

    crosswordSolver(cw)