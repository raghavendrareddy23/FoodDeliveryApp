import React from 'react';
import { Slot } from 'expo-router';
import { View } from 'react-native';

export default function RestaurantLayout() {
  return (
    <View style={{ flex: 1 }}>
      <Slot />
    </View>
  );
}
