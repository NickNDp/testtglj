// Инициализация Telegram WebApp
let tg = window.Telegram.WebApp;
tg.ready();
tg.expand();

// Игровые переменные
let rounds = 0;
let bestCoefficient = 0;
let clickCounter = 0;
let skipNextTurn = false;

// Элементы DOM
const startScreen = document.getElementById('startScreen');
const gameScreen = document.getElementById('gameScreen');
const coefficientEl = document.getElementById('coefficient');
const messageEl = document.getElementById('message');
const roundsEl = document.getElementById('rounds');
const bestCoefEl = document.getElementById('bestCoef');
const actionBtn = document.getElementById('actionBtn');
const resultBox = document.getElementById('result');
const planeEl = document.getElementById('plane');

// Запуск игры
function startGame() {
    startScreen.classList.remove('active');
    gameScreen.classList.add('active');

    // Уведомление Telegram
    if (tg.HapticFeedback) {
        tg.HapticFeedback.impactOccurred('light');
    }
}

// Генерация случайного коэффициента с вероятностями
function generateCoefficient() {
    const random = Math.random() * 100;

    if (random < 50) {
        // 50% - Обычные (1.10-1.80)
        return {
            value: (Math.random() * 0.7 + 1.1).toFixed(2),
            message: "Не рискуй!",
            type: "normal"
        };
    } else if (random < 85) {
        // 35% - Рискованные (2.5-5.0)
        return {
            value: (Math.random() * 2.5 + 2.5).toFixed(2),
            message: "Очень хороший коэффициент!",
            type: "good"
        };
    } else if (random < 97) {
        // 12% - Редкие (5-10)
        return {
            value: (Math.random() * 5 + 5).toFixed(2),
            message: "Редкий шанс!",
            type: "rare"
        };
    } else {
        // 3% - Супер редкие (10-20)
        return {
            value: (Math.random() * 10 + 10).toFixed(2),
            message: "Ты везунчик!",
            type: "super-rare"
        };
    }
}

// Проверка пропуска хода
function shouldSkipTurn() {
    clickCounter++;

    // Каждые 2-5 кликов случайный шанс пропустить ход
    if (clickCounter >= 2) {
        const skipChance = Math.random() * 100;
        if (skipChance < 20) { // 20% шанс после 2-5 кликов
            clickCounter = 0;
            return true;
        }
    }

    if (clickCounter >= 5) {
        clickCounter = 0;
    }

    return false;
}

// Анимация самолётика
function animatePlane() {
    return new Promise((resolve) => {
        // Показываем самолётик
        planeEl.setAttribute('opacity', '1');

        // Перезапускаем анимацию
        const animateMotion = planeEl.querySelector('animateMotion');
        animateMotion.beginElement();

        // Скрываем после анимации
        setTimeout(() => {
            planeEl.setAttribute('opacity', '0');
            resolve();
        }, 1500);
    });
}

// Обновление UI результата
function updateResult(coefficient, message, type) {
    // Убираем предыдущие классы
    resultBox.className = 'result-box';
    messageEl.className = 'message';

    // Добавляем новый класс типа
    resultBox.classList.add(type);

    if (type === 'skip') {
        messageEl.classList.add('skip');
    }

    // Обновляем текст
    coefficientEl.textContent = coefficient;
    messageEl.textContent = message;

    // Триггерим анимацию pulse
    coefficientEl.style.animation = 'none';
    setTimeout(() => {
        coefficientEl.style.animation = 'pulse 0.5s ease';
    }, 10);
}

// Обновление статистики
function updateStats() {
    roundsEl.textContent = rounds;
    bestCoefEl.textContent = bestCoefficient.toFixed(2) + 'x';
}

// Основная функция раунда
async function playRound() {
    // Блокируем кнопку
    actionBtn.disabled = true;

    // Вибрация
    if (tg.HapticFeedback) {
        tg.HapticFeedback.impactOccurred('medium');
    }

    // Анимация самолётика
    await animatePlane();

    // Проверяем пропуск хода
    if (shouldSkipTurn()) {
        updateResult('❌', '⏳ Ожидай следующий раунд…', 'skip');

        if (tg.HapticFeedback) {
            tg.HapticFeedback.notificationOccurred('warning');
        }

        actionBtn.disabled = false;
        return;
    }

    // Генерируем результат
    const result = generateCoefficient();
    const coefValue = parseFloat(result.value);

    // Обновляем статистику
    rounds++;
    if (coefValue > bestCoefficient) {
        bestCoefficient = coefValue;
    }
    updateStats();

    // Показываем результат
    updateResult(result.value + 'x', result.message, result.type);

    // Вибрация в зависимости от результата
    if (tg.HapticFeedback) {
        if (result.type === 'super-rare') {
            tg.HapticFeedback.notificationOccurred('success');
        } else if (result.type === 'rare') {
            tg.HapticFeedback.notificationOccurred('success');
        } else {
            tg.HapticFeedback.impactOccurred('light');
        }
    }

    // Отправляем данные в Telegram (опционально)
    if (result.type === 'super-rare' || result.type === 'rare') {
        const data = JSON.stringify({
            coefficient: result.value,
            type: result.type,
            rounds: rounds
        });
        // tg.sendData(data); // Раскомментируйте для отправки данных боту
    }

    // Разблокируем кнопку
    actionBtn.disabled = false;
}

// Настройка цветовой темы Telegram
if (tg.themeParams) {
    document.body.style.backgroundColor = tg.themeParams.bg_color || '#121212';
}

// Обработка закрытия приложения
tg.onEvent('mainButtonClicked', () => {
    tg.close();
});

// Показываем кнопку "Закрыть" в Telegram
tg.MainButton.setText('Закрыть');
tg.MainButton.show();
tg.MainButton.onClick(() => {
    tg.close();
});
