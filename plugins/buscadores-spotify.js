import fetch from 'node-fetch';
const { generateWAMessageContent, generateWAMessageFromContent, proto} = (await import('@whiskeysockets/baileys')).default;

let handler = async (m, { conn, text}) => {
  if (!text) return m.reply('🔍 Ingresa el texto que deseas buscar en Spotify 🤍');
  await m.react('🕓');

  try {
    async function createImage(url) {
      const { imageMessage} = await generateWAMessageContent({ image: { url}}, { upload: conn.waUploadToServer});
      return imageMessage;
}

    const portada = await createImage('https://files.cloudkuimages.guru/images/xs59WBZj.jpg');
    let push = [];

    const res = await fetch(`https://delirius-apiofc.vercel.app/search/spotify?q=${encodeURIComponent(text)}`);
    const json = await res.json();

    for (let track of json.data) {
      push.push({
        body: proto.Message.InteractiveMessage.Body.fromObject({
          text: `🎶 *𝖲𝗎𝗄𝗂 Título:* ${track.title}\n👤 *𝖲𝗎𝗄𝗂 Artistas:* ${track.artist}\n⏱️ *Duración:* ${track.duration}\n🔥 *Popularidad:* ${track.popularity}\n📅 *Fecha:* ${track.publish}`
}),
        footer: proto.Message.InteractiveMessage.Footer.fromObject({
          text: '𝖲𝗎𝗄𝗂Bot_MD • Spotify Search'
}),
        header: proto.Message.InteractiveMessage.Header.fromObject({
          title: '𝖲𝗎𝗄𝗂 Recomendación',
          hasMediaAttachment: true,
          imageMessage: portada
}),
        nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
          buttons: [
            {
              name: 'cta_copy',
              buttonParamsJson: JSON.stringify({
                display_text: '🎧 Descargar Audio',
                id: 'btn_download',
                copy_code: `.spotifydl ${track.url}`
})
},
            {
              name: 'cta_copy',
              buttonParamsJson: JSON.stringify({
                display_text: '📂 Menú del Bot',
                id: 'btn_menu',
                copy_code: `.menu`
})
}
          ]
})
});
}

    const msg = generateWAMessageFromContent(m.chat, {
      viewOnceMessage: {
        message: {
          messageContextInfo: {
            deviceListMetadata: {},
            deviceListMetadataVersion: 2
},
          interactiveMessage: proto.Message.InteractiveMessage.fromObject({
            body: proto.Message.InteractiveMessage.Body.create({
              text: `*🎧 Resultados de búsqueda para:* 𝖲𝗎𝗄𝗂 ${text}`
}),
            footer: proto.Message.InteractiveMessage.Footer.create({
              text: '𝖲𝗎𝗄𝗂Bot_MD • Shadow Ultra'
}),
            header: proto.Message.InteractiveMessage.Header.create({
              hasMediaAttachment: false
}),
            carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({
              cards: [...push]
})
})
}
}
}, { quoted: m});

    await m.react('✅');
    await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id});

} catch (error) {
    console.error(error);
    m.reply('❌ Ocurrió un error al buscar en Spotify. Intenta nuevamente.');
}
};

handler.help = ['spotifysearch *<texto>*'];
handler.tags = ['search'];
handler.command = ['spotifysearch', 'Spotify'];

export default handler;
