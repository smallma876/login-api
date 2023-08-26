import { Schema, model } from 'mongoose';

const tweetSchema = new Schema({
  content: { type: String, required: true, maxlength: 280 },
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  created_at: { type: Date, default: Date.now },
});

const TweetModel = model('Tweet', tweetSchema);

export default TweetModel;