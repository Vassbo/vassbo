// source: https://medium.com/@leonardo.monteiro.fernandes/css-techniques-for-material-ripple-effect-3f0ece3062a0

$("html").on("click", ".cardButton", function(evt) {
  var btn = $(evt.currentTarget);
  var x = evt.pageX - btn.offset().left;
  var y = evt.pageY - btn.offset().top;

  var duration = 1000;
  var animationFrame, animationStart;

  var animationStep = function(timestamp) {
    if (!animationStart) {
      animationStart = timestamp;
    }

    var frame = timestamp - animationStart;
    if (frame < duration) {
      var easing = (frame/duration) * (2 - (frame/duration));

      var circle = "circle at " + x + "px " + y + "px";
      var color = "rgba(255, 255, 255, " + (0.3 * (1 - easing)) + ")";
      var stop = 90 * easing + "%";

      if (btn.hasClass("light")) {
        color = "rgba(196, 22, 22, " + (0.3 * (1 - easing)) + ")";
      }

      btn.css({
        "background-image": "radial-gradient(" + circle + ", " + color + " " + stop + ", transparent " + stop + ")"
      });

      animationFrame = window.requestAnimationFrame(animationStep);
    } else {
      $(btn).css({
        "background-image": "none"
      });
      window.cancelAnimationFrame(animationFrame);
    }

  };

  animationFrame = window.requestAnimationFrame(animationStep);

});
