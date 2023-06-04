import { Router } from 'express';
const router = Router();

import * as UserController from '../controllers/user.controller';


router.route('/')
    .get(UserController.getUsers)
    .post(UserController.createUser)

router.route('/:userId')
    .get(UserController.getUser)
    .delete(UserController.deleteUser)
    .put(UserController.updateUser)

export default router;