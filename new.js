const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client({
    authStrategy: new LocalAuth(), // Saves session so you don't rescan every time
    puppeteer: { headless: true }  // Runs in the background
});

client.on('qr', (qr) => {
    // Generate and scan this code with your phone
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('Client is ready!');
    // Code to send message after scanning QR
    const number = "+917201000220"; // Include country code
    const text = "Hey there, message from JS!";
    const chatId = number.substring(1) + "@c.us";
    client.sendMessage(chatId, text);
});

client.initialize();
