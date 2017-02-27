// @flow

import Axios from 'axios';

const watson = require('watson-developer-cloud');
const alchemy_language = watson.alchemy_language({ api_key: process.env.ALCHEMY_API_KEY });

// example post
// curl -H "Content-Type: application/json" -X POST -d '{"text":"here is some terms of service", "type": "text"}' http://localhost:8080/legalesee/read

function getAlchemyDataFromUrl(url) {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await Axios.get(url);
      const props = {
        html: data.data
      };
      alchemy_language.keywords(props, (err, response) => {
        if (err) reject(err);
        resolve(response);
      });
    } catch (err) {
      reject(err);
    }
  });
}

export default (req: Object, res: Object) => {
  function complete(data) {
    res.json({
      status: 1,
      message: 'success',
      response: data
    });
  }

  function error(err) {
    res.json({
      status: -1,
      message: 'error',
      error: err
    });
  }

  const data = req.body;

  if (!data) {
    res.json({ status: -1, message: 'no post data' });
  } else if (!data.text) {
    res.json({ status: -1, message: 'no post data "text" param' });
  } else if (!data.type) {
    res.json({ status: -1, message: 'no post data "type" param' });
  } else if (
    data.type !== 'text' && data.type !== 'html' && data.type !== 'url'
  ) {
    res.json({
      status: -1,
      message: 'post data "type" param incorrect',
      content: data.type
    });
  } else {
    const props = {};
    props[data.type] = data.text;

    /**
     * This API is unpredictable with URLs
     * so we have a fallback
     */

    alchemy_language.keywords(props, async (err, response) => {
      if (err && data.type === 'url') {
        try {
          const alchResponse = await getAlchemyDataFromUrl(data.text);
          complete(alchResponse.keywords);
        } catch (err) {
          error(err);
        }
      } else if (err) {
        error(err);
      } else {
        complete(response.keywords);
      }
    });
  }
};
