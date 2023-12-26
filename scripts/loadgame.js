function loadGameBtn()  {
    return function wasClicked()    {
        const loading = document.getElementById("loadScreen");
        const startButton = document.querySelector("#start-gameBtn").addEventListener('click', (e) =>{
            loading.style.display = "flex";
            setTimeout(() => {
                loading.style.display = "none";
            }, 5300)
        })
    }
}
const loading = loadGameBtn();
loading();