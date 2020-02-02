// queryAddAttr('notch', 'style', 'width:' + value + 'px', true);
function queryAddAttr(className, name, style, value, addToExisting) {
  var storedValue = style + ':' + value;
  for (var j = 0; j < className.length; j++) {
    var query = document.querySelectorAll(className[j]);
    value = storedValue;
    // console.log(query);
    // console.log(className[j]);
    // console.log(name);
    // console.log(value);
    // console.log(document.querySelectorAll('.' + className[j])[0].getAttribute(name));
    var attr = query[0].getAttribute(name);
    if (addToExisting === true && attr !== null) {
      attr = ';' + attr;
      // console.log(attr);
      // console.log(style);
      var index = attr.indexOf(';' + style);
      // console.log(index);
      if (index !== -1) {
        var semicolorIndex = attr.indexOf(';', index + 1);
        // console.log(semicolorIndex);
        // console.log('-------');
        // console.log('VALUE = ' + attr);
        // console.log('KEEP: 0 -> ' + index + ', ' + semicolorIndex + ' -> ' + attr.length);
        value = attr.slice(0, index) + attr.slice(semicolorIndex, attr.length) + value;
        // console.log(attr);
      } else {
        value = attr + value;
      }
      value = value.substring(1);
      // console.log('OUTPUT' + value);
      // value += query[0].getAttribute(name);
    }
    // console.log(value);
    for (var i = 0; i < query.length; i++) {
      // console.log(query[i]);
      query[i].setAttribute(name, value);
    }
  }
}


function addStyle(query, name, value) {
  query = document.querySelectorAll(query);
  for (var i = 0; i < query.length; i++) {
    query[i].style[name] = value;
  }
}

function addStyleQuery(elem, name, value) {
  for (var j = 0; j < elem.length; j++) {
    // console.log(elem);
    var styleElem = elem[j];
    var styleName = name[0];
    var styleValue = value[0];
    for (var i = 0; i < name.length; i++) {
      if (name.length > 1) styleName = name[i];
      if (value.length > 1) styleValue = value[i];
      // console.log(styleElem.classList[0] + ' => ' + styleName + ' = ' + styleValue);
      // console.log("document.getElementsByClassName('" + styleElem.classList[0] + "')[0].style." + styleName + " = '" + styleValue + "'");
      styleElem.style[styleName] = styleValue;
    }
  }
}




function getElems(query) {
  var out = document.querySelectorAll(query);
  if (query.includes('#')) out = out[0];
  return out;
}
function getVal(query) {
  return document.querySelectorAll(query)[0].value;
}
function getId(query) {
  return document.querySelectorAll(query)[0].id;
}
function getStyle(query, selector) {
  return document.querySelectorAll(query)[0].style[selector];
}

function setText(query, value) {
  query = document.querySelectorAll(query);
  for (var i = 0; i < query.length; i++) {
    query[i].innerHTML = value;
  }
}
function setVal(query, valueArray) {
  query = document.querySelectorAll(query);
  for (var i = 0; i < query.length; i++) {
    for (var j = 0; j < valueArray.length; j++) {
      query[i].innerHTML = valueArray[j];
    }
  }
}


function sp(selector) {
  var out = smartphones[currentPhone][selector];
  if (out == undefined) out = smartphones['default'][selector];
  return out;
}
function spAdd(selector, value) {
  smartphones[currentPhone][selector] = value;
}


function check(query, state) {
  query = document.querySelectorAll(query);
  for (var i = 0; i < query.length; i++) {
    query[i].checked = state;
  }
}
function disable(query, state) {
  query = document.querySelectorAll(query);
  for (var i = 0; i < query.length; i++) {
    query[i].disabled = state;
  }
}



function toggleHidden(query) {
  query = document.querySelectorAll(query);
  for (var i = 0; i < query.length; i++) {
    query[i].classList.toggle("hidden");
  }
}



// 1px = 0.02645833 cm (0,02645833)
// 1cm = 37.795276 px (37,795276)
function pixelsTOcm(px) { // pxTOcm
  return (px * 0.02645833).toFixed(2);
}
