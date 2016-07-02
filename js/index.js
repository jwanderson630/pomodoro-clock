var workTime = 1200000;
var breakTime = 300000;
var time = 3000;
var workTimeTotal = 1200000;
var breakTimeTotal = 300000;
var timeTotal = 3000;
var onBreak = false;
var percent = 0;
var isRunning = false;
var isPaused = false; 
var timer;
function subTime() {
  if (time > 0){
    time -= 1000;
    progPercent();
    var display = timeConvert(time);
    $("#time").html(display);
  } else if (time === 0 && onBreak === false){
    onBreak = true;
    time = breakTime;
    timeTotal = breakTimeTotal;
    alert("Start your break!");
  } else {
    onBreak = false;
    time = workTime;
    timeTotal = workTimeTotal;
    alert("Start working!");
  }

}

var timeConvert = function(milli) {
  var seconds = milli / 1000;
  var mins = Math.floor(seconds / 60);
  seconds = seconds % 60;
  seconds = addZero(seconds);
  mins = addZero(mins);
  return mins + ":" + seconds;
};

var addZero = function(value) {
  if (value < 10) {
    return "0" + value;
  } else {
    return value;
  }
};
var progPercent = function() {
  percent = ((timeTotal - time) / timeTotal) * 100;
  $('.progress-bar').css('width', percent + '%').attr('aria-valuenow', percent);
};

var startClock = function(){
  if (onBreak === false){
    time = workTime;
    timeTotal = workTimeTotal;
  } else {
    time = breakTime;
    timeTotal = breakTimeTotal;
  }
  timer = window.setInterval(subTime, 1000);
}

$(".start").click(function() {
  if (isRunning === false){
    startClock();
    isRunning = true;
    isPaused = false;
    $(".btn").html("Pause").toggleClass("btn-danger");
    $(".progress-bar").addClass("active");
  } else if (isRunning === true && isPaused === false) {
    clearInterval(timer);
    isPaused = true;
    $(".btn").html("Start").toggleClass("btn-danger");
    $(".progress-bar").removeClass("active");
  } else if (isRunning === true && isPaused === true) {
    isPaused = false;
    $(".btn").html("Pause").toggleClass("btn-danger");
    timer = window.setInterval(subTime, 1000);
    $(".progress-bar").addClass("active");
  }

});


$("a").click(function(){
  if ($(this).hasClass("bl")){
    $(".bl").parent().removeClass("active");
  } else {
    $(".wl").parent().removeClass("active");
  }
  
  $(this).parent().addClass("active");
  var btn = $(this).attr("id");
  switch(btn) {
    case "br5":
      breakTime = 300000;
      breakTimeTotal = 300000;
      break;
    case "br10":
      breakTime = 600000;
      breakTimeTotal = 600000;
      break;
    case "br15":
      breakTime = 900000;
      breakTimeTotal = 900000;
      break;
    case "br20":
      workTime = 1200000;
      workTimeTotal = 1200000;
      break;
    case "w20":
      workTime = 1200000;
      workTimeTotal = 1200000;
      break;
    case "w25":
      workTime = 1500000;
      workTimeTotal = 1500000;
      break;
    case "w30":
      workTime = 1800000;
      workTimeTotal = 1800000;
      break;
    case "w35":
      workTime = 2100000;
      workTimeTotal = 2100000;
      break; 
  }
  if (isRunning === true && isPaused === false && $(this).hasClass("wl") && onBreak === false){
    clearInterval(timer);
    startClock();
  } else if (isRunning === true && isPaused === true && onBreak === false){
    clearInterval(timer);
    isRunning = false;
    var display = timeConvert(workTime);
    $("#time").html(display);
  } else if (isRunning === true && isPaused === true && onBreak === true){
    clearInterval(timer);
    isRunning = false;
    var display = timeConvert(breakTime);
    $("#time").html(display);
  } else if (isRunning === true && isPaused === false && onBreak === true && $(this).hasClass("bl")){
    clearInterval(timer);
    startClock();
  } else if ($(this).hasClass('wl')) {
    var display = timeConvert(workTime);
    $("#time").html(display);
  }
})