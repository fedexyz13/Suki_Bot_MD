import { execSync} from 'child_process';

let handler = async (m, { conn, args}) => {
  try {
    const output = execSync('git pull' + (args.length? ' ' + args.join(' '): '')).toString();
    const now = new Date();
    const fecha = now.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric'});
    const hora = now.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit'});

    const branch = execSync('git rev-parse --abbrev-ref HEAD').toString().trim();
    const lastCommit = execSync('git log -1 --pretty=format:"%h - %s"').toString();
    const emojis = ['✨', '🛠️', '🚀', '🔧', '📦', '🧩'];
    const emoji = emojis[Math.floor(Math.random() * emojis.length)];

    let response = output.includes('Already up to date')
? `${emoji} _𝖤𝗅 𝖻𝗈𝗍 𝖲𝗎𝗄𝗂Bot-MD 𝖞𝖆 𝖾𝖘𝖙𝖺́ 𝖺𝖼𝗍𝗎𝖺𝗅𝗂𝗓𝖺𝖽𝗈._`
: `*${emoji} 𝗔𝗖𝗧𝗨𝗔𝗟𝗜𝗭𝗔𝗖𝗜𝗢́𝗡 𝗖𝗢𝗠𝗣𝗟𝗘𝗧𝗔𝗗𝗔*\n\n` +
        `🗓️ Fecha: *${fecha}*\n🕒 Hora: *${hora}*\n🍁 Rama: *${branch}*\n📝 Último commit:\n> ${lastCommit}\n\n` +
        `\`\`\`\n${output}\n\`\`\``;

    await conn.sendMessage(m.chat, {
      text: response,
      contextInfo: {
        externalAdReply: {
          title: '𝖲𝗎𝗄𝗂Bot-MD',
          body: `✅ Actualizado el ${fecha} a las ${hora}`,
          mediaType: 1,
          renderLargerThumbnail: true,
          thumbnailUrl: 'https://files.cloudkuimages.guru/images/rgelVn5i.jpg',
          sourceUrl: 'https://whatsapp.com/channel/0029VbApe6jG8l5Nv43dsC2N'
}
}
}, { quoted: m});

} catch (error) {
    const errorMsg = `❌ *Error al actualizar:*\n${error.message || 'Error desconocido.'}`;
    await conn.sendMessage(m.chat, {
      text: errorMsg,
      contextInfo: {
        externalAdReply: {
          title: '𝖲𝗎𝗄𝗂Bot-MD',
          body: '⚠️ Error al intentar actualizar',
          mediaType: 1,
          renderLargerThumbnail: true,
          thumbnailUrl: 'https://files.cloudkuimages.guru/images/rgelVn5i.jpg',
          sourceUrl: 'https://whatsapp.com/channel/0029VbApe6jG8l5Nv43dsC2N'
}
}
}, { quoted: m});
}
};

handler.customPrefix = /^(fix|update|up)$/i;
handler.command = new RegExp;
handler.owner = true;
handler.register = true;

export default handler;
