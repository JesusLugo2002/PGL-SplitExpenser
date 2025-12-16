import { useRouter } from "expo-router";
import React, { useContext, useEffect } from "react";
import { Button, StyleSheet, View } from "react-native";
import { AuthContext } from "../context/AuthContext";
import GroupContainer from "@/containers/GroupContainer";

export default function Home() {
  const { token, logout } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      setTimeout(() => router.replace("/login"), 0);
    }
  }, [router, token]);

  if (!token) return null;

  return (
    <View style={style.container}>
      <GroupContainer />
      <Button title="Logout" onPress={logout} />
    </View>
  );
}

const style = StyleSheet.create({
  container: { 
    flex: 1,
    justifyContent: "center"
  }
})
