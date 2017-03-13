import Twitter from 'twitter';

const client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

const defaultParams = {
  count: 200,
  exclude_replies: true,
  contributor_details: false,
  include_rts: false,
  trim_user: true
};

const getSingleTweetList = (client, props, last) => {
  const params = props;
  if (last) {
    params.max_id = last;
  }

  return new Promise((resolve, reject) => {
    client.get('statuses/user_timeline', params, function(
      error,
      tweets,
      response
    ) {
      if (error) {
        console.log('here');
        console.log(error);
        reject(error);
      } else {
        const data = {
          tweets: tweets.map(tweet => tweet.text)
        };
        if (tweets[tweets.length - 1] && tweets.length !== 1) {
          // for new accounts twitter api
          // will coninuously send one tweet back
          data.last = tweets[tweets.length - 1].id;
        }
        resolve(data);
      }
    });
  });
};

export default props => {
  const params = Object.assign({}, defaultParams, props);

  let tweets = [];
  let moreTweets = true;
  let last = null;

  return new Promise(async (resolve, reject) => {
    while (moreTweets) {
      try {
        const tweetData = await getSingleTweetList(client, params, last);
        if (tweetData.last) {
          tweets = tweets.concat(tweetData.tweets);
          last = tweetData.last;
        } else {
          moreTweets = false;
          resolve(tweets);
        }
      } catch (err) {
        moreTweets = false;
        resolve(tweets);
      }
    }
  });
};
