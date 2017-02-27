export default (req, res, props) => {
  res.json({ status: 1, complete: true, data: props });
};
