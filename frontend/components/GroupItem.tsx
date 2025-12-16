import { Group } from "@/interfaces/models";
import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

type Props = {
    group: Group
}

export default function GroupItem({ group }: Props) {
    const goToDetails = () => router.replace("/groupdetail");

    return <TouchableOpacity onPress={goToDetails} style={style.container}>
        <Text style={style.title}>{group.name}</Text>
        <Text style={style.names}>{group.users.join(" - ")}</Text>
    </TouchableOpacity>
}

const style = StyleSheet.create({
    container: {
        paddingVertical: 10,
        paddingHorizontal: 50,
        margin: 10,
        borderWidth: 1,
        borderColor: "blue",
        borderRadius: 5,
    },
    title: {
        fontSize: 20,
        textAlign: "center",
        textDecorationLine: "underline"
    },
    names: {
        textAlign: "center"
    }
})