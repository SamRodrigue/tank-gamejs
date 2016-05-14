/*
To run this app first execute
npm install
to load npm modules listed in package.json file

*/

var http = require('http');
var WebSocketServer = require('ws').Server;
var ecStatic = require('ecstatic');
var sanitizer = require('sanitizer');
var Tanks = require('./Tanks.js');

//static file server
var server = http.createServer(ecStatic({
   root: __dirname + '/www'
}));

var wss = new WebSocketServer({
   server: server
});
// Reference WebSocketServer to tanks module
tanks = new Tanks(wss);
// Initiate wss
wss.on('connection', function(ws) {
   // Check if player is new and add new client to a team
   var newTeam = tanks.getNextTeam();
   if(tanks.addToTeam(ws)) {
      // Send welcome messages
      ws.send(JSON.stringify({
         type: 'new',
         message: 'You will be added to the ' + newTeam.name,
         data: [tanks.getTeam(0).name, tanks.getTeam(0).player.length, tanks.getTeam(1).name, tanks.getTeam(1).player.length, newTeam.id]
      }), function ack(error) {});

      console.log('Client connected');
      console.log('Red: ' + tanks.getTeam(0).player.length + ' Blue: ' + tanks.getTeam(1).player.length);

   }
   ws.on('error', function(err){
      console.log(err)
   });
   // Parse message from client
   ws.on('message', function(input) {
      var pInput = JSON.parse(input);
      // Switch based on incoming message from server
      switch(pInput.type) {
         case 'message':
            // Sanitize user name and message
            // Sanitize and shrink and echo chat message to all connected users
            pInput.data[0] = sanitizer.escape(pInput.data[0]);
            if(pInput.data[0].length > 25) pInput.data[0] = pInput.data[0].substr(0,25);
            pInput.message = sanitizer.escape(pInput.message);
            if(pInput.message.length > 250) pInput.message = pInput.message.substr(0,250);
            if(pInput.message.length > 0 && pInput.message !== null) tanks.broadcast(pInput); // Broadcast message if not empty
            break;
         case 'guess':
            // Sanitize user name
            pInput.data[0] = sanitizer.escape(pInput.data[0]);
            if(pInput.data[0].length > 25) pInput.data[0] = pInput.data[0].substr(0,25);
            // Sanitize guess
            pInput.data[1] = sanitizer.escape(pInput.data[1]);
            if(pInput.data[1].length > 35) pInput.data[1] = pInput.data[1].substr(0,35);
            if(pInput.data[1].length > 0 && pInput.data[1] !== null) {
               tanks.checkGuess({
                  client: ws,
                  guess: pInput.data[1],
                  name: pInput.data[0]
               });
            }
            break;
         case 'move':
            tanks.moveTank({
               client: ws,
               message: pInput
            });
            break;
         case 'update':
            tanks.sendTank(ws);
            tanks.sendHealth(ws);
            tanks.sendQuestion(ws);
            break;
         case 'fire':
            tanks.addRocket({
               client: ws,
               message: pInput
            });
            break;
      }
   });
   ws.on('close', function() {
      tanks.removeFromTeam(ws);
      console.log('Client disconnected');
   });
});

wss.on('newGame', function() {
   console.log('New Game');
   tanks.reset();
});

server.listen(3000);
console.log('Server Running at http://127.0.0.1:3000  CNTL-C to quit');
