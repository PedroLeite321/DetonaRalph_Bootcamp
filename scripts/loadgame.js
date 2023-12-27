function loadGameBtn()  {
    return function wasClicked()    {
        const loading = document.getElementById("loadScreen");
        const gamerow = document.getElementById("game-row");
        startBtnId = document.getElementById("start-gameBtn");
        const startButton = document.querySelector("#start-gameBtn").addEventListener('click', (e) =>{
            loading.style.display = "flex";
            setTimeout(() => {
                loading.style.display = "none";
                startBtnId.style.display = "none";
                gamerow.style.display = "grid";
            }, 5300)
        })
    }
}
const loading = loadGameBtn();
loading();