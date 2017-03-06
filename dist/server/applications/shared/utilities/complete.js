"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (req, res, props) {
  res.json({ status: 1, complete: true, data: props });
};