
const db = require("../models");
import  sequelize from 'sequelize';
const RegionMap = db.region_map;
const { Op } = require("sequelize");


const getNumberOfAdsByRegion = async (req,res)=>{
    

    try{
        const data = await RegionMap.findAll({
            attributes: ['region','number_of_ads']
          })
        res.send(data);
    }
    catch (err) {
        res.status(500).send({ 
            message:
                err.message || "An error occured while retrieving region distribution from database."
        });
    }
};

const getExpenditureByRegion = async (req,res)=>{
    

    try{
        const data = await RegionMap.findAll({
            attributes: ['region','mean_spend']
          })
        res.send(data);
    }
    catch (err) {
        res.status(500).send({ 
            message:
                err.message || "An error occured while retrieving region distribution from database."
        });
    }
};


const getImpressionsByRegion = async (req,res)=>{
    

    try{
        const data = await RegionMap.findAll({
            attributes: ['region','mean_impressions']
          })
        res.send(data);
    }
    catch (err) {
        res.status(500).send({ 
            message:
                err.message || "An error occured while retrieving region distribution from database."
        });
    }
};
export default {
    getNumberOfAdsByRegion,
    getExpenditureByRegion,
    getImpressionsByRegion
    
}
