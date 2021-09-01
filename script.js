const app = {
  // boats: [{name:'carrier', length: 5}, {name: 'battleship', length: 4}, {name: 'cruiser', length: 3}, {name: 'submarine', length: 3}, {name: 'destroyer', length: 2}],
};

app.columnArray = ["a","b","c","d","e","f","g","h","i","j"];


app.player1Boats = {
  carrier: [5, 0],
  battleship: [4, 0],
  cruiser: [3, 0],
  submarine: [3, 0],
  destroyer: [2, 0]
};
app.player2Boats = {
  carrier: [5, 0],
  battleship: [4, 0],
  cruiser: [3, 0],
  submarine: [3, 0],
  destroyer: [2, 0]
};

app.gameOver = {
  finished: false,
  player: ''
};

app.computersGuess = {
  guess: '',
  column:'',
  row: 0,
  position: 0
};

app.computerHit = {
  hit: false,
  guess: '',
  left: false,
  right: false,
  up: false,
  down: false
};

app.previousHitArray = [];

app.player1Guesses = [];

app.player2Guesses = [];


app.resetForms = () => {
  //reset all forms for setting boats
  app.setCarrierInput = $("#setCarrier").val('');
  app.setCarrierRadioButtons = $('input[name="carrierDirection"]').prop('checked', false);

  app.setBattleshipInpuit = $('#setBattleship').val('');

  app.setBattleshipRadioButtons = $('input[name="battleshipDirection"]').prop('checked', false);

  app.setCruiserInput = $('#setCruiser').val('');
  app.setCruiserRadioButtons = $('input[name="cruiserDirection"]').prop('checked', false);

  app.setSubmarineInput = $('#setSubmarine').val('');
  app.setSubmarineRadioButtons = $('input[name="submarineDirection"]').prop('checked', false);

  app.setDestroyerInput = $('#setDestroyer').val('');
  app.setDestroyerRadioButttons = $('input[name="destroyerDirection"]').prop('checked', false);

  app.gamePlayForm = $('input[name="playersGuess"]').val('');
};//end of resetFroms function

app.setBoats = (player, callback) => {
// ask player what square they would like to set their boat in
// ask if they want the boat set vertically or horizontal
//check if square is already occuppied
// if not, change class to occuppied
//repeat for each boat

  app.inputDiv = $('.input').prepend(`<h3>${app.userName}. Let's set your boats</h3>`);


  // show h3 and first of the boat forms
  app.inputH3Element = $('.input h3').show();
  app.setFormElements = $('form[name="setCarrierForm"]').show();
  
  app.setCarrierForm = $('form[name="setCarrierForm"]').on('submit', function(e) {
    // when the user clicks on the submit button: 
    // assign value to a variable
    let startingPosition = $('#setCarrier').val();
    // check that the variable is a valid entry
    let carrierPositionValid = app.checkEntryIsValid(startingPosition);
    
    if (!carrierPositionValid[0]){
      // if not a valid entry
      // reset carrier form and prompt for input again
      app.setCarrierInput = $('#setCarrier').val('');
      app.setCarrierRadioButtons = $('input[name="carrierDirection"]').prop('checked', false);
      
      e.preventDefault();

    } else {
      // startingPosition is valid
      // check if direction is vertical or horizontal
      // will default to horizontal if no button selected
      startingPosition = carrierPositionValid[1];
      let carrierDirection = $('input[name="carrierDirection"][type="radio"]:checked').val();
      let carrierVertical = app.checkBoatDirection(carrierDirection);
  
      // set the carrier
      // startingPosition, vertical, boatLength
      let carrierPosition = [startingPosition, carrierVertical, 5];
  
      console.log (carrierPosition);
  
      let continueGame = app.placeOnBoard(carrierPosition, player, 'carrier');
  
      if (!continueGame) {
        // reset carrier form and prompt for input again
        app.setCarrierInput = $('#setCarrier').val('');
        app.setCarrierRadioButtons = $('input[name="carrierDirection"]').prop('checked', false);
        
        e.preventDefault();
        
      } else {
        // Carrier successfully placed
        // disable  setCarrier button and show form for Battleship
        
        app.setCarrierButton = $('#submitCarrier').attr('disabled', true);
        
        app.setFormElements = $('form[name="setBattleshipForm"]').show();
      };
    };
  });

  app.setBattleshipButton = $('#submitBattleship').on('click', function (e){

    e.preventDefault();
    

    // when the user clicks on the submit button: 
    //    set the Battleship
    let battleshipPosition = app.setBattleship();

    let continueGame = app.placeOnBoard(battleshipPosition, player, 'battleship');

    while (!continueGame) {
      // reset form and prompt for input again
      app.setBattleshipInput = $('#setBattleship').val('');
      app.setBattleshipRadioButtons = $('input[name="battleshipDirection"]').prop('checked', false);

      battleshipPosition = app.setBattleship();

      continueGame = app.placeOnBoard(battleshipPosition, player, 'battleship');
    };

    app.setBattleshipButton = $('#submitBattleship').attr('disabled', true);

    app.setFormElements = $('form[name="setCruiserForm"]').show();
  });

  app.setCruiserButton = $('#submitCruiser').on('click', function (e){

    e.preventDefault();

    let cruiserPosition = app.setCruiser();

    let continueGame = app.placeOnBoard(cruiserPosition, player, 'cruiser');

    while (!continueGame){
      // reset form and prompt for input again
      app.setCruiserInput = $('#setCruiser').val('');
      app.setCruiserRadioButtons = $('input[name="cruiserDirection"]').prop('checked', false);

      cruiserPosition = app.setCruiser();

      continueGame = app.placeOnBoard(cruiserPosition, player, 'cruiser');
    };
   

    app.setCruiserButton = $('#submitCruiser').attr('disabled', true);

    app.setFormElements = $('form[name="setSubmarineForm"]').show();

    return false;
  });

  app.setSubmarineButton = $('#submitSubmarine').on('click', function (e){

    e.preventDefault();

    let submarinePosition = app.setSubmarine();

    let continueGame = app.placeOnBoard(submarinePosition, player, 'submarine');

    while (!continueGame){
      // reset form and prompt for input again
      app.setSubmarineInput = $('#setSubmarine').val('');
      app.setSubmarineRadioButtons = $('input[name="submarineDirection"]').prop('checked', false);

      submarinePosition = app.setSubmarine();

      continueGame = app.placeOnBoard(submarinePosition, player, 'submarine');
    };

    app.setSubmarineButton = $('#submitSubmarine').attr('disabled', true);

    app.setFormElements = $('form[name="setDestroyerForm"]').show();
  });

  app.setDestroyerButton = $('#submitDestroyer').on('click', function (e){

    e.preventDefault();

    let destroyerPosition = app.setDestroyer();

    let continueGame = app.placeOnBoard(destroyerPosition, player, 'destroyer');

    while (!continueGame){
      // reset form and prompt for input again
      app.setDestroyerInput = $('#setDestroyer').val('');
      app.setDestroyerRadioButtons = $('input[name="destroyerDirection"]').prop('checked', false);

      destroyerPosition = app.setDestroyer();

      continueGame = app.placeOnBoard(destroyerPosition, player, 'destroyer');
    };

    app.setDestroyerButton = $('#submitDestroyer').attr('disabled', true);

    //hide player1's forms for setting boats
    app.setFormElements = $('.setForm').hide();
    app.inputH3Element = $('.input h3').hide();

    // add text and button to start game div
    app.inputDiv = $('.startGame').prepend(`<h3>Let's go!</h3>`);
    app.startGameButton = $('#startGame').show();

    callback();
  });

  //commented code below is for using prompt to get user input for setting boats
  //prompt box blocked the game board though so wasn't ideal
  // for (let i = 0; i < app.boats.length; i++){
  
  //   startingPosition = prompt(`Where would you like to set your ${app.boats[i].name} (${app.boats[i].length} tiles)? Select the starting square (eg. F4)`);
    
  //   startingPosition = startingPosition.toLowerCase();
  //   startingPosition = '.' + startingPosition;
    
  //   let boatLength = app.boats[i].length;
    
  //   direction = prompt('Would you like to place it vertically or horizontally? (v/h)');
  //   direction = direction.toLowerCase();

  //   if (direction === 'v'){
  //     vertical = true;
  //   }else {
  //     vertical = false;
  //   };

  //   console.log(startingPosition, direction, vertical)
  //   app.placeOnBoard(startingPosition, boatLength, vertical, player);
  //   app.inputDiv = $('.input').append(`<p>${app.boats[i].name}  - Placed</p>`);
  // };

}; // end of app.setBoats function

app.setCarrier = () => {
  //    assign the text field to variable startingPosition
  //    asssign variable vertical true or false depending on the radio button value

  let vertical = true;

  let startingPosition = $('#setCarrier').val();
  
  startingPosition = app.checkEntryIsValid(startingPosition);
  
  if (!startingPosition){
    app.setCarrierInput = $('#setCarrier').val('');
  }
  
  const direction = $('input[name="carrierDirection"][type="radio"]:checked').val();

  if (direction === 'carrierVertical'){
    vertical = true;
  } else {
    vertical = false;
  }
  
  const boatLength = 5;

  console.log(startingPosition, direction, vertical)

  return [startingPosition, vertical, boatLength];
}; //end of app.setCarrier function


app.setBattleship = () => {
  //    assign the text field to variable startingPosition
  //    asssign variable vertical true or false depending on the radio button value

  let vertical = true;

  let startingPosition = $('#setBattleship').val();
  startingPosition = '.' + startingPosition.toLowerCase();
  
  const direction = $('input[name="battleshipDirection"][type="radio"]:checked').val();

  if (direction === 'battleshipVertical'){
    vertical = true;
  } else {
    vertical = false;
  }
  
  const boatLength = 4;

  console.log(startingPosition, direction, vertical)


  return [startingPosition, vertical, boatLength];
}; //end of setBattleship function

app.setCruiser = () => {
  //    assign the text field to variable startingPosition
  //    asssign variable vertical true or false depending on the radio button value

  console.log('setcruiser app called');

  let vertical = true;

  let startingPosition = $('#setCruiser').val();
  startingPosition = '.' + startingPosition.toLowerCase();
  
  const direction = $('input[name="cruiserDirection"][type="radio"]:checked').val();

  if (direction === 'cruiserVertical'){
    vertical = true;
  } else {
    vertical = false;
  }
  
  const boatLength = 3;

  console.log(startingPosition, direction, vertical);


  return [startingPosition, vertical, boatLength];
}; //end of setCruiser function

app.setSubmarine = () => {
  //    assign the text field to variable startingPosition
  //    asssign variable vertical true or false depending on the radio button value

  let vertical = true;

  let startingPosition = $('#setSubmarine').val();
  startingPosition = '.' + startingPosition.toLowerCase();
  
  const direction = $('input[name="submarineDirection"][type="radio"]:checked').val();

  if (direction === 'submarineVertical'){
    vertical = true;
  } else {
    vertical = false;
  }
  
  const boatLength = 3;

  console.log(startingPosition, direction, vertical)


  return [startingPosition, vertical, boatLength];
}; //end of setSubmarine function

app.setDestroyer = () => {
  //    assign the text field to variable startingPosition
  //    asssign variable vertical true or false depending on the radio button value

  let vertical = true;

  let startingPosition = $('#setDestroyer').val();
  startingPosition = '.' + startingPosition.toLowerCase();
  
  const direction = $('input[name="destroyerDirection"][type="radio"]:checked').val();

  if (direction === 'destroyerVertical'){
    vertical = true;
  } else {
    vertical = false;
  }
  
  const boatLength = 2;

  console.log(startingPosition, direction, vertical)


  return [startingPosition, vertical, boatLength];
}; // end of setDestroyer function

app.checkEntryIsValid = (startingPosition) => {
  // check that the value entered is a valid square (a-j and 1-10)

  startingPosition = startingPosition.toLowerCase();

  let row = startingPosition[1];
  if (startingPosition.length === 3){
    row = startingPosition[1].concat(startingPosition[2]);
  };
  // check that row is a number
  const validRow = !isNaN(row);

  if (!app.columnArray.includes(startingPosition[0]) || !validRow || row < 1 || row > 10 || startingPosition.length > 3 || startingPosition.length < 2){
    alert('Sorry. That is not a valid square. Please try again.');
    return [false, startingPosition];
  } else {
    startingPosition = '.' + startingPosition;
    return [true, startingPosition];
  };
}; // end of app.checkEntryIsValid

app.checkBoatDirection = (direction) => {
  // checks if direction is vertical or horizontal
  let vertical = true;

  if (direction === 'vertical'){
    vertical = true;
  } else {
    vertical = false;
  };
  return vertical;
};

app.placeOnBoard = (shipArray, player, boatName) => {
  // takes 2 parameters, shipArray[startingPosition, vertical, boatLength] & player (player1 or player2)
  //find the div that matches startingPosition and add class occuppied
  // separate string of startingPosition into row (number) and column (letter)
  // starting from startingPosition, and based on vertical true/false, make sure the boat will fit inside gameboard using boatlength

  
  const startingPosition = shipArray[0];
  let position = shipArray[0];
  const positionArray = position.split('');
  let column = positionArray[1];
  let convertedRow = 1;
 
  if (positionArray.length === 3){
    convertedRow = parseInt(positionArray[2]);
  }else {
    const row = positionArray[2] + positionArray[3]
    convertedRow = parseInt(row);
  }

  // turn column from a letter into a number
  // loop through 1-10 checking against alphabet

  const convertedColumn = app.columnArray.indexOf(column) + 1;

  //check that the length of the boat won't put it outside of the playing area
  //change class of squares to occuppied 
  const vertical = shipArray[1]; 
  const boatLength = shipArray[2];

  if (vertical && (convertedRow + (boatLength -1)) <=10){
    console.log('assigning occupied to boat in column');

    // checks if any of the squares already have class 'occuppied'
    // if yes, returns false and quits function
    for (let a = 0; a < boatLength; a++){
      if ($(`${player}.${column}${convertedRow + a}`).hasClass('occuppied')){
        alert('Oops! That boat overlaps another. Please try again.');
        return false;
      };
    };
    // adds class 'occuppied' to each of the squares
    $(`${player}${startingPosition}`).addClass(`occuppied ${boatName}`);
    for (let i = 1; i < boatLength; i++){
     $(`${player}.${column}${convertedRow + i}`).addClass(`occuppied ${boatName}`);
    };
    return true;
  }else if (!vertical && (convertedColumn + (boatLength - 1)) <= 10){
    // assigning occupied to boat in row

     // checks if any of the squares already have class 'occuppied'
    // if yes, returns false and quits function
    for (let b = 0; b < boatLength -1; b++){
      column = app.columnArray[convertedColumn + b];

      if ($(`${player}.${column}${convertedRow}`).hasClass('occuppied')){
        alert('Oops! That boat overlaps another. Please try again.');
        return false;
      };
    };

    // adds class 'occuppied' to each of the squares
    $(`${player}${startingPosition}`).addClass(`occuppied ${boatName}`);
    for (let j = 0; j < boatLength -1; j++){
      column = app.columnArray[convertedColumn + j];

      $(`${player}.${column}${convertedRow}`).addClass(`occuppied ${boatName}`);
    }; 
    return true;
  }else {
    // condition for when boat length will be outside of the board dimensions
    alert('The boat does not fit inside the board in that direction. Please try again')
    return false;
  };
};// end of placeOnBoard function


app.setComputersBoats =  () => {
  //set the computer's boats
  // get boatlength from array
  const boatArray = [['carrier', 5], ['battleship', 4], ['cruiser', 3], ['submarine', 3], ['destroyer', 2]];

  for (let a = 0; a < 5; a++){
    // generate a starting position
    let column = app.columnArray[Math.floor(Math.random() * 10)];
    let row = Math.floor(Math.random() * 10) + 1;

    // generate true/false for vertical
    let vertical = Math.random() < 0.5;


    // call placeOnBoard function (new function for computer)
    // repeat for each boat in array
    // if there is an overlap in placeOnBoard get new starting position and try again until no overlap

    let continueGame = app.placeOnComputersBoard(column, row, vertical, boatArray[a][1], boatArray[a][0]);

    while (!continueGame) {
      // generate new column and row and vertical and try again until boat can be set on board
      // generate a starting position
      let column = app.columnArray[Math.floor(Math.random() * 10)];
      let row = Math.floor(Math.random() * 10) + 1;

      // generate true/false for vertical
      let vertical = Math.random() < 0.5;
    
      continueGame = app.placeOnComputersBoard(column, row, vertical, boatArray[a][1], boatArray[a][0]);
    };
  };
}; // end of app.setComputersBoats

app.placeOnComputersBoard = (column, row, vertical, boatLength, boatName) => {
  // convert letter of column to number
  const convertedColumn = app.columnArray.indexOf(column) + 1;

  if (vertical && (row + boatLength) <=10){
    //assigning occuppied to boat in a column
     // checks if any of the squares already have class 'occuppied'
    // if yes, returns false and quits function
    for (let a = 0; a < boatLength; a++){
      if ($(`.player2.${column}${row + a}`).hasClass('occuppied')){
        return false;
      };
    };
    // adds class 'occuppied' to each of the squares
    for (let i = 0; i < boatLength; i++){
      $(`.player2.${column}${row + i}`).addClass(`occuppied ${boatName}`);
      console.log(column, row +i, boatLength)
    };
    return true;
  }else if (!vertical && (convertedColumn + boatLength) <= 10){
      // assigning occupied to boat in row
      // checks if any of the squares already have class 'occuppied'
      // if yes, returns false and quits function
      for (let b = 0; b < boatLength; b++){
        column = app.columnArray[convertedColumn + b];

        if ($(`.player2.${column}${row}`).hasClass('occuppied')){
          return false;
        };
      };

      // adds class 'occuppied' to each of the squares
      for (let j = 0; j < boatLength; j++){
        column = app.columnArray[convertedColumn + j];

        $(`.player2.${column}${row}`).addClass(`occuppied ${boatName}`);
      }; 
      return true;
  }else {
     // condition for when boat length will be outside of the board dimensions
     return false;
  };
}; //end of app.placeOnComputersBoard


app.gamePlay = () => {

    // when user submits guess, assign value of input to variable
    let playersGuess = $('#playersGuess').val();
    playersGuess = playersGuess.toLowerCase();
    
    //check if the square was already guessed
    if (app.player1Guesses.includes(playersGuess)){
      app.playersGuessInput = $('#playersGuess').val('');
      alert('That square was already guessed. Please try again.');
      return; 
    }else {
      // add guess to player1Guesses array
      app.player1Guesses.push(playersGuess);
    };
    // check if the square is occuppied
    app.gameOver.finished = app.checkGuess(playersGuess, '.player2');
    app.gameOver.player = '.player1';


    // computer's turn
    if (!app.gameOver.finished){
      // clear previous value of the user's text entry
      playersGuess = $('#playersGuess').val('');
      alert("It's the computer's turn.");
      
      // check if the computer had a hit with the last guess
      if (app.computerHit.hit){
        //if the previous guess was a hit create a new object and save it in an array
        console.log(`There was a previous hit by the computer`);

        if (app.computerHit.guess === app.computersGuess.guess){
          app.previousHit = Object.create(app.computerHit);
          app.previousHitArray.push(app.previousHit);
          console.log(`${app.computersGuess.guess} pushed to previousHitArray`);
        };

        // assign column, row and position with values of previous hit
        if (app.computerHit.guess.length === 2){
          app.computersGuess.column = app.computerHit.guess[0];
          const row = app.computerHit.guess[1];
          console.log(`row is type of ${typeof(row)}`);
          if (typeof(row) === 'number'){
            app.computersGuess.row = row;
          }else {
            app.computersGuess.row = parseInt(row);
          };
          console.log(`column is ${app.computersGuess.column} and row is ${app.computersGuess.row} row is type of ${typeof(app.computersGuess.row)}`);
        }else {
          app.computersGuess.column = app.computerHit.guess[0];
          const concatRow = app.computerHit.guess[1].concat(app.computerHit.guess[2]);
          app.computersGuess.row = parseInt(concatRow);
          console.log(`column is ${app.computersGuess.column} and row is ${app.computersGuess.row} row is type of ${typeof(app.computersGuess.row)}`);
        };
        console.log(`${app.computersGuess.column}${app.computersGuess.row} was the previous guess by the computer` );

        app.computersGuess.position = app.columnArray.indexOf(app.computersGuess.column);

        console.log(app.computerHit.up, app.computerHit.down, app.computerHit.left, app.computerHit.right);

        // check which direction to guess next
        if (!app.computerHit.up && !app.computerHit.down && !app.computerHit.left && !app.computerHit.right){
          console.log(`All directions should be false `);

          //if no guesses, it was the first hit
          //check square above
          if (app.computersGuess.row > 1 && !app.player2Guesses.includes(`${app.computersGuess.column}${app.computersGuess.row - 1}`)){
            //if not first row and not a previous guess
            app.computersGuess.row -= 1;
            app.computerHit.up = true;
          } else {
            // can't check square above
            app.computerHit.up = true;
            // check square below
            if (!app.player2Guesses.includes(`${app.computersGuess.column}${app.computersGuess.row + 1}`)){
              // make sure not already guessed
              app.computersGuess.row += 1;
              app.computerHit.down = true;
            }else{
              // check left
              // check not already guessed
              if (!app.player2Guesses.includes(`${app.columnArray[app.computersGuess.position - 1]}${app.computersGuess.row}`)){
                // check is not first column
                if (app.computersGuess.column !== 'a'){
                  app.computersGuess.column = app.columnArray[app.computersGuess.position - 1];
                }else {
                  // can't check square to the left
                  app.computerHit.left = true;
                  // need to check squares to the right 
                  app.computersGuess.column = app.columnArray[app.computersGuess.position + 1];
                  app.computerHit.right = true;
                };
              };
            };
          };
        }else if (app.computerHit.up && !app.computerHit.down){
          console.log(`computerHit.up is true down is false. Check square above`);
          // check square above was not already guessed
          if (app.computersGuess.row > 1 && !app.player2Guesses.includes(`${app.computersGuess.column}${app.computersGuess.row - 1}`)){
            app.computersGuess.row -= 1;
          }else {
            // can't check square above
            // square below is a hit
            // need to check squares below until last in prevousHitArray
            app.previousHitArray.forEach(element => {
              app.computersGuess.row = element.row + 1;
              app.computerHit.down = true;
            });
            // if square was not guessed, can proceed with values of row and column
            // if square was previously guessed, can't check down
            if (app.player2Guesses.includes(`${app.computersGuess.column}${app.computersGuess.row}`)){
              // check square to left of last hit in the previous hit array
              app.computersGuess.row -= 1;
              if (app.computersGuess.column !== 'a' && !app.player2Guesses.includes(`${app.columnArray[app.computersGuess.position - 1]}${app.computersGuess.row}`)){
                app.computersGuess.column = app.columnArray[app.computersGuess.position - 1];
                app.computerHit.left = true;
              }else {
                // can't check square to the left
                app.computerHit.left = true;
                // need to check squares to the right 
                app.computersGuess.column = app.columnArray[app.computersGuess.position + 1];
                app.computerHit.right = true;
              };
            };
          };
        }else if (app.computerHit.up && app.computerHit.down && !app.computerHit.left){
          console.log(`computerHit.up and down are true, left is false. Check square below`);
          // check square below
          if (app.computersGuess.row < 10 && !app.player2Guesses.includes(`${app.computersGuess.column}${app.computersGuess.row + 1}`)){
            // is not last row and was not previously guessed check row below
            // down already true
            app.computersGuess.row += 1;
          }else {
            // if square is in the last row or was previously guessed
            // squares above already checked
            // need to check square to the left
            if (app.computersGuess.column !== 'a' && !app.player2Guesses.includes(`${app.columnArray[app.computersGuess.position - 1]}${app.computersGuess.row}`)){
              //square is not in last row and square to left has not been checked
              app.computersGuess.column = app.columnArray[app.computersGuess.position - 1];
              app.computerHit.left = true;
            }else {
              // can't check square to the left
              app.computerHit.left = true;
              // need to check square to the right 
              app.computersGuess.column = app.columnArray[app.computersGuess.position + 1];
              app.computerHit.right = true;
            };
          };
        }else if (app.computerHit.up && app.computerHit.down && app.computerHit.left && !app.computerHit.right){
          console.log(`computerHit.up, down and left are true, right is false. Check square to left`);
          //check square to the left
          if (app.computersGuess.column !== 'a' && !app.player2Guesses.includes(`${app.columnArray[app.computersGuess.position - 1]}${app.computersGuess.row}`)){
            // square to left was not previously guesssed
            // left already true
            app.computersGuess.column = app.columnArray[app.computersGuess.position - 1];
          }else {
            // can't check square to the left
            // check square to right
            app.computersGuess.column = app.columnArray[app.computersGuess.position + 1];
              app.computerHit.right = true; 
          };
        }else if (app.computerHit.up && app.computerHit.down && app.computerHit.left && app.computerHit.right){
          console.log(`computerHit.up,down, left and right are true. Check square to right`);
          // check square to right
          // right already true
            app.computersGuess.column = app.columnArray[app.computersGuess.position + 1];
        };
      }else {
        // if no previous hit, generate a random row and column for computer
        app.computersGuess.column = app.columnArray[Math.floor(Math.random() * 10)];
        app.computersGuess.row = Math.floor(Math.random() * 10) + 1;
        // check if this was already guessed
        while (app.player2Guesses.includes(`${app.computersGuess.column}${app.computersGuess.row}`)){
          app.computersGuess.column = app.columnArray[Math.floor(Math.random() * 10)];
          app.computersGuess.row = Math.floor(Math.random() * 10) + 1;
        };
      };

      //assign column and row to variable
      app.computersGuess.guess = `${app.computersGuess.column}${app.computersGuess.row}`; 
      
      console.log(`${app.computersGuess.guess} is the computer's guess`);

      // add the guess to the player2Guesses array
      app.player2Guesses.push(app.computersGuess.guess);

      console.log(`The computer's guesses array contains: ${app.player2Guesses}`);

      // pass the computersGuess to function
      app.gameOver.finished = app.checkGuess(app.computersGuess.guess, '.player1');

      // change player to player2
      app.gameOver.player = '.player2';
    };
  // });
};//end of app.gamePlay

app.checkGuess = (playersGuess, playerBeingAttacked) => {
  // if square is occuppied, change colour of square (NOTE: color is not changing; need to check CSS) and add bomb image; also, keep track of how many hits the boat has taken 
  // if not occuppied, change colour of square to show miss
  let continueGame = true;

  if ($(`.${playersGuess}${playerBeingAttacked}`).hasClass("occuppied")){
    $(`.${playersGuess}${playerBeingAttacked}`).addClass('hit');
    $(`.${playersGuess}${playerBeingAttacked}`).prepend('<i class="fas fa-bomb"></i>');

    console.log (`.${playersGuess}${playerBeingAttacked} is a hit`);

    if (playerBeingAttacked === '.player2'){
      //user attacking the computer
      if($(`.${playersGuess}${playerBeingAttacked}`).hasClass('carrier')){
        app.player2Boats.carrier[1] += 1;
        console.log(`player2's carrier has ${app.player2Boats.carrier[1]} hits`);

        if (app.player2Boats.carrier[1] === app.player2Boats.carrier[0]){
          alert('You sunk their carrier!');

        };
      }else if ($(`.${playersGuess}${playerBeingAttacked}`).hasClass('battleship')){
        app.player2Boats.battleship[1] += 1;
        console.log(`player2's battleship has ${app.player2Boats.battleship[1]} hits`);

        if (app.player2Boats.battleship[1] === app.player2Boats.battleship[0]){
          alert('You sunk their battleship!');
        };
      }else if ($(`.${playersGuess}${playerBeingAttacked}`).hasClass('cruiser')){
        app.player2Boats.cruiser[1] += 1;
        console.log(`player2's cruiser has ${app.player2Boats.cruiser[1]} hits`);

        if (app.player2Boats.cruiser[1] === app.player2Boats.cruiser[0]){
          alert('You sunk their cruiser!');
        };
      }else if ($(`.${playersGuess}${playerBeingAttacked}`).hasClass('submarine')){
        app.player2Boats.submarine[1] += 1;
        console.log(`player2's submarine has ${app.player2Boats.submarine[1]} hits`);

        if (app.player2Boats.submarine[1] === app.player2Boats.submarine[0]){
          alert('You sunk their submarine!');
        };
      }else {
        app.player2Boats.destroyer[1] += 1;
        console.log(`player2's destroyer has ${app.player2Boats.destroyer[1]} hits`);

        if (app.player2Boats.destroyer[1] === app.player2Boats.destroyer[0]){
          alert('You sunk their destroyer!');
        };
      };
    }else {
      //computer attacking user
      // track the space that was hit by the computer
      app.computerHit.hit = true;
      app.computerHit.guess = playersGuess;

      // check which type of boat was hit and track the number of hits
      // check if the boat was sunk
      if($(`.${playersGuess}${playerBeingAttacked}`).hasClass('carrier')){
        app.player1Boats.carrier[1] += 1;
        console.log(`player1's carrier has ${app.player1Boats.carrier[1]} hits`);

        if (app.player1Boats.carrier[1] === app.player1Boats.carrier[0]){
          alert('They sunk your carrier!');
          // remove any previous hits with class carrier
          app.previousHitArray.forEach(element => {
            if ($(`.${element.guess}`).hasClass('carrier')){
              app.previousHitArray.splice(element);

              console.log(`${element.guess} was removed from previousHitArray.`);
            };
          });
          console.log(`There are now ${app.previousHitArray.length} hits in previousHitArray`);

          //check if there are still any previous hits
          app.checkRemainingPreviousHitArray();
        };
      }else if ($(`.${playersGuess}${playerBeingAttacked}`).hasClass('battleship')){
        app.player1Boats.battleship[1] += 1;
        console.log(`player1's battleship has ${app.player1Boats.battleship[1]} hits`);

        if (app.player1Boats.battleship[1] === app.player1Boats.battleship[0]){
          alert('They sunk your battleship!');
          // remove any previous hits with class battleship
          app.previousHitArray.forEach(element => {
            if ($(`.${element.guess}`).hasClass('battleship')){
              app.previousHitArray.splice(element);

              console.log(`${element.guess} was removed from previousHitArray.`);
            };
          });
          console.log(`There are now ${app.previousHitArray.length} hits in previousHitArray`);

          //check if there are still any previous hits
          app.checkRemainingPreviousHitArray();
        };
      }else if ($(`.${playersGuess}${playerBeingAttacked}`).hasClass('cruiser')){
        app.player1Boats.cruiser[1] += 1;
        console.log(`player1's cruiser has ${app.player1Boats.cruiser[1]} hits`);

        if (app.player1Boats.cruiser[1] === app.player1Boats.cruiser[0]){
          alert('They sunk your cruiser!');
          // remove any previous hits with class cruiser
          app.previousHitArray.forEach(element => {
            if ($(`.${element.guess}`).hasClass('cruiser')){
              app.previousHitArray.splice(element);

              console.log(`${element.guess} was removed from previousHitArray.`);
            };
          });
          console.log(`There are now ${app.previousHitArray.length} hits in previousHitArray`);
          //check if there are still any previous hits
          app.checkRemainingPreviousHitArray();
        };
      }else if ($(`.${playersGuess}${playerBeingAttacked}`).hasClass('submarine')){
        app.player1Boats.submarine[1] += 1;
        console.log(`player1's submarine has ${app.player1Boats.submarine[1]} hits`);

        if (app.player1Boats.submarine[1] === app.player1Boats.submarine[0]){
          alert('They sunk your submarine!');
          // remove any previous hits with class submarine
          app.previousHitArray.forEach(element => {
            if ($(`.${element.guess}`).hasClass('submarine')){
              app.previousHitArray.splice(element);

              console.log(`${element.guess} was removed from previousHitArray.`);
            };
          });
          console.log(`There are now ${app.previousHitArray.length} hits in previousHitArray`);

          //check if there are still any previous hits
          app.checkRemainingPreviousHitArray();
        };
      }else {
        app.player1Boats.destroyer[1] += 1;
        console.log(`player1's destroyer has ${app.player1Boats.destroyer[1]} hits`);

        if (app.player1Boats.destroyer[1] === app.player1Boats.destroyer[0]){
          alert('They sunk your destroyer!');
          // remove any previous hits with class destroyer
          app.previousHitArray.forEach(element => {
            if ($(`.${element.guess}`).hasClass('destroyer')){
              app.previousHitArray.splice(element);

              console.log(`${element.guess} was removed from previousHitArray.`);
            };

          });
          console.log(`There are now ${app.previousHitArray.length} hits in previousHitArray`);

          //check if there are still any previous hits
          app.checkRemainingPreviousHitArray();
        };
      };
    };
    // check if game should continue 
    continueGame = app.checkAllBoatsSunk(playerBeingAttacked);

    console.log(`the game will continue ${continueGame}`);
  }else {
    // the guess was a miss
    // add class miss to the square
    $(`.${playersGuess}${playerBeingAttacked}`).addClass('miss');

    console.log(`.${playersGuess} on ${playerBeingAttacked}'s board is a miss`);

    // if there is a hit but this guess was a miss, change the value on the next direction to check (only for the computer)
    if (app.computerHit.hit && playerBeingAttacked === '.player1'){
      if (!app.computerHit.down){
        app.computerHit.down = true;
        console.log(`computerHit.down changed to true`);
      }else if (!app.computerHit.left){
        app.computerHit.left = true;
        console.log(`computerHit.left changed to true`);
      }else if (!app.computerHit.right){
        app.computerHit.right = true;
        console.log(`computerHit.right changed to true`);
      }
    }
  };
  if (continueGame){
    return false;
  }else{
    return true;
  };
};// end of app.checkGuess

app.checkRemainingPreviousHitArray = () => {
  // checks if there are any elements left in previousHitArray
  if (app.previousHitArray.length > 0){
    // change computerHit to last element in array
    app.computerHit = app.previousHitArray[app.previousHitArray.length - 1];
  }else {
    // if no previous hits, change value of app.computerHit to false and empty
    app.computerHit.hit = false;
    app.computerHit.guess = '';
    app.computerHit.up = false;
    app.computerHit.down = false;
    app.computerHit.left = false;
    app.computerHit.right = false;
    console.log('ComputerHit is now false');
  };
};

app.checkAllBoatsSunk = (player) => {
  //check if all player's boats are sunk
  if (player === '.player1'){
    if (app.player1Boats.carrier[1] === app.player1Boats.carrier[0] && app.player1Boats.battleship[1] === app.player1Boats.battleship[0] && app.player1Boats.cruiser[1] === app.player1Boats.cruiser[0] && app.player1Boats.submarine[1] === app.player1Boats.submarine[0] && app.player1Boats.destroyer[1] === app.player1Boats.destroyer[0]){
      alert('Game over!!!!!!');
      return false
    }else {
      return true
    };
  }else {
    if (app.player2Boats.carrier[1] === app.player2Boats.carrier[0] && app.player2Boats.battleship[1] === app.player2Boats.battleship[0] && app.player2Boats.cruiser[1] === app.player2Boats.cruiser[0] && app.player2Boats.submarine[1] === app.player2Boats.submarine[0] && app.player2Boats.destroyer[1] === app.player2Boats.destroyer[0]){
      alert('Game over!!!!!!');
      return false
    }else {
      return true
    };
  };
};


app.init = () => {
  // Hide h3 and forms for setting boats
  app.inputH3Element = $('.input h3').hide();
  app.setFormElements = $('.setForm').hide();
  app.startGameButton = $('#startGame').hide();
  app.gamePlayDiv = $('.gamePlay').hide();
  
  // event listener for when new game is clicked
  app.newGameButton = $('#newGame').on('click', function (e) {
    e.preventDefault();

    //reset forms for boat input
    app.resetForms();

    //get player's name and display it on their board
    app.userName = prompt("What is your name?");
    app.h3UserName = $('#user').html(`(${app.userName}'s board)`);

    //set the player's and computer's boats

    // $.when(app.setBoats('.player1')).done(function() {
      app.setBoats('.player1', app.setComputersBoats);
    // });
    
    // // event listener for start game button
    app.startGameButton = $('#startGame').on('click', function(e){
      e.preventDefault();

      console.log('start Game button pressed');

      //start playing game
      // hide startGame div
      app.startGameDiv = $('.startGame').hide();

      // show form and button 'Choose a square. Attack! '
      // ask for player's guess
      app.gamePlayDiv = $('.gamePlay').show();

      app.attackButton = $('#attack').on('click', function(e){
        e.preventDefault();
        app.gamePlay();
      });  

      // alert(`The winner is ${app.gameOver.player}`);

      
    });
  });
}; // end of app.init

$(function() {
  app.init();
});