const Discord = require('discord.js');
const client = new Discord.Client();
const openai = require('openai')('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');

client.on('message', async message => {
  if (message.author.bot) return;
  if (message.channel.type === 'dm') return;

  const question = message.content;

  openai.complete({
    engine: 'text-davinci-002',
    prompt: question,
    maxTokens: 150,
    n: 1,
    stop: '\n'
  }).then(gptResponse => {
    const response = gptResponse.data.choices[0].text;
    message.channel.send(response);
  }).catch(err => {
    console.log(err);
  });
});

client.login(process.env.token);
