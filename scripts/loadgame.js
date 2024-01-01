function loadGameBtn()  {
    return function wasClicked()    {
        

        const loading = document.getElementById("loadScreen");
        const gamerow = document.getElementById("game-row");
        
        startBtnId = document.getElementById("start-gameBtn");
        const startButton = document.querySelector("#start-gameBtn").addEventListener('click', (e) =>{
            
            const startFunction = setInterval(() =>   {
                if(state.values.isGameOver == false)   {
                    console.log('teste')
                    initialize();
                }
                console.log(`${state.values.isGameOver}`);
            }, 6200);
            
            loading.style.display = "flex";
            setTimeout(() => {
                clearInterval(startFunction);
                loading.style.display = "none";
                startBtnId.style.display = "none";
                gamerow.style.display = "grid";
            }, 6500)
            
        })
    }
}



const loading = loadGameBtn();
loading();


const playAgain = () => {

    const playAgainBtn = document.querySelector("#playAgainBtn");



    playAgainBtn.addEventListener("click", ()   =>  {
        const gameOver = document.getElementById("gameOver");
        gameOver.style.display = "none";
        startBtnId = document.getElementById("start-gameBtn");
        startBtnId.style.display = "inline";
        state.values.gameover = false;
        loading();
        
        
       
    })
}