var Simon = window.Simon = {};

var gameOn = Simon.gameOn = false;
var gameStarted = Simon.gameStarted = false;
var clickable = Simon.clickable = false;
var waitingForPlayer = Simon.waitingForPlayer = false;
var strictMode = Simon.strictMode = false;
var stepsCount = Simon.stepsCount = 0;
var winner = Simon.winner = false;
var steps = Simon.steps = [];
var sequenceCount = Simon.sequenceCount = 0;

var audio1 = Simon.audio1 = document.getElementById("sound1");
var audio2 = Simon.audio1 = document.getElementById("sound2");
var audio3 = Simon.audio1 = document.getElementById("sound3");
var audio4 = Simon.audio1 = document.getElementById("sound4");

var handleButtonPress = Simon.handleButtonPress = function(e) {
  e.preventDefault();
  if(!clickable) { return; }

  switch(e.currentTarget.id) {
    case "1":
      $('#1').addClass("green-active");
      setTimeout(function() {
        $('#1').removeClass("green-active");
      }, 500);
      audio1.play();
      break;
    case "2":
      $('#2').addClass("red-active");
      setTimeout(function() {
        $('#2').removeClass("red-active");
      }, 500);
      audio2.play();
      break;
    case "3":
      $('#3').addClass("blue-active");
      setTimeout(function() {
        $('#3').removeClass("blue-active");
      }, 500);
      audio3.play();
      break;
    case "4":
      $('#4').addClass("yellow-active");
      setTimeout(function() {
        $('#4').removeClass("yellow-active");
      }, 500);
      audio4.play();
      break;
  }

  if(waitingForPlayer) {
    console.log("waiting for player!");
    if(e.currentTarget.id === "" + steps[sequenceCount]) {
      console.log("match!");
      sequenceCount++;
      if(sequenceCount === steps.length) {
        if(steps.length === 20) {
          flashWin();
          setTimeout(function() { handleStartButton(); }, 2000);
          return;
        }
        sequenceCount = 0;
        waitingForPlayer = false;
        setTimeout(function() { playRound(); },500);
      }
    } else if(strictMode) {
      flashError();
      setTimeout(function() { handleStartButton(); }, 1200);
    } else {
      waitingForPlayer = false;
      flashError();
      setTimeout(function() { playSteps(); }, 1200);
      sequenceCount = 0;
    }
  }
};

var flashError = Simon.flashError = function() {
  $('.step-text').text("ERR");
  flashDisplayStart();
};

var flashWin = Simon.flashWin = function() {
  $('.step-text').text("WIN");
  setTimeout(function() { $('.step-text').toggleClass('display-on'); }, 250);
  setTimeout(function() { $('.step-text').toggleClass('display-on'); }, 500);
  setTimeout(function() { $('.step-text').toggleClass('display-on'); }, 750);
  setTimeout(function() { $('.step-text').toggleClass('display-on'); }, 1000);
};

var handleOnOffSwitch = Simon.handleOnOffSwitch = function(e) {
  e.preventDefault();

  $('.on-off-switch').toggleClass("on");
  $('.start').toggleClass("clickable");
  $('.strict-button').toggleClass("clickable");
  $('.step-text').toggleClass('display-on');
  Simon.gameOn = !Simon.gameOn;
  if(!Simon.gameOn) { reset(); }
};

var handleStrictSwitch = Simon.handleStrictSwitch = function(e) {
  e.preventDefault();
  if(Simon.gameOn) {
    $('.strict-led').toggleClass("led-on");
    strictMode = !strictMode;
  }
};

var handleStartButton = Simon.handleStartButton = function(e) {
  if(!Simon.gameOn) { return; }
  reset();
  flashDisplayStart();
  playRound();
};

var playRound = Simon.playRound = function() {
  addStep();
  console.log(steps);
  clickable = true;
  playSteps();
  turnOnButtons();
};

var playSteps = Simon.playSteps = function() {
  var i = 0;
  Simon.sequenceInt = setInterval(function() {
    playStep(i);
    i++;
    if(i === steps.length) {
      clearInterval(Simon.sequenceInt);
      waitingForPlayer = true;
    }
  }, 1000);

};

var playStep = Simon.playStep = function(i) {
  switch(steps[i]) {
    case 1:
      $('#1').addClass("green-active").click();
      setTimeout(function() {
        $('#1').removeClass("green-active");
      }, 500);
      break;
    case 2:
      $('#2').addClass("red-active").click();
      setTimeout(function() {
        $('#2').removeClass("red-active");
      }, 500);
      break;
    case 3:
      $('#3').addClass("blue-active").click();
      setTimeout(function() {
        $('#3').removeClass("blue-active");
      }, 500);
      break;
    case 4:
      $('#4').addClass("yellow-active").click();
      setTimeout(function() {
        $('#4').removeClass("yellow-active");
      }, 500);
      break;
  }
};

var addStep = Simon.addStep = function() {
  stepsCount++;
  steps.push(Math.floor(Math.random()*4+1));
  if(stepsCount < 10) {
    $('.step-text').text("0" + stepsCount);
  } else {
    $('.step-text').text(stepsCount);
  }
};

var turnOnButtons = Simon.turnOnButtons = function() {
  $('.button').addClass("clickable");
};

var reset = Simon.reset = function() {
  gameStarted = false;
  waitingForPlayer = false;
  strictMode = false;
  $('.step-text').text("--");
  $('.strict-led').removeClass("led-on");
  steps = [];
  stepsCount = 0;
  clickable = false;
  sequenceCount = 0;
};

var flashDisplayStart = Simon.flashDisplayStart = function() {
  setTimeout(function() { $('.step-text').toggleClass('display-on'); }, 250);
  setTimeout(function() { $('.step-text').toggleClass('display-on'); }, 500);
  setTimeout(function() { $('.step-text').toggleClass('display-on'); }, 750);
  setTimeout(function() { $('.step-text').toggleClass('display-on'); }, 1000);
  if(stepsCount < 10) {
    setTimeout(function() { $('.step-text').text("0" + stepsCount); }, 1001);
  } else {
    setTimeout(function() { $('.step-text').text(stepsCount); }, 1001);
  }
};
