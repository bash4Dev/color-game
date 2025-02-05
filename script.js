const colors = [
    '#2efcb7', '#ec61ec', '#fc9347',
    '#7FFFD4', '#b1b1b1', '#FF00FF',
    '#fcfc5e', '#f8f860', '#c0b8b8',
]

let score = 0;
let targetColor;
const colorBox = document.querySelector("[data-testid='colorBox']");
const scoreEle = document.querySelector("[data-testid='score']");
const optionsContainer = document.querySelector('.options');
const gameStatus = document.querySelector("[data-testid='gameStatus']");
const newGameBtn = document.querySelector('[data-testid="newGameButton"]');

const initGame = () => {
    targetColor = colors[Math.floor(Math.random() * colors.length)];
    colorBox.style.backgroundColor = targetColor;
    scoreEle.textContent = score;

    // create option boxes' color
    const otherColors = colors.filter(c => c !== targetColor);
    const shuffledColors = [...otherColors].sort(() => Math.random() - 0.5);
    const options = [targetColor, ...shuffledColors.slice(0, 5)];
    options.sort(() => Math.random() - 0.5);

    // create option boxes
    optionsContainer.innerHTML = '';
    options.forEach(color => {
        const button = document.createElement('button');
        button.dataset.testid = 'colorOption';
        button.style.backgroundColor = color;
        button.addEventListener('click', () => guessFunc(color));
        optionsContainer.appendChild(button);
    })
    gameStatus.textContent = '';
}

initGame()

const guessFunc = (selectedColor) => {
    if (selectedColor === targetColor) {
        score++;
        scoreEle.textContent = score;
        gameStatus.textContent = 'Correct Guess!';
        gameStatus.style.color = 'green';
        colorBox.classList.add('celebrate');
        setTimeout(() => {
            colorBox.classList.remove('celebrate');
            initGame()
        }, 1000);
    } else {
        gameStatus.textContent = 'Wrong! Try again.';
        gameStatus.style.color = 'red';
        setTimeout(() => initGame(), 1000);
    }
}

newGameBtn.addEventListener('click', () => {
    score = 0
    scoreEle.textContent = score;
    initGame();
})
