const Discord = require("discord.js");
const client = new Discord.Client();

const config = require("./config.json");
const prefix = config.PREFIX

//status
client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}\n\nMade by Lyroxx\nhttps://github.com/dev-lyroxx`);
    
    setInterval(() => {

        let statuse = [
            "Made by Lyroxx",
            `Moderation Bot`,
            "https://github.com/dev-lyroxx/moderation-bot"
        ]
        let number = 0;

    client.user.setActivity(statuse[statuse.length]);

        let rstatus = statuse[number];

        client.user.setActivity(rstatus);

            number++;

            if(number >= statuse.length){
                number = 0;

            }
        }, 5000)
})

//clear
client.on("message", (message) => {
    if(message.content.startsWith(prefix +"clear")){
        let messages = message.content.split(" ").slice(1).join("");
        message.delete();
	if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply(new Discord.MessageEmbed().setDescription("You dont have enough perms!").setColor(config.COLOR))
        if(isNaN(messages)) return message.reply(new Discord.MessageEmbed().setDescription("This isnt a valid number!").setColor(config.COLOR))

        message.channel.bulkDelete(messages);
        message.channel.send(new Discord.MessageEmbed().setDescription(`Deleted ${messages} messages.`).setColor(config.COLOR))
    
       
    }
})

//kick
client.on("message", async message => {
    if(message.content.startsWith(prefix+"kick")){
        if(!message.member.hasPermission("KICK_MEMBERS")) return message.reply(new Discord.MessageEmbed().setDescription("You dont have perms!").setColor(config.COLOR)).then(msg=>msg.delete({timeout: "5000"}))
        var member = message.mentions.members.first();

        //if no user
        if(!member) return  message.channel.send(new Discord.MessageEmbed().setDescription("Please mention an user!").setColor(config.COLOR))
        if(member.id === message.author.id){
             return message.channel.send(new Discord.MessageEmbed().setDescription("You cant kick yourself!").setColor(config.COLOR))
        }
             // Kick
    member.kick().then((member) => {
        // Successmessage
        message.channel.send(new Discord.MessageEmbed().setTitle("Kick").setDescription(`${member} got kicked by ${message.author}\n\nKicked User **PING | ID | TAG**\n<@${member.id}> | ${member.id} | ${member.user.tag}`).setColor(config.COLOR).setFooter(ee.footertext, ee.footericon));
        
    }).catch(() => {
        // Failmessage
        message.channel.send(new Discord.MessageEmbed().setDescription(`I cant kick this User!`).setColor(config.COLOR));
    });


            
            }
        

})

//bann
client.on("message", async message => {
    if(message.content.startsWith(prefix+"ban")){
        if(!message.member.hasPermission("BAN_MEMBERS")) return message.reply(new Discord.MessageEmbed().setDescription("You dont have perms!").setColor(config.COLOR)).then(msg=>msg.delete({timeout: "5000"}))
        var member = message.mentions.members.first();

        //if no user
        if(!member) return  message.channel.send(new Discord.MessageEmbed().setDescription("Please mention an user!").setColor(config.COLOR))
        if(member.id === message.author.id){
             return message.channel.send(new Discord.MessageEmbed().setDescription("You cant ban yourself!").setColor(config.COLOR))
        }
             // ban
    member.ban().then((member) => {
        // Successmessage
        message.channel.send(new Discord.MessageEmbed().setTitle("Ban").setDescription(`${member} got banned by <@${message.author.id}>\n\nBanned User **PING | ID | TAG**\n<@${member.id}> | ${member.id} | ${member.user.tag}`).setColor(config.COLOR).setFooter(ee.footertext, ee.footericon));
        
       
    }).catch(() => {
        // Failmessage
        message.channel.send(new Discord.MessageEmbed().setDescription(`I cant ban this User!`).setColor(config.COLOR));
    });

        
           
    
    
    }

})

client.login(config.TOKEN)

