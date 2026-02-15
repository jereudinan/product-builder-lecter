document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generate');
    const resetBtn = document.getElementById('reset');
    const dinnerSuggestionsContainer = document.getElementById('dinner-suggestions');
    const themeSwitch = document.getElementById('checkbox');
    const langKoBtn = document.getElementById('lang-ko');
    const langEnBtn = document.getElementById('lang-en');
    const headerTitle = document.querySelector('h1');

    const translations = {
        ko: {
            siteTitle: '저녁 메뉴 추천기',
            headerTitle: '오늘 뭐 먹지?',
            generateButton: '메뉴 추천',
            resetButton: '다시 추천',
            suggestionTitle: (n) => `추천 #${n}`,
            alertMax: '최대 5개의 메뉴까지 추천받을 수 있습니다.',
            dinnerMenu: [
                '김치찌개', '된장찌개', '비빔밥', '불고기', '제육볶음', '치킨', '피자', '파스타', 
                '햄버거', '스테이크', '짜장면', '짬뽕', '탕수육', '마라탕', '양꼬치', '초밥', 
                '라멘', '돈까스', '우동', '회덮밥', '쌀국수', '분짜', '팟타이', '커리', '샌드위치'
            ]
        },
        en: {
            siteTitle: 'Dinner Menu Recommender',
            headerTitle: 'What to eat tonight?',
            generateButton: 'Suggest Menu',
            resetButton: 'Suggest Again',
            suggestionTitle: (n) => `Suggestion #${n}`,
            alertMax: 'You can get up to 5 menu recommendations.',
            dinnerMenu: [
                'Kimchi Stew', 'Doenjang Jjigae', 'Bibimbap', 'Bulgogi', 'Spicy Pork Stir-fry', 'Chicken', 'Pizza', 'Pasta',
                'Hamburger', 'Steak', 'Jajangmyeon', 'Jjamppong', 'Tangsuyuk', 'Maratang', 'Lamb Skewers', 'Sushi',
                'Ramen', 'Donkatsu', 'Udon', 'Hoe-deopbap', 'Pho', 'Bun Cha', 'Pad Thai', 'Curry', 'Sandwich'
            ]
        }
    };

    let currentLanguage = 'ko';

    const updateUI = (lang) => {
        if (!translations[lang]) return;
        currentLanguage = lang;
        document.documentElement.lang = lang;

        // Update title
        document.title = translations[lang].siteTitle;

        // Update header
        headerTitle.textContent = translations[lang].headerTitle;

        // Update buttons and other elements with data-lang-key
        document.querySelectorAll('[data-lang-key]').forEach(el => {
            const key = el.dataset.langKey;
            if (translations[lang][key]) {
                el.textContent = translations[lang][key];
            }
        });
        
        // Update language buttons active state
        langKoBtn.classList.toggle('active', lang === 'ko');
        langEnBtn.classList.toggle('active', lang === 'en');

        // Clear results as menu list has changed
        dinnerSuggestionsContainer.innerHTML = '';
    };

    // Function to generate a single dinner suggestion
    const generateDinnerSuggestion = (suggestionIndex) => {
        const menuList = translations[currentLanguage].dinnerMenu;
        const randomIndex = Math.floor(Math.random() * menuList.length);
        const suggestedMenu = menuList[randomIndex];

        const suggestionElement = document.createElement('div');
        suggestionElement.classList.add('suggestion-card');

        const titleElement = document.createElement('div');
        titleElement.classList.add('card-title');
        titleElement.textContent = translations[currentLanguage].suggestionTitle(suggestionIndex + 1);
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
            alert(translations[currentLanguage].alertMax);
            return;
        }
        const newSuggestion = generateDinnerSuggestion(dinnerSuggestionsContainer.children.length);
        dinnerSuggestionsContainer.appendChild(newSuggestion);
    });

    // Event listener for the reset button
    resetBtn.addEventListener('click', () => {
        dinnerSuggestionsContainer.innerHTML = '';
    });

    // Language switchers
    langKoBtn.addEventListener('click', () => updateUI('ko'));
    langEnBtn.addEventListener('click', () => updateUI('en'));

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

    // Initial UI render
    updateUI(currentLanguage);
});