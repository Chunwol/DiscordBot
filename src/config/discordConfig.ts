import * as Discord from "discord.js";
import { 
  DiscordToken
} from './env'
const client = new Discord.Client();

    client.once('ready', () => { 
        console.log('[@] Complete.')
    });
    
    client.login(DiscordToken);