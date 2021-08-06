# Browser-based Lite Brite
## Using HTML, CSS, and JavaScript

Move your cursor around to light up the board.

## A few things I learned
- adding and removing box shadows on 1,000 pegs with a transition affects performance... substantially
- displaying the pegs as a bunch of sequential DOM elements in a grid was perhaps more complicated when it came to writing the algorithm to resize the grid while keeping pre-existing pegs than displaying each row as an array of pegs would have been
- ::before/::after pseudo-elements are functionally positioned relatively by positioning them absolutely and positioning the original element relatively
- CSS should have better support for styling inputs

TO-DO
- change fonts
- add something so the lights go off for a moment before getting taken out completely
- warn before cropping image
- figure out what to do with clear button on focus
- align left button group and right button group
- make text smaller for switch and slider

(maybe)
- optimize light toggle // maybe this is done?
- put transition back in? make peg-hole transition only when light is turned on or off? much faster without it
- make each pass over the same peg brighter?  like add x% each time

COMPLETED

- ~~make the size of the pegs variable based on the number~~
- ~~fix light switch so turning it off before placing any pegs works~~
- ~~specify grid size (up to 100?) and keep art~~
- ~~make sure grid resizing isn't cutting off the far right edge~~
- ~~change to specific color~~
- ~~change to random color~~
- ~~clear pegs~~
- ~~turn light on/off~~
- ~~color picker doesn't end party~~
- ~~change color + fill on hover~~