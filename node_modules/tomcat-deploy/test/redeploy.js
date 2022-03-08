import nock from 'nock';

import { expect } from 'chai';
import { resolve } from 'path';

import { redeploy } from '../src';

describe('redeploy', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('generates undeploy and deploy request when the application is already running', () => {
    nock('http://localhost/')
      .get('/manager/text/list')
      .reply(200, `OK - Listed applications for virtual host localhost
/:running:0:ROOT
/manager:running:0:manager
/example:running:0:example
`)
      .get('/manager/text/undeploy')
      .query({ path: '/example' })
      .reply(200, 'OK - Undeployed application at context path /examples')
      .put('/manager/text/deploy')
      .query({ path: '/example' })
      .reply(200, 'OK - Deployed application at context path /examples');

    const file = resolve(__dirname, 'data/example.war');
    return redeploy(file, {
      login: 'user',
      password: 'pass',
      hostname: 'localhost',
      path: '/example',
    }).then((response) => {
      expect(response).to.equal(true);
    });
  });
});
