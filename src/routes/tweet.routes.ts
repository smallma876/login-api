import { getTweets, postTweet } from './../controllers/tweet.controller';
import { Router } from 'express';

const router = Router();

router.post('/tweets', postTweet);
router.get('/tweets', getTweets);

export default router;
