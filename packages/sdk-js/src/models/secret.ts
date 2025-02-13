// import * as avs_pb from "@/grpc_codegen/avs_pb";

// export type SecretProps = {
//   name: string;
//   secret: string;
//   workflowId?: string;
//   orgId?: string;
// };

// class Secret implements SecretProps {
//   name: string;
//   secret: string;
//   workflowId?: string;
//   orgId?: string;

//   constructor(props: SecretProps) {
//     this.name = props.name;
//     this.secret = props.secret;
//     this.workflowId = props.workflowId;
//     this.orgId = props.orgId;
//   }

//   toRequest(): avs_pb.CreateOrUpdateSecretReq {
//     const request = new avs_pb.CreateOrUpdateSecretReq();

//     request.setName(this.name);   
//     request.setSecret(this.secret);
//     if (this.orgId) {
//       request.setOrgId(this.orgId);
//     }
//     if (this.workflowId) {
//       request.setWorkflowId(this.workflowId);
//     }

//     return request;
//   }
// }

// export default Secret;
