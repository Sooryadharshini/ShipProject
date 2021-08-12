var p5Inst = new p5(null, 'sketch');

window.preload = function () {
  initMobileControls(p5Inst);

  p5Inst._predefinedSpriteAnimations = {};
  p5Inst._pauseSpriteAnimationsByDefault = false;
  var animationListJSON = {"orderedKeys":[],"propsByKey":{}};
  var orderedKeys = animationListJSON.orderedKeys;
  var allAnimationsSingleFrame = false;
  orderedKeys.forEach(function (key) {
    var props = animationListJSON.propsByKey[key];
    var frameCount = allAnimationsSingleFrame ? 1 : props.frameCount;
    var image = loadImage(props.rootRelativePath, function () {
      var spriteSheet = loadSpriteSheet(
          image,
          props.frameSize.x,
          props.frameSize.y,
          frameCount
      );
      p5Inst._predefinedSpriteAnimations[props.name] = loadAnimation(spriteSheet);
      p5Inst._predefinedSpriteAnimations[props.name].looping = props.looping;
      p5Inst._predefinedSpriteAnimations[props.name].frameDelay = props.frameDelay;
    });
  });

  function wrappedExportedCode(stage) {
    if (stage === 'preload') {
      if (setup !== window.setup) {
        window.setup = setup;
      } else {
        return;
      }
    }
// -----

//create platform
var platform = createSprite(50, 200,100,200);
platform.shapeColor="lightblue";

//creating optical store
var opticalstore = createSprite(350, 200,100,200);
opticalstore.shapeColor="yellow";

//creating boundaries
var boundary1 = createSprite(200, 100,400,10);
var boundary2 = createSprite(200, 300,400,10);

//creating sam 
var sam = createSprite(50, 200,20,20);
sam.shapeColor="green";

//creating cars 
var car1 = createSprite(125, 125,20,20);
var car2 = createSprite(175, 275,20,20);
var car3 = createSprite(225, 125,20,20);
var car4 = createSprite(275, 275,20,20);
car1.shapeColor="red";
car2.shapeColor="red";
car3.shapeColor="red";
car4.shapeColor="red";

//assigning velocity 
car1.velocityY=-8;
car2.velocityY=8;
car3.velocityY=-8;
car4.velocityY=8;

//creating var to store score 
var score =0;

function draw() {
  background("white");
  
  //making cars to bounce off from boundaries
  car1.bounceOff(boundary1);
  car1.bounceOff(boundary2);
  car2.bounceOff(boundary1);
  car2.bounceOff(boundary2);
  car3.bounceOff(boundary1);
  car3.bounceOff(boundary2);
  car4.bounceOff(boundary1);
  car4.bounceOff(boundary2);
  
  //making the player move 
  if (keyDown("RIGHT_ARROW")) {
    sam.x=sam.x+3;
  }
  
  if (keyDown("LEFT_ARROW")) {
    sam.x=sam.x-3;
  }
  
  //bring sam to original position if toucing cars 
  if (sam.isTouching(car1)||sam.isTouching(car2)||sam.isTouching(car3)||sam.isTouching(car4)) {
    sam.x=50;
    sam.y=200;
    score=score+1;
  }
  
  fill("red");
  textSize(20);
  text("Accidents: "+score,250,50);
  
  
  drawSprites();
}

// -----
    try { window.draw = draw; } catch (e) {}
    switch (stage) {
      case 'preload':
        if (preload !== window.preload) { preload(); }
        break;
      case 'setup':
        if (setup !== window.setup) { setup(); }
        break;
    }
  }
  window.wrappedExportedCode = wrappedExportedCode;
  wrappedExportedCode('preload');
};

window.setup = function () {
  window.wrappedExportedCode('setup');
};
