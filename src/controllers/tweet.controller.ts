import { RequestPostTweet } from 'domain/tweet';
import { Request, Response } from 'express';
import TweetModel, { Tweet } from 'models/tweet.model';

export const postTweet = async (req: Request, res: Response) => {
  const { content, replyTo } = req.body as RequestPostTweet;

  if (!content) {
    return res.status(400).json({ message: 'El contenido es requerido' });
  }

  try {
    const tweetData: Tweet = {
      author: req.userId || '',
      content: req.body.content,
      likes: [],
      retweets: [],
      replies: [],
      replyTo: req.body.replyTo,
    };

    if (replyTo) {
      const tweetToReply = await TweetModel.findById(replyTo);

      if (!tweetToReply) {
        return res.status(404).json({ message: 'Tweet no encontrado' });
      }

      tweetData.replyTo = replyTo;
    }
    const tweet = await TweetModel.create(tweetData);
    res.status(201).json({ message: 'Tweet creado', tweet });
  } catch (error) {
    console.error('Error al publicar el tweet:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

export const getTweets = async (req: Request, res: Response) => {
  try {
    const tweets = await TweetModel.find()
      .populate('author')
      .sort({ created_at: 'desc' });
    res.status(200).json({ tweets });
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los tweets' });
  }
};
