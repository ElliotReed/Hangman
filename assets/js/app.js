// Make a hangman game

// Create an array of guitarists
const guitarists = [
  "Django Reinhardt",
  "Wes Montgomery",
  "Charlie Christian",
  "Jimmy Bryant",
  "Angus Young",
  "Alex Lifeson",
  "Jimmy Page",
  "Freddy Green",
  "Bireli Lagrene",
  "Tchavolo Schmitt",
  "Mary Osborne",
  "Joe Pass",
  "Mark Whitfield",
  "Brain May",
  "Eddie Van Halen"
];
// Create an array of incorrect guesses
var failGuess = [];
// Create an array of incorrect guesses
var goodGuess = [];
// Create Variable for number of guesses
var numGuess = 7;
// Create variable for the selected guitarist
var guitarist = "";

// On start, get random guitarist
function gameStart() {

  // Create an array of incorrect guesses
  failGuess = [];
  // Create an array of incorrect guesses
  goodGuess = [];
  // Create Variable for number of guesses
  numGuess = 7;

  guitarist = guitarists[Math.floor(Math.random() * guitarists.length)];
  // Display underscores and clear message
  displayAnswer(guitarist);
  displayMessage("");


  // Get user input
    document.onkeyup = function(event) {
      var userInput = event.key.toLowerCase();
      // console.log(userInput);
      // Test if letter already used
      if (alreadyChosen(userInput)) {
        var message = "You have already chosen that letter, try again";
        displayMessage(message);
      } else { // continue with game
        var message = "";
        displayMessage(message);
        // Compare user input to guitarist
        if (compareInputToGuitarist(userInput)) {
          displayAnswer(guitarist);
        } else {
          displayUsedLetters();
          displayGuessesLeft();
        }
      } // end ALREADYchosen

      //Test win or lose?
      if (testWin()) {
        return true;
      }
    }  //end keyup
} // end game




// Functions ------------------------------------------------------------------------------------

// Display underscores
// function displayUnderscores(guitarist) {
//   var strUnderscore = "";
//   var space = 0;

//   for (var i = 0; i < guitarist.length; i++) {
//     if (guitarist.charAt(i) === " ") {
//       strUnderscore = strUnderscore + " ";
//     } else {
//       strUnderscore = strUnderscore + "_";
//     }
//   }

//   document.querySelector("#underscores").innerHTML = strUnderscore;
// }

// Test if letter already used
function alreadyChosen(userInput) {
  if ((failGuess.includes(userInput) === true) || (goodGuess.includes(userInput) === true)) {
    return true;
  } 
}

 // Show a message
function displayMessage(message) {
  document.querySelector("#messages").innerHTML = message;
}

// Compare user input to guitarist
function compareInputToGuitarist(userInput) {
  if (guitarist.toLowerCase().includes(userInput)) {
    displayMessage("Great guess!");
    goodGuess.push(userInput);
    return true;
  } else {
      displayMessage("Incorrect guess...try again");
      failGuess.push(userInput); //  add to incorrect guesses
      numGuess--; // Count incorrect guesses
  }
}

// Display answer
function displayAnswer(guitarist) {
  var strAnswer = "";
  document.querySelector("#wordLetters").innerHTML = "";
  for (var i = 0; i < guitarist.length; i++) {
    var clsAttr = "wordLetters bottom-border";

    if (goodGuess.includes(guitarist.toLowerCase().charAt(i))) {
      strAnswer = guitarist.charAt(i);
      } else {
      strAnswer = "_";
      clsAttr = clsAttr + " hide-letter";
    }

    if (guitarist.charAt(i) === " ") {
      clsAttr =  "wordLetters hide-letter";
    }
    var newDiv = document.createElement("li");
    newDiv.setAttribute("class", clsAttr);
    newDiv.innerText = strAnswer;
    document.querySelector("#wordLetters").appendChild(newDiv);
  }

    
}

// Display used letters
function displayUsedLetters() {
  var strUsedLetters = "";
  failGuess.forEach(function(element) {
    if (strUsedLetters === "") {
      strUsedLetters = strUsedLetters + element;
    } else {
      strUsedLetters = strUsedLetters + ", " + element;
    }
    
  })

  document.querySelector("#usedLetters").innerHTML = strUsedLetters;
}

// Display guesses left
function displayGuessesLeft() {
  document.querySelector("#winLose").innerHTML = numGuess;
}

// Test win or lose
function testWin() {
  var hasLetters = false;

  for (var i = 0; i < guitarist.length; i++) {

    if (goodGuess.includes(guitarist.toLowerCase().charAt(i)) || (guitarist.charAt(i) === " ")) {
      hasLetters = true;
    } else  {
      hasLetters = false;
    }

    if (hasLetters === false) {
      if (numGuess === 0) {
        displayMessage('You lose, click "Start" to try again :(');
        document.querySelector("#wordLetters").innerHTML = guitarist;
        return true;
      }
      return false;
    } 

  }
  
  if (hasLetters === true) {
    displayMessage('You win!, click "Start" to play again :)');
    return true;
  }


}
// If correct, display, if solved display and show win!


// If incorect guesses = 7, you lose