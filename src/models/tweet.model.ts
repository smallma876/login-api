import { Schema, model } from 'mongoose';

export interface Tweet {
  author: string; // ID del usuario
  content: string;
  likes: string[]; // Lista de IDs de usuarios
  retweets: string[]; // Lista de IDs de usuarios
  replies: string[]; // Lista de IDs de tweets
  replyTo?: string; // ID del tweet al que se está respondiendo
  createdAt?: Date;
}

type ITweet = Tweet & Document;

const tweetSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true, maxlength: 280 },
  createdAt: { type: Date, default: Date.now },
  likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  retweets: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  replies: [{ type: Schema.Types.ObjectId, ref: 'Tweet' }],
  replyTo: { type: Schema.Types.ObjectId, ref: 'Tweet' },
});

const TweetModel = model<ITweet>('Tweet', tweetSchema);

export default TweetModel;
