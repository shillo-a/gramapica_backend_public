import { Router } from 'express';
import { isAuth } from '../../middleware/isAuth.middleware.js';
import { getUserController } from './user.controller.js';

const router = Router();

// 1. GET USER INFO - EVERYONE
router.get('/users/:userKey', getUserController)


// 2. GET USER INFO - RELATED TO AUTHORIZED (almost OWNER)
// router.get('/current-user',
//     isAuth,
//     getCurrentUserController
// )

export default router;