// Create entity class
class Entity {
    constructor() {
        this.sprite = 'images/';
        this.x = 2;
        this.y = 5;
    }

    // Check to see if sprites are off the board
    update(dt) {
        this.isOffScreenX = this.x > 5;
        this.isOffScreenY = this.y < 1;
    }

    // Draws the sprites on the board
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x * 101, this.y * 78);
    }

    // Check to see if player or enemy collided
    checkCollisions(playerOrEnemy) {
        if (this.y === playerOrEnemy.y) {
            if (this.x >= playerOrEnemy.x - 0.75 && this.x <= playerOrEnemy.x + 0.75) {
                return true;
            }
            else {
                return false;
            }
        }
    }

}

// Create Enemy class
class Enemy extends Entity {
    constructor(x, y, speed) {
        super();
        this.sprite += 'enemy-bug.png';
        this.x = x;
        this.y = y;
        this.speed = speed;
    }

    update(dt) {
        super.update();
        if(this.isOffScreenX){
            this.x = -1;
        }
        else {
            this.x += this.speed * dt;
        }
    }
}

// Create Player class
class Player extends Entity {
    constructor() {
        super();
        this.sprite += 'char-boy.png';
        this.moving = false;
        this.win = false;
    }

    // Move players around the board
    handleInput(input) {
        switch (input) {
            // Set boundaries for player movement
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
        this.moving = true; //player is moving
    }

    // Check for player victory
    update(dt) {
        super.update();
        if (this.isOffScreenY && !this.moving && !this.win) {
            this.win = true;
            alert('Congratulations! You won!');
            restart();

        } else {
            this.win = false;
        }
    }

    render() {
        super.render();
        this.moving = false;
    }
}

//Reset player
function restart() {
    player.x = 2;
    player.y = 5;

    clearEnemies();
    spawnEnemies();
};

// Place all enemy objects in an array called allEnemies
let allEnemies = [];
spawnEnemies();

//Spawning six enemies
function spawnEnemies() {
    //Create an array of six enemies
    for (var i=0; i < 6; i++){
        var x = 0;
        var y = Math.floor((Math.random() * 4) + 1);
        var speed = Math.floor((Math.random() * 7) + 1);
        allEnemies.push(new Enemy(x, y, speed));
    }
};

//Clear the allEnemies array
function clearEnemies() {
    for (var i=0; i < 6; i++){
        allEnemies.pop();
    }
};

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
