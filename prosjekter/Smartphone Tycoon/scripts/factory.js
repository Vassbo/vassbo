
var smartphones = {
  'default': {
    // 'id': "value"
    'border-top-width': "37.8",
    'border-bottom-width': "37.8",
    'border-sides-width': "11.3",
    'border-radius': "18.9",
    'height': "377.9",
    'width': "226.8",

    'notch-check': false,
    'notch-width': "75.6",
    // 'notch-pos': "75.6",
    'hole-punch-check': false,
    'hole-punch-width': "49",
    'hole-punch-pos': "80", // %
    'speaker-check': true,
    'speaker-pos': "50", // %
    'homeButton-check': true,
    'homeButton-pos': "50", // %
    'homeButton-shape': "round",
    'volumeButtons-check': true,
    'volumeButtons-align': "right",
    'volumeButtons-pos': "40", // px
    'powerButton-check': true,
    'powerButton-align': "right",
    'powerButton-pos': "120", // px
    'headphoneJack-check': true,
    'chargerInput-check': true,

    'material': "plastic",
    'color': "#323232",

    'resolution': "30"
  }
};

var currentPhone = 'default';





function slidervalue(slider) {

  var style = "";
  var value;
  // var value = document.getElementById(slider).value;

  // if (slider == 'reset') {
  //   for (var progress in amountOfSliders) {
  //     var defaultValue = document.getElementsByClassName('slider')[progress].defaultValue;
  //     document.getElementsByClassName('slider')[progress].value = defaultValue;
  //     document.getElementById(document.getElementsByClassName('slider')[progress].id + "-text").innerHTML = pixelsTOcm(defaultValue);
  //     // alert(defaultValue);
  //   }
  //   document.getElementById('phoneFront').removeAttribute("style");
  //
  //   // apply to all phones
  //   // for (var progress in amountOfPhones) {
  //   // document.getElementsByClassName('phone')[progress].setAttribute("style", style);
  //   // }
  //
  //   // update all of the values
  //   for (var progress in amountOfSliders) {
  //     slidervalue(document.getElementsByClassName('slider')[progress].id);
  //   }
  //
  // } else
  if (slider == "notch-width") {
    value = getVal('#' + slider);
    addStyle('.notch', 'width', value + 'px');
    setText('#' + slider + "-text", pixelsTOcm(value));
  } else if (slider == "hole-punch-width") {
    value = getVal('#' + slider);
    addStyle('.hole-punch', 'width', value + 'px');
    setText('#' + slider + "-text", pixelsTOcm(value));
  } else {
    // var amountOfSliders = document.querySelectorAll('.sliderQuery').length;
    // var amountOfPhones = document.querySelectorAll('.phone').length;

    pixelateCanvas();

    // var phone = document.getElementById('phoneFront');
    // var value = document.getElementById(slider).value;
    // style += slider + ": " + value + "px;";
    // document.getElementById('phoneFront').setAttribute("style", style);


    var id1 = getId('#' + slider); // id == slider ?
    smartphones[currentPhone][id1] = getVal('#' + slider);
    updatePhones(id1);
    // createPhone(); // ...


  // // #phoneFront || #phoneBack
  //   var query = document.querySelectorAll('.sliderQuery');
  //   for (var i = 0; i < query.length; i++) {
  //     var id = query[i].id;
  //     if (id == 'border-sides-width') {
  //       queryAddAttr(['.phone'], 'style', 'border-left-width', query[i].value + 'px;', true);
  //       queryAddAttr(['.phone'], 'style', 'border-right-width', query[i].value + 'px;', true);
  //       queryAddAttr(['.material'], 'style', 'border-left-width', query[i].value + 'px;', true);
  //       queryAddAttr(['.material'], 'style', 'border-right-width', query[i].value + 'px;', true);
  //     } else {
  //       // TODO: the material is being weird on top border and side borders (Fixed??)
  //       queryAddAttr(['.phone'], 'style', id, query[i].value + 'px;', true);
  //       queryAddAttr(['.material'], 'style', id, query[i].value + 'px;', true);
  //     }
  //     // queryAddAttr(['#phoneFront'], 'style', 'background', smartphones[currentPhone].color + ';', true);
  //     smartphones[currentPhone][id] = query[i].value;
  //   }
  //   addStyle('.phone', 'background', smartphones[currentPhone].color);
  //
  //
  //   var sideWidth = smartphones[currentPhone]['border-sides-width'];
  //   if (sideWidth == undefined) sideWidth = 11.3;
  //   queryAddAttr(['.material'], 'style', 'margin-left', '-' + sideWidth + 'px;', true);


    setText('#' + slider + "-text", pixelsTOcm(getVal("#" + slider)));




    // fix elements to the phone
    var heightValue = getElems('#height');
    var bottomBorderValue = getElems('#border-bottom-width');

    var sideBorderValue = getElems('#border-sides-width');
    var widthValue = getElems('#width');

    var topBorderValue = getElems('#border-top-width');


    var marginTop = Number(bottomBorderValue.value)/2 + Number(heightValue.value);
    // homeButton.style.marginTop = marginTop + "px"; // just first one
    addStyle('.homeButton', 'marginTop', marginTop + 'px'); // all home buttons

    var marginLeft = Number(sideBorderValue.value) + Number(widthValue.value) -1;

    var styleArray = [
      0 - sideBorderValue.value -7 + 'px',
      0 - sideBorderValue.value -4 + 'px',
      0 - sideBorderValue.value -7 + 'px',
      0 - sideBorderValue.value -4 + 'px'
    ];

    if (volumeSide == "right") addStyleQuery(document.querySelectorAll(".volumeButtons"), ['marginLeft'], [marginLeft + 0.2 + 'px']); // + 0.2
    // else addStyleQuery([volumeButtons, volumeButtons1], ['marginLeft'], [0 - sideBorderValue.value -10 + 'px', sideBorderValue.value -4 + 'px']);
    else {
      addStyleQuery(getElems(".volumeButtons"), ['marginLeft'], styleArray);
      // TODO: rotate 180 deg
      addStyle('.volumeButtons', 'transform', "rotate(180deg);");
    }
    if (powerSide == "right") addStyleQuery(document.querySelectorAll(".powerButton"), ['marginLeft'], [marginLeft + 0.2 + 'px']);
    else {
      addStyleQuery(getElems(".powerButton"), ['marginLeft'], styleArray);
      addStyle('.powerButton', 'transform', "rotate(180deg);");
    }

    addStyle('.volumeButtons', 'marginTop', getStyle('.volumeButtons', 'marginTop'));
    addStyle('.powerButton', 'marginTop', getStyle('.powerButton', 'marginTop'));




    // getElems('.speaker')[0].style.marginTop = "-" + (Number(topBorderValue.value) /2  + 4.5) + "px";
    addStyle('.speaker', 'marginTop', "-" + (Number(topBorderValue.value) /2 + 4.5) + "px");

    // disaple/enable external components if there is no room for it
    if (heightValue.value + topBorderValue.value + bottomBorderValue.value < 140 && userChange == false) {
      check('#volumeButtons-check', false);
      check('#powerButton-check', false);
      toggle('volumeButtons');
      toggle('powerButton');
      userChange = false;
    } else if (heightValue.value + topBorderValue.value + bottomBorderValue.value >= 140 && userChange == false) {
      check('#volumeButtons-check', true);
      check('#powerButton-check', true);
      toggle('volumeButtons');
      toggle('powerButton');
      userChange = false;
    }

    if (topBorderValue.value < 15 && topBorderValue.value >= 1 && userChange == false) {
      check('#speaker-check', false);
      check('#notch-check', true);
      toggle('speaker');
      toggle('notch');
      userChange = false;
    } else if (topBorderValue.value >= 15 && userChange == false) {
      check('#speaker-check', true);
      check('#notch-check', false);
      toggle('speaker');
      toggle('notch');
      userChange = false;
    } else if (topBorderValue.value < 1 && userChange == false) {
      check('#speaker-check', false);
      check('#notch-check', false);
      toggle('speaker');
      toggle('notch');
      userChange = false;
    }

    // TODO: why does not topbordervalue work?

    if (bottomBorderValue.value < 30 && userChange == false) { // TODO: change type instead of removing it.
      check('#homeButton-check', false);
      toggle('homeButton');
      userChange = false;
    } else if (bottomBorderValue.value >= 30 && userChange == false) {
      check('#homeButton-check', true);
      toggle('homeButton'); // // TODO: userChange in function
      userChange = false;
    }



    // switch (slider) {
    //   case "borderTopWidth":
    //     document.getElementById('phoneFront').style.borderTopWidth = value + "px";
    //     // alert(document.getElementById('phoneFront').style.borderTopWidth = value + "px");
    //     break;
    // }

    // applyToAll(); // TODO: remove this function!
  }
}





function updatePhones(id) {
  // if (is css style)
  var value = smartphones[currentPhone][id];

  if (id == 'border-sides-width') {
    queryAddAttr(['.phone', '.material'], 'style', 'border-left-width', value + 'px;', true);
    queryAddAttr(['.phone', '.material'], 'style', 'border-right-width', value + 'px;', true);
  } else {
    queryAddAttr(['.phone', '.material'], 'style', id, value + 'px;', true);
  }
  addStyle(['.phone'], 'background', smartphones[currentPhone].color);

  // update material positioning
  var sideWidth = smartphones[currentPhone]['border-sides-width'];
  if (sideWidth == undefined) sideWidth = 11.3;
  queryAddAttr(['.material'], 'style', 'margin-left', '-' + sideWidth + 'px;', true);



  // TODO: material & glass border radius not working properly...
  addStyleQuery(getElems('.glass-reflection'), ['borderTop', 'borderRight'], [sp('height') + 'px solid rgba(255,255,255,0.04)', sp('width') + 'px solid transparent']);
  addStyleQuery(getElems('.glass-shadow'), ['width', 'height'], [sp('width') + 'px', sp('height') + 'px']);
  // var sides = getVal('#border-sides-width');
  // var borderWidthStyle = getVal('#border-top-width') + "px " + sides + "px " + getVal('#border-bottom-width') + "px " + sides + "px";
  // addStyleQuery(getElems('.glass-shadow'), ['borderColor', 'borderWidth', 'borderRadius'], ['blue', borderWidthStyle, sp('radius') + "px"]);
}








// function applyToAll() {
//   var updateThese = [
//     'hole-punch',
//     'speaker',
//     'homeButton',
//     'volumeButtons',
//     'powerButton'
//   ];
//
//   for (var count in updateThese) {
//     var name = updateThese[count];
//     var element = document.getElementsByClassName(name);
//     var left = window.getComputedStyle(element[0], null).getPropertyValue("margin-left");
//     if (name == 'volumeButtons' && volume180 == true || name == 'powerButton' && power180 == true) {
//       left = (Number(left.slice(0, -2)) +3) + 'px';
//     }
//     // console.log(element);
//     // console.log(left);
//     var top = window.getComputedStyle(element[0], null).getPropertyValue("margin-top");
//
//     // TODO: if rotate(180deg) then remove -3 from left margin   <------------ HERE
//
//     queryAddAttr(['.' + name], 'style', "margin-left", left + ";margin-top:" + top + ';', false);
//   }
//
//   // count = 0;
//   // while (count < updateThese.length) {
//   //   var name = updateThese[count];
//   //   var element = document.getElementsByClassName(name);
//   //   var left = window.getComputedStyle(element[0], null).getPropertyValue("margin-left");
//   //   if (name == 'volumeButtons' && volume180 == true || name == 'powerButton' && power180 == true) {
//   //     left = Number(left.slice(0, -2)) +3;
//   //     left += "px";
//   //     // console.log(left);
//   //   }
//   //   var top = window.getComputedStyle(element[0], null).getPropertyValue("margin-top");
//   //
//   //   // var query = document.querySelectorAll('.' + name);
//   //   // var counter = 1;
//   //   // while (counter < query.length) {
//   //   //   element[counter].setAttribute("style", "margin-left: " + left + "; margin-top: " + top);
//   //   //   counter++;
//   //   // }
//   //   queryAddAttr(['.' + name], 'style', "margin-left", left + ";margin-top:" + top, false);
//   //   count++;
//   // }
//
//   // 180 degrees
//   if (volume180 == true) {
//     // var query = document.querySelectorAll(".volumeButtons");
//     // for (var i = 0; i < query.length; i++) {
//     //   if (query[i].closest('#phoneBack') !== null) {
//     //     var left2 = (Number(window.getComputedStyle(document.getElementsByClassName("volumeButtons")[0], null).getPropertyValue("margin-left").slice(0, -2)) +3);
//     //     console.log(query[i]);
//     //     console.log(left2);
//     //     // queryAddAttr(['.volumeButtons'], 'style', 'margin-left:, left2, true);
//     //     addStyleQuery([query[i]], ['marginLeft'], [left2 + 'px']);
//     //   }
//     // }
//
//     addStyle('.volumeButtons', 'transform', "rotate(180deg);");
//   }
//   if (power180 == true) {
//     addStyle('.powerButton', 'transform', "rotate(180deg);");
//   }
// }



var userChange = false;
function toggle(toggle) {
  userChange = true;
  // var amountOfClasses = document.querySelectorAll('.' + toggle).length;
  var isChecked = getElems('#' + toggle + '-check').checked;
  // console.log(amountOfClasses);
  // console.log(toggle);
  var query = getElems('.' + toggle);
  for (var i = 0; i < query.length; i++) {
    // console.log('-------------------------');
    // console.log(query[i]);
    if (isChecked) {
      query[i].classList.remove('hidden');
      if (toggle == 'notch') disable('#notch-width', false);
      else if (toggle == 'hole-punch') disable('#hole-punch-width', false);
    } else {
      query[i].classList.add('hidden');
      if (toggle == 'notch') disable('#notch-width', true);
      else if (toggle == 'hole-punch') disable('#hole-punch-width', true);
    }
  }
}



function dropdown(what) {
  if (what == 'templates') toggleHidden("#templateButtons");
  else if (what == 'homeButton') toggleHidden("#homeButtonButtons");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = getElems(".dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (!openDropdown.classList.contains('hidden')) {
        openDropdown.classList.add('hidden');
      }
    }
  }
};



// TODO: afterwards
function templates(template) {
  var amountOfSliders = document.querySelectorAll('.sliderQuery').length;
  var values;

  if (template == 'S8') {
    values = [
      '17',
      '17',
      '0',
      '17',
      '428.8',
      '214.8'
    ];
  } else if (template == 'S10') {
    values = [
      '6',
      '10',
      '0',
      '17',
      '444.8',
      '223.8'
    ];
  } else if (template == 'Note9') {
    values = [
      '17',
      '17',
      '0',
      '8',
      '428.8',
      '214.8'
    ];
  } else if (template == 'i6') {
    values = [
      '45',
      '45',
      '9',
      '28',
      '317.8',
      '202.8'
    ];
  } else if (template == 'iX') {
    values = [
      '7',
      '7',
      '7',
      '19',
      '404.8',
      '204.8'
    ];
  }

  setVal('.slider', values);



 // var test;
  for (var progress in amountOfSliders) {
    slidervalue(getElems('.slider')[progress].id);
    // test += test;
  }

  // alert(test);

  // TODO: dropdown names.
  // document.getElementsByClassName('dropbtn')[0].innerHTML = template;
}


function hardware(x) {
  var name;
  var styleArray;
  if (x == 'round') {
    styleArray = ['30px', '30px', '50%'];
    name = 'Round';
  } else if (x == 'square') {
    styleArray = ['25px', '25px', '2px'];
    name = 'Square';
  } else if (x == 'rectangle') {
    styleArray = ['40px', '20px', '2px'];
    name = 'Rectangle';
  } else if (x == 'round-rectangle') {
    styleArray = ['40px', '20px', '10px'];
    name = 'Round Rectangle';
  }
  addStyleQuery(document.querySelectorAll('.homeButton'), ['width', 'height', 'borderRadius'], styleArray);
  getElems('.dropbtn')[1].innerHTML = name;
}








function material(material) {
  var overlay = getElems('.material')[0];
  if (material == 'plastic') {
    // overlay.style.borderColor = 'red';
    // overlay.style.background = 'rgba(205, 41, 85, 0.59)';
    // overlay.style.backgroundColor = 'transparent';
    // overlay.style.backgroundImage = 'none';
    addStyle('.material', 'backgroundImage', 'none');
  // } else if (material == 'glass') {
  //   overlay.style.backgroundColor = 'transparent';
  //   overlay.style.backgroundImage = 'linear-gradient(rgba(251, 255, 253, 0.24), rgba(255, 255, 255, 0.06))';
  //
  //   overlay.style.backgroundImage = 'url("img/notmine/glass-texture.png")';
  //   overlay.style.backgroundSize = 'cover';
  // } else if (material == 'metal') {
  //   overlay.style.backgroundImage = 'linear-gradient(rgba(251, 255, 253, 0.24), rgba(255, 255, 255, 0.06))';
  //   overlay.style.backgroundColor = 'rgba(158, 157, 156, 0.6)';
  //
  //   overlay.style.backgroundImage = 'url("img/notmine/metal-texture.jpg")';
  //   // overlay.style.backgroundSize = 'cover';
  } else if (material == 'leather') {
    // overlay.style.backgroundImage = 'linear-gradient(rgba(251, 255, 253, 0.24), rgba(255, 255, 255, 0.06))';
    // overlay.style.backgroundColor = 'rgba(82, 60, 34, 0.77)';
    // overlay.style.backgroundImage = 'url("img/notmine/leather-texture.png")';
    // overlay.style.rotate = '180deg';
    addStyle('.material', 'backgroundImage', 'url("img/notmine/leather-texture.png")');
    addStyle('.material', 'rotate', '180deg');
  }
}
