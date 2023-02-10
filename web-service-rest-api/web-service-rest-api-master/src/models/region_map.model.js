
module.exports = (sequelize, Sequelize) => {
    const RegionMap = sequelize.define("region_map", {
     
      region: {
        type: Sequelize.STRING
      },
      number_of_ads: {
        type: Sequelize.INTEGER
      },
      mean_spend: {
        type: Sequelize.INTEGER
      },
    
    },
    {
        freezeTableName: true,
        tableName: 'region_map',
        createdAt: false,
        updatedAt: false,
    }
    );
  
   
    return RegionMap;
  };








 