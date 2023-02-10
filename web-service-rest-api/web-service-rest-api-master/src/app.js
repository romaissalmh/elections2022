var express = require('express')
var dotenv = require('dotenv')
var cors = require('cors')
var bodyParser = require('body-parser')

//import all our routes 
import adRouter from './routes/ad.route'
import advertiserRouter from './routes/advertiser.route'
import regionDistributionRouter from './routes/region_distribution.route'
import demographicDistributionRouter from './routes/demographic_distribution.route'
import dateLocationTimeRouter from './routes/date_location_time.route'
import advertiserMoneyRouter from './routes/advertiser_money.route'
import regionMapRouter from './routes/region_map.route'

dotenv.config()

const app = express()

// Cross Origin Resources Sharing, Initially all whitelisted
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

app.get('/', (req, res) => {
    res.send('<h1>Welcome to Web Service REST API</h1>')
    
  })
  
//ad route
app.use('/api/general', adRouter);
app.use('/api/pages', advertiserRouter);
app.use('/api/regionDistribution', regionDistributionRouter);
app.use('/api/demographicDistribution', demographicDistributionRouter);
app.use('/api/dateLocationTime', dateLocationTimeRouter);
app.use('/api/pagesMoney', advertiserMoneyRouter);
app.use('/api/regionMap', regionMapRouter);


module.exports = app;
