const data = require('./data');

test('getRequest to return HTTP status of 200',() =>{
    expect(data()).toBe(200);
});