const db = require("../models");
import  sequelize from 'sequelize';
const AdvertiserMoney = db.advertiser_money;
const { Op } = require("sequelize");


const getAllAdvertisersMoney = async(req,res)=>{
    AdvertiserMoney.findAll({
        attributes: ['page_id','disclaimer','date','money','number_of_ads']
      })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "An error occured while retrieving demographic distribution from database."
        });
    });
};

const getAllByAdvertiserName= async(req,res)=>{
    try{
        const data = await db.sequelize.query(`select a.page_id, a.disclaimer, a.date, a.money, a.number_of_ads, d.page_name from advertiser_money a inner join advertiser d on d.page_id = a.page_id `, { model: AdvertiserMoney })
		if (data.length != 0) {
			res.send(data);
		} else {
			res.status(404).send({
				error: 'not_found',
				message: 'No content',
				status: 404,
			})
		}
    }
    catch(err){
        res.status(500).send({
            message:
                err.message || "An error occured while retrieving demographic distribution from database."
        });
    };
};

const getSpendingByAdvertiserLastDay = async(req,res)=>{
    AdvertiserMoney.findAll({
        attributes: ['page_id','disclaimer','date','money','number_of_ads'],
        where: sequelize.where('date',UNIX_TIMESTAMP(subdate(current_date, 1))),

      })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "An error occured while retrieving demographic distribution from database."
        });
    });
};
export default {
    getAllAdvertisersMoney,
    getAllByAdvertiserName,
    getSpendingByAdvertiserLastDay
  }
