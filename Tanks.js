// export template
var tanks = {};
// WebSocketServer
wss = {};
// Database for word jumble
words = [ // All possible forms of word on same line
   ['ABORT', 'TABOR'],
   ['ABOVE'],
   ['ACORN', 'CARON'],
   ['ACUTE'],
   ['ADAPT'],
   ['ADMIT'],
   ['ADULT'],
   ['AGREE', 'EAGER'],
   ['ALIAS', 'ALISA'],
   ['ALIVE'],
   ['ALOUD'],
   ['ANGLE', 'ANGEL', 'GLEAN', 'LANGE', 'GALEN'],
   ['ANKLE'],
   ['ANNOY'],
   ['ATOMS', 'MOATS'],
   ['ATTIC', 'TACIT'],
   ['AXELS', 'LAXES'],
   ['BACON'],
   ['BANJO'],
   ['BASIL', 'BAILS'],
   ['BEATS', 'ABETS', 'BASTE', 'BATES', 'BEAST', 'BETAS'],
   ['BEARD', 'BARDE', 'BARED', 'BRADE', 'BREAD'],
   ['BEACH'],
   ['BEANS', 'BANES'],
   ['BINGO'],
   ['BINGE', 'BEING', 'BEGIN'],
   ['BIRDS'],
   ['BLADE', 'BALED'],
   ['BLEAK'],
   ['BLIMP'],
   ['BLOWN'],
   ['BOATS', 'BOAST'],
   ['BRANCH'],
   ['BRAID', 'BAIRD', 'RABID'],
   ['BRAND'],
   ['BRAVE'],
   ['BRAWN'],
   ['BRAINS', 'BAIRNS'],
   ['BRAVO'],
   ['BRAWL'],
   ['BRICK'],
   ['BROWN'],
   ['CABIN'],
   ['CABLE'],
   ['CALVE', 'CLAVE'],
   ['CANDY'],
   ['CANAL'],
   ['CAMEL'],
   ['CANES'],
   ['CARGO'],
   ['CHAIN', 'CHINA'],
   ['CHALK'],
   ['CHANT', 'NATCH'],
   ['CHEEK'],
   ['CHEWY'],
   ['CHOIR'],
   ['CLEAN', 'LANCE'],
   ['CLUMP'],
   ['COACH'],
   ['COMIC'],
   ['CONES', 'SCONE'],
   ['COUCH'],
   ['COUGH'],
   ['CRAFT'],
   ['CREWS', 'SCREW'],
   ['CRIME'],
   ['CROWD'],
   ['CUBIC'],
   ['DANCE', 'CANED'],
   ['DAIRY', 'DIARY'],
   ['DECOY'],
   ['DIGIT'],
   ['DOZEN', 'ZONED'],
   ['DREAM', 'ARMED'],
   ['EAGLE'],
   ['ELBOW', 'BELOW', 'BOWEL'],
   ['ELECT'],
   ['EMAIL'],
   ['ENEMY', 'YEMEN'],
   ['EQUAL'],
   ['ERROR'],
   ['ESSAY'],
   ['EXERT'],
   ['FABLE'],
   ['FACES', 'CAFES'],
   ['FACTS'],
   ['FAIRY'],
   ['FALSE', 'FLEAS', 'LEAFS'],
   ['FENCE'],
   ['FIBRE', 'BRIEF', 'FIBER'],
   ['FIELD', 'FIDEL', 'FILED', 'FLIED'],
   ['FRIDGE'],
   ['FILMS'],
   ['FIXED'],
   ['FLAME'],
   ['FLOCK'],
   ['FLOWER', 'FOWLER', 'WOLFER'],
   ['FLIES', 'FILES'],
   ['FORCE'],
   ['FOUND', 'FONDU'],
   ['FRAME'],
   ['FRAUD'],
   ['FROZE'],
   ['FUDGE'],
   ['GOALS', 'GAOLS', 'LAGOS'],
   ['GRAPE', 'GAPER', 'PAGER'],
   ['GAVEL'],
   ['GHOST', 'GOTHS'],
   ['GIANT'],
   ['GNOME'],
   ['GRACE', 'CAGER'],
   ['GRASP'],
   ['GREEN', 'GENRE', 'REGEN'],
   ['GUEST'],
   ['GUILD'],
   ['HABIT'],
   ['HEADS', 'HADES', 'SHADE'],
   ['HELIX'],
   ['HIKES'],
   ['HOCKEY'],
   ['SOCCER'],
   ['HUNGRY'],
   ['HUMOUR'],
   ['IDEAS', 'AIDES', 'ASIDE', 'DASIE'],
   ['IGLOO'],
   ['IMAGE'],
   ['IMPLY'],
   ['INDEX', 'NIXED'],
   ['ITEMS', 'EMITS', 'MITES', 'SMITE', 'TIMES'],
   ['IVORY'],
   ['JOKER'],
   ['KAYAK'],
   ['KNIFE'],
   ['KNELT'],
   ['KNOCK'],
   ['LATCH'],
   ['LAUGH'],
   ['LEAVE'],
   ['LEDGE', 'GLEED'],
   ['LEGAL'],
   ['LEMON', 'MELON', 'MENLO'],
   ['LEMUR'],
   ['LILAC', 'CALLI'],
   ['LINGO', 'LOGIN'],
   ['LOCAL'],
   ['LOYAL', 'ALLOY'],
   ['LUCKY'],
   ['LUCID'],
   ['MADAM'],
   ['MAGIC'],
   ['MAJOR'],
   ['MANGO', 'AMONG'],
   ['MAPLE', 'AMPLE'],
   ['MEDAL', 'LAMED'],
   ['MERGE'],
   ['MERIT', 'MITER', 'MITRE', 'REMIT', 'TIMER'],
   ['MOCHA', 'MACHO'],
   ['MIXED'],
   ['MONKEY'],
   ['MYTH'],
   ['NINJA'],
   ['OMEGA'],
   ['ONION'],
   ['OPTIC', 'TOPIC', 'PICOT'],
   ['ORBIT'],
   ['ORGANIC'],
   ['OWNED', 'ENDOW'],
   ['PANIC'],
   ['PATIO'],
   ['PEACH', 'CHEAP'],
   ['PEDAL', 'PALED', 'PLEAD'],
   ['PECAN'],
   ['PHONE'],
   ['PHASE', 'HEAPS', 'SHAPE'],
   ['PLAIN', 'LAPIN'],
   ['POLKA'],
   ['POWER'],
   ['PIRATE'],
   ['PROUD'],
   ['QUEST'],
   ['QUICK'],
   ['QUIET', 'QUITE'],
   ['RAVEN', 'VERNA'],
   ['RAZOR'],
   ['RETRO', 'TORRE'],
   ['RHYME', 'HERMY'],
   ['ROCKY'],
   ['ROGUE', 'ROUGE'],
   ['SAUCE', 'CAUSE'],
   ['SCARE', 'ACRES', 'CARES', 'CESAR', 'RACES'],
   ['SCUBA'],
   ['SHACK', 'HACKS'],
   ['SHRUG'],
   ['SYRUP'],
   ['SKATE', 'STEAK', 'KEATS', 'STAKE', 'TAKES', 'TEAKS'],
   ['WHALE', 'WHEAL'],
   ['SLEPT', 'SPELT', 'PELTS'],
   ['SNACK'],
   ['SNOWY'],
   ['STORM', 'STROM'],
   ['STAIR'],
   ['TABLE', 'BLEAT'],
   ['BENCH'],
   ['TIGER'],
   ['TOAST', 'STOAT'],
   ['TONGUE'],
   ['TRAIN', 'INTRA'],
   ['TREND'],
   ['VIRUS'],
   ['VOICE'],
   ['VOTED'],
   ['WAGON'],
   ['WATCH'],
   ['YACHT'],
   ['ACCENT'],
   ['ADMIRE'],
   ['AMAZED'],
   ['ANCHOR', 'RANCHO', 'CHARON'],
   ['ANIMAL', 'MANILA', 'LAMINA', 'MALIAN'],
   ['ARROWS'],
   ['ATOMIC'],
   ['AURORA'],
   ['AVATAR'],
   ['AVENUE'],
   ['AUTUMN'],
   ['WINTER', 'TWINER'],
   ['BAGELS', 'GABLES'],
   ['BASKET'],
   ['BEAVER'],
   ['BLEACH'],
   ['BORDER'],
   ['BUCKET'],
   ['BUNDLE'],
   ['CANDLE', 'LANCED'],
   ['CANOES', 'OCEANS'],
   ['CHALET'],
   ['CONTACT'],
   ['CREDIT', 'DIRECT'],
   ['QUARTER'],
   ['COUPON'],
   ['CRACK'],
   ['CRISPY'],
   ['CRUNCH'],
   ['DRAWING', 'WARDING'],
   ['DAZZLE'],
   ['DOCTOR'],
   ['EDITOR', 'RIOTED', 'TRIODE'],
   ['GLITCH'],
   ['HONEST'],
   ['LINEAR', 'ARLINE', 'NAILER', 'ALINER'],
   ['LOCKED'],
   ['MANUAL', 'ALUMNA'],
   ['MARKET'],
   ['MARBLE', 'AMBLER', 'BLAMER', 'RAMBLE'],
   ['MENTOR', 'MORTEN', 'MERTON'],
   ['MIDDLE'],
   ['MOVING'],
   ['NAPKIN'],
   ['NOTICE'],
   ['OBJECT'],
   ['ONLINE', 'LONNIE'],
   ['PARADE', 'PEADAR'],
   ['PLEASE', 'ASLEEP', 'ELAPSE'],
   ['POTATO'],
   ['RADISH'],
   ['REMOTE', 'METEOR'],
   ['RESCUE', 'RECUSE', 'SECURE'],
   ['SAFETY', 'FAYEST'],
   ['SHADOW'],
   ['SIGNAL', 'ALIGNS'],
   ['SKETCH'],
   ['SOURCE', 'COURSE', 'CRUSOE'],
   ['SPRING'],
   ['SPORT', 'PORTS', 'STROP'],
   ['STRIKE', 'TRIKES'],
   ['STRONG'],
   ['SUGAR', 'ARGUS'],
   ['SUPERB'],
   ['SUNSET'],
   ['SURGED'],
   ['TENTH'],
   ['THREAT', 'RHETTA', 'HATTER'],
   ['TURKEY']
];
// Save teams in an array
var canvas = {
   width:775,
   height:400
};
var tank = {
   width:76,
   height:52,
   move:2,
   rot:0.5,
   length:48,
   power:400,
   fire:0.001,
   damage:10
};
var wall = {
   x:Math.round(canvas.width/2-40/2),
   y:canvas.height-130,
   width:40,
   height:120
};
var ground = {
   height: 8
};
var red_team = {
   id: 0,
   name: 'Red Team',
   player: [],
   question: '',
   type: -1,
   answer: null,
   message: '',
   driver: null,
   timer: 0,
   health: 100,
   tank: {x:100, xMin:10, xMax:Math.round(canvas.width/2-30-tank.width)},
   canon: {
      rot:0,
      rotMin:0,
      rotMax:75,
      center: {x:6, y:7},
      offset: {x:26, y:0}
   },
   rocket: [],
   questionTimer: null
};
var blue_team = {
   id: 1,
   name: 'Blue Team',
   player: [],
   question: '',
   type: -1,
   answer: null,
   message: '',
   driver: null,
   timer: 0,
   health: 100,
   tank: {x:Math.round(canvas.width-100-tank.width), xMin:Math.round(canvas.width/2+30), xMax:canvas.width-10-tank.width},
   canon: {
      rot:0,
      rotMin:0,
      rotMax:75,
      center: {x:46, y:7},
      offset: {x:0, y:0}
   },
   rocket: [],
   questionTimer: null
};
var score = [0, 0];
// Save defaults
var red_default = JSON.stringify(red_team);
var blue_default = JSON.stringify(blue_team);
// status
var sendingRocket;

// Constructor function
var Tanks = function(connect) {
   wss = connect;
   // Initialize questions
   newQuestion(red_team);
   newQuestion(blue_team);
}

// Exported functions
var broadcast = function(pInput) {
   switch(pInput.type) {
      case 'message':
         console.log('@' + pInput.data[0] + ": " + pInput.message);
         break;
      /*case 'move':
         console.log('Tank has been moved');
         break;*/
   }
   // Broadcast to all connected clients
   wss.clients.forEach(function(client) {
      client.send(JSON.stringify(pInput), function ack(error) {});
   });
}

var reset = function() {
   broadcast({
      type: 'reset',
      data: [getTeam(0).name, score[0], getTeam(1).name, score[1]]
   });
   red_team = JSON.parse(red_default);
   blue_team = JSON.parse(blue_default);
   // Initialize questions
   newQuestion(red_team);
   newQuestion(blue_team);
}

var getTeam = function(id) {
   switch(id) {
      case 0:
         return red_team;
      case 1:
         return blue_team;
   }
};

var addToTeam = function(client) {
   // Check if player is already in a team
   if (findTeam(client)) return 0; // Player already found
   getNextTeam().player.push(client);
   return 1;
};

var removeFromTeam = function(client) {
   if(getTeam(0).player.indexOf(client) > -1)
      findTeam(client).player.splice(getTeam(0).player.indexOf(client), 1);
   else if(getTeam(1).player.indexOf(client) > -1)
      findTeam(client).player.splice(getTeam(1).player.indexOf(client), 1);
};

var moveTank = function(input) {
   // Get clients team
   var team = findTeam(input.client);
   if(checkControl(team, input.client) && team.health > 0) { // Still alive
      // Setup default values for null data
      output = {
         type: 'move',
         data: [null, null, null, null]
      }
      // Get newX delta position
      var newX = Math.sign(input.message.data[0])*tank.move;
      // Get newRot delta rotation
      var newRot = Math.sign(input.message.data[1])*tank.rot;
      // Check if tank has moved
      if(newX != 0) {
         // Calculate newX position
         var newX = input.message.data[0] + team.tank.x;
         // Check if newX is within bounds (should be client side checked also)
         if(newX > team.tank.xMax) newX = team.tank.xMax;
         else if(newX < team.tank.xMin) newX = team.tank.xMin;
         // Check if newX has changed (clients side checked also)
         if(newX != team.tank.x) team.tank.x = newX;
         // Set newX for appropriate team
         output.data[2*team.id] = newX;
      }
      // Check if canon has rotated
      if(newRot != 0) {
         // Calculate newX position
         var newRot = input.message.data[1] + team.canon.rot;
         // Check if newX is within bounds (should be client side checked also)
         if(newRot > team.canon.rotMax) newRot = team.canon.rotMax;
         else if(newRot < team.canon.rotMin) newRot = team.canon.rotMin;
         // Check if newX has changed (clients side checked also)
         if(newRot != team.canon.rot) team.canon.rot = newRot;
         // Set newX for appropriate team
         output.data[2*team.id+1] = newRot;
      }
      broadcast(output);
   }
   //broadcast(output);
};

var sendTank = function(client) {
   var message = {
      type: 'move',
      data: [getTeam(0).tank.x, getTeam(0).canon.rot, getTeam(1).tank.x, getTeam(1).canon.rot]
   }
   client.send(JSON.stringify(message), function ack(error) {});
};

var sendHealth = function(client) {
   var message = {
      type: 'health',
      data: [getTeam(0).health, getTeam(1).health]
   }
   client.send(JSON.stringify(message), function ack(error) {});
};

var sendQuestion = function(client) {
   message = {
      type: 'question',
      data: [getTeam(0).question, getTeam(1).question]
   };
   client.send(JSON.stringify(message), function ack(error) {});
};

var addRocket = function(input) {
   var rOff = 5;
   // Get clients team
   var team = findTeam(input.client);
   if(checkControl(team, input.client)) { // Check if player has control of tank
      // Remove control of driver
      team.timer = 0; // will be caught by cound down
      /*
      team.driver = null;
      team.message = '';
      newQuestion(team);
      sendStatus();
      */
      if(team.health > 0) { // Still alive
         // Calculate rocket trajectory as Bezier curve
         if(team.id == 0) { // !!!Need to offset based on rockets center
            var x0 = team.tank.x;
            x0 += team.canon.center.x + team.canon.offset.x - rOff;
            x0 += tank.length*Math.cos(team.canon.rot*Math.PI/180);

            var y0 = canvas.height - tank.height - ground.height;
            y0 += team.canon.center.y + team.canon.offset.y - rOff;
            y0 -= tank.length*Math.sin(team.canon.rot*Math.PI/180);

            var x1 = x0 + tank.power*Math.cos(team.canon.rot*Math.PI/180) + rOff;

            var y1 = y0 + tank.power*-Math.sin(team.canon.rot*Math.PI/180);

            var x2 = 2*(x1 - x0) + x0 - rOff;
            x2 += tank.length*Math.cos(team.canon.rot*Math.PI/180);

            var y2 = canvas.height - ground.height + rOff;

         } else if(team.id == 1) { // !!!Need to offset based on rockets center
            var x0 = team.tank.x;
            x0 += team.canon.center.x + team.canon.offset.x - rOff;
            x0 -= tank.length*Math.cos(team.canon.rot*Math.PI/180);

            var y0 = canvas.height - ground.height - tank.height;
            y0 += team.canon.center.y + team.canon.offset.y - rOff;
            y0 -= tank.length*Math.sin(team.canon.rot*Math.PI/180);

            var x1 = x0 - tank.power*Math.cos(team.canon.rot*Math.PI/180) + rOff;

            var y1 = y0 - tank.power*Math.sin(team.canon.rot*Math.PI/180);

            var x2 = 2*(x1 - x0) + x0 - 2*rOff;
            x2 -= tank.length*Math.cos(team.canon.rot*Math.PI/180);

            var y2 = canvas.height - ground.height - rOff;
         }
         // Push rocket onto appropriate teams rockets*/
         var rocket = {
            t: 0.0, // Percentage of travel from 0 to 1
            pt: [{x:x0,y:y0},{x:x1,y:y1},{x:x2,y:y2}] // Points used for Bezier curve
         };
         team.rocket.push(rocket);
         // Run loop to broadcast rocket until t = 1;
         if(!sendingRocket) sendRocket();
      }
   }
}

var getNextTeam = function() {
   if (getTeam(0).player.length > getTeam(1).player.length) {
      return getTeam(1);
   }
   return getTeam(0);
};

var checkGuess = function(input) {
   if(getTeam(0).health > 0 &&
      getTeam(1).health > 0) { // Only check guess if game is still on
      var team = findTeam(input.client);
      if(team.driver == null) { // Check if someone is already driving
         var message = [null,null];
         message[team.id] = input.guess;
         broadcast({ // Send guess to clients
            type: 'guess',
            data: message
         });
         console.log('Guess ' + input.guess + ' by ' + input.name);
         var correct = false;

         switch(team.type) {
            case 0: // Words
               for(var i = 0; i < words[team.answer].length; i++) {
                  if(input.guess.toUpperCase() == words[team.answer][i]) { // Correct answer
                     correct = true;
                     break;
                  }
               }
               break;
            case 1: // Number
               if(input.guess.toUpperCase() == team.answer) correct = true;
               break;
         }

         if(correct) {
            team.driver = input.client;
            // Send status message
            team.message = input.name + ' has control for the next 10s';
            team.question = null;
            sendAllQuestion();
            sendStatus();
            team.timer = 10; // Reset team driver timer
            countDownControl(team, input.client);
            console.log('Correct answer by ' + input.name + ' with ' + input.guess);
         }
      }
   }
}

// Setup Tanks prototype
Tanks.prototype = {
   broadcast: broadcast,
   reset: reset,
   getTeam: getTeam,
   addToTeam: addToTeam,
   removeFromTeam: removeFromTeam,
   moveTank: moveTank,
   sendTank: sendTank,
   sendHealth: sendHealth,
   sendQuestion: sendQuestion,
   addRocket: addRocket,
   getNextTeam: getNextTeam,
   checkGuess: checkGuess
};

// Helper functions
function findTeam(client) {
   if (getTeam(0).player.indexOf(client) > -1) {
      return getTeam(0);
   } else if (getTeam(1).player.indexOf(client) > -1) {
      return getTeam(1);
   }
   console.log("Unable to locate client (new client)");
   return null;
};

function sendStatus() {
   broadcast({
      type: 'status',
      data: [getTeam(0).message, getTeam(1).message]
   });
}

function sendAllQuestion() {
   var data = [getTeam(0).question, getTeam(1).question];
   if(getTeam(0).question === null) data[0] = '<br>';
   if(getTeam(1).question === null) data[1] = '<br>';
   broadcast({
      type: 'question',
      data: data
   });
}

function newQuestion(team) {
   // Reset team's timer
   if(team.questionTimer !== null) {
      clearTimeout(team.questionTimer);
      team.questionTimer = null;
   }
   var options = [0,1]; // Question type array
   team.type = options[Math.floor(Math.random()*options.length)];
   switch(team.type) {
      case 0: // Word jumble
         team.answer = Math.floor(Math.random()*words.length);
         team.question = 'Word Jumble: ' + jumbleWord(words[team.answer][0]);
         break;
      case 1: // Math question
         team.answer = Math.floor(Math.random()*41)-20;
         team.question = 'Solve: ' + mathQuestion(team.answer);
         break;
   }
   // Get new question if no one answers in time limit
   team.questionTimer = setTimeout(newQuestion, 2*60*1000, team);
   sendAllQuestion();
}

function jumbleWord(word) {
   var arr = word.split('');
   var i = arr.length;
   var temp;
   var randI;
   while(i > 0) {
      randI = Math.floor(Math.random()*arr.length);
      i--;
      temp = arr[i];
      arr[i] = arr[randI];
      arr[randI] = temp;
   }
   var newWord = arr.join('');
   if(word == newWord) return jumbleWord(word); // Word wasn't jumbled, rejumble
   return  newWord;
}

function mathQuestion(answer) {
   var max = 15;
   var question = '';
   var arg = 0;
   var numbArg = 2+Math.floor(Math.random()*2); // Random amount of arguments >= 2
   var i = 0;
   var sum = 0; // Sum of arguments
   var options = [0,1]; // + or -
   var type;
   while(i < numbArg) {
      if(sum < 0.5*max) type = 0;
      else if(sum > -0.5*max) type = 1;
      else type = options[Math.floor(Math.random()*options.length)];
      arg = 1+Math.floor(Math.random()*max);
      switch(type) {
         case 0: // +
            if(i != 0) question += ' + ';
            question += arg;
            sum += arg;
            break;
         case 1: // -
            if(i != 0) question += ' - ';
            question += arg;
            sum -= arg;
            break;
      }
      i++;
   }
   var last = answer-sum;
   if(Math.sign(last) > 0) { // Positive
      question += ' + ' + last;
   } else if (Math.sign(last) < 0) { // Negative
      question += ' - ' + Math.abs(last);
   }
   question += ' = ?'; // (' + answer + ')';
   return question;
}

function sendStatusToClient(team, client, status) {
   var message = [getTeam(0).message, getTeam(1).message];
   message[team.id] = status;
   client.send(JSON.stringify({
      type: 'status',
      data: message
   }), function ack(error) {});
}

function countDownControl(team, client) {
   if(team.timer > 0) { // Client still has control
      sendStatusToClient(team, client, 'You have control!<br>' + team.timer.toFixed(1));
      team.timer -= 0.1; // Decrease timer by 1s
      setTimeout(countDownControl, 100, team, client); // call countdown in 1s
   } else {
      team.driver = null;
      team.message = '';
      newQuestion(team);
      sendStatus();
   }
}

function victoryMessage(teamID) {
   var victoryMsg = ['',''];
   var team;
   // Broadcast to all connected clients
   wss.clients.forEach(function(client) {
      team = findTeam(client);
      victoryMsg = ['',''];
      if(teamID == team.id) { // defeated team
         victoryMsg[teamID] = 'You have been Defeated!';
      } else {
         victoryMsg[team.id] = 'You are Victorious!';
      }
      client.send(JSON.stringify({
         type: 'status',
         data: victoryMsg
      }), function ack(error) {});
   });

   setTimeout(function() {
      wss.emit('newGame');
   }, 1000);
}

function checkControl(team, client) {
   if(team.driver === client) return true;
   return false;
}

function rocketCollide(rocket) {
   var rOff = 10;
   // Check if rocket rectangle bounding box collides with wall
   // Check x
   if(rocket.x <= wall.x + wall.width && rocket.x + rOff >= wall.x) {
      // Check y
      if(rocket.y <= wall.y + wall.height && rocket.y + rOff >= wall.y) {
         broadcast({
            type: 'hit',
            data: {x:rocket.x, y:rocket.y}
         });
         return true;
      }
   }
   // Check for collision with ground
   if(rocket.y + rOff >= canvas.height - ground.height) {
      broadcast({
         type: 'miss',
         data: {x:rocket.x, y:rocket.y}
      });
      return true;
   }
   // Check if rocket has hit opponent
   return false;
}

function rocketHit(team, rocket) {
   var rOff = 10;
   // Check x
   if(rocket.x <= (team.tank.x + tank.width) &&
      (rocket.x + rOff) >= team.tank.x) {
      // Check y
      if(rocket.y >= (canvas.height - Math.round(tank.height/2)) &&
         (rocket.y + rOff) <= canvas.height) {
         if(team.health > 0) { // Target is still alive
            team.health -= tank.damage;
            // Broadcast new health
            broadcast({
               type: 'health',
               data: [getTeam(0).health, getTeam(1).health]
            });
            if(team.health <= 0) { // Target is killed
               // Reset all rockets, stops them
               getTeam(0).rocket = [];
               getTeam(1).rocket = [];
               // End the game
               endGame(team);
            } else {
               // Broadcast hit
               broadcast({
                  type: 'hit',
                  data: {x:rocket.x, y:rocket.y}
               });
            }
            return true;
         }
         return false;
      }
   }
   return false;
}

function endGame(team) {
   console.log(team.name + "'s Tank has been Killed!");
   team.health = 0;
   score[(team.id+1) % 2]++;
   broadcast({
      type: 'kill',
      data: {
         id: team.id,
         x: team.tank.x
      }
   });
   // Send victory or defeat message
   victoryMessage(team.id);
}

function updateRocket() {
   // Format output
   output = {
      type: 'rocket',
      data: [[],[]] // [[red team's rockets], [blue team's rockets]]
   };
   // New Rockets?
   var newRockets = false;
   // Check red team
   var tempRockets = getTeam(0).rocket.slice();
   tempRockets.forEach(function(rocket) {
      // !!!Detect if rockets has hit a target or wall
      // Increment rocket percentage, remove if at 100%
      rocket.t += tank.fire;
      // Strip down rocket to essential data (x,y)
      var pRocket = getBezierXY(rocket);
      if(rocket.t >= 1 ||
         rocketCollide(pRocket) ||
         rocketHit(blue_team, pRocket))
         red_team.rocket.splice(red_team.rocket.indexOf(rocket), 1);
      else {
         if(!newRockets) newRockets = true;
         output.data[red_team.id].push(pRocket);
      }
   });
   // Check blue team
   tempRockets = blue_team.rocket.slice();
   tempRockets.forEach(function(rocket) {
      // !!!Detect if rockets has hit a target or wall
      // Increment rocket percentage, remove if at 100%
      rocket.t += tank.fire;
      // Strip down rocket to essential data (x,y)
      var pRocket = getBezierXY(rocket);
      if(rocket.t >= 1 ||
         rocketCollide(pRocket) ||
         rocketHit(red_team, pRocket))
         blue_team.rocket.splice(blue_team.rocket.indexOf(rocket), 1);
      else {
         if(!newRockets) newRockets = true;
         output.data[blue_team.id].push(pRocket);
      }
   });
   // Stop sending rockets if no new rockets found
   if(!newRockets) {
      // Send and empty array to confirm no rockets
      broadcast(output);
      return null;
   }
   // Start sending rockets if not currently already sending rockets and rockets found
   return output;
}

function sendRocket() {
   var output = updateRocket();
   if(output) { // Check if rocket.data is not null
      sendingRocket = true;
      broadcast(output);
      setTimeout(sendRocket, 10);
   } else sendingRocket = false;
}

function getBezierXY(r){
   // Get x and y from Bezier defined by four(really only three) points
   var x=CubicN(r.t,r.pt[0].x,r.pt[1].x,r.pt[1].x,r.pt[2].x);
   var y=CubicN(r.t,r.pt[0].y,r.pt[1].y,r.pt[1].y,r.pt[2].y);
   return({x:x,y:y});
}

function CubicN(pct,a,b,c,d) {
   // cubic helper formula at percent distance
   var t2 = pct * pct;
   var t3 = t2 * pct;
   return a + (-a * 3 + pct * (3 * a - a * pct)) * pct
   + (3 * b + pct * (-6 * b + b * 3 * pct)) * pct
   + (c * 3 - c * 3 * pct) * t2
   + d * t3;
}

module.exports = Tanks;
