/////DECIDIR SE VAI HAVER MOVIMENTO + NO CLEAR()



//timecount
float t = 0;
//image
PGraphics pg, pg2, pg3, pg4, pg5;
boolean recording = false;


//system
ArrayList<particleSystem> runners;
int numOfP = 100;

//movement
float c, yInc;

//color
float bright;

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


void settings() {
  size(1536, 864);
  //size(1920, 1080);
  noSmooth();
}

void setup() {
  reset();
}

void draw() {
  background(0);
  bright = 100;

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
  pg2.background(colorQuads);
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
      runners.add(new particleSystem(floor(random(2, 7))*3, random(1, 5), finalCol, i, pg));
    }
  }

  if (t==1) {
    for (int i = 0; i<numSystems2; i++) {
      colorPicker2 = floor(map(random(1), 1, 0, 0, palette.length));
      color finalCol2 = palette[colorPicker2];
      runners.add(new particleSystem(floor(random(2, 7))*3, random(1, 5), finalCol2, i, pg2));
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

  pg3.rect(pg3.width/2, pg3.height/2, sizeQuad.x, sizeQuad.y);

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


  //PG1
  numSystems = floor(random(2, 5));
  pg = createGraphics(192/1, 108/1); //1920x1080 * 15%
  strokeWeight(2);
  runners = new ArrayList<particleSystem>();
  pg.noSmooth();

  //PG2
  numSystems2 = floor(random(2, 5));
  pg2 = createGraphics(192/2, 108/2); //1920x1080 * 15%
  strokeWeight(2);
  pg2.noSmooth();

  //PG3 //MASK
  pg3 = createGraphics(192/2, 108/2); //1920x1080 * 15%
  strokeWeight(2);
  pg3.noSmooth();
  


  if (random(1)<9) {
    colorQuads = palette[floor(map(random(1), 1, 0, 0, palette.length))];
  } else {
    colorQuads = #000000;
  }

  sizeQuad = new PVector(random(pg3.width*0.1, pg3.width*0.8), random(pg3.height*0.2, pg3.height*0.8));




 
}
