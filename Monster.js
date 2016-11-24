function Monster(x, y, speed, bounding, inputStates) {
	canvas = document.querySelector("#myCanvas");
	ctx2 = canvas.getContext('2d');

  this.x = x;
  this.y = y;
  this.speed = speed;
  this.boundingCircleRadius = bounding;
  this.vies = 3;
  //this.colors=['green','red','blue','yellow'];
  
  this.killed = function(){
	  if(this.vies == 1){
		  monster.dead = true;
	  }
	  this.vies--;
  }
  this.updateMonsterPosition = function (delta) {
      speedX = speedY = 0;
        // check inputStates
        if (inputStates.left) {
            this.rotate('left');
			inputStates.left = false;
        }
        if (inputStates.up) {
        }
       if (inputStates.right) {
            this.rotate('right');
			inputStates.right = false;
        }
        if (inputStates.down) {
        } 
        if (inputStates.space) {
        }
        if (inputStates.mousePos) { 
        }
       if (inputStates.mousedown) { 
            this.speed = 500;
        } else {
          // mouse up
          this.speed = 100;
        }
      
        // COmpute the incX and inY in pixels depending
        // on the time elasped since last redraw
        this.x += calcDistanceToMove(delta, speedX);
        this.y += calcDistanceToMove(delta, speedY);
   };
  
  this.rotate = function(d){
	  
	  if(d=='right'){
		  tmp = colors[0];
		  for(i=0; i<colors.length-1; i++){
			  colors[i] = colors[i+1];
		  }
		  colors[3] = tmp;
	  }else{
		  tmp = colors[3];
		  for(i=colors.length; i>0; i--){
			  colors[i] = colors[i-1];
		  }
		  colors[0] = tmp;
	  }
  }
  this.draw = function (x, y) {
       // draw a big monster !
       // head
   
       // save the context
       //ctx.save();
  
       var l = 130;
       
	   ctx2.lineCap ="round";
	   
	   ctx2.lineWidth = 15;
			ctx2.strokeStyle = colors[0];
			ctx2.beginPath();
			ctx2.moveTo(x,y);
			ctx2.lineTo(x,y+l);
			ctx2.stroke();
			
			ctx2.strokeStyle = colors[1];
			ctx2.beginPath();
			ctx2.moveTo(x,y+l);
			ctx2.lineTo(x+l,y+l);
			ctx2.stroke();
			
			ctx2.strokeStyle = colors[2];
			ctx2.beginPath();
			ctx2.moveTo(x+l,y+l);
			ctx2.lineTo(x+l,y);
			ctx2.stroke();
			
			ctx2.strokeStyle = colors[3];
			ctx2.beginPath();
			ctx2.moveTo(x+l,y);
			ctx2.lineTo(x,y);
			ctx2.stroke();
    }

      // We want the rectangle to move at speed pixels/s (there are 60 frames in a second)
    // If we are really running at 60 frames/s, the delay between frames should be 1/60
    // = 16.66 ms, so the number of pixels to move = (speed * del)/1000. If the delay is twice
    // longer, the formula works : let's move the rectangle twice longer!
  var calcDistanceToMove = function(delta, speed) {
    //console.log("#delta = " + delta + " speed = " + speed);
    return (speed * delta) / 1000; 
  };

}