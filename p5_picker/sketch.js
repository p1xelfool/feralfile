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

//CREATIVE MODE
let creativeMode = false;

//PALETTE
//let palette = ['#0000FF', '#FF0000', '#00FF00', '#000000'];
//let palette = ['#0000FF', '#FF0000', '#006200', '#CBFF00', '#00FF00', '#5d5d5d', '#772ABC'];


//YELLOW
//let palette = ['#CBFF00', '#0000FF'];
//let palette = ['#CBFF00', '#006200'];
//let palette = ['#CBFF00', '#FF0000'];
//let palette = ['#CBFF00', '#5d5d5d'];
//let palette = ['#CBFF00', '#772ABC'];

//PURPLE
//let palette = ['#772ABC', '#FF0000'];
//let palette = ['#772ABC', '#5d5d5d'];

//RED
//let palette = ['#FF0000', '#006200'];

//BLUE
//let palette = ['#0000FF', '#006200'];

//GREEN
//let palette = ['#00FF00', '#006200'];
//let palette = ['#00FF00', '#000000'];
//let palette = ['#FF0000', '#000000'];
//let palette = ['#CBFF00', '#000000'];
//let palette = ['#FFFFFF', '#000000'];

//let palette = ['#0000FF', '#000079'];
//let palette = ['#590000', '#FF0000'];

//let palette = ['#006200', '#CBFF00', '#FF0000'];
//let palette = ['#006200', '#CBFF00', '#0000FF'];


//let palette = ['#006200', '#CBFF00', '#FF0000', '#772ABC'];


///////FINAL
let palette = [
    ['#CBFF00', '#0000FF'],
    ['#CBFF00', '#006200'],
    ['#CBFF00', '#FF0000'],
    ['#CBFF00', '#5d5d5d'],
    ['#CBFF00', '#772ABC'],
    ['#772ABC', '#FF0000'],
    ['#772ABC', '#5d5d5d'],
    ['#FF0000', '#006200'],
    ['#0000FF', '#006200'],
    ['#00FF00', '#006200'],
    ['#00FF00', '#000000'],
    ['#FF0000', '#000000'],
    ['#CBFF00', '#000000'],
    ['#FFFFFF', '#000000'],
    ['#590000', '#FF0000'],
    ['#006200', '#CBFF00', '#FF0000'],
    ['#006200', '#CBFF00', '#0000FF'],
    ['#FF0000', '#5d5d5d', '#772ABC'],
    ['#FF0000', '#CBFF00', '#0000FF'],
    ['#5d5d5d', '#FF0000', '#772ABC'],
    ['#5d5d5d', '#0000FF', '#CBFF00'],
    ['#5d5d5d', '#00FF00', '#006200'],
    ['#FF0000', '#00FF00', '#0000FF', '#000000'],
    ['#006200', '#CBFF00', '#FF0000', '#772ABC'],
    ['#006200', '#CBFF00', '#FF0000', '#5d5d5d'],
    ['#006200', '#CBFF00', '#772ABC', '#5d5d5d'],
    ['#0000FF', '#FF0000', '#00FF00', '#000000'],
    ['#0000FF', '#006200', '#CBFF00', '#5d5d5d'],
    ['#0000FF', '#FF0000', '#006200', '#CBFF00', '#5d5d5d', '#772ABC'],
    ['#0000FF', '#FF0000', '#006200', '#CBFF00', '#5d5d5d', '#772ABC']];



let palette1, palette2;
let palettePicker;

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
//let seeds = [254, 509, 293]; // 1 DONE
//let seeds = [551, 14554, 54796]; // 2 DONE
//let seeds = [45426, 263395, 230]; // 3 DONE
//let seeds = [6, 103, 358]; // 4 DONE
//let seeds = [60, 44, 307]; // 5 DONE but 3rd could change
//let seeds = [251, 10, 155]; // 6 DONE
//let seeds = [261, 208, 108495]; // 7 DONE
//let seeds = [160, 41, 106]; // 8 DONE
//let seeds = [269, 728, 134]; // 9 DONE
//let seeds = [512, 114932, 755]; // 10 DONE
//let seeds = [23, 875, 31990]; // 11 DONE  but 3rd could change
//let seeds = [281, 795, 11]; // 12 DONE


let seeds = [
            [254, 509, 293], // 1 DONE
            [551, 14554, 54796], // 2 DONE
            [45426, 263395, 230], // 3 DONE
            [6, 103, 358], // 4 DONE
            [60, 44, 191], // 5 DONE
            [251, 10, 155], // 6 DONE
            [261, 208, 108495], // 7 DONE
            [160, 41, 106], // 8 DONE
            [269, 728, 134], // 9 DONE
            [512, 114932, 755], // 10 DONE
            [23, 610, 4203], // 11 DONE
            [281, 795, 11], //12 DONE
            [3784, 722, 327038], //13 DONE
            [304742, 101049, 2417], //14 DONE
            [285825, 627, 12012], //15  DONE
            [110, 2140, 401786], //16  DONE
            [313, 1775, 153380], //17  DONE
            [234387, 2841, 142], //18  DONE
            [863836, 99, 2893], //19  DONE
            [85889, 7946,  13007], //20  DONE
            [1722, 116562,  8312], //21  DONE
            [230275, 247673,  233], //22  DONE
            [547758, 27673, 4269], //23  DONE
            [475, 8012, 651], //24  DONE
            [454, 377, 4964], //24  DONE
            [676377, 1762, 332475], //26  DONE
            [110653, 661, 230505], //27  DONE
            [443, 104, 193], //28  DONE
            [36507, 1027, 82970], //29  DONE
            [203, 403, 570], //30  DONE
            [732, 867, 8555], //31  DONE
            [9188, 111, 3326], //32  DONE
            [5962, 744149, 10635] //32  DONE
            ]




//let seeds = [443, 104, 475 ]; // 12 DONE 

let seedCount = 0;
let seedIndex = 0;


////PAUSE PLAY
let running = true;




///CAPTURE
// Create a capturer that exports PNG images in a TAR file
var fps = 30;
var capturer = new CCapture({
    format: 'png',
    framerate: fps
});



function setup() {
    start(seeds[0][0]);
}

function draw() {
    //CAPTURE
//    if (t === 1) {
//        capturer.start();
//    }
//    if(t == 300){
//        capturer.stop();
//        capturer.save();
//    }


    ////IF NOT PAUSED
    if(running == true){

        ///////ROTATE THE SEED
        if(t>1 && t%300==0){
            ///ADDS TO SEED COUNT
            if(seedCount<2){
                seedCount++;
            }else{
                seedCount = 0;
            }

            start(seeds[seedIndex][int(seedCount)]);
        }


        background(0, 0, 0);
        pgShow();

        ///SECOND IMAGE
        finalImage.loadPixels();

        //////NON-UPSCALE
        for(let x=0; x<finalImage.width; x++){
            for(let y=0; y<finalImage.height; y++){
                let tempIndex = (x + y * finalImage.width)*4;

                //if(y%2==0){
                //if((x<finalImage.width/2-sizeCx/2-2 || x>finalImage.width/2+sizeCx/2 || y<finalImage.height/2-sizeCy/2 || y>finalImage.height/2+sizeCy/2)){
                finalImage.pixels[tempIndex] = tempPixels[tempIndex];
                finalImage.pixels[tempIndex+1] = tempPixels[tempIndex+1];
                finalImage.pixels[tempIndex+2] = tempPixels[tempIndex+2];
                finalImage.pixels[tempIndex+3] = tempPixels[tempIndex+3];
                //}
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
        imageMode(CENTER);
        image(finalImage, windowWidth/2, windowHeight/2, windowWidth / windowHeight > 1.98 ? windowWidth : windowHeight*1.98, windowWidth / windowHeight > 1.98 ? windowWidth * 0.50 : windowHeight);
        image(finalImage2, windowWidth/2, windowHeight/2, windowWidth / windowHeight > 1.98 ? windowWidth : windowHeight*1.98, windowWidth / windowHeight > 1.98 ? windowWidth * 0.50 : windowHeight);
        //image(finalImage2, windowWidth/2, windowHeight/2, windowWidth, windowWidth * 0.50);


        //console.log(frameRate());


        ////NEAREST NEIGHBOR FOR P3d
        //    tex = canvas.getTexture(finalImage);
        //    tex.setInterpolation(NEAREST, NEAREST); 

        //console.log(frameRate());
    } /////IF RUNNING

    /////CAPTURE
    capturer.capture(document.getElementById('defaultCanvas0'));
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
    //        let len = runners.length;
    //        for (let i = len - 1; i >= 0; i--) {
    //            let r = runners[i];
    //    
    //            if (r.isDead()) {
    //                runners.splice(i, 1);
    //            }
    //            
    //        }



    //    MASK SIZE
    let p = runners[0];
    sizeCx = p.stepSize/2*columnsRandom;
    sizeCy = pg.height/2;


}


function start(finalSeed){
    canvas = createCanvas(windowWidth, windowHeight);
    frameRate(30);

    t = 0.0;
    frameCount = 0;

    noCursor();
    noiseSeed(4);
    strokeWeight(1.01);
    //SEED
    seed = floor(random(random(12222,1222111)));//finalSeed;//floor(random(random(1000000)));
    
    if(creativeMode==true){
        randomSeed(seed);
    }else{
        randomSeed(finalSeed);
    }
    


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
    numSystems = floor(random(2,4));    
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

    palettePicker = floor(map(random(1), 0, 1, 0, palette.length));

    for(let i=0; i<numSystems; i++){
        colorPicker = floor(map(random(1), 0, 1, 0, palette[palettePicker].length));
        let finalCol = color(palette[palettePicker][colorPicker]);
        palette1[i] = finalCol;
    }

    for(let i=0; i<numSystems2; i++){
        colorPicker = floor(map(random(1), 0, 1, 0, palette[palettePicker].length));
        let finalCol = color(palette[palettePicker][colorPicker]);
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
        saveCanvas(palette[palettePicker][0] + '_' + nf(seed, 10, 0) + '.png');
    }
}


function keyPressed() {
  if (keyCode === RIGHT_ARROW) {
            if(seedIndex<seeds.length-1){
                seedIndex++;
            }else{
                seedIndex = 0;
            }
      seedCount = 0;
      start(seeds[seedIndex][seedCount]);
  }
 else if (keyCode === LEFT_ARROW) {
            if(seedIndex>0){
                seedIndex--;
            }else{
                seedIndex = seeds.length-1;
            }
      seedCount = 0;
      start(seeds[seedIndex][seedCount]);
  } else if(keyCode == DOWN_ARROW){
            if(seedCount<2){
                seedCount++;
            }else{
                seedCount = 0;
            }

            start(seeds[seedIndex][int(seedCount)]);
  } 
}