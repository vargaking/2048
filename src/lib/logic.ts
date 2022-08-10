interface position {
    x: number;
    y: number;
}

interface Block {
    value: number;
    position: position;
}

export class Game {
    board: Block[];
    freePositions: position[];

    constructor() {
        this.board = [];
        this.freePositions = [];
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                this.freePositions.push({ x: i, y: j });
            }
        }
    }

    generateBlock() {
        // generate a random position
        
        let randomPosition = this.freePositions[Math.floor(Math.random() * this.freePositions.length)];
            
        const newBlock: Block = {
            value: Math.random() > 0.5 ? 2 : 4,
            position: randomPosition
        };
        this.board.push(newBlock);
        this.freePositions.splice(this.freePositions.indexOf(randomPosition), 1);
        
        this.logBoard();

    }

    logBoard() {
        console.log(this.board);
    }
}
