import { Router } from 'express';
import { signupController, loginController, tokenValidityController, putAuthUserController } from './authentication.controller.js';
import { isAuth } from "../../middleware/isAuth.middleware.js";

const router = Router();

// 1. POST USER (SIGN UP) - EVERYONE
router.post('/signup', signupController)

// 2. POST USER (LOG IN) - EVERYONE
router.post('/login', loginController)

// 3. POST USER (CHECK TOKEN VALIDITY) - AUTHORIZED
router.post('/token-validity', 
    isAuth, 
    tokenValidityController
)

// 4. CHANGE USER DATA - OWNER
router.put('/auth/user', 
    isAuth,
    putAuthUserController
)

export default router;