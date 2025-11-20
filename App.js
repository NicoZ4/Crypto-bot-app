import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, Alert, StyleSheet } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import * as LocalAuthentication from 'expo-local-authentication';

const API_URL = "https://example.com"; // PROVISIONAL: cambiarás por tu backend después

export default function App() {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [token, setToken] = useState(null);
  const [balance, setBalance] = useState("0");

  useEffect(()=> {
    (async ()=> {
      const t = await SecureStore.getItemAsync("access_token");
      if (t) {
        setToken(t);
        // fetchBalance(t); // si tenés backend, se puede activar
      }
    })();
  },[])

  const doLogin = async () => {
    // demo: guardamos un token simulado
    const fakeToken = "demo-token-123";
    await SecureStore.setItemAsync("access_token", fakeToken);
    setToken(fakeToken);
    Alert.alert("Login simulado OK");
  }

  const doWithdraw = async () => {
    const res = await LocalAuthentication.authenticateAsync({ promptMessage: "Confirmar retiro" });
    if (!res.success) { Alert.alert("Biometría falló"); return; }
    Alert.alert("Solicitud de retiro enviada (demo)");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crypto Bot (Demo)</Text>
      <TextInput style={styles.input} placeholder="email" onChangeText={setEmail} value={email} />
      <TextInput style={styles.input} placeholder="password" secureTextEntry onChangeText={setPw} value={pw} />
      <Button title="Login (demo)" onPress={doLogin} />
      <Text style={styles.balance}>Balance: {balance} USDT (demo)</Text>
      <View style={{height:10}} />
      <Button title="Solicitar retiro (biometría)" onPress={doWithdraw} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, marginTop: 40 },
  title: { fontSize: 20, marginBottom: 10 },
  input: { borderWidth:1, padding:8, marginBottom:10, borderRadius:6 },
  balance: { marginTop:20, fontSize:16 }
});
