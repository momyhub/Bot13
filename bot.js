const TelegramBot = require('node-telegram-bot-api');
const token = 'YOUR_TELEGRAM_BOT_TOKEN';
const bot = new TelegramBot(token, { polling: true });

// Command to start the bot
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    const userId = msg.from.id;
    const username = msg.from.username;
    // Notify admin about user's start
    const adminChatId = '5838829453'; // Replace with your admin's chat ID
    bot.sendMessage(adminChatId, `New user started the bot.\nUser ID: ${userId}\nUsername: @${username}`);
    // Send a welcome message or instructions to the user
    bot.sendMessage(chatId, 'Welcome! la version  vip coute 20$ = 12.000 FCFA Please choose a payment method:', {
        reply_markup: {
            inline_keyboard: [
                [{ text: 'Orange Money', callback_data: 'orange_money' }],
                [{ text: 'Wave', callback_data: 'wave' }],
                [{ text: 'Crypto Money', callback_data: 'crypto_money' }],
                [{ text: 'Perfect Money', callback_data: 'perfect_money' }]
            ]
        }
    });
});

// Handle inline keyboard button callbacks
bot.on('callback_query', (query) => {
    const chatId = query.message.chat.id;
    const paymentMethod = query.data;
    let paymentAddress = '';
    let paymentConfirmationMessage = '';
    if (paymentMethod === 'perfect_money') {
        paymentAddress = 'U45481079';
        paymentConfirmationMessage = 'Mode de Paiement Choisie: Perfect Money';
    } else if (paymentMethod === 'crypto_money') {
        paymentAddress = 'usdt trc20 TBFYPARBv1VW2MBLScAgCAxnxUiYwcHLQU';
        paymentConfirmationMessage = 'Mode de Paiement Choisie: Crypto Money';
    }
    if (paymentAddress !== '') {
        bot.sendMessage(chatId, `Please make the payment to this address:\n${paymentAddress}`, {
            reply_markup: {
                inline_keyboard: [
                    [{ text: paymentConfirmationMessage, callback_data: 'confirm_payment' }],
                    [{ text: 'Envoiyer le preuve de paiement', callback_data: 'proof_payment' }]
                ]
            }
        });
    } else {
        bot.sendMessage(chatId, 'Please contact the admin to proceed with your payment.\nAdmin contact: @medatt00', {
            reply_markup: {
                inline_keyboard: [[{ text: 'Contact Admin', url: 'https://t.me/medatt00' }]]
            }
        });
    }
});

// Handle inline keyboard confirmation
bot.on('callback_query', (query) => {
    const chatId = query.message.chat.id;
    const data = query.data;
    if (data === 'confirm_payment') {
        bot.sendMessage(chatId, 'Votre paiement est en cours de vérification. Veuillez patienter.');
    } else if (data === 'proof_payment') {
        bot.sendMessage(chatId, 'Please upload an image as proof of payment.');
    }
});
