/*
----------------------------------------------------------------

----------------------------------------------------------------
*/


let ParticleSystem = function(tempColumns, tempInitialVel, tempCor, tempIndex, tempPg, tempW, tempH, layer) {
    this.particles = [];

    this.loc = createVector(0.0, -4.0);
    this.vel = createVector(0.0, 0.0);
    this.acc = createVector(0.0, 0.0);
    
    this.lifespan = 160.0;
    
    this.columns = tempColumns;
    this.initialVel = tempInitialVel;
    this.cor = tempCor;
    
    this.stepToMiss = 2;
    this.index = tempIndex;
    this.intervalCells = random(0, 5);
    
    this.finalPg = tempPg;
    this.w = tempW;
    this.h = tempH;
    
    this.stepSize = this.w/this.columns;
    this.layer = layer;
};


ParticleSystem.prototype.update = function() {
    this.lifespan -= 2.0;
    
    
    let len = this.particles.length;

    for (let i = len - 1; i >= 0; i--) {
        let particle = this.particles[i];
        particle.update();
        particle.display();

        if (particle.isDead()) {
            this.particles.splice(i, 1);
        }
        
    }
}

ParticleSystem.prototype.isDead = function () {
    if (this.lifespan <= 0.0) {
        return true;
    } else {
        return false;
    }
}


ParticleSystem.prototype.force = function () {
    this.cent = createVector(0.0, this.h);
    this.p = p5.Vector.sub(this.cent, this.loc);
    
    this.p.normalize();
    this.p.mult(this.initialVel);
    if(t==1){
        this.applyForce(this.p);
    }
}



ParticleSystem.prototype.applyForce = function(f) {
    this.acc.add(f);
}


ParticleSystem.prototype.nu = function() {
    this.vel.add(this.acc);
    this.loc.add(this.vel);
    
    this.acc.mult(0);
    this.vel.limit(2);
    this.vel.mult(0.99);
    
    if(t%this.stepToMiss == 0 && this.loc.y<this.h){
        this.particles.push(new Particle(20, this.loc.y, this.columns, this.cor, this.index, this.intervalCells, this.finalPg, this.w, this.h, this.layer));
    }
    

    
}
