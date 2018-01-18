
var synth;
var delay;

function setup() {
  synth = new Tone.MonoSynth();
  delay = new Tone.FeedbackDelay().toMaster();
  synth.connect(delay);
      
  createCanvas(800, 600);

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
    ellipse(mouseX, mouseY, 80, 80);
    fill(mouseY%255,255,200,100);
    textSize(25);
	text(note, mouseX+10, mouseY);

}

