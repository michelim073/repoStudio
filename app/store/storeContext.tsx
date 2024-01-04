// storeContext.js
import { createContext, useContext } from 'react';
import useAuthStore from './AuthUserStore';

const StoreContext = createContext(null);

const useStoreContext = () => {
  const store = useAuthStore();
  return store;
};

export { StoreContext, useStoreContext };
