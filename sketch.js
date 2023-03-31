const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;

let engine;
let world;

var ground;
var left;
var right;
var top_wall;
var button

function setup() {
  createCanvas(400,400);
  engine = Engine.create();
  world = engine.world;
  var options = {
    restitution:1
  }
  var end_options = {
    isStatic:true
  }
  end = Bodies.circle(385,100,20,end_options)
  World.add(world,end)
  ball = Bodies.circle(30,300,20,options)
  World.add(world,ball)
  ground = new Ground(200,390,400,20);
  rectangle = new Ground(30,230,250,10)
  rectangle2 = new Ground(160,135,10,200)  
  rectangle3 = new Ground(290,40,250,10)
  rectangle4 = new Ground(300,270,10,220)
  rectangle5 = new Ground(350,165,107,10)
  button = createImg("up.png")
  button.position(30,30)
  button.size(40,40)
  button.mouseClicked(verticalForce)
  rectMode(CENTER);
  ellipseMode(RADIUS);
}

function draw() 
{
  background(51);
  text("Press the green button to make the ball go right and up.",0,10)
  fill ("white")
  text("Be careful, as pressing it too much will result in the ball flying away.",0,25)
  fill("white")
  ellipse(ball.position.x,ball.position.y,20,20)
  ellipse(end.position.x,end.position.y,10,50)
  ground.show();
  rectangle.show()
  rectangle2.show()
  rectangle3.show()
  rectangle4.show()
  rectangle5.show()
  Engine.update(engine);
  collision = Matter.SAT.collides(ball,end)
  if(ball.position.x>400 || ball.position.y>400 || ball.position.y<0 || ball.position.x<0){
    gameOver()
  }
  if(collision.collided){
    gameOver()
    World.remove(world,ball)
  }
}

function verticalForce(){
  Matter.Body.applyForce(ball,{x:0,y:0},{x:0.01,y:-0.0050})
}

function gameOver(){
  swal ({
    title: "Game Over",
    text: "Would you like to play again?",
    imageURL:"https://media.tenor.com/SbQkZ4APyPsAAAAM/ball-bouncing.gif" ,
    imageSize:"150x350" ,
    confirmButtonText: "OK"
  },function(isConfirm){
    if(isConfirm){
      window.location.reload()
    }
  })
}