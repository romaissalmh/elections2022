import express from 'express'; 
const router = express.Router();
import advertiserControleur from "../controllers/advertiser.controller";

router.get('/', advertiserControleur.getAllAdvertisers);
router.get('/numberOfEntitiesByPage', advertiserControleur.getNumberOfAdsByAvertiser);
router.get('/numberOfImpressionsByPage', advertiserControleur.getNumberOfImpressionsByAvertiser);
router.get('/expenditureByPage', advertiserControleur.getExpenditureByAvertiser);
router.get('/infosByCandidateOfficialPages/:round', advertiserControleur.getInfosOfAdsByCandidateOfficialPages);
router.get('/entitiesByCandidatesOfficialPages/:candidate/:party/:round', advertiserControleur.getAdsByCandidatesOfficialPages);
router.get('/entitiesByPages/:page', advertiserControleur.getAdsByAdvertisers);


router.get('/infosPerSocialIssuesByCandidateOfficialPages/:round', advertiserControleur.getInfosOfAdsPerSocialIssuesByCandidateOfficialPages);
router.get('/infosByCandidateOfficialPagesPerSocialIssues/:round', advertiserControleur.getInfosOfAdsByCandidateOfficialPagesPerSocialIssues);




export default router; 