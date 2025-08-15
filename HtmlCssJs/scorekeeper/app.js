const score1 = document.querySelector("#score-1");
const score2 = document.querySelector("#score-2");
const form = document.querySelector("form");

const select = document.querySelector("select");
const button1 = document.querySelector("#player1-inc");
const button2 = document.querySelector("#player2-inc");
const reset = document.querySelector("#reset");

score1.innerText = 0;
score2.innerText = 0;




// function inc(score) {
//     score++;
//     return score;
// }

function inc(scoreElem) {
    let score = parseInt(scoreElem.innerText);
    score++;
    scoreElem.innerText = score;
}


function winner(scoreElem) {
    console.log(`winScore type: ${typeof winScore}`);
    console.log(`score type: ${typeof parseInt(scoreElem.innerText)}`);
    return parseInt(scoreElem.innerText) === winScore || parseInt(scoreElem.innerText) >= winScore;
}

function resetState() {
    score1.innerText = 0;
    score2.innerText = 0;
    score1.classList.remove("won");
    score2.classList.remove("won");
}

let winScore = parseInt(select.value);
// prevent default form submission
form.addEventListener("submit", function(e) {
    e.preventDefault();
});

select.addEventListener("change", function() {
    winScore = parseInt(this.value);
});

button1.addEventListener("click", function() {
    inc(score1);
    if (winner(score1)) {
        console.log(`Player 1 has won with score: ${winScore}`);  // Add this line
        score1.classList.add("won");
        console.log("The game will be reset in 3 seconds...")
        setTimeout(resetState, 3000);
    }
});

button2.addEventListener("click", function() {
    inc(score2);
    if (winner(score2)) {
        console.log(`Player 2 has won with score: ${winScore}`);  // Add this line
        score2.classList.add("won");
        console.log("The game will be reset in 3 seconds...")
        setTimeout(resetState, 3000);
    }
});

reset.addEventListener("click", resetState);


