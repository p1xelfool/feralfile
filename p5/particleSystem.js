/*
----------------------------------------------------------------

----------------------------------------------------------------
*/


let ParticleSystem = function(tempColumns, tempInitialVel, tempCor, tempIndex, tempPg, tempW, tempH, systemIndex, density) {
    this.particles = [];
    this.finalPg = tempPg;
    this.w = tempW;
    this.h = tempH;
    this.iniY = 0.0;

    if(systemIndex == 1){
        this.iniY = -4.0;
        this.finalY = this.h;
    }else{
        this.iniY = this.h/2-sizeCy/2-5;
        this.finalY = this.h/2+sizeCy/2-1;
    }
    
    this.loc = createVector(0.0, this.iniY);
    this.vel = createVector(0.0, 0.0);
    this.acc = createVector(0.0, 0.0);

    this.lifespan = 360.0;

    this.columns = tempColumns;
    this.densityMult = map(density, 8, 16, 1, 2);
    this.initialVel = tempInitialVel*this.densityMult;
    this.cor = tempCor;

    this.stepToMiss = 2;
    this.index = tempIndex;
    this.intervalCells = random(0, 5);



    this.stepSize = this.w/this.columns;

    this.theSysIndex = systemIndex;
    this.density = density;
};


ParticleSystem.prototype.update = function() {
    this.lifespan -= 2.0;


    let len = this.particles.length;

    for (let i = len - 1; i >= 0; i--) {
        let particle = this.particles[i];
        particle.update();
        particle.display();

        //        if (particle.isDead()) {
        //            this.particles.splice(i, 1);
        //        }
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
    this.vel.limit(2.5);
    this.vel.mult(0.99);

    if(t%this.stepToMiss == 0 && this.loc.y<this.finalY){
        this.particles.push(new Particle(20, this.loc.y, this.columns, this.cor, this.index, this.intervalCells, this.finalPg, this.w, this.h, this.theSysIndex, this.density));
    }
}

