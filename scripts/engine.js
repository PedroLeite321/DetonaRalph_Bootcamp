const state = {
    view:   {
         square: document.querySelectorAll(".square"),
         time_left: document.querySelector("#time-left"),
         score: document.querySelector("#score").innerHTML,
         lifes: document.querySelector("#lives"),
        
    },
    values: {},

}
const initialize = () =>    {
    const cleanUpClasses = ()   =>  {

        state.view.square.forEach((square) => {
            square.classList.remove("enemy");
            square.classList.remove("hero");
        });
                

    }
    setTimeout(() => {
        
        cleanUpClasses();
        initialize();
    }, 1000);
    
    const randomSquare = () =>  {

        let randomNumber = Math.floor(Math.random() * 9);
        let randomNumber2 = Math.floor(Math.random() * 9);
        let randomSquareEnemy = state.view.square[randomNumber];
        let randomSquareHero;
        
        


        if(randomNumber !== randomNumber2)  {
            randomSquareHero = state.view.square[randomNumber2];
        }else{
            initialize();
        }
        randomSquareEnemy.classList.add("enemy");
        randomSquareHero.classList.add("hero");
    
        
    }
    if(state.view.score == 10 || state.view.score < 0)   {
        console.log("Bigger than ten");
        randomSquare();
    }else   {
        initialize();
    }

}
initialize();
