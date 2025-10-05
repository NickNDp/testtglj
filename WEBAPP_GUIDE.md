# Руководство по LuckyJet WebApp 🛫

## Описание проекта

**LuckyJet** — это мини-игра в стиле лутбоксов, интегрированная в Telegram через WebApp API. Игра имитирует механику случайных коэффициентов с разными уровнями редкости.

## Что реализовано

### ✅ Основной функционал

1. **Генерация коэффициентов с вероятностями:**
   - 50% — обычные (1.10–1.80) → "Не рискуй!"
   - 35% — рискованные (2.5–5.0) → "Очень хороший коэффициент!"
   - 12% — редкие (5–10) → "Редкий шанс!"
   - 3% — супер редкие (10–20) → "Ты везунчик!"

2. **Механика пропуска хода:**
   - Каждые 2-5 кликов может выпасть "❌ Пропусти данный ход"
   - Сообщение: "⏳ Ожидай следующий раунд…"

3. **SVG-анимация самолётика:**
   - Самолётик пролетает по кривой при каждом клике
   - Длительность анимации: 1.5 секунды

4. **Telegram WebApp API:**
   - Полная интеграция с Telegram
   - Haptic Feedback (вибрация)
   - MainButton для закрытия
   - Адаптация под тему Telegram

### 🎨 Дизайн

- **Цветовая схема:**
  - Фон: `#121212` (тёмный)
  - Акценты: `#00ffcc` (бирюзовый), `#ff9f00` (оранжевый)
  - Градиенты на всех важных элементах

- **Анимации:**
  - Анимированный фон с облаками
  - Pulse-эффект для результатов
  - Bounce-эффект для логотипа
  - Плавные переходы между экранами

- **Неоновые эффекты:**
  - Кнопки с неоновым свечением
  - Box-shadow для создания эффекта глубины
  - Разные цвета рамок для разных типов результатов

### 📱 Адаптивность

- Полностью адаптировано под мобильные экраны
- Оптимизировано для Telegram Mini Apps
- Responsive дизайн для всех размеров экранов

## Структура файлов

```
webapp/
├── index.html  # Структура приложения (стартовый и игровой экраны)
├── style.css   # Все стили и анимации
└── script.js   # Логика игры и интеграция с Telegram
```

## Как работает логика

### 1. Генерация коэффициентов ([script.js:50-73](script.js))

```javascript
function generateCoefficient() {
  const random = Math.random() * 100;

  if (random < 50) return { value: 1.10-1.80, type: "normal" };
  if (random < 85) return { value: 2.5-5.0, type: "good" };
  if (random < 97) return { value: 5-10, type: "rare" };
  return { value: 10-20, type: "super-rare" };
}
```

### 2. Пропуск хода ([script.js:76-92](script.js))

Счётчик кликов увеличивается при каждом нажатии. После 2 кликов появляется 20% шанс пропуска хода. После 5 кликов счётчик сбрасывается.

### 3. Анимация самолётика ([script.js:95-108](script.js))

Использует SVG `<animateMotion>` для движения по кривой Безье. Самолётик появляется, пролетает и исчезает.

## Как запустить локально

### Вариант 1: Live Server (VS Code)

1. Установите расширение **Live Server** в VS Code
2. Откройте файл [index.html](index.html)
3. Нажмите правой кнопкой → "Open with Live Server"
4. Откройте в браузере с эмулятором Telegram WebApp

### Вариант 2: Python HTTP Server

```bash
cd testTG/webapp
python -m http.server 8000
```

Откройте: `http://localhost:8000`

### Вариант 3: Node.js http-server

```bash
npm install -g http-server
cd testTG/webapp
http-server -p 8000
```

## Деплой WebApp (публикация в интернет)

### ⭐ Рекомендуемый способ: GitHub Pages (бесплатно)

1. **Создайте репозиторий на GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Add LuckyJet WebApp"
   git branch -M main
   git remote add origin https://github.com/ваш-username/luckyjet.git
   git push -u origin main
   ```

2. **Включите GitHub Pages:**
   - Зайдите в Settings → Pages
   - Source: Deploy from a branch
   - Branch: `main` → папка `/root` (или `/webapp` если настроите)
   - Нажмите Save

3. **Ваш URL будет:**
   ```
   https://ваш-username.github.io/luckyjet/webapp/index.html
   ```

4. **Обновите bot.js:**
   Замените URL в [bot.js:64](bot.js) на ваш GitHub Pages URL:
   ```javascript
   web_app: { url: 'https://ваш-username.github.io/luckyjet/webapp/index.html' }
   ```

### Альтернатива 1: Vercel

1. Установите Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Задеплойте:
   ```bash
   cd testTG/webapp
   vercel
   ```

3. Vercel даст вам URL вида: `https://your-app.vercel.app`

### Альтернатива 2: Netlify

1. Зайдите на [netlify.com](https://netlify.com)
2. Перетащите папку `webapp` в Netlify Drop
3. Получите URL вида: `https://your-app.netlify.app`

### Альтернатива 3: Cloudflare Pages

1. Создайте аккаунт на [pages.cloudflare.com](https://pages.cloudflare.com)
2. Подключите GitHub репозиторий
3. Укажите папку `webapp` для деплоя
4. Получите URL вида: `https://your-app.pages.dev`

## Интеграция с ботом

### 1. Обновите URL в bot.js

После деплоя WebApp замените URL в [bot.js:64](bot.js):

```javascript
bot.onText(/\/play/, (msg) => {
  const chatId = msg.chat.id;

  bot.sendMessage(chatId, '🎰 Запускаю LuckyJet! 🛫', {
    reply_markup: {
      inline_keyboard: [[
        {
          text: '🚀 ИГРАТЬ',
          web_app: { url: 'https://ваш-домен.com/webapp/index.html' }
        }
      ]]
    }
  });
});
```

### 2. Настройте Menu Button (опционально)

Отправьте BotFather команду `/setmenubutton` и укажите:
- Text: "🎰 Играть"
- URL: ваш URL WebApp

Теперь кнопка игры появится в меню бота!

### 3. Запустите бота

```bash
cd testTG
npm install
npm start
```

## Тестирование в Telegram

1. Найдите вашего бота в Telegram
2. Отправьте `/play`
3. Нажмите кнопку "🚀 ИГРАТЬ"
4. WebApp откроется внутри Telegram
5. Нажмите "НАЧАТЬ" и играйте!

## Функции Telegram WebApp API

### Использованные возможности:

- `tg.ready()` — инициализация
- `tg.expand()` — развернуть на весь экран
- `tg.HapticFeedback` — вибрация:
  - `impactOccurred('light')` — лёгкая вибрация
  - `impactOccurred('medium')` — средняя вибрация
  - `notificationOccurred('success')` — вибрация успеха
  - `notificationOccurred('warning')` — вибрация предупреждения
- `tg.MainButton` — кнопка "Закрыть"
- `tg.themeParams` — цвета темы Telegram
- `tg.sendData()` — отправка данных боту (закомментировано)

### Дополнительные возможности (можно добавить):

- `tg.BackButton` — кнопка назад
- `tg.CloudStorage` — хранилище данных
- `tg.initDataUnsafe.user` — данные пользователя
- `tg.showPopup()` — всплывающие окна
- `tg.showAlert()` — алерты

## Кастомизация

### Изменить вероятности

Откройте [script.js:50-73](script.js) и измените условия:

```javascript
if (random < 50) // Измените 50 на нужный процент
```

### Изменить диапазоны коэффициентов

```javascript
value: (Math.random() * 0.7 + 1.1).toFixed(2)
//      ├─────────────┘   └──┘
//      диапазон (0.7)    минимум (1.1)
```

### Изменить цвета

Откройте [style.css](style.css) и замените:
- `#00ffcc` (бирюзовый)
- `#ff9f00` (оранжевый)
- `#121212` (фон)

### Изменить анимацию самолётика

В [index.html:25](index.html) измените path кривой:

```html
<path id="flightPath" d="M 20 180 Q 100 50, 280 20"/>
<!-- M x1 y1 - начало, Q x2 y2 - контроль, x3 y3 - конец -->
```

## Решение проблем

### WebApp не открывается:

1. Проверьте, что URL доступен по HTTPS
2. Убедитесь, что URL правильный в bot.js
3. Telegram требует HTTPS для WebApp (локальный HTTP не работает)

### Анимация не работает:

1. Откройте DevTools браузера
2. Проверьте Console на ошибки
3. Убедитесь, что SVG правильно загрузился

### Вибрация не работает:

Вибрация работает только в Telegram, не в браузере!

### Не работает MainButton:

Проверьте, что скрипт Telegram WebApp загружен:
```html
<script src="https://telegram.org/js/telegram-web-app.js"></script>
```

## Дальнейшее развитие

### Идеи для улучшения:

1. **Добавить таблицу лидеров:**
   - Использовать `tg.CloudStorage` для хранения
   - Отображать лучшие результаты

2. **Добавить звуки:**
   - Звук взлёта самолёта
   - Звук выигрыша для редких коэффициентов

3. **Добавить историю игр:**
   - Показывать последние 10 результатов
   - График коэффициентов

4. **Система достижений:**
   - "10 раундов подряд"
   - "Получил супер редкий 5 раз"
   - Бейджи и награды

5. **Мультиплеер:**
   - Соревнование с друзьями
   - Общая таблица результатов

6. **Ставки (виртуальные монеты):**
   - Система монет
   - Ставки и выигрыши

## Полезные ссылки

- 📚 [Telegram WebApp Documentation](https://core.telegram.org/bots/webapps)
- 🎨 [CSS Animations Guide](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations)
- 🖼️ [SVG Animation Tutorial](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/animateMotion)
- 🚀 [GitHub Pages Guide](https://pages.github.com/)
- ⚡ [Vercel Documentation](https://vercel.com/docs)

---

**Приятной игры! 🎰🛫**
