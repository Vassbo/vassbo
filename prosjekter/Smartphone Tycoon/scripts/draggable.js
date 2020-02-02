//Make the DIV element draggagle:
// dragElement(document.getElementsByClassName("hole-punch")[0]);
dragElementX(getElems(".hole-punch")[0]);
dragElementX(getElems(".speaker")[0]);
dragElementX(getElems(".homeButton")[0]);
dragElementY(getElems(".powerButton")[0]);
dragElementY(getElems(".volumeButtons")[0]);

// alert(screenWidth.value);

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

  elmnt.onmousedown = dragMouseDown;
  // if (document.getElementById(elmnt.id)) {
  //   /* if present, the header is where you move the DIV from:*/
  //   document.getElementById(elmnt.id).onmousedown = dragMouseDown;
  // } else {
  //   /* otherwise, move the DIV from anywhere inside the DIV:*/
  //   elmnt.onmousedown = dragMouseDown;
  // }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.marginTop = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.marginLeft = (elmnt.offsetLeft - pos1) + "px";

    // alert("1: " + pos1 + ", 2: " +  pos2 + ", 3: " +  pos3 + ", 4: " +  pos4);
  }

  function closeDragElement() {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
  }
}













function dragElementX(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

  elmnt.onmousedown = dragMouseDown;
  // if (document.getElementById(elmnt.id)) {
  //   /* if present, the header is where you move the DIV from:*/
  //   document.getElementById(elmnt.id).onmousedown = dragMouseDown;
  // } else {
  //   /* otherwise, move the DIV from anywhere inside the DIV:*/
  //   elmnt.onmousedown = dragMouseDown;
  // }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    getElems('.helperLineY')[0].classList.remove('hidden');

    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos3 = e.clientX;

    // var screenWidth = getElems('#width');
    var screenWidth = sp('width');
    var maxPos = screenWidth - (elmnt.offsetWidth / 2);
    var minPos = 0 + (elmnt.offsetWidth / 2);
    // set the element's new position:
    if (elmnt.offsetLeft - pos1 > maxPos) {
      elmnt.style.marginLeft = maxPos + "px";
      // closeDragElement();
    } else if (elmnt.offsetLeft - pos1 < minPos) {
      elmnt.style.marginLeft = minPos + "px";
    } else {
      elmnt.style.marginLeft = (elmnt.offsetLeft - pos1) + "px";
    }

    // updatePosX(elmnt, pos3);
    //
    // // move to other sides of phone
    // pos4 = e.clientY;
    // // alert(pos3 + ", " + pos4);
    // // trigger bottom
    // if (pos3 > 1080 && pos4 < 550  && elmnt == document.getElementsByClassName('volumeButtons')[0] || pos3 > 1080 && pos4 < 550  && elmnt == document.getElementsByClassName('powerButton')[0]) { // TODO: this might not work with different resolutions....
    //
    //   var element = elmnt;
    //
    //   closeDragElement();
    //   elmnt.style.transform = "";
    //   elmnt.style.marginLeft = Number(screenWidth.value) + Number(document.getElementsByClassName('slider')[2].value) + "px";
    //   elmnt.style.marginTop = (document.getElementsByclassName('slider')[4].value / 2) + "px";
    //   dragElementY(elmnt);
    //   updatePosY(elmnt, pos2);
    //   // dragMouseDown(elmnt);
    //   // startX drag
    // }
  }

  function closeDragElement() {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;

    document.getElementsByClassName('helperLineY')[0].classList.add('hidden');
  }
}















function dragElementY(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

  elmnt.onmousedown = dragMouseDown;
  // if (document.getElementById(elmnt.id)) {
  //   /* if present, the header is where you move the DIV from:*/
  //   document.getElementById(elmnt.id).onmousedown = dragMouseDown;
  // } else {
  //   /* otherwise, move the DIV from anywhere inside the DIV:*/
  //   elmnt.onmousedown = dragMouseDown;
  // }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    getElems('.helperLineX')[0].classList.remove('hidden');
    getElems('.helperLineX')[0].style.marginTop = sp('height') / 2 + "px";
    // alert(document.getElementsByClassName('slider')[4].value / 2);

    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos2 = pos4 - e.clientY;
    pos4 = e.clientY;

    // set the element's new position:
    var screenHeight = sp('height');
    var maxPos = screenHeight - elmnt.offsetHeight;
    var minPos = 0;
    if (elmnt.offsetTop - pos2 > maxPos) {
      elmnt.style.marginTop = maxPos + "px";
    } else if (elmnt.offsetTop - pos2 < minPos) {
      elmnt.style.marginTop = minPos + "px";
    } else {
      elmnt.style.marginTop = (elmnt.offsetTop - pos2) + "px";
    }

    // move to other sides of phone
    pos3 = e.clientX;
    // // trigger bottom
    // if (pos3 < 980 && pos4 > 621 && elmnt == document.getElementsByClassName('volumeButtons')[0] || pos3 < 980 && pos4 > 621 && elmnt == document.getElementsByClassName('powerButton')[0]) { // TODO: this might not work with different resolutions....
    //
    //   var element = elmnt;
    //
    //   closeDragElement();
    //   elmnt.style.transform = "rotate(90deg)";
    //   elmnt.style.marginTop = (Number(screenHeight.value) + Number(document.getElementsByClassName('slider')[1].value)) - (elmnt.offsetHeight / 2) + 3 + "px";
    //   elmnt.style.marginLeft = '50%';
    //   dragElementX(elmnt);
    //   updatePosX(elmnt, pos3);
    //   // startX drag:
    //   // dragMouseDown;
    //   // dragMouseDown(elmnt);
    // }

    if (pos3 < 780) {
      // (pos4 > 621 && elmnt == document.getElementsByClassName('volumeButtons')[0] || pos4 > 621 && elmnt == document.getElementsByClassName('powerButton')[0])

      elmnt.style.transform = "rotate(180deg)";
      elmnt.style.marginLeft = 0 - Number(sp('border-sides-width')) - 7 + 'px';

      // update the position of the buttons on the back view
      updatePosYLeft(elmnt, pos2);
    } else if (pos3 > 1000) {
      // (pos4 > 621 && elmnt == document.getElementsByClassName('volumeButtons')[0] || pos4 > 621 && elmnt == document.getElementsByClassName('powerButton')[0])

      elmnt.style.transform = "";
      elmnt.style.marginLeft = Number(sp('width')) + Number(sp('border-sides-width')) + "px";

      // update the position of the buttons on the back view
      updatePosYRight(elmnt, pos2);
    }
  }

  function closeDragElement() {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;

    getElems('.helperLineX')[0].classList.add('hidden');
  }
}


var volume180 = false;
var power180 = false;
var volumeSide = "right";
var powerSide = "right";
var newElmnt;
function updatePosYRight(elmnt, pos) {
  if (elmnt == document.getElementsByClassName('volumeButtons')[0]) {
    volume180 = false;
    volumeSide = "right";
    // newElmnt = document.getElementsByClassName('volumeButtons')[1];
    // newElmnt.style.transform = "";
    // newElmnt.style.marginLeft = Number(sp('width')) + Number(sp('border-sides-width')) + "px";
    // // newElmnt.style.marginTop = (document.getElementsByclassName('slider')[4].value / 2) + "px";
    // newElmnt.style.marginTop = (elmnt.offsetTop - pos) + "px";
    addStyleQuery(document.querySelectorAll('volumeButtons'), ['transform', 'marginLeft', 'marginTop'], ['', Number(sp('width')) + Number(sp('border-sides-width')) + "px", (elmnt.offsetTop - pos) + "px"]);
  } else if (elmnt == document.getElementsByClassName('powerButton')[0]) {
    power180 = false;
    powerSide = "right";
    // newElmnt = document.getElementsByClassName('powerButton')[1];
    // newElmnt.style.transform = "";
    // newElmnt.style.marginLeft = Number(sp('width')) + Number(sp('border-sides-width')) + "px";
    // // newElmnt.style.marginTop = (document.getElementsByclassName('slider')[4].value / 2) + "px";
    // newElmnt.style.marginTop = (elmnt.offsetTop - pos) + "px";
    addStyleQuery(document.querySelectorAll('powerButton'), ['transform', 'marginLeft', 'marginTop'], ['', Number(sp('width')) + Number(sp('border-sides-width')) + "px", (elmnt.offsetTop - pos) + "px"]);
  }
}
function updatePosYLeft(elmnt, pos) {
  if (elmnt == document.getElementsByClassName('volumeButtons')[0]) {
    volume180 = true;
    volumeSide = "left";
    // newElmnt = document.getElementsByClassName('volumeButtons')[1];
    // newElmnt.style.transform = "rotate(180deg)";
    // newElmnt.style.marginLeft = 0 - Number(sp('border-sides-width')) - 4 + 'px';
    // // newElmnt.style.marginTop = (document.getElementsByclassName('slider')[4].value / 2) + "px";
    // newElmnt.style.marginTop = (elmnt.offsetTop - pos) + "px";
    addStyleQuery(document.querySelectorAll('volumeButtons'), ['transform', 'marginLeft', 'marginTop'], ['rotate(180deg)', 0 - Number(sp('border-sides-width')) - 4 + 'px', (elmnt.offsetTop - pos) + "px"]);
  } else if (elmnt == document.getElementsByClassName('powerButton')[0]) {
    power180 = true;
    powerSide = "left";
    // newElmnt = document.getElementsByClassName('powerButton')[1];
    // newElmnt.style.transform = "rotate(180deg)";
    // newElmnt.style.marginLeft = 0 - Number(sp('border-sides-width')) - 4 + 'px';
    // // newElmnt.style.marginTop = (document.getElementsByclassName('slider')[4].value / 2) + "px";
    // newElmnt.style.marginTop = (elmnt.offsetTop - pos) + "px";
    addStyleQuery(document.querySelectorAll('powerButton'), ['transform', 'marginLeft', 'marginTop'], ['rotate(180deg)', 0 - Number(sp('border-sides-width')) - 4 + 'px', (elmnt.offsetTop - pos) + "px"]);
  }
}
// really buggy:
// function updatePosX(elmnt, pos) {
//   var screenHeight = document.getElementsByclassName('slider')[4];
//   if (elmnt == document.getElementsByClassName('volumeButtons')[0]) {
//   // alert(newElmnt);
//     newElmnt = document.getElementsByClassName('volumeButtons')[1];
//     newElmnt.style.transform = "rotate(90deg)";
//     newElmnt.style.marginTop = (Number(screenHeight.value) + Number(document.getElementsByClassName('slider')[1].value)) - (elmnt.offsetHeight / 2) + 3 + "px";
//     newElmnt.style.marginLeft = (elmnt.offsetLeft) + "px";
//   } else if (elmnt == document.getElementsByClassName('powerButton')[0]) {
//     newElmnt = document.getElementsByClassName('powerButton')[1];
//     newElmnt.style.transform = "rotate(90deg)";
//     newElmnt.style.marginTop = (Number(screenHeight.value) + Number(document.getElementsByClassName('slider')[1].value)) - (elmnt.offsetHeight / 2) + 3 + "px";
//     newElmnt.style.marginLeft = (elmnt.offsetLeft) + "px";
//   }
// }




// TODO: doesn't need a lot of this
