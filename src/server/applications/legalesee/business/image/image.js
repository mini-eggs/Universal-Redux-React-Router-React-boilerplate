// @flow

import Tesseract from 'tesseract.js';
import request from 'request';

export default (socket: Object) => {
  socket.on('readImage', props => {
    const data = { url: props.image, encoding: null };
    request(data, (err, response, buffer) => {
      if (err) {
        socket.emit('imageError', err);
      } else {
        const tess = Tesseract.recognize(new Buffer(buffer));
        tess.progress(progress => {
          if (progress.status === 'recognizing text') {
            socket.emit('imageProgress', progress);
          }
        });
        tess.then(result => {
          socket.emit('imageComplete', result.text);
        });
        tess.catch(err => {
          socket.emit('imageError', err);
        });
      }
    });
  });
};
