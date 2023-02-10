
module.exports = (sequelize, Sequelize) => {
    const Ads = sequelize.define("ads", {
      ad_id: {
        type: Sequelize.INTEGER
      },
      currency: {
        type: Sequelize.STRING
      },
      funding_entity: {
        type: Sequelize.STRING
      },
      ad_creative_body: {
        type: Sequelize.STRING
      },
      publisher_platforms: {
        type: Sequelize.STRING
      },
      languages: {
        type: Sequelize.STRING
      },
      lower_bound_impressions: {
        type: Sequelize.INTEGER
      },
      upper_bound_impressions: {
        type: Sequelize.INTEGER
      },
      lower_bound_spend: {
        type: Sequelize.INTEGER
      },
      upper_bound_spend: {
        type: Sequelize.INTEGER
      },
      lower_bound_potential_reach: {
        type: Sequelize.INTEGER
      },
      upper_bound_potential_reach: {
        type: Sequelize.INTEGER
      },
      advertiser_id:{
        type: Sequelize.INTEGER
      },
      ad_creation_time:{
        type: Sequelize.DATE
      },
      ad_delivery_start_time:{
        type: Sequelize.DATE
      },
      ad_delivery_stop_time:{
        type: Sequelize.DATE
      },
      mean_spend:{
        type:Sequelize.INTEGER
      },
       mean_impressions:{
        type:Sequelize.INTEGER
      },
      mean_eur_spend:{
       type:Sequelize.INTEGER
      },
    },
    {
        freezeTableName: true,
        tableName: 'ad',
        createdAt: false,
        updatedAt: false,
    }
    );
  
   
    return Ads;
  };








 