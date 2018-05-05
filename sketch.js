// set image width and aspect ratio (height/width), pay special attention for portrait orientations
var imgWidth=600;
var imgAspectRatio=9/16;

// change debugging to 0 if you do not want to show the 'hot area'
var showHotArea=1;

//Don't change
var imageNumber;
var n,r;

//here you define the x, y, width, height of the two hot areas, where you interact with the movie.
var hotAreaLeftW=80, hotAreaLeftH=79, hotAreaLeftX=119, hotAreaLeftY=181;
var hotAreaRightW=58, hotAreaRightH=76, hotAreaRightX=330, hotAreaRightY=181;

//name your image sequence as 'image_1.jpg','image_2.jpg'...here you input the starting number and the ending number
var start=1;
var finish=29;
var nImages=finish-start;
var imgs = [];

//here you define the restoring speed. Bigger the number, faster it restores.
var s=2;

//things you don't change
function preload(){
 for (var i = start; i<(finish+1); i++) {
    imgs[i-start]=loadImage("img/image_"+str(i)+".jpg");
  } 
}

//things you don't change
function setup() {
  if (windowWidth>imgWidth) {
    createCanvas(imgWidth, imgWidth*9/16);
    r=1;
  }
  else {
    r=windowWidth/imgWidth;
    createCanvas(windowWidth, windowWidth*9/16);
  }
}

function draw() {
  var down=touchIsDown || mouseIsPressed;
  
  if (down === false){
    if (imageNumber>(s-1)){
    imageNumber-=s;
    }
    else {
    imageNumber=0;
    }
  }
  println(imageNumber);
  n=ceil(imageNumber);
  image(imgs[n], 0, 0,imgWidth*r,imgWidth*r*9/16);
  
  
  //the code below shows you where the hot area is. you can delete them in the final prototype, or put showHotArea=0 at the top of this code
  if (showHotArea==1){
    fill('rgba(100%,100%,100%,0.5)');
    rect(r*hotAreaLeftX,r*hotAreaLeftY,r*hotAreaLeftW,r*hotAreaLeftH);
    rect(r*hotAreaRightX,r*hotAreaRightY,r*hotAreaRightW,r*hotAreaRightH);
  }
}

//things you don't change
function touchMoved(){
  if ((touchX>r*hotAreaLeftX) && (touchX<r*(hotAreaLeftX+hotAreaLeftW)) && (touchY>r*hotAreaLeftY) && (touchY<r*(hotAreaLeftY+hotAreaLeftH)) 
  ){
  imageNumber=(nImages-1)*(r*(hotAreaLeftX+hotAreaLeftW)-(touchX))/(r*hotAreaLeftW);
  }
  if ((touchX>r*hotAreaRightX) && (touchX<r*(hotAreaRightX+hotAreaRightW)) && (touchY>r*hotAreaRightY) && (touchY<r*(hotAreaRightY+hotAreaRightH)) 
  ){
  imageNumber=(nImages-1)*((touchX)-r*hotAreaRightX)/(r*hotAreaRightW);
  }
  return false;
}

//things you don't change
function windowResized() {
  if (windowWidth>imgWidth) {
  resizeCanvas(imgWidth, imgWidth*9/16);
  r=1;
  }
  else {
    r=windowWidth/imgWidth;
    resizeCanvas(windowWidth, windowWidth*9/16);
  }
}
