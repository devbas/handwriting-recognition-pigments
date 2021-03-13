// //process.env.NODE_ENV = 'development';

// import config from './env/development';

// config.someEnvAgnosticSetting = true;

// // export config
// export default config;

var environment = process.env.NODE_ENV || 'development';

console.log('node config env: ', process.env);

var config = require('./env/' + environment);

config.someEnvAgnosticSetting = true;

// export config
module.exports = config;