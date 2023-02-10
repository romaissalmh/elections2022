
module.exports = (sequelize, Sequelize) => {
    const Advertiser = sequelize.define("advertiser", {
      page_id: {
        type: Sequelize.INTEGER
      },
      page_name: {
        type: Sequelize.STRING
      },
    
    },
    {
        freezeTableName: true,
        tableName: 'advertiser',
        createdAt: false,
        updatedAt: false,
    }
    );
  
   
    return Advertiser;
  };








 