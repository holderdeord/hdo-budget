import Budget from '../../src/js/models/Budget';

describe('Model: Budget', function () {
  var budget;

  beforeEach(function () {
    budget = new Budget('test');
  });

  it('should set up basic', function () {
    expect(budget.name).toEqual('test');
  });
});