import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useApp } from "../../context/AppContext";
import Header from "@/components/Header";

function nextStatus(status: string) {
  const map: Record<string, string> = {
    Pending: "Preparing",
    Preparing: "Out for delivery",
    "Out for delivery": "Delivered",
    Delivered: "Delivered",
  };
  return map[status] ?? "Pending";
}

export default function Orders() {
  const { state, dispatch } = useApp();

  function advance(orderId: string) {
    const order = state.orders.find((o) => o.id === orderId);
    if (!order) return;
    const updated = { ...order, status: nextStatus(order.status) };
    const others = state.orders.filter((o) => o.id !== orderId);
    dispatch({ type: "SET_ORDERS", payload: [updated, ...others] });
  }

  return (
    // <SafeAreaView edges={["top"]}>
    <View style={{ flex: 1, padding: 12 }}>
      <Header title="Orders" />
      <View style={{marginTop:26}}>
        <FlatList
          data={state.orders}
          keyExtractor={(o) => o.id}
          ListEmptyComponent={() => <Text>No orders yet</Text>}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={{ fontWeight: "700" }}>#{item.id}</Text>
              <Text>{new Date(item.createdAt).toLocaleString()}</Text>
              <Text style={{ marginTop: 8 }}>Status: {item.status}</Text>
              <TouchableOpacity
                onPress={() => advance(item.id)}
                style={{ marginTop: 8 }}
              >
                <Text style={{ color: "#1e90ff" }}>Advance status</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 12,
    backgroundColor: "#fff",
    marginBottom: 12,
    borderRadius: 8,
  },
});
