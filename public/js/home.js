const startGame = async(event) =>{
    event.preventDefault();
    document.location.replace('/game');
}
document.querySelector('#game-button')
    .addEventListener('click', startGame);