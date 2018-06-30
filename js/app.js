// Create entity class
class Entity {
    constructor() {
        this.sprite = 'images/';
        this.x = 2;
        this.y = 5;
    }

    // Update the sprites
    update(dt) {
        this.isOffScreenX = this.x > 5;
        this.isOffScreenY = this.y < 1;
    }

    // Draws the entity on the board
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x * 101, this.y * 78);
    }

}

// Create Enemy class
class Enemy extends Entity {
    constructor(x, y) {
        super();
        this.sprite += 'enemy-bug.png';
        this.x = x;
        this.y = y;
    }

    update(dt) {
        super.update();
        if(this.isOffScreenX){
            this.x = -1;
        }
        else {
            this.x += dt;
        }
    }
}


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player extends Entity {
    constructor() {
        super();
        this.sprite += 'char-boy.png';
    }

    handleInput(input) {
        switch (input) {
            //Set boundaries for player movement
            case 'left':
                this.x = this.x > 0 ? this.x - 1 : this.x;
                break;
            case 'up':
                this.y = this.y > 0 ? this.y - 1 : this.y;
                break;
            case 'right':
                this.x = this.x < 4 ? this.x + 1 : this.x;
                break;
            case 'down':
                this.y = this.y < 5 ? this.y + 1 : this.y;
                break;
            default:
                break;
        }
    }
}




// Now instantiate your objects.

// Place all enemy objects in an array called allEnemies
//Create an array of three enemies
const allEnemies = [...Array(4)].map((_,i)=> new Enemy(0,i+1));

// Place the player object in a variable called player
const player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
