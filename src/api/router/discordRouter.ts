import * as Discord from "discord.js";
import { Prefix } from "../../config";
import { guildCreateController, guildDeleteController } from "../guild";
import { commandRouterController, roleRouterController } from "./";

const discordRouter = (Client : Discord.Client) => {
  Client.on('guildCreate', guild => {
    guildCreateController.guildCreate(guild.id);
  });
  Client.on('guildDelete', guild => {
    guildDeleteController.guildDelete(guild.id);
  });
  Client.on("message", (message) => {
    if (message.author.bot){
      return;
    }else if (!message.content.startsWith(Prefix))
      roleRouterController.roleRouter(message);
    else
      commandRouterController.commandRouter(message);
  });


}
  
export const discordRouterController = {
  discordRouter,
}