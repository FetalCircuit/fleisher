//size of the pixels
var pixelScale = 1;

//declare a variable for each animation

var fleisher_animation;
var howdy;
var idle;
var idea;
var words;

//images for the interface
var hello_icon;
var hello_icon_roll;

//declare a variable for each sprite
//buttons are sprites as well
var character;
var hello;
var spark;

function preload() {

  sprite_sheet = loadSpriteSheet('assets/fleisher_test.png', 92, 92, 18);
  //turn the sprite sheet into an animation
  fleisher_animation = loadAnimation(sprite_sheet);

  sprite_sheet = loadSpriteSheet('assets/howdy_folks.png', 92, 92, 11);
  howdy = loadAnimation(sprite_sheet);

  sprite_sheet = loadSpriteSheet('assets/idle.png', 92, 92, 6);
  idle = loadAnimation(sprite_sheet);

  //sprite_sheet = loadSpriteSheet('assets/idea.png', 92, 92, 6);
  idea = loadAnimation('assets/idea_01.png', 'assets/idea_02.png');
  idea.playing = false;

  words = loadAnimation('assets/hf_0000.png', 'assets/hf_0019.png');
  //by default animations loop but it can be changed
  words.looping = false;
  words.playing = false;

  //load static images
  //  bg_image = loadImage("assets/background.png");
  hello_icon = loadImage("assets/hello_button.png");
  hello_icon_roll = loadImage("assets/hello_button_roll.png");

  //change the speed of the animation, higher delay = slower speed
  //fleisher_animation.frameDelay = 8;
  howdy.frameDelay = 10;
  idle.frameDelay = 10;
  words.frameDelay = 6;
  idea.frameDelay = 12;

}

function setup() {

  var canvas = createCanvas(400, 300);

  canvas.style("width", width * pixelScale + "px");
  canvas.style("height", height * pixelScale + "px");
  noSmooth();

  //assign a function to be called when the button is clicked
  //create a sprite for the button
  hello = createSprite(width / 2, height / 2, 50, 50);
  //assign a p5 image as appearance
  hello.addImage(hello_icon);

  //create a sprite character at position x, y, width, height
  character = createSprite(width / 2, height / 2, 92, 92);

  //add all the animations ("label", animation_variable)
  //I will use the label later
  //character.addAnimation('fleisher', fleisher_animation);

  character.addAnimation('idle', idle);
  character.addAnimation('howdy', howdy);

  //character.changeAnimation("fleisher");

  //assign a function to be called when the button is clicked
  hello.onMousePressed = function() {

    //feed only if the animation is idle to avoid cutting off the other animations
    if (character.getAnimationLabel() == 'idle') {
      words.play();
      words.rewind();

      character.changeAnimation('howdy');
      //rewind the animation to make sure it's playing from the beginning
      character.animation.rewind();
    }

    hello.onMouseOver = function() {
      hello.addImage(hello_icon_roll);
      idea.play();
    }

    //when the mouse exits the button restore the image
    hello.onMouseOut = function() {
      hello.addImage(hello_icon);
      idea.rewind();
      idea.stop();
    }
  }
}

function draw() {
  background(255);
  //draw image background

  if (character.getAnimationLabel() == "howdy" && character.animation.getFrame() == character.animation.getLastFrame()) {
    character.changeAnimation("idle");
  }
  animation(words, width / 2, 100);
  animation(idea, width / 2 + 4, height / 2 - 15);
  drawSprites();
}
