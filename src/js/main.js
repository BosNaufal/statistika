
import React from 'react';
import ReactDOM from 'react-dom';

import { Router, hashHistory } from 'react-router';
import routes from './router/map.js';

let hotUpdateCount = 0
const render = () => {
  ReactDOM.render(
    <Router key={hotUpdateCount} history={hashHistory} routes={routes} />,
    document.getElementById("app")
  )
}

render()

if (module.hot) {
  // module.hot.accept('./router/map.js', (newMapUrl) => {
  //   hotUpdateCount++
  //   render()
  // })
}
