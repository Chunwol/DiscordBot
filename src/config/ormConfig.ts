import { 
   dbHost,
   dbPort,
   dbDatabase,
   dbUser,
   dbPassword
 } from './env'

 import { ConnectionOptions } from "typeorm";

 export const connectionOptions: ConnectionOptions = {
   "type": "mysql",
   "host": dbHost,
   "port": dbPort,
   "username": dbUser,
   "password": dbPassword,
   "database": dbDatabase,

   "charset": "UTF8MB4_UNICODE_CI",
   "synchronize": true,
   "logging": false,

   "entities": [
      "src/entity/*.ts"
   ]

}