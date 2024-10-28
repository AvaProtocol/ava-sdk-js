import * as avs_pb from "../grpc_codegen/avs_pb";

class Task {
  id: string;
  status: string;
//   result?: any;
//   error?: string;

  constructor(task: avs_pb.ListTasksResp.TaskItemResp) {
    this.id = task.getId();
    this.status = task.getStatus().toString();
  }
}

export default Task;