const FtpDeploy = require('ftp-deploy');
const ftpDeploy = new FtpDeploy();

/**
 * CAUTION!
 *
 * For security reasons DO NOT commit secrets to your repository
 *
 * Please take a look at ftp-deploy-example.config.json
 */
const ftpConfig = require('./ftp-deploy.config.json');

const config = {
  ...ftpConfig,
  localRoot: `${__dirname}/out`,
  remoteRoot: '/',
  include: ['*', '**/*', '.*', '**/.*'],
  deleteRemote: true,
  forcePasv: true
};
console.log(config);

ftpDeploy
  .deploy(config)
  .then(res => console.log('finished:', res))
  .catch(err => console.log(err));
