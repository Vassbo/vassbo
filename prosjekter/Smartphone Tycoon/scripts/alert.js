// var currentCallback;
// var active = false;

// override default browser alert
window.alert = function(msg, callback){
  document.getElementsByClassName('message')[0].innerHTML = msg;
  document.getElementsByClassName('customAlertBox')[0].style.animation = 'fadeIn 0.6s cubic-bezier(0.680, -0.550, 0.265, 1.550) both'; // scale-up-center 0.4s cubic-bezier(0.680, -0.550, 0.265, 1.550) both;
  document.getElementsByClassName('customAlert')[0].style.animation = 'fadeIn2 0.4s';
  document.getElementsByClassName('customAlert')[0].style.display = 'inline';

  // active = true;
  // setTimeout(function(){
  //   // document.getElementsByClassName('customAlert')[0].style.animation = 'none';
  //   document.getElementsByClassName('customAlertBox')[0].style.animation = 'none';
  // }, 300);

  // setTimeout(function(){
  //   if (event.keyCode === 13) { // Number 13 is the "Enter" key on the keyboard
  //   alert(1);
  //     hideAlert();
  //   }
  // }, 300);



  if (msg == "Please input a name!" && currentPage == "factory") {
    hideAlert();
  }
  // currentCallback = callback;
};

// document.getElementsByClassName(function(){

  // add listener for when our confirmation button is clicked
	document.getElementsByClassName('confirmButton')[0].addEventListener("click", hideAlert);
  document.getElementsByClassName('overlay')[0].addEventListener("click", hideAlert);

  function hideAlert() {
    // acitve = false;
    document.getElementsByClassName('customAlert')[0].style.animation = 'fadeOut 0.5s linear';
    document.getElementsByClassName('customAlertBox')[0].style.animation = 'fadeOut 0.5s linear';
    setTimeout(function() {
      document.getElementsByClassName('customAlertBox')[0].style.animation = 'none';
  		document.getElementsByClassName('customAlert')[0].style.display = 'none';
    }, 400);
    // currentCallback();
  }


  // var listener = addEventListener("keyup", function(event) {
  //   // Number 13 is the "Enter" key on the keyboard
  //   if (event.keyCode === 13 && active == true) {
  //       hideAlert();
  //   }
  // });

  // document.getElementById('name-submit').click(function(){
  //   alert("If you think about anything, you are actually doing a recursive function which resolves your neurons into a deep pi calculation. You are then executing about 4294 threads in your brain, which do a parallel computation.", function(){
  //     console.log("Callback executed");
  //   });
  // });

  // our custom alert box
  // setTimeout(function(){
  //   alert('You are probably reading this alert box and have no clue why the heck you are even reading it, well guess what, the moon in reality is nothing else than a big ass pokemon, floating in space.', function(){
  //       console.log("Callback executed");
  //     });
  // }, 500);
// });
