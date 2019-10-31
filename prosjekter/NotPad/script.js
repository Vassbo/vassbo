
var paper = document.getElementById('paper');
// document.getElementById('paper').style.fontFamily = "'Roboto',sans-serif";

///////// Font Type /////////
function fontType(font) {
  if (font == "roboto") {
    // document.getElementById('paper').style.fontFamily = "Segoe UI','Roboto',arial,sans-serif";
    paper.style.fontFamily = "'Roboto',sans-serif";
    document.getElementById('selectedFont').style.fontFamily = "'Roboto',sans-serif";
  } else if (font == "monospace") {
    paper.style.fontFamily = "\"Courier New\", Courier, monospace";
    document.getElementById('selectedFont').style.fontFamily = "\"Courier New\", Courier, monospace";
  } else if (font == "arial") {
    paper.style.fontFamily = "Arial, Helvetica, sans-serif";
    document.getElementById('selectedFont').style.fontFamily = "Arial, Helvetica, sans-serif";
  }

  // document.getElementById("paper").style.fontFamily = "Impact,Charcoal,sans-serif";
  // document.getElementById("paper").style.fontFamily = 'Times New Roman,Times,serif';

  document.getElementById('selectedFont').innerHTML = font.charAt(0).toUpperCase() + font.slice(1);
}


///////// Font Size /////////
var prev = document.getElementById("default");
function fontSize(i, size) {
  prev.style.backgroundColor = "";
  i.style.backgroundColor = "#eee";
  prev = i;
  paper.style.fontSize = size + "pt";
  // paper.style.lineHeight = "10";
  document.getElementById('selectedFontSize').innerHTML = size;
}


///////// Theme /////////
var menu = document.getElementById('menu');
var theme = "light";
function setTheme() {
  if (theme == "light") {
    document.body.style.backgroundColor = "#666";
    document.body.style.color = "#fff";
    paper.style.backgroundColor = "#444";
    paper.style.color = "#fff";
    menu.style.backgroundColor = "#444";
    // menu.style.color = "#fff";
    theme = "dark";

    // TODO: document.getElementById('selectedFont').style.color = "#fff !important";
  } else {
    document.body.style.backgroundColor = "#eee";
    document.body.style.color = "#000";
    paper.style.backgroundColor = "#fff";
    paper.style.color = "#000";
    menu.style.backgroundColor = "#fff";
    theme = "light";
  }
}


///////// Format /////////
function format() {
  if (document.getElementById('icon-toggle-1').checked == true) { // bold
    paper.style.fontWeight = "bold";
  } else {
    paper.style.fontWeight = "";
  }
  if (document.getElementById('icon-toggle-3').checked == true) { // italic
    paper.style.fontStyle = "italic";
  } else {
    paper.style.fontStyle = "";
  }

  if (document.getElementById('icon-toggle-2').checked == true && document.getElementById('icon-toggle-4').checked == false) { // underline
    paper.style.textDecoration = "underline";
  } else if (document.getElementById('icon-toggle-4').checked == true && document.getElementById('icon-toggle-2').checked == false) { // line-through
    paper.style.textDecoration = "line-through";
  } else if (document.getElementById('icon-toggle-2').checked == true && document.getElementById('icon-toggle-4').checked == true) { // underline & line-through
    paper.style.textDecoration = "underline line-through";
  } else {
    paper.style.textDecoration = "";
  }
}


///////// Download /////////
function downloadFile() {
  var fileName = document.getElementById('fileName').value;
  if (fileName !== "" && paper.innerText !== "") {
    // var FileSaver = require('file-saver');
    var blob = new Blob([paper.innerText], {type: "text/plain;charset=utf-8"});
    // FileSaver.saveAs(blob, "hello world.txt");
    saveAs(blob, fileName + ".txt");
  }
}


///////// Tab /////////
var myInput = paper;
if(myInput.addEventListener ) {
    myInput.addEventListener('keydown',this.keyHandler,false);
} else if(myInput.attachEvent ) {
    myInput.attachEvent('onkeydown',this.keyHandler); /* damn IE hack */
}

function keyHandler(e) {
    if(e.keyCode == 9) { // Tab
        this.innerHTML += "&nbsp&nbsp&nbsp&nbsp";
        // window.getSelection().removeAllRanges();
        if(e.preventDefault) {
            e.preventDefault();
        }
        return false;
    }
}
