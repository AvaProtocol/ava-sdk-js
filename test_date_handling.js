const { Client } = require('./packages/sdk-js/dist/index.js');

console.log('Testing Date object handling...');
const testDate = new Date("2014-04-07T13:58:10.104Z");
console.log('Original Date:', testDate);
console.log('ISO String:', testDate.toISOString());
console.log('Expected format: 2014-04-07T13:58:10.104Z');

const testObj = {
  simpleDate: testDate,
  nestedObj: {
    nestedDate: testDate
  },
  dateArray: [testDate, new Date("2023-01-01T00:00:00.000Z")]
};

console.log('\nTest object:', JSON.stringify(testObj, (key, value) => {
  if (value instanceof Date) {
    return value.toISOString();
  }
  return value;
}, 2));
