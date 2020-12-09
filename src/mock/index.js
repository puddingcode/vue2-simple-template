const Mock = require('mockjs');
const { param2Obj } = require('./utils');

const user = require('./user');
const table = require('./table');

const mocks = {
  ...user,
  ...table,
};

function mockXHR() {
  Mock.XHR.prototype.proxy_send = Mock.XHR.prototype.send;
  Mock.XHR.prototype.send = function() {
    if (this.custom.xhr) {
      this.custom.xhr.withCredentials = this.withCredentials || false;

      if (this.responseType) {
        this.custom.xhr.responseType = this.responseType;
      }
    }
    this.proxy_send(...arguments);
  };

  function XHR2ExpressRedWrap(respond) {
    return function(options) {
      let result = null;
      if (respond instanceof Function) {
        const { body, type, url } = options;
        result = respond({
          method: type,
          body: JSON.parse(body),
          query: param2Obj(url),
        });
      } else {
        result = respond;
      }
      return Mock.mock(result);
    };
  }

  for (const i of mocks) {
    Mock.mock(
      new RegExp(i.url, i.type || 'get', XHR2ExpressRedWrap(i.response))
    );
  }
}

module.exports = {
  mocks,
  mockXHR,
};
