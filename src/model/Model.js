import { config_4x4, config_5x5, config_6x6 } from "./config";

// store configurations
const configs = [config_5x5, config_4x4, config_6x6]

/* represents a square on the board */
export class Square {
    constructor(row, column) {
        this.row = row
        this.column = column
    }
}

/* represents the game board */
export class Board {

    // size is the size of the board
    // config is the configuration of the board
    constructor(size, config) {
        this.size = size // size of game board
        this.config = config // configuration of game board

        this.grid = Array.from(Array(size), () => new Array(size)); // 2D array representing game board

        this.ninjaSeRow = this.config.ninjaRow - 1 // Row that the top-left corner of ninja-se is on
        this.ninjaSeColumn = this.config.ninjaColumn.toLowerCase().charCodeAt(0) - 97 // Column that the top-left corner of ninja-se is on

        //sets up base board
        for (let r = 0; r < size; r++) {
            for (let c = 0; c < size; c++) {
                this.grid[r][c] = new Square(r, c)
                this.grid[r][c].color = 'white'
            }
        }

        //adds colored squares to board from config file
        for (let i = 0; i < this.config.initial.length; i++) {
            let row = this.config.initial[i]["row"] - 1
            let column = this.config.initial[i]["column"].toLowerCase().charCodeAt(0) - 97
            let color = this.config.initial[i]["color"]
            this.grid[row][column].color = color
        }

        // how you access a square by its [row][column] location
        // this.grid[2][4]
    }

    /* return true if ninja-se and a square are at the same spot, or if two squares are at the same spot */
    isOverlappedWithSquare(row, column) {
        if (this.grid[row][column].color != 'white') {
            return true
        }
        return false
    }

    /* return true if ninja-se can move the intended direction, ninja-se cannot wrap around the board */
    isValidMove(verticalChange, horizontalChange) {
        if (this.ninjaSeRow + verticalChange >= 0 && this.ninjaSeRow + verticalChange < this.size - 1) { //Prevents Ninja-se from moving vertically off the board
            if (this.ninjaSeColumn + horizontalChange >= 0 && this.ninjaSeColumn + horizontalChange < this.size - 1) { //Prevents Ninja-se from moving horizontally off the board
                return true
            }
        }
        return false
    }

    /* return true if all colored squares are off the board (game is won) */
    isWon() {
        for (let r = 0; r < this.size; r++) {
            for (let c = 0; c < this.size; c++) {
                if (this.grid[r][c].color != 'white') {
                    return false
                }
            }
        }
        return true
    }


}

/* represents the the logic for the entire model (board, counters, and butttons) */
export default class Model {
    // info is going to be JSON-encoded puzzle

    // 'which' is an integer 0..1..2 which selects configuration you can use
    constructor(which) {
        this.config = configs[which] // the configuration selected
        this.score = 0 // integer value for the score value
        this.count = 0 // integer value for the count value
        this.won = false // boolean value on if the game is won

        this.size = Number(this.config.numColumns) // size of the board
        this.board = new Board(this.size, this.config) // game board within the model
    }

    /* changes the configuration of the board and resets appropriate values */
    changeConfiguration(which) {
        this.config = configs[which]
        this.won = false
        this.size = Number(this.config.numColumns)
        this.board = new Board(this.size, this.config)
        this.count = 0
        this.score = 0
    }

    /* resets the configuration of the board to initial layout and resets appropriate values */
    resetConfiguration() {
        this.won = false
        this.size = Number(this.config.numColumns)
        this.board = new Board(this.size, this.config)
        this.count = 0
        this.score = 0
    }

    /* shifts the squares on the board when they are moved by ninja-se */
    moveSquares(verticalChange, horizontalChange, ninjaSeRow, ninjaSeColumn) {
        if (this.board.isOverlappedWithSquare(ninjaSeRow, ninjaSeColumn)) {

            let newRow = ninjaSeRow + verticalChange //represents the new row of the item (ninja-se or square) after the vertical change applied to it
            let newColumn = ninjaSeColumn + horizontalChange //represents the new column of the item (ninja-se or square) after the horizontal change applied to it

            if (newRow == -1) { // wraps a square from the top to the bottom of the board
                newRow = this.size - 1
            } else if (newRow == this.size) { // wraps a square from the bottom to the top of the board
                newRow = 0
            } else if (newColumn == -1) { // wraps a square from the left to the right of the board
                newColumn = this.size - 1
            } else if (newColumn == this.size) { // wraps a sqaure from the right to the left of the board
                newColumn = 0
            }

            // 1) if the shifted square overlaps with a square we then recursively move the square that is now being overlapped by the vertical and horizontal change
            // 2) once the square finds a location that is empty we then stop the recursion and place that square on the board 
            // 3) then we move backwards through the recursion placing all the other squares on the appropriate spots
            if (this.board.isOverlappedWithSquare(newRow, newColumn)) {
                this.moveSquares(verticalChange, horizontalChange, newRow, newColumn)
            }

            // placing squares on their new spots, and removing them form their old spots
            this.board.grid[newRow][newColumn].color = this.board.grid[ninjaSeRow][ninjaSeColumn].color
            this.board.grid[ninjaSeRow][ninjaSeColumn].color = 'white'
            this.score++

        }
    }


    /* parses whole 2D array looking for 2x2 blocks of the same color and removing them */
    removeBlocks() {
        let tempChange = false
        for (let r = 0; r < this.size - 1; r++) {
            for (let c = 0; c < this.size - 1; c++) {
                if (this.board.grid[r][c].color != 'white'
                    && this.board.grid[r][c].color == this.board.grid[r + 1][c].color
                    && this.board.grid[r][c].color == this.board.grid[r][c + 1].color
                    && this.board.grid[r][c].color == this.board.grid[r + 1][c + 1].color) {

                    // changing all squares in the 2x2 block to a white color to show them being removed
                    this.board.grid[r][c].color = 'white'
                    this.board.grid[r + 1][c].color = 'white'
                    this.board.grid[r][c + 1].color = 'white'
                    this.board.grid[r + 1][c + 1].color = 'white'
                    this.score = this.score + 4 // updates score
                    tempChange = true
                }
            }
        }
        if (tempChange == true) {
            this.count++ // updates count if a block was removed
        }
        if (this.board.isWon() == true) { // checks to see if the game is now won
            this.won = true
        }
    }
}
