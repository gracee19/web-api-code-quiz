// function countdown( elementName, minutes, seconds )
// {
//     var element, endTime, hours, mins, msLeft, time;

//     function twoDigits( n )
//     {
//         return (n <= 15 ? + n : n);
//     }

//     function updateTimer()
//     {
//         msLeft = endTime - (+new Date);
//         if ( msLeft < 1000 ) {
//             element.innerHTML = "Time is up!";
//         } else {
//             time = new Date( msLeft );
//             hours = time.getUTCHours();
//             mins = time.getUTCMinutes();
//             element.innerHTML = (hours ? hours + ':' + twoDigits( mins ) : mins) + ':' + twoDigits( time.getUTCSeconds() );
//             setTimeout( updateTimer, time.getUTCMilliseconds() + 500 );
//         }
//     }

//     element = document.getElementById( elementName );
//     endTime = (+new Date) + 1000 * (60*minutes + seconds) + 500;
//     updateTimer();
// }

// countdown( "thirty-countdown", 15, 0 );

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

// Declare number of questions based off the number of indexes in our quesions.js file
let qLength = qlist.length;

// Define iteration counter (i) for renderTitle and renderAnswerButtons's parameter arguments
// We later update the value of it from within the renderAnswerButtons function using i++ and returning it's value  
let i = 0;

// Let time limit be 10 seconds per question.
let timer = qLength * 5;

// Initialize time variables
let timeInterval, timeCheckVal;

// When we press the start quiz button
startButton.addEventListener("click", function() { 
    timeInterval = setInterval(startTimer, 1000);
    timeCheckVal = setInterval(timeCheck, 1000);
    
    startTimer();
    timeCheck();
    nextQuestion();
    return timeInterval, timeCheckVal;


});

viewHighscores.addEventListener("click", function(e) {
    // Keeps page from reloading on click and running through the whole quiz.js again
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

    let qTitle = qlist[titleIndex].title;
    let qTitleElement = document.createElement("h2"); 
    let qTitleText = document.createTextNode(qTitle);                      
    qTitleElement.appendChild(qTitleText);                                  
    startPageText.appendChild(qTitleElement);
}

function renderAnswerButtons(titleIndex) {

    // Create a new div with an ID of answer-buttons to put the individual buttons in
    let answerBtnDiv = document.createElement("DIV"); 
    answerBtnDiv.setAttribute("id", "answer-buttons");
    startPageText.appendChild(answerBtnDiv);
    let answerButtons = document.getElementById("answer-buttons");

    // Loop through each index in the current object's "choices" array and create a button with text from the index
    for (let choiceIterationCount = 0; choiceIterationCount < qlist[titleIndex].choices.length; choiceIterationCount++) {

        // Define variable that is selecting the index of the val of titleIndex, which starts at 0
        // Ex: questions[0].choices[0] = strings
        let btnContent = qlist[titleIndex].choices[choiceIterationCount];
        let btnElement = document.createElement("button");
        let btnText = document.createTextNode(btnContent);                      
        
        // Create an ID attribute for our button. Used for styling.            
        btnElement.setAttribute("id", "answer-button");

        btnElement.appendChild(btnText);
        answerButtons.appendChild(btnElement);
    }
    // Updates the iteration count so each time you click an answer button it will render the next question
    i++
    return i;
}
    
function currentAnswer(titleIndex) {
    // We subtract one because this function is called after renderAnswerButton is called which does i++
    let answerKeyObj = qlist[titleIndex - 1].answer;
    return answerKeyObj;
}

function nextQuestion() {
    // If the current iteration count is not equal to the number of questions in our list, then render the next question
    if (i != qLength) {
        renderTitle(i);
        renderAnswerButtons(i);
        let answerKeyObj =  currentAnswer(i);
        let answerButtons = document.getElementById("answer-buttons");

        answerButtons.addEventListener("click", function(event) {
            let selectedButton = event.target;
            if(selectedButton.matches("button")) {
                if(selectedButton.innerText !== answerKeyObj) {
                    alert("Wrong answer!");
                    timer = timer - 8;
                    nextQuestion();
                }
                else{
                    alert("Correct answer!");
                    nextQuestion();
                }
            }
        });

    }else{
        // RUN gameOver();
        gameOver();
        
        }
    }

function startTimer() {
    timerText.innerText = "Time Remaining: " + timer;
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

// Create the leaderboard / high score screen after the game is over
function enterScoreScreen() {
    clearGameArea();
    timerText.innerText = "Time Remaining: 0";

    // Make all done text
    let highScoreElement = document.createElement("h2"); 
    let highScoreText = document.createTextNode("All done!");                      
    highScoreElement.appendChild(highScoreText);                                  
    startPageText.appendChild(highScoreElement);

    // Make text above input field
    let finalScoreElement = document.createElement("p"); 
    // Timer is always 1 second ahead, and this matches the time remaining number at the top right
    timer++;
    let finalScoreText = document.createTextNode("Your final score is: " + timer);                      
    finalScoreElement.appendChild(finalScoreText);                                  
    startPageText.appendChild(finalScoreElement);

    // Make row for input field and submit button to go in
    let submissionContainerElement = document.createElement("div"); 
    let submissionContainerAttrClass = submissionContainerElement.setAttribute("class", "row");
    let submissionContainerAttrId = submissionContainerElement.setAttribute("id", "submit-row");
    startPageText.appendChild(submissionContainerElement);  
    let submissionDiv = document.getElementById("submit-row");

    // Enter name: text before input field
    let enterNameElement = document.createElement("p"); 
    let enterNameText = document.createTextNode("Enter initials: ");   
    let enterNameAttr = enterNameElement.setAttribute("class", "col-md-3")                   
    enterNameElement.appendChild(enterNameText);                                  
    submissionDiv.appendChild(enterNameElement);

    // Make name input field
    let inputElement = document.createElement("input"); 
    inputElement.setAttribute("class", "col-md-6");
    inputElement.setAttribute("id", "name-input");      
    submissionDiv.appendChild(inputElement);

    // Make submit button
    let btnElement = document.createElement("button");
    let btnText = document.createTextNode("Submit");                          
    btnElement.setAttribute("class", "btn btn-primary col-md-3");
    btnElement.appendChild(btnText);
    submissionDiv.appendChild(btnElement);

    nameInput = document.getElementById("name-input");
    submitButton = document.getElementsByClassName("btn btn-primary col-md-3")[0];


    renderHighscores();

    // Listener event for when we submit our name to the highscore list
    submitButton.addEventListener("click", function(event) {
        event.preventDefault();
        if(nameInput.value === "") {
            return;
        }

        localStorage.setItem(nameInput.value, timer);
        let li = document.createElement("li");
        li.textContent = nameInput.value + " - " + timer;
        startPageText.appendChild(li);

    });
}

// go through each item in localstorage and make an li for it and display on page
function renderHighscores() {
    let orderedList = document.createElement("ol");
    orderedList.setAttribute("id", "ordered-list");
    startPageText.appendChild(orderedList);
    for (let i = 0; i < localStorage.length; i++){
        let orderedListLocation = document.getElementById("ordered-list");
        console.log("i val: " + i);
        let currentKey = Object.entries(localStorage); 
        let currentScore = localStorage.getItem(localStorage.key(i));
        let highScoreElement = document.createElement("li");
        let highscoreText = document.createTextNode(currentKey[i]);
        highScoreElement.appendChild(highscoreText);
        orderedListLocation.appendChild(highScoreElement);
    }
}

// To view the highscores, but not update them like enterScoreScreen
function viewHighScoresScreen() {
    clearGameArea();
    // Make highschore text
    let highScoreElement = document.createElement("h2"); 
    let highScoreText = document.createTextNode("Highscores");                      
    highScoreElement.appendChild(highScoreText);                                  
    startPageText.appendChild(highScoreElement);

    let btnElement = document.createElement("button");
    let btnText = document.createTextNode("Go Back");                          
    btnElement.setAttribute("class", "btn btn-primary");
    btnElement.setAttribute("id", "go-back-btn")
    btnElement.appendChild(btnText);
    startPageText.appendChild(btnElement);

    let clearBtnEl = document.createElement("button");
    let clearBtntext = document.createTextNode("Clear");                          
    clearBtnEl.setAttribute("class", "btn btn-warning");
    clearBtnEl.setAttribute("id", "go-back-btn")
    clearBtnEl.appendChild(clearBtntext);
    startPageText.appendChild(clearBtnEl);

    clearButton = document.getElementsByClassName("btn btn-warning")[0];
    let goBackButton = document.getElementById("go-back-btn")

    goBackButton.addEventListener("click", function() {
        location.reload();
    });

    clearButton.addEventListener("click", function(event) {
        event.preventDefault();
        console.log("CLEAR BUTTON EVENT")
        localStorage.clear();
        renderHighscores();
        viewHighScoresScreen();
    });
}

// function sortLocalStorage(){
//     debugger;
//     if(localStorage.length > 0){
//        localStorageArr = [];
//        for (let i = 0; i < localStorage.length; i++){
//            localStorageArr[i] = localStorage.key(i)+localStorage.getItem(localStorage.key(i));
//        }
//     }
//     let sortedArray = localStorageArr.sort(function(a, b) {
//         return b - a
//     }); 
//     return sortedArray;
//  }

function gameOver() {
    clearGameArea();
    myStopFunction();
    enterScoreScreen();
}

