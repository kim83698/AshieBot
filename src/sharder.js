//Requires discord.js for sharding
const { ShardingManager } = require('discord.js');

const config = require("../config.json");

const manager = new ShardingManager(require("path").join(__dirname, "index.js"), { token: config.token });

manager.spawn("auto");

manager.on("shardCreate", (shard) => console.log(`Spawned shard #${shard.id}`))
