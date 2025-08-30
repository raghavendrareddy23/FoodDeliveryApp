import { Slot } from 'expo-router';
import React from 'react';
import Toast from 'react-native-toast-message';
import { AppProvider } from '../context/AppContext';

export default function RootLayout() {
  return (
    <AppProvider>
      <Slot />
      <Toast />
    </AppProvider>
  );
}
