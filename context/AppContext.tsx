import React, { createContext, useContext, useReducer, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import reducer, { initialState, State, Action } from './reducer';

const AppContext = createContext<{ state: State; dispatch: React.Dispatch<Action> }>({ state: initialState, dispatch: () => {} });

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    (async () => {
      try {
        const sCart = await AsyncStorage.getItem('@cart');
        const sUser = await AsyncStorage.getItem('@user');
        const sOrders = await AsyncStorage.getItem('@orders');
        if (sCart) dispatch({ type: 'SET_CART', payload: JSON.parse(sCart) });
        if (sUser) dispatch({ type: 'SET_USER', payload: JSON.parse(sUser) });
        if (sOrders) dispatch({ type: 'SET_ORDERS', payload: JSON.parse(sOrders) });
      } catch (e) {
        console.log('load persist failed', e);
      }
    })();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem('@cart', JSON.stringify(state.cart)).catch(() => {});
  }, [state.cart]);
  useEffect(() => {
    AsyncStorage.setItem('@user', JSON.stringify(state.user)).catch(() => {});
  }, [state.user]);
  useEffect(() => {
    AsyncStorage.setItem('@orders', JSON.stringify(state.orders)).catch(() => {});
  }, [state.orders]);

  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>;
};

export const useApp = () => useContext(AppContext);
