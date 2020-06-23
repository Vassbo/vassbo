var audio;
var repeat = true, interval;
function playTrack(index, card) {
  var song = Object.keys(songs)[index];
  if (card === true) song = index;
  if (song !== undefined) {
    if (fullscreen) {
      // TODO: Animate!
      document.getElementById("BIGcover").src = "./assets/covers/" + song + ".jpg";
    }
    document.getElementById("trackPlayNav").classList.remove("hidden");
    document.getElementById("trackCover").src = './assets/covers/' + song + '.jpg'; // -small
    document.getElementById("trackName").innerText = song;
    document.getElementById("play_pause").innerHTML = 'pause';
    updateTrackSlider("100%", "4px");

    loader('start');

    var cards = document.getElementById('images').querySelectorAll('.cover-column');
    if (document.getElementById('images').querySelector('.playing') !== null) {
      document.getElementById('images').querySelector('.playing').classList.remove('playing');
    }
    for (var i = 0; i < cards.length; i++) {
      var cardImg = cards[i].querySelector('img');
      if (cardImg.getAttribute('src') == './assets/covers/' + song + '.jpg') {
        cardImg.classList.add('playing');
        break;
      }
    }

    // check if it is wav or mp3
    var src = './assets/music/' + song + '.mp3';
    // var testAudio = new Audio(src);
    // var ok = false;
    // testAudio.addEventListener('canplaythrough', function() { ok = true; }, {once: true});
    // testAudio.onerror = function() {
    //   src = './assets/music/' + song + '.wav';
    //   ok = true;
    // };

    // var loadtrack = setInterval(function() {
    //   if (ok) {
    //     clearInterval(loadtrack);
    //     ready(src, song);
    //     // audio.addEventListener('canplaythrough', ready, {once: true});
    //   }
    // }, 20);

    ready(src, song);

    interval = setInterval(function () {
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
}



function ready(src, song) {
  if (audio == undefined) {
    audio = new Audio(src);
    audio.id = "audio";
    audio.removeEventListener('ended', ended);
    audio.addEventListener('ended', ended);
    audio.addEventListener('canplaythrough', loader);
  } else {
    audio.src = src;
  }
  audio.play();
  mediaSession(song);
}

function ended() {
  if (repeat == 'one') {
    audio.currentTime = 0;
    audio.play();
  } else {
    checkRepeat();
  }
}

var loading = false;
function loader(action) {
  if (action == 'start' && document.getElementById('loader') == null) {
    loading = true;
    document.getElementById('trackName').innerHTML += '<div id="loader" class="spinner-border" role="status" style="margin-left:10px;"><span class="sr-only">Loading...</span></div>';
  } else if (document.getElementById('loader') !== null) {
    loading = false;
    document.getElementById('loader').remove();
  }
}



function mediaSession(song) {
  // if (song == 'musicaly' || song == 'salmonia') album = 'GarageBand';
  if ('mediaSession' in navigator) {
    navigator.mediaSession.metadata = new MediaMetadata({
      title: song,
      artist: "Vizzber",
      album: getAlbum(song),
      // https://kristoffer.netlify.com/assets/covers/
      artwork: [{src: '/assets/covers/' + song + '.jpg', sizes: '192x192', type: 'image/jpg'}]
    });
    navigator.mediaSession.setActionHandler('play', pause);
    navigator.mediaSession.setActionHandler('pause', pause);
    navigator.mediaSession.setActionHandler('seekbackward', function() { audio.currentTime = audio.currentTime - 5; });
    navigator.mediaSession.setActionHandler('seekforward', function() { audio.currentTime = audio.currentTime + 5; });
    navigator.mediaSession.setActionHandler('previoustrack', function() { if (audio.currentTime < 3) { checkRepeat('back'); } else { audio.currentTime = 0; } });
    navigator.mediaSession.setActionHandler('nexttrack', checkRepeat);
  }
}

function getAlbum(song) {
  var album = '';
  for (var i = 0; i < Object.keys(songs).length; i++) {
    if (Object.keys(songs)[i] == song) album = songs[Object.keys(songs)[i]].album;
  }
  return album;
}



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
    if (!isNaN(currentTime)) {
      audio.currentTime = currentTime;
  
      if (document.getElementById("play_pause").innerHTML == "play_arrow") {
        document.getElementById("play_pause").innerHTML = 'pause';
        audio.play();
      }
    }
  }
});
document.addEventListener('mousemove', function(e) { if (mousedown) moveSlider(e); });



var currentTime = 0;
function moveSlider(e) {
  loader('start');
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
      if (!loading) {
        val.innerHTML = 'pause';
        audio.play();
      }
      break;
    case 'pause':
      if (!loading) {
        val.innerHTML = 'play_arrow';
        audio.pause();
      }
      break;
    case 'skip_previous':
      if (!loading) {
        if (audio.currentTime < 3) checkRepeat('back');
        else audio.currentTime = 0;
      }
      break;
    case 'skip_next':
      if (!loading) checkRepeat();
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
      audio.loop = false;
      val.innerHTML = 'repeat';
      val.style.color = null;
      break;
    case 'shuffle':
      if (defaultSongs == null) {
        defaultSongs = JSON.stringify(songs);
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
    toggleFullscreen('exit', true);
  }
}

var fullscreen = false;
var scrollY = 0;
function toggleFullscreen(exit, escape) {
  if (exit == 'exit' && fullscreen) {
    fullscreen = false;
    document.body.style.overflow = null;
    document.getElementById("trackPlayNav").style.removeProperty('background-color');
    document.getElementById("trackPlayNav").style.color = null;
    document.getElementById("trackPlayNav").style.backdropFilter = null;
    document.getElementById("fullscreenBtn").innerHTML = 'fullscreen';
    document.getElementById("trackTime").style.color = 'var(--primary-color)';
    if (escape !== true) document.exitFullscreen();
    setTimeout(function () {
      document.documentElement.style.scrollBehavior = 'unset';
      window.scrollTo(0, scrollY);
      document.documentElement.style.scrollBehavior = 'smooth';
    }, 50);
  } else {
    fullscreen = true;
    document.body.style.overflow = "hidden";
    var trackName = document.getElementById("trackName").innerHTML;
    if (trackName.includes('<div')) trackName = trackName.slice(0, trackName.indexOf('<div'));
    document.getElementById("BIGcover").src = "./assets/covers/" + trackName + ".jpg";
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
  if (audio !== undefined && document.activeElement.tagName !== 'INPUT' && pressed == false) {
    e.preventDefault();
    pressed = true;
    if (e.code == "Space" || e.key == 'k') {
      pause();
    } else if (e.key == 'Escape') {
      document.getElementById("trackPlayNav").classList.add("hidden");
      clearInterval(interval);
      // audio.src = undefined;
      audio.pause();
      audio = undefined;
      document.getElementById('images').querySelector('.playing').classList.remove('playing');
    } else if (e.key == "ArrowRight") {
      audio.currentTime = audio.currentTime + 5;
    } else if (e.key == "ArrowLeft") {
      audio.currentTime = audio.currentTime - 5;
    } else if (e.key == "l") {
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
var pressed = false;
document.addEventListener('keyup', function(e) {
  pressed = false;
});



function shuffle(a) {
  // var j, x, i;
  // for (i = a.length - 1; i > 0; i--) {
  //     j = Math.floor(Math.random() * (i + 1));
  //     x = a[i];
  //     a[i] = a[j];
  //     a[j] = x;
  // }

  var oldA = a;
  var newA = {};
  a = Object.keys(a).map((a) => ({sort: Math.random(), value: a})).sort((a, b) => a.sort - b.sort).map((a) => a.value);

  for (var i = 0; i < a.length; i++) {
    for (var j = 0; j < Object.keys(oldA).length; j++) {
      if (Object.keys(oldA)[j] == a[i]) newA[a[i]] = oldA[Object.keys(oldA)[j]];
    }
  }

  return newA;
}

function getSongIndex() {
  var song = document.getElementById("trackName").innerHTML;
  // var array = songs;
  // if (defaultPos === true && defaultSongs !== null) array = JSON.parse(defaultSongs);
  // console.log(array);
  for (var i = 0; i < Object.keys(songs).length; i++) {
    if (Object.keys(songs)[i] == song) {
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
  if (repeat === true || repeat == 'one') {
    if (index < 0) index = Object.keys(songs).length - 1;
    else if (index == Object.keys(songs).length) index = 0;
    playTrack(index);
  } else {
    if (index < Object.keys(songs).length && index >= 0) {
      playTrack(index);
    } else if (index >= Object.keys(songs).length) {
      // playTrack(index - 1);
      audio.currentTime = audio.duration;
      setTimeout(() => {
        document.getElementById("play_pause").innerHTML = 'play_arrow';
      }, 50);
      // audio.pause();
    }
  }
}
