import { Router } from 'express'; 
import { getBestsellerLists, getBestsellersByCategory, createBestseller, getAllBestsellers, updateBestseller, deleteBestseller } from '../controllers/bestsellers';
const router = Router(); 

// routes prefixed with /api
router.get('/lists', getBestsellerLists); 
router.get('/bestsellers/:category', getBestsellersByCategory)
router.post('/create', createBestseller)
router.get('/read-all', getAllBestsellers)
router.patch('/update/:id', updateBestseller)
router.delete('/delete/:id', deleteBestseller)

export default router; 