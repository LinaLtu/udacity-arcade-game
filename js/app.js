// Enemies our player must avoid
let Enemy = function() {
  this.x = 0;
  this.y = getRandomIntInclusive(50, 250);
  this.speed = getRandomIntInclusive(20, 80);
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started

  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = "images/enemy-bug.png";
};

Enemy.prototype.reset = function() {
  this.x = 0;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  let movement = this.speed * dt;
  this.x += movement;

  // If the bug reaches the end of the field, it comes back to the beginning
  // and starts walking again
  if (this.x > 500) {
    this.x = -100;
    this.y = getRandomIntInclusive(50, 250);
  }
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Player
let Player = function() {
  this.x = 200;
  this.y = 440;

  this.direction = null;

  this.speed = 600;
  this.sprite = "images/char-boy.png";
};

Player.prototype.handleInput = function(key) {
  this.direction = key;
};

Player.prototype.update = function(dt) {
  let movement = this.speed * dt;

  switch (this.direction) {
    case "left":
      if (this.x - movement >= 0) {
        this.x -= movement;
      } else {
        return;
      }
      break;
    case "right":
      if (this.x + movement <= 410) {
        this.x += movement;
      } else {
        return;
      }
      break;
    case "up":
      this.y -= movement;
      break;
    case "down":
      if (this.y + movement <= 440) {
        this.y += movement;
      } else {
        return;
      }
      break;
    default:
      return;
  }
  this.direction = null;
};

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.reset = function() {
  this.x = 200;
  this.y = 440;

  this.direction = null;
};

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

let player = new Player();

//Create bugs
const enemiesNumber = 3;
let allEnemies = [];

for (let i = 0; i < enemiesNumber; i++) {
  allEnemies.push(new Enemy());
}

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener("keyup", function(e) {
  var allowedKeys = {
    37: "left",
    38: "up",
    39: "right",
    40: "down"
  };

  player.handleInput(allowedKeys[e.keyCode]);
});
