import { useState } from 'react';
import { useApp } from '../context/AppContext';
import * as MockAuth from '../services/mockAuth';

export function useAuth() {
  const { state, dispatch } = useApp();
  const [loading, setLoading] = useState(false);

  async function signIn(email: string, password: string) {
    setLoading(true);
    try {
      const user = await MockAuth.signIn(email, password);
      dispatch({ type: 'SET_USER', payload: user });
      setLoading(false);
      return { ok: true };
    } catch (e: any) {
      setLoading(false);
      return { ok: false, error: e.message };
    }
  }

  async function signUp(name: string, email: string, password: string) {
    setLoading(true);
    try {
      const user = await MockAuth.signUp(name, email, password);
      dispatch({ type: 'SET_USER', payload: user });
      setLoading(false);
      return { ok: true };
    } catch (e: any) {
      setLoading(false);
      return { ok: false, error: e.message };
    }
  }

  function signOut() {
    MockAuth.signOut();
    dispatch({ type: 'SET_USER', payload: null });
  }

  return { user: state.user, loading, signIn, signUp, signOut };
}
