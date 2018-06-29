Trouble using axios-mock-adapter: This is probably my fault, but how?

I'm not having any trouble mocking ANY request, so technically I *could*
use a catch-all and do dispatch from there, but I shouldn't *have* to. :)

Any mock I've written that specifies a URL to watch for has not matched the requested URL.

Sample TAP output:

`npx ava --tap test/*`

(or just `npm test` for the fancy view)

```
TAP version 13
# Should mock the API call (minimal)
not ok 1 - Should mock the API call (minimal)
  * MOCK URL: https://my-little-api.com/org/12345/user/54321
  ---
    name: AssertionError
    message: Rejected promise returned by test
    values:
      'Rejected promise returned by test. Reason:': |-
        Error {
          config: {
            data: undefined,
            headers: {
              Accept: 'application/json, text/plain, */*',
            },
            maxContentLength: -1,
            method: 'get',
            timeout: 0,
            transformRequest: {
              0: Function transformRequest {},
            },
            transformResponse: {
              0: Function transformResponse {},
            },
            url: {
              url: 'https://my-little-api.com/org/12345/user/54321',
            },
            validateStatus: Function validateStatus {},
            xsrfCookieName: 'XSRF-TOKEN',
            xsrfHeaderName: 'X-XSRF-TOKEN',
          },
          response: {
            config: {
              data: undefined,
              headers: Object { … },
              maxContentLength: -1,
              method: 'get',
              timeout: 0,
              transformRequest: Object { … },
              transformResponse: Object { … },
              url: Object { … },
              validateStatus: Function validateStatus {},
              xsrfCookieName: 'XSRF-TOKEN',
              xsrfHeaderName: 'X-XSRF-TOKEN',
            },
            data: undefined,
            status: 404,
          },
          message: 'Request failed with status code 404',
        }
    at: 'createErrorResponse (node_modules/axios-mock-adapter/src/utils.js:117:15)'
  ...
# Should mock the API call (wide-net)
not ok 2 - Should mock the API call (wide-net)
  * MOCK URL: /org/12345/user/54321
  * MOCK URL: /org/12345/user/54321/
  * MOCK URL: https://my-little-api.com/org/12345/user/54321
  * MOCK URL: https://my-little-api.com/org/12345/user/54321/
  * MOCK URL: /\/org\/[^\/]*\/user\/[^\/]*/
  * MOCK URL: /org\/[^\/]*\/user\/[^\/]*/
  * MOCK URL: /\/org\/[^\/]*\/user\/[^\/]*\//
  * MOCK URL: /org\/[^\/]*\/user\/[^\/]*\//
  * MOCK URL: /https:\/\/.*\/org\/[^\/]*\/user\/[^\/]*\//
  ---
    name: AssertionError
    message: Rejected promise returned by test
    values:
      'Rejected promise returned by test. Reason:': |-
        Error {
          config: {
            data: undefined,
            headers: {
              Accept: 'application/json, text/plain, */*',
            },
            maxContentLength: -1,
            method: 'get',
            timeout: 0,
            transformRequest: {
              0: Function transformRequest {},
            },
            transformResponse: {
              0: Function transformResponse {},
            },
            url: {
              url: 'https://my-little-api.com/org/12345/user/54321',
            },
            validateStatus: Function validateStatus {},
            xsrfCookieName: 'XSRF-TOKEN',
            xsrfHeaderName: 'X-XSRF-TOKEN',
          },
          response: {
            config: {
              data: undefined,
              headers: Object { … },
              maxContentLength: -1,
              method: 'get',
              timeout: 0,
              transformRequest: Object { … },
              transformResponse: Object { … },
              url: Object { … },
              validateStatus: Function validateStatus {},
              xsrfCookieName: 'XSRF-TOKEN',
              xsrfHeaderName: 'X-XSRF-TOKEN',
            },
            data: undefined,
            status: 404,
          },
          message: 'Request failed with status code 404',
        }
    at: 'createErrorResponse (node_modules/axios-mock-adapter/src/utils.js:117:15)'
  ...
# Should mock ALL get calls
ok 3 - Should mock ALL get calls
# Should dispatch from ALL get calls
ok 4 - Should dispatch from ALL get calls

1..4
# tests 4
# pass 2
# fail 2
```
