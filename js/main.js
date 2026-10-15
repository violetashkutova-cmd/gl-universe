// --- Логіка збереження та перемикання тем на всіх сторінках ---
const themeToggleBtn = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;

// 1. Перевіряємо, чи була збережена тема в пам'яті браузера раніше
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    htmlElement.setAttribute('data-theme', savedTheme);
} else {
    // Якщо нічого не збережено, за замовчуванням ставимо темну
    htmlElement.setAttribute('data-theme', 'dark');
}

// 2. Оновлюємо іконку кнопки відповідно до поточної теми
function updateThemeIcon() {
    if (themeToggleBtn) {
        if (htmlElement.getAttribute('data-theme') === 'dark') {
            themeToggleBtn.textContent = '☀️';
        } else {
            themeToggleBtn.textContent = '🌙';
        }
    }
}

updateThemeIcon();

// 3. При кліку перемикаємо тему і ЗБЕРІГАЄМО її в пам'яті браузера
if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        
        if (currentTheme === 'light') {
            htmlElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark'); // Запам'ятовуємо темну
        } else {
            htmlElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light'); // Запам'ятовуємо світлу
        }
        
        updateThemeIcon();
    });
}

// --- Універсальна логіка фільтрації та пошуку ---
const filterButtons = document.querySelectorAll('.filter-btn');
const cards = document.querySelectorAll('.card');
const searchInput = document.getElementById('search-input');

function filterCards() {
    const activeBtn = document.querySelector('.filter-btn.active');
    const filterValue = activeBtn ? activeBtn.getAttribute('data-filter') : 'all';
    const searchText = searchInput ? searchInput.value.toLowerCase().trim() : '';

    cards.forEach(card => {
        const cardYear = card.getAttribute('data-year') || '';
        const cardCompany = card.getAttribute('data-company') || '';
        const titleElement = card.querySelector('h3');
        const cardTitle = titleElement ? titleElement.textContent.toLowerCase() : '';
        const cardSubtitle = card.querySelector('.card-year') ? card.querySelector('.card-year').textContent.toLowerCase() : '';

        const matchesFilter = (filterValue === 'all' || cardYear === filterValue || cardCompany === filterValue);
        const matchesSearch = cardTitle.includes(searchText) || cardSubtitle.includes(searchText);

        if (matchesFilter && matchesSearch) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
}

if (filterButtons.length > 0) {
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            filterCards();
        });
    });
}

if (searchInput) {
    searchInput.addEventListener('input', filterCards);
}
