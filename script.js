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
}
app.player2Boats = {
  carrier: [5, 0],
  battleship: [4, 0],
  cruiser: [3, 0],
  submarine: [3, 0],
  destroyer: [2, 0]
}

app.gameOver = {
  finished: false,
  winner: ''
}


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
  
  // app.attackButton = $('#attack').on('click', function(e){
  //   e.preventDefault();
    // when user submits guess, assign value of input to variable
    let playersGuess = $('#playersGuess').val();
    playersGuess = playersGuess.toLowerCase();
    
    // check if the square is occuppied
    app.gameOver.finished = app.checkGuess(playersGuess, '.player2');
    app.gameOver.winner = '.player1';
    
    if (!app.gameOver.finished){
      playersGuess = $('#playersGuess').val('');
      alert("It's the computer's turn.");

      // computer's turn
      // repeat steps above
      // generate a random row and column for computer
      const column = app.columnArray[Math.floor(Math.random() * 10)];
      const row = Math.floor(Math.random() * 10) + 1;

      const computersGuess = `${column}${row}`; 

      console.log(`${computersGuess} is the computer's guess`);

      app.gameOver.finished = app.checkGuess(computersGuess, '.player1');
      app.gameOver.winner = '.player2';
    };
  // });
};//end of app.gamePlay

app.checkGuess = (playersGuess, playerBeingAttacked) => {
  // if square is occuppied, change colour of square, keep track of how many hits the boat has taken 
  // if not occuppied, change colour of square to show miss
  let continueGame = true;

  if ($(`.${playersGuess}${playerBeingAttacked}`).hasClass("occuppied")){
    $(`.${playersGuess}${playerBeingAttacked}`).addClass('hit');
    $(`.${playersGuess}${playerBeingAttacked}`).prepend('<i class="fas fa-bomb"></i>')

    console.log (`.${playersGuess}${playerBeingAttacked} is a hit`);

    if (playerBeingAttacked === '.player2'){
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
      if($(`.${playersGuess}${playerBeingAttacked}`).hasClass('carrier')){
        app.player1Boats.carrier[1] += 1;
        console.log(`player1's carrier has ${app.player1Boats.carrier[1]} hits`);

        if (app.player1Boats.carrier[1] === app.player1Boats.carrier[0]){
          alert('They sunk your carrier!');
        };
      }else if ($(`.${playersGuess}${playerBeingAttacked}`).hasClass('battleship')){
        app.player1Boats.battleship[1] += 1;
        console.log(`player1's battleship has ${app.player1Boats.battleship[1]} hits`);

        if (app.player1Boats.battleship[1] === app.player1Boats.battleship[0]){
          alert('They sunk your battleship!');
        };
      }else if ($(`.${playersGuess}${playerBeingAttacked}`).hasClass('cruiser')){
        app.player1Boats.cruiser[1] += 1;
        console.log(`player1's cruiser has ${app.player1Boats.cruiser[1]} hits`);

        if (app.player1Boats.cruiser[1] === app.player1Boats.cruiser[0]){
          alert('They sunk your cruiser!');
        };
      }else if ($(`.${playersGuess}${playerBeingAttacked}`).hasClass('submarine')){
        app.player1Boats.submarine[1] += 1;
        console.log(`player1's submarine has ${app.player1Boats.submarine[1]} hits`);

        if (app.player1Boats.submarine[1] === app.player1Boats.submarine[0]){
          alert('They sunk your submarine!');
        };
      }else {
        app.player1Boats.destroyer[1] += 1;
        console.log(`player1's destroyer has ${app.player1Boats.destroyer[1]} hits`);

        if (app.player1Boats.destroyer[1] === app.player1Boats.destroyer[0]){
          alert('They sunk your destroyer!');
        };
      };
    };
    continueGame = app.checkAllBoatsSunk(playerBeingAttacked);

    console.log(`the game will continue ${continueGame}`)
  }else {
    $(`.${playersGuess}${playerBeingAttacked}`).addClass('miss');
    console.log(`.${playersGuess}${playerBeingAttacked} is a miss`)
  };
  if (continueGame){
    return false;
  }else{
    return true;
  };
};// end of app.checkGuess

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

      // alert(`The winner is ${app.gameOver.winner}`);

      
    });
  });
}; // end of app.init

$(function() {
  app.init();
});