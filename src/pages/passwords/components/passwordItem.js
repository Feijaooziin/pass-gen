import React from "react";
import { Text, StyleSheet, Pressable } from "react-native";
import * as Clipboard from "expo-clipboard";

export function PasswordItem({ data, removePassword }) {
  function handleCopyPassword() {
    Clipboard.setStringAsync(data);
    alert("Senha copiada!");
  }

  return (
    <Pressable
      onPress={handleCopyPassword}
      onLongPress={removePassword}
      style={styles.container}
    >
      <Text style={styles.text}>{data}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#0E0E0E",
    padding: 14,
    width: "100%",
    marginBottom: 14,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  text: {
    color: "#FFF",
  },
});
