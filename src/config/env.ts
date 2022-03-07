import * as dotenv from 'dotenv';
dotenv.config();


export const dbHost : string = process.env.DB_HOST! || 'chunwol.xyz';
export const dbPort : number = Number(process.env.DB_PORT)! || 3306;

export const dbDatabase : string = process.env.DB_NAME! || 'Mysql';

export const dbUser : string = process.env.DB_USER! || 'null';
export const dbPassword : string = process.env.DB_PW! || 'null';

export const DiscordToken : string = process.env.DISCORD_TOKEN! || '0';

export const Prefix : string = process.env.PREFIX! || '!';
