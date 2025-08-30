import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { useApp } from "../../context/AppContext";
import Header from "@/components/Header";

export default function Cart() {
  const { state, dispatch } = useApp();
  const total = state.cart.reduce((s, i) => s + i.price * i.qty, 0);

  function inc(id: string) {
    const cur = state.cart.find((c) => c.id === id)?.qty ?? 0;
    dispatch({ type: "UPDATE_QTY", payload: { id, qty: cur + 1 } });
  }
  function dec(id: string) {
    const cur = state.cart.find((c) => c.id === id)?.qty ?? 0;
    if (cur <= 1) dispatch({ type: "REMOVE_FROM_CART", payload: id });
    else dispatch({ type: "UPDATE_QTY", payload: { id, qty: cur - 1 } });
  }
  function checkout() {
    if (!state.cart.length)
      return Toast.show({ type: "info", text1: "Cart is empty" });
    const order = {
      id: Date.now().toString(),
      items: state.cart,
      total,
      status: "Pending",
      createdAt: new Date().toISOString(),
    };
    dispatch({ type: "ADD_ORDER", payload: order });
    dispatch({ type: "CLEAR_CART" });
    Toast.show({ type: "success", text1: "Order placed" });
  }

  return (
    // <SafeAreaView edges={["top"]}>
    <View style={{ flex: 1, padding: 12 }}>
      <Header title="Cart" />
      <View style={{marginTop:26}}>
        <FlatList
          data={state.cart}
          keyExtractor={(i) => i.id}
          ListEmptyComponent={() => <Text>Your cart is empty</Text>}
          renderItem={({ item }) => (
            <View style={styles.row}>
              <View style={{ flex: 1 }}>
                <Text style={{ fontWeight: "600" }}>{item.title}</Text>
                <Text>₹{item.price}</Text>
              </View>
              <View style={{ alignItems: "center" }}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <TouchableOpacity
                    style={styles.qtyBtn}
                    onPress={() => dec(item.id)}
                  >
                    <Text>-</Text>
                  </TouchableOpacity>
                  <Text style={{ marginHorizontal: 8 }}>{item.qty}</Text>
                  <TouchableOpacity
                    style={styles.qtyBtn}
                    onPress={() => inc(item.id)}
                  >
                    <Text>+</Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  style={{ marginTop: 8 }}
                  onPress={() =>
                    dispatch({ type: "REMOVE_FROM_CART", payload: item.id })
                  }
                >
                  <Text style={{ color: "red" }}>Remove</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </View>

      <View style={{ borderTopWidth: 1, borderColor: "#eee", paddingTop: 12 }}>
        <Text style={{ fontSize: 18, fontWeight: "700" }}>
          Total: ₹{total.toFixed(0)}
        </Text>
        <TouchableOpacity style={styles.checkoutBtn} onPress={checkout}>
          <Text style={{ color: "#fff" }}>Place Order</Text>
        </TouchableOpacity>
      </View>
    </View>
    // </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center", marginBottom: 12 },
  qtyBtn: { padding: 8, borderWidth: 1, borderRadius: 6 },
  checkoutBtn: {
    marginTop: 12,
    backgroundColor: "#ff6347",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
});
