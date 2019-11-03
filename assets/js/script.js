
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
(function onLoad() {
  if (!window.location.href.includes("prosjekt") || window.location.href.includes("prosjekter")) {
    var container = document.getElementById("project_list");
    for (var i = 0; i < files.length; i += 2) {
      var name = files[i];
      var completeness = files[i + 1];
      var classList = "projectLink";
      if (name.includes("f:")) {
        name = name.slice(2, name.length);
        classList = "projectLink folder";
      }
      if (completeness < lessThan && !islessThan) {
        islessThan = true;
        // TODO: styles in css file!!
        container.innerHTML = container.innerHTML + '<div class="text-center"><button id="showLessThanBtn" class="btn btn-primary btn-link" onclick="showLessThan();">Vis flere prosjekter<!--<br>--> <em>(under ' + lessThan + '% fullført)</em><div class="ripple-container"></div></button></div>' +
        '<div id="hiddenList" class="hidden"></div>';
      } else if (completeness < lessThan) {
        container = document.getElementById("hiddenList");
        container.innerHTML = container.innerHTML + '<h5 class="description"><a href="javascript:void(0)" class="' + classList + '">' + name + '</a></h5>' +
        '<div class="progress progress-line-primary"><div class="progress-bar progress-bar-primary" role="progressbar" aria-valuenow="' + completeness + '" aria-valuemin="0" aria-valuemax="100" style="width: ' + completeness + '%;"><span class="sr-only">' + completeness + '% Complete</span></div></div>';
      } else {
        container.innerHTML = container.innerHTML + '<h5 class="description"><a href="javascript:void(0)" class="' + classList + '">' + name + '</a></h5>' +
        '<div class="progress progress-line-primary"><div class="progress-bar progress-bar-primary" role="progressbar" aria-valuenow="' + completeness + '" aria-valuemin="0" aria-valuemax="100" style="width: ' + completeness + '%;"><span class="sr-only">' + completeness + '% Complete</span></div></div>';
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


var projectLinks = document.getElementsByClassName("projectLink");
for (var i = 0; i < projectLinks.length; i++) {
  projectLinks[i].addEventListener('click', openProject, false);
}

function openProject() {
  // window.location.href = "prosjekt.html";
  // TODO: create an iframe!!
  var href;
  if (this.classList.contains("folder")) {
    href = "prosjekt/" + this.innerText;
    window.location.href = "prosjekt.html" + "#" + this.innerText.toLowerCase() + "+f";
  } else {
    href = "prosjekt/" + this.innerText + ".html";
    window.location.href = "prosjekt.html" + "#" + this.innerText.toLowerCase();
  }
  // setTimeout(function() {
    // window.history.pushState(href, "test" + this.innerText, "./prosjekt.html#" + this.innerText);
    // document.title = this.innerText;
  // }, 1000);
}


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




// prosjekt.html
(function onLoad() {
  var href = window.location.href;
  var hash = window.location.hash;
  if (href.includes("prosjekt") && href.includes("#")) {
    var pos = href.indexOf("#");
    var type;
    if (href.includes("+f")) {
      type = href.slice(pos + 1, href.length - 2);
      document.getElementById("iframe").src = "./prosjekter/" + type + "/index.html";
      document.getElementById("project_path").innerText = "src: /prosjekter/" + type + "/index.html"; // TODO: convert url chars (%20) to string
    } else {
      type = href.slice(pos + 1, href.length);
      document.getElementById("iframe").src = "./prosjekter/" + type + ".html";
      document.getElementById("project_path").innerText = "src: /prosjekter/" + type + ".html";
    }
    document.title = type;
  }
})();
