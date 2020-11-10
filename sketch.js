
let classifier;
// Model URL
let imageModelURL = 'https://teachablemachine.withgoogle.com/models/6XacyF-1o/';

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

  flippedVideo = ml5.flipImage(video)
  classifyVideo();
}

function draw() {
  background(255);
  // Draw the video
  videoimg=flippedVideo.get();
  if(label=='normal'){
    image(flippedVideo, 0, 0);
    tint(255, 255, 255);
  }
  if(label=='specs'){
    sepia();
  }
  if(label=='phone'){
    image(flippedVideo, 0, 0);
    tint(0, 255, 0);
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

/*function sepia(){
  flippedVideo.loadPixels();
  for (var y = 0; y < height; y++) {
        for (var x = 0; x < width; x++) {
          var index = (x + y * width)*4;
        
          let r = flippedVideo.pixels[index+0];
          let g = flippedVideo.pixels[index+1];
          let b = flippedVideo.pixels[index+2];
          let a = flippedVideo.pixels[index+3];   
          
          let avg = (r + g + b) / 3;
          var tr = (r * 0.393) + (g * 0.769) + (b * 0.189);

          var tg = (r * 0.349) + (g * 0.686) + (b * 0.168);

          var tb = (r * 0.272) + (g * 0.534) + (b * 0.131);
          
          flippedVideo.pixels[index+0] = tr;
          flippedVideo.pixels[index+1] = tg;
          flippedVideo.pixels[index+2] = tb;
          flippedVideo.pixels[index+3] = 255;  
        }
      }
      flippedVideo.updatePixels();
  image(flippedVideo, 0, 0);
}*/
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

