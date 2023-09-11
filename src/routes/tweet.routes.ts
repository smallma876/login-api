import { postTweet } from './../controllers/tweet.controller';
import { Router } from 'express';

const router = Router();

router.post('/create', postTweet);

export default router;
