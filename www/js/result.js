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
});


// Now we need to run the code that will be executed only for About page.

// Option 1. Using page callback for page (for "about" page in this case) (recommended way):
myApp.onPageInit('about', function (page) {
    // Do something here for "about" page

})

// Option 2. Using one 'pageInit' event handler for all pages:
$$(document).on('pageInit', function (e) {
    // Get page data from event data
    var page = e.detail.page;

    if (page.name === 'about') {
        // Following code will be executed for page with data-page attribute equal to "about"
        myApp.alert('Here comes About page');
    }
})


// Option 2. Using live 'pageInit' event handlers for each page
$$(document).on('pageInit', '.page[data-page="about"]', function (e) {
    // Following code will be executed for page with data-page attribute equal to "about"
    myApp.alert('Here comes About page');
})

$$("#loginbutton").click(function(){
  //alert("clicked login");
  //https://www.facebook.com/v2.8/dialog/oauth?client_id=680848835421990&redirect_uri="http://192.168.43.117:3000/home.html"
  //window.open('https://www.facebook.com/v2.8/dialog/oauth?client_id=680848835421990&redirect_uri=http://192.168.43.117:3000/home.html',"_self");

  FB.getLoginStatus(function(response) {
  if (response.status === 'connected') {
    console.log('Logged in.');
    //alert("Already logged in");
  }
  else {
    //alert("calling");
    FB.login();
  //  alert("called fb login");
  }
});
})
