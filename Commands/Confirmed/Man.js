const { MessageEmbed } = require('discord.js');
module.exports = {
  name: "erkek",
  description: "Kullanıcıyı erkek olarak kayıt edersiniz.",
  category: "Authorized",
  aliases: ["man", 'e', "orospuerkek"], 
  run: async (client, message, args, EmojiData, LogData, Config, RolData) => {
    let Emb = new MessageEmbed({
      color: "BLACK",
      author: {
        name: "Kayıt",
        icon_url: message.author.avatarURL({ dynamic: true })
      },
    });
    if(message.member.Permissions(Config.Roles.Authorized.Register) === false) return;
    let Member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if(!Member) return message.channel.send({ embeds: [Emb.setDescription("Kayıt işlemi için bir kullanıcı veya ID belirtmek zorundasın.")] }).Delete(3);
    if((Member.roles.highest.position >= message.member.roles.highest.position && message.author.id !== message.guild.ownerId ) || Member.id === message.guild.ownerId  || !Member.manageable || Member.id === message.author.id ) return message.channel.send({ embeds: [Emb.setDescription(`${Member.id === message.guild.ownerId ? "İşlem için belirttiğiniz kullanıcı sunucu sahibi bence fazla zorlama 😬" : message.author.id === Member.id ? "Ne yazık ki kendine işlem uygulayamazsın." : !Member.manageable ? "Belirttiğin kullanıcıya işlem yapmaya ne yazık ki yetkim yetmiyor." : Member.roles.highest.position > message.member.roles.highest.position ? "Belirttiğiniz kullanıcı sizden üst yetkide." : "Belirttiğin kullanıcı ile aynı yetkide bulunuyorsun."}`)] }).Delete(4);
    let Nick = args.slice(1).join(" ");
    await client.Register(Nick, undefined, Member, message, "man")
  }
};
