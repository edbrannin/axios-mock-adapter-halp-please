import { serial as test } from 'ava';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { getEmail } from '../get-email';

const mock = new MockAdapter(axios);

test.afterEach.always(() => {
  mock.reset();
});

test.after.always(() => {
  mock.restore();
});

const mockUserRecord = {
  email: 'email@example.com',
  id: 'ID',
  lastName: null,
  loginName: null,
  role: 'LEARNER',
};

const API_URL = 'https://my-little-api.com';
const ORG_ID = '12345';
const USER_ID = '54321';

const EXPECTED_URL =  `${API_URL}/org/${ORG_ID}/user/${USER_ID}`;

test('Should mock the API call (minimal)', async (t) => {
  t.log(`MOCK URL: ${EXPECTED_URL}`);
  mock.onGet(EXPECTED_URL).reply(200, mockUserRecord);
  t.is(await getEmail(ORG_ID, USER_ID), mockUserRecord.email);
});

test('Should mock the API call (wide-net)', async (t) => {
  const m = (url, status = 200) => {
    if (t) {
      t.log(`MOCK URL: ${url}`);
    }
    mock.onGet(url).reply(status, mockUserRecord);
  };

  // Try mocking a bunch of variants of the desired URL, hope one sticks
  m(`/org/${ORG_ID}/user/${USER_ID}`);
  m(`/org/${ORG_ID}/user/${USER_ID}/`);
  m(EXPECTED_URL);
  m(`${EXPECTED_URL}/`);
  m(/\/org\/[^/]*\/user\/[^/]*/);
  m(/org\/[^/]*\/user\/[^/]*/);
  m(/\/org\/[^/]*\/user\/[^/]*\//);
  m(/org\/[^/]*\/user\/[^/]*\//);
  m(/https:\/\/.*\/org\/[^/]*\/user\/[^/]*\//);

  t.is(await getEmail(ORG_ID, USER_ID), mockUserRecord.email);
});

test('Should mock ALL get calls', async (t) => {
  mock.onGet().reply(200, mockUserRecord);
  t.is(await getEmail(ORG_ID, USER_ID), mockUserRecord.email);
});

test('Should dispatch from ALL get calls', async (t) => {
  mock.onGet().reply((conf) => {
    if (conf.url.url === EXPECTED_URL) {
      return [200, mockUserRecord];
    }
    t.log('NO MATCH')
    t.log(conf)
    return [418, {}];
  });
  t.is(await getEmail(ORG_ID, USER_ID), mockUserRecord.email);
});
