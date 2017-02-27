import Fs from 'fs';
import Path from 'path';
import { Complete, Failure, MinifyHTML } from '../../shared/';
import HTML from './html'

export default (req, res) => {
  res.send(MinifyHTML(HTML));
};
