//ITERATION: 3
//DATE: Jun 30th, 2022
//Multiple cells

class Particle {
  PVector location;
  PVector velocity;
  PVector acceleration;

  float lifespan = 180;
  float killingTime;
  float columns;
  float size;
  float step;

  //color
  color cor;
  float intervalCells;

  PGraphics finalPg;

  Particle(float x, float y, float tempColumns, color tempCor, float tempIntervalCells, PGraphics tempPg) {

    location = new PVector(x, y);
    velocity = new PVector(0, 0);
    acceleration = new PVector(0, 0);

    ///number of fragments
    columns = tempColumns;
    cor = tempCor;

    killingTime = 2;
    intervalCells = tempIntervalCells;

    finalPg = tempPg;
    sizeX = finalPg.width/col;
    sizeY = finalPg.height/rows;
    step = sizeX/columns-1;
    size = step/2-2;//random(2, step-2);
  }

  void update() {
    float dif = 0.1;
    float sx;
    float sy;

    if (frameCount<40 && finalPg == pg) {
      sy = 0;//map(noise(location.y+1000, location.x+1000), 0, 1, -0.001, 0.001);
      sx = 0;//map(noise(location.y, location.x), 0, 1, -0.001, 0.001);
    } else {
      sy = 0;
      sx = 0;
    }

    acceleration = new PVector(sx, sy);
    velocity.add(acceleration);
    location.add(velocity);

    velocity.limit(0.2);
    acceleration.mult(0);
    velocity.mult(0.95);

    lifespan -= killingTime;
  }

  boolean isDead() {
    if (lifespan <= 0) {
      return true;
    } else {
      return false;
    }
  }

  void applyForce(PVector _force) {
    PVector force = _force.copy();
    acceleration.add(force);
  }

  void display() {
    finalPg.pushMatrix();

    finalPg.stroke(cor);
    finalPg.noFill();
    sizeX = finalPg.width/col;
    sizeY = finalPg.height/rows;


    for (float x=0; x<columns; x++) {
      float pos = map(x, 0, columns, -sizeX/2+step/2, sizeX/2+step/2);

      if (columns==1) {
        finalPg.line(location.x+pos-size-2, location.y, location.x+pos+size+2, location.y);
      } else if (columns==2) {
        if (x==0) {
          finalPg.line(location.x+pos-size-2, location.y, location.x+pos+size+1, location.y);
        } else {
          finalPg.line(location.x+pos-size-1, location.y, location.x+pos+size+2, location.y);
        }
      } else {
        if (x==0) {
          finalPg.line(location.x+pos-size-2, location.y, location.x+pos+size+1, location.y);
        } else if (x==2) {
          finalPg.line(location.x+pos-size-1, location.y, location.x+pos+size+2, location.y);
        } else {
          finalPg.line(location.x+pos-size-1, location.y, location.x+pos+size+1, location.y);
        }
      }
    }



    finalPg.popMatrix();
  }
}
