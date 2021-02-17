import * as Discord from "discord.js";
import { guildCreateController } from "../guild";
import { Prefix } from "../../config";
import { channelSettingController } from "../channel";
import { roleSettingController } from "../role";
const commandRouter = (message: Discord.Message) => {

    const guild = String(message.guild.id);
    const channel = String(message.channel.id);
    if (message.content.startsWith(Prefix + "천월 채팅방설정")) {
        if(message.member.hasPermission("ADMINISTRATOR"))
            channelSettingController.channelSetting(message);
        else
            message.channel.send("명령어를 사용할 권한이 없습니다.");
        
    } else if (message.content.startsWith(Prefix + "천월 기본역할설정 ")) {
        if(message.member.hasPermission("ADMINISTRATOR"))
        roleSettingController.roleSetting(message);
        else
            message.channel.send("명령어를 사용할 권한이 없습니다.");
        
    }
}

export const commandRouterController = {
    commandRouter,
}