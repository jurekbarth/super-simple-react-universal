import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import { routes } from './routes';

const renderPage = (markup) => {
  return `
  <!doctype html>
    <html lang="en">
    <head>
      <title>Simple Universal"</title>
    </head>
    <body>
      <div id="app">${markup}</div>
      <script type="text/javascript" charset="utf-8" src="/assets/clientRender.js"></script>
    </body>
  </html>
  `;
}


export default (req, res) => {
  // routes is our object of React routes defined above
  match({ routes, location: req.url }, (err, redirectLocation, props) => {
    if (err) {
      // something went badly wrong, so 500 with a message
      res.status(500).send(err.message);
    } else if (redirectLocation) {
      // we matched a ReactRouter redirect, so redirect from the server
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (props) {
      // if we got props, that means we found a valid component to render
      // for the given route
      const markup = renderToString(<RouterContext {...props} />);

      res.send(renderPage(markup))

    } else {
      // no route match, so 404. In a real app you might render a custom
      // 404 view here
      res.sendStatus(404);
    }
  });
};
