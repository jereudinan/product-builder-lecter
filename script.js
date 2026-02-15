document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generate');
    const resetBtn = document.getElementById('reset');
    const lottoGamesContainer = document.getElementById('lotto-games');
    const themeSwitch = document.getElementById('checkbox');

    // Function to get a color based on the number
    const getColor = (number) => {
        if (number <= 10) return '#f39c12'; // Yellow
        if (number <= 20) return '#3498db'; // Blue
        if (number <= 30) return '#e74c3c'; // Red
        if (number <= 40) return '#2ecc71'; // Green
        return '#9b59b6'; // Purple
    };

    // Function to generate a single lotto game
    const generateLottoGame = (gameIndex) => {
        const numbers = new Set();
        while (numbers.size < 6) {
            numbers.add(Math.floor(Math.random() * 45) + 1);
        }

        const sortedNumbers = Array.from(numbers).sort((a, b) => a - b);

        const gameElement = document.createElement('div');
        gameElement.classList.add('lotto-game');

        const titleElement = document.createElement('div');
        titleElement.classList.add('game-title');
        titleElement.textContent = `게임 ${gameIndex + 1}`;
        gameElement.appendChild(titleElement);

        const numbersElement = document.createElement('div');
        numbersElement.classList.add('numbers');

        sortedNumbers.forEach(number => {
            const numberElement = document.createElement('div');
            numberElement.classList.add('number');
            numberElement.textContent = number;
            numberElement.style.backgroundColor = getColor(number);
            numbersElement.appendChild(numberElement);
        });

        gameElement.appendChild(numbersElement);
        return gameElement;
    };

    // Event listener for the generate button
    generateBtn.addEventListener('click', () => {
        if (lottoGamesContainer.children.length >= 5) {
            alert('최대 5개의 게임까지 생성할 수 있습니다.');
            return;
        }
        const newGame = generateLottoGame(lottoGamesContainer.children.length);
        lottoGamesContainer.appendChild(newGame);
    });

    // Event listener for the reset button
    resetBtn.addEventListener('click', () => {
        lottoGamesContainer.innerHTML = '';
    });

    // Theme switcher
    themeSwitch.addEventListener('change', () => {
        if (themeSwitch.checked) {
            document.documentElement.setAttribute('data-theme', 'dark');
        } else {
            document.documentElement.removeAttribute('data-theme');
        }
    });

    // Set initial theme
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        themeSwitch.checked = true;
        document.documentElement.setAttribute('data-theme', 'dark');
    }
});