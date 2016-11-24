// Inits
window.onload = function init() {
  var game = new GF();
  game.start();
};

var cmpt = 0;

// GAME FRAMEWORK STARTS HERE
var GF = function(){
    // Vars relative to the canvas
    var canvas, ctx, w, h; 


    var cookie = document.cookie;
    // etat du jeu
    var tempsTotal=0;
  
    var etats = {
        menuPrincipal : 0,
        jeuEnCours : 1,
        gameOver : 2,
    };
    var etatCourant = etats.jeuDebut;
    
    // vars for counting frames/s, used by the measureFPS function
    var frameCount = 0;
    var lastTime;
    var fpsContainer;
    var fps; 
    // for time based animation
    var delta, oldTime = 0;
  
    // vars for handling inputs
    var inputStates = {};
  
    // The monster !
    var monster = new Monster(235,235,100,70, inputStates);
  
	// The score !
    var score = new Score(0,"red");
	
    // array of balls to animate
    var ballArray = [];
    
    colors=['green','red','blue','yellow'];

    // les directions de la creation des balles

    function direction(nom, x, y){
      this.nom = nom;
      this.xDir =  x;
      this.yDir =  y;
    }

    var  directions = [new direction("west", 0, myCanvas.height/2), new direction("east", myCanvas.width, myCanvas.height/2), new direction("north", myCanvas.width/2, 0), new direction("south", myCanvas.width/2, myCanvas.height)];

    var measureFPS = function(newTime){
      
         // test for the very first invocation
         if(lastTime === undefined) {
           lastTime = newTime; 
           return;
         }
      
        //calculate the difference between last & current frame
        var diffTime = newTime - lastTime; 

        if (diffTime >= 1000) {
            fps = frameCount;    
            frameCount = 0;
            lastTime = newTime;
        }

        //and display it in an element we appended to the 
        // document in the start() function
       //fpsContainer.innerHTML = 'FPS: ' + fps; 
       frameCount++;
    };
  
     // clears the canvas content
     function clearCanvas() {
       ctx.clearRect(0, 0, w, h);
     }
  
     // Functions for drawing the monster and maybe other objects
       
  function timer(currentTime) {
    var delta = currentTime - oldTime;
    oldTime = currentTime;
    return delta;
    
  }
    var mainLoop = function(time){
       // Clear the canvas
          clearCanvas();
      
      if(monster.dead) {
        etatCourant = etats.gameOver;
      }
      
      switch(etatCourant) {
        case etats.jeuEnCours: 
          //main function, called each frame 
          measureFPS(time);
      
          // number of ms since last frame draw
          delta = timer(time);
          tempsTotal += delta;
       
          // draw the monster
          monster.draw(monster.x, monster.y);
      
		  // draw the score
          score.draw(20, h-20, ctx);
		  
          // Check inputs and move the monster
          monster.updateMonsterPosition(delta);
 
          // update and draw balls
          updateBalls(delta);
          break;

        case etats.jeuDebut:
        ctx3.font="60px Impact";
        ctx3.fillText("PUBBLE BUB", 155, 100);
          var l = 130;
       
           ctx2.lineCap ="round";
           
          ctx2.lineWidth = 15;
          ctx2.strokeStyle = colors[0];
          ctx2.beginPath();
          ctx2.moveTo(300,200);
          ctx2.lineTo(210,290);
          ctx2.stroke();
            
            ctx2.strokeStyle = colors[1];
            ctx2.beginPath();
            ctx2.moveTo(210,290);
            ctx2.lineTo(300,380);
            ctx2.stroke();
            
            ctx2.strokeStyle = colors[2];
            ctx2.beginPath();
            ctx2.moveTo(300,380);
            ctx2.lineTo(390,290);
            ctx2.stroke();
            
            ctx2.strokeStyle = colors[3];
            ctx2.beginPath();
            ctx2.moveTo(390,290);
            ctx2.lineTo(300,200);
            ctx2.stroke();

            ctx.beginPath();
            ctx.fillStyle = "white";
            ctx.arc(300, 290, 15, 0, 2*Math.PI);
            ctx.fill();
          ctx.restore();

          ctx3.fillText("Press SPACE to start", 60, 540);
          ctx3.restore();
          
          if(inputStates.space) {
            console.log("space enfoncee");
            monster.dead = false;
            etatCourant = etats.jeuEnCours;
            score.reset();
          }
          break;

        case etats.gameOver:
          ctx3.font="60px Impact";
        ctx3.fillText("PUBBLE BUB", 155, 100);
          var l = 130;
       
           ctx2.lineCap ="round";
           
          ctx2.lineWidth = 15;
          ctx2.strokeStyle = colors[0];
          ctx2.beginPath();
          ctx2.moveTo(300,200);
          ctx2.lineTo(210,290);
          ctx2.stroke();
            
            ctx2.strokeStyle = colors[1];
            ctx2.beginPath();
            ctx2.moveTo(210,290);
            ctx2.lineTo(300,380);
            ctx2.stroke();
            
            ctx2.strokeStyle = colors[2];
            ctx2.beginPath();
            ctx2.moveTo(300,380);
            ctx2.lineTo(390,290);
            ctx2.stroke();
            
            ctx2.strokeStyle = colors[3];
            ctx2.beginPath();
            ctx2.moveTo(390,290);
            ctx2.lineTo(300,200);
            ctx2.stroke();

            ctx.beginPath();
            ctx.fillStyle = "white";
            ctx.arc(300, 290, 15, 0, 2*Math.PI);
            ctx.fill();
          ctx.restore();

          ctx3.fillText("Press SPACE to start ", 60, 540);
          ctx3.restore();
          
          if(inputStates.space) {
            monster.dead = false;
            etatCourant = etats.jeuEnCours;
            score.reset();
          }
          break;
      
      }
        requestAnimationFrame(mainLoop);
    };
  

    
  
 function updateBalls(delta) {
      // for each ball in the array
    for(var i=0; i < ballArray.length; i++) {
      var ball = ballArray[i];
      
      // 1) move the ball
      ball.move();   
  
      // 2) test if the ball collides with a wall
      testCollisionWithWalls(ball);
      
      if(circRectsOverlap(monster.x, monster.y, 130, 130, ball.x, ball.y, ball.radius) && !ball.dead) {
                                  
        
        console.log(ball.x + " " + ball.y);
        console.log((Math.floor(ball.x)+""+ Math.floor(ball.y)+ ""+ball.color));
        if(goodMove(Math.floor(ball.x), Math.floor(ball.y), ball.color)){
          var audio = new Audio('collision.mp3');
          score.increment(1);
          audio.play();
        }
        else{
          var audio = new Audio("loose.wav");
          audio.play();
          monster.dead = true;
          checkCookie();
        }
        ball.dead = true;
		
      }
  
      // 3) draw the ball
      ball.draw();
  }
}  

function checkCookie() {
    var highscore=getCookie("highscore");
    if(highscore != ""){
      if (highscore < score.value) {
        setCookie("highscore", score.value);
      } 
    }
    else {
      setCookie("highscore", score.value);
    }
} 
  
  function goodMove(x, y, c){

    if(x == 300){
      if(y == 379 && c == colors[1]) return true;
      else if(y == 221 && c == colors[3])  return true;
      return false;
    }
    else if(y == 300){
      if(x == 379 && c == colors[2]) return true;
      else if(x == 221 && c == colors[0])  return true;
      return false;
    }
    return false;
  }
  // Teste collisions entre cercles
  function circleCollide(x1, y1, r1, x2, y2, r2) {
      var dx = x1 - x2;
      var dy = y1 - y2;
      return ((dx * dx + dy * dy) < (r1 + r2)*(r1+r2));  
   }
        // Collisions between rectangle
      function rectsOverlap(x0, y0, w0, h0, x2, y2, w2, h2) {
        if ((x0 > (x2 + w2)) || ((x0 + w0) < x2))
            return false;
      
        if ((y0 > (y2 + h2)) || ((y0 + h0) < y2))
            return false;
        return true;
      }
      
      // Collisions between rectangle and circle
      function circRectsOverlap(x0, y0, w0, h0, cx, cy, r) {
          var testX=cx; 
          var testY=cy; 
          
          if (testX < x0) testX=x0; 
          if (testX > (x0+w0)) testX=(x0+w0); 
          if (testY < y0) testY=y0; 
          if (testY > (y0+h0)) testY=(y0+h0); 
 
          return (((cx-testX)*(cx-testX)+(cy-testY)*(cy-testY))<r*r); 
      }

  
  function testCollisionWithWalls(ball) {
    // left
    if (ball.x < ball.radius) {
        ball.x = ball.radius;
        ball.angle = -ball.angle + Math.PI;
    } 
    // right
    if (ball.x > w - (ball.radius)) {
        ball.x = w - (ball.radius);
        ball.angle = -ball.angle + Math.PI; 
    }     
    // up
    if (ball.y < ball.radius) {
        ball.y = ball.radius;
        ball.angle = -ball.angle;     
    }     
    // down
    if (ball.y > h - (ball.radius)) {
        ball.y = h - (ball.radius);
        ball.angle =-ball.angle; 
    } 
}
  
    function getMousePos(evt) {
        // necessary to take into account CSS boudaries
        var rect = canvas.getBoundingClientRect();
        return {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
        };
    }
      
  function createBalls() {
        // Create a ball with random position and speed. 
        // You can change the radius
        

        var j = Math.floor(Math.random() * 4) + 1;
        var ball =  new Ball((2*Math.PI)*Math.random(),        
                          50,
                          30,
						  directions,
                          colors[j-1]);
		//ball.color = 'red';
        if(!circleCollide(ball.x, ball.y, ball.radius,
                       monster.x, monster.y, monster.boundingCircleRadius)) {
        // On la rajoute au tableau
        ballArray[cmpt] = ball;
        } else {
          cmpt--;     
        }
        cmpt++;
      
   }                                

    var start = function(){
        // adds a div for displaying the fps value
        fpsContainer = document.createElement('div');
        document.body.appendChild(fpsContainer);
      
        // Canvas, context etc.
        canvas = document.querySelector("#myCanvas");
  
        // often useful
        w = canvas.width; 
        h = canvas.height;  
  
        // important, we will draw with this object
        ctx = canvas.getContext('2d');
		ctx2 = canvas.getContext('2d');
        ctx3 = canvas.getContext('2d');
        // default police for text
        ctx.font="20px Arial";


      
       //add the listener to the main, window object, and update the states
	   var fired = false;
      window.addEventListener('keydown', function(event){
          if (event.keyCode === 37 && !fired) {
             inputStates.left = true;
			 
          } else if (event.keyCode === 38) {
             inputStates.up = true;
          } else if (event.keyCode === 39) {
             inputStates.right = true;
          } else if (event.keyCode === 40) {
             inputStates.down = true;
          }  else if (event.keyCode === 32) {
             inputStates.space = true;
          }
      }, false);

      //if the key will be released, change the states object 
      window.addEventListener('keyup', function(event){
          if (event.keyCode === 37) {
             inputStates.left = false;
			       fired = false;
          } else if (event.keyCode === 38) {
             inputStates.up = false;
          } else if (event.keyCode === 39) {
             inputStates.right = false;
          } else if (event.keyCode === 40) {
             inputStates.down = false;
          } else if (event.keyCode === 32) {
             inputStates.space = false;
          }
      }, false);
      
      // Mouse event listeners
      canvas.addEventListener('mousemove', function (evt) {
          inputStates.mousePos = getMousePos(evt);
      }, false);

      canvas.addEventListener('mousedown', function (evt) {
            inputStates.mousedown = true;
            inputStates.mouseButton = evt.button;
      }, false);

      canvas.addEventListener('mouseup', function (evt) {
          inputStates.mousedown = false;
      }, false);      

		
       
        // We create tge balls: try to change the parameter
        setInterval(createBalls, 1500);

        // start the animation
        requestAnimationFrame(mainLoop);
    };

    //our GameFramework returns a public API visible from outside its scope
    return {
        start: start
    };
};