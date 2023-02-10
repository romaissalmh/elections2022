import express from 'express'; 
const router = express.Router();
import RegionDistributionControleur from "../controllers/region_distribution.controller";

router.get('/', RegionDistributionControleur.getAllRegionDistribution);
router.get('/entitiesByRegion', RegionDistributionControleur.getNumberOfAdsByRegion);
router.get('/spentByRegion', RegionDistributionControleur.getExpenditureByRegion);
router.get('/regionDistributionOfImpressionsPerSocialIssue', RegionDistributionControleur.getRegionDistributionOfImpressionsPerSocialIssue);



export default router;  
