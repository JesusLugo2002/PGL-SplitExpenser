import { StyleSheet, Text } from "react-native";

type Props = {
  message: string;
};

export default function ErrorMessage({ message }: Props) {
  return <Text style={style.text}>{message}</Text>;
}

const style = StyleSheet.create({
  text: {
    color: "red",
  },
});
