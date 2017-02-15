require('babel-core/register');
let fs = require('fs');
if (fs.existsSync('./process.env.js')) {
    require('./process.env.js');
}
require('./server');
