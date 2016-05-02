import express from 'express';
import serverRender from '../build/serverRender';

const app = express();

app.use('/assets', express.static('build/assets'));
app.get('*', serverRender);

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
