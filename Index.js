const Discord = require("discord.js");
const config = require("./config.json");
const client = new Discord.Client({fetchAllMembers: true});
const {CheckOnlineMembersAndAddRole, CheckOfflineMembersAndRemoveRole} = require('./roleFunctions')


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
    CheckOfflineMembersAndRemoveRole(client)
    CheckOnlineMembersAndAddRole(client); 

    setInterval(() => { 
        CheckOnlineMembersAndAddRole(client); 
    }, 15000);
    setInterval(() => { 
        CheckOfflineMembersAndRemoveRole(client)

    }, 60000)
})

client.login(config.BOT_TOKEN);