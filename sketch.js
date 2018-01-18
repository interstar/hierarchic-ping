
var synth;
var delay;

var img;
var brush;

function setup() {
  synth = new Tone.MonoSynth();
  delay = new Tone.FeedbackDelay().toMaster();
  synth.connect(delay);
      
  createCanvas(800, 600);
  
  img = loadImage("bg.jpg", function(img) {
    image(img, 0, 0);
  });

}

function draw() {
  //background(255);
  if (mouseIsPressed) {
    fill(255,mouseY/2,120,20);
    ellipse(mouseX, mouseY, 30, 30);  
  } else {
    fill(mouseX/2,120,255,20);
  }
    
}

function mouseClicked() {
	var scale = ["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"];
    var note = scale[(mouseX  % 12)];
    
	//var scale = ["C","E","F","A","C"];
    //var note = scale[(mouseX  % 5)];
    
    oct = Math.floor( mouseX / 100 );
    note = note + oct;
    console.log(note);
    synth.filterEnvelope.attack = Math.floor(mouseY/600);
    rel = ""+(600-mouseY)/1000;
    
    synth.triggerAttackRelease(note, rel);
    fill(mouseY%255,255,200,150);
    ellipse(mouseX, mouseY, 80, 80);
    stroke(0,0,0,100);
    fill(0,0,0);
    textSize(25);
	text(note, mouseX+10, mouseY);

}

