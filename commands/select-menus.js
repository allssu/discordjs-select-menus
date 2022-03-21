const { SlashCommandBuilder } = require("@discordjs/builders");
const {
  MessageActionRow,
  MessageSelectMenu,
  MessageEmbed,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("셀렉트메뉴")
    .setDescription("셀렉트 메뉴를 호출합니다!"),
  async execute(interaction) {
    const row = new MessageActionRow().addComponents(
      new MessageSelectMenu()
        .setCustomId("select")
        .setPlaceholder("선택되지 않음")
        .addOptions([
          {
            label: "ALLSSU봇 프로필",
            description: "얼쑤봇을 소개합니다 (embed)",
            value: "profile",
          },
          {
            label: "ALLSSU봇 설명서",
            description: "얼쑤봇 설명서입니다",
            value: "guide",
          },
          {
            label: "셀렉트3",
            description: "설명3(아직)",
            value: "select3",
          },
          {
            label: "셀렉트4",
            description: "설명4(미구현)",
            value: "select4",
          },
        ])
    );

    await interaction.reply({ content: "셀렉트메뉴 호출", components: [row] });

    const filter = (interaction) => {
      return interaction.customId === "select";
    };

    const collector = interaction.channel.createMessageComponentCollector({
      filter,
      time: 60 * 1000,
    });

    collector.on("collect", async (interaction) => {
      if (interaction.customId === "select") {
        const selectedValue = interaction.values[0];
        if (selectedValue === "profile") {
          const embed = new MessageEmbed()
            .setTitle("얼쑤봇 프로필")
            .setURL("https://www.youtube.com/channel/UCZtMUSjSh9CLeIgNKvDdwBw")
            .setColor(0x00d8ff)
            .setDescription("안녕하세요 얼쑤봇입니다. 저를 소개하겠습니다🙌")
            .setThumbnail(
              "https://lh3.googleusercontent.com/a-/AOh14GgJKLfXCV_QbOENbw7MiZOjG43M2tqKrVqeA7mRUg=s600-k-no-rp-mo"
            )
            .addFields(
              { name: "취미", value: "대답하기🥴", inline: true },
              { name: "특기", value: "로봇🔌", inline: true },
              { name: "혈액형", value: "O형🅾️", inline: true },
              { name: "사는곳", value: "컴퓨터💻", inline: true },
              { name: "좋아하는것", value: "전기⚡️", inline: true },
              { name: "싫어하는것", value: "물💧", inline: true }
            )
            .setImage(
              "https://lh3.googleusercontent.com/a-/AOh14GgJKLfXCV_QbOENbw7MiZOjG43M2tqKrVqeA7mRUg=s600-k-no-rp-mo"
            )
            .setTimestamp(new Date());

          interaction.channel.send({ embeds: [embed] });
          interaction.deferUpdate();
        } else {
          interaction.reply({
            content: selectedValue + " 기능이 구현되지 않았어!",
            ephemeral: true,
          });
        }
      }
    });

    collector.on("end", async (collect) => {
      console.log("시간초과!");
    });
  },
};
