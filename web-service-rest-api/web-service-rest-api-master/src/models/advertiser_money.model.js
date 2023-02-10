
module.exports = (sequelize, Sequelize) => {
    const AdvertiserMoney = sequelize.define("advertiser_money", {
      id: {
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      page_id: {
        type: Sequelize.INTEGER
      },
      disclaimer: {
        type: Sequelize.STRING
      },
      date: {
        type: Sequelize.INTEGER
      },
      money: {
        type: Sequelize.STRING
      },
      number_of_ads: {
        type: Sequelize.INTEGER
      },
    
    },
    {
        freezeTableName: true,
        tableName: 'advertiser_money',
        createdAt: false,
        updatedAt: false,
    }
    );
  
   
    return AdvertiserMoney;
  };








 