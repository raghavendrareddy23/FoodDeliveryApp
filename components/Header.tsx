import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface HeaderProps {
  title: string;
  showBack?: boolean;
}

const Header: React.FC<HeaderProps> = ({ title, showBack = false }) => {
  const navigation = useNavigation();

  return (
    <SafeAreaView edges={["top"]}>
      <View style={styles.container}>
        {showBack && (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.back}>←</Text>
          </TouchableOpacity>
        )}
        <Text style={styles.title}>{title}</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "#ff6347",
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#ff6b00",
  },
  back: {
    fontSize: 20,
    marginRight: 10,
    color: "#fff",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
  },
});

export default Header;
