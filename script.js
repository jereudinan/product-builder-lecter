document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generate');
    const dinnerSuggestionsContainer = document.getElementById('dinner-suggestions');
    const themeSwitch = document.getElementById('checkbox');
    const langKoBtn = document.getElementById('lang-ko');
    const langEnBtn = document.getElementById('lang-en');

    const translations = {
        ko: {
            siteTitle: '저녁 메뉴 추천기',
            headerTitle: '오늘 뭐 먹지?',
            generateButton: '메뉴 추천',
            contactHeading: '제휴 문의',
            submitButton: '문의 보내기',
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
            contactHeading: 'Partnership Inquiry',
            submitButton: 'Send Inquiry',
            dinnerMenu: [
                'Kimchi Stew', 'Doenjang Jjigae', 'Bibimbap', 'Bulgogi', 'Spicy Pork Stir-fry', 'Chicken', 'Pizza', 'Pasta',
                'Hamburger', 'Steak', 'Jajangmyeon', 'Jjamppong', 'Tangsuyuk', 'Maratang', 'Lamb Skewers', 'Sushi',
                'Ramen', 'Donkatsu', 'Udon', 'Hoe-deopbap', 'Pho', 'Bun Cha', 'Pad Thai', 'Curry', 'Sandwich'
            ]
        }
    };

    let currentLanguage = 'ko';

    const showInitialMessage = () => {
        dinnerSuggestionsContainer.innerHTML = '';
        const h1 = document.createElement('h1');
        h1.textContent = translations[currentLanguage].headerTitle;
        dinnerSuggestionsContainer.appendChild(h1);
    }

    const updateUI = (lang) => {
        if (!translations[lang]) return;
        currentLanguage = lang;
        document.documentElement.lang = lang;

        document.title = translations[lang].siteTitle;

        document.querySelectorAll('[data-lang-key]').forEach(el => {
            const key = el.dataset.langKey;
            if (translations[lang][key]) {
                el.textContent = translations[lang][key];
            }
        });
        
        langKoBtn.classList.toggle('active', lang === 'ko');
        langEnBtn.classList.toggle('active', lang === 'en');

        showInitialMessage();
    };

    const generateDinnerSuggestion = () => {
        const menuList = translations[currentLanguage].dinnerMenu;
        const randomIndex = Math.floor(Math.random() * menuList.length);
        const suggestedMenu = menuList[randomIndex];

        const suggestionElement = document.createElement('div');
        suggestionElement.classList.add('suggestion-card');
        
        const menuTextElement = document.createElement('p');
        menuTextElement.classList.add('suggestion-text');
        menuTextElement.textContent = suggestedMenu;
        
        suggestionElement.appendChild(menuTextElement);
        return suggestionElement;
    };

    generateBtn.addEventListener('click', () => {
        dinnerSuggestionsContainer.innerHTML = '';
        const newSuggestion = generateDinnerSuggestion();
        dinnerSuggestionsContainer.appendChild(newSuggestion);
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