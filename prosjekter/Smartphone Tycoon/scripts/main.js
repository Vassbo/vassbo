if (localStorage.company == undefined) {
  location.href = 'create/index.html';
} else {
  var query = document.querySelectorAll(".company_name");
  for (var i = 0; i < query.length; i++) {
    query[i].innerHTML = localStorage.company;
    // alert(localStorage.company);
  }
  document.getElementById("money").innerHTML = localStorage.money;
}






var currentPage = "main";
function menuButton(button) {
  document.getElementsByClassName("main-side-menu")[0].classList.remove("slide-right");
  if (button == "logout") {
    window.location = "index.php?logout='1'";
  } else {
    if (button == "factory-input") {
      document.body.style.background = "url('img/gradient/orange-pink-gradient.png')"; // https://cdn.slidemodel.com/wp-content/uploads/7382-01-duotone-gradients-powerpoint-templates-16x9-4.jpg')"; //"#454545";
      document.body.style.backgroundSize = "cover";

      // document.getElementsByClassName("factory-input-box")[0].classList.add("shadow-drop-center");
      fadeout(document.getElementsByClassName("right-menu")[0]);
      fadein(document.getElementsByClassName("factory-input")[0]);

      // document.getElementsByClassName("main")[0].classList.add("hidden");
      // document.getElementsByClassName("main-side-menu")[0].classList.add("hidden");
      // document.getElementsByClassName("right-menu")[0].classList.add("hidden");
      // document.getElementsByClassName("factory-input")[0].classList.remove("hidden");
      // document.getElementById("money").innerHTML = Number(document.getElementById("money").innerHTML) + 1;
    } else {
      // document.getElementsByClassName("main")[0].classList.add("hidden");
      // document.getElementsByClassName("main-side-menu")[0].classList.add("hidden");
      fadein(document.getElementsByClassName(button)[0]);
      // document.getElementById("money").innerHTML = Number(document.getElementById("money").innerHTML) + 1;

      // document.getElementsByClassName(button)[0].classList.remove("hidden");
      // document.getElementsByClassName(button + "-side-menu")[0].classList.remove("hidden");
    }

    if (i !== -1) {
      document.getElementsByClassName('menu-button')[i].classList.remove('selected');
      // i = -1;
    }

    currentPage = button;
    fadeout(document.getElementsByClassName("main")[0]);
    fadeout(document.getElementsByClassName("main-side-menu")[0]);
    document.getElementsByClassName("main-side-menu")[0].classList.add("slide-left");
  }
}

function back(x) {
document.getElementsByClassName("main-side-menu")[0].classList.remove("slide-left");
  if (x !== "factory") {
    document.body.style.background = "url(\"https://ak6.picdn.net/shutterstock/videos/1111306/thumb/6.jpg\")";
    document.body.style.backgroundSize = "cover";
  }

  if (currentPage == "factory-input") {
    fadeout(document.getElementsByClassName("factory-input")[0]);
    fadein(document.getElementsByClassName("right-menu")[0]);
    document.getElementsByClassName("factory-side-menu")[0].classList.add("slide-right");

    // document.getElementsByClassName("factory-input")[0].classList.add("hidden");
    // document.getElementsByClassName("right-menu")[0].classList.remove("hidden");
  } else if (currentPage == "settings" || currentPage == "news") {
    fadein(document.getElementsByClassName("right-menu")[0]);
    fadeout(document.getElementsByClassName(currentPage)[0]);
  } else if (currentPage == "factory") {
    // TODO: confirmation.
    menuFactoryButton("shape");
    fadeout(document.getElementsByClassName(currentPage)[0]);
    document.getElementsByClassName('menu-button')[j].classList.remove('selected');
    j = 8;
  } else {
    // document.getElementsByClassName(currentPage)[0].classList.add("hidden");
    fadeout(document.getElementsByClassName(currentPage)[0]);
    // document.getElementsByClassName(currentPage + "-side-menu")[0].classList.add("hidden");
  }

  if (x !== "factory") {
    // document.getElementsByClassName("main")[0].classList.remove("hidden");
    // document.getElementsByClassName("main-side-menu")[0].classList.remove("hidden");
    document.getElementsByClassName("main-side-menu")[0].classList.add("slide-right");
    fadein(document.getElementsByClassName("main")[0]);
    fadein(document.getElementsByClassName("main-side-menu")[0]);

    currentPage = "main";
  }
}

var storedFactoryDiv = "shape";
var background = "";
function menuFactoryButton(button) {
  if (storedFactoryDiv !== button) {
    fadeout(document.getElementById(storedFactoryDiv + "Div"));
    fadein(document.getElementById(button + "Div"));
    document.getElementById(storedFactoryDiv).classList.remove('activated');
    document.getElementById(button).classList.add('activated');

    var number = 8;
    while (number <= 16) {
      if (document.getElementsByClassName('menu-button')[number] == document.getElementById(button)) {
        j = number;
      }
      number++;
    }

    if (button == "screen") {
      var width = document.getElementById('width').value;
      var height = document.getElementById('height').value;
      // background = "url('img/notmine/leaves.jpg');background-size: cover;";
      background = "url('img/notmine/leaves.jpg');background-size: " + width + "px " + height + "px;padding-top: 1px;";
      slidervalue('border-top-width');
    } else {
      background = "";
      slidervalue('border-top-width');
    }

    storedFactoryDiv = button;
  }
}



function settings() {
  // document.getElementById("logout").classList.remove("hidden");

  // currentPage = button;

  currentPage = "settings";
  fadeout(document.getElementsByClassName("main")[0]);
  fadeout(document.getElementsByClassName("main-side-menu")[0]);
  document.getElementsByClassName("main-side-menu")[0].classList.add("slide-left");
  fadeout(document.getElementsByClassName("right-menu")[0]);

  fadein(document.getElementsByClassName("settings")[0]);
  // fadein(document.getElementsByClassName("factory-input")[0]);
}

function openTabs(evt, name) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
    // fadeout(document.getElementById(tabcontent[i]));
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  // document.getElementById(name).style.display = "block";
  fadein(document.getElementById(name));
  // alert(name);
  if (evt == 0 || evt == 1 || evt == 2) {
    document.getElementsByClassName('tablinks')[evt].className += " active";
  } else {
    evt.currentTarget.className += " active";
  }
}

function news() {
  currentPage = "news";
  fadeout(document.getElementsByClassName("main")[0]);
  fadeout(document.getElementsByClassName("main-side-menu")[0]);
  document.getElementsByClassName("main-side-menu")[0].classList.add("slide-left");
  fadeout(document.getElementsByClassName("right-menu")[0]);

  fadein(document.getElementsByClassName("news")[0]);
}

// Get the input field
var input = document.getElementById("phone-name");
// Execute a function when the user presses a key on the keyboard
input.addEventListener("keydown", function(event) {
  // Number 13 is the "Enter" key on the keyboard AND Number 39 is the "Arrow Right" key on the keyboard
  if (event.keyCode === 13 || event.keyCode === 39) {
    // Cancel the default action, if needed
    // event.preventDefault();

    sumbmitPhoneName();
  }
});

// The Best Phone

function sumbmitPhoneName() {
  if (input.value == "") {
    alert("Please input a name!");
  } else {
    document.getElementById("display-smartphone-name").innerHTML = input.value;
    back("factory");
    menuButton("factory");

    document.body.style.background = "url('img/gradient/blue-purple-gradient.png')"; // https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_OF_Kfb5eLOfLrLnu5J0vHfQyvM-blI6yPLapLSaLgRONcMEx7Q
    document.body.style.backgroundSize = "cover";

    currentPhone = input.value;
    smartphones[currentPhone] = {};
    input.value = "";
  }
}








var i = -1;
var j = 8;
var s = 0;
// Execute a function when the user presses a key on the keyboard
var listener = addEventListener("keydown", function(event) {

  if (event.keyCode === 40) { // Number 40 is the "Arrow Down" key on the keyboard

    if (currentPage == "main") {
      i++;

      if (i > 7) {
        i = 0;
      }

      if (i > 0) {
        document.getElementsByClassName('menu-button')[i - 1].classList.remove('selected');
        // document.getElementsByClassName('menu-button')[i + 1].classList.remove('selected');
      } else {
        document.getElementsByClassName('menu-button')[7].classList.remove('selected');
      }
      document.getElementsByClassName('menu-button')[i].classList.add('selected');
    } else if (currentPage == "factory") {
      j++;

      if (j > 16) {
        j = 8;
      }
      // if (j > 8) {
      //   document.getElementsByClassName('menu-button')[j - 1].classList.remove('activated');
      // } else {
      //   document.getElementsByClassName('menu-button')[16].classList.remove('activated');
      // }
      // document.getElementsByClassName('menu-button')[j].classList.add('activated');

      document.getElementsByClassName('menu-button')[j].click();
    } else if (currentPage == "settings") {
      s--;

      if (s == 0) {
        openTabs(s, 'account');
      } else if (s == 1) {
        openTabs(s, 'shortcuts');
      } else if (s == 2) {
        openTabs(s, 'about');
      } else {
        s = 2;
        openTabs(s, 'about');
      }
      document.getElementsByClassName('tablinks')[s].classList.add("active");
    }
  } else if (event.keyCode === 38) { // Number 38 is the "Arrow Up" key on the keyboard

    if (currentPage == "main") {
      i--;

      if (i < 0) {
        i = 7;
        // document.getElementsByClassName('menu-button')[0].classList.remove('selected');
      }

      if (i < 7) {
        document.getElementsByClassName('menu-button')[i + 1].classList.remove('selected');
        // document.getElementsByClassName('menu-button')[i - 1].classList.remove('selected');
      } else {
        document.getElementsByClassName('menu-button')[0].classList.remove('selected');
      }
      document.getElementsByClassName('menu-button')[i].classList.add('selected');
    } else if (currentPage == "factory") {
      j--;

      if (j < 8) {
        j = 16;
      }
      // if (j < 16) {
      //   document.getElementsByClassName('menu-button')[j + 1].classList.remove('activated');
      // } else {
      //   document.getElementsByClassName('menu-button')[8].classList.remove('activated');
      // }
      // document.getElementsByClassName('menu-button')[j].classList.add('activated');

      document.getElementsByClassName('menu-button')[j].click();
    } else if (currentPage == "settings") {
      s++;

      if (s == 0) {
        openTabs(s, 'account');
      } else if (s == 1) {
        openTabs(s, 'shortcuts');
      } else if (s == 2) {
        openTabs(s, 'about');
      } else {
        s = 0;
        openTabs(s, 'account');
      }
      document.getElementsByClassName('tablinks')[s].classList.add("active");
    }
  } else if (event.keyCode === 13 || event.keyCode === 39) { // Number 13 is the "Enter" key on the keyboard AND Number 39 is the "Arrow Right" key on the keyboard
    if (currentPage == "main" && i !== -1) {
      document.getElementsByClassName('menu-button')[i].click();
    } else if (currentPage == "factory-input" && input.value !== "") {
      sumbmitPhoneName();
    } /*else if (currentPage == "factory" && j !== 7) {
      document.getElementsByClassName('menu-button')[j].click();
      // menuFactoryButton();
    }*/
  } else if (event.keyCode === 37) { // Number 37 is the "Arrow Left" key on the keyboard
    if (currentPage !== "main") {
      back();
    }
  }
});


function print() {
  document.getElementsByClassName('white-bg')[0].print();
}

function printElem() {
    var content = document.getElementsByClassName('white-bg')[0].innerHTML;
    var mywindow = window.open('', 'Print', 'height=600,width=800');

    mywindow.document.write('<html><head><title>Breaking News | Smartphone Tycoon</title>');
    mywindow.document.write('</head><body>');
    mywindow.document.write(content);
    mywindow.document.write('</body></html>');

    mywindow.document.close();
    mywindow.focus();
    mywindow.print();
    mywindow.close();
    return true;
}



// var ready = true;
// var state = "nonFull";
// function fullScreen() {
// 	if (ready == true) {
// 		ready = false;
// 		var elem = document.documentElement;
//
// 		if (state == "nonFull") {
//
// 		  if (elem.requestFullscreen) {
// 		    elem.requestFullscreen();
// 		  } else if (elem.mozRequestFullScreen) { /* Firefox */
// 		    elem.mozRequestFullScreen();
// 		  } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
// 		    elem.webkitRequestFullscreen();
// 		  } else if (elem.msRequestFullscreen) { /* IE/Edge */
// 		    elem.msRequestFullscreen();
// 		  }
// 			document.getElementById("fullscreen").innerHTML = "fullscreen_exit";
// 			document.getElementById("fullTip").innerHTML = "Exit Fullscreen";
// 			state = "full";
// 			ready = true;
// 		} else if (state == "full") {
//
// 			if (document.exitFullscreen) {
// 		    document.exitFullscreen();
// 		  } else if (document.mozCancelFullScreen) { /* Firefox */
// 		    document.mozCancelFullScreen();
// 		  } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
// 		    document.webkitExitFullscreen();
// 		  } else if (document.msExitFullscreen) { /* IE/Edge */
// 		    document.msExitFullscreen();
// 		  }
// 			document.getElementById("fullscreen").innerHTML = "fullscreen";
// 			document.getElementById("fullTip").innerHTML = "Fullscreen";
// 			state = "nonFull";
// 			ready = true;
// 		}
// 	}
// }
