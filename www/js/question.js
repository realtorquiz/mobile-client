function Question() {
  this.question = "";
  this.option1 = "";
  this.option2 = "";
  this.option3 = "";
  this.option4 = "";
  this.answer = "";
}
this.Question.prototype.formQuestion = function (question, option1, option2, option3,  option4,  answer) {

  this.question = question;
  this.option1 = option1;
  this.option2 = option2;
  this.option3 = option3;
  this.option4 = option4;

};
