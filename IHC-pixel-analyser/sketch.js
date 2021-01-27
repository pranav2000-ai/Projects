let img;
var c=0,f=0;
function preload() {
   img = loadImage('control/Control 8.png'); 
}
function setup() {
  createCanvas(400, 400);
  img.loadPixels();   
  for(i=0;i<img.width*img.height;i=i+4)
  {
    if(img.pixels[i]>=0 && img.pixels[i]<=240)
    {
      if(img.pixels[i+1]>=15 && img.pixels[i+1]<=133)
      {
        if(img.pixels[i+2]>=0 && img.pixels[i+2]<=85)
        {
          c++;
        }
      }
    }
    f++;
    //console.log(img.pixels[i]);
   //console.log(img.pixels[i+1]);
   //console.log(img.pixels[i+2]); 
  }
   console.log(c);
   console.log(f);
   var p=(c/f)*100;
   console.log(p);
   
   
}

function draw() {
  background(220);
  image(img,0,0);
}