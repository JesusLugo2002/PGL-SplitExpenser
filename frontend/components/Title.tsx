import { StyleSheet, Text } from "react-native";

type Props = {
  title: string;
};

export default function Title({ title }: Props) {
  return <Text style={style.title}>{ title }</Text>;
}

const style = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    letterSpacing: 1,
    textAlign: "center",
    marginBottom: 20,
  },
});
