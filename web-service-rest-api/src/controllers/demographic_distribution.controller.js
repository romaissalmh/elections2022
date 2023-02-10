const db = require("../models");
import  sequelize from 'sequelize';
const DemographicDistribution = db.demographic_distribution;
const { Op } = require("sequelize");
const Advertiser = db.advertiser
const Ad = db.ads

const getAllDemographicDistribution = async(req,res)=>{
    DemographicDistribution.findAll({
        attributes: [/*'id',*/ 'percentage','age','gender','ad_id']
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


const getDemographicBreakdownByGenderAge = async (req,res)=>{
    try{
        const data = await db.sequelize.query(`select age, gender , sum(number_potential_reach) as reach from demographic_distribution
        where age != -1 and gender != -1 and gender in ("female","male") group by age, gender`, { model: DemographicDistribution })

        res.send(data);
    }
    catch(err){
        res.status(500).send({
            message:
                err.message || "An error occured while retrieving demographic distribution from database."
        });
    }
    
    
};


const getAdvertiserByGenderAgeReached = async (req,res)=>{
    try{
        const age = req.params.age
        const gender = req.params.gender
        const data = await db.sequelize.query(`select a.page_name, dem.page_id, sum(dem.number_potential_reach) as reach from demographic_distribution dem inner join advertiser a on a.page_id = dem.page_id where gender = "`+gender+`" and age ="`+age+`" and a.page_name != "EMPTY" group by page_id order by reach desc limit 10`, { model: DemographicDistribution })
        res.send(data);
    }
    catch(err){
        res.status(500).send({
            message:
                err.message || "An error occured while retrieving demographic distribution from database."
        });
    }
};

const getAdvertiserByCandidateGenderAgeReached = async (req,res)=>{
    try{
        const age = req.params.age
        const gender = req.params.gender
        const cand = req.params.candidate

        const data = await db.sequelize.query(`select a.page_name, dem.page_id, sum(dem.number_potential_reach) as reach from demographic_distribution dem inner join advertiser a on a.page_id = dem.page_id inner join ad d on d.ad_id = dem.ad_id where gender = "`+gender+`" and age ="`+age+`" and d.ad_creative_body like '%`+cand+`%' and year(FROM_UNIXTIME(d.ad_delivery_start_time)) = '2022' group by page_id order by reach desc limit 10`, { model: DemographicDistribution })
        res.send(data);
    }
    catch(err){
        res.status(500).send({
            message:
                err.message || "An error occured while retrieving demographic distribution from database."
        });
    }
};
 
/*
const getAdsTargetingAgeGender = async (req,res)=>{
    try{
        const age = req.params.age
        const gender = req.params.gender
        const socialIssue = req.params.socialIssue
        const data = await db.sequelize.query(`select 
        t.ad_id, t.reach, t.page_id, 
        tAd.social_issues_14cat, 
        tAd.social_issues_9cat,
        tAd.ad_creative_body, 
        tAd.ad_snapshot_url, 
        tAd.funding_entity,
        FROM_UNIXTIME(tAd.ad_delivery_start_time) as ad_delivery_start_time,
        tAdvert.page_name 
        from (SELECT a.ad_id, a.age, a.gender, a.page_id, a.number_potential_reach as reach
        FROM demographic_distribution a
        INNER JOIN (
        SELECT ad_id, MAX(percentage) per
        FROM demographic_distribution
        GROUP BY ad_id ) b ON a.ad_id = b.ad_id AND a.percentage = b.per ) t 
        inner join 
        ad tAd 
        on tAd.ad_id = t.ad_id 
        inner join advertiser tAdvert 
        on tAdvert.page_id = t.page_id where tAd.languages = "fr" and
         YEAR( FROM_UNIXTIME(tAd.ad_delivery_start_time) ) = '2022' 
         and t.gender = "`+gender+`" and t.age ="`+age+`" and tAd.social_issues_14cat like "%`+socialIssue+`%"
         and t.reach>0 `, { model: DemographicDistribution })
        
        
        res.send(data)
    }
    catch(err){
        res.status(500).send({
            message:
                err.message || "An error occured while retrieving demographic distribution from database."
        });
    }
};
*/


const getAdsTargetingAgeGender = async (req,res)=>{
    try{
        const age = req.params.age
        const gender = req.params.gender
        const socialIssue = req.params.socialIssue
        const advertiser = req.params.advertiser
        const query = advertiser == "all" ? "": `and b.advertiser_id ="`+advertiser+`"`
	const query2 = age == "all" ? "": ` and a.age ="`+age+`"`
	const query3 = gender == "all" ? "": ` and a.gender ="`+gender+`"`
        const data = await db.sequelize.query(`select 
        b.ad_creative_body, b.funding_entity, b.advertiser_id, c.page_name, 
        FROM_UNIXTIME(b.ad_delivery_start_time) as ad_delivery_start_time, a.percentage * b.mean_impressions as impressions
        FROM demographic_distribution a inner join ad b ON a.ad_id = b.ad_id inner join advertiser c on b.advertiser_id = c.page_id where b.languages = "fr" and YEAR( FROM_UNIXTIME(b.ad_delivery_start_time) ) = '2022' `+ query3 + query + query2 +` and b.social_issues_14cat like "%`+socialIssue+`%" and  b.ad_creative_body != "EMPTY" order by a.percentage `, { model: DemographicDistribution })
        res.send(data)
    }
    catch(err){
        res.status(500).send({
            message:
                err.message || "An error occured while retrieving demographic distribution from database."
        });
    }
};
const getAdsTargetingAgeGenderBySocialIssues = async (req,res)=>{
    try{
        const age = req.params.age
        const gender = req.params.gender
        const advertiser = req.params.advertiser
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
        const query = advertiser == "all" ? "": `and b.advertiser_id ="`+advertiser+`"`
	const query2 = age == "all" ? "": ` and a.age ="`+age+`"`
	const query3 = gender == "all" ? "": ` and a.gender ="`+gender+`"`
        const data = await db.sequelize.query(`select 
        b.ad_creative_body, b.funding_entity, b.advertiser_id , c.page_name, b.social_issues_14cat,
        FROM_UNIXTIME(b.ad_delivery_start_time) as ad_delivery_start_time, a.percentage * b.mean_impressions as impressions
        FROM demographic_distribution a inner join ad b on a.ad_id = b.ad_id inner join advertiser c on b.advertiser_id = c.page_id
        where b.languages = "fr" and YEAR( FROM_UNIXTIME(b.ad_delivery_start_time) ) = '2022' `+query+ query3 + query2  , { model: DemographicDistribution })
        
        if(data != null)
        {
            for(let socialIssue of socialIssues){
                let impressions = 0
                
                for (let el of data){

                    if(el.dataValues.social_issues_14cat != null && el.dataValues.social_issues_14cat.includes(socialIssue)){
                        impressions += el.dataValues.impressions
                    }

                            
                }
                infos[socialIssue] = Math.round(impressions)
            }
        }
        infos["Aucune catégorie"] = infos["[]"];
		delete infos['[]'];
        res.send(infos)
    }
    catch(err){
        res.status(500).send({
            message:
                err.message || "An error occured while retrieving demographic distribution from database."
        });
    }
};

const getDemographicDistributionOfImpressionsPerSocialIssue = async (req,res)=>{
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
         b.social_issues_14cat, a.gender, a.percentage * b.mean_impressions as impressions
        FROM demographic_distribution a inner join ad b on a.ad_id = b.ad_id inner join advertiser c on b.advertiser_id = c.page_id
        where b.languages = "fr" and YEAR( FROM_UNIXTIME(b.ad_delivery_start_time) ) = '2022' and a.age != -1 and a.gender != -1 and a.gender in ("female","male") ` , { model: DemographicDistribution })
        
        if(data != null)
        {
            for(let socialIssue of socialIssues){
                let impressions1 = 0
                let impressions2 = 0
		let impressions3 = 0
                let impressions4 = 0
		let impressions5 = 0
                let impressions6 = 0
		let impressions7 = 0
		for (let el of data){
                    if(el.dataValues.social_issues_14cat != null && el.dataValues.social_issues_14cat.includes(socialIssue)){
                         if(el.dataValues.gender == "female")
				 impressions1 += el.dataValues.impressions
			 else  impressions2 += el.dataValues.impressions
			 /*switch (el.dataValues.age) {
					  case "13-17":
					    impressions1 += el.dataValues.impressions
					    break;
					  case "18-24":
					    impressions2 += el.dataValues.impressions
					    break;
					  case "25-34":
					     impressions3 += el.dataValues.impressions
					    break;
					  case "35-44":
					    impressions4 += el.dataValues.impressions
					    break;
					  case "45-54":
					    impressions5 += el.dataValues.impressions
					    break;
					  case "55-64":
					    impressions6 += el.dataValues.impressions
					    break;
					  case "65+":
					    impressions7 += el.dataValues.impressions
					}*/
			 
                    }
			
                            
                }
		   
                infos[socialIssue] = {
			"female":  Math.round(impressions1), 
			"male":  Math.round(impressions2), 
			/*"13-17":  Math.round(impressions1), 
			"18-24":  Math.round(impressions2), 
			"25-34":  Math.round(impressions3), 
			"35-44":  Math.round(impressions4), 
			"45-54":  Math.round(impressions5), 
			"55-64":  Math.round(impressions6),
			"65+": Math.round(impressions7)*/ }
            }
        }
        infos["Aucune catégorie"] = infos["[]"];
		delete infos['[]'];
        res.send(infos)
    }
    catch(err){
        res.status(500).send({
            message:
                err.message || "An error occured while retrieving demographic distribution from database."
        });
    }
};


const getAdsTargetingCandidates = async (req,res)=>{
    try{
        const age = req.params.age
        const gender = req.params.gender
        const cand = req.params.candidate

        const data = await db.sequelize.query(`select t.ad_id, t.reach, t.page_id, tAd.ad_creative_body, tAd.ad_snapshot_url, tAdvert.page_name, tAd.funding_entity, FROM_UNIXTIME(tAd.ad_delivery_start_time) as ad_delivery_start_time from 
        (SELECT a.ad_id, a.age, a.gender, a.page_id, a.number_potential_reach as reach
        FROM demographic_distribution a
        INNER JOIN (
        SELECT ad_id, MAX(percentage) per
        FROM demographic_distribution
        GROUP BY ad_id ) b ON a.ad_id = b.ad_id AND a.percentage = b.per ) t inner join ad tAd on tAd.ad_id = t.ad_id inner join advertiser tAdvert on tAdvert.page_id = t.page_id where tAd.languages = "fr" and YEAR( FROM_UNIXTIME(tAd.ad_delivery_start_time) ) = '2022' and t.gender = "`+gender+`" and t.age ="`+age+`" and tAd.ad_creative_body like '%`+cand+`%' and t.reach>0 limit 8`, { model: DemographicDistribution })
           
        res.send(data)
    }
    catch(err){ 
        res.status(500).send({
            message:
                err.message || "An error occured while retrieving demographic distribution from database."
        });
    }
};

const getDemographicBreakdownByGenderAgeOfAdsMentioningCandidaties = async (req,res)=>{
    try{
        const cand = req.params.candidate
        let round = req.params.round
		let query = round == "1" ? "and (  (month(FROM_UNIXTIME(a.ad_delivery_start_time)) < '4') or (month(FROM_UNIXTIME(a.ad_delivery_start_time)) = '4' and day(FROM_UNIXTIME(a.ad_delivery_start_time)) < '11')  )" : "and (  (month(FROM_UNIXTIME(a.ad_delivery_start_time)) > '4') or (month(FROM_UNIXTIME(a.ad_delivery_start_time)) = '4' and day(FROM_UNIXTIME(a.ad_delivery_start_time)) >= '11')  )"

        const data = await db.sequelize.query(`select d.age, d.gender , sum(d.number_potential_reach) as reach from demographic_distribution d
        inner join ad a on a.ad_id = d.ad_id where  a.ad_creative_body like '%`+cand+`%' 
        and d.age != -1 and d.gender != -1 
        and d.gender in ("female","male") 
        and year(FROM_UNIXTIME(a.ad_delivery_start_time)) = '2022'  `+query+` group by age, gender`, { model: DemographicDistribution })

        res.send(data);
    }
    catch(err){
        res.status(500).send({
            message:
                err.message || "An error occured while retrieving demographic distribution from database."
        });
    }
    
    
}; 


export default {
    getAllDemographicDistribution,
    getDemographicBreakdownByGenderAge,
    getAdvertiserByCandidateGenderAgeReached,
    getAdvertiserByGenderAgeReached ,
    getAdsTargetingAgeGender,
    getDemographicBreakdownByGenderAgeOfAdsMentioningCandidaties,
    getAdsTargetingCandidates,
    getAdsTargetingAgeGenderBySocialIssues ,
    getDemographicDistributionOfImpressionsPerSocialIssue
	
	
}
