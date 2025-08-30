import Header from "@/components/Header";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Toast from "react-native-toast-message";
import { useApp } from "../../context/AppContext";
import { useAuth } from "../../hooks/useAuth";

export default function Profile() {
  const { state, dispatch } = useApp();
  const { signOut } = useAuth();
  const [address, setAddress] = useState(state.user?.address ?? "");

  function save() {
    if (!state.user) return;
    dispatch({ type: "SET_USER", payload: { ...state.user, address } });
    Toast.show({ type: "success", text1: "Address saved" });
  }

  async function handleSignOut() {
    await signOut();
    router.replace("/signin");
  }

  return (
    <View style={{ flex: 1, padding: 12 }}>
      <Header title="Profile" />
      <View style={{ marginTop: 26 }}>
        {state.user ? (
          <>
            <Text style={{ fontSize: 18, fontWeight: "700" }}>
              {state.user.name}
            </Text>
            <Text style={{ marginBottom: 12 }}>{state.user.email}</Text>
            <TextInput
              placeholder="Save address"
              value={address}
              onChangeText={setAddress}
              style={styles.input}
            />
            <TouchableOpacity style={styles.saveBtn} onPress={save}>
              <Text style={{ color: "#fff" }}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.saveBtn,
                { backgroundColor: "#dc3545", marginTop: 12 },
              ]}
              onPress={handleSignOut}
            >
              <Text style={{ color: "#fff" }}>Sign out</Text>
            </TouchableOpacity>
          </>
        ) : (
          <Text>No user signed in</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  input: { borderWidth: 1, padding: 10, borderRadius: 8 },
  saveBtn: {
    backgroundColor: "#28a745",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 12,
  },
});
