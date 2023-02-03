const { SlashCommandBuilder, EmbedBuilder, Colors } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("rlogs")
        .setDescription("Enable logging for KeyAuth Redeem Bot"),

    async execute(interaction, client) {

        await interaction.deferReply({ ephemeral: true });

        const channel = await interaction.guild.channels.cache.find(channel => channel.name === 'prebeta-logs');
        if (channel) {
            console.log(`[RLOGS] ${interaction.member.user.id} tryed to create Logging channel, but it already exists.`);

            const embed = new EmbedBuilder()
                .setDescription(`<@${interaction.member.user.id}>, ${channel} **Already Exists.** \n\n**If you don't want to log anymore just delete: ** ${channel}.`);

            interaction.editReply({
                embeds: [embed],
                ephemeral: true,
            })

            return false;
        } else {
            if (isEmpty(client.admin_role_id)) {
                interaction.editReply({
                    embeds: [new EmbedBuilder().setDescription(`**Admin role haven't been set up yet, Go to** **index.js** **and Set it up.**`).setColor(Colors.Red).setFooter({ text: "KeyAuth Redeem Bot v5.2.2" }).setTimestamp()],
                    ephemeral: true,
                })
                return false;
            }
            console.log("[RLOGS] Creating Logging Channel...");


            await interaction.guild.channels.create("PreBeta-Logs", {
                type: "text",
                permissionOverwrites: [
                    {
                        id: client.admin_role_id,
                        allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY'],
                        deny: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY']
                    },
                    {
                        id: interaction.guild.roles.everyone,
                        deny: ['VIEW_CHANNEL'],
                    },
                ],
            });

            interaction.editReply({
                embeds: [new EmbedBuilder().setDescription(`**Okay, now the channel is created :) for <@&${client.admin_role_id}>**`).setColor(Colors.Red).setFooter({ text: "KeyAuth Redeem Bot v5.2.2" }).setTimestamp()],
                ephemeral: true,
            });
        }
    },
};

function isEmpty(str) {
    return (!str || str.length === 0);
}