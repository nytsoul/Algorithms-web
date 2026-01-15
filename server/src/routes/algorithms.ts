import express, { Router } from 'express';
import { 
  getAllAlgorithms, 
  getAlgorithmById, 
  createAlgorithm 
} from '../controllers/algorithmController';

const router: Router = express.Router();

router.get('/', getAllAlgorithms);
router.get('/:id', getAlgorithmById);
router.post('/', createAlgorithm);

export default router;
