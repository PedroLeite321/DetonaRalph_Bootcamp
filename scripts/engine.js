const state = {
    view: {
        square: document.querySelectorAll(".square"),
        time_left: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
        lifes: document.querySelector("#lives"),
        gameOver: document.getElementById("gameOver"),
        game: document.getElementById("game-row"),
    },
    values: {
        gamePacing: 1000,
        hitGridEnemy: 0,
        hitGridHero: 0,
        points: 0,
        currentLevel: 1,
    },
};

const gameOver = () =>  {
    console.log("gameover");
    state.view.gameOver.style.display = "block";
    state.view.game.style.display = "none";
}



const checkGameOverCondition = () =>    {
    let levelMaxPoints = state.values.currentLevel * 5;
    if(state.view.score.innerHTML < 0) {
        state.view.score.textContent = 0;
        gameOver();

    }
}
const addClickChecker = ()  =>  {
    
    state.view.square.forEach((square) =>  {
        square.addEventListener("mousedown", () =>  {
            console.log(square.id);
            console.log(state.values.hitGridEnemy + "enemy");
            if(square.id === state.values.hitGridEnemy)  {
                state.values.points++;
                state.view.score.textContent = state.values.points;
                checkGameOverCondition();
            }else if(square.id === state.values.hitGridHero)   {
                state.values.points--;
                state.view.score.textContent = state.values.points;
                checkGameOverCondition();
            }else if (square.id !== state.values.hitGridHero && square.id !== state.values.hitGridEnemy)  {
                state.values.points--;
                state.view.score.textContent = state.values.points;
                checkGameOverCondition();
            }
        })
    })
}

const moveCharacter = ()   =>   {

    let randomNumber = Math.floor(Math.random() * 9);
    let randomNumber2;

    do {
        randomNumber2 = Math.floor(Math.random() * 9);
    } while (randomNumber === randomNumber2);

    let randomSquareEnemy = state.view.square[randomNumber];
    let randomSquareHero = state.view.square[randomNumber2];

    randomSquareEnemy.classList.add("enemy");
    randomSquareHero.classList.add("hero");


    state.values.hitGridEnemy = randomSquareEnemy.id;
    state.values.hitGridHero = randomSquareHero.id


}

const randomSquare = () => {
    state.view.square.forEach((square) => {
        square.classList.remove("enemy", "hero");
    });
    moveCharacter();
    
};

const initialize = () => {
    
    addClickChecker();
    const runRandomSquareWithTimeout = () => {
        randomSquare();
        setTimeout(runRandomSquareWithTimeout, state.values.gamePacing);
    };

    runRandomSquareWithTimeout();
};

initialize();