
module.exports = (sequelize, Sequelize) => {
    const RegionDistribution = sequelize.define("region_distribution", {
      /*id: {
        type: Sequelize.INTEGER,
        primaryKey: true

      },*/
      percentage: {
        type: Sequelize.DOUBLE
      },
      region: {
        type: Sequelize.STRING
      },
      ad_id: {
        type: Sequelize.INTEGER
      },
      mean_spend: {
        type: Sequelize.INTEGER
      },
    
    },
    {
        freezeTableName: true,
        tableName: 'region_distribution',
        createdAt: false,
        updatedAt: false,
    }
    );
  
   
    return RegionDistribution;
  };








 