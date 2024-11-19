import * as avs_pb from "../grpc_codegen/avs_pb";

export const buildContractWrite = ({contractAddress, callData, contractABI}): avs_pb.ContractWriteNode => {
  const n = new avs_pb.ContractWriteNode();
  n.setContractAddress(contractAddress);
  n.setCallData(callData);
  if (contractABI) {
    // not everytine the Abi is available on Etherscan
    n.setContractAbi(contractABI);
  }

  return n;
}

export const buildContractRead = ({contract_ddress, callData, contractABI}): avs_pb.ContractReadNode => {
  const n = new avs_pb.ContractReadNode();
  n.setContractAddress(contractAddress);
  n.setCallData(callData);
  if (n.contractABI) {
    // not everytine the Abi is available on Etherscan
    n.setContractAbi(n.contractABI);
  }

  return n;
}

export const buildTaskEdge = ({id, source, target}): avs_pb.TaskEdge => {
  const edge = new avs_pb.TaskEdge();
  edge.setId(id);
  edge.setSource(source);
  edge.setTarget(target);

  return edge;
}
