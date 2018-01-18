
var synth;
var delay;

var img;
var sizer = 0.8;
var droppers = [];

class Dropper {
    constructor() {
    	this.x = mouseX;
    	this.y = mouseY;
    	this.dx = 0;
    	this.dy = 5;    	
    	this.live = true;
    }
    
    draw() {
    	this.x = this.x+this.dx;
    	this.y = this.y+this.dy;
    	if (this.y > height) { this.live = false; }
    	var brush = img.get(this.x,this.y,100,100);
        image(brush, this.x, this.y, 100*sizer,100*sizer);
        console.log(this.y);
    }
}

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
    //ellipse(mouseX, mouseY, 30, 30);  
    
  } else {
    //fill(mouseX/2,120,255,20);
  }

  droppers = droppers.filter(d => d.live != false);

  for (let d of droppers) {
  	d.draw();
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
    //ellipse(mouseX, mouseY, 80, 80);
    stroke(0,0,0,100);
    fill(0,0,0);
    textSize(25);
	text(note, mouseX+10, mouseY);
	
	droppers.push(new Dropper());
	console.log(droppers);
}

function mouseWheel(event) {
  console.log(event.delta);
  if (event.delta == -3) { sizer = sizer * 0.9; }
  if (event.delta == 3) { sizer = sizer * 1.1;}
  return false;
}

