const { Telegraf } = require('telegraf');
const fetch = require('node-fetch');
require('dotenv').config();

const bot = new Telegraf(process.env.TELEGRAM_API_TOKEN);

const openaiApiKey = process.env.OPENAI_API_KEY;

bot.start((ctx) => {
  ctx.reply('Hola! Soy un bot impulsado por ChatGPT. Usa el comando /gpt seguido de tu pregunta.');
});

bot.command('gpt', async (ctx) => {
  const userMessage = ctx.message.text.replace('/gpt', '').trim();
  if (!userMessage) {
    return ctx.reply('Por favor, proporciona una pregunta después del comando /gpt.');
  }

  const response = await fetch('https://api.openai.com/v1/engines/text-davinci-004/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${openaiApiKey}`
    },
    body: JSON.stringify({
      prompt: userMessage,
      max_tokens: 150
    })
  });

  const data = await response.json();
  const botResponse = data.choices[0].text.trim();
  ctx.reply(botResponse);
});

bot.launch();
