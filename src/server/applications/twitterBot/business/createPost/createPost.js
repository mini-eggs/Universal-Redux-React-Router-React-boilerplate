// @flow

import GetPostList from './getPostList';
import GetMarkovChain from './getMarkovChain';

export default (socket: Object) => {
  socket.on('twitterBot/createPost', async (props: Object) => {
    if (!props.screen_name) {
      socket.emit('twitterBot/createPost/error', {
        message: 'No screen_name parameter present'
      });
    } else {
      const onComplete = data => {
        socket.emit('twitterBot/createPost/complete', { sentence: data });
      };
      const onFail = err => {
        console.log(err);
        socket.emit('twitterBot/createPost/error', err);
      };
      GetPostList(props).then(GetMarkovChain).then(onComplete).catch(onFail);
    }
  });
};
