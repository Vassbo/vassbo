var animationInProgress = false;

var hasStoredGame = false;
(function() {
  if (typeof(Storage) !== "undefined") {
    if (localStorage.initialized) {
      hasStoredGame = true;
      document.getElementById("continue").disabled = false;
      initializeMain();
      initializeChannel();
    }
  } else {
    alert("Sorry! No Web Storage support..");
  }
}());

///////////////
// Main Menu //
///////////////

var openedMenu;
function menu(id, checkStoredGame, backButton) {
  if (!animationInProgress) {
    if (checkStoredGame && hasStoredGame) {
      if (confirm("Are you sure you want to start a new game? This will erase all previous progress!")) {
        localStorage.clear();
        clearInputs();
        hasStoredGame = false;
        menu(id, false, true);
        setTimeout(function() { document.getElementById("continue").disabled = true; }, 1000);
      }
    } else {
      openedMenu = id;
      document.getElementById("menu").classList.add("slide-left");
      document.getElementById("title").classList.add("slide-top");
      if (backButton) { document.getElementById("back").classList.replace("hidden", "scale-up"); }
      document.getElementById(id + "Div").classList.replace("hidden", "fade-in");
      animationInProgress = true;

      setTimeout(function() {
        document.getElementById("menu").classList.replace("slide-left", "hidden");
        document.getElementById("title").classList.replace("slide-top", "hidden"); // TODO: fade out before hide...
        animationInProgress = false;
      }, 900);
    }
  }
}

function clearInputs() {
  var inputs = document.getElementsByTagName("input");
  for (var i = 0; i < inputs.length; i++) {
    inputs[i].value = "";
  }
}

function continueGame() {
  if (localStorage.channelName) {
    menu("mainScreen", false, false);
    // history.pushState({urlPath:'/index.html'},"Hi!",{urlPath:'/index1.html'});
  } else {
    menu("createChannel", false, true);
  }
}

function back() {
  document.getElementById("menu").classList.replace("hidden", "slide-from-left");
  document.getElementById("title").classList.replace("hidden", "slide-from-top");
  document.getElementById("back").classList.replace("scale-up", "scale-down");
  document.getElementById(openedMenu + "Div").classList.replace("fade-in", "fade-out");
  animationInProgress = true;

  setTimeout(function() {
    document.getElementById("menu").classList.remove("slide-from-left");
    document.getElementById("title").classList.remove("slide-from-top");
    document.getElementById("back").classList.replace("scale-down", "hidden");
    document.getElementById(openedMenu + "Div").classList.replace("fade-out", "hidden");
    animationInProgress = false;
  }, 500);
}

function exit() {
  if (confirm("Are you sure you want to exit? This will close this window!")) {
    window.close();
  }
}

////////////////////
// Starter Inputs //
////////////////////

// not more than 100 years
var age = document.getElementById("age");
age.addEventListener("keyup", function(e) {
  if (age.value > 100 && e.keyCode !== 46 && e.keyCode !== 8) { // delete & backspace
    e.preventDefault();
    age.value = 100;
  }
});

// prevent e & + & -
age.addEventListener("keypress", function (evt) {
  if (evt.which != 8 && evt.which != 0 && evt.which < 48 || evt.which > 57) {
      evt.preventDefault();
  }
  // 0 for null values
  // 8 for backspace
  // 48-57 for 0-9 numbers
});


document.getElementById("name").addEventListener("keyup", function(e) {
  if (e.keyCode === 13) { // 13 = Enter
    e.preventDefault();
    document.getElementById("confirmStarter").click();
  }
});
age.addEventListener("keyup", function(e) {
  if (e.keyCode === 13) { // 13 = Enter
    e.preventDefault();
    document.getElementById("confirmStarter").click();
  }
});

function generateStarter() {
  document.getElementById("name").value = generateName();
  age.value = generateNumber();
}

function generateName() {
  // Source: https://eslyes.com/namesdict/popular_names.htm
  // 50 * 50 * 100 = 250 000 different combinations
	var firstname = ["James", "John", "Robert", "Michael", "William", "David", "Richard", "Charles", "Joseph", "Thomas", "Christopher", "Daniel", "Paul", "Mark", "Donald", "George", "Kenneth", "Steven", "Edward", "Brian", "Ronald", "Anthony", "Kevin", "Jason", "Jeff", "Mary", "Patricia", "Linda", "Barbara", "Elizabeth", "Jennifer", "Maria", "Susan", "Margaret", "Dorothy", "Lisa", "Nancy", "Karen", "Betty", "Helen", "Sandra", "Donna", "Carol", "Ruth", "Sharon", "Michelle", "Laura", "Sarah", "Kimberly", "Deborah"];
	var lastname= ["Smith", "Johnson", "Williams", "Jones", "Brown", "Davis", "Miller", "Wilson", "Moore", "Taylor", "Anderson", "Thomas", "Jackson", "White", "Harris", "Martin", "Thompson", "Garcia", "Martinez", "Robinson", "Clark", "Rodriguez", "Lewis", "Lee", "Walker", "Hall", "Allen", "Young", "Hernandez", "King", "Wright", "Lopez", "Hill", "Scott", "Green", "Adams", "Baker", "Gonzalez", "Nelson", "Carter", "Mitchell", "Perez", "Roberts", "Turner", "Phillips", "Campbell", "Parker", "Evans", "Edwards", "Collins"];
	var rand_first = Math.floor(Math.random() * firstname.length);
	var rand_last = Math.floor(Math.random() * lastname.length);
	return firstname[rand_first] + " " + lastname[rand_last];
}

function generateNumber() {
  var generate = Math.floor(Math.random() * 50) + 1;
  if (generate == 1 || generate == 2) {
    return Math.floor(Math.random() * 10); // 0-9 (4%)
  } else if (generate == 50) {
    return Math.floor(Math.random() * 11) + 90; // 90-100 (2%)
  } else if (generate > 2 && generate < 8) {
    return Math.floor(Math.random() * 40) + 50; // 50-89 (10%)
  } else {
    return Math.floor(Math.random() * 40) + 10; // 10-49 (84%)
  }
}

function generateChannel() {
  document.getElementById("channelName").value = usernameGenerator();
}


var nameList = [
  'Time','Past','Future','Dev',
  'Fly','Flying','Soar','Soaring','Power','Falling',
  'Fall','Jump','Cliff','Mountain','Rend','Red','Blue',
  'Green','Yellow','Gold','Demon','Demonic','Panda','Cat',
  'Kitty','Kitten','Zero','Memory','Trooper','XX','Bandit',
  'Fear','Light','Glow','Tread','Deep','Deeper','Deepest',
  'Mine','Your','Worst','Enemy','Hostile','Force','Video',
  'Game','Donkey','Mule','Colt','Cult','Cultist','Magnum',
  'Gun','Assault','Recon','Trap','Trapper','Redeem','Code',
  'Script','Writer','Near','Close','Open','Cube','Circle',
  'Geo','Genome','Germ','Spaz','Shot','Echo','Beta','Alpha',
  'Gamma','Omega','Seal','Squid','Money','Cash','Lord','King',
  'Duke','Rest','Fire','Flame','Morrow','Break','Breaker','Numb',
  'Ice','Cold','Rotten','Sick','Sickly','Janitor','Camel','Rooster',
  'Sand','Desert','Dessert','Hurdle','Racer','Eraser','Erase','Big',
  'Small','Short','Tall','Sith','Bounty','Hunter','Cracked','Broken',
  'Sad','Happy','Joy','Joyful','Crimson','Destiny','Deceit','Lies',
  'Lie','Honest','Destined','Bloxxer','Hawk','Eagle','Hawker','Walker',
  'Zombie','Sarge','Capt','Captain','Punch','One','Two','Uno','Slice',
  'Slash','Melt','Melted','Melting','Fell','Wolf','Hound',
  'Legacy','Sharp','Dead','Mew','Chuckle','Bubba','Bubble','Sandwich','Smasher','Extreme','Multi','Universe','Ultimate','Death','Ready','Monkey','Elevator','Wrench','Grease','Head','Theme','Grand','Cool','Kid','Boy','Girl','Vortex','Paradox'
];

function usernameGenerator() {
  // Source: https://codepen.io/jamesrbdev/pen/WxyKyr
	var finalName = nameList[Math.floor( Math.random() * nameList.length )];
	finalName += nameList[Math.floor( Math.random() * nameList.length )];
	if ( Math.random() > 0.5 ) {
  	finalName += nameList[Math.floor( Math.random() * nameList.length )];
  }
	return finalName;
}


function confirmStarter() {
  var name = document.getElementById("name").value;
  if (name !== "" && age.value !== "") {
    localStorage.name = name;
    localStorage.age = age.value;
    localStorage.money = 0;
    localStorage.initialized = true;
    initializeMain();

    hasStoredGame = true;
    document.getElementById("continue").disabled = false;

    document.getElementById("newGameDiv").classList.replace("fade-in", "fade-out");
    setTimeout(function() {
      document.getElementById("newGameDiv").classList.replace("fade-out", "hidden");
    }, 500);
    document.getElementById("createChannelDiv").classList.replace("hidden", "fade-in");
    openedMenu = "createChannel";
  } else {
    alert("Please enter name and age!");
  }
}

function confirmChannel() {
  var channelName = document.getElementById("channelName").value;
  if (channelName !== "") {
    localStorage.channelName = channelName;
    localStorage.subscribers = 0;
    initializeChannel();

    document.getElementById("createChannelDiv").classList.replace("fade-in", "fade-out");
    document.getElementById("back").classList.replace("scale-up", "scale-down");
    setTimeout(function() {
      document.getElementById("createChannelDiv").classList.replace("fade-out", "hidden");
      document.getElementById("back").classList.replace("scale-down", "hidden");
    }, 500);
    document.getElementById("mainScreenDiv").classList.replace("hidden", "fade-in");
    // openedMenu = "mainScreen";
  } else {
    alert("Please enter a channel name!");
  }
}



function initializeMain() {
  var nameClasses = document.getElementsByClassName("name");
  for (var i = 0; i < nameClasses.length; i++) {
    nameClasses[i].innerHTML = localStorage.name;
  }

  var ageClasses = document.getElementsByClassName("age");
  for (var j = 0; j < ageClasses.length; j++) {
    ageClasses[j].innerHTML = localStorage.age;
  }

  var moneyClasses = document.getElementsByClassName("money");
  for (var k = 0; k < moneyClasses.length; k++) {
    moneyClasses[k].innerHTML = localStorage.money;
  }
}

function initializeChannel() {
  var channelNameClasses = document.getElementsByClassName("channelName");
  for (var i = 0; i < channelNameClasses.length; i++) {
    channelNameClasses[i].innerHTML = localStorage.channelName;
  }

  var subscribersClasses = document.getElementsByClassName("subscribers");
  for (var j = 0; j < subscribersClasses.length; j++) {
    subscribersClasses[j].innerHTML = localStorage.subscribers;
  }

  // videos
  // watch time
  // ...
}


// resets the whole localStorage || localStorage.clear();
// function clearLocalStorage() {
//   localStorage.removeItem("initialized");
//   localStorage.removeItem("name");
//   localStorage.removeItem("age");
//   localStorage.removeItem("channelName");
//   localStorage.removeItem("money");
// }





////////////////////

function goToMainMenu() {
  if (!animationInProgress) {
    openedMenu = "mainScreen";
    back();
  }
}


var openedMenu1;
function actionButtonClick(id) {
  if (!animationInProgress) {
    openedMenu1 = id;
    // document.getElementById("menu").classList.add("slide-left");
    // document.getElementById("title").classList.add("slide-top");
    document.getElementById("mainBack").classList.replace("hidden", "scale-up");
    document.getElementById("actionButtons").classList.add("fade-out");
    document.getElementById(id + "Div").classList.replace("hidden", "fade-in");

    setTimeout(function() {
      // document.getElementById("menu").classList.replace("slide-left", "hidden");
      // document.getElementById("title").classList.replace("slide-top", "hidden");
      document.getElementById("actionButtons").classList.replace("fade-out", "hidden");
    }, 350);
  }
}

function mainBack() {
  document.getElementById("mainBack").classList.replace("scale-up", "scale-down");
  document.getElementById("actionButtons").classList.replace("hidden", "fade-in");
  document.getElementById(openedMenu1 + "Div").classList.replace("fade-in", "fade-out");
  animationInProgress = true;

  setTimeout(function() {
    // document.getElementById("menu").classList.replace("slide-left", "hidden");
    // document.getElementById("title").classList.replace("slide-top", "hidden");
    document.getElementById("mainBack").classList.replace("scale-down", "hidden");
    document.getElementById(openedMenu1 + "Div").classList.replace("fade-out", "hidden");
    animationInProgress = false;
  }, 650);
}
