
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
  //   document.getElementById('phone-front').removeAttribute("style");
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
    value = document.getElementById(slider).value;
    queryAddStyle('.notch', 'width', value + 'px');
    document.getElementById(slider + "-text").innerHTML = pixelsTOcm(value);
  } else if (slider == "hole-punch-width") {
    value = document.getElementById(slider).value;
    queryAddStyle('.hole-punch', 'width', value + 'px');
    document.getElementById(slider + "-text").innerHTML = pixelsTOcm(value);
  } else {
    var amountOfSliders = document.querySelectorAll('.sliderQuery').length;
    var amountOfPhones = document.querySelectorAll('.phone').length;

    pixelateCanvas();

    // var phone = document.getElementById('phone-front');
    // var value = document.getElementById(slider).value;
    // style += slider + ": " + value + "px;";
    // document.getElementById('phone-front').setAttribute("style", style);


  // #phone-front || #phone-back
    var query = document.querySelectorAll('.sliderQuery');
    for (var i = 0; i < query.length; i++) {
      var id = query[i].id;
      if (id == 'border-sides-width') {
        queryAddAttr('.phone', 'style', 'border-left-width:' + query[i].value + 'px;', true, 'border-left-width');
        queryAddAttr('.phone', 'style', 'border-right-width:' + query[i].value + 'px;', true, 'border-right-width');
        queryAddAttr('.material', 'style', 'border-left-width:' + query[i].value + 'px;', true, 'border-left-width');
        queryAddAttr('.material', 'style', 'border-right-width:' + query[i].value + 'px;', true, 'border-right-width');
      } else {
        // TODO: the material is being weird on top border and side borders (Fixed??)
        queryAddAttr('.phone', 'style', id + ':' + query[i].value + 'px;', true, id);
        queryAddAttr('.material', 'style', id + ':' + query[i].value + 'px;', true, id);
      }
      // queryAddAttr('#phone-front', 'style', 'background:' + smartphones[currentPhone].color + ';', true, id);
      smartphones[currentPhone][id] = query[i].value;
    }
    queryAddStyle('.phone', 'background', smartphones[currentPhone].color);


    var sideWidth = smartphones[currentPhone]['border-sides-width'];
    if (sideWidth == undefined) sideWidth = 11.3;
    queryAddAttr('.material', 'style', 'margin-left:-' + sideWidth + 'px;', true, 'margin-left');


    document.getElementById(slider + "-text").innerHTML = pixelsTOcm(document.getElementById(slider).value);





    // TODO: border-radus is acting weird

    // var radius = document.getElementById('border-radius').value;
    // var width = document.getElementById('width').value;
    // var height = document.getElementById('height').value;
    var radius = smartphones[currentPhone].radius;
    var width = smartphones[currentPhone].width;
    var height = smartphones[currentPhone].height;

    queryAddStyle('.glass-reflection', 'borderTop', height + 'px solid rgba(255,255,255,0.04)');
    queryAddStyle('.glass-reflection', 'borderRight', width + 'px solid transparent');
    queryAddStyle('.glass-shadow', 'width', width + 'px');
    queryAddStyle('.glass-shadow', 'height', height + 'px');
    // var top = document.getElementById('border-top-width').value;
    // var bottom = document.getElementById('border-bottom-width').value;
    // var sides = document.getElementById('border-sides-width').value;
    // queryAddStyle('.glass-shadow', 'borderColor', 'blue');
    // queryAddStyle('.glass-shadow', 'borderWidth', top + "px " + sides + "px " + bottom + "px " + sides + "px");
    // queryAddStyle('.glass-shadow', 'borderRadius', radius + "px");




    // fix elements to the phone
    var heightValue = document.getElementById('height');
    var bottomBorderValue = document.getElementById('border-bottom-width');

    var sideBorderValue = document.getElementById('border-sides-width');
    var widthValue = document.getElementById('width');

    var topBorderValue = document.getElementById('border-top-width');

    var speaker = document.getElementsByClassName('speaker')[0];
    var homeButton = document.getElementsByClassName('homeButton')[0];
    var volumeButtons = document.getElementsByClassName('volumeButtons')[0];
    var volumeButtons1 = document.getElementsByClassName('volumeButtons')[1];
    var powerButton = document.getElementsByClassName('powerButton')[0];
    var powerButton1 = document.getElementsByClassName('powerButton')[1];


    var marginTop = Number(bottomBorderValue.value)/2 + Number(heightValue.value);
    homeButton.style.marginTop = marginTop + "px";
    // addStyle([homeButton], [marginTop + 'px'], ['marginTop']);6

    var marginLeft = Number(sideBorderValue.value) + Number(widthValue.value) -1;

    var styleArray = [
      0 - sideBorderValue.value -7 + 'px',
      0 - sideBorderValue.value -4 + 'px',
      0 - sideBorderValue.value -7 + 'px',
      0 - sideBorderValue.value -4 + 'px'
    ];

    if (volumeSide == "right") addStyle(document.querySelectorAll(".volumeButtons"), [marginLeft + 0.2 + 'px'], 'marginLeft'); // + 0.2
    // else addStyle([volumeButtons, volumeButtons1], [0 - sideBorderValue.value -10 + 'px', sideBorderValue.value -4 + 'px'], 'marginLeft');
    else {
      addStyle(document.querySelectorAll(".volumeButtons"), styleArray, 'marginLeft');
      queryAddStyle('.volumeButtons', 'transform', "rotate(180deg);");
    }
    if (powerSide == "right") addStyle(document.querySelectorAll(".powerButton"), [marginLeft + 0.2 + 'px'], 'marginLeft');
    else {
      addStyle(document.querySelectorAll(".powerButton"), styleArray, 'marginLeft');
      queryAddStyle('.powerButton', 'transform', "rotate(180deg);");
    }

    var vartop1 = volumeButtons.style.marginTop;
    var vartop2 = powerButton.style.marginTop;
    queryAddStyle('.volumeButtons', 'marginTop', vartop1);
    queryAddStyle('.powerButton', 'marginTop', vartop2);




    speaker.style.marginTop = "-" + (Number(topBorderValue.value) /2  + 4.5) + "px";

    // disaple/enable external components if there is no room for it
    if (heightValue.value + topBorderValue.value + bottomBorderValue.value < 140 && userChange == false) {
      document.getElementById('volumeButtons-check').checked = false;
      document.getElementById('powerButton-check').checked = false;
      toggle('volumeButtons');
      toggle('powerButton');
      userChange = false;
    } else if (heightValue.value + topBorderValue.value + bottomBorderValue.value >= 140 && userChange == false) {
      document.getElementById('volumeButtons-check').checked = true;
      document.getElementById('powerButton-check').checked = true;
      toggle('volumeButtons');
      toggle('powerButton');
      userChange = false;
    }

    if (topBorderValue.value < 15 && topBorderValue.value >= 1 && userChange == false) {
      document.getElementById('speaker-check').checked = false;
      document.getElementById('notch-check').checked = true;
      toggle('speaker');
      toggle('notch');
      userChange = false;
    } else if (topBorderValue.value >= 15 && userChange == false) {
      document.getElementById('speaker-check').checked = true;
      document.getElementById('notch-check').checked = false;
      toggle('speaker');
      toggle('notch');
      userChange = false;
    } else if (topBorderValue.value < 1 && userChange == false) {
      document.getElementById('speaker-check').checked = false;
      document.getElementById('notch-check').checked = false;
      toggle('speaker');
      toggle('notch');
      userChange = false;
    }

    // TODO: why does not topbordervalue work?

    if (bottomBorderValue.value < 30 && userChange == false) { // TODO: change type instead of removing it.
      document.getElementById('homeButton-check').checked = false;
      toggle('homeButton');
      userChange = false;
    } else if (bottomBorderValue.value >= 30 && userChange == false) {
      document.getElementById('homeButton-check').checked = true;
      toggle('homeButton'); // // TODO: userChange in function
      userChange = false;
    }



    // switch (slider) {
    //   case "borderTopWidth":
    //     document.getElementById('phone-front').style.borderTopWidth = value + "px";
    //     // alert(document.getElementById('phone-front').style.borderTopWidth = value + "px");
    //     break;
    // }

    // applyToAll(); // TODO: remove this function!
  }
}


function applyToAll() {
  var updateThese = [
    'hole-punch',
    'speaker',
    'homeButton',
    'volumeButtons',
    'powerButton'
  ];

  for (var count in updateThese) {
    var name = updateThese[count];
    var element = document.getElementsByClassName(name);
    var left = window.getComputedStyle(element[0], null).getPropertyValue("margin-left");
    if (name == 'volumeButtons' && volume180 == true || name == 'powerButton' && power180 == true) {
      left = (Number(left.slice(0, -2)) +3) + 'px';
    }
    // console.log(element);
    // console.log(left);
    var top = window.getComputedStyle(element[0], null).getPropertyValue("margin-top");

    // TODO: if rotate(180deg) then remove -3 from left margin   <------------ HERE

    queryAddAttr('.' + name, 'style', "margin-left:" + left + ";margin-top:" + top + ';', false);
  }

  // count = 0;
  // while (count < updateThese.length) {
  //   var name = updateThese[count];
  //   var element = document.getElementsByClassName(name);
  //   var left = window.getComputedStyle(element[0], null).getPropertyValue("margin-left");
  //   if (name == 'volumeButtons' && volume180 == true || name == 'powerButton' && power180 == true) {
  //     left = Number(left.slice(0, -2)) +3;
  //     left += "px";
  //     // console.log(left);
  //   }
  //   var top = window.getComputedStyle(element[0], null).getPropertyValue("margin-top");
  //
  //   // var query = document.querySelectorAll('.' + name);
  //   // var counter = 1;
  //   // while (counter < query.length) {
  //   //   element[counter].setAttribute("style", "margin-left: " + left + "; margin-top: " + top);
  //   //   counter++;
  //   // }
  //   queryAddAttr('.' + name, 'style', "margin-left:" + left + ";margin-top:" + top, false);
  //   count++;
  // }

  // 180 degrees
  if (volume180 == true) {
    // var query = document.querySelectorAll(".volumeButtons");
    // for (var i = 0; i < query.length; i++) {
    //   if (query[i].closest('#phone-back') !== null) {
    //     var left2 = (Number(window.getComputedStyle(document.getElementsByClassName("volumeButtons")[0], null).getPropertyValue("margin-left").slice(0, -2)) +3);
    //     console.log(query[i]);
    //     console.log(left2);
    //     // queryAddAttr('.volumeButtons', 'style', 'margin-left:' + left2, true, 'margin-left');
    //     addStyle([query[i]], [left2 + 'px'], 'marginLeft');
    //   }
    // }

    queryAddStyle('.volumeButtons', 'transform', "rotate(180deg);");
  }
  if (power180 == true) {
    queryAddStyle('.powerButton', 'transform', "rotate(180deg);");
  }
}



var userChange = false;
function toggle(toggle) {
  userChange = true;
  // var amountOfClasses = document.querySelectorAll('.' + toggle).length;
  var isChecked = document.getElementById(toggle + '-check').checked;
  // console.log(amountOfClasses);
  // console.log(toggle);
  var query = document.querySelectorAll('.' + toggle);
  for (var i = 0; i < query.length; i++) {
    // console.log('-------------------------');
    // console.log(query[i]);
    if (isChecked) {
      query[i].classList.remove('hidden');
      if (toggle == 'notch') {
        document.getElementById('notch-width').disabled = false;
      } else if (toggle == 'hole-punch') {
        document.getElementById('hole-punch-width').disabled = false;
      }
    } else {
      query[i].classList.add('hidden');
      if (toggle == 'notch') {
        document.getElementById('notch-width').disabled = true;
      } else if (toggle == 'hole-punch') {
        document.getElementById('hole-punch-width').disabled = true;
      }
    }
  }
}



function dropdown(what) {
  if (what == 'templates') {
    document.getElementById("templateButtons").classList.toggle("hidden");
  } else if (what == 'homeButton') {
    document.getElementById("homeButtonButtons").classList.toggle("hidden");
  }
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
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

  document.getElementsByClassName('slider')[0].value = values[0];
  document.getElementsByClassName('slider')[1].value = values[1];
  document.getElementsByClassName('slider')[2].value = values[2];
  document.getElementsByClassName('slider')[3].value = values[3];
  document.getElementsByClassName('slider')[4].value = values[4];
  document.getElementsByClassName('slider')[5].value = values[5];



 // var test;
  for (var progress in amountOfSliders) {
    slidervalue(document.getElementsByClassName('slider')[progress].id);
    // test += test;
  }

  // alert(test);

  // TODO: dropdown names.
  // document.getElementsByClassName('dropbtn')[0].innerHTML = template;
}


function hardware(x) {
  var name;
  if (x == 'round') {
    document.getElementsByClassName('homeButton')[0].style.width = '30px';
    document.getElementsByClassName('homeButton')[0].style.height = '30px';
    document.getElementsByClassName('homeButton')[0].style.borderRadius = '50%';
    name = 'Round';
  } else if (x == 'square') {
    document.getElementsByClassName('homeButton')[0].style.width = '25px';
    document.getElementsByClassName('homeButton')[0].style.height = '25px';
    document.getElementsByClassName('homeButton')[0].style.borderRadius = '2px';
    name = 'Square';
  } else if (x == 'rectangle') {
    document.getElementsByClassName('homeButton')[0].style.width = '40px';
    document.getElementsByClassName('homeButton')[0].style.height = '20px';
    document.getElementsByClassName('homeButton')[0].style.borderRadius = '2px';
    name = 'Rectangle';
  } else if (x == 'round-rectangle') {
    document.getElementsByClassName('homeButton')[0].style.width = '40px';
    document.getElementsByClassName('homeButton')[0].style.height = '20px';
    document.getElementsByClassName('homeButton')[0].style.borderRadius = '10px';
    name = 'Round Rectangle';
  }
  document.getElementsByClassName('dropbtn')[1].innerHTML = name;
}








function material(material) {
  var overlay = document.getElementsByClassName('material')[0];
  if (material == 'plastic') {
    // overlay.style.borderColor = 'red';
    // overlay.style.background = 'rgba(205, 41, 85, 0.59)';
    // overlay.style.backgroundColor = 'transparent';
    overlay.style.backgroundImage = 'none';
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
    overlay.style.backgroundImage = 'url("img/notmine/leather-texture.png")';
    overlay.style.rotate = '180deg';
    // alert(overlay.style.backgroundImage);
  }
}
