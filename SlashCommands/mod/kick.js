module.exports = {
  name: "kick",
  options: [
    {
      name: "member",
      description: "Must mention a user to kick!",
      type: "USER",
      required: true
    },
    {
      name: "reason",
      description: "Reason of kicking the member (Optional)",
      type: "STRING",
      required: false
    },
  ],
  permissions: ["KICK_MEMBERS"],
  description: "Kick A Member!",
  run : async(client, interaction, args) => {


  const Member = interaction.options.getMember("member");
  const reason = interaction.options.getString("reason");

  if(!Member) return interaction.followUp({ content: `[${client.config.error}] Please mention a member that you want to kick!` });
  if (Member.id === interaction.user.id)
      return interaction.followUp({ content: `[${client.config.warning}] You can't kick your self!` });

  if(Member.id === client.user.id) return interaction.followUp({ content: "[:cry:] Please don't kick me ;-;" })
 
  if(!reason) {
   interaction.followUp({ content: `[${client.config.success}] ${Member.user.tag} has been kicked!` });
   await Member.kick("No reason provided!");
  } else {
     interaction.followUp({ content: `[${client.config.success}] ${Member.user.tag} has been kicked! Reason: ${reason}` });
   await Member.kick(reason);
  }
}
}