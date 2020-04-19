import { createContext } from 'react';
import { UserStore } from '.';

const userStore = new UserStore();

export const storesContext = createContext({
  userStore
});
