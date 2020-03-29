const Discord = require("discord.js");
const client = new Discord.Client();
const token = require("./secret.js");

client.login(token);
