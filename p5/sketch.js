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
let palette = ['#0000FF', '#FF0000', '#006200', '#CBFF00', '#00FF00', '#5d5d5d', '#772ABC'];
let palette1, palette2;

let seed;
let colorPicker, colorPicker2;
let numSystems, numSystems2;
let columnsRandom;

let sizeQuad;
let colorQuads;
let randShapes;
let sizeCx, sizeCy;

let finalImage, finalImage2, tempPixels, tempPixels2;

/////RESOLUTION
let r1, r2;
let tex;
let canvas;

/////SEEDS
let seeds = [24385, 19052, 926097];
let seedCount = 0;
let experimentalSeed = 1;


////PAUSE PLAY
let running = true;


function setup() {
    start(seeds[0]);
}

function draw() {
    ////IF NOT PAUSED
    if(running == true){
        
        ///////ROTATE THE SEED
        if(t>1 && t%140==0){
            ///ADDS TO SEED COUNT
            if(seedCount<2){
                seedCount++;
            }else{
                seedCount = 0;
            }

            start(seeds[int(seedCount)]);
        }


        background(0, 0, 0);
        pgShow();

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
        
        
        console.log(frameRate());
        

        ////NEAREST NEIGHBOR FOR P3d
        //    tex = canvas.getTexture(finalImage);
        //    tex.setInterpolation(NEAREST, NEAREST); 

        //console.log(frameRate());
    }
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
            runners.push(new ParticleSystem(floor(random(2,7)), random(3,5), palette1[i], i, pg, pg.width, pg.height, 1));
        }
    }

    if(t==1){
        for(let i=0; i<numSystems2; i++){
            runners.push(new ParticleSystem(floor(random(4,7)), random(1.5,2), palette2[i], i, pg2, pg2.width, pg2.height, 2));
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


//    MASK SIZE
    let p = runners[0];
    sizeCx = p.stepSize/2*columnsRandom;
    sizeCy = pg.height/2;


}

//function mouseClicked() {
//    experimentalSeed++;
//    start(experimentalSeed);
//}






function start(finalSeed){
    canvas = createCanvas(windowWidth, windowHeight);
    frameRate(30);

    t = 0.0;
    frameCount = 0;

    noCursor();
    noiseSeed(4);
    strokeWeight(1.01);
    //SEED
    seed = finalSeed;//floor(random(random(1000000)));
    randomSeed(seed);


    /////RESOLUTION

    //    if(random(1)<0.5){
    //        r1 = 10;
    //        r2 = 20;
    //    }else{
    //        r1 = 20;
    //        r2 = 10;
    //    }

    r1 = 10;
    r2 = 10;

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
    numSystems2 = floor(random(2,5));
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

    let fIx2 = int(2560/r2/2*2+1);
    let fIy2 = int(1290/r2/2*2+1);

    //FINALIMAGE AND TEMP ARRAY OF PIXELS
    finalImage = createImage(fIx, fIy);
    finalImage2 = createImage(fIx2, fIy2);

    tempPixels = [];
    tempPixels2 = [];
    pixelDensity(1);


    ////SEED FOR COLORS AND SYSTEMS
    //randomSeed(2);
    ///PALETTES
    palette1 = [];
    palette2 = [];


    for(let i=0; i<numSystems; i++){
        colorPicker = floor(map(random(1), 0, 1, 0, palette.length));
        let finalCol = color(palette[colorPicker]);
        palette1[i] = finalCol;
    }

    for(let i=0; i<numSystems2; i++){
        colorPicker = floor(map(random(1), 0, 1, 0, palette.length));
        let finalCol = color(palette[colorPicker]);
        palette2[i] = finalCol;
    }
    
    ////RANDOM NUM OF COLUMNS
    columnsRandom = floor(random(1, 5));
    
    
    
    console.log('systems: ' + numSystems);
    console.log('seed: ' + seed);
}





/////COMMANDS

function keyTyped() {
    
    ////PAUSE
    if (key === 'p') {
        running = !running;
    } else if(key === 's'){
        saveCanvas(nf(seed, 10, 0) + '.png');
    }
}











//    for(let x=0; x<mask.width; x++){
//        for(let y=0; y<mask.height; y++){
////            
//
////            
////            ////NUMBER OF COLS
//            for(let i=0; i<numColumns; i++){
//////                //POS COL
//                finalX = i * maskColSize + maskColSize/2;//floor(map(i, 0, numColumns, colSize/2, mask.width-colSize/2));
//////                
//////                
//                for(let kk=-10; kk<10; kk++){
//                            indexx = (finalX + kk + mask.height/2 * mask.width)*4;
//                            maskArray[indexx] = 255;
//                            maskArray[indexx+1] = 0;
//                            maskArray[indexx+2] = 0;
//                            maskArray[indexx+3] = 255;
//                }
//////                
//////                ////DRAW EACH COL
////////                for(let k=-wCol/2; k<wCol/2; k++){
////////                    for(let j=-hCol/2; j<hCol/2; j++){
////////                        
////////                        ////X is the positions of the column + the position of each pixel
//////////                        let xxx = int(finalX + k);
//////////                        let yyy = int(mask.height/2 + j);
//////////                         
//////////                        mask.set(xxx, int(mask.height/2), color(255,0,0));
//////////                        let index = int((xxx + yyy * mask.width)*4);
//////////                            mask.pixels[index] = 255;
//////////                            mask.pixels[index+1] = 0;
//////////                            mask.pixels[index+2] = 0;
//////////                            mask.pixels[index+3] = 255;
////////                        
////////                    }
////////                }
//////                
//            }
////            
////            
////            
//        }
//    }
//        
        
//    mask.loadPixels();
//        for(let i=0; i<maskArray.length; i++){
//            mask.pixels[i] = maskArray[i];
//        }
//    mask.updatePixels();
        
        
        
   //     image(mask, 0, 0, innerWidth, innerHeight);