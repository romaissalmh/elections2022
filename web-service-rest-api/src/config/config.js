import dotenv from 'dotenv'

dotenv.config();

export default{
  port: process.env.PORT,
  mysql:{
      HOST:process.env.DB_HOST,
      DB:process.env.DB_NAME,
      PASSWORD:process.env.DB_PASSWD,
      USER:process.env.DB_USER,
      dialect: "mysql",
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      }


  }
}

