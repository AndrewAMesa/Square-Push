# Square-Push
This video game was created to learn React, JavaScript, CSS, and HTML. The code in the program was created with the entity-control-boundary architecture pattern in mind to format the code. The entity objects are present in the Model folder, with the main entity being the model class itself within the Model.js file. The boundary objects are both in the Boundary folder and within APP.js as the HTML elements at the bottom of the file. Finally, the controller objects are in APP.js as controller methods. These controller methods were created to complete the five use cases I determined. These use cases are located in UseCases.txt.  
<br> 
How To Play <br> 
The goal of the game is to remove all the colored squares from the board. To remove a group of colored squares, they must be positioned into a 2x2 block of the same color. They can then be removed with the x-button on the screen. To move the blocks, they can be pushed around by the character. The blocks can wrap around the board, but the characters cannot. You use the arrow buttons on the screen to move the character around the board. The board can be reset to its initial layout. Also, there are 3 board configurations available to play, with config #1 being the easiest and config #3 being the hardest.

Set Up Instructions <br>
1) Install node version 16.18, which can be found at https://nodejs.org/download/release/v16.18.0/. Ensure it is the correct version by running "node -version". <br> 
2) Next, install the node package manager by running "npm install -g create-react-app --save". <br> 
3) Then go into the location where you want to save the game and run "create-react-app YOUR_APP_NAME" which will create the react project. Replace the src folder present in the project with the src folder in this repository. <br> 
4) Then while in the react project folder that you just created run "npm start" to run the app. <br> 
