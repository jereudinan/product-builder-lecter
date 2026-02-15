document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generate');
    const resetBtn = document.getElementById('reset');
    const dinnerSuggestionsContainer = document.getElementById('dinner-suggestions');
    const themeSwitch = document.getElementById('checkbox');

    const dinnerMenu = [
        '김치찌개', '된장찌개', '비빔밥', '불고기', '제육볶음',
        '치킨', '피자', '파스타', '햄버거', '스테이크',
        '짜장면', '짬뽕', '탕수육', '마라탕', '양꼬치',
        '초밥', '라멘', '돈까스', '우동', '회덮밥',
        '쌀국수', '분짜', '팟타이', '커리', '샌드위치'
    ];

    // Function to generate a single dinner suggestion
    const generateDinnerSuggestion = (suggestionIndex) => {
        const randomIndex = Math.floor(Math.random() * dinnerMenu.length);
        const suggestedMenu = dinnerMenu[randomIndex];

        const suggestionElement = document.createElement('div');
        suggestionElement.classList.add('suggestion-card');

        const titleElement = document.createElement('div');
        titleElement.classList.add('card-title');
        titleElement.textContent = `추천 #${suggestionIndex + 1}`;
        suggestionElement.appendChild(titleElement);

        const contentElement = document.createElement('div');
        contentElement.classList.add('suggestion-content');
        
        const menuTextElement = document.createElement('p');
        menuTextElement.classList.add('suggestion-text');
        menuTextElement.textContent = suggestedMenu;
        contentElement.appendChild(menuTextElement);

        suggestionElement.appendChild(contentElement);
        return suggestionElement;
    };

    // Event listener for the generate button
    generateBtn.addEventListener('click', () => {
        if (dinnerSuggestionsContainer.children.length >= 5) {
            alert('최대 5개의 메뉴까지 추천받을 수 있습니다.');
            return;
        }
        const newSuggestion = generateDinnerSuggestion(dinnerSuggestionsContainer.children.length);
        dinnerSuggestionsContainer.appendChild(newSuggestion);
    });

    // Event listener for the reset button
    resetBtn.addEventListener('click', () => {
        dinnerSuggestionsContainer.innerHTML = '';
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