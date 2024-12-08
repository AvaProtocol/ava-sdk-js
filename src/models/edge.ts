import * as avs_pb from "../../grpc_codegen/avs_pb";
import _ from "lodash";
export type EdgeProps = avs_pb.TaskEdge.AsObject;

class Edge implements EdgeProps {
  id: string;
  source: string;
  target: string;

  constructor(edge: EdgeProps) {
    this.id = edge.id;
    this.source = edge.source;
    this.target = edge.target;
  }

  static fromResponse(edge: avs_pb.TaskEdge): Edge {
    return new Edge(edge.toObject());
  }

  toRequest(): avs_pb.TaskEdge {
    const edge = new avs_pb.TaskEdge();
    edge.setId(this.id);
    edge.setSource(this.source);
    edge.setTarget(this.target);

    return edge;
  }
}

export default Edge;
