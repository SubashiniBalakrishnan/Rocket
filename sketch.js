  var sky,skyImg;
  var rocket,rocketImg;
  var fuel,fuelImg,fuelsGroup;
  var bomb,bombImg,bombsGroup;
  var gameState="play";
var score;

  function preload(){
  skyImg=loadImage("sky.jfif");
    rocketImg=loadImage("rocket-removebg-preview.png");
  fuelImg=loadImage("fuel-removebg-preview.png");
    bombImg=loadImage("bomb-removebg-preview.png");
    rocketSound=loadSound("mixkit-rocket-engine-ignition-rumble-1715.wav");
  fuelsGroup=new Group();
    bombsGroup=new Group();
  }

  function setup() {
    createCanvas(600,600);
    rocketSound.loop();
    sky=createSprite(100,100,800,700);
    sky.addImage("sky",skyImg);
   sky.scale=4;
    sky.velocityY=1;
    rocket=createSprite(280,300);
    rocket.addImage("rocket",rocketImg);
    rocket.scale=0.2;
   score=0;
  }

  function draw() {
    background(180);
    textSize(20);
    text("score:" +score,50,30);
    if(gameState==="play"){
      
      if(keyDown("left_arrow")){
      rocket.x=rocket.x-3;
    }
    if(keyDown("right_arrow")){
      rocket.x=rocket.x+3;
    }
    if(keyDown("space")){
      rocket.velocityY=-3;
    }
      
    rocket.velocityY=rocket.velocityY+0.8;
      
    if(sky.y>350){
      sky.y=250;
    }
if(fuelsGroup.isTouching(rocket)){
        score=score+1;
  
      }
      if(bombsGroup.isTouching(rocket)){
      rocket.velocityY=0;
        rocket.destroy();
      gameState="end";
      
    }
      spawnFuels();
   drawSprites();

    }
  
    
    
    

    
    else if(gameState==="end"){
    fuelsGroup.destroyEach();
      bombsGroup.destroyEach();
      fuelsGroup.setVelocityYEach(0);
      bombsGroup.setVelocityYEach(0);
      sky.velocityY=0;
      stroke("red");
    fill("red");
    textSize(30);
    text("Game Over",200,200);

      
  }
    
}
    

  function spawnFuels(){
    if(frameCount%240===0){
      var fuel=createSprite(200,-50);
      fuel.scale=0.2;
      fuel.addImage(fuelImg);
      var bomb=createSprite(200,10);
      bomb.scale=0.2;
      bomb.addImage(bombImg);
      bomb.velocityY=1;
      
      bomb.lifetime=500;
      fuel.x=Math.round(random(120,400));
      fuel.velocityY=1;
      fuel.lifetime=500;
      fuelsGroup.add(fuel);
      bombsGroup.add(bomb);
    }
  }