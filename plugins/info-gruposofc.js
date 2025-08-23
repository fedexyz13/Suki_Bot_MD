import fetch from 'node-fetch';

let handler = async (m, { conn}) => {
  const nombreBot = '𝖲ᴜᴋɪ_𝖡𝗈𝖙_𝖬𝖣';
  const creador = '𝖥𝖾𝖽𝖾𝗑𝗒𝗓';
  const imagenDecorativa = 'https://files.catbox.moe/rkvuzb.jpg';
  const emoji = '🌸';

  // Enlaces mágicos
  const enlaces = {
    grupoOficial: {
      nombre: '𝖦𝗋𝗎𝗉𝗈 𝖮𝖿𝗂𝖼𝗂𝖺𝗅',
      url: 'https://chat.whatsapp.com/Bxwmb1CO5ojASdRT87I11b'
},
    comunidadPastel: {
      nombre: '𝖢𝗈𝗆𝗎𝗇𝗂𝖽𝖺𝖽 𝖯𝖺𝗌𝗍𝖾𝗅𝖼𝗈𝗋𝖾',
      url: 'https://chat.whatsapp.com/Bxwmb1CO5ojASdRT87I11b'
},
    canalNoticias: {
      nombre: '𝖢𝖺𝗇𝖺𝗅 𝖽𝖾 𝖭𝗈𝗍𝗂𝖼𝗂𝖺𝗌',
      url: 'https://whatsapp.com/channel/0029VbApe6jG8l5Nv43dsC2N'
}
};

  const texto = `
╭─❀ 𝖫𝗂𝗇𝗄𝗌 𝖤𝗇𝖼𝖺𝗇𝗍𝖺𝖽𝗈𝗌 ❀─╮

🌷 ¡Bienvenid@ al mundo de *${nombreBot}*! Aquí tienes los portales mágicos para unirte a nuestra comunidad:

🍡 ${enlaces.grupoOficial.nombre}
↳ *${emoji}* ${enlaces.grupoOficial.url}

🍰 ${enlaces.comunidadPastel.nombre}
↳ *${emoji}* ${enlaces.comunidadPastel.url}

📡 ${enlaces.canalNoticias.nombre}
↳ *${emoji}* ${enlaces.canalNoticias.url}

╰─❀ 👨🏻‍💻 𝖢𝗋𝖾𝖺𝖽𝗈𝗋: ${creador} ❀─╯
`.trim();

  await conn.sendFile(m.chat, imagenDecorativa, 'grupos.jpg', texto, m);
  await m.react(emoji);
};

handler.help = ['grupos'];
handler.tags = ['info'];
handler.command = ['grupos', 'links', 'groups'];

export default handler;
