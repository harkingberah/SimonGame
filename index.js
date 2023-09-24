let buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let randomNumber;
let randomChosenColour;
let level = 0;
let started=false
$(".btn").click(function () {
    // Get the colour of clicked button
    let clickedColour = $(this).attr("id");
    userClickedPattern.push(clickedColour)
    playSound(clickedColour);
    $(this).addClass("myButton pressed");
    setTimeout(function () {
        $("#" + clickedColour).removeClass("myButton pressed")
    }, 100);

   checkAnswer(userClickedPattern.length-1)

});
 function checkAnswer(currentLevel) {
     // Check answer is correct or not and update the score accordingly
     if (userClickedPattern[currentLevel] == gamePattern[currentLevel]) {
         console.log("Success!!!")
         if (userClickedPattern.length===gamePattern.length) {
             setTimeout(function () {
                 nextSequence()
             }, 1000);
             userClickedPattern = [];
         }

         
     }
     else {
         console.log("Game Over!!!")
         playSound("wrong");
         $("#level-title").text("Game Over Thanks for Playing!!! ")
         $(".container").hide()
         $("#level-title").animate({
             opacity: 0.5,
             transition: "5s",
             fontSize: "70px"
         }).css("background-color","red")
         startOver();
     }
     
}
   
let startOver = () => {
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    started = false;
}
       
let nextSequence = () => {
    level = level + 1;
    $("#level-title").text("Level ").append(level)
    
    randomNumber = Math.floor(Math.random() * 4);
    randomChosenColour = buttonColours[randomNumber];  
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    
    
}
function playSound(color) {
    let audio = new Audio("sounds/" + color + '.mp3');
    audio.play()
}
// nextSequence()

$(document).keypress(function () {
    if (!started) {
        $("#level-title").text("Level 0")
        nextSequence()
        started = true;
    }
    
});


