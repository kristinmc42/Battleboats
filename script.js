const app = {
  boats: [{name:'carrier', length: 5}, {name: 'battleship', length: 4}, {name: 'cruiser', length: 3}, {name: 'submarine', length: 3}, {name: 'destroyer', length: 2}],
  tryAgain: false,

};

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

  app.setDestroyerInput = $('setDestroyer').val('');
  app.setDestroyerRadioButttons = $('input[name="destroyerDirection"]').prop('checked', false);
};//end of resetFroms function

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
  

  
  let player = '.player1';

  app.setCarrierButton = $('#submitCarrier').on('click', function(e) {

    e.preventDefault();

    // when the user clicks on the submit button: 
    //    set the carrier
    const carrierPosition = app.setCarrier();

    console.log (carrierPosition);

    app.placeOnBoard(carrierPosition, player);

    // disable  setCarrier button and show form for Battleship

    app.setCarrierButton = $('#submitCarrier').attr('disabled', true);

    app.setFormElements = $('form[name="setBattleshipForm"]').show();
  }); 

  app.setBattleshipButton = $('#submitBattleship').on('click', function (e){

    e.preventDefault();

    // when the user clicks on the submit button: 
    //    set the Battleship
    const battleshipPosition = app.setBattleship();

    app.placeOnBoard(battleshipPosition, player);

    app.setBattleshipButton = $('#submitBattleship').attr('disabled', true);

    app.setFormElements = $('form[name="setCruiserForm"]').show();
  });

  app.setCruiserButton = $('#submitCruiser').on('click', function (e){

    e.preventDefault();

    console.log('submitCruiserButton pressed');

    const cruiserPosition = app.setCruiser();

    app.placeOnBoard(cruiserPosition, player);

    console.log('placeOnBoard for cruiser called');

    app.setCruiserButton = $('#submitCruiser').attr('disabled', true);

    app.setFormElements = $('form[name="setSubmarineForm"]').show();
  });

  app.setSubmarineButton = $('#submitSubmarine').on('click', function (e){

    e.preventDefault();

    const submarinePosition = app.setSubmarine();

    app.placeOnBoard(submarinePosition, player);

    app.setSubmarineButton = $('#submitSubmarine').attr('disabled', true);

    app.setFormElements = $('form[name="setDestroyerForm"]').show();
  });

  app.setDestroyerButton = $('#submitDestroyer').on('click', function (e){

    e.preventDefault();

    const destroyerPosition = setDestroyer();

    app.placeOnBoard(destroyerPosition, player);

    app.setDestroyerButton = $('#submitDestroyer').attr('disabled', true);
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

}; // end of app.setBpats function

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

  console.log(startingPosition, direction, vertical)


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

app.placeOnBoard = (shipArray, player) => {
  // takes 2 parameters, shipArray[startingPosition, vertical, boatLength] & player (player1 or player2)
  //find the div that matches startingPosition and add class occuppied
  // separate string of startingPosition into row (number) and column (letter)
  // starting from startingPosition, and based on vertical true/false, make sure the boat will fit inside gameboard using boatlength

  
  const startingPosition = shipArray[0];
  let position = shipArray[0];
  const positionArray = position.split('');
  let column = positionArray[1];
  let convertedRow = 1;
  
  console.log( `${startingPosition} is a ${typeof startingPosition}, ${position} is a ${typeof position}, ${positionArray} is a ${typeof positionArray},  ${column} is a ${typeof column}`);

  if (positionArray.length === 3){
    convertedRow = parseInt(positionArray[2]);
  }else {
    const row = positionArray[2] + positionArray[3]
    convertedRow = parseInt(row);
  }

  // turn column from a letter into a number
  // loop through 1-10 checking against alphabet

  const columnArray = ["a","b","c","d","e","f","g","h","i","j"];

  const convertedColumn = columnArray.indexOf(column) + 1;

  console.log(column, convertedColumn, convertedRow);

 //check that the length of the boat won't put it outside of the playing area
 //change class of squares to occuppied 
 const vertical = shipArray[1]; 
 const boatLength = shipArray[2];

  if (vertical && (convertedRow + boatLength) <=10){
    console.log('assigning occupied to boat in column');

    $(`${player}${startingPosition}`).addClass('occuppied');
    for (let i = 1; i < boatLength; i++){
     $(`${player}.${column}${convertedRow + i}`).addClass('occuppied');
    };
  }else if (!vertical && (convertedColumn + boatLength) <= 10){
    console.log('assigning occupied to boat in row');

    $(`${player}${startingPosition}`).addClass('occuppied');
    for (let j = 0; j < boatLength -1; j++){
      column = columnArray[convertedColumn + j];

      console.log(`${player}.${column}${convertedRow}`);

      $(`${player}.${column}${convertedRow}`).addClass('occuppied');
     }; 
  }else {
    // condition for when boat length will be outside of the board dimensions
    alert('The boat does not fit inside the board in that direction. Please try again')
    app.tryAgain = true;
  };
};// end of placeOnBoard function

app.init = () => {
  // Hide h3 and forms for setting boats
  app.inputH3Element = $('.input h3').hide();
  // app.setFormElements = $('.setForm').hide();
  
  app.newGameButton = $('#newGame').on('click', function (e) {

    e.preventDefault();

    // when newGame button clicked, reset page, then ask user input for their name and for placing ships
    
    // location.reload();
    //this isn't working. Need to find a different way to reset page but still prompt for user name
    
    //reset forms for boat input
    app.resetForms();

    //get player's name and display it on their board
    app.userName = prompt("What is your name?");
    app.h3UserName = $('#user').html(`(${app.userName}'s board)`);

    //set the player's boats
    app.setBoats();

  });
};

$(function() {
  app.init();
});