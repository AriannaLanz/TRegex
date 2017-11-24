#TRegex
##A Regex Crossword Solver

What's more fun than doing the puzzles on www.regexcrossword.com? Writing a solver that scrapes the website for the clues and does it for you! All you have to do, is input the URL. 

The solver was originally meant to be completed in JavaScript using a a depth-first search, "backtracking" algorithm. The JavaScript Regex engine doesn't allow for partial matching just yet, so I am in the process of modifying 
Lucas Trzesniewski's solution on StackOverflow to make the algorithm work for my purposes. In addition, scraping dynamic websites in JavaScript is much harder than scraping static websites. 

So instead, I completed it in Python. The solver works, even with RegEx backreferences, and the scraping works for both static and dynamic websites. 

I will continue to work on JavaScript scraping, and the partial matcher. Another complication is making sure the strings are raw literals all the time: this sometimes presents errors with backreferences. Once everything is up-to-date, I will extend the algorithm to hexagonal crosswords!

