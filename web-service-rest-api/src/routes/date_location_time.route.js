import express from 'express'; 
const router = express.Router();
import DateLocationTime from "../controllers/date_location_time.controller";

router.get('/', DateLocationTime.getAllDateLocationTime);
router.get('/dateLocationTimeByRegion/:region', DateLocationTime.getDateLocationTimeByRegion);
router.get('/dateLocationTimeByDay', DateLocationTime.getDateLocationTimeByDay);




export default router;  