// Initialize app
var myApp = new Framework7();


// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {

});
var user;
// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {
    console.log("Device is ready!");
   $$("#userName").text( localStorage.getItem('user'));
    var correctAnswers =localStorage.getItem("correctAnswers");
    var wrongAnswers =localStorage.getItem("wrongAnswers");
    var totalQuestions = Math.ceil(+correctAnswers + +wrongAnswers);
    var marks = correctAnswers + "/" + totalQuestions;
    var percentage = Math.floor((+correctAnswers/+totalQuestions)*100);
    console.log("correctAnswers ::: "+correctAnswers)
    console.log("wrongAnswers ::: "+wrongAnswers)
    $$('#correctAnswers').text(""+correctAnswers);
    $$('#wrongAnswers').text(""+wrongAnswers);
    $$('#totalQuestions').text(""+totalQuestions);
    $$('#totalMarks').text(""+marks);
    $$('#percentage').text(""+percentage+"%");

});

// Option 2. Using one 'pageInit' event handler for all pages:
$$(document).on('pageInit', function (e) {

})

$$('.go-to-home').on('click',function() {
      window.open("./home.html","_self");
});
