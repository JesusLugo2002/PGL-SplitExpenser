import GroupItem from "@/components/GroupItem";
import Title from "@/components/Title"
import { Group } from "@/interfaces/models";
import { useState } from "react";
import { Button, TextInput} from "react-native"

export default function GroupContainer() {
  const [groups] = useState<Group[]>([
    {
        id: 1,
        name: "Los panitas",
        users: [ "Jesús", "Germán", "Joseph" ],
        expenses: []
    }
  ]);

    return <>
        <Title title="Your groups!" />
        {groups.map((group) => (
            <GroupItem key={group.id} group={group}/>
        ))}
        <TextInput placeholder="Agregue su grupo"></TextInput>
        <Button title="Registrar" />
    </>
}