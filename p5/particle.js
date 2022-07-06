/*
----------------------------------------------------------------

----------------------------------------------------------------
*/


let Particle = function (x, y, tempColumns, tempCor, tempIndex, tempIntervalCells, tempPg, tempW, tempH, systemIndex, density) {
    this.loc = createVector(0, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.density = density;

    this.columns = tempColumns;
    this.cor = tempCor;

    this.killingTime = 2.0;
    this.lifespan = 180.0;
    this.index = tempIndex;
    this.intervalCells = tempIntervalCells;

    this.finalPg = tempPg;
    this.w = tempW;
    this.h = tempH;
    
    if(systemIndex == 1){
        this.step = (this.w)/this.columns;
        this.size = this.step/2-1;
    }else{
        this.step = (sizeCx)/this.columns;
        this.size = this.step/2-1;
    }
    
    this.densityMult = map(density, 8, 16, 2, 1);
    this.theSysIndex = systemIndex;
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
    
    
    this.finalPg.strokeWeight(this.densityMult);




    this.count = 0;
    
    if(this.theSysIndex == 1){
        for(let x=this.step/2; x<this.w-this.step/2+2; x+=this.step){
            this.count++;
            if(this.count==1){
                this.finalPg.line(this.loc.x+x-this.size-1, this.loc.y, this.loc.x+x+this.size, this.loc.y);
                //this.finalPg.rect(this.loc.x+x-this.step/2, this.loc.y, this.size*2, 1);
            } else if(this.count==this.columns){
                this.finalPg.line(this.loc.x+x-this.size, this.loc.y, this.loc.x+x+this.size+1, this.loc.y);
                //this.finalPg.rect(this.loc.x+x-this.step/2, this.loc.y, this.size*2+1, 1);
            } else {
                this.finalPg.line(this.loc.x+x-this.size, this.loc.y, this.loc.x+x+this.size, this.loc.y);
                //this.finalPg.rect(this.loc.x+x-this.step/2, this.loc.y, this.size*2, 1);
            }
        }
    }else{
        this.finalPg.translate(0, 0, 3);
        for(let x=this.step/2+this.w/2-sizeCx/2; x<this.w/2+sizeCx/2-this.step/2+1; x+=this.step){
            this.count++;
            if(this.count==1){
                this.finalPg.line(this.loc.x+x-this.size, this.loc.y, this.loc.x+x+this.size, this.loc.y);
                //this.finalPg.rect(this.loc.x+x-this.step/2, this.loc.y, this.size*2, 1);
            } else if(this.count==this.columns){
                this.finalPg.line(this.loc.x+x-this.size, this.loc.y, this.loc.x+x+this.size, this.loc.y);
                //this.finalPg.rect(this.loc.x+x-this.step/2, this.loc.y, this.size*2+1, 1);
            } else {
                this.finalPg.line(this.loc.x+x-this.size, this.loc.y, this.loc.x+x+this.size, this.loc.y);
                //this.finalPg.rect(this.loc.x+x-this.step/2, this.loc.y, this.size*2, 1);
            }
        }
    }

    this.finalPg.pop();
}

