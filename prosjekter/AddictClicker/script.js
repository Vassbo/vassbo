
// TODO: set cookies/second to include the user input

////////// Set vars //////////

var ls = true; // Local storage
var active = false;

////////// Get Local Storage Support //////////

if (typeof(Storage) == 'undefined') {
  alert("Hey, your browser doesn't support local storage, that means that your progress will not be saved!");
  ls = false;
}

////////// Check if browser window is active //////////

var tabActive = true;
window.addEventListener("focus", function(event) { tabActive = true; }, false);
window.addEventListener("blur", function(event) { tabActive = false; }, false);

////////// Local Storage //////////
// localStorage.removeItem('name');

// uncomment to reset:
// TODO: reset button
// localStorage.clicks = 0;
// localStorage.cookiesPerClick = 1;
// localStorage.cookiesPerSec = 0;
// localStorage.cookiesperclickAmount = 1;
// localStorage.cookiesperclickPrize = 40; // becomes 50
// localStorage.autoclickersAmount = 0;
// localStorage.autoclickersPrize = 5;
// localStorage.speedclickersAmount = 0;
// localStorage.speedclickersPrize = 100;
// localStorage.bgcolor = JSON.stringify(['true', 'false', 'false', 'false', 'false', 'false', 'false', 'false']);
// localStorage.selectedColor = 'defaultColor';
// localStorage.bgcolorhex = '#e0cdbc';

if (!localStorage.clicks) {
  localStorage.clicks = 0;
}
var clicks = Number(localStorage.clicks);
updateClicks();

if (!localStorage.cookiesPerClick) {
  localStorage.cookiesPerClick = 1;
}
var cookiesPerClick = Number(localStorage.cookiesPerClick);

if (!localStorage.cookiesPerSec) {
  localStorage.cookiesPerSec = 0;
}
var cookiesPerSec = Number(localStorage.cookiesPerSec);
document.getElementById('cookiesPerSecAmount').innerHTML = cookiesPerSec;


if (!localStorage.cookiesperclickAmount) {
  localStorage.cookiesperclickAmount = 1;
}
if (!localStorage.cookiesperclickPrize) {
  localStorage.cookiesperclickPrize = 40;
}
document.getElementById('cookiesperclickAmount').innerHTML = localStorage.cookiesperclickAmount;
var what = 'cookiesperclick';
document.getElementById(what + 'Prize').innerHTML = Number(localStorage.cookiesperclickPrize) + Number(document.getElementById(what + 'Amount').innerHTML) * 10;

if (!localStorage.autoclickersAmount) {
  localStorage.autoclickersAmount = 0;
}
if (!localStorage.autoclickersPrize) {
  localStorage.autoclickersPrize = 5;
}
document.getElementById('autoclickersAmount').innerHTML = localStorage.autoclickersAmount;
var what = 'autoclickers';
document.getElementById(what + 'Prize').innerHTML = Number(localStorage.autoclickersPrize) + Number(document.getElementById(what + 'Amount').innerHTML) * 20;

if (!localStorage.speedclickersAmount) {
  localStorage.speedclickersAmount = 0;
}
if (!localStorage.speedclickersPrize) {
  localStorage.speedclickersPrize = 100;
}
document.getElementById('speedclickersAmount').innerHTML = localStorage.speedclickersAmount;
var what = 'speedclickers';
document.getElementById(what + 'Prize').innerHTML = Number(localStorage.speedclickersPrize) + Number(document.getElementById(what + 'Amount').innerHTML) * 25;


if (!localStorage.bgcolor) {
  localStorage.bgcolor = JSON.stringify(['true', 'false', 'false', 'false', 'false', 'false', 'false', 'false']);
}
var bgcolorArray = JSON.parse(localStorage.bgcolor);

if (!localStorage.selectedColor) {
  localStorage.selectedColor = 'defaultColor';
}
var selectedColor = document.getElementById(localStorage.selectedColor);

if (!localStorage.bgcolorhex) {
  localStorage.bgcolorhex = '#e0cdbc';
}
document.body.style.background = localStorage.bgcolorhex;


var colorDiv = ['defaultColor', 'redColor', 'orangeColor', 'yellowColor', 'greenColor', 'blueColor', 'indigoColor', 'violetColor'];
var i = 0;
while (i <= 7) {
  if (bgcolorArray[i] == 'true') {
    var color = colorDiv[i];
    var colorButton = document.getElementById(color);

    colorButton.style.padding = "8px";
    colorButton.style.height = '24px';
    colorButton.innerHTML = "";

    selectedColor.style.padding = "8px 8px 3px 8px";
    selectedColor.style.height = '';
    selectedColor.innerHTML = "<i id='" + color + "Prize' class='material-icons'>check_circle</i>";
  }
  i++;
}

////////// Counter //////////

// store time and min
setInterval(timer, 60000);

// store to local storage
if (!localStorage.time) {
  localStorage.time = 0;
}

var time = localStorage.time;
var min = time % 60;

timer('first');
function timer(x) {
  var minutes = document.getElementById('minutes');
  var hours = document.getElementById('hours');

  if (x != 'first') {
    min++;
    time++;
  }

  if (min == 60) {
    min = 0;
  }

  if (time >= 60) {
    var h = Math.floor(time / 60);

    minutes.innerHTML = min;
    hours.innerHTML = h;

  } else {
    minutes.innerHTML = time;
  }

  localStorage.time = time;
}

////////// Button menus //////////

var title = document.getElementById("title");
var mainMenu = document.getElementById("main").classList;
var back = document.getElementById("back").classList;
var activeMenu = "";

function button(id) {

  // remove "Btn"
  var currentName = id.slice(0, -3);

  // get element and store it
  var current = document.getElementById(currentName).classList;
  activeMenu = current;

  // make first letter uppercase and set as title
  var upperFirstLetter = currentName.charAt(0).toUpperCase() + currentName.slice(1);
  title.innerHTML = upperFirstLetter;

  // show and hide elements
  mainMenu.add("hidden");
  back.remove("hidden");
  current.remove("hidden");
}

function goBack() {
  title.innerHTML = "AddictClicker";
  mainMenu.remove("hidden");
  back.add("hidden");
  activeMenu.add("hidden");
}

////////// Clicks //////////

var down = false;

var cps = cookiesPerClick + cookiesPerSec;
setInterval(clicksPerSec, 1000);
function clicksPerSec() {
  cps = cookiesPerSec;
  document.getElementById('cookiesPerSecAmount').innerHTML = cookiesPerSec;
}

function clicked(e) {
  if (e.keyCode == 32 && down == false || e == "click" && down == false) {
    clicks += cookiesPerClick;
    updateClicks();
    cookieRain();

    cps += cookiesPerClick;
    document.getElementById('cookiesPerSecAmount').innerHTML = cps;
  }
  if (e.keyCode == 32) {
    down = true;
  }
}

function updateClicks() {
  if (clicks == 1) {
    document.getElementById('clicks').innerHTML = clicks + ' cookie';
  } else if (clicks > 999999999999) {
    document.getElementById('clicks').innerHTML = 'Infinite cookies';
  } else {
    document.getElementById('clicks').innerHTML = clicks + ' cookies';
  }
  localStorage.clicks = clicks;
}

function spaceup(e) {
  if(e.keyCode == 32) {
    down = false;
  }
}

// TODO: animation on space
document.body.addEventListener("keydown", clicked);
document.body.addEventListener("keyup", spaceup);

////////// Cookie Rain //////////

// TODO: Cookie Rain
function cookieRain() {
  var cookieDiv = document.createElement("div");
  cookieDiv.id = "image";
  cookieDiv.style.top = "-60px";
  cookieDiv.style.zIndex = "-2";

  var width = window.screen.availWidth;
  var ranNum = Math.floor(Math.random() * width) + 250;
  cookieDiv.style.left = ranNum + "px";

  document.body.appendChild(cookieDiv);

  var cookie = document.createElement("img");
  cookie.src = "cookie.png";
  cookie.style.height = "12vh";
  cookie.style.opacity = "0.6";
  cookie.setAttribute("draggable", false);
  cookie.setAttribute("onclick", 'removeMe(this)');

  cookieDiv.appendChild(cookie);

  // animate
  var ranSpeed = Math.floor(Math.random() * 12) + 0.5;
  var id = setInterval(frame, ranSpeed);
  var pos = -60;
  function frame() {
    if (pos > window.screen.availWidth - 500) {
      clearInterval(id);
      cookieDiv.remove();
    } else {
      pos++;
      cookieDiv.style.top = pos + 'px';
    }
  }
}

function removeMe(elem) {
  elem.remove();
  clicks += cookiesPerClick + 5;
  updateClicks();

  cps += cookiesPerClick + 5;
  document.getElementById('cookiesPerSecAmount').innerHTML = cps;
}

////////// Autoclickers //////////

function buy(what) {

  var amount = document.getElementById(what + 'Amount');
  var prize = document.getElementById(what + 'Prize');
  var cost = prize.innerHTML;

  // alert(clicks >= cost);
  // alert(Number(amount.innerHTML) + 1);
  // alert(document.getElementById(what + 'Prize').innerHTML);

  if (clicks >= cost && amount.innerHTML < 100) {

    if (what == 'autoclickers') {
      cookiesPerSec += 1;
      localStorage.cookiesPerSec = cookiesPerSec;
      newCost = Number(cost) + (Number(amount.innerHTML) + 1) * 20;
      localStorage.autoclickersPrize = cost;
      localStorage.autoclickersAmount = Number(amount.innerHTML) + 1;
    } else if (what == 'speedclickers') {
      cookiesPerSec += 2;
      localStorage.cookiesPerSec = cookiesPerSec;
      newCost = Number(cost) + (Number(amount.innerHTML) + 1) * 25;
      localStorage.speedclickersPrize = cost;
      localStorage.speedclickersAmount = Number(amount.innerHTML) + 1;
    } else if (what == 'cookiesperclick') {
      cookiesPerClick += 1;
      localStorage.cookiesPerClick = cookiesPerClick;
      newCost = Number(cost) + (Number(amount.innerHTML) + 1) * 10;
      localStorage.cookiesperclickPrize = cost;
      localStorage.cookiesperclickAmount = Number(amount.innerHTML) + 1;
    }
    document.getElementById('cookiesPerSecAmount').innerHTML = cookiesPerSec;
    clicks -= cost;
    amount.innerHTML = Number(amount.innerHTML) + 1;
    prize.innerHTML = newCost;
    updateClicks();

    if (amount.innerHTML == 100) {
      buy(what);
    }

  } else if (Number(amount.innerHTML) >= 100) {
    document.getElementById(what + 'Cookies').innerHTML = "";
    prize.innerHTML = "MAX";
    inform("Max amount of autoclickers reached");
  } else {
    inform("Not enough money");
  }
}

setInterval(autoclicker, 1000);
function autoclicker() {
  clicks += cookiesPerSec;
  updateClicks();

  if (tabActive == true) {
    if (cookiesPerSec >= 1) {
      cookieRain();
      if (cookiesPerSec >= 5) {
        cookieRain();
        if (cookiesPerSec >= 10) {
          cookieRain();
          if (cookiesPerSec >= 25) {
            cookieRain();
            if (cookiesPerSec >= 50) {
              cookieRain();
              if (cookiesPerSec >= 75) {
                cookieRain();
                if (cookiesPerSec >= 100) {
                  cookieRain();
                }
              }
            }
          }
        }
      }
    }
  }
}

////////// Backgrounds //////////

function buybg(color) {

  var prize = '';
  if (document.getElementById(color + "Prize")) {
    prize = document.getElementById(color + "Prize");
  }
  if (clicks >= 1000 && prize.innerHTML == "1000 cookies") {
    clicks -= 1000;
    updateClicks();
    changeBG(color);
    storeBGs(color);
  } else if (clicks < 1000 && prize.innerHTML == "1000 cookies") {
    inform("Not enough money");
  } else if (prize.innerHTML != "1000 cookies") {
    changeBG(color);
  }
}

function changeBG(color) {
  selectedColor.style.padding = "8px";
  selectedColor.style.height = '24px';
  selectedColor.innerHTML = "";

  var colorButton = document.getElementById(color);
  selectedColor = colorButton;
  colorButton.style.padding = "8px 8px 3px 8px";
  selectedColor.style.height = '';
  colorButton.innerHTML = "<i id='" + color + "Prize' class='material-icons'>check_circle</i>";
  localStorage.selectedColor = color;

  bgcolor = '#e0cdbc';
  switch (color) {
    case 'redColor':
      bgcolor = '#c32020';
      break;
    case 'orangeColor':
      bgcolor = '#d98b2c';
      break;
    case 'yellowColor':
      bgcolor = '#d5d127';
      break;
    case 'greenColor':
      bgcolor = '#20c34f';
      break;
    case 'blueColor':
      bgcolor = '#2066c3';
      break;
    case 'indigoColor':
      bgcolor = '#8620c3';
      break;
    case 'violetColor':
      bgcolor = '#b820c3';
      break;
    default:
      bgcolor = '#e0cdbc';
      break;
  }
  localStorage.bgcolorhex = bgcolor;
  document.body.style.background = bgcolor;
}

function storeBGs(color) {
  switch (color) {
    case 'redColor':
      bgcolorArray[1] = 'true';
      break;
    case 'orangeColor':
      bgcolorArray[2] = 'true';
      break;
    case 'yellowColor':
      bgcolorArray[3] = 'true';
      break;
    case 'greenColor':
      bgcolorArray[4] = 'true';
      break;
    case 'blueColor':
      bgcolorArray[5] = 'true';
      break;
    case 'indigoColor':
      bgcolorArray[6] = 'true';
      break;
    case 'violetColor':
      bgcolorArray[7] = 'true';
      break;
  }
  localStorage.bgcolor = JSON.stringify(bgcolorArray);
}

////////// Inform //////////

function inform(text) {
  if (active == false) {
    active = true;

    var inform = document.getElementById('informDiv');
    var content = document.getElementById('inform');
    content.innerHTML = text;

    if (inform.classList.contains('slide-out')) {
      document.getElementById('informDiv').classList.remove('slide-out');
    }
    document.getElementById('informDiv').classList.add('slide-in');

    setTimeout(function () {
      document.getElementById('informDiv').classList.remove('slide-in');
      document.getElementById('informDiv').classList.add('slide-out');
      active = false;
    }, 4000); // 4 seconds
  }
}

////////// Clock //////////

clock();
function clock() {
  var h = checkTime(new Date().getHours());
  var m = checkTime(new Date().getMinutes());
  document.getElementById('clock').innerHTML = h + ":" + m;
  setTimeout(clock, 500);
}
// add zero in front of numbers < 10
function checkTime(i) {
  if (i < 10) { i = "0" + i; }
  return i;
}
