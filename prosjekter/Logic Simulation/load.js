
// drawer
section("Inputs");
createGrid("dinputs");
addLabel("Toggle Switch", appendElement("toggle", "dinputs"), true);
addLabel("Push Button", appendElement("button", "dinputs"), true);
addLabel("Clock", appendElement("clock", "dinputs"), true);
addLabel("High constant", appendElement("high_constant", "dinputs"), true);
addLabel("Low contstant", appendElement("low_constant", "dinputs"), true);

section("Outputs");
createGrid("doutputs");
addLabel("Light Bulb", appendElement("light", "doutputs"), true);
addLabel("4-Bit Digit", appendElement("number_display", "doutputs"), true); // seven segment display
// appendElement("light1", "doutputs");


function section(name) {
  var div = document.createElement("div");
  div.classList.add("section");
  div.innerHTML = name;
  document.getElementById("drawer").appendChild(div);
}

function createGrid(name) {
  var div = document.createElement("div");
  div.id = name;
  div.classList.add("grid");
  document.getElementById("drawer").appendChild(div);
}




/// initialize settings ///
if (localStorage.lineType !== undefined) {
  // TODO: WIP IN UPDATE
  setting_lineType = localStorage.lineType;
}

if (localStorage.lineColor_idle !== undefined) {
  setting_lineColor_idle = localStorage.lineColor_idle;
}
if (localStorage.lineColor_powered !== undefined) {
  setting_lineColor_powered = localStorage.lineColor_powered;
}

if (localStorage.theme !== undefined) {
  setting_theme = localStorage.theme;
}

if (localStorage.background !== undefined) {
  setting_background = localStorage.background;
}

function updateSettings() {
  document.documentElement.removeAttribute("style");
  if (setting_theme == "theme_light") {
  } else if (setting_theme == "theme_dark") {
    document.documentElement.style.setProperty('--main-color', "#242424");
    document.documentElement.style.setProperty('--main-color-inverted', "white");
    document.documentElement.style.setProperty('--main-background', "#585858");
    document.documentElement.style.setProperty('--transparent--10', "rgba(255, 255, 255, 0.1)");
    document.documentElement.style.setProperty('--transparent--20', "rgba(255, 255, 255, 0.2)");
    document.documentElement.style.setProperty('--transparent--50', "rgba(255, 255, 255, 0.5)");
  } else if (setting_theme == "theme_night") {
    document.documentElement.removeAttribute("style");
    document.documentElement.style.setProperty('--main-color', "black");
    document.documentElement.style.setProperty('--main-color-inverted', "#bebebe");
    document.documentElement.style.setProperty('--main-background', "black");
    document.documentElement.style.setProperty('--transparent--10', "rgba(255, 255, 255, 0.1)");
    document.documentElement.style.setProperty('--transparent--20', "rgba(255, 255, 255, 0.2)");
    document.documentElement.style.setProperty('--transparent--50', "rgba(255, 255, 255, 0.5)");
    document.documentElement.style.setProperty('--transparent--50', "rgba(255, 255, 255, 0.5)");
    document.documentElement.style.setProperty('--light-off', "#696969");
    document.documentElement.style.setProperty('--component-back', "#5e3100");
    document.documentElement.style.setProperty('--component-action', "#600000");
    document.documentElement.style.setProperty('--component-action--hover', "#7c0000");
    document.documentElement.style.setProperty('--toolbar-iconcolor', "#267ba3");
  } else if (setting_theme == "theme_neon") {
    // WIP
    document.documentElement.style.setProperty('--main-color', "#1b1b1b");
    document.documentElement.style.setProperty('--main-color--second', "#1b1b1b");
    document.documentElement.style.setProperty('--main-color-inverted', "white");
    document.documentElement.style.setProperty('--main-background', "#000000");
    document.documentElement.style.setProperty('--transparent--10', "rgba(255, 255, 255, 0.1)");
    document.documentElement.style.setProperty('--transparent--20', "rgba(255, 255, 255, 0.2)");
    document.documentElement.style.setProperty('--transparent--50', "rgba(255, 255, 255, 0.5)");
    document.documentElement.style.setProperty('--light-off', "rgba(0, 0, 0, 0.6)");
    document.documentElement.style.setProperty('--component-back', "#ff00e7");
    document.documentElement.style.setProperty('--component-action', "#8505fb");
    document.documentElement.style.setProperty('--component-action--hover', "#a13bff");
    document.documentElement.style.setProperty('--light-active', "#ff30ac");
    document.documentElement.style.setProperty('--light-active--shadow', "rgba(224, 18, 141, 0.82)");
    document.documentElement.style.setProperty('--toolbar-iconcolor', "#08f5fb");
  }

  document.documentElement.style.setProperty('--line-idle', setting_lineColor_idle);
  document.documentElement.style.setProperty('--line-powered', setting_lineColor_powered);

  if (setting_background == "dotted") {
    document.getElementById("main").style.backgroundImage = "radial-gradient(circle, var(--transparent--20) 1px, rgba(0, 0, 0, 0) 1px)";
  } else if (setting_background == "lines") {
    document.getElementById("main").style.backgroundImage = "linear-gradient(to right, var(--transparent--10) 1px, transparent 1px), linear-gradient(to bottom, var(--transparent--10) 1px, transparent 1px)";
  } else if (setting_background == "blank") {
    document.getElementById("main").style.backgroundImage = "none";
  }

  // if (setting_lineType == "curved" || setting_background == "straight" || setting_background == "lined")
  localStorage.lineType = setting_lineType;
}





/// buttons ///
var query = document.querySelectorAll("i");
for (var i = 0; i < query.length; i++) {
  query[i].addEventListener('click', btnClick);
}

function btnClick() {
  var id = this.innerText;
  switch (id) {
    case "settings_gear":
      document.getElementById("dark").classList.remove("hidden");
      document.getElementById("settings").classList.remove("hidden");
      break;
    case "close":
      document.getElementById("dark").classList.add("hidden");
      document.getElementById("settings").classList.add("hidden");
      break;
    default:
      alert(id);
  }
}













///// settings ///////
var query = document.querySelectorAll(".settings");
for (var i = 0; i < query.length; i++) {
  query[i].addEventListener("click", settingsClick);
}

function settingsClick() {
  var id = this.classList[0];
  switch (id) {
    case "theme_light":
    case "theme_dark":
    case "theme_night":
    case "theme_neon":
      changeSelect("theme", id);
      setting_theme = id;
      break;
    case "curved":
    case "straight":
    case "lined":
      changeSelect("line_type", id);
      setting_lineType = id;
      console.log("IDDDDD: " + id);
      break;
    case "dotted":
    case "lines":
    case "blank":
      changeSelect("background", id);
      setting_background = id;
      break;
    default:
      alert(id);
  }
  updateSettings();
}


function changeSelect(id, new_id) {
  document.getElementById(id).getElementsByClassName("active")[0].classList.remove("active");
  document.getElementById(id).getElementsByClassName(new_id)[0].classList.add("active");
}
