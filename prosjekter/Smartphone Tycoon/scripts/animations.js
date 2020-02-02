
function fadein(element) {
  var op = 0;  // initial opacity
  element.style.opacity = op;
      element.style.display = 'block';
      op = 0.1;
      var timer = setInterval(function () {
        if (op >= 1){
            clearInterval(timer);
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op += op * 0.1;
      }, 8);
}

function fadeout(element) {
    var op = 1;  // initial opacity
    var timer = setInterval(function () {
        if (op <= 0.1){
            clearInterval(timer);
            element.style.display = 'none';
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op -= op * 0.1;
    }, 3);
}









// function moveout(element) {
//   element.style.transition = "all 2s ease-in-out";
//   element.style.height = "0px";
// }


  // Show an element
  var show = function (elem) {

  	// Get the natural height of the element
  	var getHeight = function () {
  		elem.style.display = 'block'; // Make it visible
  		var height = elem.scrollHeight + 'px'; // Get it's height
  		elem.style.display = ''; //  Hide it again
  		return height;
  	};

  	var height = getHeight(); // Get the natural height
  	elem.classList.add('is-visible'); // Make the element visible
  	elem.style.height = height; // Update the max-height

  	// Once the transition is complete, remove the inline max-height so the content can scale responsively
  	window.setTimeout(function () {
  		elem.style.height = '';
  	}, 350);

  };

  // Hide an element
  var hide = function (elem) {

  	// Give the element a height to change from
  	elem.style.height = elem.scrollHeight + 'px';

  	// Set the height back to 0
  	window.setTimeout(function () {
  		elem.style.height = '0';
  	}, 1);

  	// When the transition is complete, hide it
  	window.setTimeout(function () {
  		elem.classList.remove('is-visible');
  	}, 350);

  };

  // Toggle element visibility
  var toggle = function (elem, timing) {

  	// If the element is visible, hide it
  	if (elem.classList.contains('is-visible')) {
  		hide(elem);
  		return;
  	}

  	// Otherwise, show it
  	show(elem);

  };





function myMove(elem) {
  var pos = 0;
  var id = setInterval(frame, 10);
  function frame() {
    if (pos == 350) {
      clearInterval(id);
    } else {
      pos++;
      elem.style.top = pos + 'px';
      elem.style.left = pos + 'px';
    }
  }
}
