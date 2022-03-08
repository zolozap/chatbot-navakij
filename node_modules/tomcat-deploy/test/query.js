import nock from 'nock';

import { expect } from 'chai';
import { query } from '../src';

describe('query', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('returns true if Tomcat lists the path', () => {
    nock('http://localhost/')
      .get('/manager/text/list')
      .reply(200, `OK - Listed applications for virtual host localhost
/:running:0:ROOT
/manager:running:0:manager
/example:running:0:example
`);

    return query({
      login: 'user',
      password: 'pass',
      hostname: 'localhost',
      path: '/example',
    }).then((running) => {
      expect(running).to.equal(true);
    });
  });

  it('returns false if tomcat does not list the path', () => {
    nock('http://localhost/')
      .get('/manager/text/list')
      .reply(200, `OK - Listed applications for virtual host localhost
/:running:0:ROOT
/manager:running:0:manager
`);

    return query({
      login: 'user',
      password: 'pass',
      hostname: 'localhost',
      path: '/example',
    }).then((running) => {
      expect(running).to.equal(false);
    });
  });
});
