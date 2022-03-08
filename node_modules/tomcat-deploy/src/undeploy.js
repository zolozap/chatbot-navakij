import request from './request';

import { getOptionsFromConfig } from './urls';
import * as defaultTomcatConfig from './defaultConfig';

const undeploy = (userTomcatConfig) => {
  const tomcatConfig = { ...defaultTomcatConfig, ...userTomcatConfig };
  const options = getOptionsFromConfig('GET', `${tomcatConfig.undeployPath}?path=${tomcatConfig.path}`, tomcatConfig);
  return request(options).then(response => !!/^OK.*$/m.test(response));
};

export default undeploy;
