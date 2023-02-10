import express from 'express'; 
const router = express.Router();
import adControleur from "../controllers/ad.controller";

router.get('/', adControleur.getAllAds);
router.get('/bySocialIssue/:socialIssue', adControleur.getAllAdsBySocialIssue);

router.get('/generalStatistics', adControleur.getGeneralStatisticsOfAds);
router.get('/numberOfEntitiesByMonth', adControleur.getnumberOfAdsByMonth);
router.get('/numberOfImpressionsByMonth', adControleur.getnumberOfImpressionsByMonth);
router.get('/spentOfMoneyByMonth', adControleur.getspentOfMoneyByMonth);
router.get('/numberOfEntitiesByMonthtest', adControleur.getnumberOfAdsByMonthTest);
router.get('/numberOfImpressionsByMonthtest', adControleur.getnumberOfImpressionsByMonthTest);
router.get('/spentOfMoneyByMonthtest', adControleur.getspentOfMoneyByMonthTest);
router.get('/numberOfEntitiesByCurrency', adControleur.getnumberOfAdsByCurrency);
router.get('/infoCandidatesByMonth/:round', adControleur.getInfoPerCandidateByMonth);
router.get('/spendCandidates/:round', adControleur.getSpendPerCandidate);
router.get('/entitiesMentioningCandidates/:candidate/:round', adControleur.getAdsByMentioningCandidates);

router.get('/infoPerMonthPerSocialIssue', adControleur.getInfoPerMonthPerSocialIssue);

router.get('/spendPerCandidatePerSocialIssue/:round', adControleur.getSpendPerCandidatePerSocialIssue);
router.get('/spendPerSocialIssuePerCandidate/:round', adControleur.getSpendPerSocialIssuePerCandidate);

router.get('/infoPerMonthPerSocialIssueParCandidate/:candidate', adControleur.getInfoPerMonthPerSocialIssueParCandidate);

router.get('/candidatesDistributionOfImpressionsPerSocialIssue/:candidate', adControleur.getCandidatesDistributionOfImpressionsPerSocialIssue);



export default router;


