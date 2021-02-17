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
import { giveRoleController } from '../member/giveRole';
const roleRouter = (message: Discords.Message) => {
    const channel = String(message.channel.id);
    const guild = String(message.guild.id);

    getRepository(Discord).findOne({where: {guild}}).then(data => {
        if(data == undefined){
            guildCreateController.guildCreate(guild);
            message.channel.send("DB 정보가 존재하지 않습니다.\n데이터를 초기화합니다.");
            return;
        }else if(data.channel == null){
            return;
        }else if(data.channel != channel){
            return;
        } else if(data.channel == channel && data.role == null ){
            message.channel.send("기본 역할을 정해주세요.");
            return;
        }else if(data.channel == channel && data.role != null ){
            giveRoleController.giveRole(message, data);
        }
    })
    .catch(err => {
      console.log("Database_Error")
    })
}

export const roleRouterController = {
    roleRouter,
}