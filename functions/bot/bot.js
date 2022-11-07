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

const bot = new Telegraf(process.env.BOT_TOKEN)

bot.start(ctx => {
  console.log("Received /start command")
  try {
    return ctx.reply("Hi")
  } catch (e) {
    console.error("error in start action:", e)
    return ctx.reply("Error occured")
  }
})

bot.command('test',ctx=>{
  ctx.reply("This is test command")
})

bot.command('test',ctx=>{
  testModel.find()
  .then(data=>{
    ctx.reply(data[0].msg)
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