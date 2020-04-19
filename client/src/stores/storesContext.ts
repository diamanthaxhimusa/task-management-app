import { createContext } from 'react';
import { UserStore, TaskStore, ListStore } from '.';

const userStore = new UserStore();
const taskStore = new TaskStore();
const listStore = new ListStore();

export const storesContext = createContext({
  userStore,
  taskStore,
  listStore
});
