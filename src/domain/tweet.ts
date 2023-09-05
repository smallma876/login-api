export interface RequestPostTweet {
    content: string;
    likes?: string[];
    retweets?: string[];
    replies?: string[];
    replyTo?: string;
}