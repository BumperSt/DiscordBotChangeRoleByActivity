const Discord = require("discord.js");
const config = require("./config.json");
const client = new Discord.Client({fetchAllMembers: true});
const cargo = require('./setCargo')
let guild = undefined
let roles = []
let rolesID = []


// let loadDB= fs.readFileSync('UserTime.json');
// let  userTime= JSON.parse(loadDB);

client.on("ready", () => {
    client.user.setPresence({
        game: { 
            name: 'my code',
            type: 'WATCHING'
        },
        status: 'online'
    })

    let guild = undefined
    let roles = []
    let rolesID = []
    guild = client.guilds.cache.get(config.SERVER_ID);
    setInterval(() => { 
        roles = guild.roles.cache.map(role => role.name)
        rolesID = guild.roles.cache.map(role => role.id)
        cargo(guild, roles); 
    }, 5000);
})

client.login(config.BOT_TOKEN);