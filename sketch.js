var monkey, monkeyImage, invisibleGround, invisibleGround2, ground, bananas, bananaImage, rocks, rockImage, score, gameState;

function preload() {
  monkeyImage = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png")

  bananaImage = loadImage("banana.png");
  rockImage = loadImage("stone.png");
}

function setup() {
  createCanvas(800, 400);

  monkey = createSprite(100, 325);
  monkey.addAnimation("running", monkeyImage);
  monkey.scale = 0.2;

  invisibleGround = createSprite(400, 375, 800, 5);
  invisibleGround.visible = false;

  invisibleGround2 = createSprite(400, 370, 800, 5);
  invisibleGround2.visible = false;

  ground = createSprite(400, 375, 800, 70);
  ground.shapeColor = "yellowgreen";
  ground.depth = 0;

  bananas = new Group();
  rocks = new Group();

  score = 0
  gameState = "play";
}

function draw() {

  background("skyblue");

  if (gameState === "play") {

    monkey.velocityY = monkey.velocityY + 0.25;
    monkey.collide(invisibleGround);

    if (keyWentDown("space") && monkey.isTouching(invisibleGround2)) {
      monkey.velocityY = -10;
    }

    spawnFood();
    if (World.frameCount >= 600) {
      spawnRock();
    }

    if (monkey.isTouching(bananas)) {
      score = score + 2;
      bananas.destroyEach();
    }

    if (monkey.isTouching(rocks)) {
      score = score - 5;
      rocks.destroyEach();
    }

    if (score < 0) {
      gameState = "stop";
      monkey.velocityY = 5;
    }
    
    monkey.scale = score / 500 + 0.2;

    fill("black");
    textSize(20);
    text("Score:  " + score, 700, 25);

  }

  if (gameState === "stop") {
    bananas.setVelocityXEach(0);
    rocks.setVelocityXEach(0);
    bananas.setLifetimeEach(-1);
    rocks.setLifetimeEach(-1);

    fill("red");
    textSize(100)
    text("GAME OVER!",80,230);
  }

  drawSprites();
}

function spawnFood() {
  if (World.frameCount % 120 === 0) {
    var banana = createSprite(850, random(120, 200));
    banana.addImage(bananaImage);
    banana.velocityX = -6;
    banana.scale = 0.075;
    banana.lifetime = 400;
    bananas.add(banana);
  }
}

function spawnRock() {
  if (World.frameCount % 150 === 0) {
    var rock = createSprite(850, 345);
    rock.addImage(rockImage);
    rock.velocityX = -6;
    rock.scale = 0.2;
    rock.lifetime = 400;
    rocks.add(rock);
  }
}