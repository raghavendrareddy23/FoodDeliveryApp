import { useGlobalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import Toast from 'react-native-toast-message';
import { MenuItem as MenuItemType, Restaurant as RType } from '../../components/types';
import { useApp } from '../../context/AppContext';
import { fetchRestaurantById } from '../../services/api';
import { Ionicons } from '@expo/vector-icons';

export default function RestaurantScreen() {
  const params = useGlobalSearchParams();
  const router = useRouter();
  const id = String(params.id ?? '');
  const [loading, setLoading] = useState(true);
  const [restaurant, setRestaurant] = useState<RType | null>(null);
  const { dispatch } = useApp();
  const scale = useSharedValue(1);
  const aStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

  useEffect(() => {
    (async () => {
      try {
        const r = await fetchRestaurantById(id);
        setRestaurant(r ?? null);
      } catch (e) {
        Toast.show({ type: 'error', text1: 'Failed to load restaurant' });
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading) return <ActivityIndicator style={{ flex: 1 }} size="large" />;
  if (!restaurant) return <View style={{ flex: 1 }}><Text>Not found</Text></View>;

  function addToCart(item: MenuItemType) {
    scale.value = withTiming(1.08, { duration: 120 }, () => {
      scale.value = withTiming(1, { duration: 120 });
    });
    dispatch({ type: 'ADD_TO_CART', payload: { id: item.id, title: item.title, price: item.price } });
    Toast.show({ type: 'success', text1: 'Added to cart' });
  }

  return (
    <View style={{ flex: 1 }}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>

      <Image source={{ uri: restaurant.image }} style={{ width: '100%', height: 200 }} />
      <View style={{ padding: 12 }}>
        <Text style={{ fontSize: 20, fontWeight: '700' }}>{restaurant.name}</Text>
        <Text style={{ marginBottom: 8 }}>{restaurant.category}</Text>

        <FlatList
          data={restaurant.menu}
          keyExtractor={(m) => m.id}
          renderItem={({ item }) => (
            <View style={styles.menuRow}>
              <View style={{ flex: 1 }}>
                <Text style={{ fontWeight: '600' }}>{item.title}</Text>
                <Text style={{ color: '#555' }}>{item.description}</Text>
              </View>
              <View style={{ alignItems: 'flex-end' }}>
                <Text style={{ fontWeight: '700' }}>₹{item.price.toFixed(0)}</Text>
                <Animated.View style={[{ marginTop: 8 }, aStyle]}>
                  <TouchableOpacity onPress={() => addToCart(item)} style={styles.addBtn}>
                    <Text style={{ color: '#fff' }}>Add</Text>
                  </TouchableOpacity>
                </Animated.View>
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  backBtn: {
    position: 'absolute',
    top: 40,
    left: 16,
    zIndex: 10,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 6,
    elevation: 4,
  },
  menuRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  addBtn: { backgroundColor: '#ff6347', padding: 8, borderRadius: 8 },
});
