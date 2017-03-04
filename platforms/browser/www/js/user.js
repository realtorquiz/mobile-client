function User() {
  this.isLoggedIn = false;
  this.userName = "";
  this.correctAnswers = 0;
  this.wrongAnswers = 0;
}
this.User.prototype.setUserName = function (userName) {
  this.userName = userName;
};

this.User.prototype.setCorrectAnswers = function (count) {
  this.correctAnswers = count;
};
this.User.prototype.setWrongAnswers = function (count) {
  this.wrongAnswers = count;
};
this.User.prototype.getCorrectAnswer = function () {
  return this.correctAnswers;
};
this.User.prototype.getWrongAnswer = function () {
  return this.wrongAnswers;
};
