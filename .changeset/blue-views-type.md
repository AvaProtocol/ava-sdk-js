---
"@avaprotocol/sdk-js": patch
"@avaprotocol/types": patch
---

Added new fields to the Execution and Execution.Step protobuf messages for gas usage: gas_used, gas_price, and total_gas_cost; Introduced a new input_variables map field to the Task and CreateTaskReq protobuf messages, and updated the generated JavaScript code to handle serialization, deserialization, and access to these variables.
