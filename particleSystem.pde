class particleSystem {
  ArrayList<Particle> particles;

  float nX, nY, mapNX, mapNY;
  float rNoiseX, rNoiseY;

  PVector location;
  PVector velocity;
  PVector acceleration;

  int gap = 1;
  float columns;
  color cor;
  float initialVel;
  
  int stepToMiss;
  int index;
  float intervalCells;

  PGraphics finalPg;
  
  particleSystem(float tempColumns, float tempInitialVel, color tempCor, int tempIndex, PGraphics tempPg) {
    particles = new ArrayList<Particle>();

    float z = random(-15, 15);
    acceleration = new PVector(0, 0, 0);
    location = new PVector(0, -4, 0);
    velocity = new PVector(0, 0, 0);
    
    columns = tempColumns;
    initialVel = tempInitialVel;
    cor = tempCor;
    
    //define which step is not going to be added
    stepToMiss = floor(random(2, 2));
    
    //index of the system
    index = tempIndex;
    
    //gap between columns
    intervalCells = random(0, 5);
    
    //graphics
    finalPg = tempPg; 
  }

  void run() {
    for (int i = particles.size()-1; i>=0; i--) {
      Particle p = particles.get(i);

      p.update();
      p.display();

      //if (p.isDead()) {
      //  particles.remove(i);
      //}
    }
  }


  void force() {
    PVector cent = new PVector(0, pg.height);
    PVector p = PVector.sub(cent, location);
    p.normalize();
    p.mult(initialVel);
    if (frameCount==1) {
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
    
    if(frameCount%stepToMiss==0 && location.y<finalPg.height){
    particles.add(new Particle(20, location.y, columns, cor, index, intervalCells, finalPg));
    }

  }



  void edge() {
    if (location.x < 1) { 
      location.x = width - gap;
    }
    if (location.x > width - gap) { 
      location.x = 1;
    }
    if (location.y < 1) { 
      location.y = height - gap;
    }
    if (location.y > height - gap) { 
      location.y = 1;
    }
  }
}
