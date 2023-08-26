import { Request, Response } from 'express';
import TweetModel from 'models/tweet.model';

export const postTweet = async (req: Request, res: Response) => {
  try {
    const tweet = await TweetModel.create({
      content: req.body.content,
      author: req.userId,
    });
    res.status(201).json({ message: 'Tweet creado', tweet });
  } catch (error) {
    res.status(500).json({ message: 'Error al publicar el tweet' });
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
