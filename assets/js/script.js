
var projectLinks = document.getElementsByClassName("projectLink");
for (var i = 0; i < projectLinks.length; i++) {
  projectLinks[i].addEventListener('click', openProject, false);
}

function openProject() {
  window.location.href = "prosjekt.html";
  // TODO: create an iframe!!
  var href;
  if (this.classList.contains("folder")) {
    href = "prosjekt/" + this.innerText;
  } else {
    href = "prosjekt/" + this.innerText + ".html";
  }
  // setTimeout(function() {
    window.history.pushState(href, "test" + this.innerText, "./prosjekt.html?" + this.innerText);
    document.title = this.innerText;
  // }, 1000);
  // window.location.href = href;
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
