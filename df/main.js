/*
𝗦𝗰𝗿𝗶𝗽𝘁 𝗶𝗻𝗶 𝗱𝗶 𝗯𝘂𝗮𝘁 𝗼𝗹𝗲𝗵 𝗱𝗶𝗻𝗼 𝘂𝗻𝘁𝘂𝗸 𝗺𝗲𝗺𝗯𝗮𝗻𝘁𝘂 𝗽𝗲𝗻𝗴𝗴𝘂𝗻𝗮 𝗱𝗮𝗹𝗮𝗺 𝗯𝗲𝗹𝗮𝗷𝗮𝗿
𝗺𝗲𝗻𝗴𝗲𝗻𝗮𝗶 𝗯𝗼𝘁 𝘄𝗵𝗮𝘁𝘀𝗮𝗽𝗽 𝗱𝗲𝗻𝗴𝗮𝗻 𝗶𝘀𝗶 𝘆𝗮𝗻𝗴 𝘀𝗶𝗺𝗽𝗹𝗲 𝗱𝗮𝗻 𝗺𝘂𝗱𝗮𝗵 𝗱𝗶 𝗽𝗮𝗵𝗮𝗺𝗶 

𝗯𝘂𝘁𝘂𝗵 𝗯𝗮𝗻𝘁𝘂𝗮𝗻? 𝗰𝗵𝗮𝘁 𝗻𝗼𝗺𝗲𝗿 𝗱𝗶 𝗯𝗮𝘄𝗮𝗵
- 𝗼𝘄𝗻𝗲𝗿 : 𝗗𝗶𝗻𝗼
- 𝘄𝗮 : 6285602531403

©𝗗𝗶𝗻𝗼𝘀𝗮𝘂𝗿𝘂𝘀
*/
const { default: makeWASocket, DisconnectReason, makeInMemoryStore, jidDecode, proto, getContentType, useMultiFileAuthState, downloadContentFromMessage } = require("@whiskeysockets/baileys");

const pino = require('pino');
const chalk = require('chalk');
const fs = require('fs');
const readline = require("readline");
const PhoneNumber = require('awesome-phonenumber');

// ===== [ 𝘀𝗲𝘁𝘁𝗶𝗻𝗴𝘀 𝗽𝗮𝘀𝘀𝘄𝗼𝗿𝗱 ] ===== \\
const pw = "dino"; // 𝗴𝗮𝗻𝘁𝗶 "𝗻𝗼𝗽𝘄" / "𝗻𝗼 𝗽𝘄" 𝘂𝗻𝘁𝘂𝗸 𝗺𝗲𝗻𝗼𝗻𝗮𝗸𝘁𝗶𝗳𝗸𝗮𝗻 𝗽𝗮𝘀𝘀𝘄𝗼𝗿𝗱

const { Boom } = require('@hapi/boom');
const { imageToWebp, videoToWebp, writeExifImg, writeExifVid, addExif } = require('./lib/exif')
const { smsg, sleep, getBuffer, botTerkoneksi} = require('./lib/func')


const store = makeInMemoryStore({
    logger: pino().child({
        level: 'silent',
        stream: 'store'
    })
})

const question = (text) => {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    return new Promise((resolve) => {
        rl.question(text, resolve)
    })
};
//
async function startSesi() {
    const {
        state,
        saveCreds
    } = await useMultiFileAuthState("session")
    const dino = makeWASocket({
        logger: pino({
            level: "silent"
        }),
        printQRInTerminal: false,
        auth: state,
        connectTimeoutMs: 60000,
        defaultQueryTimeoutMs: 0,
        keepAliveIntervalMs: 10000,
        emitOwnEvents: true,
        fireInitQueries: true,
        generateHighQualityLinkPreview: true,
        syncFullHistory: true,
        markOnlineOnConnect: true,
        browser: ["Ubuntu", "Chrome", "20.0.04"],
    });


if (!dino.authState.creds.registered) {
    if (pw !== "nopw" && pw !== "no pw") {
        const password = await question(`\nMASUKAN PASSWORD 🥶\n`);
        if (password !== pw) {
            console.log(`✖️ ACCES DEMIED`);
            process.exit();
        }
    }

    const phoneNumber = await question('MASUKAN NOMER WHATSAPP MU: \n');
    let code = await dino.requestPairingCode(phoneNumber);
    code = code?.match(/.{1,4}/g)?.join("-") || code;
    console.log(`CODE PAIRING :`, code);
}
    store.bind(dino.ev)

    dino.ev.on('messages.upsert', async chatUpdate => {
        try {
            mek = chatUpdate.messages[0]
            if (!mek.message) return
            mek.message = (Object.keys(mek.message)[0] === 'ephemeralMessage') ? mek.message.ephemeralMessage.message : mek.message
            if (mek.key && mek.key.remoteJid === 'status@broadcast') return
            if (!dino.public && mek.key.remoteJid !== global.owner + "@s.whatsapp.net" && !mek.key.fromMe && chatUpdate.type === 'notify') return
            if (mek.key.id.startsWith('BAE5') && mek.key.id.length === 16) return
            m = smsg(dino, mek, store)
            require("./case")(dino, m, chatUpdate, store)
        } catch (err) {
            console.log(err)
        }
    })
        dino.public = false // 𝗴𝗮𝗻𝘁𝗶 "𝗳𝗮𝗹𝘀𝗲" 𝗷𝗶𝗸𝗮 𝗶𝗻𝗴𝗶𝗻 𝗱𝗶 𝘀𝗲𝗹𝗳

    dino.decodeJid = (jid) => {
        if (!jid) return jid
        if (/:\d+@/gi.test(jid)) {
            let decode = jidDecode(jid) || {}
            return decode.user && decode.server && decode.user + '@' + decode.server || jid
        } else return jid
    }

    dino.getName = (jid, withoutContact = false) => {
        id = dino.decodeJid(jid)
        withoutContact = dino.withoutContact || withoutContact
        let v
        if (id.endsWith("@g.us")) return new Promise(async (resolve) => {
            v = store.contacts[id] || {}
            if (!(v.name || v.subject)) v = dino.groupMetadata(id) || {}
            resolve(v.name || v.subject || PhoneNumber('+' + id.replace('@s.whatsapp.net', '')).getNumber('international'))
        })
        else v = id === '0@s.whatsapp.net' ? {
                id,
                name: 'WhatsApp'
            } : id === dino.decodeJid(dino.user.id) ?
            dino.user :
            (store.contacts[id] || {})
        return (withoutContact ? '' : v.name) || v.subject || v.verifiedName || PhoneNumber('+' + jid.replace('@s.whatsapp.net', '')).getNumber('international')
    }

    dino.serializeM = (m) => smsg(dino, m, store);
    dino.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect } = update;
        if (connection === 'close') {
            let reason = new Boom(lastDisconnect?.error)?.output.statusCode;
            if (reason === DisconnectReason.badSession || reason === DisconnectReason.connectionClosed || reason === DisconnectReason.connectionLost || reason === DisconnectReason.connectionReplaced || reason === DisconnectReason.restartRequired || reason === DisconnectReason.timedOut) {
                startSesi();
            } else if (reason === DisconnectReason.loggedOut) {} else {
                dino.end(`Unknown DisconnectReason: ${reason}|${connection}`);
            }
        } else if (connection === 'open') {


const frames = [
  '▁ ▂ ▃ ▄ ▅ ▆ ▇ ▆ ▅ ▄ ▃ ▂ ▁ ▁  || Loading',
  '▂ ▃ ▄ ▅ ▆ ▇ ▆ ▅ ▄ ▃ ▂ ▁ ▁ ▂  || Loading',
  '▃ ▄ ▅ ▆ ▇ ▆ ▅ ▄ ▃ ▂ ▁ ▁ ▂ ▃  || Loading',
  '▄ ▅ ▆ ▇ ▆ ▅ ▄ ▃ ▂ ▁ ▁ ▂ ▃ ▄  || Loading',
  '▅ ▆ ▇ ▆ ▅ ▄ ▃ ▂ ▁ ▁ ▂ ▃ ▄ ▅  || Loading',
  '▆ ▇ ▆ ▅ ▄ ▃ ▂ ▁ ▁ ▂ ▃ ▄ ▅ ▆  || Loading',
  '▇ ▆ ▅ ▄ ▃ ▂ ▁ ▁ ▂ ▃ ▄ ▅ ▆ ▇  || Loading',
  '▆ ▅ ▄ ▃ ▂ ▁ ▁ ▂ ▃ ▄ ▅ ▆ ▇ ▆  || Loading',
  '▅ ▄ ▃ ▂ ▁ ▁ ▂ ▃ ▄ ▅ ▆ ▇ ▆ ▅  || Loading',
  '▄ ▃ ▂ ▁ ▁ ▂ ▃ ▄ ▅ ▆ ▇ ▆ ▅ ▄  || Loading',
  '▃ ▂ ▁ ▁ ▂ ▃ ▄ ▅ ▆ ▇ ▆ ▅ ▄ ▃  || Loading',
  '▂ ▁ ▁ ▂ ▃ ▄ ▅ ▆ ▇ ▆ ▅ ▄ ▃ ▂  || Loading'
];



let i = 0;
const intervalTime = 400; // milidetik
const totalDuration = 4000; // total animasi 4 detik

console.clear();

const interval = setInterval(() => {
  console.clear();
  console.log(chalk.bold.hex('#FF8C00')(frames[i % frames.length]));
  i++;
}, intervalTime);

setTimeout(() => {
  clearInterval(interval);
  console.clear();

  

console.log(
  '\n' +
  chalk.bold.hex('#FF6F00').underline('Noxz X Base Sucess Connect') + '\n\n' +

  chalk.white.bold('Base By: ') + chalk.hex('#1E90FF').underline('Dinosaurus') + '\n' +
 '\n\n' +
  chalk.cyan('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━') + '\n' + chalk.white('terimakasih sudah memakai script dino')
);

}, totalDuration);

botTerkoneksi(dino);
        }
    });
    //
    dino.ev.on('creds.update', saveCreds)

    dino.sendText = (jid, text, quoted = '', options) => dino.sendMessage(jid, {
        text: text,
        ...options
    }, {
        quoted
    })

    dino.sendImageAsSticker = async (jid, path, quoted, options = {}) => {
        let buff = Buffer.isBuffer(path) ? 
            path : /^data:.*?\/.*?;base64,/i.test(path) ?
            Buffer.from(path.split`, `[1], 'base64') : /^https?:\/\//.test(path) ?
            await (await getBuffer(path)) : fs.existsSync(path) ? 
            fs.readFileSync(path) : Buffer.alloc(0);
        
        let buffer;
        if (options && (options.packname || options.author)) {
            buffer = await writeExifImg(buff, options);
        } else {
            buffer = await addExif(buff);
        }
        
        await dino.sendMessage(jid, { 
            sticker: { url: buffer }, 
            ...options }, { quoted });
        return buffer;
    };

    dino.sendVideoAsSticker = async (jid, path, quoted, options = {}) => {
        let buff = Buffer.isBuffer(path) ? 
            path : /^data:.*?\/.*?;base64,/i.test(path) ?
            Buffer.from(path.split`, `[1], 'base64') : /^https?:\/\//.test(path) ?
            await (await getBuffer(path)) : fs.existsSync(path) ? 
            fs.readFileSync(path) : Buffer.alloc(0);

        let buffer;
        if (options && (options.packname || options.author)) {
            buffer = await writeExifVid(buff, options);
        } else {
            buffer = await videoToWebp(buff);
        }

        await dino.sendMessage(jid, {
            sticker: { url: buffer }, 
            ...options }, { quoted });
        return buffer;
    };

    dino.downloadMediaMessage = async (message) => {
        let mime = (message.msg || message).mimetype || ''
        let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0]
        const stream = await downloadContentFromMessage(message, messageType)
        let buffer = Buffer.from([])
        for await (const chunk of stream) {
            buffer = Buffer.concat([buffer, chunk])
        }
        return buffer
    }

    return dino
}
// Anu
startSesi();

//
let file = require.resolve(__filename)
fs.watchFile(file, () => {
    fs.unwatchFile(file)
    console.log(chalk.redBright(`Update ${__filename}`))
    delete require.cache[file]
    require(file)
})