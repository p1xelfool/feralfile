//ITERATION: 3
//DATE: Jun 30th, 2022
//Multiple cells


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
//color[] palette = {
//  #0000FF, #FF0000, #006200, #CBFF00, #FF0000, #00FF00, #5d5d5d, #772ABC
//};

final int numColors = 8;
final IntList palette = new IntList(numColors);


int seed;
int colorPicker, colorPicker2, maxColors;
int numSystems, numSystems2;

PVector sizeQuad;
color colorQuads;


////////////PLACEMENT GRID
int col, rows;
float sizeX, sizeY;
boolean[][] randomCells;


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


  //pg2.mask(pg3);


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
  pg.clear();
  //}
  pg.noFill();

  pg2.beginDraw();
  pg2.colorMode(HSB, 360, 80, 80, 80);
  //pg2.background(colorQuads);
  pg2.clear();
  pg2.noFill();


  t++; 



  //ADD AT FRAME 1
  if (t==1) {
    //COLUMNS
    for (int x=0; x<col; x++) {
      for (int y=0; y<rows; y++) {


        //SYSTEMS
        if (randomCells[x][y] == false) {
          sizeX = pg.width/col;
          sizeY = pg.height/rows;

          float posX = x * sizeX + sizeX/2;
          float posY = y * sizeY;

          for (int i = 0; i<numSystems; i++) {
            colorPicker = floor(map(random(1), 0, 1, 0, maxColors));
            color finalCol = palette.get(colorPicker);
            runners.add(new particleSystem(posX, posY, floor(random(1, 4)), random(1.5, 3), finalCol, pg));
          }
        } else {

          sizeX = pg2.width/col;
          sizeY = pg2.height/rows;

          float posX = x * sizeX + sizeX/2;
          float posY = y * sizeY;

          for (int i = 0; i<numSystems; i++) {
            colorPicker = floor(map(random(1), 0, 1, 0, maxColors));
            color finalCol = palette.get(colorPicker);
            runners.add(new particleSystem(posX, posY, floor(random(1, 4)), random(1.5, 3), finalCol, pg2));
          }
        }
      }
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

  //pg3.beginDraw();
  //pg3.colorMode(HSB, 360, 80, 80, 80);
  //pg3.background(0, 100, 0);
  //pg3.rectMode(CENTER);

  //pg3.fill(360);
  //pg3.noStroke();

  //pg3.rect(pg3.width/2, pg3.height/2, sizeQuad.x, sizeQuad.y);

  //pg3.endDraw();
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
    r1 = 1; 
    r2 = 2;
  } else {
    r1 = 2; 
    r2 = 1;
  }




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


  // APPEND COLORS AND SHUFFLE IT
  palette.append(color(#0000FF));
  palette.append(color(#006200));
  palette.append(color(#CBFF00));
  palette.append(color(#FF0000));
  palette.append(color(#00FF00));
  palette.append(color(#5d5d5d));
  palette.append(color(#772ABC));
  palette.append(color(#0000FF));
  palette.shuffle(this);

  maxColors = floor(random(2, 5));


  ////PICK COLOR FOR QUAD BACKGROUNDS
  if (random(1)<9) {
    colorQuads = palette.get(floor(map(random(1), 1, 0, 0, numColors)));
  } else {
    colorQuads = #000000;
  }

  ///////GRID
  col = floor(random(1, 5));
  rows = floor(random(1, 1));


  randomCells = new boolean [col][rows];

  for (int x=0; x<col; x++) {
    for (int y=0; y<rows; y++) {
      float r = random(10);

      if (r<1) {
        randomCells[x][y] = true;
      } else {
        randomCells[x][y] = false;
      }
    }
  }
}
