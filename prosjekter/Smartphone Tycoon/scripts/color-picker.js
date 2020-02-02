function ColorPicker() {
  this.colorPalette = $('.color-palette canvas').get(0);
  this.colorPaletteCtx = this.colorPalette.getContext('2d');

  this.colorSlider = $('.color-slider2 canvas').get(0);
  this.colorSliderCtx = this.colorSlider.getContext('2d');

  this.startColor = '#f00';
  this.colorCoords = {'x': 0, 'y': 131};

  this.color = {
    'hex'  : '',
    'rgb'  : '',
    'hsv'  : '',
    'hsl'  : '',
    'cmyk' : '',
  };

  this.getMouseCoords = function(e, canvas) {
    var mouseCoords = '',
        x = e.pageX - $(canvas).offset().left,
        y = e.pageY - $(canvas).offset().top;

    if (x < 0) x = 0;
    if (x >= canvas.width) x = canvas.width - 1;
    if (y < 0) y = 0;
    if (y >= canvas.height) y = canvas.height - 1;

    mouseCoords = {'x' : x, 'y': y};

    if (canvas == this.colorPalette) {
    	this.colorCoords = mouseCoords;
    }

    return mouseCoords;
  };

  this.selectColor = function() {
    var ctx = this.colorPaletteCtx,
        x   = this.colorCoords.x,
        y   = this.colorCoords.y,
        imgData = ctx.getImageData(x, y, 1, 1).data,
        rgb = 'rgb('+imgData[0]+', '+imgData[1]+', '+imgData[2]+')';

    this.colorValues(rgb);

    $('.color-palette .selector').css({
      'background': rgb,
      'top': this.colorCoords.y + 'px',
      'left': this.colorCoords.x + 'px'
    });

    $('.color-current').css('background', rgb);

    // my code
    // apply to all phones
    // var amountOfPhones = document.querySelectorAll('.phone').length;
    // for (var progress in amountOfPhones) {
    //   // document.getElementsByClassName('phone')[progress].style.background = rgb;
    //   var id = document.getElementsByClassName('phone')[progress].id;
    //   // console.log(id);
    //   // TODO: This doesn't apply to all phones...
    //   if (id == 'phoneBack') {
    //     document.getElementById('phoneBack').style.background = rgb;
    //     document.getElementById('phoneBack').style.borderColor = rgb;
    //
    //     // console.log(setBackground('backCameras', rgb));
    //
    //     setBackground('backCameras', rgb);
    //     setBackground('powerButton', rgb);
    //     setBackground('volumeButtons', rgb);
    //
    //     setBackground('phoneFront', rgb);
    //
    //     smartphones[currentPhone].color = rgb;
    //   } else {
    //     document.getElementsByClassName('phone')[progress].style.borderColor = rgb;
    //   }
    // }

    // var query =  document.querySelectorAll('.phone');
    // for (var i = 0; i < query.length; i++) {
    //   var id = query[i].id;
    //   if (id == 'phoneBack') {
    //     // document.getElementById('phoneBack').style.background = rgb;
    //     // document.getElementById('phoneBack').style.borderColor = rgb;
    //     // addStyle('#phoneBack', 'background', rgb);
    //     // addStyle('#phoneBack', 'borderColor', rgb);
    //     addStyleQuery(document.querySelectorAll('#phoneBack'), ['background', 'borderColor'], [rgb]);
    //
    //     addStyle('.backCameras', 'background', rgb);
    //     addStyle('.powerButton', 'background', rgb);
    //     addStyle('.volumeButtons', 'background', rgb);
    //
    //     addStyle('.phoneFront', 'background', rgb);
    //
    //     smartphones[currentPhone].color = rgb;
    //   } else {
    //     document.getElementsByClassName('phone')[progress].style.borderColor = rgb;
    //     // addStyle('.phone', 'borderColor', rgb);
    //   }
    // }


    spAdd('color', rgb);

    addStyle('.backCameras', 'background', rgb);
    addStyle('.powerButton', 'background', rgb);
    addStyle('.volumeButtons', 'background', rgb);

    // addStyleQuery(document.querySelectorAll('.phone'), ['background', 'borderColor'], [rgb]);
    // addStyle('#phoneFront', 'background', 'black');
    addStyleQuery(document.querySelectorAll('#phoneBack'), ['background', 'borderColor'], [rgb]);
    addStyle('#phoneFront', 'borderColor', rgb);

  };

  this.colorValues = function(rgb) {

  };

  this.createColorPalette = function(color) {
    var picker  = this,
        canvas  = picker.colorPalette,
        ctx     = picker.colorPaletteCtx,
        clicked = false;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = color;
    ctx.fillRect(1, 0, canvas.width, canvas.height - 1);

    var whiteGradient = ctx.createLinearGradient(1, 1, canvas.width - 1, -1);
    whiteGradient.addColorStop(0, "#fff");
    whiteGradient.addColorStop(1, "transparent");
    ctx.fillStyle = whiteGradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    var blackGradient = ctx.createLinearGradient(0, 0, -1, canvas.height - 1);
    blackGradient.addColorStop(0, "transparent");
    blackGradient.addColorStop(1, "#000");
    ctx.fillStyle = blackGradient;
    ctx.fillRect(0, 1, canvas.width, canvas.height);

    $('.selector').on('mousedown touchstart', function(e) {
      clicked = true;
      picker.colorPaletteSelect(e, canvas, ctx);
    });
    $(canvas).on('mousedown touchend', function(e) {
      clicked = true;
      picker.colorPaletteSelect(e, canvas, ctx);
    });

    $(document).on('mousemove touchmove', function(e) {
      if(e.buttons == 1 && clicked) {
        picker.colorPaletteSelect(e, canvas, ctx);
      }
    })
    .on('mouseup', function() {
      clicked = false;
    });
  };

  this.colorPaletteSelect = function(e, canvas, ctx) {
    this.getMouseCoords(e, canvas);

    this.selectColor();
  };

  this.createColorSlider = function() {
    var picker  = this,
        canvas  = this.colorSlider,
        ctx     = this.colorSliderCtx,
        clicked = false;

    var hueGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    hueGradient.addColorStop(0.00, "#ff0000");
    hueGradient.addColorStop(0.17, "#ff00ff");
    hueGradient.addColorStop(0.33, "#0000ff");
    hueGradient.addColorStop(0.50, "#00ffff");
    hueGradient.addColorStop(0.67, "#00ff00");
    hueGradient.addColorStop(0.83, "#ffff00");
    hueGradient.addColorStop(1.00, "#ff0000");

    ctx.fillStyle = hueGradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    $('.selector2').on('mousedown touchstart', function(e) {
      clicked = true;
      picker.colorSliderSelect(e, canvas, ctx);
    });
    $(canvas).on('mousedown', function(e) {
      clicked = true;
      picker.colorSliderSelect(e, canvas, ctx);
    });

    $(document).on('mousemove', function(e) {
      if(e.buttons == 1 && clicked) {
        picker.colorSliderSelect(e, canvas, ctx);
      }
    })
    .on('mouseup', function() {
      clicked = false;
    });
  };

  this.colorSliderSelect = function(e, canvas, ctx) {
    var mouse = this.getMouseCoords(e, canvas);

    var imgData = ctx.getImageData(0, mouse.y, 1, 1).data;

    var rgb = 'rgb('+imgData[0]+', '+imgData[1]+', '+imgData[2]+')';

    // my code
    $('.color-slider2 .selector2').css({
      'background': rgb,
      'top': mouse.y + 'px'
    });

    this.createColorPalette(rgb);

    this.selectColor();
  };

  this.createColorPalette(this.startColor);
  this.createColorSlider();

  this.selectColor();
}

new ColorPicker();
