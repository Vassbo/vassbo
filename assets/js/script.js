
var files = [
  'Colors', '100',
  'TimeIsMoney', '100',
  'f:Fyrverkeri', '100',
  'f:UUID', '95',
  'f:Login&Register', '95',
  'f:Email', '95',
  'f:Photor', '90',
  'f:NotPad', '90',
  'f:AddictClicker', '80',
  'Jul', '80',
  'Bursdag', '80',
  'Snake', '70',
  'f:Maze', '50',
  'f:Rain', '40',
  'Styles', '30',
  'f:YouTuber Simulator', '20',
  'f:Elevator', '15',
  // 'f:Gåte', '10',
  'Dragging', '10',
  'f:Paint', '2'
];
var lessThan = 50;
var islessThan = false;


var songs = [
  'Breeze',
  'Valley',
  'United',
  'Hopes',
  'A New Start',
  'A Better Time',
  'Chained',
  'A Knights Battle',
  'Space Station',
  'Mistakes',
  'Orchestria (Emotional)',
  'Galaxies',
  'Twins',
  'Space',
  'Moving',
  'K-391 - Mystery (Vizzber Remix)',
  'Move (Instrumental)',
  'Move',
  'Fall',
  'City',
  'In The Dark',
  'Back home',
  'Good Memories (Emotional)',
  'Rising (feat. Flåklypa)',
  'Gravity',
  'Dreams',
  'Atmosphere',
  'old:Live',
  'old:Hope',
  'old:Happy',
  'old:Sad',
  'old:Emotional'
];


(function onLoad() {
  if (!window.location.href.includes("prosjekt") || window.location.href.includes("prosjekter")) {
    // project list
    var container = document.getElementById("project_list");
    for (var i = 0; i < files.length; i += 2) {
      var name = files[i];
      var completeness = files[i + 1];
      // var classList = "projectLink";
      var href = "prosjekt.html#" + name.toLowerCase();
      if (name.includes("f:")) {
        name = name.slice(2, name.length);
        // classList = "projectLink folder";
        href = "prosjekt.html#" + name.toLowerCase() + "+f";
      }
      var newDiv = '<h5 class="description"><a href="' + href + '">' + name + '</a></h5>' +
      '<div class="progress progress-line-primary"><div class="progress-bar progress-bar-primary" role="progressbar" aria-valuenow="' + completeness + '" aria-valuemin="0" aria-valuemax="100" style="width: ' + completeness + '%;"><span class="sr-only">' + completeness + '% Complete</span></div></div>';
      if (completeness < lessThan && !islessThan) {
        islessThan = true;
        // TODO: styles in css file!!
        container.innerHTML = container.innerHTML + '<div class="text-center"><button id="showLessThanBtn" class="btn btn-primary btn-link" onclick="showLessThan();">Vis flere prosjekter<!--<br>--> <em>(under ' + lessThan + '% fullført)</em><div class="ripple-container"></div></button></div>' +
        '<div id="hiddenList" class="hidden"></div>';
      } else if (completeness < lessThan) {
        container = document.getElementById("hiddenList");
        container.innerHTML = container.innerHTML + newDiv;
      } else {
        container.innerHTML = container.innerHTML + newDiv;
      }
    }

    // music grid (32 songs)
    var counter = 0;
    var row = 0;
    for (var j = 0; j < songs.length; j++) {
      var song = songs[j];
      // console.log(song);
      if (counter == 0) {
        document.getElementById("images").innerHTML = document.getElementById("images").innerHTML + '<div class="row cover-row" id="row' + row + '"></div>';
      }
      // console.log(songs_container);
      if (song.includes("old:")) {
        song = song.slice(4, song.length);
      }
      var songs_container = document.getElementById("row" + row);
      var rowClassList = "col-sm-2 ml-auto cover-column";
      if (counter == 0) {
        rowClassList = "col-sm-2 cover-column";
      }
      var src = "./assets/music/covers/" + song + ".jpg";
      // var img = new Image();
      // img.onload = function() { console.log('Success'); };
      // img.onerror = function() { src = "./assets/img/faces/avatar.jpg"; };
      // img.src = src;
      // if (src == undefined) {
      //   src = "./assets/img/faces/avatar.jpg";
      //   console.log(1);
      // }
      songs_container.innerHTML = songs_container.innerHTML + '<div class="' + rowClassList + '">' +
      '<img src="' + src + '" alt="Cover for ' + song + '" class="rounded img-fluid hoverZoomLink cover" onclick="playTrack(this)">' +
      '<h4>' + song + '</h4>' +
      '</div>';
      if (counter == 3) {
        counter = 0;
        row++;
      } else {
        counter++;
      }
    }
  }
})();

function showLessThan() {
  document.getElementById("hiddenList").classList.toggle("hidden");
  document.getElementById("showLessThanBtn").classList.toggle("btn-link");
}

function updateSrc(src) { // iframe: onLoad="updateSrc(this.contentWindow.location);"
  // console.log(src);
  // console.log(document.getElementById("iframe").src);
  // document.getElementById("project_path").innerText = src;
}

// fullscreen
if (document.getElementById("fsBtn") !== null) {
  document.getElementById("fsBtn").addEventListener('click', function() {
    document.getElementById("iframe").requestFullscreen();
  });
}


// var projectLinks = document.getElementsByClassName("projectLink");
// for (var i = 0; i < projectLinks.length; i++) {
//   projectLinks[i].addEventListener('click', openProject, false);
// }
//
// function openProject() {
//   // window.location.href = "prosjekt.html";
//   // TODO: create an iframe!!
//   var href;
//   if (this.classList.contains("folder")) {
//     href = "prosjekt/" + this.innerText;
//     window.location.href = "prosjekt.html" + "#" + this.innerText.toLowerCase() + "+f";
//   } else {
//     href = "prosjekt/" + this.innerText + ".html";
//     window.location.href = "prosjekt.html" + "#" + this.innerText.toLowerCase();
//   }
//   // setTimeout(function() {
//     // window.history.pushState(href, "test" + this.innerText, "./prosjekt.html#" + this.innerText);
//     // document.title = this.innerText;
//   // }, 1000);
// }


// function processAjaxData(response, urlPath) {
//     document.getElementById("content").innerHTML = response.html;
//     document.title = response.pageTitle;
//     window.history.pushState({"html":response.html,"pageTitle":response.pageTitle},"", urlPath);
// }
// window.onpopstate = function(e){
//     if(e.state){
//         document.getElementById("content").innerHTML = e.state.html;
//         document.title = e.state.pageTitle;
//     }
// };


// MUSIC:

// TODO: Add Old Garage Band Tracks
// TODO: Add Album Titles..
// TODO: Add Duration/Uploaded time to Display

function playTrack(elem) {
  console.log(elem);
  var track = elem.closest(".cover-column").children[1].innerHTML;
  for (var i = 0; i < songs.length; i++) {
    if (songs[i] == track || songs[i] == "old:" + track) {
      break;
    }
  }
  playSong(i);
}

function closeAudio() {
  document.getElementById("trackPlayNav").classList.add("hidden");
  clearInterval(interval);
  audio.src = undefined;
  audio = undefined;
}

var audio;
function playSong(index) {
  // console.log(audio);
  var song = songs[index];
  if (song.includes("old:")) {
    song = song.slice(4, song.length);
  }
  console.log(song);
  if (fullscreen) {
    // TODO: Animate?
    document.getElementById("BIGcover").src = "./assets/music/covers/" + song + ".jpg";
  }
  var src = './assets/music/' + song + '.wav';
  new Audio(src).onerror = function() { src = './assets/music/' + song + '.mp3'; };
  console.log(new Audio(src).onerror);
  setTimeout(function () {
    if (audio !== undefined) {
      audio.src = src;
    } else {
      audio = new Audio(src);
      audio.id = "audio";
    }
    // audio.currentTime = 0;
    audio.play();
    // skipped = false;
    audio.addEventListener('ended', audioEnded);
    mediaSession(song);
  }, 80);
  updateBar(song);
}


// TODO: MediaImage src can only be of http/https/data/blob scheme
// TODO: image to data js...
// TODO: imageData.js.....
function mediaSession(song) {
  // var imageData = "./assets/music/covers/" + song + ".jpg";
  // var imageData = toData("./assets/music/covers/" + song + ".jpg");
  // var img = document.createElement('img');
  // img.src = "./assets/music/covers/" + song + ".jpg";
  // img.setAttribute('crossorigin', 'anonymous');
  // document.body.appendChild(img);
  // setTimeout(function () {
  //   var imageData = toData(img);
  // img.remove();
  // console.log(imageData);
  if ('mediaSession' in navigator) {
    navigator.mediaSession.metadata = new MediaMetadata({
      title: song,
      artist: "Vizzber",
      // album: "Vizzber",
      // album: "Old Songs",
      // album: "GarageBand",
      artwork: [{src: imageData}] // TODO: <--------
    });
    // console.log("./assets/music/covers/" + song + ".jpg");
    navigator.mediaSession.setActionHandler('play', pause);
    navigator.mediaSession.setActionHandler('pause', pause);
    navigator.mediaSession.setActionHandler('seekbackward', function() { audio.currentTime = audio.currentTime - 5; });
    navigator.mediaSession.setActionHandler('seekforward', function() { audio.currentTime = audio.currentTime + 5; });
    navigator.mediaSession.setActionHandler('previoustrack', function() { if (audio.currentTime < 3) { checkRepeat('back'); } else { audio.currentTime = 0; } });
    navigator.mediaSession.setActionHandler('nexttrack', function() { checkRepeat(); });
  }
  // }, 50);
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



function audioEnded() {
  if (repeat == 'one') {
    audio.currentTime = 0;
    audio.play();
  } else {
    // skipped = true;
    checkRepeat();
  }
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
    audio.currentTime = currentTime;
    mousedown = false;

    if (document.getElementById("play_pause").innerHTML == "play_arrow") {
      document.getElementById("play_pause").innerHTML = 'pause';
      audio.play();
    }
  }
});
document.addEventListener('mousemove', function(e) {
  if (mousedown) {
    moveSlider(e);
  }
});
function updateBar(song, duration) {
  document.getElementById("trackPlayNav").classList.remove("hidden");
  document.getElementById("trackCover").src = './assets/music/covers/' + song + '.jpg';
  document.getElementById("trackName").innerText = song;
  document.getElementById("play_pause").innerHTML = 'pause';
  if (audio == undefined) startInterval();
  updateTrackSlider("100%", "4px");
}

var repeat = true;
// var skipped = false;
var interval;
function startInterval() {
  var interval = setInterval(function () {
    if (audio !== undefined) {
      if (document.getElementById("trackDuration").innerText !== getTime(audio.duration)) {
        document.getElementById("trackDuration").innerText = getTime(audio.duration);
      }
      if (mousedown == false) {
        document.getElementById("trackTime").innerText = getTime(audio.currentTime);
        var sliderWidth = document.getElementById("trackSlider").offsetWidth;
        var percentage = audio.currentTime / audio.duration;
        updateTrackSlider(sliderWidth - sliderWidth * percentage + "px", sliderWidth * percentage + 4 + "px");
      }
      // if (audio.duration == audio.currentTime && !skipped) {
      //   // check repeat, and shuffle
      //   // repeat
      //   if (repeat == 'one') {
      //     audio.currentTime = 0;
      //     audio.play();
      //   } else {
      //     skipped = true;
      //     checkRepeat();
      //   }
      // }
    }
  }, 50);
}



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
  console.log(currentTime);
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
      } else {
        val.innerHTML = 'repeat_one';
        repeat = 'one';
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


// Fullscreen
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
    document.getElementById("trackCover").classList.toggle("hidden");
    document.getElementById("fullscreenBtn").innerHTML = 'fullscreen';
    document.getElementById("trackTime").style.color = 'var(--primary-color)';
    document.exitFullscreen();
    setTimeout(function () {
      document.documentElement.style.scrollBehavior = 'unset';
      window.scrollTo(0, scrollY);
      document.documentElement.style.scrollBehavior = 'smooth';
    }, 30);
  } else {
    fullscreen = true;
    document.body.style.overflow = "hidden";
    var song = document.getElementById("trackName").innerHTML;
    document.getElementById("BIGcover").src = "./assets/music/covers/" + song + ".jpg";
    document.getElementById("trackPlayNav").style.setProperty('background-color', 'rgba(255, 255, 255, 0.4)', 'important');
    document.getElementById("trackPlayNav").style.backdropFilter = 'blur(6px)';
    document.getElementById("trackPlayNav").style.color = "white";
    document.getElementById("trackCover").classList.toggle("hidden");
    document.getElementById("fullscreenBtn").innerHTML = 'fullscreen_exit';
    document.getElementById("trackTime").style.color = 'white';
    scrollY = window.pageYOffset;
    console.log(scrollY);
    setTimeout(function () {
      document.body.requestFullscreen();
    }, 100);
  }
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

document.addEventListener('keydown', function(e) {
  console.log(document.activeElement.tagName);
  if (audio !== undefined && document.activeElement.tagName !== 'INPUT') {
    if (e.code == "Space" || e.key == 'k') {
      pause();
      e.preventDefault();
    } else if (e.key == 'Escape') {
      closeAudio();
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

// TODO: volume slider

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
    playSong(index);
  } else {
    if (index < songs.length && index >= 0) {
      playSong(index);
    } else {
      document.getElementById("play_pause").innerHTML = 'play_arrow';
    }
  }
}

// TODO: make an audio player

// myaudio.play(); - This will play the music.
// myaudio.pause(); - This will stop the music.
// myaudio.duration; - Returns the length of the music track.
// myaudio.currentTime = 0; - This will rewind the audio to the beginning.
// myaudio.loop = true; - This will make the audio track loop.
// myaudio.muted = true; - This will mute the track.
// myaudio.volume = 0.2; - This will set a custom volume.

// If you want a function to be called once the audio has finished playing then you can use 'myaudio.addEventListener('ended',myfunc)' - This will call 'myfunc()' once the audio has finished.




// prosjekt.html
(function onLoad() {
  var href = window.location.href;
  // var hash = window.location.hash;
  if (href.includes("prosjekt") && href.includes("#")) {
    var pos = href.indexOf("#");
    var type = href.slice(pos + 1, href.length);
    var ending = ".html";
    if (href.includes("+f")) {
      type = href.slice(pos + 1, href.length - 2);
      ending = "/index.html";
    }
    document.getElementById("iframe").src = "./prosjekter/" + type + ending;
    document.getElementById("project_path").innerText = "src: /prosjekter/" + decodeURI(type) + ending;
    document.title = type;
  }
})();

// TODO: REMOVE IFRAME LOG
