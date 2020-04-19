import { createContext } from 'react';
import { UserStore, TaskStore } from '.';

const userStore = new UserStore();
const taskStore = new TaskStore();

export const storesContext = createContext({
  userStore,
  taskStore
});
