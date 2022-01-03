const getRandomColor = require('./color')
const fs = require('fs');


const cargo = (guild, roles) => { 
    let mem = guild.members.cache.filter(member => !member.user.bot & member.presence.status === 'online')
    let memID = Array.from(mem.keys());
        for (let num in memID) {
            let user = mem.get(memID[num])  
            if(user.presence.activities[0] != undefined){
                userGame = user.presence.activities[0]["name"];
                if(userGame != "Online" && userGame != "Custom Status"){
                    let userTime =  
                    {       
                        id: user.user.id,
                        Game : userGame,
                        Time: 40
                        
                    }
                    let data = JSON.stringify(userTime, null, 2);
                    fs.writeFileSync('UserTime.json', data);
                }
                if(userGame == "Custom Status"){
                    if(user.presence.activities[1] != undefined){
                        userGame = user.presence.activities[1]["name"];
                    }else{
                        userGame = "Online"
                    }
                }
            }else{
                userGame = "Online"
            }
            if(roles.includes(userGame) ){
                let cargo = guild.roles.cache.find(r => r.name === userGame);

                user.roles.set([cargo]);
            }else{
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
                    user.roles.set([cargo]).catch()
                })
            }
    }
}

module.exports = cargo; 
