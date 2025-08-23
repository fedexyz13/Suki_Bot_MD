import fetch from 'node-fetch';
const { generateWAMessageContent, generateWAMessageFromContent, proto} = (await import('@whiskeysockets/baileys')).default;

let handler = async (m, { conn, args, command, usedPrefix}) => {
  if (!args[0]) return m.reply(`🍁 Ingrese un link de Spotify\n> *Ejemplo:* ${usedPrefix + command} https://open.spotify.com/track/0jH15Y9z2EpwTWRQI11xbj`);
  await m.react('🕒');

  try {
    const res = await fetch(`https://archive-ui.tanakadomp.biz.id/download/spotify?url=${args[0]}`);
    const json = await res.json();
    const track = json.result.data;

    const portada = await generateWAMessageContent({ image: { url: 'https://files.cloudkuimages.guru/images/xs59WBZj.jpg'}}, { upload: conn.waUploadToServer});

    const info = `🎧 *𝖲𝗎𝗄𝗂 Título:* ${track.title}\n👤 *𝖲𝗎𝗄𝗂 Artista:* ${track.artis}\n⏱️ *Duración:* ${track.durasi}\n───── ･ ｡ﾟ☆: *.☽.*:☆ﾟ. ─────`;

    conn.sendFile(m.chat, track.image, 'SukiTrack.jpg', info, m);

    const msg = generateWAMessageFromContent(m.chat, {
      viewOnceMessage: {
        message: {
          messageContextInfo: {
            deviceListMetadata: {},
            deviceListMetadataVersion: 2
},
          interactiveMessage: proto.Message.InteractiveMessage.fromObject({
            body: proto.Message.InteractiveMessage.Body.create({
              text: `*𝖲𝗎𝗄𝗂 Descarga de Spotify*`
}),
            footer: proto.Message.InteractiveMessage.Footer.create({
              text: '𝖲𝗎𝗄𝗂Bot_MD'
}),
            header: proto.Message.InteractiveMessage.Header.create({
              title: '𝖲𝗎𝗄𝗂 Audio',
              hasMediaAttachment: true,
              imageMessage: portada.imageMessage
}),
            nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
              buttons: [
                {
                  name: 'cta_url',
                  buttonParamsJson: JSON.stringify({
                    display_text: '🎧 Descargar Audio',
                    url: track.download,
                    id: 'btn_download'
})
},
                {
                  name: 'quick_reply',
                  buttonParamsJson: JSON.stringify({
                    display_text: '🍁 Menú del Bot',
                    id: 'btn_menu',
                    command: '.menu'
})
}
              ]
})
})
}
}
}, { quoted: m});

    await conn.sendMessage(m.chat, { audio: { url: track.download}, mimetype: 'audio/mpeg'}, { quoted: m});
    await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id});
    await m.react('✅');

} catch (error) {
    console.error(error);
    m.reply('❌ Ocurrió un error al procesar el enlace. Intenta nuevamente.');
}
};

handler.command = ['spotifydl', 'spdl'];
handler.help = ['spotifydl <link>'];
handler.tags = ['descargas'];

export default handler;
