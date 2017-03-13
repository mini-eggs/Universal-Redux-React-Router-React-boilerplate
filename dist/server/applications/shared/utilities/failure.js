"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (req, res, props) {
  res.json({ status: 0, complete: false, data: props });
};