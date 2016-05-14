var msgCount = 0;
var redGuessCount = 0;
var blueGuessCount = 0;
var MAX_GUESS = 20;
var MAX_MSG = 100;
var isActive = true;

var ws = new WebSocket('ws://' + window.document.location.host);
ws.onmessage = function(input) {
   var pInput = JSON.parse(input.data);
   console.log(pInput.type);
   // Switch based on incoming message from server
   switch (pInput.type) {
      case 'new':
         welcomeMessage(pInput);
         break;
      case 'reset':
         endMessage(pInput);
         break;
      case 'message':
         addMessage(pInput);
         break;
      case 'status':
         updateStatus(pInput);
         break;
      case 'question':
         newQuestion(pInput);
         break;
      case 'guess':
         addGuess(pInput);
         break;
      case 'move':
         updateTanks(pInput); // function in canvas.js
         break;
      case 'rocket':
         updateRocket(pInput); // function in canvas.js
         break;
      case 'hit':
         rocketHit(pInput); // function in canvas.js
         break;
      case 'miss':
         rocketMiss(pInput); // function in canvas.js
         break;
      case 'health':
         updateHealth(pInput); // function in canvas.js
         break;
      case 'kill':
         killTank(pInput); // function in canvas.js
         break;
   }
};

function waitForWS(query) {
   if (ws.readyState !== ws.OPEN) {
      setTimeout(waitForWS, 500, query);
   } else query();
}

function welcomeMessage(input) {
   $('#welcome_message').html('<center>' + input.message + '</center>');
   switch(input.data[4]) { // Configure page based on team id
      case 0: // Red team
         $('#blue_guess').hide();
         break;
      case 1:
         $('#red_guess').hide();
         break;
   }
}

function endMessage(input) {
   // Hide unwanted messages
   $('#welcome_message2').hide();
   $('#welcome_image').hide();
   $('#userName').hide();
   // Set resseting message
   $('#welcome_title').html('<center>Resetting Game</center>');
   $('#welcome_message').html('<table style="width: 200px;margin:0 auto;text-align:center;"><tr><th style="color:red">' + input.data[0] + '</th><th style="color:blue">' + input.data[2] + '</th></tr><tr><td>' + input.data[1] + '</td><td>' + input.data[3] + '</th></tr></table>');
   // Show resseting message
   $('#welcome_overlay').show();

   // Reconnect to server after 10s (should be enough time for server reset)
   setTimeout(function() {
      window.document.location.reload();
   }, 10*1000);
}

function addMessage(input) {
   // Check if too many messages are in div
   msgCount++;
   if (msgCount >= MAX_MSG) {
      // Remove oldest message
      $('#messages').find('div').first().remove();
   }

   var msgDiv = $(document.createElement('div'));
   msgDiv.html(input.data[0] + ": " + input.message);
   msgDiv.addClass('wrap');
   $('#messages').append(msgDiv);
   // Scroll to bottom of chat div
   $('#messages').animate({
      scrollTop: $('#messages')[0].scrollHeight
   }, 500);
}

function sendMessage() {
   var output = {
      type: 'message',
      data: [$('#userName').val()],
      message: $('#msgBox').val()
   };
   ws.send(JSON.stringify(output));
   $('#msgBox').val('');
}

function newQuestion(input) {
   // Red guess
   if(input.data[0] !== null) {
      $('#red_quest_message').html('<center>' + input.data[0] + '</center>');
   }
   // Blue guess
   if(input.data[1] !== null) {
      $('#blue_quest_message').html('<center>' + input.data[1] + '</center>');
   }
}

function addGuess(input) {
   // Red guess
   if(input.data[0] !== null) {
      // Check if too many messages are in div
      redGuessCount++;
      if (redGuessCount >= MAX_GUESS) {
         // Remove oldest message
         $('#red_quest_status').find('div').last().remove();
      }
      $('#red_quest_status').prepend('<div><center>' + input.data[0] + '</center></div>').fadeIn('fast');
   }
   // Blue guess
   if(input.data[1] !== null) {
      // Check if too many messages are in div
      blueGuessCount++;
      if (blueGuessCount >= MAX_GUESS) {
         // Remove oldest message
         $('#blue_quest_status').find('div').last().remove();
      }
      $('#blue_quest_status').prepend('<div><center>' + input.data[1] + '</center></div>').fadeIn('fast');
   }
}

function updateStatus(input) {
   if(input.data[0] !== null) {
      $('#red_status_message').html(input.data[0]);
   }
   if(input.data[1] !== null) {
      $('#blue_status_message').html(input.data[1]);
   }
}

function handleKeyPress(event) {
   if (event.keyCode == 13) {
      sendMessage();
      return false; //don't propogate event
   }
}

function welcomeHandleKeyPress(event) {
   if (event.keyCode == 13) {
      $('#welcome_overlay').click();
      return false; //don't propogate event
   }
}

function sendGuessRed() {
   ws.send(JSON.stringify({
      type: 'guess',
      data: [$('#userName').val(), $('#red_quest_guess').val()]
   }));
   $('#red_quest_guess').val('');
}

function sendGuessBlue() {
   ws.send(JSON.stringify({
      type: 'guess',
      data: [$('#userName').val(), $('#blue_quest_guess').val()]
   }));
   $('#blue_quest_guess').val('');
}

function shake(div) {
   var interval = 100;
   var distance = 10;
   var times = 4;

   $(div).css('position', 'relative');
   for (var iter = 0; iter < (times + 1); iter++) {
      $(div).animate({
         left: ((iter % 2 == 0 ? distance : distance * -1))
      }, interval);
   } //for

   $(div).animate({
      left: 0
   }, interval);

}

// On load functions
$(function() {
   window.onfocus = function () { isActive = true; };
   window.onblur = function () { isActive = false; };
   //$('#userName').select();
   $('#welcome_overlay').click(function() {
      if ($('#userName').val()) {
         $('#welcome_overlay').hide();
         if($('#red_quest_guess').is(':visible')) {
            $('#red_quest_guess').select();
            $('#red_quest_guess').focus();
         }
         else if($('#blue_quest_guess').is(':visible')) {
            $('#blue_quest_guess').select();
            $('#blue_quest_guess').focus();
         }
      } else {
         shake($('#userName'));
         $('#userName').css('border-color', 'red');
         $('#userName').select();
      }
   });
   // Control key inputs for guesses
   $('#red_quest_guess').keydown( function(event) {
      if(event.keyCode == 13) {
         sendGuessRed();
         return false; //don't propogate event
      }
      if(event.keyCode == 32) {
         sendRocket(); // Pass space bar press as fire
         return false; // Ignore space
      }
   });
   $('#blue_quest_guess').keydown( function(event) {
      if(event.keyCode == 13) {
         sendGuessBlue();
         return false; //don't propogate event
      }
      if(event.keyCode == 32) {
         sendRocket(); // Pass space bar press as fire
         return false; // Ignore space
      }
   });

   // Stop propogation of clicks on welcome message
   $('#welcome').click(function() {
      return false;
   });
});
