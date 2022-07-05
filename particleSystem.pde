//ITERATION: 4
//DATE: Jun 30th, 2022
//Multiple compositions


class particleSystem {
  ArrayList<Particle> particles;

  PVector location;
  PVector velocity;
  PVector acceleration;
  float lifespan = 360;

  float columns, stepSize;
  color cor;
  float initialVel;
  
  int stepToMiss;
  int index;
  float intervalCells;

  PGraphics finalPg;
  
  particleSystem(float tempColumns, float tempInitialVel, color tempCor, int tempIndex, PGraphics tempPg) {
    particles = new ArrayList<Particle>();

    acceleration = new PVector(0, 0, 0);
    location = new PVector(0, -4, 0);
    velocity = new PVector(0, 0, 0);
    
    columns = tempColumns;
    initialVel = tempInitialVel;
    cor = tempCor;
    
    //define which step is not going to be added
    stepToMiss = 2;//floor(random(1, 3));
    
    //index of the system
    index = tempIndex;
    
    //gap between columns
    intervalCells = random(0, 5);
    
    //graphics
    finalPg = tempPg; 
    
    //size
    stepSize = finalPg.width/columns;
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
    PVector cent = new PVector(0, pg.height);
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

    velocity.add(acceleration);
    location.add(velocity);

    acceleration.mult(0);
    velocity.limit(2);
    velocity.mult(0.99);
    
    if(t%stepToMiss==0 && location.y<finalPg.height){
    particles.add(new Particle(20, location.y, columns, cor, index, intervalCells, finalPg));
    }

  }


}
