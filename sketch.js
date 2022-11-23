var bg,bgImg;

var player, shooterImg, shooter_shooting;

var gameState = "fight";

var life = 3;
var score = 0;
var bullets = 70;

var heart1,heart2,heart3;
var heart_1Img,heart_2Img,heart_3Img;

var bullet,bulletGroup;
var zombie,zombieGroup;

var lose,winning,explosion;

function preload(){
  
  shooterImg = loadImage("assets/shooter_diff.jpg");
  shooter_shooting = loadImage("assets/shooter_new1.jpg");
  zombieImg = loadImage("assets/zombieAnimation.gif");
  bgImg = loadImage("assets/Zombie background.jpg");
  bulletImg = loadImage("assets/bullet.jpg");
  
  heart_1Img = loadImage("assets/heart_1.png");
  heart_2Img = loadImage("assets/heart_2.png");
  heart_3Img = loadImage("assets/heart_3.png");

  lose = loadSound("assets/lose.mp3");
  winning = loadSound("assets/win.mp3");
  explosion = loadSound("assets/explosion.mp3");

}

function setup() {  
  createCanvas(windowWidth,windowHeight);

  //adding the background image
  //bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
  //bg.addImage(bgImg)
  //bg.scale = 2;

//creating the player sprite
   player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
   player.addImage(shooterImg);
   player.scale = 0.15;
   player.debug = true;
   player.setCollider("rectangle",0,0,300,300)

   heart1 = createSprite(displayWidth-150,40,20,20);
   heart1.addImage(heart_1Img);
   heart1.visible = false;
   heart1.scale - 0.4;
   
   heart2 = createSprite(displayWidth-100,40,20,20);
   heart2.addImage(heart_2Img);
   heart2.visible = false;
   heart2.scale - 0.4;
   
   heart3 = createSprite(displayWidth-50,40,20,20);
   heart3.addImage(heart_3Img);
   heart3.visible = false;
   heart3.scale - 0.4;
   
   zombieGroup = new Group();
   bulletGroup = new Group();

}

function draw() {
  image(bgImg,0,0,windowWidth,windowHeight); 
  if(gameState === "fight"  ){

    if(life === 3){
      heart1.visible = false;
      heart2.visible = false;
      heart3.visible = true;
    }
    
    if(life === 2){
      heart1.visible = false;
      heart2.visible = true;
      heart3.visible = false;
    }

    if(life === 1){
      heart1.visible = true;
      heart2.visible = false;
      heart3.visible = false;
    }

    if(life === 0){
      gameState = "lost";
  }

  if(score === 100){
    gameState = "win";
    winning.play();
  }

//moving the player up and down and making the game mobile compatible using touches
  if(keyDown("UP_ARROW")||touches.length>0){
    player.y = player.y-30
  }

  if(keyDown("DOWN_ARROW")||touches.length>0){
   player.y = player.y+30
  }

  //release bullets and change the image of shooter to shooting position when space is pressed
if(keyWentDown("space")){
  bullet = createSprite(displayWidth - 1150,player.y - 30,20,10);
  bullet.addImage(bulletImg);
  bullet.scale = 0.030;
  bullet.velocityX = 15;
  bulletGroup.add(bullet);

  // Add the depth to your bullet 
  player.depth = bullet.depth;
  player.depth = player.depth+2;

  player.addImage(shooter_shooting);
  player.scale = 0.6;
  bullet -= 1;
  explosion.play;
}
//player goes back to original standing image once we stop pressing the space bar
else if(keyWentUp("space")){
  player.addImage(shooterImg);
  player.scale = 0.6;
}

if(bullet == 0){
  gameState = "bullet";
  lose.play();
}

if(zombieGroup.isTouching(bulletGroup)){
  for(var i=0;i<zombieGroup.length;i++){
      if(zombieGroup[i].isTouching(bulletGroup)){
      zombieGroup[i].destroy();
      bulletGroup.destroyEach();
      explosion.play();
      score += 2;
    }
  }
}

if(zombieGroup.isTouching(player)){
    lose.play();
    for(var i=0;i<zombieGroup.length;i++){
        if(zombieGroup[i].isTouching(player)){
          zombieGroup[i].destroy();
          life -= 1;
        }
    }
}

enemy();

}
  
drawSprites();

  textSize(20);
  fill("white");
  text("Bullets = " + bullet,displayWidth-210,displayHeight/2-250);
  text("score = " + score,displayWidth-200,displayHeight/2-220);
  text("life = " + life,displayWidth-200,displayHeight/2-280);

  if(gameState == "lose"){
    textSize(100);
    fill("red");
    text("You have LOST",400,400);
    zombieGroup.destroyEach();
    player.destroy();
  }else if(gameState == "win"){
    textSize(100);
    fill("green");
    text("You have WON",400,400);
    zombieGroup.destroyEach();
    player.destroy();
  }else if(gameState == "bullet"){
    textSize(100);
    fill("yellow");
    text("You ran out of bullets",400,400);
    bulletGroup.destroyEach();
    player.destroy();

  }
  
}

function enemy(){
  if(frameCount%50 === 0){
    zombie = createSprite(random(500,11000),random(100,500),50,50)
    zombie.addImage(zombieImg);
    zombie.velocityX = -3;
    zombie.scale = 0.35;
    zombie.debug = true;
    zombie.setCollider("rectangle",0,0,400,400);
    zombieGroup.add(zombie);
    zombie.lifetime = 400;
  }
  
}
