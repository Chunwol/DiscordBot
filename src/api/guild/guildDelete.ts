import {
    getConnection,
    QueryFailedError,
  } from 'typeorm';

  import {
    Discord
  } from '../../entity';
  import {
    plainToClassFromExist,
  } from 'class-transformer';

const guildDelete = (guildid : string) => {
    const repository = getConnection().getRepository(Discord)

    let data = {
        guild : typeof guildid !== 'string' ? console.log("형식 에러") : String(guildid),
    }
    let discord = new Discord() // 쿼리 데이터 삽입 부분
    discord = plainToClassFromExist(discord, data)

    return repository.manager
    .remove(discord)
    .then(data => {
      console.log("길드 탈퇴 성공");
    }).catch(err => {
      if (err instanceof QueryFailedError) {
        console.log(err['code']);
      } else {
        console.log("Database_Error"); //모르는 DB에러
        console.log(err); //모르는 DB에러
      }
    })
    
}
  
export const guildDeleteController = {
    guildDelete,
}