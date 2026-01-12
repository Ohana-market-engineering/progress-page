// Главный скрипт приложения

document.addEventListener('DOMContentLoaded', () => {
    initProgressBar();
    initQuoteRotation();
    initCommitLog();
});

/**
 * Прогресс бар, который никогда не дойдёт до 100%
 * Чем ближе к концу - тем медленнее
 */
function initProgressBar() {
    const progressFill = document.getElementById('progress');
    const percentText = document.getElementById('percent');
    let progress = 0;

    function updateProgress() {
        // Асимптотическое приближение к 99%
        // Чем ближе к цели, тем медленнее
        const remaining = 99 - progress;
        const increment = remaining * 0.02 * Math.random();

        progress += increment;

        // Никогда не достигнем 99%
        if (progress > 98.9) {
            progress = 98.9;
        }

        progressFill.style.width = progress + '%';
        percentText.textContent = progress.toFixed(1);

        // Иногда откатываемся назад (как в реальной разработке)
        if (Math.random() < 0.05 && progress > 50) {
            progress -= Math.random() * 10;
            showGlitchEffect();
        }

        setTimeout(updateProgress, 100 + Math.random() * 200);
    }

    updateProgress();
}

/**
 * Ротация мемных цитат
 */
function initQuoteRotation() {
    const quoteElement = document.getElementById('quote');
    const authorElement = document.querySelector('.author');
    let currentIndex = 0;

    function showNextQuote() {
        // Плавное исчезновение
        quoteElement.style.opacity = '0';

        setTimeout(() => {
            currentIndex = (currentIndex + 1) % window.devQuotes.length;
            const quote = window.devQuotes[currentIndex];

            quoteElement.textContent = quote.quote;
            authorElement.textContent = quote.author;

            // Плавное появление
            quoteElement.style.opacity = '1';
        }, 500);
    }

    // Меняем цитату каждые 5 секунд
    setInterval(showNextQuote, 5000);
}

/**
 * Отображение фейковых коммитов
 */
function initCommitLog() {
    const commitList = document.getElementById('commits');

    window.fakeCommits.forEach(commit => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span class="commit-hash">${commit.hash}</span>
            <span class="commit-msg">${commit.msg}</span>
            <span class="commit-time">${commit.time}</span>
        `;
        commitList.appendChild(li);
    });
}

/**
 * Эффект глитча при откате прогресса
 */
function showGlitchEffect() {
    const container = document.querySelector('.container');
    container.style.animation = 'none';
    container.offsetHeight; // Триггер reflow
    container.style.animation = 'shake 0.5s ease';
}

// Добавляем анимацию shake
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-10px); }
        75% { transform: translateX(10px); }
    }
`;
document.head.appendChild(style);

// Консольное пасхальное яйцо
console.log('%c🚀 Ого, ты открыл консоль!', 'font-size: 20px; color: #00fff9;');
console.log('%cДобро пожаловать, любопытный разработчик!', 'font-size: 14px; color: #ff00de;');
console.log('%c// TODO: убрать это перед релизом', 'font-size: 12px; color: #888;');
