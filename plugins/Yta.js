let limit = 100

const { servers, yta } = require('../lib/y2mate')

let handler = async (m, { conn, args, isPrems, isOwner, usedPrefix, command }) => {

  if (!args || !args[0]) throw `contoh:\n${usedPrefix + command} https://www.youtube.com/watch?v=PmTdj_G3uRY`

  let chat = global.db.data.chats[m.chat]

  let server = (args[1] || servers[0]).toLowerCase()

  let { dl_link, thumb, title, filesize, filesizeF } = await yta(args[0], servers.includes(server) ? server : servers[0])

  let isLimit = (isPrems || isOwner ? 99 : limit) * 1024 < filesize

  m.reply(isLimit ? ` File: ${filesizeF}\nfile ${limit} MB, download : ${dl_link}` : global.wait)

  if (!isLimit) conn.sendFile(m.chat, dl_link, title + '.mp3', `

*නම:* ${title}

*File:* ${filesizeF}

`.trim(), m, null, {

    asDocument: chat.useDocument, mimetype: 'audio/mp4', upload: conn.waUploadToServer

  })

}

handler.help = ['mp3', 'a'].map(v => 'yt' + v + ` <url> [server: ${servers.join(', ')}]`)

handler.tags = ['downloader']

handler.command = /^yt(2|mp2)$/i

handler.owner = false

handler.mods = false

handler.premium = false

handler.group = false

handler.private = false

handler.admin = false

handler.botAdmin = false

handler.fail = null

handler.exp = 0

handler.limit = true

module.exports = handler
