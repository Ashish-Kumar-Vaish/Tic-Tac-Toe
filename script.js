let boxes = document.querySelectorAll(".box");
let newGame = document.querySelector(".newGame");
let messageContainer = document.querySelector(".messageContainer");
let message = document.querySelector("#message");

let turnO = true;
let boxFilled = 0;

const winPatterns = [
    [0, 1, 2], [0, 3, 6], [0, 4, 8],
    [1, 4, 7], [2, 5, 8], [2, 4, 6],
    [3, 4, 5], [6, 7, 8]
];

// to disable the box after a turn
const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
}

// to remove animations, X's, O's, and to enable boxes
const enableBoxes = () => {
    for (let box of boxes) {
        box.classList.remove("main");
        box.classList.remove("back");
        box.disabled = false;
        box.innerText = "";
    }
}

// new game button
newGame.addEventListener("click", () => {
    turnO = true;
    boxFilled = 0;
    enableBoxes();
    messageContainer.classList.add("hide");
});

// checking when a box is clicked to perform operations
boxes.forEach((box) => {
    box.addEventListener("click", () => {

        if(turnO) {
            box.innerText = "O";
            turnO = false;
        }
        else {
            box.innerText = "X";
            turnO = true;
        }

        box.disabled = true;
        ++boxFilled;

        checkWinner(); // to check if a player won after a move
        draw(); // to check if the game ends in a draw
    });
})

const showWinner = (winner) => {
    message.innerText = winner + " Wins";
    messageContainer.classList.remove("hide");
}

const checkWinner = () => {
    for(let pattern of winPatterns) {
        let firstVal = boxes[pattern[0]].innerText;
        let secondVal = boxes[pattern[1]].innerText;
        let thirdVal = boxes[pattern[2]].innerText;

        if (firstVal != "" && secondVal != "" && thirdVal != "") {
            if (firstVal === secondVal && secondVal === thirdVal) {
                disableBoxes();
                showWinner(firstVal);

                boxes[pattern[0]].classList.add("main");
                boxes[pattern[1]].classList.add("main");
                boxes[pattern[2]].classList.add("main");
                
                for (let idx in boxes) {
                    if (idx != pattern[0] && idx != pattern[1] && idx != pattern[2]) {
                        if (boxes[idx] !== "") {
                            boxes[idx].classList.add("back");
                        }
                    }
                }

                break;
            }
        }
    }
}

const draw = () => {
    
    if (boxFilled == 9) {
        message.innerText = "Draw";
        messageContainer.classList.remove("hide");
        for (let box of boxes) {
            box.classList.add("back");
        }
    }
}