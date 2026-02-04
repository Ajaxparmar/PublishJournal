const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client({
    authStrategy: new LocalAuth(),           // ← saves session automatically
    puppeteer: { 
        headless: true,
        // Optional: helps on some linux servers
        // args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
});

client.on('qr', (qr) => {
    console.log('Scan this QR code:');
    qrcode.generate(qr, { small: true });
});

client.on('authenticated', () => {
    console.log('Authenticated successfully!');
});

client.on('ready', () => {
    console.log('Client is ready! ✅');

    // ← Put your send message code here (runs once when ready)
    const number = "+917201000220";               // ← your target number
    const text   = "Hey there, message from Node.js! 🚀";

    const chatId = number.replace('+', '') + "@c.us";   // 7201000220@c.us

    client.sendMessage(chatId, text)
        .then(() => {
            console.log(`Message sent successfully to ${number}`);
        })
        .catch(err => {
            console.error('Failed to send message:', err);
        });
});

client.on('auth_failure', msg => {
    console.error('Authentication failure:', msg);
});

client.initialize();