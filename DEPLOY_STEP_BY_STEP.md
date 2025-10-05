# 🚀 Деплой WebApp — Пошаговая инструкция для новичков

## Выбираем GitHub Pages (бесплатно навсегда!)

---

## ШАГ 1: Установка Git на компьютер

### Для Windows:

1. **Скачайте Git:**
   - Откройте сайт: https://git-scm.com/download/win
   - Скачается файл типа `Git-2.43.0-64-bit.exe`

2. **Установите Git:**
   - Запустите скачанный файл
   - Нажимайте "Next" везде (оставьте настройки по умолчанию)
   - На шаге "Choosing the default editor" можете выбрать "Use Visual Studio Code" если у вас установлен VS Code
   - Дождитесь завершения установки

3. **Проверьте установку:**
   - Откройте командную строку (Win+R → введите `cmd` → Enter)
   - Введите команду:
   ```bash
   git --version
   ```
   - Должно показать что-то вроде `git version 2.43.0`

### Для Mac (macOS):

1. **Откройте Terminal (Терминал):**
   - Нажмите Cmd+Space (откроется Spotlight)
   - Наберите "Terminal" или "Терминал"
   - Нажмите Enter

2. **Проверьте установлен ли Git:**
   ```bash
   git --version
   ```

3. **Если Git не установлен:**
   - Появится окно с текстом: "The 'git' command requires the command line developer tools"
   - Нажмите кнопку "Install" (Установить)
   - Дождитесь окончания установки (может занять 5-10 минут)
   - После установки снова введите `git --version` — должна показаться версия

### Для Linux:

```bash
sudo apt-get update
sudo apt-get install git
```

---

## ШАГ 2: Регистрация на GitHub

1. **Откройте сайт GitHub:**
   - Перейдите на https://github.com

2. **Создайте аккаунт:**
   - Нажмите "Sign up" (вверху справа)
   - Введите email
   - Придумайте пароль
   - Придумайте username (например: `ivanov_dev` или `cool_coder_2024`)
   - Нажмите "Create account"

3. **Подтвердите email:**
   - Зайдите в вашу почту
   - Откройте письмо от GitHub
   - Нажмите на ссылку подтверждения

4. **Запомните ваш username!** Он понадобится дальше.

---

## ШАГ 3: Создание репозитория на GitHub

1. **Войдите в GitHub:**
   - Откройте https://github.com
   - Нажмите "Sign in" если не вошли автоматически

2. **Создайте новый репозиторий:**
   - Нажмите кнопку "+" вверху справа
   - Выберите "New repository"

3. **Заполните форму:**
   - **Repository name:** `luckyjet-webapp` (или любое другое имя)
   - **Description:** "LuckyJet Telegram WebApp Game" (можно пропустить)
   - **Public** ← ВАЖНО! Оставьте отмеченным "Public"
   - **НЕ СТАВЬТЕ галочку** "Add a README file"
   - Нажмите зелёную кнопку "Create repository"

4. **Запомните название репозитория!** (например: `luckyjet-webapp`)

---

## ШАГ 4: Настройка Git на вашем компьютере (первый раз)

Откройте командную строку (Windows: Win+R → `cmd`, Mac/Linux: Terminal)

1. **Установите ваше имя:**
   ```bash
   git config --global user.name "Ваше Имя"
   ```
   Пример:
   ```bash
   git config --global user.name "Ivan Ivanov"
   ```

2. **Установите ваш email:**
   ```bash
   git config --global user.email "ваш-email@example.com"
   ```
   Пример (используйте тот же email, что на GitHub):
   ```bash
   git config --global user.email "ivan@gmail.com"
   ```

---

## ШАГ 5: Загрузка проекта на GitHub

1. **Откройте командную строку в папке проекта:**

   **Способ 1 (Windows):**
   - Откройте папку `e:\Claude\testTG` в Проводнике
   - В адресной строке (где путь) напишите `cmd` и нажмите Enter
   - Откроется командная строка в этой папке

   **Способ 1 (Mac):**
   - Откройте Finder
   - Найдите папку с проектом `testTG`
   - Щёлкните правой кнопкой мыши по папке → "Новый терминал в папке"
   - Если нет такой опции: откройте Terminal и введите:
   ```bash
   cd ~/путь/к/папке/testTG
   ```
   (перетащите папку из Finder в Terminal после `cd ` — путь вставится автоматически)

   **Способ 2 (любая ОС):**
   - Откройте командную строку / Terminal
   - Введите:
   ```bash
   cd /путь/к/вашей/папке/testTG
   ```

   **Для Windows:**
   ```bash
   cd e:\Claude\testTG
   ```

   **Для Mac (пример):**
   ```bash
   cd ~/Documents/testTG
   ```

2. **Инициализируйте Git:**
   ```bash
   git init
   ```
   Появится: "Initialized empty Git repository..."

3. **Добавьте все файлы:**
   ```bash
   git add .
   ```
   (точка в конце обязательна!)

4. **Создайте первый коммит:**
   ```bash
   git commit -m "Initial commit - LuckyJet WebApp"
   ```
   Появится информация о добавленных файлах

5. **Переименуйте ветку в main:**
   ```bash
   git branch -M main
   ```

6. **Подключите GitHub репозиторий:**

   ⚠️ **ВАЖНО!** Замените `ваш-username` и `luckyjet-webapp` на ваши данные:

   ```bash
   git remote add origin https://github.com/ваш-username/luckyjet-webapp.git
   ```

   **Пример:**
   ```bash
   git remote add origin https://github.com/ivanov_dev/luckyjet-webapp.git
   ```

7. **Загрузите код на GitHub:**
   ```bash
   git push -u origin main
   ```

   - Появится окно авторизации GitHub
   - Введите ваш **username** и **пароль** (или Personal Access Token)
   - Подождите, пока файлы загрузятся

### Если просит Personal Access Token (PAT):

GitHub с 2021 года требует токен вместо пароля.

1. Откройте: https://github.com/settings/tokens
2. Нажмите "Generate new token" → "Generate new token (classic)"
3. Введите пароль GitHub
4. Заполните:
   - **Note:** "Git access for LuckyJet"
   - **Expiration:** 90 days (или No expiration)
   - **Поставьте галочку:** `repo` (весь раздел)
5. Нажмите "Generate token"
6. **СКОПИРУЙТЕ ТОКЕН!** (он больше не покажется)
7. Используйте этот токен вместо пароля при `git push`

---

## ШАГ 6: Включение GitHub Pages

1. **Откройте ваш репозиторий:**
   - Зайдите на https://github.com/ваш-username/luckyjet-webapp
   - Вы увидите все ваши файлы

2. **Перейдите в Settings:**
   - Нажмите на вкладку "Settings" (вверху справа)

3. **Откройте Pages:**
   - В левом меню найдите "Pages" (почти внизу)
   - Нажмите на "Pages"

4. **Настройте GitHub Pages:**
   - **Source:** выберите "Deploy from a branch"
   - **Branch:** выберите `main` и папку `/root`
   - Нажмите кнопку "Save"

5. **Подождите 1-2 минуты:**
   - Обновите страницу (F5)
   - Вверху появится зелёный блок:
   ```
   ✅ Your site is live at https://ваш-username.github.io/luckyjet-webapp/
   ```

6. **СКОПИРУЙТЕ ЭТОТ URL!** Он вам понадобится.

---

## ШАГ 7: Проверка WebApp

1. **Откройте ваш URL в браузере:**
   ```
   https://ваш-username.github.io/luckyjet-webapp/webapp/index.html
   ```
   ⚠️ Обратите внимание: добавили `/webapp/index.html` в конец!

2. **Должна открыться игра LuckyJet:**
   - Если видите экран с логотипом и кнопкой "НАЧАТЬ" — всё работает! ✅
   - Если ошибка 404 — подождите ещё 2-3 минуты, GitHub ещё разворачивает

3. **Протестируйте игру:**
   - Нажмите "НАЧАТЬ"
   - Нажмите "ПОЛУЧИТЬ" несколько раз
   - Проверьте, что анимация работает

---

## ШАГ 8: Обновление бота

1. **Откройте файл bot.js:**
   - В VS Code или любом редакторе откройте `e:\Claude\testTG\bot.js`

2. **Найдите строку 64:**
   ```javascript
   web_app: { url: 'https://ваш-домен.com/webapp/index.html' }
   ```

3. **Замените на ваш реальный URL:**
   ```javascript
   web_app: { url: 'https://ваш-username.github.io/luckyjet-webapp/webapp/index.html' }
   ```

   **Пример:**
   ```javascript
   web_app: { url: 'https://ivanov_dev.github.io/luckyjet-webapp/webapp/index.html' }
   ```

4. **Сохраните файл** (Ctrl+S)

---

## ШАГ 9: Запуск бота

1. **Откройте командную строку в папке testTG:**
   ```bash
   cd e:\Claude\testTG
   ```

2. **Установите зависимости** (если ещё не установили):
   ```bash
   npm install
   ```

3. **Убедитесь, что токен бота настроен:**
   - Откройте файл `.env`
   - Проверьте, что там есть:
   ```
   BOT_TOKEN=ваш_реальный_токен_от_BotFather
   ```

4. **Запустите бота:**
   ```bash
   npm start
   ```

5. **Должно появиться:**
   ```
   Бот запущен...
   ```

---

## ШАГ 10: Тестирование в Telegram

1. **Откройте Telegram**

2. **Найдите вашего бота:**
   - В поиске введите username вашего бота (например: `@my_test_bot`)

3. **Отправьте команду:**
   ```
   /play
   ```

4. **Нажмите кнопку "🚀 ИГРАТЬ":**
   - Откроется WebApp внутри Telegram
   - Должна загрузиться игра LuckyJet

5. **Играйте! 🎰**
   - Нажмите "НАЧАТЬ"
   - Нажмите "ПОЛУЧИТЬ" и смотрите результаты

---

## ✅ ГОТОВО! Ваш бот опубликован!

Теперь любой пользователь Telegram может:
1. Найти вашего бота
2. Отправить `/play`
3. Играть в LuckyJet

---

## 🔄 Как обновить игру после изменений

Если вы изменили код в `webapp/`:

1. Откройте командную строку в папке testTG:
   ```bash
   cd e:\Claude\testTG
   ```

2. Добавьте изменения:
   ```bash
   git add .
   ```

3. Создайте коммит:
   ```bash
   git commit -m "Update game logic"
   ```

4. Загрузите на GitHub:
   ```bash
   git push
   ```

5. Подождите 1-2 минуты — изменения появятся на сайте автоматически!

---

## ❓ Частые проблемы

### Проблема: "git: command not found"
**Решение:** Git не установлен. Вернитесь к Шагу 1.

### Проблема: "Permission denied (publickey)"
**Решение:** Используйте HTTPS URL вместо SSH:
```bash
git remote set-url origin https://github.com/ваш-username/luckyjet-webapp.git
```

### Проблема: "404 - File not found" при открытии WebApp
**Решение:**
1. Проверьте URL — должен быть `/webapp/index.html` в конце
2. Подождите 3-5 минут после включения GitHub Pages
3. Проверьте, что в Settings → Pages статус "✅ Your site is live"

### Проблема: WebApp открывается, но не работает в Telegram
**Решение:**
1. Проверьте, что URL в bot.js правильный
2. Убедитесь, что URL начинается с `https://` (Telegram требует HTTPS)
3. Перезапустите бота (Ctrl+C → npm start)

### Проблема: "fatal: not a git repository"
**Решение:** Вы не в папке проекта. Выполните:
```bash
cd e:\Claude\testTG
```

### Проблема: Просит username/password при push, но не принимает пароль
**Решение:** GitHub требует Personal Access Token. См. "Если просит Personal Access Token" в Шаге 5.

---

## 🎓 Дополнительные советы

### Как посмотреть свои репозитории:
https://github.com/ваш-username?tab=repositories

### Как удалить репозиторий (если что-то пошло не так):
1. Откройте репозиторий на GitHub
2. Settings → внизу "Danger Zone" → "Delete this repository"

### Как изменить название репозитория:
1. Откройте репозиторий на GitHub
2. Settings → вверху "Repository name" → введите новое имя → "Rename"

---

## 📞 Нужна помощь?

Если что-то не получилось:

1. **Проверьте каждый шаг** — возможно, что-то пропустили
2. **Читайте сообщения об ошибках** — они обычно подсказывают, в чём проблема
3. **Гуглите ошибку** — скопируйте текст ошибки и найдите решение
4. **Спросите ChatGPT/Claude** — опишите проблему подробно

---

**Удачи! 🚀 Ваш первый Telegram WebApp готов!**
