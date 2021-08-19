const app = {
  // boats: [{name:'carrier', length: 5}, {name: 'battleship', length: 4}, {name: 'cruiser', length: 3}, {name: 'submarine', length: 3}, {name: 'destroyer', length: 2}],
  

};

app.columnArray = ["a","b","c","d","e","f","g","h","i","j"];


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
};//end of resetFroms function

app.setBoats = (player) => {
// ask player what square they would like to set their boat in
// ask if they want the boat set vertically or horizontal
//check if square is already occuppied
// if not, change class to occuppied
//repeat for each boat

  app.inputDiv = $('.input').prepend(`<h3>${app.userName}. Let's set your boats</h3>`);


  // show h3 and first of the boat forms
  app.inputH3Element = $('.input h3').show();
  app.setFormElements = $('form[name="setCarrierForm"]').show();
  
  app.setCarrierButton = $('#submitCarrier').on('click', function(e) {

    e.preventDefault();

    // when the user clicks on the submit button: 
    //    set the carrier
    let carrierPosition = app.setCarrier();

    console.log (carrierPosition);

    let continueGame = app.placeOnBoard(carrierPosition, player, 'carrier');

    while (!continueGame) {
      // reset carrier form and prompt for input again
      app.setCarrierInput = $('#setCarrier').val('');
      app.setCarrierRadioButtons = $('input[name="carrierDirection"]').prop('checked', false);
    
      carrierPosition = app.setCarrier();

      continueGame = app.placeOnBoard(carrierPosition, player, 'carrier');
    };

    // disable  setCarrier button and show form for Battleship

    app.setCarrierButton = $('#submitCarrier').attr('disabled', true);

    app.setFormElements = $('form[name="setBattleshipForm"]').show();
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

    // add text and button to start game
    app.inputDiv = $('.input').append(`<h3>Let's go!</h3>`);
    app.inputDiv = $('.input').append(`<button id="startGame">Start Game</button>`);
  });

   // event listener for start game button
   app.startGameButton = $('#startGame').on('click', function(e){
    e.preventDefault();

    console.log('start Game button pressed');
    //hide player1's forms for setting boats
    app.setFormElements = $('.setForm').hide();
    app.inputH3Element = $('.input > h3:first').hide();
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
    startingPosition = '.' + startingPosition.toLowerCase();
    
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

  if (vertical && (convertedRow + boatLength) <=10){
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
  }else if (!vertical && (convertedColumn + boatLength) <= 10){
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
  const boatArray = [['carrier', 5], ['battleship', 4], ['cruiser', 3], ['submarine', 3], ['destroyere', 2]];

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
};

app.init = () => {
  // Hide h3 and forms for setting boats
  app.inputH3Element = $('.input h3').hide();
  app.setFormElements = $('.setForm').hide();
  
  // event listener for when new game is clicked
  app.newGameButton = $('#newGame').on('click', function (e) {
    e.preventDefault();

    //reset forms for boat input
    app.resetForms();

    //get player's name and display it on their board
    app.userName = prompt("What is your name?");
    app.h3UserName = $('#user').html(`(${app.userName}'s board)`);

    //set the player's and computer's boats

    $.when(app.setBoats('.player1')).done(function() {
      app.setComputersBoats();
    });
    
    // // event listener for start game button
    // app.startGameButton = $('#startGame').on('click', function(e){
    //   e.preventDefault();

    //   console.log('start Game button pressed');
    //   //hide player1's forms for setting boats
    //   app.setFormElements = $('.setForm').hide();
    //   app.inputH3Element = $('.input > h3:first').hide();
    // });
  });
}; // end of app.init

$(function() {
  app.init();
});