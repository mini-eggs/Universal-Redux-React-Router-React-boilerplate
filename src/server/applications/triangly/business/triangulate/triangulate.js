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

const triangulate = (buffer, options) => {
  return new Promise((resolve, reject) => {
    Triangulate(options)
      .fromBuffer(buffer)
      .toBuffer()
      .then(imageBuffer => {
        resolve(imageBuffer)
      })
      .catch(reject);
  });
};

export default (socket) => {
  socket.on('triangly/triangulate/create', async (props) => {
    const { image } = props
    const options = Object.assign({}, defaultOptions, props.options);
    try {
      const outputBuffer = await triangulate(Buffer.from(image, 'base64'), options);
      const imageURL = await UploadImage(outputBuffer.toString('base64'));
      socket.emit('triangly/triangulate/complete', { image: imageURL });
    }
    catch (err) {
      // lets use default settings
      // if there is an error
      try {
        const fixedOptions = Object.assign({}, options, { blur: defaultOptions.blur });
        const buf = await triangulate(Buffer.from(image, 'base64'), fixedOptions);
        const imgUrl = await UploadImage(buf.toString('base64'));
        socket.emit('triangly/triangulate/complete', { image: imgUrl });
      } catch (anotherErr) {
        socket.emit('triangly/triangulate/failure', { error: anotherErr });
      }
    }
  });
  
};
