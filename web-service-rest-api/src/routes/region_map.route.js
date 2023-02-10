import express from 'express'; 
const router = express.Router();
import RegionMapController from "../controllers/region_map.controller";

router.get('/entitiesByRegion', RegionMapController.getNumberOfAdsByRegion);
router.get('/spentByRegion', RegionMapController.getExpenditureByRegion);
router.get('/impressionsByRegion', RegionMapController.getImpressionsByRegion);

export default router;  