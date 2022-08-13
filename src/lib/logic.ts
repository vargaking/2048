interface position {
  x: number;
  y: number;
}

export interface Block {
  id: number;
  value: number;
  position: position;
}

export class Game {
  board: number[][];
  randomLookupTable: number[];
  lookupIndex: number;

  constructor() {
    this.randomLookupTable = [];
    this.lookupIndex = 0;

    // generate random numbers
    for (let i = 1e6; i >= 0; i--) {
      this.randomLookupTable.push(Math.random());
    }

    this.board = [];
    for (let i = 0; i < 4; i++) {
      let row: number[] = [];
      for (let j = 0; j < 4; j++) {
        row.push(0);
      }
      this.board.push(row);
    }

    this.generateBlock();
    this.generateBlock();

    console.log(this.board);
  }

  lookup() {
    this.lookupIndex++;
    return this.randomLookupTable[this.lookupIndex];
  }

  generateBlock() {
    // generate a random position

    let freePositions: number = 0;
    // iterate through the board and count the number of 0s

    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (this.board[i][j] == 0) {
          freePositions++;
        }
      }
    }

    if (freePositions === 0) {
      return;
    }
    let randomPosition: number = Math.floor(this.lookup() * freePositions);

    // generate a random value: 10% chance of 4, 90% chance of 2
    let randomValue = this.lookup() < 0.25 ? 4 : 2;

    let freePosIndex: number = 0;
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (this.board[i][j] == 0) {
          if (freePosIndex === randomPosition) {
            this.board[i][j] = randomValue;
            return;
          }
          freePosIndex++;
        }
      }
    }

    return this.board;
  }

  swipeUp() {
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (this.board[i][j] != 0) {
          for (let k = i - 1; k >= 0; k--) {
            if (this.board[k][j] == 0) {
              this.board[k][j] = this.board[i][j];
              this.board[i][j] = 0;
              i--;
            } else {
              break;
            }
          }
        }
      }
    }
  }

  swipeDown() {
    for (let i = 3; i >= 0; i--) {
      for (let j = 0; j < 4; j++) {
        if (this.board[i][j] != 0) {
          for (let k = i + 1; k < 4; k++) {
            if (this.board[k][j] == 0) {
              this.board[k][j] = this.board[i][j];
              this.board[i][j] = 0;
              i++;
            } else {
              break;
            }
          }
        }
      }
    }
  }

  swipeLeft() {
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (this.board[i][j] != 0) {
          for (let k = j - 1; k >= 0; k--) {
            if (this.board[i][k] == 0) {
              this.board[i][k] = this.board[i][j];
              this.board[i][j] = 0;
              j--;
            } else {
              break;
            }
          }
        }
      }
    }
  }

  swipeRight() {
    for (let i = 0; i < 4; i++) {
      for (let j = 3; j >= 0; j--) {
        if (this.board[i][j] != 0) {
          for (let k = j + 1; k < 4; k++) {
            if (this.board[i][k] == 0) {
              this.board[i][k] = this.board[i][j];
              this.board[i][j] = 0;
              j++;
            } else {
              break;
            }
          }
        }
      }
    }
  }

  combineUp() {
    for (let i = 1; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (this.board[i][j] != 0) {
          if (this.board[i][j] === this.board[i - 1][j]) {
            this.board[i - 1][j] *= 2;
            this.board[i][j] = 0;
          }
        }
      }
    }
  }

  combineDown() {
    for (let i = 2; i >= 0; i--) {
      for (let j = 0; j < 4; j++) {
        if (this.board[i][j] != 0) {
          if (this.board[i][j] === this.board[i + 1][j]) {
            this.board[i + 1][j] *= 2;
            this.board[i][j] = 0;
          }
        }
      }
    }
  }

  combineLeft() {
    for (let i = 0; i < 4; i++) {
      for (let j = 1; j < 4; j++) {
        if (this.board[i][j] != 0) {
          if (this.board[i][j] === this.board[i][j - 1]) {
            this.board[i][j - 1] *= 2;
            this.board[i][j] = 0;
          }
        }
      }
    }
  }

  combineRight() {
    for (let i = 0; i < 4; i++) {
      for (let j = 2; j >= 0; j--) {
        if (this.board[i][j] != 0) {
          if (this.board[i][j] === this.board[i][j + 1]) {
            this.board[i][j + 1] *= 2;
            this.board[i][j] = 0;
          }
        }
      }
    }
  }


  move(direction: string) {
    switch (direction) {
      case "ArrowUp":
        this.swipeUp();
        this.combineUp();
        this.swipeUp();
        break;
      case "ArrowDown":
        this.swipeDown();
        this.combineDown();
        this.swipeDown();
        break;
      case "ArrowLeft":
        this.swipeLeft();
        this.combineLeft();
        this.swipeLeft();
        break;
      case "ArrowRight":
        this.swipeRight();
        this.combineRight();
        this.swipeRight();
        break;
    }
    this.generateBlock();
  }

  getBoardFull() {
    return this.board;
  }

  getBoard() {
    let board: number[] = [];
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        board.push(this.board[i][j]);
      }
    }

    return board;
  }
}
