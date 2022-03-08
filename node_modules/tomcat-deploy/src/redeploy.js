import deploy from './deploy';
import query from './query';
import undeploy from './undeploy';

import * as defaultTomcatConfig from './defaultConfig';

const redeploy = (warFile, userTomcatConfig) => {
  const tomcatConfig = { ...defaultTomcatConfig, ...userTomcatConfig };

  return query(tomcatConfig)
    .then((deployed) => {
      if (deployed) {
        return undeploy(tomcatConfig);
      }
      return Promise.resolve();
    })
    .then(() => deploy(warFile, tomcatConfig));
};

export default redeploy;
