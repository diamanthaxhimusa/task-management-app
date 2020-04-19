import { action, observable, computed } from 'mobx';
import { ITaskInfo, ITaskCreateReqDTO } from '../interfaces/task';
import {
  createTask as createTaskApi,
  getTasks as getTasksApi,
  completeTask,
  taskDelete,
  taskUpdate
} from '../api/api';

export class TaskStore {
  @observable public tasks: ITaskInfo[] = [];

  @action public availableTasks = () => {
    return this.tasks.filter(task => !task.list);
  };

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
      await completeTask(completed, taskId);
      this.getTasks();
      return true;
    } catch (error) {
      return false;
    }
  };

  @action public editTask = async (id: string, data: any): Promise<{ isSuccess: boolean }> => {
    try {
      await taskUpdate(id, data);
      this.getTasks();
      return { isSuccess: true };
    } catch (error) {
      // TODO ERRORS
      if (error.err) alert(error.err);
      else alert('Error.');
      return { isSuccess: false };
    }
  };

  @action public deleteTask = async (taskId: string): Promise<any> => {
    try {
      await taskDelete(taskId);
      this.getTasks();
      return true;
    } catch (error) {
      return false;
    }
  };
}
