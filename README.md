# Browser-based Lite Brite
### Using HTML, CSS, and JavaScript

Move your cursor around to light up the board.

## How it works
- "Pick Color" and "Random Color" change the color of the pegs you're using
- "Party!" hands you a bag of mixed-color pegs to blindly reach in and use
- the light switch turns the backlight on and off
- the slider allows you to swap out the peg board you're using for one with a different number of holes.  If you have pegs on the board already, expanding the grid size will retain your work in the top left corner, while reducing the grid size will retain as many of your pegs as possible while shaving off the right columns and bottom rows until reaching the new grid size
- "Clear" removes all the pegs and lets you start from scratch

## A few things I learned
- adding and removing box shadows on 1,000 pegs with a transition affects performance... substantially
- displaying the pegs as a bunch of sequential DOM elements in a grid was perhaps more complicated when it came to writing the algorithm to resize the grid while keeping pre-existing pegs than displaying each row as an array of pegs would have been
- ::before/::after pseudo-elements are functionally positioned relatively by positioning them absolutely and positioning the original element relatively
- CSS should have better support for styling inputs