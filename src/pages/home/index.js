import { useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  Pressable,
} from "react-native";

import * as Clipboard from "expo-clipboard";
import Slider from "@react-native-community/slider";
import useStorage from "../../hooks/useStorage";

let charset =
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*-_=+";

export function Home() {
  const [size, setSize] = useState(10);
  const [passwordValue, setPasswordValue] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const { saveItem } = useStorage();

  function generatePassword() {
    let password = "";
    for (let i = 0, n = charset.length; i < size; i++) {
      password += charset.charAt(Math.floor(Math.random() * n));
    }

    setPasswordValue(password);
    setModalVisible(true);
  }

  async function handleCopyPassword() {
    await Clipboard.setStringAsync(passwordValue);
    await saveItem("@pass", passwordValue);
    alert("Senha salva e copiada para Área de Transferência!");
    setModalVisible(false);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.mainTitle}>GERADOR DE SENHAS DO FEIJÃO</Text>
      <Image source={require("../../assets/logo.png")} style={styles.logo} />

      <Text style={styles.titleUp}>Escolha o tamnho da sua senha:</Text>
      <Text style={styles.title}>{size} caracteres</Text>

      <View style={styles.area}>
        <Slider
          style={{ height: 50 }}
          minimumValue={6}
          maximumValue={20}
          maximumTrackTintColor="#FF0000"
          trackTintColor="#392DE9"
          thumbTintColor="#392DE9"
          value={size}
          onValueChange={(value) => setSize(value.toFixed(0))}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={generatePassword}>
        <Text style={styles.buttonText}>Gerar Senha</Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} animationType="fade" transparent={true}>
        <View style={styles.containerModal}>
          <View style={styles.contentModal}>
            <Text style={styles.titleModal}>Senha gerada</Text>

            <Pressable
              style={styles.innerPassword}
              onPress={handleCopyPassword}
            >
              <Text style={styles.textModal}>{passwordValue}</Text>
            </Pressable>

            <View style={styles.buttonAreaModal}>
              <TouchableOpacity
                style={styles.buttonModal}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.buttonTextModal}>Voltar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.buttonModal, styles.buttonSaveModal]}
                onPress={handleCopyPassword}
              >
                <Text style={styles.buttonSaveTextModal}>Salvar senha</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F3FF",
    alignItems: "center",
    justifyContent: "center",
  },

  mainTitle: {
    fontWeight: "bold",
    fontSize: 35,
    textAlign: "center",
    padding: 30,
  },

  titleUp: {
    fontWeight: "bold",
    fontSize: 28,
    padding: 10,
    paddingTop: 0,
    paddingBottom: 10,
  },

  title: {
    fontWeight: "bold",
    fontSize: 30,
  },

  logo: {
    marginBottom: 30,
  },

  area: {
    marginTop: 14,
    marginBottom: 14,
    width: "80%",
    backgroundColor: "#FFF",
    borderRadius: 8,
    padding: 8,
  },

  button: {
    backgroundColor: "#392DE9",
    width: "80%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    marginBottom: 18,
  },

  buttonText: {
    color: "#FFF",
    fontSize: 20,
    fontWeight: "semibold",
  },

  containerModal: {
    backgroundColor: "rgba(24, 24, 24, 0.6)",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  contentModal: {
    backgroundColor: "#FFF",
    width: "85%",
    paddingTop: 24,
    paddingBottom: 24,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },

  titleModal: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 24,
  },

  innerPassword: {
    backgroundColor: "#0E0E0E",
    width: "90%",
    padding: 14,
    borderRadius: 8,
  },

  textModal: {
    color: "#FFF",
    textAlign: "center",
  },

  buttonAreaModal: {
    flexDirection: "row",
    width: "90%",
    marginTop: 8,
    alignItems: "center",
    justifyContent: "space-between",
  },

  buttonModal: {
    flex: 1,
    alignItems: "center",
    marginTop: 14,
    marginBottom: 14,
    padding: 8,
  },

  buttonSaveModal: {
    backgroundColor: "#392DE9",
    borderRadius: 8,
  },

  buttonSaveTextModal: {
    color: "#FFF",
    fontWeight: "bold",
  },
});
