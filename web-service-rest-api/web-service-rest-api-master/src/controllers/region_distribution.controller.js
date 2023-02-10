const db = require("../models");
import  sequelize from 'sequelize';
const RegionDistribution = db.region_distribution;
const { Op } = require("sequelize");
const Ad = db.ads
const Advertiser = db.advertiser


const getAllRegionDistribution = async (req,res)=>{
    

    try{
        const data = await RegionDistribution.findAll({
            attributes: [/*'id', */'percentage','region','ad_id','mean_spend']
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





const getNumberOfAdsByRegion = async(req,res)=>{
    RegionDistribution.findAll({
        attributes: [
        'region',
        [sequelize.fn('COUNT', sequelize.col('ad_id')),'countAds']   ],
        where: [{ 'region':{ [Op.in]:["Alsace","Aquitaine","Auvergne","Basse-Normandie","Bourgogne","Bretagne","Centre","Champagne-Ardenne","Corse","Franche-Comté","Haute-Normandie","Ile-de-France","Languedoc-Roussillon","Limousin","Lorraine","Midi-Pyrénées","Nord-Pas-de-Calais","Pays de la Loire","Picardie","Poitou-Charentes","Provence-Alpes-Côte d'Azur","Rhône-Alpes","Guadeloupe","Martinique","Guyane","La Réunion","Mayotte"]} }],
        group : ['region']
      })
    .then(data => {
        //res.send(data);
       /* var result = data.reduce(function(map, obj) {
            map[obj.region] = obj.val;
            console.log(map)
            return map;
        }, {});
        var result = new Map(data.map(obj => [obj.key, obj.val]));*/
        console.log(data)
        res.send(data)

    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "An error occured while retrieving ads by region from database."
        });
    });
};


const getExpenditureByRegion  = async(req,res)=>{
    try{
        /*
        let dataRegion = await RegionDistribution.findAll({
                attributes: [
                'region',
                'ad_id'
               // [sequelize.fn('COUNT', sequelize.col('ad_id')),'countAds']  
                ],
                where: [{ 'region':{ [Op.in]:["Alsace","Aquitaine","Auvergne","BasseNormandie","Bourgogne","Bretagne","Centre","Champagne-Ardenne","Corse","Franche-Comté","Haute Normandie","Ile-de-France","Languedoc-Roussillon","Limousin","Lorraine","Midi-Pyrénées","Nord-Pas-de-Calais","Pays de la Loire","Picardie","Poitou-Charentes","Provence-Alpes-Côte d'Azur","Rhône-Alpes","Guadeloupe","Martinique","Guyane","La Réunion","Mayotte"]} }],
                order:['ad_id']
             })

        let dataAds = await Ad.findAll({
            attributes:[
               'ad_id',
               [sequelize.fn('SUM', sequelize.col('mean_spend')),'spentAds']
            ],
            group: ['ad_id'],
            order:['ad_id']
        })
     
        

          let merged = [];
          
          for(let i=0; i<dataRegion.length; i++) {
            merged.push({
            region: dataRegion[i].dataValues.region, 
            spentAds: parseInt((dataAds.find((itmInner) => itmInner.dataValues.ad_id === dataRegion[i].dataValues.ad_id)).dataValues.spentAds)}
            );
          }

          let data = []
          merged.reduce(function(res, value) {
            if (!res[value.region]) {
              res[value.region] = { region: value.region, spentAds: 0 };
              data.push(res[value.region])
            }
            res[value.region].spentAds += value.spentAds;
            return res;
          }, {});*/
        const data = await RegionDistribution.findAll({
            attributes: [
            'region',
            [sequelize.fn('SUM', sequelize.col('mean_spend')),'money']   ],
            where: [{ 'region':{ [Op.in]:["Alsace","Aquitaine","Auvergne","Basse-Normandie","Bourgogne","Bretagne","Centre","Champagne-Ardenne","Corse","Franche-Comté","Haute-Normandie","Ile-de-France","Languedoc-Roussillon","Limousin","Lorraine","Midi-Pyrénées","Nord-Pas-de-Calais","Pays de la Loire","Picardie","Poitou-Charentes","Provence-Alpes-Côte d'Azur","Rhône-Alpes","Guadeloupe","Martinique","Guyane","La Réunion","Mayotte"]} }],
            group : ['region']
          })
        res.send(data)
    }
    catch(err){
        res.status(500).send({
            message:
                err.message || "An error occured while retrieving ads by region from database."
        });
    }
    
}
    
const getRegionDistributionOfImpressionsPerSocialIssue = async (req,res)=>{
    try{
        
        let socialIssues =   [ 'Affaires internationales', 'Energie',
		'Immigration','Justice et criminalité','Opérations gouvernementales', 'Politique culturelle',
		'Politique sociale','Politiques urbaines et territoriales', 'Santé', 'Travail et emploi',
		'Droits de l’homme libertés publiques et discriminations', 'Education',
		'Environnement', 'Economic',"[]"]
		let infos = {
			"Affaires internationales":[],
			"Energie":[],
			"Immigration":[],
			"Justice et criminalité":[],
			"Opérations gouvernementales":[],
			"Politique culturelle":[],
			"Politique sociale":[],
			"Politiques urbaines et territoriales":[],
			"Santé":[],
			"Travail et emploi":[],
			"Droits de l’homme libertés publiques et discriminations":[],
			"Education": [],
			"Environnement":[],
			"Economic":[],
            "[]" : []
		}

        const data = await db.sequelize.query(`select 
         b.social_issues_14cat, a.region, a.percentage * b.mean_impressions as impressions
        FROM region_distribution a inner join ad b on a.ad_id = b.ad_id inner join advertiser c on b.advertiser_id = c.page_id
        where b.languages = "fr" and YEAR( FROM_UNIXTIME(b.ad_delivery_start_time) ) = '2022'` , { model: RegionDistribution })
        
        if(data != null)
        {
            for(let socialIssue of socialIssues){
                let AuvergneRhoneAlpes = 0
                let BourgogneFrancheComte = 0
		        let Bretagne = 0
                let CentreValDeLoire = 0
		        let Corse = 0
                let GrandEst = 0
                let HautDeFrance = 0
                let IleDeFrance = 0
                let Normandie = 0
                let NouvelleAquitaine = 0
                let Occitanie = 0
                let PaysDeLaLoire = 0
                let ProvenceAlpesCôteAzur = 0
           
		for (let el of data){
                    if(el.dataValues.social_issues_14cat != null && el.dataValues.social_issues_14cat.includes(socialIssue)){
			 switch (el.dataValues.region) {
					  case "Auvergne":
					    AuvergneRhoneAlpes += el.dataValues.impressions
					    break;
					  case "Rhône-Alpes":
					    AuvergneRhoneAlpes += el.dataValues.impressions
					    break;
					  case "Bourgogne":
					     BourgogneFrancheComte += el.dataValues.impressions
					    break;
					  case "Franche-Comté":
					    BourgogneFrancheComte += el.dataValues.impressions
					    break;
					  case "Bretagne":
					    Bretagne += el.dataValues.impressions
					    break;
					  case "Centre":
					    CentreValDeLoire += el.dataValues.impressions
					    break;
					  case "Corse":
					    Corse += el.dataValues.impressions
                      break;
					  case "Île-de-France":
					    IleDeFrance += el.dataValues.impressions
                      break;
					  case "Picardie":
					    HautDeFrance += el.dataValues.impressions
                      break;
					  case "Nord-Pas-de-Calais":
					    HautDeFrance += el.dataValues.impressions
                      break;
					  case "Alsace":
					    GrandEst += el.dataValues.impressions
                      break;
					  case "Lorraine":
					    GrandEst += el.dataValues.impressions
                      break;
					  case "Champagne-Ardenne":
					    GrandEst += el.dataValues.impressions
                         break;
					  case "Haute-Normandie":
					    Normandie += el.dataValues.impressions
                         break;
					  case "Basse-Normandie":
					    Normandie += el.dataValues.impressions
                         break;
					  case "Limousin":
					    NouvelleAquitaine += el.dataValues.impressions                     
                      break;
					  case "Aquitaine":
					    NouvelleAquitaine += el.dataValues.impressions   
                      break;
					  case "Poitou-Charentes":
					    NouvelleAquitaine += el.dataValues.impressions   
                      break;
					  case "Midi-Pyrénées":
					    Occitanie += el.dataValues.impressions   
                      break;
					  case "Languedoc-Roussillon":
					    Occitanie += el.dataValues.impressions   
                      break;
					  case "Pays de la Loire":
					    PaysDeLaLoire += el.dataValues.impressions   
                        break;
					  case "Provence-Alpes-Côte d'Azur":
					    ProvenceAlpesCôteAzur += el.dataValues.impressions  

					}
			 
                    }
			
                            
                }
		   
                infos[socialIssue] = {
			"Auvergne Rhone Alpes":  Math.round(AuvergneRhoneAlpes), 
			"Bourgogne Franche-Comté":  Math.round(BourgogneFrancheComte), 
            "Bretagne":  Math.round(Bretagne), 
            "Centre Val De Loire":  Math.round(CentreValDeLoire), 
            "Corse":  Math.round(Corse), 
			"Grand Est":  Math.round(GrandEst), 
            "Haut De France":  Math.round(HautDeFrance), 
            "Normandie":  Math.round(Normandie), 
            "Nouvelle Aquitaine":  Math.round(NouvelleAquitaine), 
			"Occitanie":  Math.round(Occitanie), 
            "Pays De La Loire":  Math.round(PaysDeLaLoire), 
            "Provence Alpes Côte D'Azur":  Math.round(ProvenceAlpesCôteAzur),        
			"Ile De France" :  Math.round(IleDeFrance),   
               }
            }
        }
        infos["Aucune catégorie"] = infos["[]"];
		delete infos['[]'];
        res.send(infos)
    }
    catch(err){
        res.status(500).send({
            message:
                err.message || "An error occured while retrieving region distribution from database."
        });
    }
};


export default {
    getAllRegionDistribution,
    getNumberOfAdsByRegion,
    getExpenditureByRegion,
    getRegionDistributionOfImpressionsPerSocialIssue
    
}
