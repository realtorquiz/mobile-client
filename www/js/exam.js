// Initialize app
var myApp = new Framework7();


// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {

});

var quiz;
var questions;
var currentQuestionIndex = 0;
var currentQuestion;
var optionSelected = false;
var answerSelected = "";
var correctAnswers = 0;
var wrongAnswers = 0;
var examMode = false;
// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {
  console.log("Device is ready!");
  examMode = localStorage.getItem("examMode");
  console.log("Exam mode "+examMode);
  if(examMode=="true"){
    $$("#exam-mode").text("Exam");
    $$('.showanswer').text("");
    startTimer();
  } else {
    $$("#exam-mode").text("Practice");
    $$('.showanswer').text("Show Answer");

  }
  quiz = new Quiz();
  quiz.createQuiz();
  questions = quiz.getQuestions();
  console.log("Questions :: "+JSON.stringify(questions));
  currentQuestion = questions[currentQuestionIndex];
  loadQuestion(currentQuestion);

});


// Option 2. Using one 'pageInit' event handler for all pages:
$$(document).on('pageInit', function (e) {

  //  document.getElementById("#userName").innerHTML = localStorage.getItem('user');
})

function loadQuestion(question) {
  var option1 = document.querySelector('#option1');
  var option2 = document.querySelector('#option2');
  var option3 = document.querySelector('#option3');
  var option4 = document.querySelector('#option4');
  addGrayColor(option1);
  addGrayColor(option2);
  addGrayColor(option3);
  addGrayColor(option4);
  if(currentQuestionIndex==0) {
    $$('.prev').text("");
  } else {
    $$('.prev').text("Previous");
  }
  console.log("=================");
  console.log("currentQuestionIndex ::: "+currentQuestionIndex);
  if(currentQuestionIndex==questions.length-1) {
    $$('.next').text("Submit");
  } else {
    $$('.next').text("Next");
  }
  $$("#question").text(question.question);
  $$("#option1").text(question.option1);
  $$("#option2").text(question.option2);
  $$("#option3").text(question.option3);
  $$("#option4").text(question.option4);
  console.log("quiz.answerOption["+currentQuestionIndex+"] ::: "+quiz.answerOption[currentQuestionIndex])
  if(quiz.answerOption[currentQuestionIndex]) {
    if(quiz.answerOption[currentQuestionIndex]==1) {
      addGreenColor(option1);
      answerSelected = question.option1;
    } else if(quiz.answerOption[currentQuestionIndex]==2) {
      addGreenColor(option2);
      answerSelected = question.option2;
    } else if(quiz.answerOption[currentQuestionIndex]==3) {
      addGreenColor(option3);
      answerSelected = question.option3;
    } else if(quiz.answerOption[currentQuestionIndex] == 4) {
      addGreenColor(option4);
      answerSelected = question.option4;
    }


  }
}


$$('.showanswer').on('click',function() {
  console.log("Show Answer");
  var currentAnswer = currentQuestion.answer;
  console.log("currentAnswer ="+currentAnswer);
  if(currentAnswer==currentQuestion.option1) {
    console.log("option1 is the currentAnswer");
    $$( "#option1" ).trigger( "click" );
  } else if(currentAnswer==currentQuestion.option2) {
      $$( "#option2" ).trigger( "click" );
  }else if(currentAnswer==currentQuestion.option3) {
      $$( "#option3" ).trigger( "click" );
  }else if(currentAnswer==currentQuestion.option4) {
      $$( "#option4" ).trigger( "click" );
  }
});

$$('#option1').on('click', function () {
  console.log("Selected option 1");
  addGreenColor(this);
  var option2 = document.querySelector('#option2');
  var option3 = document.querySelector('#option3');
  var option4 = document.querySelector('#option4');
  addGrayColor(option2);
  addGrayColor(option3);
  addGrayColor(option4);
  optionSelected = true;
  answerSelected = currentQuestion.option1;
  quiz.answerOption[currentQuestionIndex] = 1;

});
$$('#option2').on('click', function () {
  addGreenColor(this);
  var option1 = document.querySelector('#option1');
  var option3 = document.querySelector('#option3');
  var option4 = document.querySelector('#option4');
  addGrayColor(option1);
  addGrayColor(option3);
  addGrayColor(option4);
  optionSelected = true;
  answerSelected = currentQuestion.option2;
  quiz.answerOption[currentQuestionIndex] = 2;

});
$$('#option3').on('click', function () {
  addGreenColor(this);
  var option1 = document.querySelector('#option1');
  var option2 = document.querySelector('#option2');
  var option4 = document.querySelector('#option4');
  addGrayColor(option1);
  addGrayColor(option2);
  addGrayColor(option4);
  optionSelected = true;
  answerSelected = currentQuestion.option3;
  quiz.answerOption[currentQuestionIndex] = 3;

});
$$('#option4').on('click', function () {
  addGreenColor(this);
  var option1 = document.querySelector('#option1');
  var option2 = document.querySelector('#option2');
  var option3 = document.querySelector('#option3');
  addGrayColor(option1);
  addGrayColor(option2);
  addGrayColor(option3);
  optionSelected = true;
  answerSelected = currentQuestion.option4;
  quiz.answerOption[currentQuestionIndex] = 4;

});
function addGreenColor(button) {

  button.style.backgroundColor = "#107c06";

}

function addGrayColor(button){
  button.style.backgroundColor = "#808080";
}
$$('.next').on('click',function() {
  evaluateAnswer();
  currentQuestionIndex ++;
  if(currentQuestionIndex<questions.length) {
    currentQuestion = questions[currentQuestionIndex];
    loadQuestion(currentQuestion);
  } else {
    myApp.confirm('Are you sure that you want to submit the answers?','Submit Answers', function () {

      console.log("All Answers submitted");
      findTotalMarks();
      window.open("./result.html","_self");

    });

  }
});
$$('.prev').on('click',function() {
  evaluateAnswer();
  currentQuestionIndex --;
  currentQuestion = questions[currentQuestionIndex];
  loadQuestion(currentQuestion);
});


function evaluateAnswer() {
  console.log("Answer Selected :::"+answerSelected);
  console.log("Correct Answer ::: "+currentQuestion.answer);
  if(answerSelected==currentQuestion.answer) {
    console.log("Answer is correct");
    quiz.mark[currentQuestionIndex] = 1;
  } else {
    console.log("Answer is wrong");
    quiz.mark[currentQuestionIndex] = 0;
  }
}

function findTotalMarks() {
  for(i=0;i<quiz.mark.length;i++) {
    if(quiz.mark[i]==1) {
      correctAnswers ++;
    } else {
      wrongAnswers ++;
    }
  }
  console.log("correctAnswers ::"+correctAnswers);
  console.log("wrongAnswers :::"+wrongAnswers);
  console.log("Total Marks :::" +correctAnswers);
  var user = new User();
  user.setCorrectAnswers(correctAnswers);
  user.setWrongAnswers(wrongAnswers);
  localStorage.setItem("correctAnswers", correctAnswers);
  localStorage.setItem("wrongAnswers", wrongAnswers);
}

//Timer

var countDownDate;
var minutes;
var seconds;

function startTimer() {
  countDownDate = new Date().getTime() + 10*1000;

   var x = setInterval(function() {
      console.log("Timer running");
       // Get todays date and time
       var now = new Date().getTime();
       var progress =  Math.floor(((countDownDate - now) / countDownDate)*100);
        var progressbar = $$('.demo-progressbar-inline .progressbar');
        myApp.setProgressbar(progressbar, progress);
       // Find the distance between now an the count down date
       var distance = countDownDate - now;

       // Time calculations for days, hours, minutes and seconds

       var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
       var seconds = Math.floor((distance % (1000 * 60)) / 1000);

       // If the count down is over, write some text
       if (distance < 0) {
           clearInterval(x);
          console.log("Timer expired");
       }
   }, 1000);

}
// Update the count down every 1 second
