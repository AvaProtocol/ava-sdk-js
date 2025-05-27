import * as avs_pb from "@/grpc_codegen/avs_pb";

export type SecretProps = {
  name: string;
  secret?: string;
  workflowId?: string;
  orgId?: string;
  createdAt?: number;
  updatedAt?: number;
};

class Secret implements SecretProps {
  name: string;
  secret?: string;
  workflowId?: string;
  orgId?: string;
  createdAt?: number;
  updatedAt?: number;

  constructor(props: SecretProps) {
    this.name = props.name;
    this.secret = props.secret;
    this.workflowId = props.workflowId;
    this.orgId = props.orgId;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }

  toRequest(): avs_pb.CreateOrUpdateSecretReq {
    const request = new avs_pb.CreateOrUpdateSecretReq();

    request.setName(this.name);
    if (this.secret) {
      request.setSecret(this.secret);
    }
    if (this.orgId) {
      request.setOrgId(this.orgId);
    }
    if (this.workflowId) {
      request.setWorkflowId(this.workflowId);
    }

    return request;
  }
}

export default Secret;
