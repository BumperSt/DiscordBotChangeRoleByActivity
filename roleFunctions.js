const getRandomColor = require('./color')
const fs = require('fs');
const config = require("./config.json");
let loadDB = fs.readFileSync('UserTime.json');
let  userTime = JSON.parse(loadDB);

const CheckOnlineMembersAndAddRole = (client) => { 
    let guild = client.guilds.cache.get(config.SERVER_ID);

    let onlineMembers = guild.members.cache.filter(member => !member.user.bot & member.presence.status != 'offline')
    let onlineMembersId = Array.from(onlineMembers.keys());
    let roles = guild.roles.cache.map(role => role.name)

        for (let auxForNumber in onlineMembersId) {

            let member = onlineMembers.get(onlineMembersId[auxForNumber])  

            if(member.presence.activities[0] != undefined){

                userGame = member.presence.activities[0]["name"];

                if(userGame != "Online" && userGame != "Custom Status"){
                    let userTime =  
                    {       
                        id: member.user.id,
                        memberName: member.user.name,
                        Game : userGame,
                        Time: 40
                    }
                    
                    let data = JSON.stringify(userTime, null, 2);
                    fs.writeFileSync('UserTime.json', data);
                }

                if(userGame == "Custom Status"){
                    if(member.presence.activities[1] != undefined){
                        userGame = member.presence.activities[1]["name"];
                    }else{
                        userGame = "Online"
                    }
                }

            }else{
                userGame = "Online"
            }
            console.log(userGame)

            if(roles.includes(userGame) ){
                let cargo = guild.roles.cache.find(r => r.name === userGame);
                member.roles.set([cargo]);
            }
            else{
                roles.push(userGame)
                guild.roles.create({
                    data: {
                      name: userGame,
                      color: getRandomColor(),
                      hoist: true,
                    },
                    reason: '',
                })
                .then((role)=>{
                    let cargo = guild.roles.cache.find(r => r.name === userGame);
                    member.roles.set([cargo]).catch()
                })
            }
    }
}

const CheckOfflineMembersAndRemoveRole = (client) => {
    let guild = client.guilds.cache.get(config.SERVER_ID);

    let offlineMembers = guild.members.cache.filter(member => !member.user.bot & member.presence.status === 'offline')
    let offlineMembersId = Array.from(offlineMembers.keys());
    for (let auxForNumber in offlineMembersId) {

        let member = offlineMembers.get(offlineMembersId[auxForNumber])  
        let memberRoles = member.roles.cache
        if(memberRoles){
            member.roles.remove(memberRoles);
        }

    }
}

module.exports = {CheckOnlineMembersAndAddRole, CheckOfflineMembersAndRemoveRole}; 
