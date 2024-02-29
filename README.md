# Tic-Tac-Toe
Non-Gui version of the famous game tic-tac-toe

How the Game Works
The game "board" is comprised of 9 "positions" in a 3 x 3 grid.

1	2	3

4	5	6

7	8	9

There are 8 possible combinations along the vertical, horizontal or diagonal axis that constitute a "win".

    // horizontal
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],

    // vertical
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],

    // diagonal
    [1, 5, 9],
    [3, 5, 7]

When the game is initialized the human player goes first, and may choose any position, which is pushed to the player.positions array.

The AI determines its next move in this order:

Examine the player's positions and determine which winning combinations have the fewest number of remaining moves.

Are there are two open positions in any winning combo?
Yes

Is this the AI's first turn?
Yes

Has the player chosen the middle space on his or her first move?
Yes. Pick a corner: 1, 3, 7 or 9.
No. Pick the middle position, 5.

Is the middle space available?
Yes. Pick the middle position.
No .Pick at random.

Does the AI only need one more position to win?
Yes. Choose the winning space
No. Choose the position that will block the player's winning combo
The AI will then push the selected position into its own .positions array. The active player is toggled, and control is returned to the human player.

This process continues until either player has positions that comprise a winning combination, or all positions are exhausted.
