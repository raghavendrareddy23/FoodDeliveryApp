import Header from '@/components/Header';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import RestaurantCard from '../../components/RestaurantCard';
import { Restaurant } from '../../components/types';
import { fetchRestaurants } from '../../services/api';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const r = await fetchRestaurants();
        setRestaurants(r);
      } catch {
        // toast is available globally from app/_layout
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <ActivityIndicator style={{ flex: 1 }} size="large" />;

  return (
    // <SafeAreaView edges={["top"]}>
    <View style={styles.container}>
      <Header title="Food Delivery App" />

      <Text style={styles.title}>Restaurants</Text>
      <FlatList data={restaurants} keyExtractor={(i) => i.id} renderItem={({ item }) => <RestaurantCard restaurant={item} />} contentContainerStyle={{ paddingBottom: 24 }} />
    </View>
    // </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 14, backgroundColor: '#f7f7f7' },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 12, marginTop:16 },
});
