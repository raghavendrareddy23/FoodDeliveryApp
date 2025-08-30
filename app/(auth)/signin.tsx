import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useAuth } from "../../hooks/useAuth";
import Toast from "react-native-toast-message";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignIn() {
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function onSubmit() {
    const res = await signIn(email.trim(), password);
    if (!res.ok)
      Toast.show({ type: "error", text1: res.error || "Sign in failed" });
    else {
      Toast.show({ type: "success", text1: "Signed in" });
      router.replace("/(tabs)");
    }
  }

  return (
    // <SafeAreaView edges={["top"]}>
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>
      <TextInput
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        style={styles.input}
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.btnPrimary} onPress={onSubmit}>
        <Text style={styles.btnText}>Sign In</Text>
      </TouchableOpacity>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginTop: 12,
        }}
      >
        <Text>Don&#39;t have an account? </Text>
        <Link href="/(auth)/signup" style={{ color: "#1e90ff" }}>
          Sign up
        </Link>
      </View>
    </View>
    // </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center" },
  title: { fontSize: 28, fontWeight: "700", marginBottom: 18 },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  btnPrimary: {
    backgroundColor: "#ff6347",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  btnText: { color: "#fff", fontWeight: "600" },
});
