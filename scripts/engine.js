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
        nextLevelAlert: document.getElementById("popUp"),
    },
    values: {
        gamePacing: 1000,
        hitGridEnemy: 0,
        hitGridHero: 0,
        points: 0,
        currentLevel: 1,
        maxTime: 60,
        maxPointsLv: 0,
        isGameOver: false,
        haswon: false
    },
}

const cleanUpGame = () =>   {
    state.view.square.forEach((square) => {
        square.classList.remove('square');
        
    });
}

const startUpGame = () =>   {
    state.view.square.forEach((square) => {
        square.classList.add('square');
        
    });
}

const checkWinning = () => {
    const checkCurrentLevel = (level) => {
        
        switch (level) {
            case 1:
                console.log('torta');
                state.values.maxPointsLv = 15;
                state.values.gamePacing = 1300;
                state.view.nextLevelAlert.textContent = `level ${level}`;
                checkNextStageConditions();
                break;
            case 2:
                state.values.maxPointsLv = 20;
                state.values.gamePacing = 1000;
                state.view.nextLevelAlert.textContent = `level ${level}`;
                checkNextStageConditions();
                break;
            case 3:
                state.values.maxPointsLv = 30;
                state.values.gamePacing = 800;
                state.view.nextLevelAlert.textContent = `level ${level}`;
                checkNextStageConditions();
                break;
            default:
                state.values.currentLevel = 1;
                state.view.nextLevelAlert.textContent = `Level ${state.values.currentLevel}`;
        }
    };

    const winningScreen = () => {
        state.view.ralphFall.style.display = "block";
        state.view.game.style.display = "none";
        state.values.maxTime = 60;
        state.view.time_left.textContent = 60;
        state.values.isGameOver = true;
        state.values.haswon = true;
        playAgain();
    }

    const checkNextStageConditions = () => {
        const score = parseInt(state.view.score.textContent, 10); // Convert to number
        if (score >= state.values.maxPointsLv && state.values.currentLevel < 3) {
            state.values.currentLevel++;
            console.log("aaaa");
            checkCurrentLevel(state.values.currentLevel);
        } else if (state.values.currentLevel === 3 && score === state.values.maxPointsLv) {
            winningScreen();
        }
    }

    checkCurrentLevel(state.values.currentLevel);
}


const gameOver = () =>  {
    state.view.gameOver.style.display = "block";
    state.view.game.style.display = "none";
    state.values.maxTime = 60;
    state.view.time_left.textContent = 60;
    state.values.isGameOver = true;
    clearTimeout(mainTimeout);
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
        state.values.maxTime--;
        state.view.time_left.textContent = state.values.maxTime;

        if(state.view.time_left.textContent < 0)   {
            gameOver();
            state.values.maxTime = 60;
            state.values.isGameOver = true;
            
        }
    }
    

}

const addClickChecker = () => {
    // Define the click handler function
    const clickHandler = (event) => {
        const square = event.target;
        if (state.values.points >= 30 || state.values.haswon || state.values.isGameOver) {
            state.values.points = 0;
        } else {
            if (square.id == state.values.hitGridEnemy) {
                state.values.points++;
            } else {
                state.values.points--;
            }
            state.view.score.textContent = state.values.points;
            checkGameOverCondition();
            checkWinning();
        }
    };

    // Add the click handler to each square only if it's not already attached
    //Its allways returning undefined, so its allways true.
    state.view.square.forEach((square) => {
        if (!square.hasEventListener) {
            square.addEventListener("mousedown", clickHandler);
            square.hasEventListener = true;
        }
    });

    // Reset points to zero at the start of each game round
    state.values.points = 0;
    state.view.score.textContent = state.values.points;
};




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
    state.view.nextLevelAlert.style.display = "flex";
    const runRandomSquareWithTimeout = () => {

        if(state.values.isGameOver === true || state.view.time_left.textContent < 0 || state.values.haswon === true)    {
            console.log('alface');
            clearTimeout(mainTimeout);
            state.view.score.innerHTML = '0';
            state.values.points = 0; // Reset points to 0 on game restart
            
        } else   {
            mainTimeout = setTimeout(runRandomSquareWithTimeout, state.values.gamePacing);
        }

        state.view.square.forEach((square) => {
            console.log(square);
            
        });
        
        console.log('Test');
        decreaseTimeLeft();
        randomSquare();
        state.values.isGameOver = false;
        state.values.haswon = false;
       
      
        
        
    };

    runRandomSquareWithTimeout();
};
