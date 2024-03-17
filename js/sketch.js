// Creating the sound and filter for the 'flatline' sound effect
let filter = new Tone.Filter(350, "highpass");
let beep = new Tone.Synth({
  oscillator: {
    type: 'sawtooth'
  },
  envelope :
  {
    attack: .01,
    decay: 0.5,
    sustain: .5,
    release: .1,
  }
}).connect(filter);
filter.toDestination();

// Loading in the flatline image
function preload(){
  flatline = loadImage('assets/flatline.jpg');
}

// Creating the default canvas size
function setup() {
  createCanvas(400, 400);
}

// Main draw function
function draw() {
  // On mouse click
  if (mouseIsPressed === true)
  {
    // Change the background to the preloaded image
    background(flatline);
  } else if (mouseIsPressed === false)
  {
  // While no click occurs
  // Draw a gray background with text informing the user what effect will happen
    background(220);
    textSize(20);
    textAlign(CENTER);
    text ('Press mouse to flatline', width/2, height/2);
    text ('(SOUND WARNING: VERY LOUD)', width/2, height/2+50); 
  }
}

// Play the sound effect on mouse press
function mousePressed(){
  beep.triggerAttack('a5');
}

// Stop sound effect upon mouse release
function mouseReleased(){
  beep.triggerRelease();
}