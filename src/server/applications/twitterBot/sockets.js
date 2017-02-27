// @flow

import CreatePostSocketHandler from './business/createPost/createPost';

export default (socket: Object) => {
  CreatePostSocketHandler(socket);
};
