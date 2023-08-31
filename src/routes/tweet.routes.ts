import { getTweets, postTweet } from './../controllers/tweet.controller';
import { Router } from 'express';

const router = Router();

router.post('/create', postTweet);
router.get('/list', getTweets);

export default router;
