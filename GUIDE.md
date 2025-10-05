# Руководство по созданию и публикации Telegram бота

## Структура проекта

```
testTG/
├── bot.js          # Основной файл бота
├── package.json    # Зависимости проекта
├── .env           # Токен бота (не коммитится в git)
├── .gitignore     # Игнорируемые файлы
├── GUIDE.md       # Это руководство
└── webapp/        # Веб-приложение LuckyJet
    ├── index.html  # Главная страница WebApp
    ├── style.css   # Стили приложения
    └── script.js   # Логика игры
```

## Шаг 1: Создание бота в Telegram

1. Откройте Telegram и найдите бота **@BotFather**
2. Отправьте команду `/newbot`
3. Следуйте инструкциям:
   - Введите имя бота (например: "Мой Тестовый Бот")
   - Введите username бота (должен заканчиваться на `bot`, например: `my_test_bot`)
4. BotFather даст вам **токен** - длинную строку вида `1234567890:ABCdefGHIjklMNOpqrsTUVwxyz`
5. **ВАЖНО:** Сохраните этот токен! Он понадобится для запуска бота

## Шаг 2: Настройка проекта

### 2.1 Установите Node.js
- Скачайте с [nodejs.org](https://nodejs.org/) (версию LTS)
- Установите на компьютер

### 2.2 Установите зависимости
Откройте терминал в папке `testTG` и выполните:
```bash
npm install
```

### 2.3 Настройте токен
1. Откройте файл `.env`
2. Замените `YOUR_BOT_TOKEN_HERE` на токен от BotFather:
```
BOT_TOKEN=1234567890:ABCdefGHIjklMNOpqrsTUVwxyz
```

## Шаг 3: Запуск бота локально

### Запуск:
```bash
npm start
```

### Запуск с автоперезагрузкой (для разработки):
```bash
npm run dev
```

Вы увидите сообщение "Бот запущен..."

## Шаг 4: Тестирование бота

1. Откройте Telegram
2. Найдите вашего бота по username
3. Нажмите "Start" или отправьте `/start`
4. Попробуйте команды:
   - `/start` - приветствие и список команд
   - `/help` - справка
   - `/info` - информация о боте
   - `/echo привет` - бот повторит "привет"

## Шаг 5: Публикация бота (деплой)

### Вариант А: Бесплатный хостинг на Render.com

1. **Зарегистрируйтесь на Render.com:**
   - Перейдите на [render.com](https://render.com)
   - Создайте аккаунт (можно через GitHub)

2. **Создайте Git-репозиторий:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```
   - Создайте репозиторий на GitHub
   - Загрузите код:
   ```bash
   git remote add origin https://github.com/ваш-username/ваш-repo.git
   git push -u origin main
   ```

3. **Деплой на Render:**
   - В панели Render нажмите "New +" → "Web Service"
   - Подключите GitHub репозиторий
   - Настройки:
     - **Name:** название вашего сервиса
     - **Environment:** Node
     - **Build Command:** `npm install`
     - **Start Command:** `npm start`
     - **Plan:** Free
   - В разделе "Environment Variables" добавьте:
     - Key: `BOT_TOKEN`
     - Value: ваш токен от BotFather
   - Нажмите "Create Web Service"

4. **Ожидайте деплоя:**
   - Render автоматически установит зависимости и запустит бота
   - Через 2-3 минуты бот будет работать 24/7

### Вариант Б: Хостинг на VPS (DigitalOcean, AWS, и др.)

1. **Создайте сервер:**
   - Арендуйте VPS с Ubuntu
   - Подключитесь по SSH

2. **Установите Node.js:**
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

3. **Загрузите код:**
   ```bash
   git clone https://github.com/ваш-username/ваш-repo.git
   cd ваш-repo
   npm install
   ```

4. **Создайте .env файл:**
   ```bash
   nano .env
   # Вставьте BOT_TOKEN=ваш_токен
   # Сохраните: Ctrl+X, Y, Enter
   ```

5. **Запустите с PM2 (для постоянной работы):**
   ```bash
   sudo npm install -g pm2
   pm2 start bot.js --name telegram-bot
   pm2 startup
   pm2 save
   ```

### Вариант В: Railway.app (тоже бесплатно)

1. Зайдите на [railway.app](https://railway.app)
2. Подключите GitHub репозиторий
3. Добавьте переменную окружения `BOT_TOKEN`
4. Railway автоматически задеплоит бота

## Шаг 6: Настройка бота (опционально)

### Установка команд в меню Telegram:
Отправьте BotFather команду `/setcommands`, выберите вашего бота и отправьте:
```
start - Начать работу с ботом
help - Показать справку
info - Информация о боте
echo - Повторить текст
```

### Установка описания:
```
/setdescription - краткое описание бота
/setabouttext - расширенное описание
```

## Решение проблем

### Бот не отвечает:
- Проверьте правильность токена в `.env`
- Убедитесь, что процесс запущен (`npm start` работает без ошибок)
- Проверьте логи на хостинге

### Ошибка "polling_error":
- Убедитесь, что бот запущен только в одном месте (не запускайте локально и на хостинге одновременно)

### Ошибка установки зависимостей:
- Обновите npm: `npm install -g npm@latest`
- Удалите `node_modules` и переустановите: `rm -rf node_modules && npm install`

## Следующие шаги

1. **Добавьте новые функции:**
   - Кнопки (inline keyboard)
   - Отправку изображений
   - Работу с базой данных
   - Обработку файлов

2. **Улучшите код:**
   - Разделите на модули
   - Добавьте обработку ошибок
   - Настройте логирование

3. **Изучите документацию:**
   - [node-telegram-bot-api](https://github.com/yagop/node-telegram-bot-api)
   - [Telegram Bot API](https://core.telegram.org/bots/api)

## Полезные ссылки

- 📚 [Официальная документация Telegram Bot API](https://core.telegram.org/bots)
- 🔧 [node-telegram-bot-api на GitHub](https://github.com/yagop/node-telegram-bot-api)
- 💡 [Примеры ботов](https://github.com/yagop/node-telegram-bot-api/tree/master/examples)
- 🚀 [Render.com документация](https://render.com/docs)

## Безопасность

⚠️ **ВАЖНО:**
- Никогда не публикуйте токен бота
- Не коммитьте `.env` в git (он уже в `.gitignore`)
- Регулярно обновляйте зависимости: `npm update`
- Используйте переменные окружения на хостинге

---

**Удачи с вашим ботом! 🤖**
