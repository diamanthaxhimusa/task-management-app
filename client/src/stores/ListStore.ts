import { action, observable } from 'mobx';
import { IList, IListCreateReqDTO } from '../interfaces/list';
import {
  listDelete,
  createList as createListAPI,
  getLists as getListsAPI,
  listUpdate
} from '../api/api';

export class ListStore {
  @observable public lists: IList[] = [];

  @action public setLists = (lists: IList[]) => {
    this.lists = lists;
  };

  @action public createList = async (data: IListCreateReqDTO): Promise<{ isSuccess: boolean }> => {
    try {
      await createListAPI(data);
      this.getLists();
      return { isSuccess: true };
    } catch (error) {
      // TODO ERRORS
      alert('Error creating task');
      return { isSuccess: false };
    }
  };

  @action public getLists = async (): Promise<any> => {
    try {
      const response = await getListsAPI();
      this.setLists(response.data);
      return true;
    } catch (error) {
      return false;
    }
  };

  @action public editList = async (id: string, data: any): Promise<{ isSuccess: boolean }> => {
    try {
      await listUpdate(id, data);
      this.getLists();
      return { isSuccess: true };
    } catch (error) {
      // TODO ERRORS
      if (error.err) alert(error.err);
      else alert('Error.');
      return { isSuccess: false };
    }
  };

  @action public deleteList = async (listId: string): Promise<any> => {
    try {
      await listDelete(listId);
      this.getLists();
      return true;
    } catch (error) {
      return false;
    }
  };
}
