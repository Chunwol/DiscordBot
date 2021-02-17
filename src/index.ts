import "reflect-metadata";
import {createConnection} from "typeorm";
import * as Discord from "discord.js";
import { 
    connectionOptions,
    DiscordToken
  } from './config'
import { discordRouterController } from "./api/router/discordRouter";


createConnection(connectionOptions).then(conn => {
    const Client = new Discord.Client();

    Client.once('ready', () => { 
        console.log('[@] Complete.')
    });
    Client.login(DiscordToken);
    discordRouterController.discordRouter(Client);
}).catch(e => {
    console.log('[!] Database connection failed')
    console.log('[!] ' + e.sqlMessage)
    console.log('[!] Code: ' + e.code)
  })
