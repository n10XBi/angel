/*
𝗦𝗰𝗿𝗶𝗽𝘁 𝗶𝗻𝗶 𝗱𝗶 𝗯𝘂𝗮𝘁 𝗼𝗹𝗲𝗵 𝗱𝗶𝗻𝗼 𝘂𝗻𝘁𝘂𝗸 𝗺𝗲𝗺𝗯𝗮𝗻𝘁𝘂 𝗽𝗲𝗻𝗴𝗴𝘂𝗻𝗮 𝗱𝗮𝗹𝗮𝗺 𝗯𝗲𝗹𝗮𝗷𝗮𝗿
𝗺𝗲𝗻𝗴𝗲𝗻𝗮𝗶 𝗯𝗼𝘁 𝘄𝗵𝗮𝘁𝘀𝗮𝗽𝗽 𝗱𝗲𝗻𝗴𝗮𝗻 𝗶𝘀𝗶 𝘆𝗮𝗻𝗴 𝘀𝗶𝗺𝗽𝗹𝗲 𝗱𝗮𝗻 𝗺𝘂𝗱𝗮𝗵 𝗱𝗶 𝗽𝗮𝗵𝗮𝗺𝗶 

𝗯𝘂𝘁𝘂𝗵 𝗯𝗮𝗻𝘁𝘂𝗮𝗻? 𝗰𝗵𝗮𝘁 𝗻𝗼𝗺𝗲𝗿 𝗱𝗶 𝗯𝗮𝘄𝗮𝗵
- 𝗼𝘄𝗻𝗲𝗿 : 𝗗𝗶𝗻𝗼
- 𝘄𝗮 : 6285602531403

©𝗗𝗶𝗻𝗼𝘀𝗮𝘂𝗿𝘂𝘀
*/
const fs = require('fs')
const chalk = require('chalk')

// 𝘀𝗲𝘁𝘁𝗶𝗻𝗴𝘀 
global.owner = "6288973686537"; // 𝗻𝗼𝗺𝗲𝗿 𝗼𝘄𝗻𝗲𝗿
global.ownername = '𝗚𝗲𝗻𝘁𝗮 𝗽𝗮𝗰𝗮𝗿 𝗮𝗻𝗴𝗲𝗹𝗶𝗮 ☣︎'; // 𝗻𝗮𝗺𝗮 𝗼𝘄𝗻𝗲𝗿
global.namabot = '𝗮𝗱𝗲𝗲 𝗰𝗮𝗯𝘂𝗹'; // 𝗻𝗮𝗺𝗮 𝗯𝗼𝘁
global.version = "𝟭.𝟬.𝟬" // 𝘃𝗲𝗿𝘀𝗶 𝗯𝗼𝘁
global.linkSaluran = "https://whatsapp.com/channel/-" // 𝗹𝗶𝗻𝗸 𝗰𝗵𝗮𝗻𝗻𝗲𝗹
global.idSaluran = "@newsletter" // 𝗶𝗱 𝗰𝗵𝗮𝗻𝗻𝗲𝗹
global.namaSaluran = "G3N⫹⫺" // 𝗻𝗮𝗺𝗮 𝗰𝗵𝗮𝗻𝗻𝗲𝗹

// 𝘀𝗲𝘁𝘁𝗶𝗻𝗴𝘀 𝗶𝗺𝗮𝗴𝗲
global.imagethumb= "https://i.ibb.co/Nnr9LcKM/9c437d65-2762-4b57-8ee3-315dfd513247.jpg"

let file = require.resolve(__filename)
fs.watchFile(file, () => {
fs.unwatchFile(file)
console.log(chalk.redBright(`Update ${__filename}`))
delete require.cache[file]
require(file)
})