import { Text, View } from "react-native";
import React from "react";
import { Href, router } from "expo-router";

interface TaskCardProps {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  created_at: string;
}

export default function TaskCard(props: TaskCardProps) {
  return (
    <View>
      <Text>{props.id}</Text>
      <Text>{props.title}</Text>
      <Text>{props.description}</Text>
      <Text>{props.completed ? "Completado" : "Pendiente"}</Text>
      <Text>{props.created_at}</Text>
    </View>
  );
}
