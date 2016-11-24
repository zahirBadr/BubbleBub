// constructor function for balls
function Ball( angle, v, diameter, directions, color) {
	canvas = document.querySelector("#myCanvas");
	ctx = canvas.getContext('2d');

  var i = Math.floor(Math.random() * 4) + 1;
  var direction = directions[i-1];
  this.x = direction.xDir;
  this.y = direction.yDir;
  this.angle = angle;
  this.v = v;
  this.radius = diameter/2;
  this.color = color;
  this.dead = false;
  this.speed = 1;
  
  this.draw = function() {
    // si la balle est "morte" on ne fait rien
    if(this.dead) return;
    
      ctx.save();
      ctx.beginPath();
      ctx.fillStyle = color;
      ctx.arc(this.x, this.y, this.radius, 0, 2*Math.PI);
      ctx.fill();
      ctx.restore();
  };
  
  this.move = function() {


    // si la balle est "morte" on ne fait rien
    if(this.dead) return;
    
    // add horizontal increment to the x pos
    // add vertical increment to the y pos
    
    var incX = this.v * Math.cos(this.angle);
    var incY = this.v * Math.sin(this.angle);
    
  if(direction.nom === "west"){
    this.x += this.speed;
  }

  if(direction.nom === "east"){
    this.x -= this.speed;
  }

  if(direction.nom === "north"){
    this.y += this.speed;
  }

  if(direction.nom === "south"){
    this.y -= this.speed;
  }
  };
}  
