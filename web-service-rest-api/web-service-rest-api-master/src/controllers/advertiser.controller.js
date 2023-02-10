const db = require("../models")
import  sequelize from 'sequelize'
const Advertiser = db.advertiser
const Ad = db.ads

const { Op } = require("sequelize");


const getAllAdvertisers = async(req,res)=>{
    Advertiser.findAll({
        attributes: ['page_id', 'page_name']
      })
    .then(data => {
        res.send(data)
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "An error occured while retrieving advertisers from database."
        })
    })
}

const getNumberOfAdsByAvertiser = async(req,res)=>{
    try{
       const listOfAds = await Ad.findAll({
        attributes: [
        'advertiser_id',
        [sequelize.fn('COUNT', sequelize.col('ad_id')),'countAds']   ],
        where: sequelize.where(sequelize.fn('year', sequelize.fn('FROM_UNIXTIME', sequelize.col(`ad_delivery_start_time`) )), 2022),
        group: ['advertiser_id'],
        order: [[sequelize.fn('COUNT', sequelize.col('ad_id')),'desc']],
        limit : 10,
        })
        let finalListOfAds = []
        //console.log(listOfAds)
        if (listOfAds != null) {
            for (const ad of listOfAds) {
              //  console.log(ad)
              //  console.log(ad.dataValues.countAds)

                let finalAd = {
                    page_id: ad.dataValues.advertiser_id,
                    countAds: ad.dataValues.countAds,
                    page_name: " "
                }
                const advertiser = await Advertiser.findOne({
                    attributes:['page_name','page_id'],
                     where: { page_id: ad.dataValues.advertiser_id } })
                if(advertiser != null && advertiser.page_name!="EMPTY"){
                   // console.log(advertiser)
                    finalAd.page_name = advertiser.page_name
                   // console.log(finalAd)
                    finalListOfAds.push(finalAd)
                }
              

            }
            res.send(finalListOfAds)

        }
        else {
            res.status(404).send({
                message:
                err.message || "No ads found."
 
            })
        }

    }
    catch(err){
        res.status(500).send({
            message:
                err.message || "An error occured while retrieving ads by advertiser from database."
        })
    }
}

const getNumberOfImpressionsByAvertiser = async(req,res)=>{
    try{
       const listOfAds = await Ad.findAll({
        attributes: [
        'advertiser_id',
        [sequelize.fn('SUM', sequelize.col('region_mean_impressions')),'countImpressions']   ],
        where: sequelize.where(sequelize.fn('year', sequelize.fn('FROM_UNIXTIME', sequelize.col(`ad_delivery_start_time`) )), 2022),
        group: ['advertiser_id'],
        order: [[sequelize.fn('SUM', sequelize.col('region_mean_impressions')),'desc']],
        limit : 10,
        })
        let finalListOfAds = []
        //console.log(listOfAds)
        if (listOfAds != null) {
            for (const ad of listOfAds) {
              //  console.log(ad)
              //  console.log(ad.dataValues.countAds)

                let finalAd = {
                    page_id: ad.dataValues.advertiser_id,
                    countImpressions: ad.dataValues.countImpressions,
                    page_name: " "
                }
                const advertiser = await Advertiser.findOne({
                    attributes:['page_name','page_id'],
                     where: { page_id: ad.dataValues.advertiser_id } })
                if(advertiser != null && advertiser.page_name!="EMPTY"){
                   // console.log(advertiser)
                    finalAd.page_name = advertiser.page_name
                   // console.log(finalAd)
                    finalListOfAds.push(finalAd)
                }
              

            }
            res.send(finalListOfAds)

        }
        else {
            res.status(404).send({
                message:
                err.message || "No ads found."
 
            })
        }

    }
    catch(err){
        res.status(500).send({
            message:
                err.message || "An error occured while retrieving impressions of ads by advertiser from database."
        })
    }
}



const getExpenditureByAvertiser = async(req,res)=>{
    try{
       const listOfAds = await Ad.findAll({
        attributes: [
        'advertiser_id',
        [sequelize.fn('SUM', sequelize.col('region_mean_spend')),'countExpenditure']   ],
        where: sequelize.where(sequelize.fn('year', sequelize.fn('FROM_UNIXTIME', sequelize.col(`ad_delivery_start_time`) )), 2022),
        group: ['advertiser_id'],
        order: [[sequelize.fn('SUM', sequelize.col('region_mean_spend')),'desc']],
        limit : 10,
        })
        let finalListOfAds = []
        //console.log(listOfAds)
        if (listOfAds != null) {
            for (const ad of listOfAds) {
              //  console.log(ad)
              //  console.log(ad.dataValues.countAds)

                let finalAd = {
                    page_id: ad.dataValues.advertiser_id,
                    countExpenditure: ad.dataValues.countExpenditure,
                    page_name: " "
                }
                const advertiser = await Advertiser.findOne({
                    attributes:['page_name','page_id'],
                     where: { page_id: ad.dataValues.advertiser_id } })
                if(advertiser != null && advertiser.page_name!="EMPTY"){
                   // console.log(advertiser)
                    finalAd.page_name = advertiser.page_name
                   // console.log(finalAd)
                    finalListOfAds.push(finalAd)
                }
              

            }
            res.send(finalListOfAds)

        }
        else {
            res.status(404).send({
                message:
                err.message || "No ads found."
 
            })
        }

    }
    catch(err){
        res.status(500).send({
            message:
                err.message || "An error occured while retrieving impressions of ads by advertiser from database."
        })
    }
}


const getInfosOfAdsByCandidateOfficialPages = async(req,res)=>{

    try{

        let candidates =[
            {
				"id":0,
                "candidate":"Emmanuel Macron",
                "partyPage":"La République En Marche !",
				"data":[]
			},
			{
                "id":1,
				"candidate":"Marine Le Pen",
                "partyPage":"Rassemblement National",
				"data":[]
			},
			{
                "id":2,
                "candidate":"Eric Zemmour",
                "partyPage":"RECONQUÊTE",
				"data":[]
			},
		
		]
        let round = req.params.round
		let query = round == "1" ? "and (  (month(FROM_UNIXTIME(a.ad_delivery_start_time)) < '4') or (month(FROM_UNIXTIME(a.ad_delivery_start_time)) = '4' and day(FROM_UNIXTIME(a.ad_delivery_start_time)) < '11')  )" : "and (  (month(FROM_UNIXTIME(a.ad_delivery_start_time)) > '4') or (month(FROM_UNIXTIME(a.ad_delivery_start_time)) = '4' and day(FROM_UNIXTIME(a.ad_delivery_start_time)) >= '11')  )"

        let i = 0
        for (var c of candidates){
            let result =  await db.sequelize.query(`select count(a.ad_id) as countAds, sum(a.mean_eur_spend) as money,  sum(a.mean_impressions) as impressions from ad a inner join advertiser b
             on a.advertiser_id = b.page_id WHERE (year(FROM_UNIXTIME(a.ad_delivery_start_time)) = '2022')  `+query+` and (
            b.page_name ='`+ c.partyPage + `' or 
            b.page_name ='`+c.candidate+`' or a.funding_entity like '%`+ c.partyPage + `%' or a.funding_entity like '%`+ c.candidate + `%' ) ;`, { model: Ad })
           candidates[i].data = result
           i = i + 1
        }
        res.send(candidates)
    }
    catch(err){
        res.status(500).send({
            message:
                err.message || "An error occured while retrieving advertisers from database."
        })
    }
}



const getInfosOfAdsByCandidateOfficialPagesPerSocialIssues = async(req,res)=>{

    try{
        let socialIssues = [ 'Affaires internationales', 'Energie',
			'Immigration','Justice et criminalité','Opérations gouvernementales', 'Politique culturelle',
			'Politique sociale','Politiques urbaines et territoriales', 'Santé', 'Travail et emploi',
			'Droits de l’homme libertés publiques et discriminations', 'Education',
			'Environnement', 'Economic', '[]']
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
                "[]": []
            }

        let candidates =[
                {
                    "id":0,
                    "candidate":"Emmanuel Macron",
                    "partyPage":"La République En Marche !",
                    "data":[]
                },
                {
                    "id":1,
                    "candidate":"Marine Le Pen",
                    "partyPage":"Rassemblement National",
                    "data":[]
                },
                {
                    "id":2,
                    "candidate":"Eric Zemmour",
                    "partyPage":"RECONQUÊTE",
                    "data":[]
                },
            
            ]
        let round = req.params.round
        let query = round == "1" ? "and (  (month(FROM_UNIXTIME(ad_delivery_start_time)) < '4') or (month(FROM_UNIXTIME(ad_delivery_start_time)) = '4' and day(FROM_UNIXTIME(ad_delivery_start_time)) < '11')  )" : "and (  (month(FROM_UNIXTIME(ad_delivery_start_time)) > '4') or (month(FROM_UNIXTIME(ad_delivery_start_time)) = '4' and day(FROM_UNIXTIME(ad_delivery_start_time)) >= '11')  )"

        for (let cand in candidates)
		{
			let i = 0
			for (let socialIssue of socialIssues){
                let result =  await db.sequelize.query(`select count(a.ad_id) as countAds, sum(a.mean_eur_spend) as money,  sum(a.mean_impressions) as impressions from ad a inner join advertiser b
                on a.advertiser_id = b.page_id WHERE (year(FROM_UNIXTIME(a.ad_delivery_start_time)) = '2022')  `+query+` and social_issues_14cat like "%`+socialIssue+`%" and (
                b.page_name ='`+ candidates[cand].partyPage + `' or 
                b.page_name ='`+candidates[cand].candidate+`' or a.funding_entity like '%`+ candidates[cand].partyPage + `%' or a.funding_entity like '%`+ candidates[cand].candidate + `%' ) ;`, { model: Ad })
                infos[socialIssue]= result
				i += 1
			}
            infos["Aucune catégorie"] = infos["[]"]
		    delete infos['[]']
            candidates[cand].data = JSON.parse(JSON.stringify(infos))
		}
        res.send(candidates)
    }
    catch(err){
        res.status(500).send({
            message:
                err.message || "An error occured while retrieving advertisers from database."
        })
    }
}



const getInfosOfAdsPerSocialIssuesByCandidateOfficialPages = async(req,res)=>{

    try{
        let socialIssues = [ 'Affaires internationales', 'Energie',
			'Immigration','Justice et criminalité','Opérations gouvernementales', 'Politique culturelle',
			'Politique sociale','Politiques urbaines et territoriales', 'Santé', 'Travail et emploi',
			'Droits de l’homme libertés publiques et discriminations', 'Education',
			'Environnement', 'Economic',"[]" ]
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
        let candidates =[
            {
				"id":0,
                "candidate":"Emmanuel Macron",
                "partyPage":"La République En Marche !",
				"data":[]
			},
			{
                "id":1,
				"candidate":"Marine Le Pen",
                "partyPage":"Rassemblement National",
				"data":[]
			},
			{
                "id":2,
                "candidate":"Eric Zemmour",
                "partyPage":"RECONQUÊTE",
				"data":[]
			},
		
		]
        let round = req.params.round
        let query = ""
        if(round == "1")
            query = "and (  (month(FROM_UNIXTIME(a.ad_delivery_start_time)) < '4') or (month(FROM_UNIXTIME(a.ad_delivery_start_time)) = '4' and day(FROM_UNIXTIME(a.ad_delivery_start_time)) < '11')  )"
        else {
            if(round == "2"){
				query = "and ( month(FROM_UNIXTIME(ad_delivery_start_time)) = '4' and day(FROM_UNIXTIME(ad_delivery_start_time)) >= '11' and day(FROM_UNIXTIME(ad_delivery_start_time)) <= '24'  )"
                console.log("hello")
            }
            else 
                 query = "and ( (month(FROM_UNIXTIME(a.ad_delivery_start_time)) = '4' and day(FROM_UNIXTIME(a.ad_delivery_start_time)) >= '25' ) or (month(FROM_UNIXTIME(a.ad_delivery_start_time)) > '4')  )"
        }
         
        for (let socialIssue of socialIssues)
		{
			let i = 0
			for (let c of candidates){
                let result =  await db.sequelize.query(`select count(a.ad_id) as countAds, sum(a.mean_eur_spend) as money,  sum(a.mean_impressions) as impressions from ad a inner join advertiser b
                on a.advertiser_id = b.page_id WHERE (year(FROM_UNIXTIME(a.ad_delivery_start_time)) = '2022')  `+query+` and social_issues_14cat like "%`+socialIssue+`%" and (
                b.page_name ='`+ c.partyPage + `' or 
                b.page_name ='`+c.candidate+`' or a.funding_entity like '%`+ c.partyPage + `%' or a.funding_entity like '%`+ c.candidate + `%' ) ;`, { model: Ad })
                candidates[i].data = result
				i += 1
			}
			infos[socialIssue] = JSON.parse(JSON.stringify(candidates))
		}
        infos["Aucune catégorie"] = infos["[]"]
		delete infos['[]']
        console.log(infos)
        res.send(infos)
    }
    catch(err){
        res.status(500).send({
            message:
                err.message || "An error occured while retrieving advertisers from database."
        })
    }
}


const getAdsByCandidatesOfficialPages = async(req,res)=>{

    try{

        let candidateName = req.params.candidate
        let partyName = req.params.party
        let round = req.params.round
        console.log(round)
		let query = round == "1" ? "and (  (month(FROM_UNIXTIME(a.ad_delivery_start_time)) < '4') or (month(FROM_UNIXTIME(a.ad_delivery_start_time)) = '4' and day(FROM_UNIXTIME(a.ad_delivery_start_time)) < '11')  )" : "and (  (month(FROM_UNIXTIME(a.ad_delivery_start_time)) > '4') or (month(FROM_UNIXTIME(a.ad_delivery_start_time)) = '4' and day(FROM_UNIXTIME(a.ad_delivery_start_time)) >= '11')  )"
        let result =  await db.sequelize.query(` select a.funding_entity, b.page_name, a.ad_creative_body, a.ad_snapshot_url, FROM_UNIXTIME(a.ad_delivery_start_time)  as ad_delivery_start_time  from ad a inner join 
        advertiser b on b.page_id = a.advertiser_id where a.ad_creative_body != "EMPTY" and (a.funding_entity like '%`+ partyName + `%' or b.page_name ='`+ candidateName +`' or 
        b.page_name = '`+ partyName +`' ) and YEAR(FROM_UNIXTIME(a.ad_delivery_start_time)) = '2022'  `+query+` and a.languages = "fr"  order by FROM_UNIXTIME(a.ad_delivery_start_time) desc ;`, { model: Ad })
        res.send(result)
    }
    catch(err){
        res.status(500).send({
            message:
                err.message || "An error occured while retrieving advertisers from database."
        })
    }
}


const getAdsByAdvertisers= async(req,res)=>{

    try{

        let pageName = req.params.page
        let result =  await db.sequelize.query(` select a.funding_entity, b.page_name, a.ad_creative_body, a.ad_snapshot_url, FROM_UNIXTIME(a.ad_delivery_start_time)  as ad_delivery_start_time  from ad a inner join 
        advertiser b on b.page_id = a.advertiser_id where  a.ad_creative_body != "EMPTY" and b.page_name = '`+ pageName + `' and a.languages = "fr" order by FROM_UNIXTIME(ad_delivery_start_time) desc limit 20  ;`, { model: Ad })
        res.send(result)
    }
    catch(err){
        res.status(500).send({
            message:
                err.message || "An error occured while retrieving advertisers from database."
        })
    }
}

export default {
    getAllAdvertisers,
    getNumberOfAdsByAvertiser,
    getNumberOfImpressionsByAvertiser,
    getExpenditureByAvertiser,
    getInfosOfAdsByCandidateOfficialPages,
    getAdsByCandidatesOfficialPages,
    getAdsByAdvertisers,
    getInfosOfAdsPerSocialIssuesByCandidateOfficialPages,
    getInfosOfAdsByCandidateOfficialPagesPerSocialIssues
}
