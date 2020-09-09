var userClickedPattern = [];
var gamePattern = [];

var level = 0;

var start = false;

var clicks = 0;


var buttonsColors = ["red", "blue", "green", "yellow"];

$(document).keydown(function() {
  if (!start) {

    $("#level-title").text("Level " + level);
    nextSequence();
    start = true;

  }
});

function nextSequence() {

  userClickedPattern = [];

  level++;

  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor((Math.random() * 4));

  var randomChosenColor = buttonsColors[randomNumber];
  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColor);

  console.log(gamePattern);

}

$(".btn").click(function(event) {

  var userChosenColor = $(this).attr('id');
  userClickedPattern.push(userChosenColor);
  console.log(userClickedPattern);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
  // clicks++;

});

function playSound(name) {

  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();

}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {

  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {

    if (userClickedPattern.length === gamePattern.length) {

      console.log('succ');
      setTimeout(function() {

        nextSequence();
      }, 1000);
    }


  } else {
    console.log("loss");
    loss();

  }

}

function loss() {

  var audio = new Audio("sounds/wrong.mp3");
  audio.play();

  $("body").addClass("game-over");
  setTimeout(function() {
    $("body").removeClass("game-over");
  }, 200);

  $("#level-title").text("You Lost. Press any Key to Play Again");

  starOver();
}

function starOver() {

  start = false;
  level = 0;
  gamePattern = [];
}