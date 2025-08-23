import { promises as fs} from 'fs';
import path from 'path';

const handler = async (m, { conn}) => {
  // Verifica que el comando se ejecute desde el número principal del bot
  if (global.conn.user.jid!== conn.user.jid) {
    return conn.reply(m.chat, '🚩 *𝖤𝗌𝗍𝖾 𝖼𝗈𝗆𝖺𝗇𝖽𝗈 𝗌𝗈𝗅𝗈 𝗉𝗎𝖾𝖽𝖾 𝗎𝗌𝖺𝗋𝗌𝖾 𝖾𝗇 𝖾𝗅 𝗇𝗎́𝗆𝖾𝗋𝗈 𝗉𝗋𝗂𝗇𝖼𝗂𝗉𝖺𝗅 𝖽𝖾𝗅 𝖡𝗈𝗍.*', m);
}

  const chatIds = m.isGroup? [m.chat, m.sender]: [m.sender];
  const sessionPath = './SukiSessions/';
  let filesDeleted = 0;
  let errores = [];

  try {
    const files = await fs.readdir(sessionPath);

    for (const file of files) {
      for (const id of chatIds) {
        if (file.includes(id.split('@')[0])) {
          try {
            await fs.unlink(path.join(sessionPath, file));
            filesDeleted++;
} catch (err) {
            errores.push(file);
}
          break;
}
}
}

    if (filesDeleted === 0 && errores.length === 0) {
      await conn.reply(m.chat, '🚩 *𝖭𝗈 𝗌𝖾 𝖾𝗇𝖼𝗈𝗇𝗍𝗋𝗈́ 𝗇𝗂𝗇𝗀𝗎𝗇 𝖺𝗋𝖼𝗁𝗂𝗏𝗈 𝖼𝗈𝗇 𝗍𝗎 𝖨𝖣.*', m);
} else {
      let mensaje = `✅ *𝖲𝖾 𝖾𝗅𝗂𝗆𝗂𝗇𝖺𝗋𝗈𝗇 ${filesDeleted} 𝖺𝗋𝖼𝗁𝗂𝗏𝗈𝗌 𝖽𝖾 𝗌𝖾𝗌𝗂𝗈𝗇.*`;
      if (errores.length> 0) {
        mensaje += `\n⚠️ *𝖭𝗈 𝗌𝖾 𝗉𝗎𝖽𝗂𝗇 𝖾𝗅𝗂𝗆𝗂𝗇𝖺𝗋:* ${errores.join(', ')}`;
}
      await conn.reply(m.chat, mensaje, m);
      await conn.reply(m.chat, '🌷 *¡𝖧𝗈𝗅𝖺! ¿𝗅𝗈𝗀𝗋𝖺𝗌 𝗏𝖾𝗋𝗆𝖾 𝖺𝗁𝗈𝗋𝖺?*', m);
}
} catch (err) {
    console.error('❌ Error al leer o eliminar archivos de sesión:', err);
    await conn.reply(m.chat, '💥 *𝖮𝖼𝗎𝗋𝗋𝗂𝗈́ 𝗎𝗇 𝖿𝖺𝗅𝗅𝗈 𝖾𝗇 𝗅𝖺 𝖾𝗅𝗂𝗆𝗂𝗇𝖺𝖼𝗂𝗈𝗇.*', m);
}
};

handler.customPrefix = /^(ds|limpiar)$/i;
handler.command = new RegExp;
handler.owner = true;

export default handler;
