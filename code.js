var pos = 0;
const pacArray = [
  ['./ghost1.png', './ghost2.png'],
  ['./PacMan1.png', './PacMan2.png'],
];
var direction = 0;
const pacMan = [];
let articleWidth;
let articleHeight;
let timeoutId;
let isRunning = false;


function getArticleDimensions() {
    const articleElement = document.querySelector("article");
    articleWidth = articleElement.clientWidth;
    articleHeight = articleElement.clientHeight;
  }
  

function setToRandom(scale) {
    return {
      x: Math.random() * scale,
      y: Math.random() * scale,
    };
  }
  

  // Call setToRandom with a larger scale value when creating new Pac-Man objects
  let position = setToRandom(articleWidth - 100); // Subtract 100 to account for the Pac-Man image width
  
  // Call this function at the end of the makePac function to update the Pac-Man position
  function updatePacPosition(pac) {
    pac.position.x = setToRandom(articleWidth - 100).x;
    pac.position.y = setToRandom(articleHeight - 100).y;
    pac.newimg.style.left = pac.position.x + "px";
    pac.newimg.style.top = pac.position.y + "px";
  }
  
// Factory to make a PacMan
function makePac(imageSet) {
    // Update the article dimensions when creating a new Pac-Man
    getArticleDimensions(); 
    // returns an object with values scaled {x: 33, y: 21}
    let velocity = setToRandom(5);
    let position = setToRandom(50);
    // Add image to div id = game
    let game = document.getElementById('game');
    let newimg = document.createElement('img');
    newimg.style.position = 'absolute';
    newimg.src = pacArray[imageSet][0];
    newimg.style.position = 'absolute';
    newimg.src = 'ghost1.png';
    newimg.width = 30;
    newimg.style.left = position.x  + "px";
    newimg.style.top = position.y + "px";
    game.appendChild(newimg);
    // new style of creating an object
    let pac = {
        position,
        velocity,
        newimg,
        imageSet,
        imageIndex: 0, // Initialize imageIndex as 0
  };

  pacMan.push(pac); // add the new PacMan object to the pacMan array

  updatePacPosition(pac);
  return pac;
}


function update() {
  // Call getArticleDimensions here
  getArticleDimensions();
  // Loop over pacmen array and move each one and move image in DOM
  pacMan.forEach((item) => {
    checkCollisions(item);
    item.position.x += item.velocity.x;
    item.position.y += item.velocity.y;

    item.newimg.style.left = item.position.x + "px";
    item.newimg.style.top = item.position.y + "px";
  });

  if (isRunning) {
    timeoutId = setTimeout(update, 1000 / 60); // Update at 60 FPS
  }
}



function stopAndFreezeAnimation() {
  if (isRunning) {
    // Stop PacMan movement by clearing the timeout
    clearTimeout(timeoutId);
    // Pause PacMan animation by setting velocity to 0
    pacMan.forEach((item) => {
      item.velocity = { x: 0, y: 0 }; // set velocity to 0 to freeze movement
    });
    isRunning = false;
  } else {
    startAnimation();
  }
}

function startAnimation() {
  // Restore the original velocity of the PacMan objects
  pacMan.forEach((item) => {
    item.velocity = setToRandom(5);
  });

  // Set the new timeoutId using setTimeout and call the update function
  timeoutId = setTimeout(update, 1000 / 60); // Update at 60 FPS

  // Set isRunning to true
  isRunning = true;
}



function checkCollisions(item) {
  const alternativeImages = pacArray[item.imageSet];

  if (
    item.position.x + item.velocity.x + item.newimg.width > articleWidth ||
    item.position.x + item.velocity.x < 0
  ) {
    item.velocity.x = -item.velocity.x;
  }
  if (
    item.position.y + item.velocity.y + item.newimg.height > articleHeight ||
    item.position.y + item.velocity.y < 0
  ) {
    item.velocity.y = -item.velocity.y;
  }
  
  // Set the image based on the x-axis velocity
  item.newimg.src = item.velocity.x > 0 ? alternativeImages[1] : alternativeImages[0];
}


  
  function makePac(imageSet) {
    // Update the article dimensions when creating a new Pac-Man
    getArticleDimensions();
    // returns an object with values scaled {x: 33, y: 21}
    let velocity = setToRandom(5);
    let position = setToRandom(50);
    // Add image to div id = game
    let game = document.getElementById("game");
    let newimg = document.createElement("img");
    newimg.style.position = "absolute";
    newimg.src = pacArray[imageSet][0]; // Set the initial image based on the imageSet
    newimg.width = 30;
    newimg.style.left = position.x + "px";
    newimg.style.top = position.y + "px";
    game.appendChild(newimg);
    // new style of creating an object
    let pac = {
      position,
      velocity,
      newimg,
      imageSet, // Add the imageSet property
    };
  
    pacMan.push(pac); // add the new PacMan object to the pacMan array
  
    updatePacPosition(pac);
    return pac;
  }
  

  function makeOne(imageSet) {
    pacMan.push(makePac(imageSet));
    if (!isRunning) {
      startAnimation();
    }
  }


  
//don't change this line
if (typeof module !== 'undefined') {
  module.exports = { checkCollisions, update, pacMan };
}


// Call the getArticleDimensions function when the DOM is ready
document.addEventListener("DOMContentLoaded", getArticleDimensions);
// Update the article dimensions when the window is resized
window.addEventListener("resize", getArticleDimensions);
