# Battleboats
Play Battle Boats against the computer. Built with JavaScript, JQuery, HTML and CSS. Optimized for larger screens.

This is still in beta testing so there are still console.logs and commented out code to continue debugging the logic.

Name spacing was used in script.js.

Some of the challenges when building this was the error checking. 
If the user doesn't enter a name, there is a default name given to them.

When setting the user boats, I had to take their starting square, the direction they wanted the boat to be oriented, and the length of the boat they were setting and make sure it wouldn't land outside of the grid. 
If it did, their input would be reset and an error message would appear to ask them to try another square.

The same had to be done when setting the computer's boats. The starting square would be generated using Math.random (for row and column) and the direction would be chosen randomly as well. 
If it didn't fit in the board, another starting square would be chosen as well as a direction until all boats are set.

The user's entry for a square (for setting boats and for guessing) is checked to make sure it is a valid square. 
If not, their entry is cleared and an error message lets them know it is not a valid square and asks them to try again.

Then the guess is checked against the array of previous guesses to make sure it has not already been guessed.
If it has, they get an error message and the input is reset.

Figuring out the computer's guessing logic was the biggest challenge. (There might be a bug or too that I didn't catch yet!)

First, a check is done to see if the computer had a hit with the last guess.
If there are no previous hits, the computer's guess is chosen using Math.random (row, column).

That square is checked to see if was previously guessed. All of the guesses are stored in an array.
If it was already guessed, another square is chosen.

If the square was not previously guessed, check to see if it is occuppied.
If it is not occuppied, it is a miss. 

If it is, then it is a hit. That guess is stored in an array of hits.
The type of ship that was hit is checked and the number of hits it has recieved is increased by one.
If the number of hits equals the length of the boat. That boat has been sunk.
A message is displayed saying which boat was sunk and the colour of the icon beside the boat name in the legend is changed to show it was sunk. The colour of the lines around the square on the game board also change to show which hits belonged to that boat.
This is also done when the user sinks one of the computer's boats.

When the computer sinks a boat, those squares are removed from the array of hits. 
When it is the computer's turn next, the last hit is used as the basis for the computer's next guess.

The computer checks the square above the last guess first (making sure it is not the first row on the board and not previously guessed).
If it is a hit, it will keep checking above until it gets a miss, previous guess, or the first row in the board.
If it can't check above, it will check below (same conditions to check, not previously guessed or last row).
If it can't check below anymore it goes back and checks the square to the left and keeps checking left until a miss, first column, etc.
Then lastly checks the square to the right.

Figuring out the logic was a challenge but a LOT of fun!!

Hope you enjoy the game!

Feedback is always appreciated.
