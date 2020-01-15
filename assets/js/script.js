
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
      var url = "prosjekt.html#" + name.toLowerCase();
      if (name.includes("f:")) {
        name = name.slice(2, name.length);
        url = "prosjekt.html#" + name.toLowerCase() + "+f";
      }
      var newDiv = '<h5 class="description"><a href="' + url + '">' + name + '</a></h5>' +
      '<div class="progress progress-line-primary"><div class="progress-bar progress-bar-primary" role="progressbar" aria-valuenow="' + completeness + '" aria-valuemin="0" aria-valuemax="100" style="width: ' + completeness + '%;"><span class="sr-only" style="display:none;">' + completeness + '% Complete</span></div></div>';
      if (completeness < lessThan && !islessThan) {
        islessThan = true;
        newDiv = '<div class="text-center"><button id="showLessThanBtn" class="btn btn-primary btn-link" onclick="showLessThan();">Vis flere prosjekter<!--<br>--> <em>(under ' + lessThan + '% fullført)</em><div class="ripple-container"></div></button></div>' +
        '<div id="hiddenList" class="hidden"></div>';
      } else if (completeness < lessThan) {
        container = document.getElementById("hiddenList");
      }
      container.innerHTML = container.innerHTML + newDiv;
    }

    // music grid
    var column = 0, row = 0;
    for (var j = 0; j < songs.length; j++) {
      var song = songs[j];
      if (song.includes("old:")) {
        song = song.slice(4, song.length);
      }
      var rowClassList = "col-sm-2 ml-auto cover-column";
      if (column == 0) {
        document.getElementById("images").innerHTML += '<div class="row cover-row" id="row' + row + '"></div>';
        rowClassList = "col-sm-2 cover-column";
      }
      var songs_container = document.getElementById("row" + row);
      var src = "./assets/music/covers/" + song + ".jpg";
      songs_container.innerHTML += '<div class="' + rowClassList + '"><img src="' + src + '" alt="Cover for ' + song + '" class="rounded img-fluid hoverZoomLink cover" onclick="playTrack(' + j + ')"><h4>' + song + '</h4></div>';
      if (column == 3) {
        column = 0;
        row++;
      } else {
        column++;
      }
    }
  }



  // prosjekt.html
  var href = window.location.href, hash = window.location.hash;
  if (href.includes("prosjekt") && href.includes("#")) {
    var type = hash.slice(1, hash.length);
    var ending = ".html";
    if (hash.includes("+f")) {
      type = type.slice(0, type.length - 2);
      ending = "/index.html";
    }
    document.getElementById("iframe").src = "./prosjekter/" + type + ending;
    document.getElementById("project_path").innerText = "src: /prosjekter/" + decodeURI(type) + ending;
    var originalName = 'Prosjekt';
    for (var k = 0; k < files.length; k++) {
      if (files[k].toLowerCase().includes(type)) {
        originalName = files[k];
        if (originalName.includes("f:")) originalName = originalName.slice(2, originalName.length);
        break;
      }
    }
    document.title = originalName;
  }

  // TODO: REMOVE IFRAME LOG??
})();



// show more projects button
function showLessThan() {
  document.getElementById("hiddenList").classList.toggle("hidden");
  document.getElementById("showLessThanBtn").classList.toggle("btn-link");
}


// fullscreen
if (document.getElementById("fsBtn") !== null) {
  document.getElementById("fsBtn").addEventListener('click', function() {
    document.getElementById("iframe").requestFullscreen();
  });
}
