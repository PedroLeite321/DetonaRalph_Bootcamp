let mainTimeout;

const state = {
    view: {
        square: document.querySelectorAll(".square"),
        time_left: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
        lifes: document.querySelector("#lives"),
        gameOver: document.getElementById("gameOver"),
        game: document.getElementById("game-row"),
        ralphFall: document.getElementById("winningScreen"),
    },
    values: {
        gamePacing: 1000,
        hitGridEnemy: 0,
        hitGridHero: 0,
        points: 0,
        currentLevel: 1,
        maxTime: 6,
        maxPointsLv: 0,
        isGameOver: false,
    },
}

const checkWinning = () =>  {

    const checkCurrentLevel = (level) => {
        switch(level)   {
            case 1:
                state.values.maxPointsLv = 15;
                state.values.gamePacing = 1000;
                break;
            case 2:
                state.values.maxPointsLv = 20;
                state.values.gamePacing = 700;
                break;
            case 3:
                state.values.maxPointsLv = 30;
                state.values.gamePacing = 400;
                break;
        }
        
    };
    const winningScreen = () =>  {
        state.view.gameOver.style.display = "block";
        state.view.game.style.display = "none";
        state.values.maxTime = 60;
        state.view.time_left.textContent = 60;
        state.values.isGameOver = true;
        playAgain();
    }
    
    const checkNextStageConditions = () =>  {
        if(state.view.score.textContent === state.values.maxPointsLv && state.values.currentLevel < 4)   {
              state.values.currentLevel++;
        }
    }

    checkCurrentLevel(state.values.currentLevel);
    checkNextStageConditions();
  
    
}

const gameOver = () =>  {
    state.view.gameOver.style.display = "block";
    state.view.game.style.display = "none";
    state.values.maxTime = 60;
    state.view.time_left.textContent = 60;
    state.values.isGameOver = true;
    playAgain();
}



const checkGameOverCondition = () =>    {
    if(state.view.score.innerHTML < 0) {
        state.view.score.textContent = 0;
        gameOver();
        
    }
}
const decreaseTimeLeft = () =>  {
    if(!state.values.isGameOver)  {
        state.view.time_left.textContent = state.values.maxTime--;

        if(state.view.time_left.textContent < 0)   {
            gameOver();
            state.values.maxTime = 60;
            state.values.isGameOver = true;
            
        }
    }
    

}
const addClickChecker = ()  =>  {
    
    state.view.square.forEach((square) =>  {
        square.addEventListener("mousedown", () =>  {
            if(square.id === state.values.hitGridEnemy)  {

                state.values.points++;
                state.view.score.textContent = state.values.points;
                checkGameOverCondition();
                checkWinning();

            }else if(square.id === state.values.hitGridHero)   {

                state.values.points--;
                state.view.score.textContent = state.values.points;
                checkGameOverCondition();
                checkWinning();

            }else if (square.id !== state.values.hitGridHero && square.id !== state.values.hitGridEnemy)  {

                state.values.points--;
                state.view.score.textContent = state.values.points;
                checkGameOverCondition();
                checkWinning();

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

        decreaseTimeLeft();
        randomSquare();
        mainTimeout = setTimeout(runRandomSquareWithTimeout, state.values.gamePacing);
        
        
        
    };

    runRandomSquareWithTimeout();
};

