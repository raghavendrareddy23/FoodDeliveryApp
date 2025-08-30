import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../components/types';

const USERS_KEY = '@mock_users';

async function getUsers() {
  const raw = await AsyncStorage.getItem(USERS_KEY);
  return raw ? JSON.parse(raw) : [];
}
async function saveUsers(users: any[]) {
  return AsyncStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export async function signUp(name: string, email: string, password: string): Promise<User> {
  const users = await getUsers();
  if (users.find((u: any) => u.email === email)) throw new Error('Email already exists');
  const user = { id: Date.now().toString(), name, email };
  users.push({ ...user, password });
  await saveUsers(users);
  await AsyncStorage.setItem('@user', JSON.stringify(user));
  return user;
}

export async function signIn(email: string, password: string): Promise<User> {
  const users = await getUsers();
  const found = users.find((u: any) => u.email === email && u.password === password);
  if (!found) throw new Error('Invalid credentials');
  const user = { id: found.id, name: found.name, email: found.email };
  await AsyncStorage.setItem('@user', JSON.stringify(user));
  return user;
}

export async function signOut() {
  await AsyncStorage.removeItem('@user');
}
