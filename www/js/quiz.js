function Quiz() {
  this.questions = [];
  this.answerOption = [];
  this.mark = [];
}
this.Quiz.prototype.createQuiz = function () {

  var question = new Question();
  this.questions = [
      {
         "question":"In which year of First World War Germany declared war on Russia and France?",
         "option1":"1914",
         "option2":"1915",
         "option3":"1916",
         "option4":"1917",
         "answer":"1914"
      },
      {
         "question":"India has largest deposits of ____ in the world.",
         "option1":"gold",
         "option2":"copper",
         "option3":"mica",
         "option4":"None of the above",
         "answer":"mica"
      },
	{
         "question":"How many Lok Sabha seats belong to Rajasthan?",
         "option1":"32",
         "option2":"25",
         "option3":"30",
         "option4":"20",
         "answer":"25"
      }
   ];




};
this.Quiz.prototype.getQuestions = function () {
  return this.questions;
};
