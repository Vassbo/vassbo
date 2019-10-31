
var elevatorDoor = document.getElementsByClassName("elevator-door1")[0];
function elevator_open() {
  if (elevatorDoor.offsetLeft !== -100) { // 0 = closed, -100 = opened
    document.getElementsByClassName("elevator-door1")[0].classList.add("opened");
    document.getElementsByClassName("elevator-door2")[0].classList.add("opened");
    auto_close();
  }
}
function elevator_close() {
  if (elevatorDoor.offsetLeft == -100) { // 0 = closed, -100 = opened
    document.getElementsByClassName("elevator-door1")[0].classList.remove("opened");
    document.getElementsByClassName("elevator-door2")[0].classList.remove("opened");
  }
}

var timeout;
function auto_close() {
  clearTimeout(timeout);
  var timing = 3500 - (Math.abs(elevatorDoor.offsetLeft) / 100 * 3500);
  timeout = setTimeout(function() {
    elevator_close();
  }, timing + 5000);
}



var alarm = false;
function bell(id) {
  alarm = true;
  // alert...
}


function floor(id) {
  if (!alarm) {
    document.getElementById(id).classList.add("active");
    var query = document.querySelectorAll('.active');
    if (query.length >= 12) {
      for (var i = 0; i < 12; i++) {
        query[i].classList.remove("active");
      }
    }
  }
}

// selecting 11 of the buttons and clicking alarm will deselect everything...

// TODO: no text selecting...




function call(direction, id) {
  if (!alarm) {
    document.getElementById(id).classList.add("callActive");
  }
}
