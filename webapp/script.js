// Инициализация Telegram WebApp
let tg = window.Telegram.WebApp;
tg.ready();
tg.expand();

// Игровые переменные
let rounds = 0;
let bestCoefficient = 0;
let clickCounter = 0;
let skipNextTurn = false;
let countdownInterval = null;

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
const timerEl = document.getElementById('timer');
const timerValueEl = document.getElementById('timerValue');

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

    if (random < 70) {
        // 70% - Обычные (1.1-1.6)
        return {
            value: (Math.random() * 0.5 + 1.1).toFixed(2),
            message: "Неплохо! 😊",
            type: "normal"
        };
    } else if (random < 88) {
        // 18% - Хорошие (1.6-2.2)
        return {
            value: (Math.random() * 0.6 + 1.6).toFixed(2),
            message: "Отличный результат! 🎉",
            type: "good"
        };
    } else if (random < 95) {
        // 7% - Редкие (2.2-3.0)
        return {
            value: (Math.random() * 0.8 + 2.2).toFixed(2),
            message: "Редкая удача! 🌟",
            type: "rare"
        };
    } else {
        // 5% - Супер редкие (3.0-5.2)
        return {
            value: (Math.random() * 2.2 + 3.0).toFixed(2),
            message: "ДЖЕКПОТ! ТЫ ВЕЗУНЧИК! 🎰💎",
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

// Генерация случайного зигзагообразного пути
function generateRandomPath() {
    const startX = 20;
    const startY = 240;
    const endX = 320;
    const endY = 30;

    // Генерируем 3-4 случайные точки для зигзагов
    const points = [];
    const numPoints = 3 + Math.floor(Math.random() * 2); // 3 или 4 точки

    for (let i = 1; i <= numPoints; i++) {
        const x = startX + (endX - startX) * (i / (numPoints + 1));
        const y = startY - (startY - endY) * (i / (numPoints + 1)) + (Math.random() * 60 - 30); // ±30 пикселей случайного отклонения
        points.push({ x, y });
    }

    // Создаём SVG путь с квадратичными кривыми Безье
    let path = `M ${startX} ${startY}`;

    for (let i = 0; i < points.length; i++) {
        if (i === 0) {
            path += ` Q ${points[i].x} ${points[i].y}`;
        } else {
            path += `, ${points[i].x} ${points[i].y}`;
        }

        // Добавляем следующую точку как конечную для текущей кривой
        if (i < points.length - 1) {
            const midX = (points[i].x + points[i + 1].x) / 2;
            const midY = (points[i].y + points[i + 1].y) / 2;
            path += ` ${midX} ${midY} Q`;
        }
    }

    path += ` ${endX} ${endY}`;

    return path;
}

// Анимация самолётика
function animatePlane() {
    return new Promise((resolve) => {
        // Генерируем новый случайный путь
        const newPath = generateRandomPath();
        const pathElement = document.getElementById('flightPath');
        pathElement.setAttribute('d', newPath);

        // Показываем самолётик
        planeEl.setAttribute('opacity', '1');

        // Перезапускаем анимацию
        const animateMotion = planeEl.querySelector('animateMotion');
        animateMotion.beginElement();

        // Скрываем после анимации (увеличено до 2 секунд)
        setTimeout(() => {
            planeEl.setAttribute('opacity', '0');
            resolve();
        }, 2000);
    });
}

// Таймер обратного отсчёта
function startCountdown(seconds) {
    return new Promise((resolve) => {
        let timeLeft = seconds;

        // Показываем таймер
        timerEl.style.display = 'flex';
        timerValueEl.textContent = timeLeft;

        // Блокируем кнопку
        actionBtn.disabled = true;

        // Запускаем отсчёт
        countdownInterval = setInterval(() => {
            timeLeft--;
            timerValueEl.textContent = timeLeft;

            // Вибрация каждую секунду
            if (tg.HapticFeedback && timeLeft > 0) {
                tg.HapticFeedback.impactOccurred('light');
            }

            if (timeLeft <= 0) {
                clearInterval(countdownInterval);
                timerEl.style.display = 'none';
                actionBtn.disabled = false;
                resolve();
            }
        }, 1000);
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

        // Запускаем 10-секундный таймер
        await startCountdown(10);

        // После окончания таймера сбрасываем сообщение
        updateResult('0.00x', 'Нажми "Получить"', 'normal');
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
