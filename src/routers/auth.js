import express from 'express';
import { deleteUserById, getAll, signin, signup } from '../controllers/auth';
const router = express.Router();


router.post('/auth/signup', signup);
router.post('/auth/signin', signin);
router.get('/auth/users', getAll);
router.delete('/auth/users/:id', deleteUserById);
export default router;