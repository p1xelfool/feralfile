/*
----------------------------------------------------------------

----------------------------------------------------------------
*/


let Particle = function (x, y, tempColumns, tempCor, tempIndex, tempIntervalCells, tempPg, tempW, tempH, layer) {
    this.loc = createVector(0, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);

    this.columns = tempColumns;
    this.cor = tempCor;

    this.killingTime = 2.0;
    this.lifespan = 380.0;
    this.index = tempIndex;
    this.intervalCells = tempIntervalCells;

    this.finalPg = tempPg;
    this.w = tempW;
    this.h = tempH;

    this.step = (this.w)/this.columns;
    this.size = this.step/2-1;
    this.layer = layer;

    this.rrr = int(red(color(tempCor)));
    this.ggg = int(green(color(tempCor)));
    this.bbb = int(blue(color(tempCor)));
    
    this.randGlitchX = floor(random(2,4));
    this.randGlitchY = floor(random(1,2));
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


    for(let x=0; x<this.columns; x++){

        let finalX = x * int(this.step)+1;//floor(map(x, 0, this.columns-1, this.step/2, this.w-this.step/2));

        //if 2 columns
        if(x == 0){
            this.begin = -1;
            this.end = this.size*2;
        } else if(x == this.columns-1){
            this.begin = 0;
            this.end = this.size*2+3;
        }else{
            this.begin = 0;
            this.end = this.size*2;
        }

        //if 3 or 5 columns
        if(this.columns==3 || this.columns==5){
            if(x == this.columns-1){
                this.begin = 0;
                this.end = this.size*2+5;
            }
        }

        //if 6 columns
        if(this.columns==6){
            finalX = x * int(this.step)+3;

            if(x == this.columns-1){
                this.begin = 0;
                this.end = this.size*2+4;
            } else if(x == 0){
                this.begin = -3;
                this.end = this.size*2;
            } else {
                this.begin = 0;
                this.end = this.size*2;
            }
        }


        for(let i=this.begin; i<this.end; i++){
            let xx = int(finalX) + int(i);
            let yy = int(this.loc.y);
            
            //GLITCH AFTER 120 FRAMES
            if(t==120){
                this.randGlitchX = floor(random(1,4));
                this.randGlitchY = floor(random(1,4));
            }
            
            let index = int((xx + yy * this.w)*4);
            let index2 = (xx+1 + yy+3 * this.w)*4;
            let index3 = (xx + yy+10 * this.w)*4;
            let index4 = (xx+this.randGlitchX+10 + yy+this.randGlitchY * this.w)*4;
            
            
            

            //DEFINE ON A TEMP ARRAY
            if(this.lifespan>0){
            if((xx<finalImage.width/2-sizeCx/2-2 || xx>finalImage.width/2+sizeCx/2+1 || yy<finalImage.height/2-sizeCy/2 || yy>finalImage.height/2+sizeCy/2) && this.layer == 1){
                tempPixels[index] = this.rrr;
                tempPixels[index+1] = this.ggg;
                tempPixels[index+2] = this.bbb;
                tempPixels[index+3] = 255;
            }else if((xx>finalImage2.width/2-sizeCx/2-2 && xx<finalImage2.width/2+sizeCx/2+1 && yy>finalImage2.height/2-sizeCy/2 && yy<finalImage2.height/2+sizeCy/2) && this.layer == 2){
                tempPixels2[index] = this.rrr;
                tempPixels2[index+1] = this.ggg;
                tempPixels2[index+2] = this.bbb;
                tempPixels2[index+3] = 255;
                tempPixels2[index2] = this.rrr;
                tempPixels2[index2+1] = this.ggg;
                tempPixels2[index2+2] = this.bbb;
                tempPixels2[index2+3] = 255;
                tempPixels2[index4] = this.rrr;
                tempPixels2[index4+1] = this.ggg;
                tempPixels2[index4+2] = this.bbb;
                tempPixels2[index4+3] = 255;
            }
            }else{
                tempPixels[index] = 0;
                tempPixels[index+1] = 0;
                tempPixels[index+2] = 0;
                tempPixels[index+3] = 0;
                tempPixels2[index] = 0;
                tempPixels2[index+1] = 0;
                tempPixels2[index+2] = 0;
                tempPixels2[index+3] = 0;
                tempPixels2[index2] = 0;
                tempPixels2[index2+1] = 0;
                tempPixels2[index2+2] = 0;
                tempPixels2[index2+3] = 0;
                tempPixels2[index4] = 0;
                tempPixels2[index4+1] = 0;
                tempPixels2[index4+2] = 0;
                tempPixels2[index4+3] = 0;
            }


        }

    }
}
