import { createReadStream } from 'fs';
import { request } from 'http';

import { getOptionsFromConfig } from './urls';
import * as defaultTomcatConfig from './defaultConfig';

const deploy = (warFile, userTomcatConfig) => {
  const tomcatConfig = { ...defaultTomcatConfig, ...userTomcatConfig };
  const options = getOptionsFromConfig('PUT', `${tomcatConfig.deployPath}?path=${tomcatConfig.path}`, tomcatConfig);

  return new Promise((resolve, reject) => {
    let responseData = '';

    const req = request(options, (res) => {
      res.setEncoding('utf8');
      res.on('data', (chunk) => { responseData += chunk; });
      res.on('end', () => {
        if (/^OK.*$/m.test(responseData)) {
          resolve(true);
        } else {
          reject(new Error(responseData));
        }
      });
    });

    req.on('error', error => reject(new Error(`${error.message.substr(0, 511)}...`)));

    const warStream = createReadStream(warFile);

    warStream.on('data', data => req.write(data));
    warStream.on('error', error => reject(error));
    warStream.on('end', () => req.end());
  });
};

export default deploy;
