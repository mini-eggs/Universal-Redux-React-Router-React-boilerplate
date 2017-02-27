// @flow

import Triangulate from 'triangulate-image';

import { Complete, Failure, Request, UploadImage } from '../../../shared/';

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

// curl -H "Content-Type: application/json" -X POST -d '{ "image": "https://www.celpip.ca/wp-content/uploads/2015/05/home_madeincanada5-1.png" }' http://localhost:8080/triangly/triangulate

export default async (req: Object, res: Object) => {
  const props = req.body;
  const options = Object.assign({}, defaultOptions, props.options);
  try {
    const response = await Request({ url: props.image });
    const data = await Triangulate(options)
      .fromBuffer(response.buffer)
      .toBuffer();
    // const image = await UploadImage({ image: new Buffer( response.buffer, 'utf-8' ).toString('base64') })
    Complete(req, res, 'hi');
    // Complete(req, res, image)
  } catch (err) {
    Failure(req, res, err);
  }
};
