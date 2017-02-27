import Request from 'request';

export default props => {
  return new Promise((resolve, reject) => {
    Request(props.url, (error, response, buffer) => {
      if (error) {
        reject(err);
      } else {
        resolve({ response: response, buffer: buffer });
      }
    });
  });
};
