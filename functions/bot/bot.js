const { Telegraf } = require("telegraf")
const mongoose = require('mongoose')

const s = new mongoose.Schema({
  msg: {
    type: String
  }
})

const testModel = mongoose.model('test',s)

mongoose.connect('mongodb+srv://rasedul20:rasedul20@telegramcluster.xfaz1rx.mongodb.net/sdBot', {
	useNewUrlParser: true,
	useUnifiedTopology: true
})
.then((d) => console.log('Database connected'))
.catch((e) => console.log(e))

const bot = new Telegraf('5778440630:AAHUx8xYvPy-3UFrxJtDkTfWXyLAVhtYutY')

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