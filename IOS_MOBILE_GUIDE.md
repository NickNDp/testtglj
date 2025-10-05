# 📱 Деплой с iPhone/iPad — Полная инструкция

> ⚠️ **Важно:** Деплой WebApp лучше делать с компьютера (Mac/Windows). Но если у вас только iPhone/iPad — вот инструкция!

---

## Вариант 1: Использовать компьютер друга/коллеги (рекомендуется)

Если у вас есть доступ к любому компьютеру (Mac/Windows/Linux):

1. Скопируйте папку `testTG` на компьютер (через AirDrop, облако, флешку)
2. Следуйте инструкции из файла [DEPLOY_STEP_BY_STEP.md](DEPLOY_STEP_BY_STEP.md)
3. После деплоя просто вставьте URL в bot.js

---

## Вариант 2: Прямо с iPhone/iPad (сложнее)

### Метод А: Через GitHub Mobile App + GitHub.dev

#### Шаг 1: Установка приложений

1. **Установите GitHub Mobile:**
   - Откройте App Store
   - Найдите "GitHub"
   - Установите официальное приложение GitHub
   - Войдите в свой аккаунт (или создайте новый на github.com через Safari)

2. **Установите Working Copy (Git-клиент для iOS):**
   - Откройте App Store
   - Найдите "Working Copy - Git client"
   - Установите (бесплатная версия подойдёт)

#### Шаг 2: Создание репозитория

1. **Откройте Safari:**
   - Перейдите на https://github.com
   - Войдите в аккаунт

2. **Создайте новый репозиторий:**
   - Нажмите "+" вверху → "New repository"
   - **Repository name:** `luckyjet-webapp`
   - **Public** ← обязательно!
   - Нажмите "Create repository"

#### Шаг 3: Загрузка файлов

1. **Откройте репозиторий в браузере:**
   - Перейдите на https://github.com/ваш-username/luckyjet-webapp

2. **Откройте GitHub Web Editor:**
   - Нажмите `.` (точку) на клавиатуре
   - ИЛИ измените URL с `github.com` на `github.dev`:
   ```
   https://github.dev/ваш-username/luckyjet-webapp
   ```
   - Откроется VS Code прямо в браузере!

3. **Создайте папку webapp:**
   - Нажмите на иконку "New Folder" (папка с плюсом)
   - Введите имя: `webapp`
   - Нажмите Enter

4. **Создайте файл index.html:**
   - Нажмите на папку `webapp`
   - Нажмите "New File"
   - Введите имя: `index.html`
   - Откройте файл `testTG/webapp/index.html` на вашем устройстве
   - Скопируйте весь код
   - Вставьте в GitHub.dev
   - Нажмите Cmd+S (сохранить)

5. **Повторите для остальных файлов:**
   - Создайте `style.css` — скопируйте код из `testTG/webapp/style.css`
   - Создайте `script.js` — скопируйте код из `testTG/webapp/script.js`

6. **Закоммитьте изменения:**
   - Слева появится иконка с цифрой (количество изменённых файлов)
   - Нажмите на неё
   - Введите сообщение коммита: "Add LuckyJet WebApp"
   - Нажмите галочку ✓ (Commit & Push)

#### Шаг 4: Включение GitHub Pages

1. **Откройте Safari:**
   - Перейдите на https://github.com/ваш-username/luckyjet-webapp

2. **Откройте Settings:**
   - Нажмите на вкладку "Settings"
   - Пролистайте до "Pages" в левом меню
   - Нажмите "Pages"

3. **Настройте GitHub Pages:**
   - **Source:** "Deploy from a branch"
   - **Branch:** выберите `main` → `/root`
   - Нажмите "Save"

4. **Подождите 1-2 минуты:**
   - Обновите страницу
   - Появится зелёный блок с URL:
   ```
   https://ваш-username.github.io/luckyjet-webapp/
   ```

5. **Ваш WebApp доступен по адресу:**
   ```
   https://ваш-username.github.io/luckyjet-webapp/webapp/index.html
   ```

#### Шаг 5: Обновление bot.js

1. **Откройте GitHub.dev снова:**
   ```
   https://github.dev/ваш-username/luckyjet-webapp
   ```

2. **Создайте файл bot.js** (если его нет):
   - Нажмите "New File"
   - Введите имя: `bot.js`
   - Скопируйте код из вашего `testTG/bot.js`

3. **Найдите строку с URL:**
   ```javascript
   web_app: { url: 'https://ваш-домен.com/webapp/index.html' }
   ```

4. **Замените на ваш реальный URL:**
   ```javascript
   web_app: { url: 'https://ваш-username.github.io/luckyjet-webapp/webapp/index.html' }
   ```

5. **Сохраните:** Cmd+S

6. **Закоммитьте:**
   - Source Control → введите "Update bot URL" → ✓

---

## Метод Б: Через Replit (ещё проще!)

### Что это?

Replit — онлайн-редактор кода. Можно всё сделать прямо в браузере!

### Шаг 1: Регистрация на Replit

1. Откройте Safari → https://replit.com
2. Нажмите "Sign up"
3. Войдите через GitHub (или создайте аккаунт)

### Шаг 2: Создание Repl

1. Нажмите "+ Create Repl"
2. Выберите "HTML, CSS, JS"
3. **Title:** "LuckyJet WebApp"
4. Нажмите "Create Repl"

### Шаг 3: Копирование файлов

1. **Удалите стандартные файлы:**
   - Удалите `index.html`, `style.css`, `script.js` (если есть)

2. **Создайте папку webapp:**
   - Нажмите на три точки рядом с "Files"
   - "Add folder" → введите `webapp`

3. **Создайте файлы внутри webapp:**
   - Нажмите на папку `webapp`
   - "Add file" → `index.html`
   - Скопируйте код из вашего `testTG/webapp/index.html`
   - Повторите для `style.css` и `script.js`

### Шаг 4: Деплой

1. **Нажмите "Run"** (зелёная кнопка вверху)
2. Replit автоматически задеплоит ваш проект
3. Справа появится окно с превью
4. **Ваш URL:**
   ```
   https://luckyjet-webapp.ваш-username.repl.co/webapp/index.html
   ```

5. **Скопируйте этот URL** — он вам понадобится для bot.js

### Шаг 5: Настройка бота

1. В Replit создайте файл `bot.js` в корне
2. Скопируйте код из вашего `testTG/bot.js`
3. Замените URL на Replit URL
4. Создайте файл `.env`:
   ```
   BOT_TOKEN=ваш_токен_от_BotFather
   ```

5. **Запустите бота прямо на Replit:**
   - Создайте файл `package.json` (скопируйте из вашего проекта)
   - В консоли внизу введите:
   ```bash
   npm install
   npm start
   ```

⚠️ **Минус:** Бесплатный Replit засыпает через 1 час неактивности. Для постоянной работы нужен платный план.

---

## Метод В: Через Netlify Drop (самый простой!)

### Шаг 1: Подготовка файлов

1. **Создайте ZIP-архив:**
   - На iPhone: установите приложение "Files" (Файлы)
   - Найдите папку `testTG/webapp`
   - Выберите все 3 файла: `index.html`, `style.css`, `script.js`
   - Нажмите "Compress" (сжать) → создастся `Archive.zip`

### Шаг 2: Деплой на Netlify

1. **Откройте Safari:**
   - Перейдите на https://app.netlify.com/drop

2. **Создайте аккаунт Netlify** (если нет):
   - Можно войти через GitHub
   - Или зарегистрироваться с email

3. **Перетащите ZIP в окно:**
   - На iPhone: нажмите на область "Drag and drop"
   - Выберите "Choose files"
   - Найдите ваш `Archive.zip`
   - Загрузите

4. **Netlify задеплоит автоматически!**
   - Через 1 минуту появится URL:
   ```
   https://random-name-12345.netlify.app
   ```

5. **Ваш WebApp доступен:**
   ```
   https://random-name-12345.netlify.app/index.html
   ```

6. **Скопируйте URL** для bot.js

---

## ⚠️ Важные ограничения iOS

### Что сложно сделать с iPhone/iPad:

1. **Запустить бота локально** — нужен Node.js (на iOS его нет)
2. **Использовать Git через терминал** — на iOS нет встроенного терминала
3. **Редактировать много файлов** — неудобно на маленьком экране

### Что можно:

1. ✅ Задеплоить WebApp (Netlify Drop / GitHub.dev)
2. ✅ Редактировать код через браузер (GitHub.dev)
3. ✅ Тестировать WebApp в Safari
4. ✅ Настроить бота (изменить URL в bot.js)

### Для запуска бота нужен:

- Компьютер (Mac/Windows/Linux)
- ИЛИ VPS сервер (DigitalOcean, AWS, Heroku)
- ИЛИ Replit с платным планом

---

## 🎯 Рекомендация для новичков на iOS

**Лучший путь:**

1. **Деплой WebApp** → используйте **Netlify Drop** (самый простой!)
2. **Редактирование bot.js** → используйте **GitHub.dev** в Safari
3. **Запуск бота** → попросите друга с компьютером или используйте бесплатный VPS (см. ниже)

---

## 💡 Альтернатива: Бесплатный VPS для запуска бота

Если нет компьютера, можно запустить бота на сервере:

### Вариант 1: Railway.app

1. Откройте Safari → https://railway.app
2. Войдите через GitHub
3. "New Project" → "Deploy from GitHub repo"
4. Выберите ваш репозиторий `luckyjet-webapp`
5. Добавьте переменную окружения `BOT_TOKEN`
6. Railway автоматически запустит бота!

**Бесплатно:** 500 часов в месяц

### Вариант 2: Render.com

1. Откройте Safari → https://render.com
2. Войдите через GitHub
3. "New +" → "Web Service"
4. Выберите репозиторий
5. **Build Command:** `npm install`
6. **Start Command:** `npm start`
7. Добавьте `BOT_TOKEN` в Environment Variables
8. "Create Web Service"

**Бесплатно:** навсегда (с ограничениями)

---

## ✅ Краткий чек-лист для iOS

**Что нужно сделать:**

- [ ] Создать GitHub аккаунт (Safari)
- [ ] Создать репозиторий (Safari)
- [ ] Загрузить файлы WebApp (GitHub.dev или Netlify Drop)
- [ ] Включить GitHub Pages / получить Netlify URL
- [ ] Обновить URL в bot.js (GitHub.dev)
- [ ] Запустить бота (компьютер / VPS / Replit)
- [ ] Протестировать в Telegram

**Время:** 30-60 минут

---

## 📞 Нужна помощь?

Если что-то не получилось:

1. Проверьте, что все файлы на месте
2. Убедитесь, что URL правильный (с `/webapp/index.html`)
3. Проверьте, что GitHub Pages включён
4. Подождите 2-3 минуты после деплоя

**Помните:** С компьютера это сделать гораздо проще! Если есть возможность — попросите друга помочь.

---

**Удачи! 🚀📱**
