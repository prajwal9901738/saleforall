import express from 'express';
import authrisetoken from '../middlewarepasser/authrisetoken.js';
import { getUserById } from '../controller/usercontroller.js';

const userRouter = express.Router();
userRouter.get('/userinfo', authrisetoken, getUserById);
export default userRouter;