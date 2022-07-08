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

let finalImage;

/////RESOLUTION
let r1, r2;
let tex;
let canvas;

function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    frameRate(30);

    t = 0.0;
    frameCount = 0;
    seed = floor(random(1000000));
    randomSeed(seed);
    noCursor();
    noiseSeed(4);
    strokeWeight(1.01);

    /////RESOLUTION

//    if(random(1)<0.5){
//        r1 = 10;
//        r2 = 20;
//    }else{
//        r1 = 20;
//        r2 = 10;
//    }
    
    r1 = 10;
    r2 = 20;

    ///START SYSTEM
    runners = [];

    ///PG1
    numSystems = floor(random(1,5));
    let pgX = int(innerWidth/r1/2*2+1);
    let pgY = int(innerHeight/r1/2*2+1);
    pg = createGraphics(pgX, pgY);
    //pg.pixelDensity(1);
    //pg.noSmooth();

    ///PG2
    numSystems2 = floor(random(2,5));
    pg2 = createGraphics(innerWidth/r2, innerHeight/r2);
    //pg2.pixelDensity(1);
    //pg2.noSmooth();

    ///PG3
//    pg3 = createGraphics(innerWidth/r2, innerHeight/r2);
    //pg3.pixelDensity(1);
    //pg3.noSmooth();

    canvas.imageSmoothingEnabled = false;
    p5.disableFriendlyErrors = true;

    //noSmooth();
//    pg.strokeWeight(1.01);
//    pg2.strokeWeight(1.01);
//    pg3.strokeWeight(1.01);

    //pixelDensity(1);
    //noSmooth();

    ////COLOR QUAD
    if(random(10)<9){
        colorQuads = palette[floor(map(random(1), 1, 0, 0, palette.length))];
    }else{
        colorQuads = '#000000';
    }

    noSmooth();

    ///RANDSHAPES
    randShapes = random(10);
    
    let fIx = int(innerWidth/r1/2*2+1);
    let fIy = int(innerHeight/r1/2*2+1);
    //FINALIMAGE
    finalImage = createImage(fIx, fIy);
}

function draw() {
    background(0, 0, 0);    
    finalImage.loadPixels();
    
    ///MAKE ALL ALPHAS 100%
    

    
    pgShow();

    finalImage.updatePixels();

    //pg2.mask(pg3);
    //( imageClone = pg2 ).mask( pg3 );
//    finalImage.loadPixels();
//    for(let x=0; x<finalImage.width; x++){
//        for(let y=0; y<finalImage.height; y++){
//            let index = x + y * finalImage.width;
////            finalImage.pixels[index] = 255;
////            finalImage.pixels[index+1] = 0;
////            finalImage.pixels[index+2] = 0;
//            finalImage.set(x, y, color(255, 0, 0));
//        }
//    }
//    
//    finalImage.set(10, 10, color(255, 0, 0));
//    finalImage.updatePixels();
    

    //image(pg, 0, 0, innerWidth, innerHeight);
    image(finalImage, 0, 0, innerWidth, innerHeight);
    
    ////NEAREST NEIGHBOR
//    tex = canvas.getTexture(finalImage);
//    tex.setInterpolation(NEAREST, NEAREST); 

    
 
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
            //randomSeed(1);
            colorPicker = floor(map(random(1), 0, 1, 0, palette.length));
            let finalCol = color(palette[colorPicker]);
            //randomSeed(seed);
            runners.push(new ParticleSystem(floor(random(3, 10)), random(2.5,5), finalCol, i, pg, pg.width, pg.height));
        }
    }
    randomSeed(seed);
//        if(t==1){
//        for(let i=0; i<numSystems2; i++){
//            colorPicker2 = floor(map(random(1), 0, 1, 0, palette.length));
//            let finalCol2 = color(palette[colorPicker2]);
//            runners.push(new ParticleSystem(floor(random(2,10)), random(2,5), finalCol2, i, pg2, pg2.width, pg2.height));
//        }
//    }
    
    
    pg.push();
    pg2.push();
    
//    pg.translate(-pg.width/2, -pg.height/2, 1);
//    pg2.translate(-pg2.width/2, -pg2.height/2, 3);
    
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
        sizeCx = p.stepSize;
        sizeCy = r1*4;
    
    pg2.pop();
    pg2.rectMode(CORNER);
}






