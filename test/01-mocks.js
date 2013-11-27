angular.module("mocks", [])
  .service("mockD3Csv", function () {
    return function (responses) {
      return jasmine.createSpy().andCallFake(function (url, row, cb) {
        cb({}, responses[url]);
      });
    };
  })