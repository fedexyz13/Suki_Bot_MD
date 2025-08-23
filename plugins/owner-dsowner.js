import { readdirSync, unlinkSync, existsSync, promises as fs, rmSync} from 'fs';
import path from 'path';

const handler = async (m, { conn, usedPrefix}) => {
  const sessionPath = `./${SukiSessions}/`;

  // Verifica si el comando se ejecuta desde el número principal
  if (global.conn.user.jid!== conn.user.jid) {
    return conn.reply(m.chat, `⚠️ 𝖲𝗎𝗄𝗂 dice: Utiliza este comando directamente desde el número principal del bot.`, m);
}

  await conn.reply(m.chat, `🧹 𝖲𝗎𝗄𝗂 está limpiando sesiones... Se conservará *creds.json*.`, m);
  m.react(rwait);

  try {
    if (!existsSync(sessionPath)) {
      return conn.reply(m.chat, `📂 La carpeta de sesiones no existe o está vacía.`, m);
}

    const files = await fs.readdir(sessionPath);
    let filesDeleted = 0;

    for (const file of files) {
      if (file!== 'creds.json') {
        await fs.unlink(path.join(sessionPath, file));
        filesDeleted++;
}
}

    if (filesDeleted === 0) {
      await conn.reply(m.chat, `📁 No se encontraron archivos para eliminar. Solo existe *creds.json*.`, m);
} else {
      m.react(done);
      await conn.reply(m.chat, `✅ Se eliminaron *${filesDeleted}* archivos de sesión. *creds.json* fue conservado.`, m);
      conn.reply(m.chat, `👀 *¡Hola! ¿logras verme?*`, m);
}
} catch (err) {
    console.error('❌ Error al eliminar archivos de sesión:', err);
    await conn.reply(m.chat, `⚠️ 𝖲𝗎𝗄𝗂 encontró un problema al limpiar las sesiones.`, m);
}
};

handler.help = ['dsowner'];
handler.tags = ['owner'];
handler.command = ['dsowner'];
handler.rowner = true;

export default handler;
