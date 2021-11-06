require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client();

const DISCORD_TOKEN = process.env.DISCORD_TOKEN;

//funcion para el estado del bot
function estadoDelBot(){
    client.user.setPresence ({
        status: 'online',
        activity: {
            name: 'Axie Infinity 😎',
            type: 'PLAYING'
        }
    });
};

client.on('ready', async () => {
    console.log(`Conectado... ${client.user.tag}`);
    estadoDelBot(); //Llamamos la funcion de estado

    await client.channels.cache.get(CHANNEL_ID).messages.fetch(MESSAGE_ID);
});

const CHANNEL_ID = process.env.CHANNEL_ID;
const MESSAGE_ID = process.env.MESSAGE_ID;
const SERVIDOR_ID = process.env.SERVIDOR_ID;
const ROL_ID_VERIFICADO = process.env.ROL_ID_VERIFICADO;
const ROL_ID_NO_VERIFICADO = process.env.ROL_ID_NO_VERIFICADO;


//Funcion agregar roles
client.on("messageReactionAdd", async ( reaction, user) => {
    const servidor = reaction.message.guild
    const mensaje = reaction.message
    const canal = reaction.message.channel
    const miembro = await servidor.members.cache.get(user.id)

    if(servidor.id === SERVIDOR_ID && canal.id === CHANNEL_ID && mensaje.id === MESSAGE_ID && reaction.emoji.name === '✅'){
        miembro.roles.add(ROL_ID_VERIFICADO)
        miembro.roles.remove(ROL_ID_NO_VERIFICADO)
        miembro.send("Bienvenido, ya tienes acceso al servidor de RRVENEZUELA")
    }
})


client.login(DISCORD_TOKEN);