import Node from "./interface";
import * as avs_pb from "@/grpc_codegen/avs_pb";
import {
  NodeType,
  BalanceNodeData,
  BalanceNodeProps,
  NodeProps,
} from "@avaprotocol/types";
import { convertProtobufValueToJs } from "../../utils";

// Required props for constructor: id, name, type and data

class BalanceNode extends Node {
  constructor(props: BalanceNodeProps) {
    super({ ...props, type: NodeType.Balance, data: props.data });
  }

  /**
   * Create a protobuf BalanceNode from config data
   * @param configData - The configuration data for the balance node
   * @returns Configured avs_pb.BalanceNode
   */
  static createProtobufNode(configData: BalanceNodeData): avs_pb.BalanceNode {
    const node = new avs_pb.BalanceNode();
    const config = new avs_pb.BalanceNode.Config();

    config.setAddress(configData.address);
    config.setChain(configData.chain);

    if (configData.includeSpam !== undefined) {
      config.setIncludeSpam(configData.includeSpam);
    }

    if (configData.includeZeroBalances !== undefined) {
      config.setIncludeZeroBalances(configData.includeZeroBalances);
    }

    if (configData.minUsdValue !== undefined) {
      // Convert dollars to cents for protobuf (validation happens on backend)
      config.setMinUsdValueCents(Math.round(configData.minUsdValue * 100));
    }

    if (
      configData.tokenAddresses !== undefined &&
      configData.tokenAddresses.length > 0
    ) {
      config.setTokenAddressesList(configData.tokenAddresses);
    }

    node.setConfig(config);
    return node;
  }

  static fromResponse(raw: avs_pb.TaskNode): BalanceNode {
    // Convert the raw object to BalanceNodeProps, which should keep name and id
    const obj = raw.toObject() as unknown as NodeProps;
    const balanceNode = raw.getBalance()!;
    const config = balanceNode.getConfig()!;
    const protobufData = config.toObject();

    // Convert protobuf data to our custom interface
    const data: BalanceNodeData = {
      address: protobufData.address,
      chain: protobufData.chain,
      includeSpam: protobufData.includeSpam,
      includeZeroBalances: protobufData.includeZeroBalances,
      minUsdValue: protobufData.minUsdValueCents / 100,
      tokenAddresses: protobufData.tokenAddressesList,
    };

    return new BalanceNode({
      ...obj,
      type: NodeType.Balance,
      data: data,
    });
  }

  toRequest(): avs_pb.TaskNode {
    const request = new avs_pb.TaskNode();

    request.setId(this.id);
    request.setName(this.name);

    const node = BalanceNode.createProtobufNode(this.data as BalanceNodeData);

    request.setBalance(node);

    return request;
  }

  static fromOutputData(
    outputData: avs_pb.RunNodeWithInputsResp
  ): unknown | null {
    const balanceOutput = outputData.getBalance();
    if (!balanceOutput) return null;

    // Get the data from the data field (array of token balances)
    const dataValue = balanceOutput.getData();
    const balanceData = dataValue ? convertProtobufValueToJs(dataValue) : [];

    // Return the array directly without wrapping
    return balanceData;
  }
}

export default BalanceNode;
