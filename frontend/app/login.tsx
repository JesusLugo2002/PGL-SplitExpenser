import { useRouter } from "expo-router";
import React, { useContext, useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { AuthContext } from "../context/AuthContext";
import ErrorMessage from "@/components/ErrorMessage";

export default function Login() {
  const router = useRouter();
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleLogin() {
    const res = await login(username, password);
    if (res.access_token) {
      router.replace("/");
    } else {
      setError(res.msg || "Login fallido");
    }
  }

  return (
    <View style={style.container}>
      <Text style={style.title}>Login</Text>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        style={style.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={style.input}
      />
      {error ? <ErrorMessage message={error}/> : null}
      <Button title="Login" onPress={handleLogin} />
      <Text onPress={() => router.push("/register")} style={style.secondaryButton}>No account? Create it</Text>
    </View>
  );
}

const style = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    letterSpacing: 1,
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    marginBottom: 10,
    padding: 8,
  },
  secondaryButton: {
    color: "blue",
    textDecorationLine: "underline",
    textAlign: "center",
    marginTop: 10
  }
});
