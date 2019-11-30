const Discord = require('discord.js')
const client = new Discord.Client();

var prefix = '&'
var token = 'NjM5MTY3OTg5NTc2NDk5MjIx.Xb6_1w.uw3ihBxUOSvf0llvgc_9_Ov639Y'
process.on('uncaughtException', function (err) {
   console.log(err);
});
client.login(token);

client.on('ready',function(){
    console.log("Now connected as Xeriz#2392 with " + `${client.users.size}` + "users and " + `${client.guilds.size}` + "servers")
    const activities = [`${client.guilds.size} serveurs m'ont ajouté! Merci!`,`${client.users.size} utilisateurs! Mercii!`,`${client.channels.size} channels`,"bot crée par npm i mririz.js , tyzok & SCP","prefix : & "];
    client.setInterval(() => {
        const index = Math.floor(Math.random() * activities.length);
        client.user.setActivity(activities[index], {
            type:  "STREAMING"
        });
    },12000);
})

client.on('message', async message =>{
        if(message.content.startsWith(prefix + "clear")){
	       if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(" **Vous n'avez pas la permission** ``MANAGE_MESSAGES`` ")
               let args = message.content.split(" ").slice(1);
               if(!args[0]) return message.channel.send(" **Veuillez entrer un nombre de messages à supprimer.** ")
               message.delete()
               message.channel.bulkDelete(args[0]).then(() => {
                   message.channel.send(`**${args[0]} messages ont été supprimés.**`)
            })
    }
      if(message.content.startsWith(prefix + "ban")){  
    // Most of this command is identical to kick, except that here we'll only let admins do it.
    // In the real world mods could ban too, but this is just an example, right? ;)
    if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("Vous n'avez pas la permission `BAN_MEMBERS`")
     const args = message.content.slice(prefix.length).trim().split(/ +/g);
    let member = message.mentions.members.first();
    if(!member)
      return message.reply("S'il vous plaît mentionnez une personne dans ce serveur !");
    if(!member.bannable) 
      return message.reply("Je ne peux pas bannir cette personne! Est ce que son rôle est plus haut que le mien?? Est ce que j'ai la permission de bannir des membres?");

    let reason = args.slice(1).join(' ');
    if(!reason) reason = "Pas de raison donnée.";
    
    await member.ban(reason)
      .catch(error => message.reply(`Désolé  ${message.author} Je ne peux pas bannir cette personne car  : ${error}`));
    message.reply(`${member.user.tag} a été banni par  ${message.author.tag} raison : ${reason}`);
  }
    if (message.content.startsWith(prefix + "warn")){
        const args = message.content.slice(prefix.length).trim().split(/ +/g);
            var embedColor = '#FF00E7' // Change this to change the color of the embeds!
            var embedColor1 = '#FF0019'
            var embedColor2 = '#FFEC00'
    
    var missingPermissionsEmbed = new Discord.RichEmbed() // Creates the embed thats sent if the user is missing permissions
        .setColor(embedColor)
        .setAuthor(message.author.username, message.author.avatarURL)
        .setTitle('Permissions insuffisantes!')
        .setDescription('Vous avez besoin de la permission `BAN_MEMBERS`!')
        .setTimestamp();
    var missingArgsEmbed = new Discord.RichEmbed() // Creates the embed thats sent if the command isnt run right
        .setColor(embedColor1)
        .setAuthor(message.author.username, message.author.avatarURL)
        .setTitle('Il manque des arguments!')
        .setDescription('Usage: `warn [@User] [Reason]')
        .setTimestamp();
    if(!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send(missingPermissionsEmbed); // Checks if the user has the permission
    let mentioned = message.mentions.users.first(); // Gets the user mentioned!
    if(!mentioned) return message.channel.send(missingArgsEmbed); // Triggers if the user donsn't tag a user in the message
    let reason = args.slice(1).join(' ') // .slice(1) removes the user mention, .join(' ') joins all the words in the message, instead of just sending 1 word
    if(!reason) return message.channe.send(missingArgsEmbed); // Triggers if the user dosn't provide a reason for the warning

    var warningEmbed = new Discord.RichEmbed() // Creates the embed that's DM'ed to the user when their warned!
        .setColor(embedColor2)
        .setAuthor(message.author.username, message.author.avatarURL)
        .setTitle(`Vous avez été warn dans  ${message.guild.name}`)
        .addField('Modérateur :', message.author.tag)
        .addField('Raison:', reason)
        .setTimestamp();
    mentioned.send(warningEmbed); // DMs the user the above embed!
    var warnSuccessfulEmbed = new Discord.RichEmbed() // Creates the embed thats returned to the person warning if its sent.
        .setColor(embedColor)
        .setTitle('La personne a bien été warn!!');
    message.channel.send(warnSuccessfulEmbed); // Sends the warn successful embed
    message.delete(); // Deletes the command
    }
    if(message.content.startsWith(prefix + 'help')){
    const exampleEmbed = {
        color: 0x0099ff,
        title: 'Liste des commandes',
        url: 'https://discord.gg/t53A8QP',
        author: {
            name: 'npm i mririz.js#1114 , SCP , yayo.',
            icon_url: 'http://imgur.com/gallery/zkxanr7',
            url: 'https://discord.gg/t53A8QP',
        },
        description: 'Ici seront mis toutes les commandes du bot!',
        thumbnail: {
            url: 'http://imgur.com/gallery/zkxanr7',
        },
        fields: [
            {
                name: ':iphone: Contact Support :',
                value: ':warning: `Pas encore disponible` :warning:',
            },
            {
                name: '\u200b',
                value: '\u200b',
            },
            {
                name: ':no_entry: Modération :',
                value: '`clear,ban,warn,say,kick.`',
                inline: true,
            },
            {
                name: ':bulb: Utiles :',
                value: '`help,invite,user,channel,partenariat,server,ping.`',
                inline: true,
            },
            {
                name: ' :bookmark_tabs: Anti-Raid:',
                value: ':warning: `Pas encore disponible!` :warning:',
                inline: true,
            },
        ],
        image: {
            url: 'http://imgur.com/gallery/zkxanr7',
        },
        timestamp: new Date(),
        footer: {
            text: 'Développeur : npm i mririz.js , tyzok & SCP',
            icon_url: 'http://imgur.com/gallery/zkxanr7',
        },
    };
    
    message.channel.send({ embed: exampleEmbed });
     
}
    if(message.content.startsWith(prefix + 'invite')){
        message.channel.send("Lien d'invitation du bot : https://discordapp.com/oauth2/authorize?client_id=639167989576499221&permissions=8&scope=bot Support du bot : https://discord.gg/t53A8QP")
}
    if(message.content.startsWith(prefix + "say")){
let args = message.content.split(" ").slice(1);
  let botmessage = args.join(" ");
  message.channel.send(botmessage);
  message.delete()
}
  if (message.content.startsWith(prefix + 'kick')) {
    const member = message.mentions.members.first()
    
    if (!member) {
      return message.reply('Il faut que vous mentionnez une personne :sweat_smile:')
    }
    if (!member.kickable) {
      return message.reply('Je ne peut pas kick ce membre,desoler:thinking:')
    }
    return member
      .kick()
      .then(() => message.reply(`${member.user.tag} a été kick avec succes`))
      .catch(error => message.reply("Une erreur s'est produite"))
  }
        if(message.content.startsWith(prefix + 'update')){
            var updateEmbed = new Discord.RichEmbed()
            .setColor("#00FFAD")
              .setAuthor(message.author.username, message.author.avatarURL)
            .setTitle("Mise à jour")
            .setDescription("Hey ! Merci d'utiliser notre bot! Grâce à cette commande tu pourras suivre toute nos mise à jours!")
            .addField("Partenariats:",`recherche de partenariats (utilisateurs : ${client.users.size} , serveurs : ${client.guilds.size})`, true)
            .addField("Recherche de staff:"," En cours de recrutement :white_check_mark: .", true)
            .addField("Note du staff :",":star: :star: :star: :star: étoiles", true)
            .setTimestamp();
            message.channel.send(updateEmbed); //envoie le RichEmbed
        }
         if(message.content.startsWith(prefix + 'user')){
          message.channel.send(`J'ai un total de ${client.users.size} utilisateurs! Merci les développeurs vous adore! :heart:`)
}
        if(message.content.startsWith(prefix + 'server')){
        message.channel.send(`Je suis dans un total de ${client.guilds.size} serveurs! Merci! On vous adore :heart:`)
}
        if(message.content.startsWith(prefix + 'channel')){
         message.channel.send(`En comptant tout les serveurs ou je suis et en les adittionant il y a un total de ${client.channels.size} salons!`)
}
      if(message.content.startsWith(prefix + 'partenariat')){
      message.channel.send("Nous n'avons aucun partenaire pour l'instant. Vous souhaitez être partenaire? Demandez à un développeur/co createur/créateur.")
}
let botid = '639167989576499221'
if(message.content.startsWith('<@' +  botid + '>' )){
message.channel.send("Mon prefix est **&** ")    
    }
if(message.content.startsWith(prefix + 'ping')){
message.channel.send("Pong!" + new Date().getTime() - message.createdTimestamp + "ms");
}
if(message.content.startsWith(prefix + 'report')){
let args = message.content.slice.split(" ").slice(1)
	let reason = args.slice().join(" ");
	if(!reason)
		return message.channel.send("Veuillez préciser un element à report !").then(message.delete());
	client.users.get("459428978545917952").send(`L'utilisateur ***${message.author.tag}*** a report ceci dans le serveur ***${message.guild.name}***: ${reason} `);
	message.channel.send(`Report effectué pour : **${reason}**`);
}
 if(message.content.startsWith(prefix + 'gaming')){
	var EventEmbed = new Discord.RichEmbed()
            .setColor("#00FFAD")
              .setAuthor(message.author.username, message.author.avatarURL)
            .setTitle("GG!")
            .setDescription("Bravo tu as trouvé la commande secrète! Le staff surveille l'event meme dans les mp grace a un code alors ne dit a personne la commande ou t'es ban! Tu dois maintenant chercher ou est le ticket nommé Event puis l'ouvrir!")
            .addField("Indice:","Help me!",true)
            .setTimestamp();
            message.channel.send(EventEmbed); //envoie le RichEmbed
            message.delete()
}
    });
