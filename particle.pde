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
  int index;
  float intervalCells;

  PGraphics finalPg;

  Particle(float x, float y, float tempColumns, color tempCor, int tempIndex, float tempIntervalCells, PGraphics tempPg) {

    location = new PVector(0, y);
    velocity = new PVector(0, 0);
    acceleration = new PVector(0, 0);

    ///number of fragments
    columns = tempColumns;
    cor = tempCor;

    killingTime = 2;
    index = tempIndex;
    intervalCells = tempIntervalCells;

    finalPg = tempPg;
    step = (finalPg.width-1)/columns;
    size = step/2-1;//random(2, step-2);
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


    float count = 0;
    for (float x=step/2; x<finalPg.width-step/2+2; x+=step) {
      count++;
      if (count==1) {
        finalPg.line(location.x+x-size-1, location.y, location.x+x+size, location.y);
      } else if (count==columns) {
        finalPg.line(location.x+x-size, location.y, location.x+x+size+1, location.y);
      }else{
        finalPg.line(location.x+x-size, location.y, location.x+x+size, location.y);
      }
    }



    //for (float x=0; x<finalPg.width; x+=step) {
    //  float show = abs(sin(radians(index*10+location.y*10)));
    //  float r = random(1);

    //  if(r<0.0001){
    //    x+=2;
    //  }

    //  if(finalPg == pg2){
    //    if(show > 0){
    //    finalPg.line(location.x+x, location.y, location.x+x+(step-2), location.y);
    //    }
    //  }else{
    //    finalPg.line(location.x+x, location.y, location.x+x+(step-2), location.y);
    //  }
    //}

    finalPg.popMatrix();
  }
}
