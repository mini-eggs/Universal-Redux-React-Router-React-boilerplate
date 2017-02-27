// @flow

import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import { Provider } from 'react-redux';
import Template from './base/base';
import { routes } from '../shared/routes/routes';
import configureStore from '../shared/store/store';
import InitialStoreData from './data/initialStoreData';
import { setInitialStoreData } from '../shared/actions/actions';
import { MinifyHTML } from './applications/shared/';

const getTemplate = (html, state) => {
  const withState = Template.replace(
    '{{STATE}}',
    JSON.stringify(state).replace(/</g, '\\x3c')
  );
  const withoutHtml = MinifyHTML(withState);
  return withoutHtml.replace('{{HTML}}', html);
};

const getMarkup = (req, res, store) => {
  return new Promise((resolve, reject) => {
    match({ routes, location: req.url }, (err, redirect, props) => {
      if (err) {
        reject();
      } else if (redirect) {
        res.redirect(302, redirect.pathname + redirect.search);
      } else if (props) {
        resolve(
          renderToString(
            <Provider store={store}>
              <RouterContext {...props} />
            </Provider>
          )
        );
      } else {
        reject();
      }
    });
  });
};

const errorHandler = (req, res, err) => {
  console.log(err);
  res.send('Error');
};

export default (app: Object) => {
  app.get('*', async (req, res) => {
    try {
      const store = configureStore({});
      const data = await InitialStoreData();
      setInitialStoreData(store, data);
      const html = await getMarkup(req, res, store);
      const finalState = store.getState();
      res.setHeader('Vary', 'Accept-Encoding');
      res.send(getTemplate(html, finalState));
    } catch (err) {
      errorHandler(req, res, err);
    }
  });
};
