import  dbConfig from '../config/config';
import  Sequelize from 'sequelize';

const sequelize = new Sequelize(dbConfig.mysql.DB, dbConfig.mysql.USER, dbConfig.mysql.PASSWORD, {
  host: dbConfig.mysql.HOST,
  dialect: dbConfig.mysql.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.mysql.pool.max,
    min: dbConfig.mysql.pool.min,
    acquire: dbConfig.mysql.pool.acquire,
    idle: dbConfig.mysql.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.ads = require("./ads.model")(sequelize, Sequelize);
db.demographic_distribution = require("./demographic_distribution.model")(sequelize, Sequelize);
db.region_distribution = require("./region_distribution.model")(sequelize, Sequelize);
db.advertiser = require("./advertiser.model")(sequelize, Sequelize);
db.date_location_time = require("./date_location_time.model")(sequelize, Sequelize);
db.advertiser_money = require("./advertiser_money.model")(sequelize, Sequelize);
db.region_map = require("./region_map.model")(sequelize, Sequelize);

module.exports = db;
