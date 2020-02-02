
var files = {
  'Colors': { 'completeness': '100', 'folder': false,
    'description': 'Found on SoloLearn...'
  },
  'GjettHvem': { 'completeness': '100', 'folder': true,
    'description': ''
  },
  'Problem&Løsning': { 'completeness': '100', 'folder': true,
    'description': ''
  },
  'TimeIsMoney': { 'completeness': '100', 'folder': false,
    'description': 'Bruk: 10:00-13:00, 15:00-15:30<br>110kr i timen'
  },
  'Fyrverkeri': { 'completeness': '100', 'folder': true,
    'description': 'Skuleprosjekt...'
  },
  'UUID': { 'completeness': '95', 'folder': true,
    'description': ''
  },
  'Login&Register': { 'completeness': '95', 'folder': true,
    'description': ''
  },
  'Email': { 'completeness': '95', 'folder': true,
    'description': ''
  },
  'Photor': { 'completeness': '90', 'folder': true,
    'description': ''
  },
  'NotPad': { 'completeness': '90', 'folder': true,
    'description': ''
  },
  'AddictClicker': { 'completeness': '80', 'folder': true,
    'description': ''
  },
  'Elevator': { 'completeness': '80', 'folder': true,
    'description': ''
  },
  'Jul': { 'completeness': '80', 'folder': false,
    'description': ''
  },
  'Bursdag': { 'completeness': '80', 'folder': false,
    'description': ''
  },
  'Logic Simulation': { 'completeness': '70', 'folder': true,
    'description': ''
  },
  'Snake': { 'completeness': '70', 'folder': false,
    'description': ''
  },
  'Smartphone Tycoon': { 'completeness': '50', 'folder': true,
    'description': ''
  },
  'Maze': { 'completeness': '50', 'folder': true,
    'description': ''
  },
  'Rain': { 'completeness': '40', 'folder': true,
    'description': ''
  },
  'Styles': { 'completeness': '30', 'folder': false,
    'description': ''
  },
  'YouTuber Simulator': { 'completeness': '20', 'folder': true,
    'description': ''
  },
  // 'Gåte': { 'completeness': '10',/   'folder': true,
  //   'description': ''
  // },
  'Paint': { 'completeness': '2', 'folder': true,
    'description': ''
  }
};
var lessThan = 50;
var islessThan = false;


var songs = {
  'Breeze': { 'album': 'Dreams', 'uploaded': '26/12/19', 'duration': '3:25' },
  'Valley': { 'album': 'Dreams', 'uploaded': '16/10/19', 'duration': '3:03' },
  'United': { 'album': 'Dreams', 'uploaded': '18/08/19', 'duration': '3:52' },
  'Hopes': { 'album': 'Dreams', 'uploaded': '30/06/19', 'duration': '3:50' },
  'A New Start': { 'album': 'Dreams', 'uploaded': '19/05/19', 'duration': '2:42' },
  'A Better Time': { 'album': 'Dreams', 'uploaded': '19/05/19', 'duration': '3:46' },
  'Chained': { 'album': 'Dreams', 'uploaded': '19/05/19', 'duration': '3:41' },
  'A Knights Battle': { 'album': 'Dreams', 'uploaded': '28/04/19', 'duration': '3:05' },
  'Space Station': { 'album': 'Dreams', 'uploaded': '28/04/19', 'duration': '2:01' },
  'Mistakes': { 'album': 'Dreams', 'uploaded': '05/04/19', 'duration': '3:59' },
  'Orchestria (Emotional)': { 'album': 'Dreams', 'uploaded': '28/02/19', 'duration': '3:06' },
  'Galaxies': { 'album': 'Dreams', 'uploaded': '27/02/19', 'duration': '4:02' },
  'Twins': { 'album': 'Dreams', 'uploaded': '27/02/19', 'duration': '3:12' },
  'Space': { 'album': 'Dreams', 'uploaded': '03/02/19', 'duration': '2:42' },
  'Moving': { 'album': 'Dreams', 'uploaded': '12/01/19', 'duration': '3:28' },
  'K-391 - Mystery (Vizzber Remix)': { 'album': 'Dreams', 'uploaded': '21/12/18', 'duration': '3:51' },
  'Move (Instrumental)': { 'album': 'Dreams', 'uploaded': '02/12/18', 'duration': '3:43' },
  'Move': { 'album': 'Dreams', 'uploaded': '01/12/18', 'duration': '3:43' },
  'Fall': { 'album': 'Dreams', 'uploaded': '26/11/18', 'duration': '2:12' },
  'City': { 'album': 'Dreams', 'uploaded': '11/11/18', 'duration': '2:26' },
  'In The Dark': { 'album': 'Dreams', 'uploaded': '13/10/18', 'duration': '2:13' },
  'Back home': { 'album': 'Dreams', 'uploaded': '13/10/18', 'duration': '1:41' },
  'Good Memories (Emotional)': { 'album': 'Dreams', 'uploaded': '12/10/18', 'duration': '2:09' },
  'Rising (feat. Flåklypa)': { 'album': 'Dreams', 'uploaded': '12/10/18', 'duration': '2:29' },
  'Gravity': { 'album': 'Dreams', 'uploaded': '11/10/18', 'duration': '1:36' },
  'Dreams': { 'album': 'Dreams', 'uploaded': '10/10/18', 'duration': '3:22' },
  'Atmosphere': { 'album': 'Dreams', 'uploaded': '09/10/18', 'duration': '3:03' },

  'Live': { 'album': 'Old Songs', 'uploaded': '17/06/18', 'duration': '1:00' },
  'Hope': { 'album': 'Old Songs', 'uploaded': '17/06/18', 'duration': '1:23' },
  'Happy': { 'album': 'Old Songs', 'uploaded': '17/06/18', 'duration': '0:57' },
  'Sad': { 'album': 'Old Songs', 'uploaded': '17/06/18', 'duration': '1:11' },
  'Emotional': { 'album': 'Old Songs', 'uploaded': '16/06/18', 'duration': '2:15' }

  // 'musicaly..': { 'album': 'GarageBand', 'uploaded': 'Never (13/09/17.....)', 'duration': 'X:XX' }
  // 'salmonia..': { 'album': 'GarageBand', 'uploaded': 'Never', 'duration': 'X:XX' }
};


(function onLoad() {
  if (!window.location.href.includes("prosjekt") || window.location.href.includes("prosjekter")) {
    // project list
    var container = document.getElementById("project_list");
    for (var i = 0; i < Object.keys(files).length; i++) {
      var name = Object.keys(files)[i];
      var completeness = files[name].completeness;
      var url = "prosjekt.html#" + name.toLowerCase();
      if (files[name].folder) {
        // name = name.slice(2, name.length);
        url = "prosjekt.html#" + name.toLowerCase() + "+f";
      }
      var newDiv = '<h5 class="description"><a href="' + url + '">' + name + '</a></h5>' +
      '<div class="progress progress-line-primary"><div class="progress-bar progress-bar-primary" role="progressbar" aria-valuenow="' + completeness + '" aria-valuemin="0" aria-valuemax="100" style="width: ' + completeness + '%;"><span class="sr-only">' + completeness + '% Complete</span></div></div>';
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
    for (var j = 0; j < Object.keys(songs).length; j++) {
      var song = Object.keys(songs)[j];
      var newName = song;
      if (song.indexOf(' (') !== -1 && !song.includes('Instrumental')) newName = song.slice(0, song.indexOf(' ('));
      var uploaded = songs[Object.keys(songs)[j]].uploaded;
      var duration = songs[Object.keys(songs)[j]].duration;
      var rowClassList = "col-sm-2 ml-auto cover-column";
      if (column == 0) {
        document.getElementById("images").innerHTML += '<div class="row cover-row" id="row' + row + '"></div>';
        rowClassList = "col-sm-2 cover-column";
      }
      var songs_container = document.getElementById("row" + row);
      var src = "./assets/covers/" + song + ".jpg";
      songs_container.innerHTML += '<div class="' + rowClassList + '"><img src="' + src + '" alt="Cover for ' + newName + '" class="rounded img-fluid hoverZoomLink cover" onclick="playTrack(\'' + song + '\', true);">' +
      // '<h4 style="display:inline-block">' + newName + '</h4><span style="float:right;font-size:12px;margin:10px 0;">' + uploaded + '</span></div>';
      // '<h4 style="display:inline-block">' + newName + '</h4><span style="float:right;font-size:12px;margin: -28px 4px 10px 0;font-weight: bold;position: relative;color: white;background: rgba(0, 0, 0, 0.22);border-radius: 4px;padding: 0 6px;">' + uploaded + '</span></div>';
      '<h4 style="display:inline-block">' + newName + '</h4><span style="font-size:12px;margin: -28px 4px 10px 0;font-weight: bold;position: absolute;right: 0;color: white;background: rgba(0, 0, 0, 0.2);border-radius: 4px;padding: 0 6px;">' + duration + ' | ' + uploaded + '</span></div>';
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
    for (var k = 0; k < Object.keys(files).length; k++) {
      if (Object.keys(files)[k].toLowerCase().includes(type)) {
        originalName = Object.keys(files)[k];
        document.getElementById("description").innerHTML = files[originalName].description;
        // if (files[originalName].folder) originalName = originalName.slice(2, originalName.length);
        break;
      }
    }
    document.title = originalName;
  }
  // TODO: REMOVE IFRAME LOG??

  // fullscreen
  if (document.getElementById("fsBtn") !== null) {
    document.getElementById("fsBtn").addEventListener('click', function() {
      document.getElementById("iframe").requestFullscreen();
    });
  }
})();



// show more projects button
function showLessThan() {
  document.getElementById("hiddenList").classList.toggle("hidden");
  document.getElementById("showLessThanBtn").classList.toggle("btn-link");
}
