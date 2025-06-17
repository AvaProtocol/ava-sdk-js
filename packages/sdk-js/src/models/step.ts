import * as avs_pb from "@/grpc_codegen/avs_pb";
import { Value as ProtobufValue } from "google-protobuf/google/protobuf/struct_pb";
import {
  convertProtobufValueToJs,
  convertProtobufStepTypeToSdk,
} from "../utils";
import { StepProps, OutputDataProps } from "@avaprotocol/types";

class Step implements StepProps {
  id: string;
  type: string;
  name: string;
  success: boolean;
  error: string;
  log: string;
  inputsList: string[];
  input?: any;
  output: OutputDataProps;
  startAt: number;
  endAt: number;

  constructor(props: StepProps) {
    this.id = props.id;
    this.type = props.type;
    this.name = props.name;
    this.success = props.success;
    this.error = props.error;
    this.log = props.log;
    this.inputsList = props.inputsList;
    this.input = props.input;
    this.output = props.output;
    this.startAt = props.startAt;
    this.endAt = props.endAt;
  }

  /**
   * Convert Step instance to plain object (StepProps)
   * This is useful for serialization, especially with Next.js Server Components
   */
  toJson(): StepProps {
    return {
      id: this.id,
      type: this.type,
      name: this.name,
      success: this.success,
      error: this.error,
      log: this.log,
      inputsList: this.inputsList,
      input: this.input,
      output: this.output,
      startAt: this.startAt,
      endAt: this.endAt,
    };
  }

  static getOutput(step: avs_pb.Execution.Step): OutputDataProps {
    const outputDataType = step.getOutputDataCase();
    let nodeOutputMessage;

    switch (outputDataType) {
      case avs_pb.Execution.Step.OutputDataCase.OUTPUT_DATA_NOT_SET:
        return undefined;

      // Trigger outputs
      case avs_pb.Execution.Step.OutputDataCase.BLOCK_TRIGGER:
        const blockOutput = step.getBlockTrigger()?.toObject();
        return blockOutput
          ? { blockNumber: blockOutput.blockNumber }
          : undefined;
      case avs_pb.Execution.Step.OutputDataCase.FIXED_TIME_TRIGGER:
        const fixedTimeOutput = step.getFixedTimeTrigger()?.toObject();
        return fixedTimeOutput
          ? {
              timestamp: fixedTimeOutput.timestamp,
              timestampIso: fixedTimeOutput.timestampIso,
            }
          : undefined;
      case avs_pb.Execution.Step.OutputDataCase.CRON_TRIGGER:
        const cronOutput = step.getCronTrigger()?.toObject();
        return cronOutput
          ? {
              timestamp: cronOutput.timestamp,
              timestampIso: cronOutput.timestampIso,
            }
          : undefined;
      case avs_pb.Execution.Step.OutputDataCase.EVENT_TRIGGER:
        const eventTrigger = step.getEventTrigger();
        if (eventTrigger) {
          if (eventTrigger.hasEvmLog()) {
            return eventTrigger.getEvmLog()?.toObject();
          } else if (eventTrigger.hasTransferLog()) {
            return eventTrigger.getTransferLog()?.toObject();
          }
        }
        return undefined;
      case avs_pb.Execution.Step.OutputDataCase.MANUAL_TRIGGER:
        const manualOutput = step.getManualTrigger()?.toObject();
        return manualOutput || undefined;

      // Node outputs
      case avs_pb.Execution.Step.OutputDataCase.ETH_TRANSFER:
        const ethTransferOutput = step.getEthTransfer()?.toObject();
        return ethTransferOutput
          ? {
              transactionHash: ethTransferOutput.transactionHash,
            }
          : undefined;
      case avs_pb.Execution.Step.OutputDataCase.GRAPHQL:
        nodeOutputMessage = step.getGraphql();
        return nodeOutputMessage && nodeOutputMessage.hasData()
          ? nodeOutputMessage.getData()
          : undefined;
      case avs_pb.Execution.Step.OutputDataCase.CONTRACT_READ:
        nodeOutputMessage = step.getContractRead();
        if (nodeOutputMessage) {
          const results = nodeOutputMessage.getResultsList();
          if (results && results.length > 0) {
            // Always return wrapped format { results: [...] } to match ContractReadNode.fromOutputData
            const resultArray = results.map((result) => {
              // Match the exact format from ContractReadNode.fromOutputData
              const dataFields = result.getDataList().map((field) => ({
                name: field.getName(),
                type: field.getType(),
                value: field.getValue()
              }));
              
              return {
                methodName: result.getMethodName(),
                success: result.getSuccess(),
                error: result.getError(),
                data: dataFields,
              };
            });
            
            // Return wrapped format consistently for all cases
            return { results: resultArray };
          }
        }
        return undefined;
      case avs_pb.Execution.Step.OutputDataCase.CONTRACT_WRITE:
        nodeOutputMessage = step.getContractWrite();
        if (nodeOutputMessage) {
          const results = nodeOutputMessage.getResultsList();
          if (results && results.length > 0) {
            // Transform enhanced results structure
            const transformedResults = results.map((result) => ({
              methodName: result.getMethodName(),
              success: result.getSuccess(),
              transaction: result.getTransaction() ? {
                hash: result.getTransaction()?.getHash(),
                status: result.getTransaction()?.getStatus(),
                blockNumber: result.getTransaction()?.getBlockNumber(),
                blockHash: result.getTransaction()?.getBlockHash(),
                gasUsed: result.getTransaction()?.getGasUsed(),
                gasLimit: result.getTransaction()?.getGasLimit(),
                gasPrice: result.getTransaction()?.getGasPrice(),
                effectiveGasPrice: result.getTransaction()?.getEffectiveGasPrice(),
                from: result.getTransaction()?.getFrom(),
                to: result.getTransaction()?.getTo(),
                value: result.getTransaction()?.getValue(),
                nonce: result.getTransaction()?.getNonce(),
                transactionIndex: result.getTransaction()?.getTransactionIndex(),
                confirmations: result.getTransaction()?.getConfirmations(),
                timestamp: result.getTransaction()?.getTimestamp(),
              } : null,
              events: result.getEventsList().map((event) => ({
                eventName: event.getEventName(),
                address: event.getAddress(),
                topics: event.getTopicsList(),
                data: event.getData(),
                decoded: event.getDecodedMap() ? Object.fromEntries(event.getDecodedMap().toArray()) : {},
              })),
              error: result.getError() ? {
                code: result.getError()?.getCode(),
                message: result.getError()?.getMessage(),
                revertReason: result.getError()?.getRevertReason(),
              } : null,
              returnData: result.getReturnData() ? {
                name: result.getReturnData()?.getName(),
                type: result.getReturnData()?.getType(),
                value: result.getReturnData()?.getValue(),
              } : null,
              inputData: result.getInputData(),
            }));

            // For single result, also provide legacy fields for backward compatibility
            if (transformedResults.length === 1) {
              return {
                results: transformedResults,
                // Legacy compatibility fields
                transaction: transformedResults[0].transaction,
                success: transformedResults[0].success,
                hash: transformedResults[0].transaction?.hash,
              };
            } else {
              return { results: transformedResults };
            }
          }
        }
        return undefined;
      case avs_pb.Execution.Step.OutputDataCase.CUSTOM_CODE:
        nodeOutputMessage = step.getCustomCode();
        return nodeOutputMessage && nodeOutputMessage.hasData()
          ? convertProtobufValueToJs(nodeOutputMessage.getData())
          : undefined;
      case avs_pb.Execution.Step.OutputDataCase.REST_API:
        nodeOutputMessage = step.getRestApi();
        return nodeOutputMessage && nodeOutputMessage.hasData()
          ? convertProtobufValueToJs(nodeOutputMessage.getData())
          : undefined;
      case avs_pb.Execution.Step.OutputDataCase.BRANCH:
        return step.getBranch()?.toObject();
      case avs_pb.Execution.Step.OutputDataCase.FILTER:
        nodeOutputMessage = step.getFilter();
        if (nodeOutputMessage && nodeOutputMessage.hasData()) {
          const rawData = nodeOutputMessage.getData();
          if (rawData) {
            // Handle Any wrapper - need to unpack it first
            if (typeof rawData.unpack === 'function') {
              try {
                // For Any types, unpack to Value and then convert
                const unpackedValue = rawData.unpack(ProtobufValue.deserializeBinary, 'google.protobuf.Value');
                if (unpackedValue) {
                  return convertProtobufValueToJs(unpackedValue);
                }
              } catch (error) {
                // If unpacking fails, log error and return undefined
                console.warn('Failed to unpack FilterNode Any wrapper:', error);
                return undefined;
              }
            }
            // If no unpack method, this is unexpected for FilterNode
            console.warn('FilterNode output data is not an Any wrapper - this is unexpected');
            return undefined;
          }
        }
        return undefined;
      case avs_pb.Execution.Step.OutputDataCase.LOOP:
        const loopOutput = step.getLoop();
        if (!loopOutput) return undefined;
        
        const loopData = loopOutput.getData();
        if (!loopData) return undefined;
        
        // Loop nodes return an array of results from child node executions
        // The backend should serialize this as JSON, but may have issues
        
        // Try to parse as JSON first (expected format for array of child results)
        try {
          const parsedData = JSON.parse(loopData);
          
          // If it's an array, process each item with appropriate child node conversion
          if (Array.isArray(parsedData)) {
            return parsedData.map((item, index) => {
              if (!item || typeof item !== 'object') {
                return item; // Primitive values, return as-is
              }
              
              // Apply child node-specific conversions based on detected structure
              
              // REST API child output (has statusCode, body, headers)
              if (item.statusCode !== undefined && (item.body !== undefined || item.headers !== undefined)) {
                return item; // Already in raw format
              }
              
              // Custom Code child output (arbitrary object structure)
              if (item.result !== undefined || item.output !== undefined || item.error !== undefined) {
                return item; // Already processed by convertProtobufValueToJs in backend
              }
              
              // ETH Transfer child output (has transactionHash)
              if (item.transactionHash !== undefined) {
                return { transactionHash: item.transactionHash };
              }
              
              // Contract Read child output (has methodName and data)
              if (item.methodName !== undefined && item.data !== undefined) {
                return item; // Already in structured format
              }
              
              // GraphQL child output (has data field)
              if (item.data !== undefined && typeof item.data === 'object') {
                return item; // Already processed
              }
              
              // Generic object - return as-is (might be custom structure)
              return item;
            });
          }
          
          // Single object result (not an array)
          if (parsedData && typeof parsedData === 'object') {
            return parsedData;
          }
          
          // Parsed successfully but primitive value
          return { data: parsedData };
          
        } catch (e) {
          // Not JSON or parsing failed - could be a simple string result
          // This might happen if backend has serialization issues
          return { data: loopData };
        }
      default:
        console.warn(
          `Unhandled output data type in Step.getOutput: ${outputDataType}`
        );
        return undefined;
    }
  }

  static fromResponse(step: avs_pb.Execution.Step): Step {
    // Extract input data if present
    let inputData: any = undefined;
    if (step.hasInput()) {
      const inputValue = step.getInput();
      if (inputValue) {
        inputData = convertProtobufValueToJs(inputValue);
      }
    }

    return new Step({
      id: step.getId(),
      type: convertProtobufStepTypeToSdk(step.getType()),
      name: step.getName(),
      success: step.getSuccess(),
      error: step.getError(),
      log: step.getLog(),
      inputsList: step.getInputsList(),
      input: inputData,
      output: Step.getOutput(step),
      startAt: step.getStartAt(),
      endAt: step.getEndAt(),
    });
  }

  // Client side does not generate the step, so there's no toRequest() method
}

export default Step;
