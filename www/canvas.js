// Global variables for canvas and it's context
var canvas, context;
// Sprits
var healths = [];
var sprites = [];
var others = [];
var rockets = [];
var hits = [];

var rocketImage;
var hitImage;
var missImage;
var rubbleImage;
var nullImage; // For canon only
var qBox = {};

function drawCanvas() {
   // Setting for drawing blank screen (clearning screen)
   context.clearRect(0, 0, canvas.width(), canvas.height());

   // Draw question mark for help
   context.fillStyle = '#E8F896';
   context.fillRect(qBox.x, qBox.y, qBox.w, qBox.h);
   context.strokeStyle = '#434E06';
   context.setLineDash([]);
   context.beginPath();
   context.rect(qBox.x, qBox.y, qBox.w, qBox.h);
   context.stroke();
   context.fillStyle = '#434E06';
   context.fillText('?', qBox.x+1, qBox.y+20);

   // Draw health bars
   drawHealth();

   // Draw forground objects
   others.forEach(function(entry) {
      entry.render();
   });
   // Draw objects
   sprites.forEach(function(entry) {
      entry.render();
   });
   // Draw rockets
   rockets.forEach(function(entry) {
      entry.render();
   });
   // Draw hits
   hits.forEach(function(entry) {
      entry.drawFrame();
   });

   //draw arc
   drawTankArc();
}

//KEY CODES
//should clean up these hard coded key codes
var RIGHT_ARROW = 39;
var LEFT_ARROW = 37;
var UP_ARROW = 38;
var DOWN_ARROW = 40;
var SPACE = 32;

var isMoving = false;
var isRotating = false;
var sendingMove = false;
var dX = 0; // Amount to move in both X direction
var dRot = 0; // Amount to rotate the canon

function handleKeyDown(e) {
   //console.log("keydown code = " + e.which);
   if(!isMoving) {
      if (e.which == RIGHT_ARROW) { // Catch restrictions here for min and max x?
         isMoving = true;
         dX = 1; //right arrow
      }
      if (e.which == LEFT_ARROW) { // Catch restrictions here for min and max x?
         isMoving = true;
         dX = -1; //left arrow
      }
   }
   if(!isRotating) {
      if (e.which == UP_ARROW) {
         isRotating = true;
         dRot = 1; // up arrow
      }
      if (e.which == DOWN_ARROW) {
         isRotating = true;
         dRot = -1; //down arrow
      }
   }
   if(!sendingMove) {
      // Update server if required
      sendMove(function() {
         sendingMove = true;
         ws.send(JSON.stringify( {type:'move', data: [dX,dRot]}));
      });
   }
   if(e.which == SPACE) {
      sendRocket();
   }
}

function handleKeyUp(e) {
   if (e.which == UP_ARROW || e.which == DOWN_ARROW) {
      dRot = 0;
      isRotating = false;
   }
   if (e.which == RIGHT_ARROW || e.which == LEFT_ARROW) {
      dX = 0;
      isMoving = false;
   }
}

function sendMove(query) {
   if(isActive && (isMoving || isRotating)) {
      query();
      setTimeout(sendMove, 100, query);
   } else sendingMove = false;
}

function updateTanks(input) {
   // Move red tank
   if(input.data[0] !== null) {
      sprites[0].x = input.data[0];
   }
   // Rotate red canon
   if(input.data[1] !== null) {
      sprites[1].rot = input.data[1];
   }
   // Move blue tank
   if(input.data[2] !== null) {
      sprites[2].x = input.data[2];
   }
   // Rotate blue canon
   if(input.data[3] !== null) {
      sprites[3].rot = input.data[3];
   }
   // Draw to canvas
   drawCanvas();
}

function drawTankArc() {
   // Set line to dashes
   context.setLineDash([2,8]);
   var x0, x1, x2;
   var y0, y1, y2;
   // Red Tank arc
   if(healths[0].health > 0) {
      var tank = sprites[0];
      var canon = sprites[1];

      var power = 400;
      var canonLength = 48;

      x0 = tank.x+canon.center.x+canon.offset.x+canonLength*Math.cos(canon.rot*Math.PI/180);
      y0 = tank.y+canon.center.y+canon.offset.y-canonLength*Math.sin(canon.rot*Math.PI/180);
      x1 = x0+power*Math.cos(canon.rot*Math.PI/180);
      y1 = y0+power*-Math.sin(canon.rot*Math.PI/180);
      x2 = 2*(x1-x0)+x0+canonLength*Math.cos(canon.rot*Math.PI/180);
      y2 = tank.y+tank.height;

      context.strokeStyle = 'red';
      context.beginPath();
      context.moveTo(x0, y0);
      context.bezierCurveTo(x1, y1, x1, y1, x2, y2);
      context.stroke();
   }

   // Blue Tank arc
   if(healths[1].health > 0) {
      var tank = sprites[2];
      var canon = sprites[3];

      var power = 400;
      var canonLength = 48;

      x0 = tank.x+canon.center.x-canonLength*Math.cos(canon.rot*Math.PI/180);
      y0 = tank.y+canon.center.y-canonLength*Math.sin(canon.rot*Math.PI/180);
      x1 = x0-power*Math.cos(canon.rot*Math.PI/180);
      y1 = y0+power*-Math.sin(canon.rot*Math.PI/180);
      x2 = 2*(x1-x0)+x0-canonLength*Math.cos(canon.rot*Math.PI/180);
      y2 = tank.y+tank.height;

      context.strokeStyle = 'blue';
      context.beginPath();
      context.moveTo(x0, y0);
      context.bezierCurveTo(x1, y1, x1, y1, x2, y2);
      context.stroke();
   }
}

function updateHealth(input) {
   // Update health values from server
   // Update red health
   if(input.data[0] !== null) healths[0].health = input.data[0];
   if(healths[0].health <= 0) {
      sprites[0].image = rubbleImage;
      sprites[1].image = nullImage;
   }
   // Update blue health
   if(input.data[1] !== null) healths[1].health = input.data[1];
   if(healths[1].health <= 0) {
      sprites[2].image = rubbleImage;
      sprites[3].image = nullImage;
   }
   // Draw canvas
   drawCanvas();
}

function drawHealth() {
   var blankWidth;
   // Draw red health
   healths[0].render();
   if(healths[0].health < 100) {
       blankWidth = Math.round(156*(1-healths[0].health/100));
       context.clearRect(healths[0].x+196-blankWidth, healths[0].y+10, blankWidth, 16);
   }
   // Draw blue health
   healths[1].render();
   if(healths[1].health < 100) {
       blankWidth = Math.round(156*(1-healths[1].health/100));
       context.clearRect(healths[1].x+4, healths[1].y+10, blankWidth, 16);
   }
}

function sendRocket() {
   var output = {
      type: 'fire'
   };
   ws.send(JSON.stringify(output));
}

function updateRocket(input) {
   rockets = []; // Reset rockets
   // Get each rocket on each team
   input.data.forEach(function(team) {
      team.forEach(function(rocket) {
         var sRocket = sprite({
            context: context,
            width: 10,
            height: 10,
            x: rocket.x,
            y: rocket.y,
            rotM: 0,
            center: {x:0,y:0},
            image: rocketImage
         });
         rockets.push(sRocket);
      });
   });

   drawCanvas();
}

function rocketHit(input) {
   var hit = animation({
      context: context,
      x: input.data.x,
      y: input.data.y,
      maxFrame: 46,
      image: hitImage
   });
   hits.push(hit);
   hit.render();
}

function rocketMiss(input) {
   var miss = animation({
      context: context,
      x: input.data.x,
      y: input.data.y,
      maxFrame: 30,
      image: missImage
   });
   hits.push(miss);
   miss.render();
}

function killTank(input) {
   var tank = sprites[2*input.data.id];
   var kill = animation({
      context: context,
      x: tank.x + tank.width/2,
      y: tank.y + tank.height, // Bottom of the tank
      maxFrame: 46,
      image: hitImage
   });
   kill.mult = 2.5;
   kill.y -= kill.height*kill.mult/4; // Move bottom of explosion to bottom of tank
   hits.push(kill);
   kill.render();
}

function sprite(opt) {
   var that = {};
   that.context = opt.context;
   that.width = opt.width;
   that.height = opt.height;
   that.x = opt.x;
   that.y = opt.y;
   that.image = opt.image;

   // Sprite renderer
   that.render = function() {
      that.context.drawImage(
         that.image,
         0,
         0,
         that.width,
         that.height,
         that.x,
         that.y,
         that.width,
         that.height);
   };

   return that;
}

function rotating(opt) {
   var that = {};
   that.context = opt.context;
   that.parent = opt.parent;
   that.width = opt.width;
   that.height = opt.height;
   that.rot = 0;
   that.rotM = opt.rotM;
   that.image = opt.image;
   that.center = opt.center;
   that.offset = opt.offset;

   // Sprite renderer
   that.render = function() {
      if(that.rot != 0) {
         // Save the unrotated context
         context.save();
         // Translate so that center of rotation (center) is at 0,0
         context.translate(that.parent.x + that.center.x + that.offset.x, that.parent.y + that.center.y + that.offset.y);
        // Rotate the canvas to the specified degrees
         context.rotate(that.rotM*that.rot*Math.PI/180);
         // Draw the image
         that.draw(-that.center.x, -that.center.y);
         // Restore the unrotated context
         context.restore();
      } else that.draw(that.parent.x + that.offset.x, that.parent.y + that.offset.y);
   };

   // Sprite draw function
   that.draw = function(x, y) {
      that.context.drawImage(
         that.image,
         0,
         0,
         that.width,
         that.height,
         x,
         y,
         that.width,
         that.height);
   };

   return that;
}

function animation(opt) { // Used for hit, miss and kill
   var that = {};
   that.context = opt.context;
   that.mult = 1;
   that.width = 75;
   that.height = 109;
   that.x = opt.x;
   that.y = opt.y;
   that.image = opt.image;
   that.frame = 0;
   that.maxFrame = opt.maxFrame;

   // Sprite render function
   that.render = function() {
      drawCanvas();
      that.drawFrame();
      // Draw all frames
      if(that.nextFrame()) setTimeout(that.render,100);
      else hits.splice(hits.indexOf(that,1));
   };

   // Sprite draw function
   that.drawFrame = function() {
      that.context.drawImage(
         that.image,
         that.frame*that.width,
         0,
         that.width,
         that.height,
         that.x-that.width*that.mult/2,
         that.y-that.height*that.mult/2,
         that.width*that.mult,
         that.height*that.mult);
   };

   // Next frame
   that.nextFrame = function() {
      that.frame++;
      if(that.frame >= that.maxFrame) return false;
      return true;
   };

   return that;
}

$(function() {
   canvas = $('#scene'); //our drawing canvas
   // Set canvas reolution to style size
   canvas.attr('width', canvas.width());
   canvas.attr('height', canvas.height());
   // Get DOM element
   context = canvas.get(0).getContext('2d');
   context.font = "18pt Arial";
   context.fillStyle = "black";
   //add keyboard handler to document
   $(document).keydown(handleKeyDown);
   $(document).keyup(handleKeyUp);

   // Box for help
   qBox = {
      x: canvas.width()/2-8,
      y: 5,
      w: 16,
      h: 24
   };

   canvas.click(function(event) {
      if(event.offsetX >= qBox.x && event.offsetX <= qBox.x+qBox.w &&
         event.offsetY >= qBox.y && event.offsetY <= qBox.y+qBox.h) {
         $('#welcome_overlay').show();
      }
   });

   var healthImageRed = new Image();
   healthImageRed.src = 'image/health_red.png';

   var redHealth = sprite({
      context: context,
      width: 200,
      height: 36,
      x: 10,
      y: 10,
      image: healthImageRed
   });
   redHealth.health = 100;

   healths.push(redHealth);

   var healthImageBlue = new Image();
   healthImageBlue.src = 'image/health_blue.png';

   var blueHealth = sprite({
      context: context,
      width: 200,
      height: 36,
      x: canvas.width()-200-10,
      y: 10,
      image: healthImageBlue
   });
   blueHealth.health = 100;

   healths.push(blueHealth);

   // Populate sprites
   var redTankImage = new Image();
   redTankImage.src = 'image/tank_red.png';

   var redTank = sprite({
      context: context,
      width: 76,
      height: 52,
      x: -90,
      y: canvas.height()-60,
      image: redTankImage
   });

   sprites.push(redTank);

   var redCanonImage = new Image();
   redCanonImage.src = 'image/canon_red.png';

   var redCanon = rotating({
      context: context,
      parent: redTank,
      width: 51,
      height: 15,
      rotM: -1,
      center: {x:6,y:7},
      offset: {x:26, y:0},
      image: redCanonImage
   });

   sprites.push(redCanon);

   var blueTankImage = new Image();
   blueTankImage.src = 'image/tank_blue.png';

   var blueTank = sprite({
      context: context,
      width: 76,
      height: 52,
      x: -90,
      y: canvas.height()-60,
      image: blueTankImage
   });

   sprites.push(blueTank);

   var blueCanonImage = new Image();
   blueCanonImage.src = 'image/canon_blue.png';

   var blueCanon = rotating({
      context: context,
      parent: blueTank,
      width: 51,
      height: 15,
      rotM: 1,
      center: {x:46,y:7},
      offset: {x:0, y:0},
      image: blueCanonImage
   });

   sprites.push(blueCanon);

   var wallImage = new Image();
   wallImage.src = 'image/wall.png';

   var wall = sprite({
      context: context,
      width: 40,
      height: 120,
      x: Math.round(canvas.width()/2-40/2),
      y: canvas.height()-130,
      image: wallImage
   });

   others.push(wall);

   var groundImage = new Image();
   groundImage.src = 'image/ground.png';

   var ground = sprite({
      context: context,
      width: 775,
      height: 10,
      x: 0,
      y: canvas.height()-10,
      image: groundImage
   });

   others.push(ground);

   rocketImage = new Image();
   rocketImage.src = 'image/canonball.png';

   hitImage = new Image();
   hitImage.src = 'image/explosion.png';

   missImage = new Image();
   missImage.src = 'image/miss.png';

   rubbleImage = new Image();
   rubbleImage.src = 'image/rubble.png';

   nullImage = new Image();
   nullImage.src = 'image/null.png';

   // Get current state of the game from server and update sprites
   // Waiting for connection to OPEN
   waitForWS(function() {
      ws.send(JSON.stringify({type:'update'}));
   });
});
