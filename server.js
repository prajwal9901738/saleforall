import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import { connect } from 'mongoose';
import connectDB from './database/mongodb.js';
import authrout from './routers/autrout.js';
import userRouter from './routers/userroute.js';
const app = express();
const PORT = process.env.PORT || 3000;
connectDB()
const allowlist = ['http://localhost:5173'];

app.use(cors({ origin: allowlist,credentials: true}));
app.use(express.json());
app.use(cookieParser());
// api endpoints
app.use('/api/auth', authrout);
app.use('/api/user', userRouter);
app.get('/', (req, res) =>
  res.send('Hello'),);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});