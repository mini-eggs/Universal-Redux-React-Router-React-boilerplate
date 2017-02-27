export default (req, res, props) => {
  res.json({ status: 0, complete: false, data: props });
};
