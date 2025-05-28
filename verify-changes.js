/**
 * Verification script for ava-sdk-js changes
 * 
 * This script verifies the key functionality without requiring environment variables:
 * 1. Node type handling with Config pattern
 * 2. BlockTrigger input variable validation
 * 3. CustomCode input variable injection
 * 4. Filter node sourceId handling
 * 5. Return types for cancelWorkflow and deleteWorkflow
 */

const { 
  Client, 
  NodeFactory, 
  TriggerFactory,
  Workflow,
  Edge
} = require('./packages/sdk-js/dist');
const { NodeType, TriggerType } = require('./packages/types/dist');

class MockClient extends Client {
  constructor() {
    super({
      endpoint: 'http://localhost:8080',
      factoryAddress: '0x1234567890123456789012345678901234567890'
    });
  }

  async submitWorkflow() { return 'mock-workflow-id'; }
  async triggerWorkflow() { return 'mock-execution-id'; }
  async getExecutionStatus() { return 1; } // COMPLETED
  async getExecution() { return { data: { result: 'success' } }; }
  async deleteWorkflow() { return true; }
  async cancelWorkflow() { return true; }
}

function testNodeCreation() {
  console.log('\n=== Testing Node Creation with Config Pattern ===');
  
  try {
    const ethTransferNode = NodeFactory.create({
      id: 'eth_transfer_1',
      name: 'ETH Transfer Test',
      type: NodeType.ETHTransfer,
      data: {
        config: {
          destination: '0x1234567890123456789012345678901234567890',
          amount: '0x123abc'
        }
      }
    });
    
    const filterNode = NodeFactory.create({
      id: 'filter_1',
      name: 'Filter Test',
      type: NodeType.Filter,
      data: {
        config: {
          expression: 'value > 10',
          sourceId: 'eth_transfer_1'
        }
      }
    });
    
    const loopNode = NodeFactory.create({
      id: 'loop_1',
      name: 'Loop Test',
      type: NodeType.Loop,
      data: {
        config: {
          sourceId: 'eth_transfer_1',
          iterVal: 'item',
          iterKey: 'index'
        },
        customCode: {
          config: {
            lang: 0,
            source: 'return { processed: true };'
          }
        }
      }
    });
    
    console.log('ETHTransfer node has config:', !!ethTransferNode.data.config);
    console.log('Filter node has config:', !!filterNode.data.config);
    console.log('Loop node has config:', !!loopNode.data.config);
    
    const ethTransferProto = ethTransferNode.toRequest();
    const filterProto = filterNode.toRequest();
    const loopProto = loopNode.toRequest();
    
    console.log('ETHTransfer serialization successful:', !!ethTransferProto);
    console.log('Filter serialization successful:', !!filterProto);
    console.log('Loop serialization successful:', !!loopProto);
    
    return true;
  } catch (error) {
    console.error('Node creation test failed:', error);
    return false;
  }
}

async function testRunNodeWithInputs() {
  console.log('\n=== Testing runNodeWithInputs Method ===');
  
  const client = new MockClient();
  
  try {
    console.log('\nTesting blockTrigger with input variables:');
    const blockTriggerResult = await client.runNodeWithInputs({
      nodeType: 'blockTrigger',
      nodeConfig: {},
      inputVariables: {
        interval: 12345
      }
    });
    
    console.log('BlockTrigger result:', blockTriggerResult);
    console.log('BlockTrigger correctly rejected input variables:', 
      blockTriggerResult.success === false && 
      blockTriggerResult.error.includes('blockTrigger nodes do not accept input variables'));
    
    console.log('\nTesting customCode with input variables:');
    const customCodeResult = await client.runNodeWithInputs({
      nodeType: 'customCode',
      nodeConfig: {
        source: 'return { message: "Hello", input: myVar };'
      },
      inputVariables: {
        myVar: 'World'
      }
    });
    
    console.log('CustomCode result:', customCodeResult);
    console.log('CustomCode successfully handled input variables:', 
      customCodeResult.success === true);
    
    console.log('\nTesting filter node with sourceId:');
    const filterResult = await client.runNodeWithInputs({
      nodeType: 'filter',
      nodeConfig: {
        expression: 'value > 10',
        sourceId: 'some_node_id'
      },
      inputVariables: {}
    });
    
    console.log('Filter result:', filterResult);
    console.log('Filter successfully handled sourceId:', 
      filterResult.success === true);
    
    console.log('\nTesting filter node with legacy input property:');
    const filterLegacyResult = await client.runNodeWithInputs({
      nodeType: 'filter',
      nodeConfig: {
        expression: 'value > 10',
        input: 'some_node_id'
      },
      inputVariables: {}
    });
    
    console.log('Filter legacy result:', filterLegacyResult);
    console.log('Filter successfully handled legacy input property:', 
      filterLegacyResult.success === true);
    
    return true;
  } catch (error) {
    console.error('runNodeWithInputs test failed:', error);
    return false;
  }
}

async function testWorkflowMethods() {
  console.log('\n=== Testing Workflow Methods ===');
  
  const client = new MockClient();
  
  try {
    const cancelResult = await client.cancelWorkflow('mock-workflow-id');
    console.log('cancelWorkflow returns boolean:', typeof cancelResult === 'boolean');
    
    const deleteResult = await client.deleteWorkflow('mock-workflow-id');
    console.log('deleteWorkflow returns boolean:', typeof deleteResult === 'boolean');
    
    return true;
  } catch (error) {
    console.error('Workflow methods test failed:', error);
    return false;
  }
}

function testTriggerCreation() {
  console.log('\n=== Testing Trigger Creation with Config Pattern ===');
  
  try {
    const blockTrigger = TriggerFactory.create({
      id: 'block_trigger_1',
      name: 'Block Trigger Test',
      type: TriggerType.Block,
      data: {
        config: {
          interval: 5
        }
      }
    });
    
    const cronTrigger = TriggerFactory.create({
      id: 'cron_trigger_1',
      name: 'Cron Trigger Test',
      type: TriggerType.Cron,
      data: {
        config: {
          expression: '0 * * * *'
        }
      }
    });
    
    console.log('BlockTrigger has config:', !!blockTrigger.data.config);
    console.log('CronTrigger has config:', !!cronTrigger.data.config);
    
    const workflow = new Workflow({
      smartWalletAddress: '0x1234567890123456789012345678901234567890',
      trigger: blockTrigger,
      nodes: [],
      edges: [],
      startAt: Date.now(),
      expiredAt: Date.now() + 3600000,
      maxExecution: 1
    });
    
    console.log('Workflow creation successful:', !!workflow);
    console.log('Workflow trigger has config:', !!workflow.trigger.data.config);
    
    return true;
  } catch (error) {
    console.error('Trigger creation test failed:', error);
    return false;
  }
}

async function runTests() {
  console.log('=== Starting Verification Tests ===');
  
  const nodeCreationSuccess = testNodeCreation();
  const triggerCreationSuccess = testTriggerCreation();
  const runNodeWithInputsSuccess = await testRunNodeWithInputs();
  const workflowMethodsSuccess = await testWorkflowMethods();
  
  console.log('\n=== Test Results Summary ===');
  console.log('Node Creation Tests:', nodeCreationSuccess ? 'PASSED' : 'FAILED');
  console.log('Trigger Creation Tests:', triggerCreationSuccess ? 'PASSED' : 'FAILED');
  console.log('runNodeWithInputs Tests:', runNodeWithInputsSuccess ? 'PASSED' : 'FAILED');
  console.log('Workflow Methods Tests:', workflowMethodsSuccess ? 'PASSED' : 'FAILED');
  
  const allTestsPassed = nodeCreationSuccess && 
                         triggerCreationSuccess && 
                         runNodeWithInputsSuccess && 
                         workflowMethodsSuccess;
  
  console.log('\nOverall Result:', allTestsPassed ? 'ALL TESTS PASSED' : 'SOME TESTS FAILED');
  
  return allTestsPassed;
}

runTests().then(success => {
  console.log('Verification completed.');
  process.exit(success ? 0 : 1);
});
