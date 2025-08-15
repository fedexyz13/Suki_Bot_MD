import axios from 'axios';
import fs from 'fs';
import path from 'path';

let handler = async (m, { conn, text, command}) => {
  if (!text) {
    return conn.reply(m.chat, '❀ Por favor, escribe la letra para generar la música.', m);
}

  try {
    conn.reply(m.chat, '🎶 Generando tu canción con Suno AI...', m);

    // Enviar letra a la API
    const { data} = await axios.post('https://apis-starlights-team.koyeb.app/starlight/suno', {
      prompt: text
});

    if (!data.audio_url) {
      return conn.reply(m.chat, '⚠️ No se pudo generar la música. Intenta con otra letra.', m);
}

    const audioUrl = data.audio_url;
    const fileName = `suno_${Date.now()}.mp3`;
    const filePath = path.join('./temp', fileName);

    // Descargar el audio
    const audioStream = await axios.get(audioUrl, { responseType: 'stream'});
    const writer = fs.createWriteStream(filePath);
    audioStream.data.pipe(writer);

    writer.on('finish', async () => {
      await conn.sendFile(m.chat, filePath, fileName, '🎧 Aquí está tu canción personalizada 🎵', m);
      fs.unlinkSync(filePath); // Elimina el archivo después de enviarlo
});

    writer.on('error', (err) => {
      console.error('❌ Error al guardar el audio:', err);
      conn.reply(m.chat, '⚠️ Hubo un problema al descargar la música.', m);
});

} catch (error) {
    console.error('❌ Error en.suno:', error.message);
    conn.reply(m.chat, `⚠️ Error al generar música: ${error.message}`, m);
}
};

handler.help = ['suno <letra>'];
handler.tags = ['musica', 'ia'];
handler.command = ['suno'];

export default handler;
