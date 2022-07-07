/*
----------------------------------------------------------------

----------------------------------------------------------------
*/

let t = 0.0;
let pg, pg2, pg3, pg4, imageClone;
let recording = false;
let pgW, pgH, pg2W, pg2H;

//SYSTEM
let runners = null;
let numOfP = 100.0;

//MOVEMENT
let c = 0.0;

//PALETTE
let palette = ['#0000FF', '#FF0000', '#006200', '#CBFF00', '#FF0000', '#00FF00', '#5d5d5d', '#772ABC'];

let seed;
let colorPicker, colorPicker2;
let numSystems, numSystems2;

let sizeQuad;
let colorQuads;
let randShapes;
let sizeCx, sizeCy;

    /////RESOLUTION
    let r1, r2;


function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);
    frameRate(30);
    
    t = 0.0;
    frameCount = 0;
    seed = floor(random(1000000));
    randomSeed(seed);
    noCursor();
    noiseSeed(4);
    strokeWeight(1.01);
    
    /////RESOLUTION
    
    if(random(1)<0.5){
        r1 = 8;
        r2 = 16;
    }else{
        r1 = 16;
        r2 = 8;
    }
    
    
    ///START SYSTEM
    runners = [];
    
    ///PG1
    numSystems = floor(random(1,5));
    pg = createGraphics(innerWidth/r1, innerHeight/r1, WEBGL);
    pg.pixelDensity(1);
    pg.noSmooth();
    
    ///PG2
    numSystems2 = floor(random(2,5));
    pg2 = createGraphics(innerWidth/r2, innerHeight/r2, WEBGL);
    pg2.pixelDensity(1);
    pg2.noSmooth();
    
    ///PG3
    pg3 = createGraphics(innerWidth/r2, innerHeight/r2, WEBGL);
    pg3.pixelDensity(1);
    pg3.noSmooth();
    
    canvas.imageSmoothingEnabled = false;
    this._renderer.getTexture(pg).setInterpolation(NEAREST, NEAREST);
    this._renderer.getTexture(pg2).setInterpolation(NEAREST, NEAREST);
    this._renderer.getTexture(pg3).setInterpolation(NEAREST, NEAREST);
    p5.disableFriendlyErrors = true;
    
    //noSmooth();
    pg.strokeWeight(1.01);
    pg2.strokeWeight(1.01);
    pg3.strokeWeight(1.01);
    
    pixelDensity(1);
    
    
    ////COLOR QUAD
    if(random(10)<9){
        colorQuads = palette[floor(map(random(1), 1, 0, 0, palette.length))];
    }else{
        colorQuads = '#000000';
    }
    


    ///RANDSHAPES
    randShapes = random(10);
}

function draw() {
    background(0, 0, 0);
    
    pgShow();

    //pg2.mask(pg3);
    //( imageClone = pg2 ).mask( pg3 );
    
    image(pg, -windowWidth/2, -windowHeight/2, windowWidth, windowHeight);
    
    if(r2 == 8){
        image(pg2, -sizeCx*r2/2-r2*2, -sizeCy*r2/2-r1/2, sizeCx*r2, sizeCy*r2, pg2.width/2-sizeCx/2-1, pg2.height/2-sizeCy/2-1, sizeCx, sizeCy);
    }else{
        image(pg2, -sizeCx*r2/2-r2/2, -sizeCy*r2/2-r1/2-1, sizeCx*r2, sizeCy*r2+2, pg2.width/2-sizeCx/2-1, pg2.height/2-sizeCy/2+1, sizeCx, sizeCy);
    }
    
    
    console.log(frameRate());
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}



function pgShow(){
    t++;
    
    //BEGIN
    pg.colorMode(HSB, 360, 80, 80, 80);
    //pg.background(0);
    pg.clear();
    pg.noFill();
    
    pg2.colorMode(HSB, 360, 80, 80, 80);
    pg2.background(0, 0, 0);
    pg2.noFill();
    
    //SYSTEMS
    if(t==1){
        for(let i=0; i<numSystems; i++){
            colorPicker = floor(map(random(1), 0, 1, 0, palette.length));
            let finalCol = color(palette[colorPicker]);
            runners.push(new ParticleSystem(floor(random(2,10)), random(2,5), finalCol, i, pg, pg.width, pg.height));
        }
    }
    
        if(t==1){
        for(let i=0; i<numSystems2; i++){
            colorPicker2 = floor(map(random(1), 0, 1, 0, palette.length));
            let finalCol2 = color(palette[colorPicker2]);
            runners.push(new ParticleSystem(floor(random(2,10)), random(2,5), finalCol2, i, pg2, pg2.width, pg2.height));
        }
    }
    
    
    pg.push();
    pg2.push();
    
    pg.translate(-pg.width/2, -pg.height/2, 1);
    pg2.translate(-pg2.width/2, -pg2.height/2, 3);
    
    for(let i=0; i<runners.length; i++){
        let p = runners[i];
        p.force();
        p.nu();
        p.update();
    }
    
    pg.pop();
    pg2.pop();
    

    
    ////////////MASK PG2
    
//    pg3.colorMode(HSB, 360, 80, 80, 80);
//    pg3.background(0, 100, 0);
//    pg2.rectMode(CENTER);
//    pg2.fill(0);
//    pg2.noStroke();
    //pg3.translate(-pg3.width/2, -pg3.height/2, 1);
    
    pg2.push();
    //OPTION 1
    let p = runners[0];
    //pg2.translate(-pg2.width/2, -pg2.height/2, 2);
//    if(randShapes<5){
//        sizeCx = p.stepSize*2;
//        sizeCy = pg2.height/4;
//        //pg2.rect(pg2.width/2, pg2.height/2, sizeCx, sizeCy);
//    } else {
        sizeCx = p.stepSize;
        sizeCy = r1*4;
        //pg2.rect(pg2.width/2, pg2.height/2, sizeCx, sizeCy);
    //}
    
    pg2.pop();
    pg2.rectMode(CORNER);
}






