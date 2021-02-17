import {
    getConnection,
    QueryFailedError,
    getRepository
  } from 'typeorm';
import * as Discords from "discord.js";
import {
    Discord
  } from '../../entity';
import { guildCreateController } from '../guild';
const giveRole = (message: any, data : Discord) => {

    const channel = String(message.channel.id);
    const guild = String(message.guild.id);

    const role = message.guild.roles.cache.get(data.role);
    if(message.member.roles.cache.has(role.id)) {
        message.react("✅")
    } else {
        message.member.roles.add(role).then(data => {
            message.react("✅")
          }).catch(err =>{
            message.channel.send("지급 할 역할이 상위 역할이거나, 역할 관리 권한이 없습니다.");
        });
    }
}

export const giveRoleController = {
    giveRole,
}