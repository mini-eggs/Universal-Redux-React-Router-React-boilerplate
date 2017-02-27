import Request from 'request';

export default props => {
  return new Promise((resolve, reject) => {
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Client-ID ' + imgurKey
    };

    const data = {
      url: 'https://api.imgur.com/3/upload',
      method: 'POST',
      headers: headers,
      body: JSON.stringify({ image: props.image })
    };

    Request(data, (error, response, buffer) => {
      if (error) {
        reject(err);
      } else {
        resolve({ response: response, buffer: buffer });
      }
    });
  });
};
