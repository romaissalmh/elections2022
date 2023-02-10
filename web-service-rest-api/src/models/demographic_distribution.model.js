
module.exports = (sequelize, Sequelize) => {
    const DemographicDistribution = sequelize.define("demographic_distribution", {
      /*id: {
        type: Sequelize.INTEGER,
        primaryKey: true

      },*/
      percentage: {
        type: Sequelize.DOUBLE
      },
      age: {
        type: Sequelize.STRING
      },
      gender: {
        type: Sequelize.STRING
      },
      ad_id: {
        type: Sequelize.INTEGER
      },
      number_potential_reach: {
        type: Sequelize.INTEGER
      },
    
    },
    {
        freezeTableName: true,
        tableName: 'demographic_distribution',
        createdAt: false,
        updatedAt: false,
    }
    );
  
   
    return DemographicDistribution;
  };








 