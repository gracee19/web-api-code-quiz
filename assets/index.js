const startPageText = document.getElementById("frontPage-text");
const startButton = document.getElementById("sbutton");
const viewHighscores = document.getElementById("highscore")
const timerText = document.getElementById("timer");

var qlist = [
    {
      title: "What is the framework that we use to customize a website design?",
      choices: ["CSS", "Bootstrap", "JavaScript", "None of the above"],
      answer: "Bootstrap"
    },
    {
      title: "What is the maximum no.of columns we can have in 1 row in a grid system?",
      choices: ["3", "8", "12",  "6"],
      answer: "12"
    },
    {
      title: "Can you put a new row inside a row?",
      choices: ["Yes", "No"],
      answer: "Yes"
    },
    {
      title: "In JavaScript, what is not a statement or declaration among this list?",
      choices: ["If-Else", "Const", "Json", "Do-While"],
      answer: "Json"
    },
    {
      title: "In JavaScript, what do you use to check if your code is working?",
      choices: ["return", "show", "console.log", "post"],
      answer: "console.log"
    }
    ///etc.
  ];

// Declaration of number of questions based on our qlist above
var qLength = qlist.length;
var i = 0;

//set time limit to 10 sec per question
var timer = qLength * 10;

// Initialize time variables
var timeInterval, timeCheckVal;

// Listener to the start button
startButton.addEventListener("click", function() { 
    timeInterval = setInterval(startTimer, 1000);
    timeCheckVal = setInterval(timeCheck, 1000);
    
    startTimer();
    timeCheck();
    nextQuestion();
    return timeInterval, timeCheckVal;


});

viewHighscores.addEventListener("click", function(e) {
    e.preventDefault();
    viewHighScoresScreen();
    renderHighscores();
});

// For each child of start-page-text id, remove it from the DOM
function clearGameArea() {
    while (startPageText.firstChild) {
        startPageText.firstChild.remove();
    }
}

function renderTitle(titleIndex) {

    clearGameArea();

    var qTitle = qlist[titleIndex].title;
    var qTitleElement = document.createElement("h2"); 
    var qTitvarext = document.createTextNode(qTitle);                      
    qTitleElement.appendChild(qTitvarext);                                  
    startPageText.appendChild(qTitleElement);
}

function renderAnswerButtons(titleIndex) {

    var answerBtnDiv = document.createElement("DIV"); 
    answerBtnDiv.setAttribute("id", "answer-buttons");
    startPageText.appendChild(answerBtnDiv);
    var answerButtons = document.getElementById("answer-buttons");

    // Loop for all the choices and set button in each of the choices
    for (var choiceIterationCount = 0; choiceIterationCount < qlist[titleIndex].choices.length; choiceIterationCount++) {

        
        var btnContent = qlist[titleIndex].choices[choiceIterationCount];
        var btnElement = document.createElement("button");
        var btnText = document.createTextNode(btnContent);                      
        
        //attribute for the id.            
        btnElement.setAttribute("id", "answer-button", "type",);

        btnElement.appendChild(btnText);
        answerButtons.appendChild(btnElement);
    }
    i++
    return i;
}
    
function currentAnswer(titleIndex) {
    var answerKeyObj = qlist[titleIndex - 1].answer;
    return answerKeyObj;
}

function nextQuestion() {
    if (i != qLength) {
        renderTitle(i);
        renderAnswerButtons(i);
        var answerKeyObj =  currentAnswer(i);
        var answerButtons = document.getElementById("answer-buttons");

        answerButtons.addEventListener("click", function(event) {
            var selectedButton = event.target;
            if(selectedButton.matches("button")) {
                if(selectedButton.innerText !== answerKeyObj) {
                    alert("Wrong answer!");
                    if (timer > 5){
                        timer = timer - 5;
                    }
                    else{
                        timer = 0;
                    }
                    nextQuestion();
                }
                else{
                    alert("Correct answer!");
                    nextQuestion();
                }
            }
        });

    }else{
        // gameOver() should run
        gameOver();
        
        }
    }

function startTimer() {
    timerText.innerText = "Time: " + timer + " sec";
    timer--;
    return timeInterval;
}

function myStopFunction() {
    clearInterval(timeInterval);
    clearInterval(timeCheckVal);
    }

function timeCheck() {
    if (timer <= -1) {
        gameOver();
    }
}

//Leaderboard for highscore & high score screen after the game is over
function enterScoreScreen() {
    clearGameArea();
    timerText.innerText = "Time : 0 sec";

    // Make all done text
    var highScoreElement = document.createElement("h2"); 
    var highScoreText = document.createTextNode("All done!");                      
    highScoreElement.appendChild(highScoreText);                                  
    startPageText.appendChild(highScoreElement);

    // Input field
    var finalScoreElement = document.createElement("p"); 
    // Timer is always 1 second ahead, and this matches the time remaining number at the top right
    timer++;
    var finalScoreText = document.createTextNode("Your final score is: " + timer);                      
    finalScoreElement.appendChild(finalScoreText);                                  
    startPageText.appendChild(finalScoreElement);

    // Make row for input field and submit button to go in
    var submissionContainerElement = document.createElement("div"); 
    var submissionContainerAttrClass = submissionContainerElement.setAttribute("class", "row");
    var submissionContainerAttrId = submissionContainerElement.setAttribute("id", "submit-row");
    startPageText.appendChild(submissionContainerElement);  
    var submissionDiv = document.getElementById("submit-row");

    // Enter name: text before input field
    var enterNameElement = document.createElement("p"); 
    var enterNameText = document.createTextNode("Enter initials: ");   
    var enterNameAttr = enterNameElement.setAttribute("class", "col-lg-3")                   
    enterNameElement.appendChild(enterNameText);                                  
    submissionDiv.appendChild(enterNameElement);

    // Input field
    var inputElement = document.createElement("input"); 
    inputElement.setAttribute("class", "col-lg-3");
    inputElement.setAttribute("id", "name-input");      
    submissionDiv.appendChild(inputElement);

    // Save button
    var btnElement = document.createElement("button");
    var btnText = document.createTextNode("Save");                          
    btnElement.setAttribute("class", "btn btn-dark col-md-3");
    btnElement.appendChild(btnText);
    submissionDiv.appendChild(btnElement);

    nameInput = document.getElementById("name-input");
    saveButton = document.getElementsByClassName("btn btn-dark col-md-3")[0];

    renderHighscores();

    homeButton = document.getElementsByClassName("btn btn-dark col-md-3");

    // Listener event for when we submit our name to the highscore list
    saveButton.addEventListener("click", function(event) {
        event.preventDefault();
        event.target.disabled = true;
        if(nameInput.value === "") {
            return;
        }

        localStorage.setItem(nameInput.value, timer);
        var li = document.createElement("li");
        li.textContent = nameInput.value + " - " + timer;
        startPageText.appendChild(li);

    });

    //Make a Home Button
    var homebtnEl = document.createElement("button");
    var homebtnText = document.createTextNode("Home");                          
    homebtnEl.setAttribute("class", "btn btn-outline-dark col-md-3");
    homebtnEl.setAttribute("id", "go-back-btn")
    homebtnEl.appendChild(homebtnText);
    submissionDiv.appendChild(homebtnEl);
    
    var homeBut = document.getElementById("go-back-btn");

    //home button listener
    homeBut.addEventListener("click", function(){
        var oK = confirm ("You sure you want to exit?");
            if(oK){
                alert ("Submit your score. If not your score will not be saved.");
            }
            else{
                alert("Please submit your score!");
                return;
            }
        location.reload();
    });  
}

// go through each item in localstorage and make an li for it and display on page
function renderHighscores() {
    var orderedList = document.createElement("ol");
    orderedList.setAttribute("id", "ordered-list");
    startPageText.appendChild(orderedList);
    for (var i = 0; i < localStorage.length; i++){
        var orderedListLocation = document.getElementById("ordered-list");
        console.log("i val: " + i);
        var currentKey = Object.entries(localStorage); 
        var currentScore = localStorage.getItem(localStorage.key(i));
        var highScoreElement = document.createElement("li");
        var highscoreText = document.createTextNode(currentKey[i]);
        highScoreElement.appendChild(highscoreText);
        orderedListLocation.appendChild(highScoreElement);
    }
    
}

// To view the highscores, but not update them like enterScoreScreen
function viewHighScoresScreen() {
    clearGameArea();
    // Make highschore text
    var highScoreElement = document.createElement("h2"); 
    var highScoreText = document.createTextNode("Highscores");                      
    highScoreElement.appendChild(highScoreText);                                  
    startPageText.appendChild(highScoreElement);
    

    var btnElement = document.createElement("button");
    var btnText = document.createTextNode("Home");                          
    btnElement.setAttribute("class", "btn btn-outline-dark col-md-6");
    btnElement.setAttribute("id", "go-back-btn")
    btnElement.appendChild(btnText);
    startPageText.appendChild(btnElement);

    var clearBtnEl = document.createElement("button");
    var clearBtntext = document.createTextNode("Clear");                          
    clearBtnEl.setAttribute("class", "btn btn-dark col-md-3");
    clearBtnEl.setAttribute("id", "go-back-btn")
    clearBtnEl.appendChild(clearBtntext);
    startPageText.appendChild(clearBtnEl);

    clearButton = document.getElementsByClassName("btn btn-dark col-md-3")[0];
    var homeButton = document.getElementById("go-back-btn");

    homeButton.addEventListener("click", function(){
        location.reload();
    });

    clearButton.addEventListener("click", function(event) {
        event.preventDefault
        console.log("CLEAR BUTTON EVENT")
        localStorage.clear();
        renderHighscores();
        viewHighScoresScreen();
    });
    
}

function gameOver() {
    clearGameArea();
    myStopFunction();
    enterScoreScreen();
}