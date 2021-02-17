import {
    getConnection
  } from 'typeorm';
import * as Discords from "discord.js";
import {
    Discord
  } from '../../entity';
import { guildCreateController } from '../guild';
import { giveRoleController } from '../member/giveRole';
const channelSetting = (message: Discords.Message) => {
    const channel = String(message.channel.id);
    const guild = String(message.guild.id);
    const repository = getConnection().getRepository(Discord);
    
    repository.findOne({where: {guild}}).then(data => {
        if(data == undefined){
            guildCreateController.guildCreate(guild);
            message.channel.send("DB 정보가 존재하지 않습니다.\n데이터를 초기화합니다.");
            return;
        }else if(data.channel == null || data.channel != channel){
            data.channel = channel;
            return repository.manager
            .save(data)
            .then(data => {
                message.channel.send("채팅방 설정이 완료되었습니다.");
            }).catch(err => {
                console.log(err['code']);
                message.channel.send("설정에 실패하였습니다.\n개발자에게 문의 바랍니다.\n에러코드 : " + err['code']);
            })
        } else if(data.channel == channel){
            data.channel = null;
            return repository.manager
            .save(data)
            .then(data => {
                message.channel.send("채팅방 해제가 완료되었습니다.");
            }).catch(err => {
                console.log(err['code']);
                message.channel.send("설정에 실패하였습니다.\n개발자에게 문의 바랍니다.\n에러코드 : " + err['code']);
            })
        }
    })
    .catch(err => {
      console.log("Database_Error")
    })
    
}

export const channelSettingController = {
    channelSetting,
}