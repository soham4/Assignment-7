
let classifier;
let imageModelURL = 'https://teachablemachine.withgoogle.com/models/6XacyF-1o/';
var theblur; 
var a = 0.1;
var b = 1.0-a;

let video;
let flippedVideo;
let label = "";

function preload() {
  classifier = ml5.imageClassifier(imageModelURL + 'model.json');
}

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();
  theblur = createImage(640, 480);

  flippedVideo = ml5.flipImage(video)
  classifyVideo();
}

function draw() {
  background(255);
  // Draw the video
  videoimg=flippedVideo.get();
  if(label==='normal'){
    blurr();
    tint(255, 255, 255);
  }
  if(label==='specs'){
    sepia();

  }
  if(label==='phone'){
    filter2();
  }
  if(label==='good'){
    filter1();
  }
  
}

function classifyVideo() {
  flippedVideo = ml5.flipImage(video)
  classifier.classify(flippedVideo, gotResult);
}

function gotResult(error, results) {
  if (error) {
    console.error(error);
    return;
  }
  label = results[0].label;
  classifyVideo();
}


function sepia(){
  videoimg.loadPixels();
  for (var y = 0; y < height; y++) {
        for (var x = 0; x < width; x++) {
          var index = (x + y * width)*4;
        
          let r = videoimg.pixels[index+0];
          let g = videoimg.pixels[index+1];
          let b = videoimg.pixels[index+2];
          let a = videoimg.pixels[index+3];   
          
          let avg = (r + g + b) / 3;
          var tr = (r * 0.393) + (g * 0.769) + (b * 0.189);

          var tg = (r * 0.349) + (g * 0.686) + (b * 0.168);

          var tb = (r * 0.272) + (g * 0.534) + (b * 0.131);
          
          videoimg.pixels[index+0] = tr;
          videoimg.pixels[index+1] = tg;
          videoimg.pixels[index+2] = tb;
          videoimg.pixels[index+3] = 255;  
        }
      }
      videoimg.updatePixels();
  image(videoimg, 0, 0);
}
function blurr() {
			videoimg.loadPixels();
			theblur.loadPixels();
			
			for(var i = 0; i < theblur.pixels.length;i+=4)
			{
				theblur.pixels[i] = a*videoimg.pixels[i] + b*theblur.pixels[i];
				theblur.pixels[i+1] = a*videoimg.pixels[i+1] + b*theblur.pixels[i+1];
				theblur.pixels[i+2] = a*videoimg.pixels[i+2] + b*theblur.pixels[i+2];
				theblur.pixels[i+3] = videoimg.pixels[i+3];
			}
			theblur.updatePixels();
			image(theblur, 0, 0, width, height);
	}
function filter1() { 
    videoimg.loadPixels()
    for (var y = 0; y < height; y++) {
        for (var x = 0; x < width; x++) {
            var index = (x + y * width) * 4;

            let r = videoimg.pixels[index + 0];
            let g = videoimg.pixels[index + 1];
            let b = videoimg.pixels[index + 2];
            let a = videoimg.pixels[index + 3];
          let c= color(r, g, b, a);
          let bright= brightness(c);
          if(bright<=40){
            videoimg.pixels[index + 0] = r*4;
            videoimg.pixels[index + 1] = g*0;
            videoimg.pixels[index + 2] = b*0.2;
          }
          if(bright>40 && bright <60){
            videoimg.pixels[index + 0] = r*4;
            videoimg.pixels[index + 1] = g;
            videoimg.pixels[index + 2] = b*0.2;
          }
          if(bright>=60){
            videoimg.pixels[index + 0] = r*4;
            videoimg.pixels[index + 1] = g*3.5;
            videoimg.pixels[index + 2] = b*0.2;
          }
           
        }
    }

    videoimg.updatePixels()
  image(videoimg, 0, 0, width, height);
}
function filter2() { 
    videoimg.loadPixels()
    for (var y = 0; y < height; y++) {
        for (var x = 0; x < width; x++) {
            var index = (x + y * width) * 4;

            let r = videoimg.pixels[index + 0];
            let g = videoimg.pixels[index + 1];
            let b = videoimg.pixels[index + 2];
            let r1 = videoimg.pixels[index + 8];
            let g1 = videoimg.pixels[index + 9];
            let b1 = videoimg.pixels[index + 10];
           let avg1=(r+g1)/2;
          let avg2=(g+b1)/2;
          let avg3=(b+r1)/2;
            videoimg.pixels[index + 4] = avg1;
            videoimg.pixels[index + 5] = avg2;
            videoimg.pixels[index + 6] = avg3;
           
        }
    }

    videoimg.updatePixels()
  image(videoimg, 0, 0, width, height);
}
