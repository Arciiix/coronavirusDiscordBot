const Discord = require("discord.js");
const fetch = require("node-fetch");
const client = new Discord.Client();
const token = require("./secret.js");
const prefix = "!";

client.on("message", async data => {
  if (data.content.startsWith(prefix)) {
    let split = data.content.split(" ");
    if (split[0].toLowerCase() == `${prefix}corona`) {
      let poland = await getCountry();
      let world = await getWorld();

      //Messages
      const polandEmbed = new Discord.MessageEmbed()
        .setColor("#db3c30")
        .setTitle("Koronawirus - ilość zarażonych w Polsce")
        .addFields(
          { name: "Zarażeni:", value: poland.confirmed },
          {
            name: "Zmarli",
            value: poland.deaths
          }
        )
        .setThumbnail(
          "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Flag_of_Poland.svg/1200px-Flag_of_Poland.svg.png"
        )
        .setTimestamp();

      const worldEmbed = new Discord.MessageEmbed()
        .setColor("#488adb")
        .setTitle("Koronawirus - ilość zarażonych na świecie")
        .addFields(
          { name: "Zarażeni:", value: world.confirmed },
          {
            name: "Zmarli",
            value: world.deaths
          }
        )
        .setThumbnail(
          "https://pbs.twimg.com/profile_images/587949417577066499/3uCD4xxY_400x400.jpg"
        )
        .setTimestamp();

      const info = new Discord.MessageEmbed()
        .setColor("#46f05c")
        .setTitle("Autor - Arciiix")
        .setThumbnail(
          "https://cdn.discordapp.com/avatars/261155655006552065/9b73767003c74d1a1a5e71371dc04d7d.png"
        )
        .setDescription(`Źródło danych: Johns Hopkins University`);

      data.channel.send(polandEmbed);
      data.channel.send(worldEmbed);
      data.channel.send(info);
      console.log("Sent data: ");
      console.log(poland);
      console.log(world);
      console.log("\n");
    }
  }
});

function getCountry() {
  return new Promise((resolve, reject) => {
    //I use free coronavirus api: https://coronavirus-tracker-api.herokuapp.com/
    fetch(
      "https://coronavirus-tracker-api.herokuapp.com/v2/locations/183?source=jhu&timelines=false"
    )
      .then(data => data.json())
      .then(data => {
        let obj = data.location.latest;
        obj.update = data.location.last_updated;
        resolve(obj);
      })
      .catch(err => {
        console.error(err);
        reject(err);
      });
  });
}
function getWorld() {
  return new Promise((resolve, reject) => {
    //I use free coronavirus api: https://coronavirus-tracker-api.herokuapp.com/
    fetch("https://coronavirus-tracker-api.herokuapp.com/v2/latest?source=jhu")
      .then(data => data.json())
      .then(data => {
        resolve(data.latest);
      })
      .catch(err => {
        console.error(err);
        reject(err);
      });
  });
}

client.login(token);
