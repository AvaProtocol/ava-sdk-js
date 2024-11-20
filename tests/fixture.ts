import * as avs_pb from "../grpc_codegen/avs_pb";
import { UlidMonotonic } from "id128";
import { requireEnvVar } from "./utils";

export const sampleTask1 = {
  smartWalletAddress: '0x6B5103D06B53Cc2386243A09f4EAf3140f4FaD41',
  startAt: Math.floor(Date.now() / 1000) + 30,
  expiredAt: Math.floor(Date.now() / 1000 + 3600 * 24 * 30),
  memo: `Test task`,

  trigger: {
    trigger_type: avs_pb.TriggerType.BLOCKTRIGGER,
    block: {
      interval: 5, // run every 5 block
    },
  },
  nodes: [{
   // id need to be unique. it will be assign to the variable
   id: "uuid123",
   // name is for our note only. use for display a humand friendly version
   name: 'transfer token',
   contractWrite: {
     contractAddress: "0x2e8bdb63d09ef989a0018eeb1c47ef84e3e61f7b",
     callData: "0x123cdef",
   }
 }],
 edges: [{
   id: UlidMonotonic.generate().toCanonical(),
   source: "__TRIGGER__",
   target: "uuid123",
 }],
};

