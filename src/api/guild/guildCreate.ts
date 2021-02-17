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

const guildCreate = (guildid : string) => {
    const repository = getConnection().getRepository(Discord);
    

    let data = {
        guild : typeof guildid !== 'string' ? null : String(guildid),
    }
    let discord = new Discord() // 쿼리 데이터 삽입 부분
    discord = plainToClassFromExist(discord, data)

    return repository.manager
    .save(discord)
    .then(data => {
      console.log("길드 가입 성공");
    }).catch(err => {
      if (err instanceof QueryFailedError) {
        console.log(err['code']);
      } else {
        console.log("Database_Error"); //모르는 DB에러
        console.log(err); //모르는 DB에러
      }
    })
}
  
export const guildCreateController = {
    guildCreate,
}