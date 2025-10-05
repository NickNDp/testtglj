require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');

// Токен бота из переменной окружения
const token = process.env.BOT_TOKEN;

// Создание бота с polling (для получения обновлений)
const bot = new TelegramBot(token, { polling: true });

console.log('Бот запущен...');

// Команда /start
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const welcomeMessage = `
Привет! 👋

Я тестовый Telegram бот. Вот что я умею:

/start - Показать это сообщение
/help - Справка
/info - Информация о боте
/echo <текст> - Повторить ваш текст
/play - 🎰 Играть в LuckyJet!
  `;
  bot.sendMessage(chatId, welcomeMessage);
});

// Команда /help
bot.onText(/\/help/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Используйте /start для просмотра списка команд.');
});

// Команда /info
bot.onText(/\/info/, (msg) => {
  const chatId = msg.chat.id;
  const info = `
📊 Информация о боте:

Версия: 1.0.0
Статус: Активен
Разработчик: @YourUsername
  `;
  bot.sendMessage(chatId, info);
});

// Команда /echo
bot.onText(/\/echo (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const text = match[1];
  bot.sendMessage(chatId, `Вы сказали: ${text}`);
});

// Команда /play - запуск WebApp
bot.onText(/\/play/, (msg) => {
  const chatId = msg.chat.id;

  bot.sendMessage(chatId, '🎰 Запускаю LuckyJet! 🛫', {
    reply_markup: {
      inline_keyboard: [[
        {
          text: '🚀 ИГРАТЬ',
          web_app: { url: 'https://nickndp.github.io/testtglj/webapp/index.html' } // Замените на ваш URL после деплоя
        }
      ]]
    }
  });
});

// Обработка обычных текстовых сообщений
bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  // Пропускаем команды
  if (text && text.startsWith('/')) {
    return;
  }

  // Отвечаем на обычные сообщения
  if (text) {
    bot.sendMessage(chatId, `Получил ваше сообщение: "${text}"\nИспользуйте /start для просмотра команд.`);
  }
});

// Обработка ошибок
bot.on('polling_error', (error) => {
  console.error('Polling error:', error);
});
