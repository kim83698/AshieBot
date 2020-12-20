const GardenBotClient = require('./Structures/GardenBotClient');
const config = require('../config.json');
const Discord = require("discord.js")

const logs = require('../logs.json');

const { MessageEmbed } = require("discord.js")

const client = new GardenBotClient(config);
client.start();

