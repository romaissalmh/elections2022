import express from 'express'; 
const router = express.Router();
import AdvertiserMoneyController from "../controllers/advertiser_money.controller";

router.get('/', AdvertiserMoneyController.getAllAdvertisersMoney);
router.get('/ByPageName', AdvertiserMoneyController.getAllByAdvertiserName);

export default router;  