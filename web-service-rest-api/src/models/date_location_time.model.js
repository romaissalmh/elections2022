
module.exports = (sequelize, Sequelize) => {
    const DateLocationTime = sequelize.define("date_location_time", {
      region: {
        type: Sequelize.INTEGER
      },
      date: {
        type: Sequelize.DATE
      },
      money: {
        type: Sequelize.INTEGER
      },
    
    },
    {
        freezeTableName: true,
        tableName: 'location_money',
        createdAt: false,
        updatedAt: false,
    }
    );
  
   
    return DateLocationTime;
  };








 