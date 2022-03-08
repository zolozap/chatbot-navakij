import nock from 'nock';

import { expect } from 'chai';
import { undeploy } from '../src';

describe('undeploy', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('generates request to undeploy the application', () => {
    nock('http://localhost/')
      .get('/manager/text/undeploy')
      .query({ path: '/example' })
      .reply(200, 'OK - Undeployed application at context path /examples');

    return undeploy({
      login: 'user',
      password: 'pass',
      hostname: 'localhost',
      path: '/example',
    }).then((response) => {
      expect(response).to.equal(true);
    });
  });
});
