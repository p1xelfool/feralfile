//ITERATION: 4
//DATE: Jun 30th, 2022
//Multiple compositions


//timecount
float t = 0;
//image
PGraphics pg, pg2, pg3;
boolean recording = false;


//system
ArrayList<particleSystem> runners;
int numOfP = 100;

//movement
float c;


///////////////////////////////////////////////////////////
/////   PALETTE
///////////////////////////////////////////////////////////
color[] palette = {
  #0000FF, #FF0000, #006200, #CBFF00, #FF0000, #00FF00, #5d5d5d, #772ABC
};

int seed;
int colorPicker, colorPicker2;
int numSystems, numSystems2;

PVector sizeQuad;
color colorQuads;
float randShapes;

void settings() {
  size(1536, 864);
  //size(192*2, 108*2);
  //fullScreen();
  noSmooth();
}

void setup() {
  reset();
}

void draw() {
  background(0);

  pg1();


  pg2.mask(pg3);


  image(pg, 0, 0, width, height);
  image(pg2, 0, 0, width, height);

  if (frameCount>240 && frameCount<=480 && recording == true) {
    saveFrame("####.png");
  }
}


void mousePressed() {
  reset();
}

void keyPressed() {
  saveFrame(seed + ".png");
}


void pg1() {
  //BEGIN
  pg.beginDraw();
  pg.colorMode(HSB, 360, 80, 80, 80);
  //if(frameCount>20 && frameCount>40){
  pg.background(0);
  //}
  pg.noFill();

  pg2.beginDraw();
  pg2.colorMode(HSB, 360, 80, 80, 80);
  //pg2.background(colorQuads);
  pg2.clear();
  pg2.noFill();


  t++; 

  //reset timer
  //if(t == 120){
  //  t=0;
  //}

  if (t==1) {
    for (int i = 0; i<numSystems; i++) {
      colorPicker = floor(map(random(1), 0, 1, 0, palette.length));
      color finalCol = palette[colorPicker];
      runners.add(new particleSystem(floor(random(2, 10)), random(1, 5), finalCol, i, pg));
    }
  }

  if (t==1) {
    for (int i = 0; i<numSystems2; i++) {
      colorPicker2 = floor(map(random(1), 1, 0, 0, palette.length));
      color finalCol2 = palette[colorPicker2];
      runners.add(new particleSystem(floor(random(2, 10)), random(1, 5), finalCol2, i, pg2));
    }
  }







  pg.pushMatrix();
  pg2.pushMatrix();

  for (particleSystem r : runners) {
    r.force();
    r.nu();
    r.run();
  }

  ////KILLING
  //  for (int i = runners.size()-1; i>=0; i--) {
  //    particleSystem r = runners.get(i);

  //    if (r.isDead()) {
  //      runners.remove(i);
  //    }
  //  }

  pg.popMatrix();
  pg.endDraw();

  pg2.popMatrix();
  pg2.endDraw();


  //////////////////////MASK PG2

  pg3.beginDraw();
  pg3.colorMode(HSB, 360, 80, 80, 80);
  pg3.background(0, 100, 0);
  pg3.rectMode(CENTER);

  pg3.fill(360);
  pg3.noStroke();




  //OPTION 1
  float interval = 2;  

  if (randShapes<5) {
        particleSystem r = runners.get(0);
    float sizeC = r.stepSize*2;
    pg3.rect(pg3.width/2, pg3.height/2, sizeC, pg3.height/4);
  } else {

    //OPTION 3
    particleSystem r = runners.get(0);
    float sizeC = r.stepSize;
    pg3.rect(pg3.width/2, pg3.height/2, sizeC, pg3.height/2);
  }

  pg3.pushMatrix();
  //pg3.translate(pg3.width/2, pg3.height/2, 0);
  //pg3.rotateZ(radians(t));
  //pg3.rotateY(radians(0));
  //pg3.rect(0, 0, 30, 30);
  
  pg3.popMatrix();



  pg3.endDraw();
}




void reset() {

  t=0;
  frameCount=0;
  seed = floor(random(1000000));
  //fullScreen(P3D);
  frameRate(20);
  randomSeed(seed);
  println(seed);
  noCursor();
  noiseSeed(4);
  



  ///RESOLUTION
  int r1, r2;

  if (random(1)<0.5) {
    r1 = 8; 
    r2 = 16;
  } else {
    r1 = 16; 
    r2 = 8;
  }

  //PG1
  numSystems = floor(random(1, 5));
  pg = createGraphics(width/r1, height/r1); //1920x1080 * 15%
  strokeWeight(2);
  runners = new ArrayList<particleSystem>();
  pg.noSmooth();

  //PG2
  numSystems2 = floor(random(2, 5));
  pg2 = createGraphics(width/r2, height/r2); //1920x1080 * 15%
  strokeWeight(2);
  pg2.noSmooth();

  //PG3 //MASK
  pg3 = createGraphics(width/r2, height/r2); //1920x1080 * 15%
  strokeWeight(2);
  pg3.noSmooth();



  if (random(1)<9) {
    colorQuads = palette[floor(map(random(1), 1, 0, 0, palette.length))];
  } else {
    colorQuads = #000000;
  }

  sizeQuad = new PVector(floor(random(pg3.width*0.1, pg3.width*0.4))*2, floor(random(pg3.height*0.1, pg3.height*0.4))*2);
  println("w: " + sizeQuad.x + "h: " + sizeQuad.y);

  randShapes = random(10);
  
  
  
      //CANCEL ANTIALIASING
  //hint(DISABLE_TEXTURE_MIPMAPS);
  //((PGraphicsOpenGL)g).textureSampling(3);
  //pg.noSmooth(); pg2.noSmooth(); pg3.noSmooth();
}
