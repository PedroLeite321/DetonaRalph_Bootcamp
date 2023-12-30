const state = {
    view: {
        square: document.querySelectorAll(".square"),
        time_left: document.querySelector("#time-left"),
        score: document.querySelector("#score").innerHTML,
        lifes: document.querySelector("#lives"),
    },
    values: {},
};

const randomSquare = () => {
    state.view.square.forEach((square) => {
        square.classList.remove("enemy", "hero");
    });

    let randomNumber = Math.floor(Math.random() * 9);
    let randomNumber2;

    do {
        randomNumber2 = Math.floor(Math.random() * 9);
    } while (randomNumber === randomNumber2);

    let randomSquareEnemy = state.view.square[randomNumber];
    let randomSquareHero = state.view.square[randomNumber2];

    randomSquareEnemy.classList.add("enemy");
    randomSquareHero.classList.add("hero");
};

const initialize = () => {
    const runRandomSquareWithTimeout = () => {
        randomSquare();
        setTimeout(runRandomSquareWithTimeout, 900);
    };

    runRandomSquareWithTimeout();
};

initialize();