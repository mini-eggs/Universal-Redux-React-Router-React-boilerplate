// @flow

// curl -H "Content-Type: application/json" -X POST -d '{ "image": "https://www.celpip.ca/wp-content/uploads/2015/05/home_madeincanada5-1.png" }' http://localhost:8000/triangly/triangulate

// curl -H "Content-Type: application/json" -X POST -d '{ "image": "https://www.celpip.ca/wp-content/uploads/2015/05/home_madeincanada5-1.png" }' https://restroomrate.herokuapp.com/triangly/triangulate


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

const saveTemp = url => {
  return new Promise((resolve, reject) => {
    const parts = url.split('.');
    const name = new Date().getTime() + '.' + parts[parts.length - 1];
    Request.get({ url: url, encoding: 'binary' }, (err, response, body) => {
      if (err) reject(err);
      Fs.writeFile(`${__dirname}/tmp/${name}`, body, 'binary', err => {
        if (err) reject(err);
        resolve(name);
      });
    });
  });
};

const getBuffer = name => {
  return new Promise((resolve, reject) => {
    Fs.readFile(`${__dirname}/tmp/${name}`, (err, buffer) => {
      if (err) reject();
      resolve(buffer);
    });
  });
};

const triangulate = (buffer, name, options) => {
  return new Promise((resolve, reject) => {
    Triangulate(options)
      .fromBuffer(buffer)
      .toBuffer()
      .then(imageBuffer => {
        Fs.writeFile(`${__dirname}/output/${name}`, imageBuffer, err => {
          if (err) reject(err);
          resolve(imageBuffer);
        });
      })
      .catch(reject);
  });
};

const deleteSingle = name => {
  return new Promise((resolve, reject) => {
    Fs.unlink(name, err => {
      if (err) reject(err);
      resolve();
    });
  });
};

const deleteFiles = name => {
  return new Promise(async (resolve, reject) => {
    try {
      resolve(
        await Promise.all([
          deleteSingle(`${__dirname}/tmp/${name}`),
          deleteSingle(`${__dirname}/output/${name}`)
        ])
      );
    } catch (err) {
      // ignore file deletion error
    }
  });
};

export default async (req: Object, res: Object) => {
  const props = req.body;
  const options = Object.assign({}, defaultOptions, props.options);
  try {
    const fileName = await saveTemp(props.image);
    const inputBuffer = await getBuffer(fileName);
    const outputBuffer = await triangulate(inputBuffer, fileName, options);
    const imageURL = await UploadImage(outputBuffer.toString('base64'));
    deleteFiles(fileName);
    Complete(req, res, imageURL);
  } catch (err) {
    Failure(req, res, err);
  }
};
