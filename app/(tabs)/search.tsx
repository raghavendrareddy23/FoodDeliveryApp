import React, { useState } from 'react';
import { FlatList, StyleSheet, TextInput, View } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
import RestaurantCard from '../../components/RestaurantCard';
import { Restaurant } from '../../components/types';
import { fetchRestaurants } from '../../services/api';
// import Header from '@/components/Header';

export default function Search() {
  const [query, setQuery] = useState('');
  const [data, setData] = useState<Restaurant[]>([]);

  React.useEffect(() => {
    (async () => {
      const res = await fetchRestaurants();
      setData(res);
    })();
  }, []);

  const filtered = data.filter((r) => r.name.toLowerCase().includes(query.toLowerCase()));

  return (
    // <SafeAreaView edges={["top"]}>
    <View style={{ flex: 1, padding: 12, marginTop:46 }}>
      <TextInput placeholder="Search restaurants" value={query} onChangeText={setQuery} style={styles.input} />
      <FlatList data={filtered} keyExtractor={(i) => i.id} renderItem={({ item }) => <RestaurantCard restaurant={item} />} />
    </View>
    // </SafeAreaView>
  );
}

const styles = StyleSheet.create({ input: { borderWidth: 1, padding: 10, borderRadius: 8, marginBottom: 12 } });