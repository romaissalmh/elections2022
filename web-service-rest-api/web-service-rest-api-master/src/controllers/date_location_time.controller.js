const db = require("../models")
import  sequelize from 'sequelize'
const DateLocationTime = db.date_location_time;
const { Op } = require("sequelize")


const getAllDateLocationTime= async (req,res)=>{
    try{
        const data = await DateLocationTime.findAll({
            attributes: ['region',sequelize.literal("FROM_UNIXTIME(`date`)"),'money']
          })
        console.log(data)
        res.send(data)
    }
    catch (err) {
        res.status(500).send({
            message:
                err.message || "An error occured while retrieving date location time from database."
        })
    }
}


const getDateLocationTimeByRegion = async (req,res)=>{
    
    try{

             
        let region = req.params.region
        let location = []
        switch (region) {
            case 'Auvergne':
                    location = ["Auvergne"];
                    break;
            case 'Bourgogne':
                    location = ["Bourgogne","Franche-Comté"];
                    break;
            case 'Bretagne':
                    location = ["Bretagne"];
                    break;
            case 'Centre':
                    location = ["Centre"];
                    break;
            case 'Corse':
                    location = ["Corse"];
                    break;
            case 'Alsace':
                    location = ["Alsace","Lorraine","Champagne-Ardenne"];
                    break;
            case 'Picardie':
                    location = ["Picardie","Nord-Pas-de-Calais"];
                    break;
            case 'Île-de-France':
                    location = ["Île-de-France"];
                    break;
            case 'Haute-Normandie':
                    location = ["Haute-Normandie","Basse-Normandie"];
                    break;
            case 'Limousin':
                    location = ["Limousin","Aquitaine","Poitou-Charentes"];
                    break;
            case 'Midi-Pyrénées':
                    location = ["Midi-Pyrénées","Languedoc-Roussillon"];
                    break;
            case 'Pays de la Loire':
                    location = ["Pays de la Loire"];
                    break;
            case "Provence-Alpes-Côte d'Azur":
                    location = ["Provence-Alpes-Côte d'Azur"];
                    break;
        

        }
        const data = await DateLocationTime.findAll({
            attributes: [ 
            [sequelize.fn('SUM', sequelize.col('money')),'money'] ,
            [sequelize.literal("FROM_UNIXTIME(`date`)"),'date']  ],
            where:{
                [Op.and]: [
                    { 'region':{ [Op.in]: location} },
                    sequelize.where(sequelize.fn('year',sequelize.fn('FROM_UNIXTIME', sequelize.col(`date`) )), {
                        [Op.eq]: 2022
                      })
                ]
              },
            
            group: ['date'],
            order:['date']
          })
   
        res.send(data);
    }

        
    catch(err){
        res.status(500).send({
            message:
                err.message || "An error occured while retrieving demographic distribution from database."
        });
    }
}



const getDateLocationTimeByDay= async (req,res)=>{
    
    try{
        const data = await DateLocationTime.findAll({
            attributes: [
            [sequelize.literal("FROM_UNIXTIME(`date`)")  ,'date'],
            [sequelize.fn('SUM', sequelize.col('money')),'totalSpent']] ,
            group: ['region'],
             order:['date']
          })
   
        res.send(data);
    }
    catch(err){
        res.status(500).send({
            message:
                err.message || "An error occured while retrieving demographic distribution from database."
        });
    }
}
export default {
    getAllDateLocationTime,
    getDateLocationTimeByRegion,
    getDateLocationTimeByDay  
}
