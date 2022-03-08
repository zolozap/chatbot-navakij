import request from './request';

import { getOptionsFromConfig } from './urls';
import * as defaultTomcatConfig from './defaultConfig';

const query = (userTomcatConfig) => {
  const tomcatConfig = { ...defaultTomcatConfig, ...userTomcatConfig };
  const options = getOptionsFromConfig('GET', tomcatConfig.listPath, tomcatConfig);

  return request(options)
    .then(response =>
      response
        .split('\n')
        .some(row => row.split(':')[0] === tomcatConfig.path)
    );
};

export default query;
