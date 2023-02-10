import express from 'express'; 
const router = express.Router();
import DemographicDistributionControleur from "../controllers/demographic_distribution.controller";

router.get('/', DemographicDistributionControleur.getAllDemographicDistribution);
router.get('/demographicBreakdownByGenderAge', DemographicDistributionControleur.getDemographicBreakdownByGenderAge);
router.get('/pageReachByGenderAge/:age/:gender', DemographicDistributionControleur.getAdvertiserByGenderAgeReached);
router.get('/entitiesTargetingAgeGender/:age/:gender/:socialIssue/:advertiser', DemographicDistributionControleur.getAdsTargetingAgeGender);
router.get('/entitiesTargetingCandidate/:age/:gender/:candidate', DemographicDistributionControleur.getAdsTargetingCandidates);
router.get('/entitiesTargetingAgeGenderBySocialIssues/:age/:gender/:advertiser', DemographicDistributionControleur.getAdsTargetingAgeGenderBySocialIssues);
router.get('/pageReachByGenderAgeCandidate/:age/:gender/:candidate', DemographicDistributionControleur.getAdvertiserByCandidateGenderAgeReached);
router.get('/demographicBreakdownOfentitiesMentioningCandidates/:candidate/:round', DemographicDistributionControleur.getDemographicBreakdownByGenderAgeOfAdsMentioningCandidaties);
router.get('/getDemographicDistributionOfImpressionsPerSocialIssue', DemographicDistributionControleur.getDemographicDistributionOfImpressionsPerSocialIssue);

export default router;   
