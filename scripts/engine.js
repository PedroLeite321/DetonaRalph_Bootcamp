const state = {
    view: {
        square: document.querySelectorAll(".square"),
        time_left: document.querySelector("#time-left"),
        score: document.querySelector("#score").innerHTML,
        lifes: document.querySelector("#lives"),
    },
    values: {
        gamePacing: 1000,
        hitGridEnemy: 0,
        hitGridHero: 0,
    },
};

const addClickChecker = ()  =>  {
    
    state.view.square.forEach((square) =>  {
        square.addEventListener("mousedown", () =>  {
            console.log(state.values.hitGridEnemy)
            if(square.id === state.values.hitGridEnemy)  {
              alert("clicou");
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


    state.values.hitGrid = randomSquare.id;
    state.values.hitGridHero = randomNumber2.id


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