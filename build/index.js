'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _serverRender = require('../build/serverRender');

var _serverRender2 = _interopRequireDefault(_serverRender);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

app.use('/assets', _express2.default.static('build/assets'));
app.get('*', _serverRender2.default);

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
