import Request from 'request';

export default image => {
  return new Promise((resolve, reject) => {
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Client-ID ' + process.env.IMGUR_CLIENT_ID
    };

    const options = {
      url: 'https://api.imgur.com/3/image',
      method: 'POST',
      headers: headers,
      body: JSON.stringify({ image: image })
    };

    Request(options, (error, response, buffer) => {
      if (error) reject(err);
      /* parse will sometimes fail */
      try {
        const link = JSON.parse(response.body).data.link;
        resolve(link.replace('http://', 'https://'));
      } catch(err) {
        reject(err)
      }
    });
  });
};
