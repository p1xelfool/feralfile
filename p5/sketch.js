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

let finalImage, finalImage2, tempPixels, tempPixels2;

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
    numSystems = floor(random(1,4));
    let pgX = int(2560/r1/2*2+1);
    let pgY = int(1290/r1/2*2+1);
    pg = createGraphics(pgX, pgY);
    pg.pixelDensity(1);
    //pg.noSmooth();

    ///PG2
    numSystems2 = floor(random(2,4));
    let pg2X = int(2560/r1/2*2+1);
    let pg2Y = int(1290/r1/2*2+1);
    pg2 = createGraphics(pg2X, pg2Y);
    //pg2.pixelDensity(1);
    //pg2.noSmooth();
    
    pg3 = createGraphics(pg2X, pg2Y);


    canvas.imageSmoothingEnabled = false;
    p5.disableFriendlyErrors = true;
    noSmooth();

    ////COLOR QUAD
    if(random(10)<9){
        colorQuads = palette[floor(map(random(1), 1, 0, 0, palette.length))];
    }else{
        colorQuads = '#000000';
    }

    ///RANDSHAPES
    randShapes = random(10);

    let fIx = int(2560/r1/2*2+1);
    let fIy = int(1290/r1/2*2+1);
    
    let fIx2 = int(2560/r1/2*2+1);
    let fIy2 = int(1290/r1/2*2+1);
    
    //FINALIMAGE AND TEMP ARRAY OF PIXELS
    finalImage = createImage(fIx, fIy);
    finalImage2 = createImage(fIx, fIy);
    
    tempPixels = [];
    tempPixels2 = [];
    pixelDensity(1);
}

function draw() {
    
    background(0, 0, 0);
    pgShow();
    
    ///MANIPULATE PIXELS ALL AT ONCE
    

    
    ///SECOND IMAGE
    finalImage.loadPixels();
    
        //////NON-UPSCALE
    for(let x=0; x<finalImage.width; x++){
        for(let y=0; y<finalImage.height; y++){
            let tempIndex = (x + y * finalImage.width)*4;
                
            //if((x<finalImage.width/2-sizeCx/2-2 || x>finalImage.width/2+sizeCx/2 || y<finalImage.height/2-sizeCy/2 || y>finalImage.height/2+sizeCy/2)){
                finalImage.pixels[tempIndex] = tempPixels[tempIndex];
                finalImage.pixels[tempIndex+1] = tempPixels[tempIndex+1];
                finalImage.pixels[tempIndex+2] = tempPixels[tempIndex+2];
                finalImage.pixels[tempIndex+3] = tempPixels[tempIndex+3];
            //}
                
            
        }
    }
    
    finalImage.updatePixels();
    
    
        ///SECOND IMAGE
    finalImage2.loadPixels();
    
        //////NON-UPSCALE
    for(let x=0; x<finalImage2.width; x++){
        for(let y=0; y<finalImage2.height; y++){
            let tempIndex = (x + y * finalImage2.width)*4;
                
            //if((x<finalImage.width/2-sizeCx/2-2 || x>finalImage.width/2+sizeCx/2 || y<finalImage.height/2-sizeCy/2 || y>finalImage.height/2+sizeCy/2)){
                finalImage2.pixels[tempIndex] = tempPixels2[tempIndex];
                finalImage2.pixels[tempIndex+1] = tempPixels2[tempIndex+1];
                finalImage2.pixels[tempIndex+2] = tempPixels2[tempIndex+2];
                finalImage2.pixels[tempIndex+3] = tempPixels2[tempIndex+3];
            //}
                
            
        }
    }
    
    finalImage2.updatePixels();
    
    image(finalImage, 0, 0, innerWidth, innerHeight);
    image(finalImage2, 0, 0, innerWidth, innerHeight);

    ////NEAREST NEIGHBOR FOR P3d
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
    pg.background(0);


    //SYSTEMS
    if(t==1){
        for(let i=0; i<numSystems; i++){
            colorPicker = floor(map(random(1), 0, 1, 0, palette.length));
            let finalCol = color(palette[colorPicker]);
            runners.push(new ParticleSystem(floor(random(2,7)), random(3,5), finalCol, i, pg, pg.width, pg.height, 1));
        }
    }

    if(t==1){
        for(let i=0; i<numSystems2; i++){
            colorPicker2 = floor(map(random(1), 0, 1, 0, palette.length));
            let finalCol2 = color(palette[colorPicker2]);
            runners.push(new ParticleSystem(floor(random(4,7)), random(1.5,3), finalCol2, i, pg2, pg2.width, pg2.height, 2));
        }
    }


    //RUN SYSTEMS
    for(let i=0; i<runners.length; i++){
        let p = runners[i];
        p.force();
        p.nu();
        p.update();
    }
    
    //IF DEAD
//    let len = runners.length;
//    for (let i = len - 1; i >= 0; i--) {
//        let r = runners[i];
//
//        if (r.isDead()) {
//            runners.splice(i, 1);
//        }
//        
//    }


    ////////////MASK BIG
    pg3.background(0);
    let p = runners[0];
    sizeCx = p.stepSize;
    sizeCy = pg.height/2;
    pg3.fill(255);
    pg3.noStroke();
    pg3.rectMode(CENTER);
    pg3.rect(pg3.width/2, pg3.height/2, sizeCx, sizeCy);
    

}

function mouseClicked() {
  // if you click you will see that
  // reset() resets the translate back to the initial state
  // of the Graphics object
  pg.reset();
}




