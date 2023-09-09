import { Request, Response } from 'express';
import { mockRequestPostTweet } from './__mocks__/tweet.mock';
import TweetModel, { Tweet } from 'models/tweet.model';
import { postTweet } from 'controllers/tweet.controller';

jest.mock('./../../models/tweet.model');

describe('tweetController', () => {
  describe('postTweet', () => {
    it('should return 500 error if there is a server error', async () => {
      const req = {} as Request;
      const res = {} as Response;

      req.body = mockRequestPostTweet;

      const mockTweetResponse: Tweet = {
        author: '123',
        content: 'test content',
        likes: ['123', '456'],
        retweets: ['123', '456'],
        replies: ['123', '456'],
        replyTo: '12',
        createdAt: new Date(),
      };

      (TweetModel.findById as jest.Mock).mockResolvedValue(mockTweetResponse);
      (TweetModel.create as jest.Mock).mockResolvedValue(mockTweetResponse);

      res.status = jest.fn().mockReturnThis();
      res.json = jest.fn();

      await postTweet(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Tweet creado',
        tweet: mockTweetResponse,
      });
    });

    it('should return 500 error if there is a server error', async () => {
      const req = {} as Request;
      const res = {} as Response;

      req.body = mockRequestPostTweet;

      (TweetModel.findById as jest.Mock).mockRejectedValue(
        new Error('Server error')
      );

      res.status = jest.fn().mockReturnThis();
      res.json = jest.fn();

      await postTweet(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Error interno del servidor',
      });
    });

    it('should return 400 error if content field is empty', async () => {
      const req = {} as Request;
      const res = {} as Response;

      req.body = {
        content: null,
        likes: [],
        retweets: [],
        replies: [],
        replyTo: '12',
      };

      res.status = jest.fn().mockReturnThis();
      res.json = jest.fn();

      await postTweet(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: 'El contenido es requerido',
      });
    });

    it('should return 404 error tweetToReply is not founded', async () => {
      const req = {} as Request;
      const res = {} as Response;

      req.body = mockRequestPostTweet;

      const mockTweetResponse: Tweet = {
        author: '123',
        content: 'test content',
        likes: ['123', '456'],
        retweets: ['123', '456'],
        replies: ['123', '456'],
        replyTo: '12',
        createdAt: new Date(),
      };

      (TweetModel.findById as jest.Mock).mockResolvedValue(null);
      (TweetModel.create as jest.Mock).mockResolvedValue(mockTweetResponse);

      res.status = jest.fn().mockReturnThis();
      res.json = jest.fn();

      await postTweet(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Tweet no encontrado',
      });
    });
  });
});
