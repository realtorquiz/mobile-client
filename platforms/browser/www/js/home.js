// Initialize app
var myApp = new Framework7();


// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {

});

// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {
    console.log("Device is ready!");

   $$("#userName").text( localStorage.getItem('user'));
});


// Option 2. Using one 'pageInit' event handler for all pages:
$$(document).on('pageInit', function (e) {
  alert('home loaded');
 $$("#userName").text(document.cookie);
//  document.getElementById("#userName").innerHTML = localStorage.getItem('user');
})

$$('.exam-mode').on('click',function () {
  localStorage.setItem("examMode", true);
  window.open("./exam2.html","_self");
});

$$('.practice-mode').on('click',function () {
  localStorage.setItem("examMode", false);
  window.open("./exam2.html","_self");

});
