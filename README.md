# tank-gamejs
This application, Tanks is a multiplayer game that uses both javascript for the server (node.js) and client. To aid in the development of the server the following modules have been used: estatic, sanitizer and ws. The client also used style.css for formatting, index.html for the main web page and two javascripts: client.js which deals with setting up the webSocket and parsing messages from the server and canvas.js which deals with displaying the game to the HTML5 canvas.

![alt text](https://github.com/SamRodrigue/tank-gamejs/raw/master/readme/layout.png "Game Layout")

The purpose of the game is to defeat your enemy by launching rockets (cannon balls) from your tank. To gain control of your tank you must be the first player on your team to answer your team question correctly. Once you have control you will have 10 seconds to move around (arrow keys) and fire your cannon (space bar). But once you fire your cannon your turn is over.

## Instructions
To install the application run the following command from the root folder of the application:

`npm install`

Once all the modules have finished installing you can run the server by typing the following command:

`npm start` (or) `node app.js`

Once the server has started point your browser to the following url:

`http://127.0.0.1:3000` (or) `http://[servers ip]:3000`

The webpage should look like the figure above.