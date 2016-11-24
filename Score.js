  function Score(value, color) {
	  this.value = value;
	  canvas = document.querySelector("#myCanvas");
	  ctx = canvas.getContext('2d');
	  
	  this.draw = function(x, y) {
		
		  ctx.save();
		  ctx.beginPath();

		  ctx.fillStyle = 'yellow';
      ctx.font="20px Impact";
		  ctx.fillText("Score : "+this.value, x, y);
      ctx.fillText("High Score : "+getCookie("highscore"), 440, y);
		ctx.restore();
		color = 'black';
	  };
	  
	  this.reset = function() {
		this.value = 0;
	  };
	  
	  this.increment = function(inc) {
		this.value += inc;
	  };
	}

function setCookie(cname, cvalue) {
    document.cookie = cname + "=" + cvalue + ";";
} 

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length,c.length);
        }
    }
    return "";
}