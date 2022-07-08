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
    this.finalPg.fill(color(this.cor));
    this.finalPg.noStroke();


    //for(let x=this.step/2; x<this.w-this.step/2+2; x+=this.step){
    for(let x=0; x<this.columns; x++){

        let finalX = floor(map(x, 0, this.columns-1, this.step/2, this.w-this.step/2+1));//x * int(this.step)+1;//floor(map(x, 0, this.columns-1, this.step/2, this.w-this.step/2));

        //if 2 columns
        if(x == 0){
            this.begin = -this.size-1;
            this.end = this.size;
        } else if(x == this.columns-1){
            this.begin = -this.size;
            this.end = this.size+1;
        }else{
            this.begin = -this.size;
            this.end = this.size;
        }

        

        for(let i=this.begin; i<this.end; i++){
            let index = (int(finalX) + int(i) + int(this.loc.y) * this.w)*4;

            finalImage.pixels[index] = int(red(color(this.cor)));
            finalImage.pixels[index+1] = int(green(color(this.cor)));
            finalImage.pixels[index+2] = int(blue(color(this.cor)));
            finalImage.pixels[index+3] = 255;
        }

    }

    //console.log(this.columns);
    this.finalPg.pop();
}
