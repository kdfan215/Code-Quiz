var time = 75;

var currentQuestion=1;

var questionHtml = $("body").html();
// $("body").empty();

// setTimeout(() => {
//   $("body").html(questionHtml);
// }, 3000);
var timer;
$("#start").on("click", startQuiz);
function startQuiz(){

  $("#question-container-1").show();
  $("#timer-p").show();
  timer = setInterval(function() {
  time--;
  if (time === 0) {
    checkAnswers();
    //Time ran out we should invoke the function for submitting form
  }
  //Inject value into DOM here

  $("#timer").text(time);
  }, 1000);
  $("#start").hide();
}
$(".submit-button").on("click", nextQuestion);
function nextQuestion(){
$('#question-container-' + currentQuestion).hide();

currentQuestion = currentQuestion+1;

$('#question-container-' + currentQuestion).show();

}
//We have a working timer
//We have at least one question
$("#submit").on("click", checkAnswers);
var answers = ["1995", "for var(i=0;i<5;i++)", "$", "var", "img"];
function checkAnswers() {
  clearInterval(timer);
  var userResults = [];
  //Fetch all elements with question container class and iterate over it (for loop) pass each item at a specific index position into
  //function as arg that we pass to forEach
  console.log($(".question-container"));
  $(".question-container").map(function(index, parent) {
    //We check to see if the current question container contains a radio button that is checked
    var inputEl = $(parent).find("input:checked");

    //If there si not one this will eval to undefined which is falsy indicating user did not answer quesiton
    if (inputEl) {
      //If not falsy then user answered the question and we should get the value to determine if they answered right
      userResults.push(inputEl.val());
    } else {
      userResults.push(undefined);
    }
  });
  //We ahve a user results array
  //We need to do comparisons to obtain right wrong and unanswered questions
  var correct = 0;
  var wrong = 0;
  var unanswered = 0;
  for (var i = 0; i < userResults.length; i++) {
    var userAnswer = userResults[i];
    var correctAnswer = answers[i];
    if (userAnswer === correctAnswer) {
      correct++;
    } else if (userAnswer === undefined) {
      unanswered++;
    } else {
      wrong++;
    }
  }
  console.log(correct, wrong, unanswered);
  $("body").empty();
  //Now we must populate new content with jquery
  var div = $("<div>");
  var correct = $("<h1>").text("You got " + correct + " correct.");
  var wrong = $("<h1>").text("You got " + wrong + " wrong.");
  var unanswered = $("<h1>").text("You got " + unanswered + " unanswered.");
  div
    .append(correct)
    .append(wrong)
    .append(unanswered);
    //We need to also append into div a button we create with some id
    //We need to assign a click handler to that button whic will be our reset button
    //We need to execute the commented out $('body').html(questionHtml)
    //Proabbly need to restart timer as well
  $("body").html(div);
}
//TODO:
/*
1. We need a suibmit button
2. We need a click event listener through jquery to listen for click events to occur on the submit button
3. This click handler needs logic to accomplish the following:
    1. read all the selected values from radio buttons
    2. determine if the answers are right or wrong
    3. Clear out all the question
    4. display correct, wrong, unanswered
4. Working timer Yay, BUT when we clear the interval meaning the user ran out of time, we should do the same thing 
as if the user clicked submit
^^This screams write a function to use in both places
*/
//function doSomethingInTwoPlaces(){}

//$('#timer').on('click', doSomethingInTwoPlaces);
