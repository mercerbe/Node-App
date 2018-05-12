
  const  TWITTER_CONSUMER_KEY = 'yN2KoMEu65aBFGl6IICgX98KS';
  const  TWITTER_CONSUMER_SECRET ='C20QqMoavq6co5cxgXNBM42hvwLCGoeUylfSFApU2NseQJi88H';
  const  TWITTER_ACCESS_TOKEN_KEY = '993590503169052679-zKlkHnD8ZMS7la3Lkeq8x6rEowhKmk4';
  const  TWITTER_ACCESS_TOKEN_SECRET = 'LXXLAikcPb9bxmp3A0UDt8JYQvZ7XQuws3kgdU4PSlMui';

console.log('this is loaded');

exports.twitter = {
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
};

exports.spotify = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
};
