import TrianglySockets from './sockets';
export { TrianglySockets };

export default (app: Object, parser: Object) => {

  app.all('/triangly', (req, res) => {
    res.json({ message: 'welcome to triangly server' });
  });
  
};
