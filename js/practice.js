let synth = new Tone.PolySynth(Tone.Synth);
synth.toDestination();


let notes = {
  'q' : 'C4',
  'w' : 'D4',
  'e' : 'E4',
  'r' : 'F4',
  't' : 'G4',
  'y' : 'A4',
  'u' : 'B4',
  'i' : 'C5',
}

let noise = new  Tone.Noise("pink");
let filter = new Tone.Filter(100, "highpass");
let filter2 = new Tone.Filter(350, "highpass");

noise.connect(filter);
filter.toDestination();

let sine = new Tone.Synth({
  oscillator: {
    type: 'sine'
  }
}).toDestination();

let square = new Tone.Synth({
  oscillator: {
    type: 'square'
  }
}).toDestination();

let triangle = new Tone.Synth({
  oscillator: {
    type: 'triangle'
  }
}).toDestination();


let sawtooth = new Tone.Synth({
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
}).connect(filter2);
filter2.toDestination();


function setup() {
  createCanvas(400, 400);
}

function keyPressed()
{
  let playNotes = notes[key];
  synth.triggerAttack(playNotes);
  if (key == 'a'){sine.triggerAttackRelease ('c4',1);}
  else if (key == 's'){square.triggerAttackRelease ('c4',1);}
  else if (key == 'd'){sawtooth.triggerAttackRelease ('a5',2);}
  else if (key == 'f'){
    filter2.frequency.value = 100;
    sawtooth.triggerAttack ('c5');
    filter2.frequency.rampTo(5000,1);
  }
  else if (key == 'z'){
    noise.start();
    filter.frequency.rampTo(1000,3);}
  else if (key == 'x'){
    noise.stop();
    filter.frequency.value = 100;}
}

//Stops the note on key release
function keyReleased()
{
  let playNotes = notes[key];
  synth.triggerRelease(playNotes, '+0.03');
  if (key == 'f') 
  {
    sawtooth.triggerRelease(2.5);
   // filter2.frequency.value = 100;
  }
}


function draw() {
  background(220);
  rect (100,100,100,100);

}
