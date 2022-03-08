import nock from 'nock';

import { expect } from 'chai';
import { resolve } from 'path';

import { deploy } from '../src';

describe('deploy', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('generates put request to deploy the file', () => {
    const file = resolve(__dirname, 'data/example.war');
    nock('http://localhost/')
      .put('/manager/text/deploy')
      .query({ path: '/example' })
      .reply(200, 'OK - Deployed application at context path /example');

    return deploy(file, {
      login: 'user',
      password: 'pass',
      hostname: 'localhost',
      path: '/example',
    }).then((deployed) => {
      expect(deployed).to.equal(true);
    });
  });
});
