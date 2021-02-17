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
const roleSetting = async (message: any) => {
    const channel = String(message.channel.id);
    const guild = String(message.guild.id);
    let roleA = await message.guild.roles.cache.find(role => role.name === message.content.slice(11));
    if(roleA == undefined){
        roleA = await message.guild.roles.cache.get(message.content.slice(14,-1));
        if(roleA == undefined){
            message.channel.send("존재하지 않는 역할입니다.");
            return;
        }else if(!message.guild.me.hasPermission("MANAGE_ROLES")){
            message.channel.send("지급 할 역할이 상위 역할이거나, 역할 관리 권한이 없습니다.");
            return;
        }
    }
    const repository = getConnection().getRepository(Discord);
    repository.findOne({where: {guild}}).then(data => {
        if(data == undefined){
            guildCreateController.guildCreate(guild);
            message.channel.send("DB 정보가 존재하지 않습니다.\n데이터를 초기화합니다.");
            return;
        }else if(data.role == null || data.role != roleA.id){
            data.role = roleA.id;
            return repository.manager
            .save(data)
            .then(data => {
                message.channel.send("역할 설정이 완료되었습니다.");
            }).catch(err => {
                console.log(err);
                message.channel.send("설정에 실패하였습니다.\n개발자에게 문의 바랍니다.\n에러코드 : " + err['code']);
            })
        } else if(data.role == roleA.id){
            data.role = null;
            return repository.manager
            .save(data)
            .then(data => {
                message.channel.send("역할 해제가 완료되었습니다.");
            }).catch(err => {
                console.log(err);
                message.channel.send("설정에 실패하였습니다.\n개발자에게 문의 바랍니다.\n에러코드 : " + err['code']);
            })
        }
    })
    .catch(err => {
      console.log("Database_Error")
    })
}

export const roleSettingController = {
    roleSetting,
}