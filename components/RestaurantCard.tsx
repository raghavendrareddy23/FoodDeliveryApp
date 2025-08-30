import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Restaurant } from '../components/types';
import { useRouter } from 'expo-router';

export default function RestaurantCard({ restaurant }: { restaurant: Restaurant }) {
  const router = useRouter();
  return (
    <TouchableOpacity style={styles.card} onPress={() => router.push(`/restaurant/${restaurant.id}`)}>
      <Image source={{ uri: restaurant.image }} style={styles.img} />
      <View style={{ flex: 1, paddingLeft: 12 }}>
        <Text style={{ fontWeight: '700' }}>{restaurant.name}</Text>
        <Text style={{ color: '#666' }}>{restaurant.category}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: { flexDirection: 'row', padding: 12, backgroundColor: '#fff', borderRadius: 8, marginBottom: 10, elevation: 2 },
  img: { width: 100, height: 70, borderRadius: 8 },
});
