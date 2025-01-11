const { Client,RemoteAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const { MongoStore } = require('wwebjs-mongo');
require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect(`${process.env.MongoURL}`).then(() => {
    const store = new MongoStore({ mongoose: mongoose });
    const client = new Client({
         puppeteer: {
        headless: true,
      },
        authStrategy: new RemoteAuth({
            store: store,
            backupSyncIntervalMs: 300000
        })
    });

// When the client is ready, run this code (only once)
client.once('ready', () => {
    console.log('Client is ready!');
});

// When the client received QR-Code
client.on('qr', (qr) => {
    console.log('QR RECEIVED');
    qrcode.generate(qr, {small: true});

});
client.on('authenticated', () => {
    console.log("authenticated");
     store.save({session: 'yourSessionName'});
});
client.on('remote_session_saved', () => {
    console.log("saved APi")
});

// Start your client
client.initialize();
});

