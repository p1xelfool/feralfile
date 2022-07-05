/*
----------------------------------------------------------------

----------------------------------------------------------------
*/


let Particle = function (x, y, tempColumns, tempCor, tempIndex, tempIntervalCells, tempPg, tempW, tempH) {
    this.loc = createVector(0, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    
    this.columns = tempColumns;
    this.cor = tempCor;

    this.killingTime = 2.0;
    this.lifespan = 180.0;
    this.index = tempIndex;
    this.intervalCells = tempIntervalCells;
    
    this.finalPg = tempPg;
    this.w = tempW;
    this.h = tempH;
    
    this.step = (this.w)/this.columns;
    this.size = this.step/2-1;
}


Particle.prototype.update = function() {

    this.sx = 0.0;
    this.sy = 0.0;


    this.acc = createVector(this.sx,this.sy);
    this.vel.add(this.acc);
    this.loc.add(this.vel);

    this.vel.limit(0.2);
    this.acc.mult(0);
    this.vel.mult(0.95);

    this.lifespan -= this.killingTime;
}


Particle.prototype.isDead = function () {
    if (this.lifespan <= 0.0) {
        return true;
    } else {
        return false;
    }
}


Particle.prototype.applyForce = function(f) {
    this.acc.add(f);
}


Particle.prototype.display = function() {
    this.finalPg.push();
    this.finalPg.stroke(color(this.cor));
    this.finalPg.noFill();
    
    
    
    
    
    this.count = 0;
    for(let x=this.step/2; x<this.w-this.step/2+2; x+=this.step){
        if(this.count==1){
                this.finalPg.line(this.loc.x+x-this.size-1, this.loc.y, this.loc.x+x+this.size, this.loc.y);
           } else if(this.count==this.columns){
                this.finalPg.line(this.loc.x+x-this.size, this.loc.y, this.loc.x+x+this.size+1, this.loc.y);
           } else {
               this.finalPg.line(this.loc.x+x-this.size, this.loc.y, this.loc.x+x+this.size, this.loc.y);
           }
    }
    
    this.finalPg.pop();
}

