const { Telegraf } = require("telegraf")
const mongoose = require('mongoose')

const s = new mongoose.Schema({
  msg: {
    type: String
  }
})

const testModel = mongoose.model('test',s)

mongoose.connect(process.env.DB, {
	useNewUrlParser: true,
	useUnifiedTopology: true
})
.then((d) => console.log('Database connected'))
.catch((e) => console.log(e))

const bot = new Telegraf(process.env.BOT_TOKEN)

bot.start(ctx => {
  return ctx.reply('hi')
})

bot.command('test',ctx=>{
  ctx.reply("This is test command not from db")
})

bot.command('testdb',ctx=>{
  testModel.find()
  .then(data=>{
    return ctx.reply(data[0].msg)
  })
  .catch(e=>console.log(e))
})


exports.handler = async event => {
  try {
    await bot.handleUpdate(JSON.parse(event.body))
    return { statusCode: 200, body: "" }
  } catch (e) {
    console.error("error in handler:", e)
    return { statusCode: 400, body: "This endpoint is meant for bot and telegram communication" }
  }
}

// bot.launch()