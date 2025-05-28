const { Client } = require('./packages/sdk-js/dist');

const client = new Client({
  endpoint: 'http://localhost:8080',
  factoryAddress: '0x1234567890123456789012345678901234567890'
});

async function testCustomCodeWithInputs() {
  try {
    const result = await client.runNodeWithInputs({
      nodeType: 'customCode',
      nodeConfig: {
        source: 'console.log("Input variables:", myVar); return { message: "Hello", input: myVar };',
      },
      inputVariables: {
        myVar: "World",
      },
    });
    
    console.log('CustomCode result:', result);
    return result;
  } catch (error) {
    console.error('Error testing customCode:', error);
    return { success: false, error: error.message };
  }
}

async function testBlockTriggerWithInputs() {
  try {
    const result = await client.runNodeWithInputs({
      nodeType: 'blockTrigger',
      nodeConfig: {},
      inputVariables: {
        interval: 12345,
      },
    });
    
    console.log('BlockTrigger result:', result);
    return result;
  } catch (error) {
    console.error('Error testing blockTrigger:', error);
    return { success: false, error: error.message };
  }
}

async function testRestApiWithEmptyInputs() {
  try {
    const result = await client.runNodeWithInputs({
      nodeType: 'restApi',
      nodeConfig: {
        url: 'https://httpbin.org/get',
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
      inputVariables: {},
    });
    
    console.log('RestApi result:', result);
    return result;
  } catch (error) {
    console.error('Error testing restApi:', error);
    return { success: false, error: error.message };
  }
}

async function runTests() {
  console.log('Testing customCode with input variables...');
  await testCustomCodeWithInputs();
  
  console.log('\nTesting blockTrigger with input variables (should fail)...');
  await testBlockTriggerWithInputs();
  
  console.log('\nTesting restApi with empty input variables...');
  await testRestApiWithEmptyInputs();
}

console.log('Test script created. This is for demonstration purposes only.');
console.log('The actual tests would be run in the CI environment with proper authentication.');
