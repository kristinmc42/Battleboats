const app = {
  boats: [{name:'carrier', length: 5}, {name: 'battleship', length: 4}, {name: 'cruiser', length: 3}, {name: 'submarine', length: 3}, {name: 'destroyer', length: 2}],
  tryAgain: false,

};

app.getPlayerName = () => {
  // asks user for their name
  // saves name in variable
  // displays user name under Player 1
  app.userName = prompt("What is your name?");
  $('#user').html(`(${app.userName}'s board)`);
};

app.setBoats = () => {
// ask player what square they would like to set their boat in
// ask if they want the boat set vertically or horizontal
//check if square is already occuppied
// if not, change class to occuppied
//repeat for each boat

  app.inputDiv = $('.input').prepend(`<h3>${app.userName}. Let's set your boats</h3>`);


  // show h3 and first of the boat forms
  app.inputH3Element = $('.input h3').show();
  app.setFormElements = $('form[name="setCarrierForm"]').show();
  
  let startingPosition = '';
  let direction = '';
  let vertical = true;
  let player = '.player1';

  app.setCarrierButton = $('#submitCarrier').on('click', function() {
    // when the user clicks on the submit button: 
    //    hide the submitCarrier form
    
  
    
    //    set the carrier
    const CarrierPosition = app.setCarrier();
    app.placeOnBoard(CarrierPosition, player);

    // hide form for Carrier and show form for Battleship

    app.setFormElements = $('form[name="setCarrierForm"]').hide();

    app.setFormElements = $('form[name="setBattleshipForm"]').show();
  });

  app.setBattleshipButton = () => {

 };   

    




  
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

};

app.setCarrier = () => {
    //    assign the text field to variable startingPosition
    //    asssign variable vertical true or false depending on the radio button value

    startingPosition = $('.setCarrier').val();
    startingPosition = '.' + startingPosition.toLowerCase();
    
    direction = $('input[type="radio"]:checked').val();

    if (direction === 'carrierVertical'){
      vertical = true;
    } else {
      vertical = false;
    }
    
    const boatLength = 5;

    console.log(startingPosition, direction, vertical)


    return [startingPosition, vertical, boatlength];
};

app.setBattleship = () => {
  //    assign the text field to variable startingPosition
  //    asssign variable vertical true or false depending on the radio button value

  startingPosition = $('.setBattleship').val();
  startingPosition = '.' + startingPosition.toLowerCase();
  
  direction = $('input[type="radio"]:checked').val();

  if (direction === 'battleshipVertical'){
    vertical = true;
  } else {
    vertical = false;
  }
  
  const boatLength = 4;

  console.log(startingPosition, direction, vertical)


  return [startingPosition, vertical, boatlength];
};

app.setCruiser = () => {
  //    assign the text field to variable startingPosition
  //    asssign variable vertical true or false depending on the radio button value

  startingPosition = $('.setCruiser').val();
  startingPosition = '.' + startingPosition.toLowerCase();
  
  direction = $('input[type="radio"]:checked').val();

  if (direction === 'cruiserVertical'){
    vertical = true;
  } else {
    vertical = false;
  }
  
  const boatLength = 3;

  console.log(startingPosition, direction, vertical)


  return [startingPosition, vertical, boatlength];
};

app.setSubmarine = () => {
  //    assign the text field to variable startingPosition
  //    asssign variable vertical true or false depending on the radio button value

  startingPosition = $('.setSubmarine').val();
  startingPosition = '.' + startingPosition.toLowerCase();
  
  direction = $('input[type="radio"]:checked').val();

  if (direction === 'submarineVertical'){
    vertical = true;
  } else {
    vertical = false;
  }
  
  const boatLength = 3;

  console.log(startingPosition, direction, vertical)


  return [startingPosition, vertical, boatlength];
};

app.setDestroyer = () => {
  //    assign the text field to variable startingPosition
  //    asssign variable vertical true or false depending on the radio button value

  startingPosition = $('.setDestroyer').val();
  startingPosition = '.' + startingPosition.toLowerCase();
  
  direction = $('input[type="radio"]:checked').val();

  if (direction === 'destroyerVertical'){
    vertical = true;
  } else {
    vertical = false;
  }
  
  const boatLength = 2;

  console.log(startingPosition, direction, vertical)


  return [startingPosition, vertical, boatlength];
};

app.placeOnBoard = (shipArray, player) => {
  // takes 1 parameter player (player1 or player2)
  //find the div that matches startingPosition and add class occuppied
  // separate string of startingPosition into row (number) and column (letter)
  // starting from startingPosition, and based on vertical true/false, make sure the boat will fit inside gameboard using boatlength

  const positionArray = shipArray.startingPosition.split();
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

  const columnArray = ["a","b","c","d","e","f","g","h","i","j"];

  const convertedColumn = columnArray.indexOf(column);

  console.log(column, convertedColumn, convertedRow);

 //check that the length of the boat won't put it outside of the playing area
 //change class of squares to occuppied 
  
  if (shipArray.vertical && (convertedRow + shipArray.boatLength) <=10){
    $(`${player}${shipArray.startingPosition}`).addClass('occuppied');
    for (let i = 1; i < shipArray.boatLength; i++){
     $(`${player}.${column}${convertedRow + i}`).addClass('occuppied');
    };
  }else if (!shipArray.vertical && (convertedColumn + shipArray.boatLength + 1) <= 10){
    $(`${player}${shipArray.startingPosition}`).addClass('occuppied');
    for (let j = 1; j < shipArray.boatLength; j++){
      column = columnArray[convertedColumn + j];
      $(`${player}.${column}${convertedRow}`).addClass('occuppied');
     }; 
  }else {
    // condition for when boat length will be outside of the board dimensions
    alert('The boat does not fit inside the board in that direction. Please try again')
    app.tryAgain = true;
  };


};

app.init = () => {
  // Hide h3 and forms for setting boats
  app.inputH3Element = $('.input h3').hide();
  app.setFormElements = $('.setForm').hide();

  app.newGameButton = $('#newGame').on('click', function () {
    // when newGame button clicked, reset page, then ask user input for their name and for placing ships

    // location.reload();
    //this isn't working. Need to find a different way to reset page but still prompt for user name

    //get player's name
    app.getPlayerName();

    //set the player's boats
    app.setBoats();

  });
};

$(function() {
  app.init();
});