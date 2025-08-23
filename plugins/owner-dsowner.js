import { promises as fs, existsSync} from 'fs';
import path from 'path';

const handler = async (m, { conn}) => {
  const sessionPath = './SukiSessions/';

  if (global.conn.user.jid!== conn.user.jid) {
    return conn.sendMessage(m.chat, {
      text: '⚠️ 𝖲𝗎𝗄𝗂 dice: Este comando solo puede ejecutarse desde el número principal del bot.',
      footer: '𝖲𝗎𝗄𝗂Bot_MD • Seguridad',
      buttons: [
        { buttonId: '.menu', buttonText: { displayText: '🍁 Menu'}, type: 1}
      ],
      headerType: 4,
      image: { url: 'https://files.cloudkuimages.guru/images/xs59WBZj.jpg'}
}, { quoted: m});
}

  await m.react('🧹');
  let eliminados = 0;

  try {
    if (!existsSync(sessionPath)) {
      return conn.sendMessage(m.chat, {
        text: '📁 𝖲𝗎𝗄𝗂 informa: La carpeta de sesiones no existe o está vacía.',
        footer: '𝖲𝗎𝗄𝗂Bot_MD • Estado',
        buttons: [
          { buttonId: '.menu', buttonText: { displayText: '🍁 Menu'}, type: 1}
        ],
        headerType: 4,
        image: { url: 'https://files.cloudkuimages.guru/images/xs59WBZj.jpg'}
}, { quoted: m});
}

    const archivos = await fs.readdir(sessionPath);
    for (const archivo of archivos) {
      if (archivo!== 'creds.json') {
        await fs.unlink(path.join(sessionPath, archivo));
        eliminados++;
}
}

    const mensaje = eliminados === 0
? '📦 No se encontraron archivos para eliminar. Solo existe *creds.json*.'
: `✅ Se eliminaron *${eliminados}* archivos de sesión. *creds.json* fue conservado.`;

    await m.react('✅');
    await conn.sendMessage(m.chat, {
      text: `🌸 *𝖲𝗎𝗄𝗂Bot_MD · Limpieza de Sesiones*\n\n${mensaje}`,
      footer: '𝖲𝗎𝗄𝗂Bot_MD • Sistema',
      buttons: [
        { buttonId: '.menu', buttonText: { displayText: '🍁 Menu'}, type: 1}
      ],
      headerType: 4,
      image: { url: 'https://files.cloudkuimages.guru/images/xs59WBZj.jpg'}
}, { quoted: m});

} catch (error) {
    console.error('❌ Error al eliminar sesiones:', error);
    await conn.sendMessage(m.chat, {
      text: '⚠️ 𝖲𝗎𝗄𝗂 encontró un problema al limpiar las sesiones.',
      footer: '𝖲𝗎𝗄𝗂Bot_MD • Error',
      buttons: [
        { buttonId: '.menu', buttonText: { displayText: '🍁 Menu'}, type: 1}
      ],
      headerType: 4,
      image: { url: 'https://files.cloudkuimages.guru/images/xs59WBZj.jpg'}
}, { quoted: m});
}
};

handler.help = ['dsowner'];
handler.tags = ['owner'];
handler.command = ['dsowner'];
handler.rowner = true;

export default hand
