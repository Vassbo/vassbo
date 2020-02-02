// (C) Ken Fyrstenberg, Epistemex, License: CC3.0-attr
var ctx = canvas.getContext('2d'),
    img = new Image();
    // play = false;

// turn off image smoothing - this will give the pixelated effect
ctx.mozImageSmoothingEnabled = false;
ctx.webkitImageSmoothingEnabled = false;
ctx.imageSmoothingEnabled = false;

// wait until image is actually available
img.onload = pixelate;

// some image, we are not struck with CORS restrictions as we
// do not use pixel buffer to pixelate, so any image will do
// img.src = 'img/notmine/leaves.jpg';
img.src = 'img/notmine/home.png';

pixelateCanvas();
function pixelateCanvas() {
  canvas.width = getVal('#width');
  canvas.height = getVal('#height');
  pixelate();
}

// MAIN function
function pixelate() {
  // if in play mode use that value, else use slider value
  var size = (blocks.value) * 0.01,
      // cache scaled width and height
      w = canvas.width * size,
      h = canvas.height * size;


  if (blocks.value > 100) {
    canvas.style.display = 'none';
    ctx.drawImage(img, 0, 0, 0, 0);
    ctx.drawImage(canvas, 0, 0, 0, 0, 0, 0, 0, 0);
    addStyle('#phoneFront', 'backgroundImage', 'url(img/notmine/home.png)');
    addStyle('#phoneFront', 'backgroundSize', '100% 100%');
  } else {
    canvas.style.display = '';

    ctx.mozImageSmoothingEnabled = false;
    ctx.webkitImageSmoothingEnabled = false;
    ctx.imageSmoothingEnabled = false;

    // console.log(size);

    // apply shadow
    // this is very laggy
    // ctx.shadowInset = true;
    // ctx.shadowColor = "rgba(0, 0, 0, .2)";
    // ctx.shadowBlur = 10;
    // ctx.shadowOffsetX = 0;
    // ctx.shadowOffsetY = 0;

    // draw original image to the scaled size
    ctx.drawImage(img, 0, 0, w+1, h+1);

    // then draw that scaled image thumb back to fill canvas
    // As smoothing is off the result will be pixelated
    ctx.drawImage(canvas, 0, 0, w, h, 0, 0, canvas.width, canvas.height);
  }

  setText('#resW', w.toFixed(0));
  setText('#resH', h.toFixed(0));
}
