//ITERATION: 3
//DATE: Jun 30th, 2022
//Multiple cells

class particleSystem {
  ArrayList<Particle> particles;

  float nX, nY, mapNX, mapNY;
  float rNoiseX, rNoiseY;

  PVector location;
  PVector velocity;
  PVector acceleration;
  float lifespan = 360;

  int gap = 1;
  float columns;
  color cor;
  float initialVel;
  
  int stepToMiss;
  float intervalCells;

  PGraphics finalPg;
  
  PVector gridPosition;
  
  particleSystem(float tempPosX, float tempPosY, float tempColumns, float tempInitialVel, color tempCor, PGraphics tempPg) {
    particles = new ArrayList<Particle>();

    float z = random(-15, 15);
    acceleration = new PVector(0, 0, 0);
    location = new PVector(tempPosX, tempPosY-3, 0);
    velocity = new PVector(0, 0, 0);
    gridPosition = new PVector(tempPosX, tempPosY, 0);
    
    columns = tempColumns;
    initialVel = tempInitialVel;
    cor = tempCor;
    
    //define which step is not going to be added
    stepToMiss = 2;//floor(random(2, 2));
    
    //gap between columns
    intervalCells = random(0, 5);
    
    //graphics
    finalPg = tempPg; 
    
    //size
  }

  void run() {
    lifespan -= 2;
    
    for (int i = particles.size()-1; i>=0; i--) {
      Particle p = particles.get(i);

      p.update();
      p.display();

      //if (p.isDead()) {
      //  particles.remove(i);
      //}
    }
  }

  boolean isDead() {
    if (lifespan <= 0) {
      return true;
    } else {
      return false;
    }
  }

  void force() {
    sizeX = finalPg.width/col;
    sizeY = finalPg.height/rows;
    PVector cent = new PVector(gridPosition.x, gridPosition.y+sizeY);
    PVector p = PVector.sub(cent, location);
    p.normalize();
    p.mult(initialVel);
    if (t==1) {
      applyForce(p);
    }
  }

  void applyForce(PVector _force) {
    PVector force = _force.copy();
    acceleration.add(force);
  }

  void nu() {
    sizeX = finalPg.width/col;
    sizeY = finalPg.height/rows;
    velocity.add(acceleration);
    location.add(velocity);

    acceleration.mult(0);
    velocity.limit(2);
    velocity.mult(0.99);
    
    if(t%stepToMiss==0 && location.y<gridPosition.y+sizeY){
    particles.add(new Particle(gridPosition.x, location.y, columns, cor, intervalCells, finalPg));
    }

  }

}
