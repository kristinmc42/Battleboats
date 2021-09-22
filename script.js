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
  //reset all input fields and radio buttons
  app.formInputFields = $('input[type="text]').val('');

  app.radioButtons = $('input[type="radio"]').prop('checked', false);

  //clear all divs with classes occuppied, hit, miss
  app.occuppiedSquareDivs = $('.occuppied').removeClass('occuppied');
  app.hitSquareDivs = $('.hit').removeClass('hit');
  app.missSquareDivs = $('.miss').removeClass('miss');

};//end of resetFroms function

app.setBoats = (player, callback) => {
  // ask player what square they would like to set their boat in
  // ask if they want the boat set vertically or horizontal
  // check if square is already occuppied
  // if not, change class to occuppied
  // repeat for each boat


  // show h3 and first of the boat forms
  app.inputElement = $('.input').show();

  app.inputDiv = $('.input').prepend(`<p>Select the starting square for your boats.</p>`)
  
  app.inputDiv = $('.input').prepend(`<p class="bolder animate__zoomIn">${app.userName}. Let's set your boats!</p>`);
  
  
  setTimeout(function(){ 
    app.setFormElements = $('form[name="setCarrierForm"]').show();
    

  }, 1600);
  

  // event listener for setting carrier
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
      startingPosition = "." + carrierPositionValid[1];
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

        app.setFormElements = $('form[name="setCarrierForm"]').hide();
        
        app.setFormElements = $('form[name="setBattleshipForm"]').show();

        e.preventDefault();
      };
    };
  }); // end of setCarrier event listener

  // event listener for setting battleship
  app.setBattleshipButton = $('form[name="setBattleshipForm"]').on('submit', function (e){
    // when the user clicks on the submit button: 
    // assign value to a variable
    let startingPosition = $('#setBattleship').val();
    // check that the variable is a valid entry
    let battleshipPositionValid = app.checkEntryIsValid(startingPosition);
    
    if (!battleshipPositionValid[0]){
      // if not a valid entry
      // reset battleship form and prompt for input again
      app.setBattleshipInput = $('#setBattleship').val('');
      app.setBattleshipRadioButtons = $('input[name="battleshipDirection"]').prop('checked', false);
      
      e.preventDefault();

    } else {
      // startingPosition is valid
      // check if direction is vertical or horizontal
      // will default to horizontal if no button selected
      startingPosition = "." + battleshipPositionValid[1];
      let battleshipDirection = $('input[name="battleshipDirection"][type="radio"]:checked').val();
      let battleshipVertical = app.checkBoatDirection(battleshipDirection);
  
      // set the battleship
      // startingPosition, vertical, boatLength
      let battleshipPosition = [startingPosition, battleshipVertical, 4];
  
      console.log (battleshipPosition);
  
      let continueGame = app.placeOnBoard(battleshipPosition, player, 'battleship');
  
      if (!continueGame) {
        // reset battleship form and prompt for input again
        app.setBattleshipInput = $('#setBattleship').val('');
        app.setBattleshipRadioButtons = $('input[name="battleshipDirection"]').prop('checked', false);
        
        e.preventDefault();
        
      } else {
        // Battleship successfully placed
        // disable  setBattleship button and show form for Cruiser
        
        app.setBattleshipButton = $('#submitBattleship').attr('disabled', true);

        app.setFormElements = $('form[name="setBattleshipForm"]').hide();
        
        app.setFormElements = $('form[name="setCruiserForm"]').show();

        e.preventDefault();
      };
    }; 
  }); // end of setBattleship event listener
    
  // event listener for setting cruiser  
  app.setCruiserButton = $('form[name="setCruiserForm"]').on('submit', function (e){
    // when the user clicks on the submit button: 
    // assign value to a variable
    let startingPosition = $('#setCruiser').val();
    // check that the variable is a valid entry
    let cruiserPositionValid = app.checkEntryIsValid(startingPosition);
    
    if (!cruiserPositionValid[0]){
      // if not a valid entry
      // reset cruiser form and prompt for input again
      app.setCruiserInput = $('#setCruiser').val('');
      app.setCruiserRadioButtons = $('input[name="cruiserDirection"]').prop('checked', false);
      
      e.preventDefault();

    } else {
      // startingPosition is valid
      // check if direction is vertical or horizontal
      // will default to horizontal if no button selected
      startingPosition = "." + cruiserPositionValid[1];
      let cruiserDirection = $('input[name="cruiserDirection"][type="radio"]:checked').val();
      let cruiserVertical = app.checkBoatDirection(cruiserDirection);
  
      // set the cruiser
      // startingPosition, vertical, boatLength
      let cruiserPosition = [startingPosition, cruiserVertical, 3];
  
      console.log (cruiserPosition);
  
      let continueGame = app.placeOnBoard(cruiserPosition, player, 'cruiser');
  
      if (!continueGame) {
        // reset cruiser form and prompt for input again
        app.setCruiserInput = $('#setCruiser').val('');
        app.setCruiserRadioButtons = $('input[name="cruiserDirection"]').prop('checked', false);
        
        e.preventDefault();
        
      } else {
        // Cruiser successfully placed
        // disable  setCruiser button and show form for Submarine
        
        app.setCruiserButton = $('#submitCruiser').attr('disabled', true);

        app.setFormElements = $('form[name="setCruiserForm"]').hide();
        
        app.setFormElements = $('form[name="setSubmarineForm"]').show();

        e.preventDefault();
      };
    };
  }); // end of setCruiser event listener

  // event listener for setting submarine
  app.setSubmarineButton = $('form[name="setSubmarineForm"]').on('submit', function (e){
    // when the user clicks on the submit button: 
    // assign value to a variable
    let startingPosition = $('#setSubmarine').val();
    // check that the variable is a valid entry
    let submarinePositionValid = app.checkEntryIsValid(startingPosition);
    
    if (!submarinePositionValid[0]){
      // if not a valid entry
      // reset submarine form and prompt for input again
      app.setSubmarineInput = $('#setSubmarine').val('');
      app.setSubmarineRadioButtons = $('input[name="submarineDirection"]').prop('checked', false);
      
      e.preventDefault();

    } else {
      // startingPosition is valid
      // check if direction is vertical or horizontal
      // will default to horizontal if no button selected
      startingPosition = "." + submarinePositionValid[1];
      let submarineDirection = $('input[name="submarineDirection"][type="radio"]:checked').val();
      let submarineVertical = app.checkBoatDirection(submarineDirection);
  
      // set the submarine
      // startingPosition, vertical, boatLength
      let submarinePosition = [startingPosition, submarineVertical, 3];
  
      console.log (submarinePosition);
  
      let continueGame = app.placeOnBoard(submarinePosition, player, 'submarine');
  
      if (!continueGame) {
        // reset submarine form and prompt for input again
        app.setSubmarineInput = $('#setSubmarine').val('');
        app.setSubmarineRadioButtons = $('input[name="submarineDirection"]').prop('checked', false);
        
        e.preventDefault();
        
      } else {
        // Submarine successfully placed
        // disable  setSubmarine button and show form for Destroyer
        
        app.setSubmarineButton = $('#submitSubmarine').attr('disabled', true);

        app.setFormElements = $('form[name="setSubmarineForm"]').hide();
        
        app.setFormElements = $('form[name="setDestroyerForm"]').show();

        e.preventDefault();
      };
    };
    
  }); // end of setSubmarine event listener

  // event listener for setting destroyer
  app.setDestroyerButton = $('form[name="setDestroyerForm"]').on('submit', function (e){
    // when the user clicks on the submit button: 
    // assign value to a variable
    let startingPosition = $('#setDestroyer').val();
    // check that the variable is a valid entry
    let destroyerPositionValid = app.checkEntryIsValid(startingPosition);
    
    if (!destroyerPositionValid[0]){
      // if not a valid entry
      // reset destroyer form and prompt for input again
      app.setDestroyerInput = $('#setDestroyer').val('');
      app.setDestroyerRadioButtons = $('input[name="destroyerDirection"]').prop('checked', false);
      
      e.preventDefault();

    } else {
      // startingPosition is valid
      // check if direction is vertical or horizontal
      // will default to horizontal if no button selected
      startingPosition = "." + destroyerPositionValid[1];
      let destroyerDirection = $('input[name="destroyerDirection"][type="radio"]:checked').val();
      let destroyerVertical = app.checkBoatDirection(destroyerDirection);
  
      // set the destroyer
      // startingPosition, vertical, boatLength
      let destroyerPosition = [startingPosition, destroyerVertical, 2];
  
      console.log (destroyerPosition);
  
      let continueGame = app.placeOnBoard(destroyerPosition, player, 'destroyer');
  
      if (!continueGame) {
        // reset submarine form and prompt for input again
        app.setDestroyerInput = $('#setDestroyer').val('');
        app.setDestroyerRadioButtons = $('input[name="submarineDirection"]').prop('checked', false);
        
        e.preventDefault();
        
      } else {
        // Destroyer successfully placed
        // disable  setDestroyer button
        
        app.setDestroyerButton = $('#submitDestroyer').attr('disabled', true);

        e.preventDefault();
        
        
        //hide player1's forms for setting boats
        app.setFormElements = $('.setForm').hide();
        app.inputElement = $('.input').hide();
    
        // show, then add text and button to start game div
        app.inputDiv = $('.startGame').show();
        
        app.inputDiv = $('.startGame').prepend(`<h3 class="animate__zoomIn">Let's go!</h3>`);

        // setTimeout(function(){$('.startGame').append(`<button id= 'startGame'>Start Game</button>`);}, 1500);
        

        // app.startGameButton = $('#startGame').show();
    
        callback();
      };
    };
  });// end of setDestroyer event listener
}; // end of app.setBoats function

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


// app.setCarrier = () => {
//   //    assign the text field to variable startingPosition
//   //    asssign variable vertical true or false depending on the radio button value

//   let vertical = true;

//   let startingPosition = $('#setCarrier').val();
  
//   startingPosition = app.checkEntryIsValid(startingPosition);
  
//   if (!startingPosition){
//     app.setCarrierInput = $('#setCarrier').val('');
//   }
  
//   const direction = $('input[name="carrierDirection"][type="radio"]:checked').val();

//   if (direction === 'carrierVertical'){
//     vertical = true;
//   } else {
//     vertical = false;
//   }
  
//   const boatLength = 5;

//   console.log(startingPosition, direction, vertical)

//   return [startingPosition, vertical, boatLength];
// }; //end of app.setCarrier function


// app.setBattleship = () => {
//   //    assign the text field to variable startingPosition
//   //    asssign variable vertical true or false depending on the radio button value

//   let vertical = true;

//   let startingPosition = $('#setBattleship').val();
//   startingPosition = '.' + startingPosition.toLowerCase();
  
//   const direction = $('input[name="battleshipDirection"][type="radio"]:checked').val();

//   if (direction === 'battleshipVertical'){
//     vertical = true;
//   } else {
//     vertical = false;
//   }
  
//   const boatLength = 4;

//   console.log(startingPosition, direction, vertical)


//   return [startingPosition, vertical, boatLength];
// }; //end of setBattleship function

// app.setCruiser = () => {
//   //    assign the text field to variable startingPosition
//   //    asssign variable vertical true or false depending on the radio button value

//   console.log('setcruiser app called');

//   let vertical = true;

//   let startingPosition = $('#setCruiser').val();
//   startingPosition = '.' + startingPosition.toLowerCase();
  
//   const direction = $('input[name="cruiserDirection"][type="radio"]:checked').val();

//   if (direction === 'cruiserVertical'){
//     vertical = true;
//   } else {
//     vertical = false;
//   }
  
//   const boatLength = 3;

//   console.log(startingPosition, direction, vertical);


//   return [startingPosition, vertical, boatLength];
// }; //end of setCruiser function

// app.setSubmarine = () => {
//   //    assign the text field to variable startingPosition
//   //    asssign variable vertical true or false depending on the radio button value

//   let vertical = true;

//   let startingPosition = $('#setSubmarine').val();
//   startingPosition = '.' + startingPosition.toLowerCase();
  
//   const direction = $('input[name="submarineDirection"][type="radio"]:checked').val();

//   if (direction === 'submarineVertical'){
//     vertical = true;
//   } else {
//     vertical = false;
//   }
  
//   const boatLength = 3;

//   console.log(startingPosition, direction, vertical)


//   return [startingPosition, vertical, boatLength];
// }; //end of setSubmarine function

// app.setDestroyer = () => {
//   //    assign the text field to variable startingPosition
//   //    asssign variable vertical true or false depending on the radio button value

//   let vertical = true;

//   let startingPosition = $('#setDestroyer').val();
//   startingPosition = '.' + startingPosition.toLowerCase();
  
//   const direction = $('input[name="destroyerDirection"][type="radio"]:checked').val();

//   if (direction === 'destroyerVertical'){
//     vertical = true;
//   } else {
//     vertical = false;
//   }
  
//   const boatLength = 2;

//   console.log(startingPosition, direction, vertical)


//   return [startingPosition, vertical, boatLength];
// }; // end of setDestroyer function

app.checkEntryIsValid = (startingPosition) => {
  // check that the value entered is a valid square (a-j and 1-10)

  startingPosition = startingPosition.toLowerCase();

  console.log(`Inside checkEntryIsValid. The starting position is ${startingPosition}`);

  let row = startingPosition[1];
  if (startingPosition.length === 3){
    row = startingPosition[1].concat(startingPosition[2]);
  };
  // check that row is a number
  const validRow = !isNaN(row);

  if (!app.columnArray.includes(startingPosition[0]) || !validRow || row < 1 || row > 10 || startingPosition.length > 3 || startingPosition.length < 2){
    // alert('Sorry. That is not a valid square. Please try again.');
    Swal.fire('Sorry. \nThat is not a valid square. \nPlease try again.');
    return [false, startingPosition];
  } else {
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
  // takes 3 parameters, shipArray[startingPosition, vertical, boatLength], player (player1 or player2) and boatname
  //find the div that matches startingPosition and add class occuppied
  // separate string of startingPosition into row (number) and column (letter)
  // starting from startingPosition, and based on vertical true/false, make sure the boat will fit inside gameboard using boatlength

  const startingPosition = shipArray[0];
  let position = shipArray[0];
  const positionArray = position.split('');
  let column = positionArray[1];
  let convertedRow = 1;
 
  if (positionArray.length === 2){
    convertedRow = parseInt(positionArray[2]);
  }else {
    const row = positionArray[2].concat(positionArray[3]); 
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
        // alert('Oops! That boat overlaps another. Please try again.');
        Swal.fire('Oops! \nThat boat overlaps another. \nPlease try again.');
        return false;
      };
    };
    // adds class 'occuppied' to the startingPosition square
    $(`${player}${startingPosition}`).addClass(`occuppied ${boatName}`);
    // adds class 'occuppied' to the rest of the boat squares
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
        // alert('Oops! That boat overlaps another. Please try again.');
        Swal.fire('Oops! \nThat boat overlaps another. \nPlease try again.');
        return false;
      };
    };

    // adds class 'occuppied' to the startingPosition square
    $(`${player}${startingPosition}`).addClass(`occuppied ${boatName}`);
    // adds class 'occuppied' to the rest of the boat squares
    for (let j = 0; j < boatLength -1; j++){
      column = app.columnArray[convertedColumn + j];

      $(`${player}.${column}${convertedRow}`).addClass(`occuppied ${boatName}`);
    }; 
    return true;
  }else {
    // condition for when boat length will be outside of the board dimensions
    // alert('The boat does not fit inside the board in that direction. Please try again')
    Swal.fire('The boat does not fit inside the board in that direction. \nPlease try again.');
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

app.playersTurn = (callback) => {
  // player's turn
  // when user submits guess, assign value of input to variable
  const playersInput = $('#playersGuess').val();
  let  playersGuess = playersInput;
  //check that it is a valid entry
  const playersGuessValid = app.checkEntryIsValid(playersGuess);
  
  if (!playersGuessValid[0]){
    // guess isn't valid
    // reset players guess
    app.playersGuessInput = $('#playersGuess').val('');
    return;
  }else {
    // guess is a valid square
    playersGuess = playersGuessValid[1];
    //check if the square was already guessed
    if (app.player1Guesses.includes(playersGuess)){
      app.playersGuessInput = $('#playersGuess').val('');
      Swal.fire('That square was already guessed. \nPlease try again.');
      return; 
    }else {
      // add guess to player1Guesses array
      app.player1Guesses.push(playersGuess);
    };

    // check if the square is occuppied
    
      const continueGame = app.checkGuess(playersGuess, 'player2');
      if (!continueGame){
        // game is over
        console.log(`The player is the winner`);
  
        app.gamePlayDiv = $('.gamePlay').after(`<div class="gameOver"><h3 class="winner">Game Over!
        </h3></div>`);
        app.gameOverDiv = $('div.gameOver').append(`<h3 class="winner">Congratulations ${app.userName}! You won!</h3>`)
        app.launchConfetti();
        return;
      }else {
        setTimeout(function(){
          console.log('in setTimeout of playersTurn')
          callback();
        }, 2500);
        // return;
      };   

    
  };
}; // end of app.playersTurn

// app.gamePlay = () => {
//   // player's turn
//   // when user submits guess, assign value of input to variable
//   const playersInput = $('#playersGuess').val();
//   let  playersGuess = playersInput;
//   //check that it is a valid entry
//   const playersGuessValid = app.checkEntryIsValid(playersGuess);
  
//   if (!playersGuessValid[0]){
//     // guess isn't valid
//     // reset players guess
//     app.playersGuessInput = $('#playersGuess').val('');
//     return;
//   }else {
//     // guess is a valid square
//     playersGuess = playersGuessValid[1];
//     //check if the square was already guessed
//     if (app.player1Guesses.includes(playersGuess)){
//       app.playersGuessInput = $('#playersGuess').val('');
//       Swal.fire('That square was already guessed. \nPlease try again.');
//       return; 
//     }else {
//       // add guess to player1Guesses array
//       app.player1Guesses.push(playersGuess);
//     };
//     // check if the square is occuppied
//     (async () => {
//       const playerDone = await app.checkGuess(playersGuess, 'player2');
//       if (playerDone){
//         // game is over
//         console.log(`The player is the winner`);

//         app.gamePlayDiv = $('.gamePlay').after(`<div class="gameOver"><h3 class="winner">Game Over!
//         </h3></div>`);
//         app.gameOverDiv = $('div.gameOver').append(`<h3 class="winner">Congratulations ${app.userName}! You won!</h3>`)
//         app.launchConfetti();
//         return;
//       }else {
//         // computer's turn
//         (async() => {
//           let nextRound = await app.computersTurn();
//           if (nextRound){
//             console.log('Computer is done. The game continues. Next Round');
//             return;
//           }
//         })();
//       };
      
//       // let nextRound = await Promise.all([playerDone, computerDone]);

//       // if(nextRound){
//       //   return;
//       // }else {
//       //   console.log(`nextRound threw an error`);
//       // };

//     })();
//   };
// };//end of app.gamePlay

app.computersTurn = () => {
  // check if the computer had a hit with the last guess
  if (app.computerHit.hit){
    //if the previous guess was a hit create a new object and save it in an array
    console.log(`There was a previous hit by the computer`);

    if (app.computerHit.guess === app.computersGuess.guess && !app.previousHitArray.includes(app.computerHit)){

      const previousHit = JSON.parse(JSON.stringify(app.computerHit));

      app.previousHitArray.push(previousHit);

      console.log(`${previousHit.guess} pushed to previousHitArray`);
      console.log(`previousHitArray has: ${app.previousHitArray.length} elements`);
      
      // for testing purposes only
      for (let index = app.previousHitArray.length - 1; index >= 0; index -=1){
        if (index % 2 === 0){
          console.log(`${app.previousHitArray[index].guess} is in previousHitArray. index is even`);
        }else {
          console.log(`${app.previousHitArray[index].guess} is in previousHitArray. index is odd`);
        };
      };

    };


    // assign column, row and position with values of previous hit
    if (app.computerHit.guess.length === 2){
      app.computersGuess.column = app.computerHit.guess[0];
      const row = app.computerHit.guess[1];

      // for testing purposes only
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

      // for testing purposes only
      console.log(`column is ${app.computersGuess.column} and row is ${app.computersGuess.row} row is type of ${typeof(app.computersGuess.row)}`);

    };
    console.log(`${app.computersGuess.column}${app.computersGuess.row} was the previous guess by the computer` );

    app.computersGuess.position = app.columnArray.indexOf(app.computersGuess.column);

    console.log(app.computerHit.up, app.computerHit.down, app.computerHit.left, app.computerHit.right);


    // ** check which direction to guess next

    // first direction condition (no direction)
    if (!app.computerHit.up && !app.computerHit.down && !app.computerHit.left && !app.computerHit.right){

      console.log(`All directions should be false `);

      //if no guesses, it was the first hit
      //check square above
      if (app.computersGuess.row > 1 && !app.player2Guesses.includes(`${app.computersGuess.column}${app.computersGuess.row - 1}`)){
        //square is not first row and not a previous guess
        app.computersGuess.row -= 1;
        app.computerHit.up = true;
      } else {
        // can't check square above
        app.computerHit.up = true;
        // check square below
        app.checkSquaresBelow();
      };

    // second direction condition (up)
    }else if (app.computerHit.up && !app.computerHit.down){
      console.log(`computerHit.up is true down is false. Check square above`);
      // check square above was not already guessed
      if (app.computersGuess.row > 1 && !app.player2Guesses.includes(`${app.computersGuess.column}${app.computersGuess.row - 1}`)){
        //square is not first row and not a previous guess
        app.computersGuess.row -= 1;
        app.computerHit.up = true;
      }else {
        // can't check square above
        // need to check squares below until not already guessed
        app.checkSquaresBelow();
      };

    // third direction condition (down)
    }else if (app.computerHit.up && app.computerHit.down && !app.computerHit.left){
      console.log(`computerHit.up and down are true, left is false. Check square below`);
      // check square below
      app.checkSquaresBelow();
      
    // fourth direction condition (to left)
    }else if (app.computerHit.up && app.computerHit.down && app.computerHit.left && !app.computerHit.right){
      console.log(`computerHit.up, down and left are true, right is false. Check square to left`);
      //check square to the left
      app.checkSquareToLeft();
      
    
    // fifth direction condition (to right)
    }else if (app.computerHit.up && app.computerHit.down && app.computerHit.left && app.computerHit.right){
      console.log(`computerHit.up,down, left and right are true. Check square to right`);
      // check square to right
      app.checkSquareToRight();
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

  const continueGame = app.checkGuess(app.computersGuess.guess, 'player1');
        
  if (!continueGame){
    // game is over
    console.log(`The computer is the winner`);
    app.gamePlayDiv = $('.gamePlay').after(`<div class="gameOver"><h3 class="lost">Game Over! The computer won this round.</h3></div>`);
    app.gameOverDiv = $('div.gameOver').append(`<h3>Good battle ${app.userName}! Better luck next time.</h3>`);
    return false;
  } else{
    return true;
  };


  // (async () => {
  //   const computerDone = await app.checkGuess(app.computersGuess.guess, 'player1');
        
  //   if (computerDone){
  //     // game is over
  //     console.log(`The computer is the winner`);
  //     app.gamePlayDiv = $('.gamePlay').after(`<div class="gameOver"><h3 class="lost">Game Over! The computer won this round.</h3></div>`);
  //     app.gameOverDiv = $('div.gameOver').append(`<h3>Good battle ${app.userName}! Better luck next time.</h3>`);
  //     return false;
  //   } else{
  //     return true;
  //   };
  // })();
}; // end of app.computersTurn

app.checkSquaresBelow = () => {
  if (app.computersGuess.row < 10 && !app.player2Guesses.includes(`${app.computersGuess.column}${app.computersGuess.row + 1}`)){
    // not already guessed
    // check square below
    app.computersGuess.row += 1;
    app.computerHit.down = true;
  }else {
    // square below is already guessed or is the last row
    if (app.player2Guesses.includes(`${app.computersGuess.column}${app.computersGuess.row + 1}`)  && !$(`.${app.computersGuess.column}${app.computersGuess.row + 1}.player1`).hasClass('sunk')){
      // square below was already guessed but not sunk
      // check if square is a hit or miss
      
      if ($(`.${app.computersGuess.column}${app.computersGuess.row + 1}.player1`).hasClass('hit')){
        // current square is a hit and square 
        // check if square below is a hit until not a hit
        app.computersGuess.row += 1;
        let i =1;
        
        console.log(`The square is a hit. current guess is now:${app.computersGuess.column}${app.computersGuess.row}
        checking square: ${app.computersGuess.column}${app.computersGuess.row + i}`)

        while(app.player2Guesses.includes(`${app.computersGuess.column}${app.computersGuess.row + i}`)){
          console.log(`${app.computersGuess.column}${app.computersGuess.row + i} was already guessed`);
          i++;
          console.log(`i = ${i}`);
        };

        app.computersGuess.row += i;

        console.log(`Checking rows below row 1; i= ${i}; next guess should be ${app.computersGuess.column}${app.computersGuess.row}`);
    
      }else {
        // square below is a miss
        console.log(`can't check down, checking left`);
        // check square to left of last hit in the previous hit array
        app.
        app.checkSquareToLeft();
      };
    }else {
      // square is in last row or square below was sunk
      // check square to left 
      app.computerHit.down = true;
      app.checkSquareToLeft();
    };  
  };
};// end of app.checkSquaresBelow

app.checkSquareToLeft = () => {
  if (app.computersGuess.column !== 'a' && !app.player2Guesses.includes(`${app.columnArray[app.computersGuess.position - 1]}${app.computersGuess.row}`)){
    // square to left is not first column and was not previously guessed
    // guess square to the left
    app.computersGuess.column = app.columnArray[app.computersGuess.position - 1];
    app.computerHit.left = true;
  }else if(app.computersGuess.column !== 'a'){
    // can't check square to the left
    app.computerHit.left = true;
    // need to check squares to the right 
    app.checkSquareToRight();
  }else {
    // square to left was previously guessed
    app.computerHit.left = true;
    // need to check if it was a hit or a miss
    if ($(`.${app.columnArray[app.computersGuess.position - 1]}${app.computersGuess.row}`).hasClass('hit')  && !$(`.${app.columnArray[app.computersGuess.position - 1]}${app.computersGuess.row}`).hasClass('sunk')){
      // square was a hit but not sunk
      // check to left until not a hit
      app.computersGuess.column = app.columnArray[app.computersGuess.position - 1];
      let j = 1;

      while (app.player2Guesses.includes(`${app.columnArray[app.computersGuess.position - j]}${app.computersGuess.row}`) && app.computersGuess.column !== 'a'){
        console.log(`${app.columnArray[app.computersGuess.position - j]}${app.computersGuess.row} was already guessed`);
        j--;
        console.log(`j = ${j}`);
      };
      app.computersGuess.column = app.columnArray[app.computersGuess.position - j];

      console.log(`Checking columns to left; j= ${j}; next guess should be ${app.computersGuess.column}${app.computersGuess.row}`);
    }else {
      // square to left was a miss or sunk
      app.computerHit.left = true;
      // check squares to the right
      app.checkSquareToRight();
    };
  };
};// end of app.checkSquaresToLeft

app.checkSquareToRight = () => {
  if(app.computersGuess.column !== 'j' && !app.player2Guesses.includes(`${app.columnArray[app.computersGuess.position + 1]}${app.computersGuess.row}`)){
    // square to right not previously guessed and not last row
    app.computersGuess.column = app.columnArray[app.computersGuess.position + 1];
    app.computerHit.right = true; 

  }else if (app.player2Guesses.includes(`${app.columnArray[app.computersGuess.position + 1]}${app.computersGuess.row}`) && !$(`.${app.columnArray[app.computersGuess.position + 1]}${app.computersGuess.row}`).hasClass('sunk')){
    //square to right already guessed but not sunk, check to right until not previously guessed
    let k = 1;
    app.computersGuess.column = app.columnArray[app.computersGuess.position + 1];

    while(app.computersGuess.column !== 'j' && app.player2Guesses.includes(`${app.columnArray[app.computersGuess.position + k]}${app.computersGuess.row}`)){
      app.computersGuess.column = app.columnArray[app.computersGuess.position + k];
      k++;
    };
    app.computersGuess.column = app.columnArray[app.computersGuess.position + k]
    app.computerHit.right = true;
  }else{
    // is last column or was sunk
    // check squares to left
    app.checkSquareToLeft();
  };
};// end of app.checkSquareToRight

app.checkGuess = (playersGuess, playerBeingAttacked) => {
  // if square is occuppied, change colour of square (NOTE: color is not changing; need to check CSS) and add bomb image; also, keep track of how many hits the boat has taken 
  // if not occuppied, change colour of square to show miss
  let continueGame = true;

  if ($(`.${playersGuess}.${playerBeingAttacked}`).hasClass("occuppied")){
    // guess is a hit; add class and image
    $(`.${playersGuess}.${playerBeingAttacked}`).addClass('hit');
    $(`.${playersGuess}.${playerBeingAttacked}`).prepend('<i class="fas fa-bomb"></i>');

    console.log (`.${playersGuess}.${playerBeingAttacked} is a hit`);

    // add hit to array for boat and check if sunk
    if (playerBeingAttacked === 'player2'){
      //user attacking the computer
      if($(`.${playersGuess}.${playerBeingAttacked}`).hasClass('carrier')){
        app.player2Boats.carrier[1] += 1;
        console.log(`player2's carrier has ${app.player2Boats.carrier[1]} hits`);
        
        if (app.player2Boats.carrier[1] === app.player2Boats.carrier[0]){
          // sunk ship
          app.legendDivI = $('p.carrier i.player2').addClass('player2Sunk');
          continueGame = app.sunkAlert('carrier', playerBeingAttacked, playersGuess);
          // alert('You sunk their carrier!');
        }else{
          // hit but didn't sink a ship
          app.hitOrMissAlert('hit', playersGuess, playerBeingAttacked);
        };
      }else if ($(`.${playersGuess}.${playerBeingAttacked}`).hasClass('battleship')){
        app.player2Boats.battleship[1] += 1;
        console.log(`player2's battleship has ${app.player2Boats.battleship[1]} hits`);

        if (app.player2Boats.battleship[1] === app.player2Boats.battleship[0]){
           // sunk ship
          app.legendDivI = $('p.battleship i.player2').addClass('player2Sunk');
          continueGame = app.sunkAlert('battleship', playerBeingAttacked, playersGuess);
          // alert('You sunk their battleship!');
        }else{
          // hit but didn't sink a ship
          app.hitOrMissAlert('hit', playersGuess, playerBeingAttacked);
        };
      }else if ($(`.${playersGuess}.${playerBeingAttacked}`).hasClass('cruiser')){
        app.player2Boats.cruiser[1] += 1;
        console.log(`player2's cruiser has ${app.player2Boats.cruiser[1]} hits`);

        if (app.player2Boats.cruiser[1] === app.player2Boats.cruiser[0]){
          // sunk a ship
          app.legendDivI = $('p.cruiser i.player2').addClass('player2Sunk');
          continueGame = app.sunkAlert('cruiser', playerBeingAttacked, playersGuess);
          // alert('You sunk their cruiser!');
        }else{
          // hit but didn't sink a ship
          app.hitOrMissAlert('hit', playersGuess, playerBeingAttacked);
        };
      }else if ($(`.${playersGuess}.${playerBeingAttacked}`).hasClass('submarine')){
        app.player2Boats.submarine[1] += 1;
        console.log(`player2's submarine has ${app.player2Boats.submarine[1]} hits`);

        if (app.player2Boats.submarine[1] === app.player2Boats.submarine[0]){
          // sunk ship
          app.legendDivI = $('p.submarine i.player2').addClass('player2Sunk');
          continueGame = app.sunkAlert('submarine', playerBeingAttacked, playersGuess);
          // alert('You sunk their submarine!');
        }else{
          // hit but didn't sink ship
          app.hitOrMissAlert('hit', playersGuess, playerBeingAttacked);
        };
      }else {
        app.player2Boats.destroyer[1] += 1;
        console.log(`player2's destroyer has ${app.player2Boats.destroyer[1]} hits`);

        if (app.player2Boats.destroyer[1] === app.player2Boats.destroyer[0]){
          // sunk ship
          app.legendDivI = $('p.destroyer i.player2').addClass('player2Sunk');
          continueGame = app.sunkAlert('destroyer', playerBeingAttacked, playersGuess);
          // alert('You sunk their destroyer!');
        }else{
          // hit but didn't sink ship
          app.hitOrMissAlert('hit', playersGuess, playerBeingAttacked);
        };
      };

    }else {
      //computer attacking user
      // track the space that was hit by the computer
      app.computerHit.hit = true;
      app.computerHit.guess = playersGuess;

      // check which type of boat was hit and track the number of hits
      // check if the boat was sunk
      if($(`.${playersGuess}.${playerBeingAttacked}`).hasClass('carrier')){
        app.player1Boats.carrier[1] += 1;
        console.log(`player1's carrier has ${app.player1Boats.carrier[1]} hits`);

        if (app.player1Boats.carrier[1] === app.player1Boats.carrier[0]){
          // ship sunk
          app.legendDivI = $('p.carrier i.player1').addClass('player1Sunk');
          continueGame = app.sunkAlert('carrier', playerBeingAttacked, playersGuess);
          // alert('They sunk your carrier!');
          // remove any previous hits with class carrier
          app.removeHitsWithBoatClass('carrier');
        }else{
          // hit but not sunk
          app.hitOrMissAlert('hit', playersGuess, playerBeingAttacked);
        };
      }else if ($(`.${playersGuess}.${playerBeingAttacked}`).hasClass('battleship')){
        app.player1Boats.battleship[1] += 1;
        console.log(`player1's battleship has ${app.player1Boats.battleship[1]} hits`);

        if (app.player1Boats.battleship[1] === app.player1Boats.battleship[0]){
          // ship sunk
          app.legendDivI = $('p.battleship i.player1').addClass('player1Sunk');
          continueGame = app.sunkAlert('battleship', playerBeingAttacked, playersGuess);
          // alert('They sunk your battleship!');
         
          // remove any previous hits with class battleship
          app.removeHitsWithBoatClass('battleship');
        }else{
          // hit but not sunk
          app.hitOrMissAlert('hit', playersGuess, playerBeingAttacked);
        };
      }else if ($(`.${playersGuess}.${playerBeingAttacked}`).hasClass('cruiser')){
        app.player1Boats.cruiser[1] += 1;
        console.log(`player1's cruiser has ${app.player1Boats.cruiser[1]} hits`);

        if (app.player1Boats.cruiser[1] === app.player1Boats.cruiser[0]){
          // ship sunk
          app.legendDivI = $('p.cruiser i.player1').addClass('player1Sunk');
          continueGame = app.sunkAlert('cruiser', playerBeingAttacked, playersGuess);
          // alert('They sunk your cruiser!');
          // remove any previous hits with class cruiser
          app.removeHitsWithBoatClass('cruiser');
        }else{
          // hit but not sunk
          app.hitOrMissAlert('hit', playersGuess, playerBeingAttacked);
        };
      }else if ($(`.${playersGuess}.${playerBeingAttacked}`).hasClass('submarine')){
        app.player1Boats.submarine[1] += 1;
        console.log(`player1's submarine has ${app.player1Boats.submarine[1]} hits`);

        if (app.player1Boats.submarine[1] === app.player1Boats.submarine[0]){
          // ship sunk
          app.legendDivI = $('p.submarine i.player1').addClass('player1Sunk');
          continueGame = app.sunkAlert('submarine', playerBeingAttacked, playersGuess);
          // alert('They sunk your submarine!');
          // remove any previous hits with class submarine
          app.removeHitsWithBoatClass('submarine');
        }else{
          // hit but not sunk
          app.hitOrMissAlert('hit', playersGuess, playerBeingAttacked);
        };
      }else {
        app.player1Boats.destroyer[1] += 1;
        console.log(`player1's destroyer has ${app.player1Boats.destroyer[1]} hits`);

        if (app.player1Boats.destroyer[1] === app.player1Boats.destroyer[0]){
          // ship sunk
          app.legendDivI = $('p.destroyer i.player1').addClass('player1Sunk');
          continueGame = app.sunkAlert('destroyer', playerBeingAttacked, playersGuess);
          // alert('They sunk your destroyer!');
          // remove any previous hits with class destroyer
          app.removeHitsWithBoatClass('destroyer');
        }else{
          // hit but not sunk
          app.hitOrMissAlert('hit', playersGuess, playerBeingAttacked);
        };
      };
    };

  }else {
    // the guess was a miss
    // add class miss to the square
    $(`.${playersGuess}.${playerBeingAttacked}`).addClass('miss');

    console.log(`.${playersGuess} on ${playerBeingAttacked}'s board is a miss`);
    // hit or miss alert
    app.hitOrMissAlert('miss', playersGuess, playerBeingAttacked);

    // if the computer had a previous hit but this guess was a miss, change the value on the next direction to check
    if (app.computerHit.hit && playerBeingAttacked === 'player1'){
      if (!app.computerHit.down){
        app.computerHit.down = true;
        console.log(`computerHit.down changed to true`);
      }else if (!app.computerHit.left){
        app.computerHit.left = true;
        console.log(`computerHit.left changed to true`);
      }else if (!app.computerHit.right){
        app.computerHit.right = true;
        console.log(`computerHit.right changed to true`);
      };
    };
  };
  if (continueGame){
    console.log(`The game will continue: ${continueGame}`);
    return true;
  }else{
    console.log(`The game will continue: ${continueGame}. Game over.`);
    return false;
  };
};// end of app.checkGuess

app.hitOrMissAlert = (hitOrMiss, playersGuess, playerBeingAttacked) => {
  // shows an alert with the square guessed and if it was a hit or miss
  // let timerInterval;
  let message;
  const square = playersGuess.toUpperCase();

  if (hitOrMiss === 'hit'){
    if (playerBeingAttacked === 'player1'){
      // computer's guess
      message = `The computer guessed: ${square} 
      It was a was a hit!`
    }else{
      // player's guess
      message = `${square} was a hit!`
    }
  }else {
    if (playerBeingAttacked === 'player1'){
      //computer's guess
      message = `The computer guessed: ${square} 
      It was a miss.`
    }else{
      // player's guess
      message = `${square} was a miss.`
    };
  };

  Swal.fire(`${message}`);

  // Swal.fire({
  //   title: `${message}`,
  //   timer: 3000,
  //   timerProgressBar: true,
  //   didOpen: () => {
  //     Swal.showLoading()
  //     const b = Swal.getHtmlContainer().querySelector('b')
  //     timerInterval = setInterval(() => {
  //       b.textContent = Swal.getTimerLeft()
  //     }, 3000)
  //   },
  //   willClose: () => {
  //     clearInterval(timerInterval)
  //   }
  // }).then((result) => {
    
  //   if (result.dismiss === Swal.DismissReason.timer) {
  //     console.log('I was closed by the timer')
  //   };

  // });
};// end of app.hitOrMissAlert

app.sunkAlert = (shipName, playerBeingAttacked, playersGuess) => {
  // alert when a ship is sunk
  // let timerInterval;
  let youOrTheySunkMessage;
  const square = playersGuess.toUpperCase();

  if (playerBeingAttacked === 'player2'){
    youOrTheySunkMessage = `${square} was a hit! 
    You sunk their ${shipName}!`
  }else {
    youOrTheySunkMessage = `The computer guessed: ${square} 
    It was a hit. 
    They sunk your ${shipName}!`
  };

  Swal.fire(`${youOrTheySunkMessage}`);

  // check if game should continue 
  const continueGame = app.checkAllBoatsSunk(playerBeingAttacked);
  if (continueGame){
    console.log(`The game will continue: ${continueGame}`);
    return true;
  }else{
    console.log(`Result:${continueGame}. The game will not continue. Game over.`);
    return false;
  };

  // Swal.fire({
  //   title: `${youOrTheySunkMessage}`,
  //   timer: 3000,
  //   timerProgressBar: true,
  //   didOpen: () => {
  //     Swal.showLoading()
  //     const b = Swal.getHtmlContainer().querySelector('b')
  //     timerInterval = setInterval(() => {
  //       b.textContent = Swal.getTimerLeft()
  //     }, 3000)
  //   },
  //   willClose: () => {
  //     clearInterval(timerInterval)
  //   }
  // }).then((result) => {
  //   /* Read more about handling dismissals below */
  //   if (result.dismiss === Swal.DismissReason.timer) {
  //     console.log('I was closed by the timer')
  //   }

  //   // check if game should continue 
  //   const continueGame = app.checkAllBoatsSunk(playerBeingAttacked);
  //   if (continueGame){
  //     console.log(`The game will continue: ${continueGame}`);
  //     return false;
  //   }else{
  //     console.log(`Result:${continueGame}. The game will not continue. Game over.`);
  //     return true;
  //   };
  // })
};// end of app.sunkAlert

app.resetComputerHit = (remainingHits) => {
  if (remainingHits.length >= 1){
    // reset computerHit to last item in previousHitsArray
    const newGuess = remainingHits[remainingHits.length - 1];
    app.computerHit = newGuess;

    console.log(`newGuess is: ${newGuess.guess}  computerHit is: ${app.computerHit.guess} 
    computerHit.up is: ${app.computerHit.up}
    computerHit.down is: ${app.computerHit.down}
    computerHit.left is: ${app.computerHit.left} 
    computerHit.right is: ${app.computerHit.right}`);

    // // reset all directions to false
    app.computerHit.up = false;
    app.computerHit.down = false;
    app.computerHit.left = false;
    app.computerHit.right = false;
    
  }else {
    // reset computerHit to false and empty
    app.computerHit.hit = false;
    app.computerHit.guess = '';
    app.computerHit.up = false;
    app.computerHit.down = false;
    app.computerHit.left = false;
    app.computerHit.right = false;
    console.log('computerHit is now false');
  };
};// end of app.resetComputerHit

app.removeHitsWithBoatClass = (boatClass) => {
  // checks for squares with the matching boatClass
  // removes them from the previousHitArray

  let remainingHits = [];

  for (let index = app.previousHitArray.length - 1; index >=0; index -=1){
    if ($(`.${app.previousHitArray[index].guess}.player1`).hasClass(`${boatClass}`)){
    // if element in previousHit has the boatClass remove it from the previousHitArray
    console.log(`${app.previousHitArray[index].guess} was removed from previousHits`)
      app.previousHitArray.splice(index, 1);
    }else {
      remainingHits.push(app.previousHitArray[index]);
      console.log(`${app.previousHitArray[index].guess} was added to remianing hits`);
    };
  };

  console.log(`previousHitArray:${app.previousHitArray}
  remainingHits: ${remainingHits}`);

  app.resetComputerHit(remainingHits);

  // add class sunk to all squares with the boatClass
  app.player1Divs = $(`.player1.hit.${boatClass}`).addClass('sunk');

};// end of app.removeHitsWithBoatClass

app.checkAllBoatsSunk = (playerBeingAttacked) => {
  //check if all player's boats are sunk
  if (playerBeingAttacked === 'player1'){
    if (app.player1Boats.carrier[1] === app.player1Boats.carrier[0] && app.player1Boats.battleship[1] === app.player1Boats.battleship[0] && app.player1Boats.cruiser[1] === app.player1Boats.cruiser[0] && app.player1Boats.submarine[1] === app.player1Boats.submarine[0] && app.player1Boats.destroyer[1] === app.player1Boats.destroyer[0]){
      console.log('Game over!');
      app.gamePlayDiv = $('.gamePlay').hide();
      return false;
    }else {
      return true;
    };
  }else {
    if (app.player2Boats.carrier[1] === app.player2Boats.carrier[0] && app.player2Boats.battleship[1] === app.player2Boats.battleship[0] && app.player2Boats.cruiser[1] === app.player2Boats.cruiser[0] && app.player2Boats.submarine[1] === app.player2Boats.submarine[0] && app.player2Boats.destroyer[1] === app.player2Boats.destroyer[0]){
      console.log('Game over!');
      app.gamePlayForm = $('.gamePlay').hide();
      return false;
    }else {
      return true;
    };
  };
};

app.launchConfetti = () => {
  // do this for 5 seconds
  var duration = 5 * 1000;
  var end = Date.now() + duration;

  (function frame() {
    // launch a few confetti from the left edge
    confetti({
      particleCount: 7,
      angle: 60,
      spread: 55,
      origin: { x: 0 }
    });
    // and launch a few from the right edge
    confetti({
      particleCount: 7,
      angle: 120,
      spread: 55,
      origin: { x: 1 }
    });

    // keep going until we are out of time
    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  }());
};


app.init = () => {
  // Hide h3 and forms for setting boats
  app.restartButton = $('#restart').hide();
  app.inputElement = $('.input').hide();
  app.setFormElements = $('.setForm').hide();
  app.inputDiv = $('.startGame').hide();
  app.gamePlayDiv = $('.gamePlay').hide();
  
  // event listener for when new game is clicked
  app.newGameButton = $('#newGame').on('click', function (e) {
    
    e.preventDefault();

    //reset forms for boat input
    app.resetForms();

    //hide newGame button and show restart button in header
    app.newGameButton = $('#newGame').hide();
    app.restartButton = $('#restart').show();

    //get player's name and display it on their board
    // app.userName = prompt("What is your name?");
    // app.h3UserName = $('#user').html(`(${app.userName}'s board)`);
    (async () => {
      const { value: text } = await Swal.fire({
        input: 'text',
        inputLabel: 'Your name:',
        inputPlaceholder: 'Type your name here...',
        inputAttributes: {
          'aria-label': 'Type your name here'
        }
      });
      
      if (text) {
        Swal.fire(`Welcome ${text}!`)
        app.userName = text;
        app.h3UserName = $('#user').html(`(${app.userName}'s board)`);
        //set the player's and computer's boats
        app.setBoats('.player1', app.setComputersBoats);
      }else{
        Swal.fire(`You didn't enter a name. \nI will call you Captain Mysterioso!`);
        app.userName = 'Captain Mysterioso';
        app.h3UserName = $('#user').html(`(${app.userName}'s board)`);
        //set the player's and computer's boats
        app.setBoats('.player1', app.setComputersBoats);
      };
    })();


    
    // event listener for start game button
    app.startGameButton = $('#startGame').on('click', function(e){
      e.preventDefault();

      console.log('start Game button pressed');

      //start playing game
      // hide startGame div
      app.startGameDiv = $('.startGame').hide();

      // show gamePlay form and button 'Choose a square. Attack! '
      // ask for player's guess
      app.gamePlayDiv = $('.gamePlay').show();

      app.playersGuessForm = $('#guessForm').on('submit', function(e){
        
        console.log('guessForm has been submitted');
       e.preventDefault();
       app.playersTurn(app.computersTurn);
        // app.gamePlay();
      }); 
    });
  });
  // event listener for restart button
  app.restartButton = $('#restart').on('click', function(e){
    location.reload();
  });
}; // end of app.init

$(function() {
  app.init();
});