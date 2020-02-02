function createCompany() {
  var value = document.getElementById("companyInput").value;
  if (value.length <= 3) {
    document.getElementsByClassName("error")[0].innerHTML = 'Too short';
    document.getElementsByClassName("error")[0].classList.remove("hidden");
  } else {
    localStorage.company = value;
    localStorage.money = 0;
    location.href = '../index.html';
  }
}


document.addEventListener("keypress", function(e) {
  if (e.key == 'Enter') {
    createCompany();
  }
});
