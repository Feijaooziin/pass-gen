import { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useIsFocused } from "@react-navigation/native";
import useStorage from "../../hooks/useStorage";
import { PasswordItem } from "./components/passwordItem";

export function Passwords() {
  const { getItem, removeItem } = useStorage();
  const [listPasswords, setListPasswords] = useState([]);
  const focused = useIsFocused();

  useEffect(() => {
    async function loadPassword() {
      const passwords = await getItem("@pass");
      setListPasswords(passwords);
    }

    loadPassword();
  }, [focused]);

  async function handleDeletePassword(item) {
    const passwords = await removeItem("@pass", item);
    setListPasswords(passwords);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Minhas Senhas</Text>
      </View>

      <View style={styles.content}>
        <FlatList
          style={{ paddingTop: 14 }}
          data={listPasswords}
          keyExtractor={(item) => String(item)}
          renderItem={({ item }) => (
            <PasswordItem
              data={item}
              removePassword={() => handleDeletePassword(item)}
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    backgroundColor: "#392DE9",
    paddingTop: 58,
    paddingBottom: 14,
    paddingLeft: 14,
    paddingRight: 14,
  },

  title: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#FFFFFF",
  },

  content: {
    felx: 1,
    paddingLeft: 14,
    paddingRight: 14,
  },
});
