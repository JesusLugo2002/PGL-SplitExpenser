import { useRouter } from "expo-router";
import React, { useContext, useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { AuthContext } from "../context/AuthContext";
import ErrorMessage from "@/components/ErrorMessage";
import Title from "@/components/Title";

export default function Register() {
  const { register } = useContext(AuthContext);
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleRegister() {
    const res = await register(username, password);
    if (res.ok) {
      router.replace("/login");
    } else {
      setError(res.msg || "Error al registrar");
    }
  }

  return (
    <View style={style.container}>
      <Title title="Register"/>
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
      {error ? <ErrorMessage message={error} /> : null}
      <Button title="Create account" onPress={handleRegister} />
      <Text onPress={() => router.push("/login")} style={style.secondaryButton}>
        Have account? Back to login!
      </Text>
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
    marginTop: 10,
  },
});
