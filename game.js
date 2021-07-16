// Arrays (Patterns) :
var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];


// Starter variables
var firstTime = true;
var level = 0;
var lastScore = 0;
var bestScore = 0;

// For detecting key press
$(document).on("keydown", function() {
  if (firstTime == true) {
    keyPressed = true;
    firstTime = false;
    nextSequence();
  }
});

// User sequence detection by clicks
$(".btn").on("click", function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  animatePress(userChosenColour);
  playSound(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

//generating the next sequence in game pattern
function nextSequence() {
  level++;
  $("#level-title").text('Level ' + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

//checking the user input pattern against the game pattern
function checkAnswer(currentLevel) {

  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("Success");
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
        userClickedPattern = [];
      }, 1000);
    }
  } else {
    console.log("Game over");
    if (level - 1 > bestScore)
      bestScore = level - 1;
    lastScore = Math.max(0, level - 1);
    $("#Best-Score").text('Best Score :' + bestScore);
    $("#Last-Score").text('Last Score :' + lastScore);
    $("#level-title").text('Game Over, Press Any Key to Restart');
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    startOver();
  }
}

//resetting starter variables
function startOver() {
  firstTime = true;
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
}

// play audio function
function playSound(name) {
  var audio = new Audio('sounds/' + name + '.mp3');
  audio.play();
}

// animate on press function
function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);

}
