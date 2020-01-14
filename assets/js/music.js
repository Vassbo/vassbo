// TODO: Add Old Garage Band Tracks
// TODO: Add Album Titles..
// TODO: Add Duration/Uploaded time to Display


var audio;
var repeat = true, interval;
function playTrack(index) {
  var song = songs[index];
  if (song.includes("old:")) song = song.slice(4, song.length);
  if (fullscreen) {
    // TODO: Animate!
    document.getElementById("BIGcover").src = "./assets/music/covers/" + song + ".jpg";
  }
  document.getElementById("trackPlayNav").classList.remove("hidden");
  document.getElementById("trackCover").src = './assets/music/covers/' + song + '.jpg';
  document.getElementById("trackName").innerText = song;
  document.getElementById("play_pause").innerHTML = 'pause';
  updateTrackSlider("100%", "4px");

  var src = './assets/music/' + song + '.wav';
  new Audio(src).onerror = function() { src = './assets/music/' + song + '.mp3'; };
  setTimeout(function () {
    if (audio == undefined) {
      audio = new Audio(src);
      audio.id = "audio";
    } else {
      audio.src = src;
    }
    console.log(song);
    console.log(audio.currentTime);
    // audio.currentTime = 0;
    audio.play();
    audio.addEventListener('ended', function() {
      // audio.currentTime = 0;
      if (repeat == 'one') { audio.currentTime = 0; audio.play(); }
      else checkRepeat();
    });
    mediaSession(song);
  }, 80);

  var interval = setInterval(function () {
    if (audio !== undefined) {
      if (document.getElementById("trackDuration").innerText !== getTime(audio.duration)) {
        document.getElementById("trackDuration").innerText = getTime(audio.duration);
      }
      if (mousedown == false && document.getElementById("play_pause").innerHTML == 'pause') {
        document.getElementById("trackTime").innerText = getTime(audio.currentTime);
        var sliderWidth = document.getElementById("trackSlider").offsetWidth;
        var percentage = audio.currentTime / audio.duration;
        updateTrackSlider(sliderWidth - sliderWidth * percentage + "px", sliderWidth * percentage + 4 + "px");
      }
    }
  }, 50);
}


// TODO: MediaImage src can only be of http/https/data/blob scheme
// TODO: image to data js...
function mediaSession(song) {
  // var imageData = "./assets/music/covers/" + song + ".jpg";
  // var imageData = toData("./assets/music/covers/" + song + ".jpg");
  // var img = document.createElement('img');
  // img.src = "./assets/music/covers/" + song + ".jpg";
  // img.setAttribute('crossorigin', 'anonymous');
  // document.body.appendChild(img);
  //   var imageData = toData(img);
  // img.remove();
  // console.log(imageData);


  // var imageData = "data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=";
  var album = "Vizzber";
  // TODO: Album VVV
  // if (song == '') album = 'GarageBand';
  // if (song == '') album = 'Old Songs';
  if ('mediaSession' in navigator) {
    navigator.mediaSession.metadata = new MediaMetadata({
      title: song,
      artist: "Vizzber",
      // https://kristoffer.netlify.com/assets/music/covers/
      artwork: [{src: '/assets/music/covers/' + song + '.jpg', sizes: '192x192', type: 'image/jpg'}] // TODO: <--------
    });
    console.log(navigator);
    console.log(navigator.mediaSession);
    navigator.mediaSession.setActionHandler('play', pause);
    navigator.mediaSession.setActionHandler('pause', pause);
    navigator.mediaSession.setActionHandler('seekbackward', function() { audio.currentTime = audio.currentTime - 5; });
    navigator.mediaSession.setActionHandler('seekforward', function() { audio.currentTime = audio.currentTime + 5; });
    navigator.mediaSession.setActionHandler('previoustrack', function() { if (audio.currentTime < 3) { checkRepeat('back'); } else { audio.currentTime = 0; } });
    navigator.mediaSession.setActionHandler('nexttrack', checkRepeat);
  }
}


// function encodeImageFileAsURL(element, callback) {
//   console.log(element);
//   var file = element.files[0];
//   var reader = new FileReader();
//   reader.onloadend = function() {
//     // console.log('RESULT', reader.result);
//     callback(reader.result);
//   };
//   reader.readAsDataURL(file);
// }
//
// function toData(img) {
//   var c = document.createElement('canvas');
//   // var img = document.getElementById('Img1');
//   // c.height = img.naturalHeight;
//   // c.width = img.naturalWidth;
//   // setTimeout(function () {
//   //   console.log(img.clientHeight);
//   //   console.log(img.clientWidth);
//   //   console.log(img.offsetHeight);
//   //   console.log(img.offsetWidth);
//   //   console.log(img.naturalHeight);
//   //   console.log(img.naturalWidth);
//   //   console.log(img.height);
//   //   console.log(img.width);
//   // }, 10);
//   // c.height = 720 + "px";
//   // c.width = 1280 + "px";
//   c.height = 720;
//   c.width = 1280;
//   var ctx = c.getContext('2d');
//
//   console.log(img);
//
//   // setTimeout(function () {
//   //   ctx.drawImage(img, 0, 0, c.width, c.height);
//   //   console.log(c.toDataURL());
//   // }, 1000);
//
//   ctx.drawImage(img, 0, 0, c.width, c.height);
//   var base64String = c.toDataURL();
//   // console.log(ctx);
//   // console.log(c);
//   document.body.appendChild(c);
//   return base64String;
// }
//
// function toDataURL(url, callback) {
//   var xhr = new XMLHttpRequest();
//   xhr.onload = function() {
//     var reader = new FileReader();
//     reader.onloadend = function() {
//       callback(reader.result);
//     };
//     reader.readAsDataURL(xhr.response);
//   };
//   xhr.open('GET', url);
//   xhr.responseType = 'blob';
//   xhr.send();
// }

// toDataURL('https://www.gravatar.com/avatar/d50c83cc0c6523b4d3f6085295c953e0', function(dataUrl) {
//   console.log('RESULT:', dataUrl);
// });





var mousedown = false;
if (document.getElementById("trackSlider") !== null) {
  document.getElementById("trackSlider").addEventListener('mousedown', function(e) {
    mousedown = true;
    moveSlider(e);
  });
}
document.addEventListener('mouseup', function(e) {
  if (mousedown) {
    mousedown = false;
    audio.currentTime = currentTime;

    if (document.getElementById("play_pause").innerHTML == "play_arrow") {
      document.getElementById("play_pause").innerHTML = 'pause';
      audio.play();
    }
  }
});
document.addEventListener('mousemove', function(e) { if (mousedown) moveSlider(e); });



var currentTime = 0;
function moveSlider(e) {
  var slider = document.getElementById("trackSlider");
  var sliderLeft = slider.offsetLeft;
  var sliderWidth = slider.offsetWidth;
  var left = e.clientX - sliderLeft;
  var percentage = left / sliderWidth;
  if (left > 0 && left < sliderWidth) {
    updateTrackSlider((sliderWidth - left) + "px", left + 4 + "px");
  } else if (left < sliderWidth) {
    updateTrackSlider(sliderWidth - 1 + "px", "4px");
    percentage = 0;
  } else {
    updateTrackSlider("0px", sliderWidth + 4 + "px");
    percentage = 1;
  }
  currentTime = audio.duration * percentage;
  document.getElementById("trackTime").innerText = getTime(currentTime);
}

function updateTrackSlider(right, left) {
  var slider = document.getElementById("trackSlider");
  var sliderChild = slider.children[0];
  sliderChild.children[0].style.right = right;
  sliderChild.children[1].style.left = left;
}

function getTime(time) {
   var minutes = "0" + Math.floor(time / 60);
   var seconds = "0" + (Math.floor(time) - minutes * 60);
   var dur = minutes.substr(-1) + ":" + seconds.substr(-2);
   if (isNaN(time)) dur = "0:00";
   return dur;
}



// actions
if (document.getElementsByClassName("track_action")[0] !== undefined) {
  var query = document.querySelectorAll(".track_action");
  for (var i = 0; i < query.length; i++) {
    query[i].addEventListener('click', trackAction);
  }
}

var defaultSongs = null;
function trackAction() {
  var val = this.getElementsByClassName("material-icons")[0];
  switch (val.innerHTML) {
    case 'play_arrow':
      val.innerHTML = 'pause';
      audio.play();
      break;
    case 'pause':
      val.innerHTML = 'play_arrow';
      audio.pause();
      break;
    case 'skip_previous':
      if (audio.currentTime < 3) {
        checkRepeat('back');
      } else {
        audio.currentTime = 0;
      }
      break;
    case 'skip_next':
      checkRepeat();
      break;
    case 'repeat':
      if (!repeat) {
        repeat = true;
        audio.loop = false;
      } else {
        val.innerHTML = 'repeat_one';
        repeat = 'one';
        audio.loop = true;
      }
      val.style.color = "var(--primary-color)";
      break;
    case 'repeat_one':
      repeat = false;
      val.innerHTML = 'repeat';
      val.style.color = null;
      break;
    case 'shuffle':
      if (defaultSongs == null) {
        defaultSongs = JSON.stringify(songs);
        console.log(defaultSongs);
        val.style.color = "var(--primary-color)";
        songs = shuffle(songs);
      } else {
        songs = JSON.parse(defaultSongs);
        defaultSongs = null;
        val.style.color = null;
      }
      break;
    case 'volume_up':
      val.innerHTML = 'volume_off';
      audio.muted = true;
      break;
    case 'volume_off':
      val.innerHTML = 'volume_up';
      audio.muted = false;
      break;
    case 'fullscreen':
      toggleFullscreen();
      break;
    case 'fullscreen_exit':
      toggleFullscreen('exit');
      break;
    default:
      alert(val.innerHTML);
  }
}
// TODO: volume slider


// fullscreen
document.addEventListener('fullscreenchange', exitHandler, false);
function exitHandler() {
  var fullscreenElement = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement;
  if (fullscreenElement == null && fullscreen == true) {
    toggleFullscreen('exit');
  }
}

var fullscreen = false;
var scrollY = 0;
function toggleFullscreen(exit) {
  if (exit == 'exit' && fullscreen) {
    fullscreen = false;
    document.body.style.overflow = null;
    document.getElementById("trackPlayNav").style.removeProperty('background-color');
    document.getElementById("trackPlayNav").style.color = null;
    document.getElementById("trackPlayNav").style.backdropFilter = null;
    document.getElementById("fullscreenBtn").innerHTML = 'fullscreen';
    document.getElementById("trackTime").style.color = 'var(--primary-color)';
    document.exitFullscreen();
    setTimeout(function () {
      document.documentElement.style.scrollBehavior = 'unset';
      window.scrollTo(0, scrollY);
      document.documentElement.style.scrollBehavior = 'smooth';
    }, 50);
  } else {
    fullscreen = true;
    document.body.style.overflow = "hidden";
    document.getElementById("BIGcover").src = "./assets/music/covers/" + document.getElementById("trackName").innerHTML + ".jpg";
    document.getElementById("trackPlayNav").style.setProperty('background-color', 'rgba(255, 255, 255, 0.4)', 'important');
    document.getElementById("trackPlayNav").style.backdropFilter = 'blur(6px)';
    document.getElementById("trackPlayNav").style.color = "white";
    document.getElementById("fullscreenBtn").innerHTML = 'fullscreen_exit';
    document.getElementById("trackTime").style.color = 'white';
    scrollY = window.pageYOffset;
    setTimeout(function () {
      document.body.requestFullscreen();
    }, 10);
  }
  document.getElementById("trackCover").classList.toggle("hidden");
  document.getElementById("BIGcover").classList.toggle("hidden");
}


function pause() {
  var btn = document.getElementById("play_pause");
  if (btn.innerHTML =='play_arrow') {
    btn.innerHTML = 'pause';
    audio.play();
  } else {
    btn.innerHTML = 'play_arrow';
    audio.pause();
  }
}


// shortcuts
document.addEventListener('keydown', function(e) {
  console.log(document.activeElement.tagName);
  if (audio !== undefined && document.activeElement.tagName !== 'INPUT') {
    if (e.code == "Space" || e.key == 'k') {
      pause();
      e.preventDefault();
    } else if (e.key == 'Escape') {
      document.getElementById("trackPlayNav").classList.add("hidden");
      clearInterval(interval);
      audio.src = undefined;
      audio = undefined;
    } else if (e.key == "ArrowRight") {
      audio.currentTime = audio.currentTime + 5;
    } else if (e.key == "ArrowLeft") {
      audio.currentTime = audio.currentTime - 5;
    }else if (e.key == "l") {
      audio.currentTime = audio.currentTime + 10;
    } else if (e.key == "j") {
      audio.currentTime = audio.currentTime - 10;
    } else if (e.key == "m") {
      if (audio.muted) {
        audio.muted = false;
        document.getElementById("volumeBtn").innerHTML = "volume_up";
      } else {
        audio.muted = true;
        document.getElementById("volumeBtn").innerHTML = "volume_off";
      }
    } else if (e.key == 'f') {
      if (fullscreen) toggleFullscreen('exit');
      else toggleFullscreen();
    }
    // volume by arrows
  } else if (e.key == 'Escape') {
    document.activeElement.blur();
  }
});



function shuffle(a) {
  var j, x, i;
  for (i = a.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = a[i];
      a[i] = a[j];
      a[j] = x;
  }
  return a;
}

function getSongIndex() {
  var song = document.getElementById("trackName").innerHTML;
  for (var i = 0; i < songs.length; i++) {
    if (songs[i] == song || songs[i] == "old:" + song) {
      break;
    }
  }
  return i;
}



function checkRepeat(back) {
  var index = getSongIndex() + 1;
  if (back == 'back') {
    index = getSongIndex() - 1;
  }
  if (repeat === true) {
    if (index < 0) index = songs.length - 1;
    else if (index == songs.length) index = 0;
    playTrack(index);
  } else {
    if (index < songs.length && index >= 0) {
      playTrack(index);
    } else {
      document.getElementById("play_pause").innerHTML = 'play_arrow';
    }
  }
}


// TODO: TRACK ON ENDED SKIPPING....??????????
