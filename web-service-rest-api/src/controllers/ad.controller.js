const db = require("../models")
import  sequelize from 'sequelize'
const Ads = db.ads
const { Op } = require("sequelize");



const getAllAds = async(req,res)=>{
 
	db.sequelize.query('SELECT a.currency, a.funding_entity, a.ad_creative_body,  IFNULL(  a.social_issues_14cat, "__") as social_issues_14cat,  IFNULL(  a.social_issues_9cat, "__") as social_issues_9cat , a.mean_impressions,FROM_UNIXTIME(a.ad_delivery_start_time) as ad_delivery_start_time , a.publisher_platforms, b.page_name , b.page_id from ad a inner join advertiser b on a.advertiser_id = b.page_id where ad_creative_body != "EMPTY" and year(FROM_UNIXTIME(ad_delivery_start_time)) = "2022"  ', { model: Ads })

    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "An error occured while retrieving ads from database."
        });
    });
};

const getAllAdsBySocialIssue = async(req,res)=>{
    let socialIssue = req.params.socialIssue
	db.sequelize.query(`SELECT a.currency, a.funding_entity, a.ad_creative_body, a.social_issues_14cat, a.social_issues_9cat , a.mean_impressions,FROM_UNIXTIME(a.ad_delivery_start_time), a.publisher_platforms, b.page_name , b.page_id from ad a inner join advertiser b on a.advertiser_id = b.page_id where   a.ad_creative_body != "EMPTY" and  year(FROM_UNIXTIME(ad_delivery_start_time)) = "2022" and a.social_issues_14cat like "%`+socialIssue+`%" limit 20`, { model: Ads })

   .then(data => {
	   res.send(data);
   })
   .catch(err => {
	   res.status(500).send({
		   message:
			   err.message || "An error occured while retrieving ads from database."
	   });
   });
};

const getGeneralStatisticsOfAds = async (req,res) => {
    db.sequelize.query('SELECT count(*) as numberAds, count(DISTINCT advertiser_id) as numberPages, sum(lower_bound_impressions) as lower_bound_impressions , sum(upper_bound_impressions) as upper_bound_impressions, sum(lower_bound_spend) as lower_bound_spend, sum(upper_bound_spend) as upper_bound_spend, sum(lower_bound_potential_reach) as lower_bound_potential_reach, sum(upper_bound_potential_reach) as upper_bound_potential_reach FROM ad where upper_bound_impressions != -1 and lower_bound_impressions != -1 and  year(FROM_UNIXTIME(ad_delivery_start_time)) = "2022"  ', { model: Ads })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: 
                err.message || "An error occured while retrieving ads from database."
        });
    });
};


const getnumberOfAdsByMonth = async (req,res) => {
    try {
		const adsByMonth = await db.sequelize.query(`select count(ad_id) as countAds, month(FROM_UNIXTIME(ad_delivery_start_time)) as month, year(FROM_UNIXTIME(ad_delivery_start_time)) as year from ad where  year(FROM_UNIXTIME(ad_delivery_start_time)) = '2022'  GROUP by year(FROM_UNIXTIME(ad_delivery_start_time)), month(FROM_UNIXTIME(ad_delivery_start_time));`, { model: Ads })
		if (adsByMonth.length != 0) {
			res.send(adsByMonth);
		} else {
			res.status(404).send({
				error: 'not_found',
				message: 'No content',
				status: 404,
			})
		}
	} catch (err) {
		res.status(500).send({
			error: err.message || 'Some error occured while counting number of ads'
		})
	}

}



const getnumberOfImpressionsByMonth = async (req,res) => {
    try {
		const dataByMonth = await db.sequelize.query(`select sum(region_mean_impressions) as countImpressions, month(FROM_UNIXTIME(ad_delivery_start_time)) as month, year(FROM_UNIXTIME(ad_delivery_start_time)) as year from ad where year(FROM_UNIXTIME(ad_delivery_start_time)) = '2022'   GROUP by year(FROM_UNIXTIME(ad_delivery_start_time)), month(FROM_UNIXTIME(ad_delivery_start_time));`, { model: Ads })
		if (dataByMonth.length != 0) {
			res.send(dataByMonth);
		} else {
			res.status(404).send({
				error: 'not_found',
				message: 'No content',
				status: 404,
			})
		}
	} catch (err) {
		res.status(500).send({
			error: err.message || 'Some error occured while getting data.'
		})
	}

}

const getspentOfMoneyByMonth= async (req,res) => {
    try {
		const adsByMonth = await db.sequelize.query(`select  SUM(region_mean_spend) AS countMoney, month(FROM_UNIXTIME(ad_delivery_start_time)) as month, year(FROM_UNIXTIME(ad_delivery_start_time)) as year from ad where  year(FROM_UNIXTIME(ad_delivery_start_time)) = '2022'  GROUP by year(FROM_UNIXTIME(ad_delivery_start_time)), month(FROM_UNIXTIME(ad_delivery_start_time));`, { model: Ads })
		if (adsByMonth.length != 0) {
			res.send(adsByMonth);
		} else {
			res.status(404).send({
				error: 'not_found',
				message: 'No content',
				status: 404,
			})
		}
	} catch (err) {
		res.status(500).send({
			error: err.message || 'Some error occured while getting data.'
		})
	}
}

const getInfoPerMonthPerSocialIssue = async (req,res) => {
    try {
		let socialIssues = [ 'Affaires internationales', 'Energie',
		'Immigration','Justice et criminalité','Opérations gouvernementales', 'Politique culturelle',
		'Politique sociale','Politiques urbaines et territoriales', 'Santé', 'Travail et emploi',
		'Droits de l’homme libertés publiques et discriminations', 'Education',
		'Environnement', 'Economic', "[]" ]
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
		for (let socialIssue of socialIssues)
		{
			const adsByMonth = await db.sequelize.query(`
				select
				CONCAT( DATE_FORMAT(FROM_UNIXTIME(ad_delivery_start_time), '%b ' ),
					case when dayofmonth(FROM_UNIXTIME(ad_delivery_start_time) ) < 16
						then '01-15'
						else CONCAT( '16-', right( last_day( FROM_UNIXTIME(ad_delivery_start_time) ), 2)  )
						end ) as CharMonth,
						count( ad_id ) as countAds,
						sum( mean_eur_spend ) as countMoney,
						sum( mean_impressions) as impressions
				from 
					ad
				where year(FROM_UNIXTIME(ad_delivery_start_time))  = '2022' and social_issues_14cat like "%`+socialIssue+`%" 
				group by
					CharMonth
				order by
					year(  FROM_UNIXTIME(ad_delivery_start_time) ),
					month(  FROM_UNIXTIME(ad_delivery_start_time) ),
					min( dayofmonth(  FROM_UNIXTIME(ad_delivery_start_time) ));`, { model: Ads })
			infos[socialIssue] = adsByMonth
		}
		infos["Aucune catégorie"] = infos["[]"]
		delete infos['[]']
		if (infos.length != 0) {
			res.send(infos);
		} else {
			res.status(404).send({
				error: 'not_found',
				message: 'No content',
				status: 404,
			})
		}
		
	} catch (err) {
		res.status(500).send({
			error: err.message || 'Some error occured while getting data.'
		})
	}
}


const getInfoPerMonthPerSocialIssueParCandidate = async (req,res) => {
    try {
		let candidate = req.params.candidate
		let socialIssues = [ 'Affaires internationales', 'Energie',
		'Immigration','Justice et criminalité','Opérations gouvernementales', 'Politique culturelle',
		'Politique sociale','Politiques urbaines et territoriales', 'Santé', 'Travail et emploi',
		'Droits de l’homme libertés publiques et discriminations', 'Education',
		'Environnement', 'Economic','[]']
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
		for (let socialIssue of socialIssues)
		{
			const adsByMonth = await db.sequelize.query(`
				select
				CONCAT( DATE_FORMAT(FROM_UNIXTIME(ad_delivery_start_time), '%b ' ),
					case when dayofmonth(FROM_UNIXTIME(ad_delivery_start_time) ) < 16
						then '01-15'
						else CONCAT( '16-', right( last_day( FROM_UNIXTIME(ad_delivery_start_time) ), 2)  )
						end ) as CharMonth,
						count( ad_id ) as countAds,
						sum( mean_eur_spend ) as countMoney,
						sum (mean_impressions) as impressions
				from 
					ad
				where year(FROM_UNIXTIME(ad_delivery_start_time))  = '2022' and social_issues_14cat like "%`+socialIssue+`%" and ad_creative_body like "%`+candidate+`%" 
				group by
					CharMonth
				order by
					year(  FROM_UNIXTIME(ad_delivery_start_time) ),
					month(  FROM_UNIXTIME(ad_delivery_start_time) ),
					min( dayofmonth(  FROM_UNIXTIME(ad_delivery_start_time) ));`, { model: Ads })
			infos[socialIssue] = adsByMonth
		}

		infos["Aucune catégorie"] = infos["[]"];
		delete infos['[]'];

		if (infos.length != 0) {
			res.send(infos);
		} else {
			res.status(404).send({
				error: 'not_found',
				message: 'No content',
				status: 404,
			})
		}
		
	} catch (err) {
		res.status(500).send({
			error: err.message || 'Some error occured while getting data.'
		})
	}
}

const getnumberOfAdsByCurrency = async (req,res) => {
    try {
		
		const adsByCurrency = await Ads.findAll({
			attributes: [
				'currency',
				[sequelize.fn('COUNT', sequelize.col('ad_id')), 'countAds'],
			],
			group: 'currency',
            order: [[sequelize.fn('COUNT', sequelize.col('ad_id')),'desc']],

		})
		if (adsByCurrency.length != 0) {
			res.send(adsByCurrency);
		} else {
			res.status(404).send({
				error: 'not_found',
				message: 'No content',
				status: 404,
			})
		}
	} catch (err) {
		res.status(500).send({
			error: err.message || 'Some error occured while getting data.'
		})
	}
}



const getnumberOfAdsByMonthTest = async (req,res) => {
    try {
	//	const adsByMonth = await db.sequelize.query(`select count(ad_id) as countAds, FROM_UNIXTIME(ad_delivery_start_time) as date from ad where  year(FROM_UNIXTIME(ad_delivery_start_time)) = '2022'  GROUP by FROM_UNIXTIME(ad_delivery_start_time);`, { model: Ads })
	const adsByMonth = await db.sequelize.query(`
		
	select
	CONCAT( DATE_FORMAT(FROM_UNIXTIME(ad_delivery_start_time), '%b ' ),
		case when dayofmonth(FROM_UNIXTIME(ad_delivery_start_time) ) < 16
			then '01-15'
			else CONCAT( '16-', right( last_day( FROM_UNIXTIME(ad_delivery_start_time) ), 2)  )
			end ) as CharMonth,
			count( ad_id ) as countAds
	from 
		ad
	where year(FROM_UNIXTIME(ad_delivery_start_time))  = '2022'
	group by
		CharMonth
	order by
		year(  FROM_UNIXTIME(ad_delivery_start_time) ),
		month(  FROM_UNIXTIME(ad_delivery_start_time) ),
		min( dayofmonth(  FROM_UNIXTIME(ad_delivery_start_time) ));`, { model: Ads })

	if (adsByMonth.length != 0) {
			res.send(adsByMonth);
		} else {
			res.status(404).send({
				error: 'not_found',
				message: 'No content',
				status: 404,
			})
		}
	} catch (err) {
		res.status(500).send({
			error: err.message || 'Some error occured while getting data.'
		})
	}

}





const getnumberOfImpressionsByMonthTest = async (req,res) => {
    try {
		//const dataByMonth = await db.sequelize.query(`select sum(mean_impressions) as countImpressions, month(FROM_UNIXTIME(ad_delivery_start_time)) as month, year(FROM_UNIXTIME(ad_delivery_start_time)) as year from ad where year(FROM_UNIXTIME(ad_delivery_start_time)) = '2022'   GROUP by year(FROM_UNIXTIME(ad_delivery_start_time)), month(FROM_UNIXTIME(ad_delivery_start_time));`, { model: Ads })
		const dataByMonth = await db.sequelize.query(`
		
		select
        CONCAT( DATE_FORMAT(FROM_UNIXTIME(ad_delivery_start_time), '%b ' ),
            case when dayofmonth(FROM_UNIXTIME(ad_delivery_start_time) ) < 16
                then '01-15'
                else CONCAT( '16-', right( last_day( FROM_UNIXTIME(ad_delivery_start_time) ), 2)  )
                end ) as CharMonth,
				sum( mean_impressions ) as countImpressions
		from 
			ad
		where year(FROM_UNIXTIME(ad_delivery_start_time))  = '2022'
		group by
			CharMonth
		order by
			year(  FROM_UNIXTIME(ad_delivery_start_time) ),
			month(  FROM_UNIXTIME(ad_delivery_start_time) ),
			min( dayofmonth(  FROM_UNIXTIME(ad_delivery_start_time) ));`, { model: Ads })
		
		
		if (dataByMonth.length != 0) {
			res.send(dataByMonth);
		} else {
			res.status(404).send({
				error: 'not_found',
				message: 'No content',
				status: 404,
			})
		}
	} catch (err) {
		res.status(500).send({
			error: err.message || 'Some error occured while getting data.'
		})
	}

}
const getspentOfMoneyByMonthTest = async (req,res) => {
    try {
		//const adsByMonth = await db.sequelize.query(`select  SUM(mean_eur_spend) AS countMoney, month(FROM_UNIXTIME(ad_delivery_start_time)) as month, year(FROM_UNIXTIME(ad_delivery_start_time)) as year from ad where  year(FROM_UNIXTIME(ad_delivery_start_time)) = '2022'  GROUP by year(FROM_UNIXTIME(ad_delivery_start_time)), month(FROM_UNIXTIME(ad_delivery_start_time));`, { model: Ads })
		const adsByMonth =  await db.sequelize.query(`
		
		select
        CONCAT( DATE_FORMAT(FROM_UNIXTIME(ad_delivery_start_time), '%b ' ),
            case when dayofmonth(FROM_UNIXTIME(ad_delivery_start_time) ) < 16
                then '01-15'
                else CONCAT( '16-', right( last_day( FROM_UNIXTIME(ad_delivery_start_time) ), 2)  )
                end ) as CharMonth,
				sum( mean_eur_spend ) as countMoney
		from 
			ad
		where year(FROM_UNIXTIME(ad_delivery_start_time))  = '2022'
		group by
			CharMonth
		order by
			year(  FROM_UNIXTIME(ad_delivery_start_time) ),
			month(  FROM_UNIXTIME(ad_delivery_start_time) ),
			min( dayofmonth(  FROM_UNIXTIME(ad_delivery_start_time) ));`, { model: Ads })
		
		if (adsByMonth.length != 0) {
			res.send(adsByMonth);
		} else {
			res.status(404).send({
				error: 'not_found',
				message: 'No content',
				status: 404,
			})
		}
	} catch (err) {
		res.status(500).send({
			error: err.message || 'Some error occured while counting number of ads'
		})
	}
}




const getInfoPerCandidateByMonthPerSocialIssues = async (req,res) => {
    try {
			let socialIssues = [ 'Affaires internationales', 'Energie',
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
    		let candidates=[
			{
				"id":0,
                "candidate":"Emmanuel Macron",
                "partyPage":"En Marche #avecvous",
				"name":"macron",
				"data":[] 
			},
			{
                "id":1,
				"candidate":"Jean-Luc Mélenchon",
                "partyPage":"La France Insoumise",
				"name":"Mélenchon",
				"data":[]
			},
			{
                "id":2,
				"candidate":"Marine Le Pen",
                "partyPage":"Rassemblement National",
				"name":"le pen",
				"data":[]
			},
			{
                "id":3,
                "candidate":"Eric Zemmour",
                "partyPage":"RECONQUÊTE",
				"name":"zemmour",
				"data":[]
			},
			{
                "id":4,
				"candidate":"Fabien Roussel",
                "partyPage":"PCF - Parti Communiste Français",
				"name":"Roussel",
				"data":[]
			},
			{
                "id":5,
				"candidate":"Anne Hidalgo",
                "partyPage":"Parti Socialiste",
				"name":"Hidalgo",
				"data":[]
			},
			
			{
                "id":6,
                "candidate":"Nathalie Arthaud",
                "partyPage":"Lutte Ouvrière",
				"name":"Arthaud",
				"data":[]
			},
			{
                "id":7,
                "candidate":"Nicolas Dupont-Aignan",
                "partyPage":"Debout la France",
				"name":"Dupont-Aignan",
				"data":[]
			},
			{
                "id":8,
                "candidate":"Jean Lassalle",
                "partyPage":"Résistons!",
				"name":"Lassalle",
				"data":[]
			},
			{
                "id":9,
                "candidate":"Philippe Poutou",
                "partyPage":"New Anticapitalist Party",
				"name":"Poutou",
				"data":[]
			},
			{
                "id":10,
                "candidate":"Yannick Jadot",
                "partyPage":"Europe Ecologie Les Verts",
				"name":"Jadot",
				"data":[]
			},
			{
                "id":11,
                "candidate":"Valérie Pécresse",
                "partyPage":"Soyons libres - Les Républicains",
				"name":"Pécresse",
				"data":[]
			},
		]
		let round = req.params.round
		let query = ""
		if(round == "1")
		query = "and (  (month(FROM_UNIXTIME(ad_delivery_start_time)) < '4') or (month(FROM_UNIXTIME(ad_delivery_start_time)) = '4' and day(FROM_UNIXTIME(ad_delivery_start_time)) < '11')  )"
		else {
			if(round == "2"){
				query = "and ( month(FROM_UNIXTIME(ad_delivery_start_time)) = '4' and day(FROM_UNIXTIME(ad_delivery_start_time)) >= '11' and day(FROM_UNIXTIME(ad_delivery_start_time)) <= '24'  )"
				candidates =[
					{
						"id":0,
						"candidate":"Emmanuel Macron",
						"partyPage":"La République En Marche !",
						"data":[],
						"name":"macron",
					},
				
					{
						"id":1,
						"candidate":"Marine Le Pen",
						"partyPage":"Rassemblement National",
						"data":[],
						"name":"le pen",
					},
				]
			}
				else 
					query = "and ( (month(FROM_UNIXTIME(ad_delivery_start_time)) = '4' and day(FROM_UNIXTIME(ad_delivery_start_time)) >= '25' ) or (month(FROM_UNIXTIME(ad_delivery_start_time)) > '4')  )"
			}
			
		
		for (let socialIssue of socialIssues)
		{
			let i = 0
			for (let cand of candidates){
				let result =  await db.sequelize.query(`select MONTH(FROM_UNIXTIME(ad_delivery_start_time)) AS month, COUNT(ad_id) as countAds, SUM(mean_impressions) as impressions, SUM(mean_potential_reach) as reach, SUM(mean_eur_spend) AS spend FROM ad AS ads WHERE year(FROM_UNIXTIME(ad_delivery_start_time)) = '2022'`+query+ `and ad_creative_body LIKE "%`+cand.name+`%" GROUP BY YEAR(FROM_UNIXTIME(ad_delivery_start_time)), MONTH(FROM_UNIXTIME(ad_delivery_start_time)) ;`, { model: Ads })
				
				candidates[i].data = result != undefined ? result: []
				i += 1
			}
			infos[socialIssue] = JSON.parse(JSON.stringify(candidates))
		}
		infos["Aucune catégorie"] = infos["[]"];
		delete infos['[]'];
		if (infos.length != 0) {
			res.send(infos);
		} else {
			res.status(404).send({
				error: 'not_found',
				message: 'No content',
				status: 404,
			})
		}
	} catch (err) {
		res.status(500).send({
			error: err.message || 'Some error occured while counting number of ads'
		})
	}

}


const getInfoPerCandidateByMonth = async (req,res) => {
    try {
    		let candidates=[
			{
				"id":0,
                "candidate":"Emmanuel Macron",
                "partyPage":"En Marche #avecvous",
				"name":"macron",
				"data":[] 
			},
			{
                "id":1,
				"candidate":"Jean-Luc Mélenchon",
                "partyPage":"La France Insoumise",
				"name":"Mélenchon",
				"data":[]
			},
			{
                "id":2,
				"candidate":"Marine Le Pen",
                "partyPage":"Rassemblement National",
				"name":"le pen",
				"data":[]
			},
			{
                "id":3,
                "candidate":"Eric Zemmour",
                "partyPage":"RECONQUÊTE",
				"name":"zemmour",
				"data":[]
			},
			{
                "id":4,
				"candidate":"Fabien Roussel",
                "partyPage":"PCF - Parti Communiste Français",
				"name":"Roussel",
				"data":[]
			},
			{
                "id":5,
				"candidate":"Anne Hidalgo",
                "partyPage":"Parti Socialiste",
				"name":"Hidalgo",
				"data":[]
			},
			
			{
                "id":6,
                "candidate":"Nathalie Arthaud",
                "partyPage":"Lutte Ouvrière",
				"name":"Arthaud",
				"data":[]
			},
			{
                "id":7,
                "candidate":"Nicolas Dupont-Aignan",
                "partyPage":"Debout la France",
				"name":"Dupont-Aignan",
				"data":[]
			},
			{
                "id":8,
                "candidate":"Jean Lassalle",
                "partyPage":"Résistons!",
				"name":"Lassalle",
				"data":[]
			},
			{
                "id":9,
                "candidate":"Philippe Poutou",
                "partyPage":"New Anticapitalist Party",
				"name":"Poutou",
				"data":[]
			},
			{
                "id":10,
                "candidate":"Yannick Jadot",
                "partyPage":"Europe Ecologie Les Verts",
				"name":"Jadot",
				"data":[]
			},
			{
                "id":11,
                "candidate":"Valérie Pécresse",
                "partyPage":"Soyons libres - Les Républicains",
				"name":"Pécresse",
				"data":[]
			},
		]
		let round = req.params.round
		let query = ""
		if(round == "1")
		query = "and (  (month(FROM_UNIXTIME(ad_delivery_start_time)) < '4') or (month(FROM_UNIXTIME(ad_delivery_start_time)) = '4' and day(FROM_UNIXTIME(ad_delivery_start_time)) < '11')  )"
		else {
			if(round == "2"){
				query = "and ( month(FROM_UNIXTIME(ad_delivery_start_time)) = '4' and day(FROM_UNIXTIME(ad_delivery_start_time)) >= '11' and day(FROM_UNIXTIME(ad_delivery_start_time)) <= '24'  )"
				candidates =[
					{
						"id":0,
						"candidate":"Emmanuel Macron",
						"partyPage":"La République En Marche !",
						"data":[],
						"name":"macron",
					},
				
					{
						"id":1,
						"candidate":"Marine Le Pen",
						"partyPage":"Rassemblement National",
						"data":[],
						"name":"le pen",
					},
				
				
					
				]
			}
				else 
					query = "and ( (month(FROM_UNIXTIME(ad_delivery_start_time)) = '4' and day(FROM_UNIXTIME(ad_delivery_start_time)) >= '25' ) or (month(FROM_UNIXTIME(ad_delivery_start_time)) > '4')  )"
			}
			
		let i = 0
		for (let cand of candidates){
			let result =  await db.sequelize.query(`select MONTH(FROM_UNIXTIME(ad_delivery_start_time)) AS month, COUNT(ad_id) as countAds, SUM(mean_impressions) as impressions, SUM(mean_potential_reach) as reach, SUM(mean_eur_spend) AS spend FROM ad AS ads WHERE year(FROM_UNIXTIME(ad_delivery_start_time)) = '2022'`+query+ `and ad_creative_body LIKE "%`+cand.name+`%" GROUP BY YEAR(FROM_UNIXTIME(ad_delivery_start_time)), MONTH(FROM_UNIXTIME(ad_delivery_start_time)) ;`, { model: Ads })
			
			candidates[i].data = result != undefined ? result: []
			i += 1
		}
	
		if (candidates.length != 0) {
			res.send(candidates);
		} else {
			res.status(404).send({
				error: 'not_found',
				message: 'No content',
				status: 404,
			})
		}
	} catch (err) {
		res.status(500).send({
			error: err.message || 'Some error occured while counting number of ads'
		})
	}

}



const getSpendPerCandidate = async (req,res) => {
    try {
		let candidates=[
			{
				"id":0,
                "candidate":"Emmanuel Macron",
                "partyPage":"En Marche #avecvous",
				"name":"macron",
				"data":[] 
			},
			{
                "id":1,
				"candidate":"Jean-Luc Mélenchon",
                "partyPage":"La France Insoumise",
				"name":"Mélenchon",
				"data":[]
			},
			{
                "id":2,
				"candidate":"Marine Le Pen",
                "partyPage":"Rassemblement National",
				"name":"le pen",
				"data":[]
			},
			{
                "id":3,
                "candidate":"Eric Zemmour",
                "partyPage":"RECONQUÊTE",
				"name":"zemmour",
				"data":[]
			},
			{
                "id":4,
				"candidate":"Fabien Roussel",
                "partyPage":"PCF - Parti Communiste Français",
				"name":"Roussel",
				"data":[]
			},
			{
                "id":5,
				"candidate":"Anne Hidalgo",
                "partyPage":"Parti Socialiste",
				"name":"Hidalgo",
				"data":[]
			},
			
			{
                "id":6,
                "candidate":"Nathalie Arthaud",
                "partyPage":"Lutte Ouvrière",
				"name":"Arthaud",
				"data":[]
			},
			{
                "id":7,
                "candidate":"Nicolas Dupont-Aignan",
                "partyPage":"Debout la France",
				"name":"Dupont-Aignan",
				"data":[]
			},
			{
                "id":8,
                "candidate":"Jean Lassalle",
                "partyPage":"Résistons!",
				"name":"Lassalle",
				"data":[]
			},
			{
                "id":9,
                "candidate":"Philippe Poutou",
                "partyPage":"New Anticapitalist Party",
				"name":"Poutou",
				"data":[]
			},
			{
                "id":10,
                "candidate":"Yannick Jadot",
                "partyPage":"Europe Ecologie Les Verts",
				"name":"Jadot",
				"data":[]
			},
			{
                "id":11,
                "candidate":"Valérie Pécresse",
                "partyPage":"Soyons libres - Les Républicains",
				"name":"Pécresse",
				"data":[]
			},
		]

		let round = req.params.round
		let query = ""
		if(round == "1")
		query = "and (  (month(FROM_UNIXTIME(ad_delivery_start_time)) < '4') or (month(FROM_UNIXTIME(ad_delivery_start_time)) = '4' and day(FROM_UNIXTIME(ad_delivery_start_time)) < '11')  )"
		else {
			if(round == "2"){
				query = "and ( month(FROM_UNIXTIME(ad_delivery_start_time)) = '4' and day(FROM_UNIXTIME(ad_delivery_start_time)) >= '11' and day(FROM_UNIXTIME(ad_delivery_start_time)) <= '24'  )"
				candidates =[
					{
						"id":0,
						"candidate":"Emmanuel Macron",
						"partyPage":"La République En Marche !",
						"data":[],
						"name":"macron",
					},
				
					{
						"id":1,
						"candidate":"Marine Le Pen",
						"partyPage":"Rassemblement National",
						"data":[],
						"name":"le pen",
					},
				]
			}
				else 
					query = "and ( (month(FROM_UNIXTIME(ad_delivery_start_time)) = '4' and day(FROM_UNIXTIME(ad_delivery_start_time)) >= '25' ) or (month(FROM_UNIXTIME(ad_delivery_start_time)) > '4')  )"
			}
			
		let i = 0
		for (let cand of candidates){
			let result =  await db.sequelize.query(`select SUM(mean_eur_spend) AS spend FROM ad AS ads WHERE   year(FROM_UNIXTIME(ad_delivery_start_time)) = '2022'`+query+` and ad_creative_body like "%`+cand.name+`%";`, { model: Ads })
			candidates[i].data = result != undefined ? result: []
			i += 1
		}
         
		if (candidates.length != 0) {
			res.send(candidates);
		} else {
			res.status(404).send({
				error: 'not_found',
				message: 'No content',
				status: 404,
			})
		}
	} catch (err) {
		res.status(500).send({
			error: err.message || 'Some error occured while getting data.'
		})
	}

}


const getSpendPerCandidatePerSocialIssue = async (req,res) => {
    try {
		let candidates=[
			{
				"id":0,
                "candidate":"Emmanuel Macron",
                "partyPage":"En Marche #avecvous",
				"name":"macron",
				"data":[] 
			},
			{
                "id":1,
				"candidate":"Jean-Luc Mélenchon",
                "partyPage":"La France Insoumise",
				"name":"Mélenchon",
				"data":[]
			},
			{
                "id":2,
				"candidate":"Marine Le Pen",
                "partyPage":"Rassemblement National",
				"name":"le pen",
				"data":[]
			},
			{
                "id":3,
                "candidate":"Eric Zemmour",
                "partyPage":"RECONQUÊTE",
				"name":"zemmour",
				"data":[]
			},
			{
                "id":4,
				"candidate":"Fabien Roussel",
                "partyPage":"PCF - Parti Communiste Français",
				"name":"Roussel",
				"data":[]
			},
			{
                "id":5,
				"candidate":"Anne Hidalgo",
                "partyPage":"Parti Socialiste",
				"name":"Hidalgo",
				"data":[]
			},
			
			{
                "id":6,
                "candidate":"Nathalie Arthaud",
                "partyPage":"Lutte Ouvrière",
				"name":"Arthaud",
				"data":[]
			},
			{
                "id":7,
                "candidate":"Nicolas Dupont-Aignan",
                "partyPage":"Debout la France",
				"name":"Dupont-Aignan",
				"data":[]
			},
			{
                "id":8,
                "candidate":"Jean Lassalle",
                "partyPage":"Résistons!",
				"name":"Lassalle",
				"data":[]
			},
			{
                "id":9,
                "candidate":"Philippe Poutou",
                "partyPage":"New Anticapitalist Party",
				"name":"Poutou",
				"data":[]
			},
			{
                "id":10,
                "candidate":"Yannick Jadot",
                "partyPage":"Europe Ecologie Les Verts",
				"name":"Jadot",
				"data":[]
			},
			{
                "id":11,
                "candidate":"Valérie Pécresse",
                "partyPage":"Soyons libres - Les Républicains",
				"name":"Pécresse",
				"data":[]
			},
		]
		let socialIssues =  [ 'Affaires internationales', 'Energie',
		'Immigration','Justice et criminalité','Opérations gouvernementales', 'Politique culturelle',
		'Politique sociale','Politiques urbaines et territoriales', 'Santé', 'Travail et emploi',
		'Droits de l’homme libertés publiques et discriminations', 'Education',
		'Environnement', 'Economic', "[]"]
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
		let round = req.params.round
		let query = ""
		if(round == "1")
		query = "and (  (month(FROM_UNIXTIME(ad_delivery_start_time)) < '4') or (month(FROM_UNIXTIME(ad_delivery_start_time)) = '4' and day(FROM_UNIXTIME(ad_delivery_start_time)) < '11')  )"
		else {
			if(round == "2"){
				query = "and ( month(FROM_UNIXTIME(ad_delivery_start_time)) = '4' and day(FROM_UNIXTIME(ad_delivery_start_time)) >= '11' and day(FROM_UNIXTIME(ad_delivery_start_time)) <= '24'  )"
				candidates =[
					{
						"id":0,
						"candidate":"Emmanuel Macron",
						"partyPage":"La République En Marche !",
						"data":[],
						"name":"macron",
					},
				
					{
						"id":1,
						"candidate":"Marine Le Pen",
						"partyPage":"Rassemblement National",
						"data":[],
						"name":"le pen",
					},
				]
			}
				else 
					query = "and ( (month(FROM_UNIXTIME(ad_delivery_start_time)) = '4' and day(FROM_UNIXTIME(ad_delivery_start_time)) >= '25' ) or (month(FROM_UNIXTIME(ad_delivery_start_time)) > '4')  )"
			}
			
		for(let socialIssue of socialIssues){	
			let i = 0
			
			for (let cand of candidates){
				let result =  await db.sequelize.query(`select SUM(mean_eur_spend) AS spend, SUM(mean_impressions) as impressions FROM ad AS ads WHERE  social_issues_9cat like "%`+socialIssue+`%" and year(FROM_UNIXTIME(ad_delivery_start_time)) = '2022'`+query+` and ad_creative_body like "%`+cand.name+`%";`, { model: Ads })
				candidates[i].data = result != undefined ? result: []
				i += 1
			}
			infos[socialIssue] =  JSON.parse(JSON.stringify(candidates))
			
		}	
		infos["Aucune catégorie"] = infos["[]"];
		delete infos['[]'];
		if (infos.length != 0) {
			res.send(infos);
		} else {
			res.status(404).send({
				error: 'not_found',
				message: 'No content',
				status: 404,
			})
		}
	} catch (err) {
		res.status(500).send({
			error: err.message || 'Some error occured while getting data.'
		})
	}

}


const getSpendPerSocialIssuePerCandidate = async (req,res) => {
    try {
		let candidates=[
			{
				"id":0,
                "candidate":"Emmanuel Macron",
                "partyPage":"En Marche #avecvous",
				"name":"macron",
				"data":[] 
			},
			{
                "id":1,
				"candidate":"Jean-Luc Mélenchon",
                "partyPage":"La France Insoumise",
				"name":"Mélenchon",
				"data":[]
			},
			{
                "id":2,
				"candidate":"Marine Le Pen",
                "partyPage":"Rassemblement National",
				"name":"le pen",
				"data":[]
			},
			{
                "id":3,
                "candidate":"Eric Zemmour",
                "partyPage":"RECONQUÊTE",
				"name":"zemmour",
				"data":[]
			},
			{
                "id":4,
				"candidate":"Fabien Roussel",
                "partyPage":"PCF - Parti Communiste Français",
				"name":"Roussel",
				"data":[]
			},
			{
                "id":5,
				"candidate":"Anne Hidalgo",
                "partyPage":"Parti Socialiste",
				"name":"Hidalgo",
				"data":[]
			},
			
			{
                "id":6,
                "candidate":"Nathalie Arthaud",
                "partyPage":"Lutte Ouvrière",
				"name":"Arthaud",
				"data":[]
			},
			{
                "id":7,
                "candidate":"Nicolas Dupont-Aignan",
                "partyPage":"Debout la France",
				"name":"Dupont-Aignan",
				"data":[]
			},
			{
                "id":8,
                "candidate":"Jean Lassalle",
                "partyPage":"Résistons!",
				"name":"Lassalle",
				"data":[]
			},
			{
                "id":9,
                "candidate":"Philippe Poutou",
                "partyPage":"New Anticapitalist Party",
				"name":"Poutou",
				"data":[]
			},
			{
                "id":10,
                "candidate":"Yannick Jadot",
                "partyPage":"Europe Ecologie Les Verts",
				"name":"Jadot",
				"data":[]
			},
			{
                "id":11,
                "candidate":"Valérie Pécresse",
                "partyPage":"Soyons libres - Les Républicains",
				"name":"Pécresse",
				"data":[]
			},
		]
		let socialIssues =  [ 'Affaires internationales', 'Energie',
		'Immigration','Justice et criminalité','Opérations gouvernementales', 'Politique culturelle',
		'Politique sociale','Politiques urbaines et territoriales', 'Santé', 'Travail et emploi',
		'Droits de l’homme libertés publiques et discriminations', 'Education',
		'Environnement', 'Economic', "[]"]
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
		let round = req.params.round
		let query = ""
		if(round == "1")
		query = "and (  (month(FROM_UNIXTIME(ad_delivery_start_time)) < '4') or (month(FROM_UNIXTIME(ad_delivery_start_time)) = '4' and day(FROM_UNIXTIME(ad_delivery_start_time)) < '11')  )"
		else {
			if(round == "2"){
				query = "and ( month(FROM_UNIXTIME(ad_delivery_start_time)) = '4' and day(FROM_UNIXTIME(ad_delivery_start_time)) >= '11' and day(FROM_UNIXTIME(ad_delivery_start_time)) <= '24'  )"
				candidates =[
					{
						"id":0,
						"candidate":"Emmanuel Macron",
						"partyPage":"La République En Marche !",
						"data":[],
						"name":"macron",
					},
				
					{
						"id":1,
						"candidate":"Marine Le Pen",
						"partyPage":"Rassemblement National",
						"data":[],
						"name":"le pen",
					},
				]
			}
				else 
					query = "and ( (month(FROM_UNIXTIME(ad_delivery_start_time)) = '4' and day(FROM_UNIXTIME(ad_delivery_start_time)) >= '25' ) or (month(FROM_UNIXTIME(ad_delivery_start_time)) > '4')  )"
			}
			
		for(let cand in candidates){
			let i = 0
			for(let socialIssue of socialIssues){
				let result =  await db.sequelize.query(`select SUM(mean_eur_spend) AS spend , SUM(mean_impressions) as impressions FROM ad AS ads WHERE  social_issues_9cat like "%`+socialIssue+`%" and year(FROM_UNIXTIME(ad_delivery_start_time)) = '2022'`+query+` and ad_creative_body like "%`+candidates[cand].name+`%";`, { model: Ads })
				infos[socialIssue] = result
				i += 1
			}
			infos["Aucune catégorie"] = infos["[]"];
			delete infos['[]'];
			candidates[cand].data =JSON.parse(JSON.stringify(infos))
		}
		
         
		if (candidates.length != 0) {
			res.send(candidates);
		} else {
			res.status(404).send({
				error: 'not_found',
				message: 'No content',
				status: 404,
			})
		}
	} catch (err) {
		res.status(500).send({
			error: err.message || 'Some error occured while getting data.'
		})
	}

}

const getAdsByMentioningCandidates = async(req,res)=>{

    try{
		let round = req.params.round
		let query = ""
		if(round == "1")
		query = "and (  (month(FROM_UNIXTIME(a.ad_delivery_start_time)) < '4') or (month(FROM_UNIXTIME(a.ad_delivery_start_time)) = '4' and day(FROM_UNIXTIME(a.ad_delivery_start_time)) < '11')  )"
		else {
			if(round == "2"){
				query = "and ( month(FROM_UNIXTIME(a.ad_delivery_start_time)) = '4' and day(FROM_UNIXTIME(a.ad_delivery_start_time)) >= '11' and day(FROM_UNIXTIME(a.ad_delivery_start_time)) <= '24'  )"
				
			}
				else 
					query = "and ( (month(FROM_UNIXTIME(a.ad_delivery_start_time)) = '4' and day(FROM_UNIXTIME(a.ad_delivery_start_time)) >= '25' ) or (month(FROM_UNIXTIME(a.ad_delivery_start_time)) > '4')  )"
			}
			        let candidateName = req.params.candidate
        let result =  await db.sequelize.query(` select distinct a.ad_id,  a.ad_creative_body,  a.funding_entity, b.page_name, a.ad_snapshot_url, FROM_UNIXTIME(a.ad_delivery_start_time)  as ad_delivery_start_time  from ad a inner join 
        advertiser b on b.page_id = a.advertiser_id where a.ad_creative_body like '%`+ candidateName + `%' and YEAR(FROM_UNIXTIME(a.ad_delivery_start_time)) = '2022' `+query+` and a.languages = "fr" order by FROM_UNIXTIME(a.ad_delivery_start_time) desc limit 20 ;`, { model: Ads })
        res.send(result)
    }
    catch(err){
        res.status(500).send({
            message:
                err.message || "An error occured while retrieving advertisers from database."
        })
    }

}


const getCandidatesDistributionOfImpressionsPerSocialIssue = async (req,res)=>{
    try{
        let candidate = req.params.candidate
        let socialIssues =   [ 'Affaires internationales', 'Energie',
		'Immigration','Justice et criminalité','Opérations gouvernementales', 'Politique culturelle',
		'Politique sociale','Politiques urbaines et territoriales', 'Santé', 'Travail et emploi',
		'Droits de l’homme libertés publiques et discriminations', 'Education',
		'Environnement', 'Economic',"[]"]
		let infos = {
			"Affaires internationales":0,
			"Energie":0,
			"Immigration":0,
			"Justice et criminalité":0,
			"Opérations gouvernementales":0,
			"Politique culturelle":0,
			"Politique sociale":0,
			"Politiques urbaines et territoriales":0,
			"Santé":0,
			"Travail et emploi":0,
			"Droits de l’homme libertés publiques et discriminations":0,
			"Education": 0,
			"Environnement":0,
			"Economic":0,
            		"[]" : 0
		}

        const data = await db.sequelize.query(`select social_issues_14cat, mean_impressions as impressions FROM ad  where languages = "fr" and YEAR( FROM_UNIXTIME(ad_delivery_start_time) ) = '2022' and social_issues_14cat is not null and ad_creative_body like "%`+candidate+`%"  ` , { model: Ads })
        
        if(data != null)
        {
            for(let socialIssue of socialIssues){
                let impressions1 = 0
                
		for (let el of data){
                    if(el.dataValues.social_issues_14cat != null && el.dataValues.social_issues_14cat.includes(socialIssue)){
			     infos[socialIssue] += parseInt(Math.round(el.dataValues.impressions)) 		  }
			
                            
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
                err.message || "An error occured while retrieving demographic distribution from database."
        });
    }
};

export default {
    getAllAds,
	getAllAdsBySocialIssue,
    getGeneralStatisticsOfAds,
	getInfoPerCandidateByMonthPerSocialIssues,
    getnumberOfAdsByMonth,
    getnumberOfAdsByCurrency,
    getspentOfMoneyByMonth,
	getnumberOfImpressionsByMonth,
	getnumberOfAdsByMonthTest,
    getspentOfMoneyByMonthTest,
	getnumberOfImpressionsByMonthTest,
    getInfoPerCandidateByMonth,
	getSpendPerCandidate,
	getAdsByMentioningCandidates,
	getInfoPerMonthPerSocialIssue,
	getSpendPerCandidatePerSocialIssue,
	getSpendPerSocialIssuePerCandidate,
	getInfoPerMonthPerSocialIssueParCandidate,
	getCandidatesDistributionOfImpressionsPerSocialIssue,
}
