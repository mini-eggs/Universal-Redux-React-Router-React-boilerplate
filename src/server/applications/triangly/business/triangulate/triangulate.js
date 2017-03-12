// @flow

import Triangulate from 'triangulate-image';
import Request from 'request';
import Fs from 'fs';
import { Complete, Failure, UploadImage } from '../../../shared/';

const defaultOptions = {
  accuracy: 0.7,
  blur: 40,
  threshold: 50,
  vertexCount: 700,
  fill: true,
  stroke: true,
  strokeWidth: 0.5,
  gradients: true,
  gradientStops: 4,
  lineJoin: 'miter',
  transparentColor: false
};

// curl -H "Content-Type: application/json" -X POST -d '{ "image": "http://www.celpip.ca/wp-content/uploads/2015/05/home_madeincanada5-1.png" }' http://localhost:8000/triangly/triangulate

const saveTemp = (url) => {
  return new Promise((resolve, reject) => {
    const parts = url.split('.')
    const name = new Date().getTime() + '.' + parts[parts.length - 1]
    Request.get({url: url, encoding: 'binary'}, (err, response, body) => {
      if (err) reject(err)
      Fs.writeFile(`${__dirname}/tmp/${name}`, body, 'binary', (err) => {
        if (err) reject(err)
        resolve(name)
      }); 
    });
  })
}

const getBuffer = (name) => {
  return new Promise((resolve, reject) => {
    Fs.readFile(`${__dirname}/tmp/${name}`, (err, buffer) => {
      if(err) reject()
      resolve(buffer)
    });
  })
}

const triangulate = (buffer, name) => {
  return new Promise((resolve, reject) => {
    Triangulate(defaultOptions)
      .fromBuffer(buffer)
      .toBuffer()
      .then(imageBuffer => {
        Fs.writeFile(`${__dirname}/output/${name}`, imageBuffer, err => {
          if(err) reject(err)
          resolve()
        })
      })
      .catch(reject)
  })
}

export default async (req: Object, res: Object) => {
  const props = req.body;
  const options = Object.assign({}, defaultOptions, props.options);
  try {

    const name = await saveTemp(props.image)
    const buffer = await getBuffer(name)
    const data = await triangulate(buffer, name)
    // const image = await UploadImage({ image: new Buffer( response.buffer, 'utf-8' ).toString('base64') })
    Complete(req, res, 'hi');
    // Complete(req, res, image)
    
  } catch (err) {
    console.log(err)
    Failure(req, res, err);
  }
};
