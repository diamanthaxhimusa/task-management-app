import { action, observable } from 'mobx';
import { ITaskInfo, ITaskCreateReqDTO } from '../interfaces/task';
import { createTask as createTaskApi, getTasks as getTasksApi, completeTask } from '../api/api';

export class TaskStore {
  @observable public tasks: ITaskInfo[] = [];

  @action public setTasks = (tasks: ITaskInfo[]) => {
    this.tasks = tasks;
  };

  @action public createTask = async (data: ITaskCreateReqDTO): Promise<{ isSuccess: boolean }> => {
    try {
      const response = await createTaskApi(data);
      this.setTasks([response.data, ...this.tasks]);
      return { isSuccess: true };
    } catch (error) {
      // TODO ERRORS
      alert('Error creating task');
      return { isSuccess: false };
    }
  };

  @action public getTasks = async (): Promise<any> => {
    try {
      const response = await getTasksApi();
      this.setTasks(response.data);
      return true;
    } catch (error) {
      return false;
    }
  };

  @action public setTaskCompleted = async (completed: boolean, taskId: string): Promise<any> => {
    try {
      const response = await completeTask(completed, taskId);
      this.getTasks();
      return true;
    } catch (error) {
      return false;
    }
  };
}
