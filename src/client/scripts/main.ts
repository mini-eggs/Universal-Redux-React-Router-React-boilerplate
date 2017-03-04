import * as React from 'react';
import { render } from 'react-dom';
import { Router } from 'react-router';
import { Provider } from 'react-redux';
import configureStore from '../../shared/store/store';
import Routes from '../../shared/routes/routes';

// const app = () => {
//   return (
//     <Provider store={configureStore(window.__PRELOADED_STATE__)}>
//       <Routes />
//     </Provider>
//   )
// }

// render( app, document.getElementById('root') );
