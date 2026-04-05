import { View, Text, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";

export default function TaskDetail() {
  const { id } = useLocalSearchParams();
  const [task, setTask] = useState<any>(null);

  const getSingleTask = async () => {
    const URL = `http://localhost:3000/todos/${id}`;
    try {
      const response = await fetch(URL);
      const jsonResponse = await response.json();
      setTask(jsonResponse.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getSingleTask();
  }, [id]);

  if (!task) return <ActivityIndicator />;

  return (
    <View>
      <Text>Detalles de la Tarea #{task.id}</Text>
      <Text>{task.title}</Text>
      <Text>{task.description}</Text>
      <Text>Estado: {task.completed ? "Completado" : "Pendiente"}</Text>
      <Text>Creado el: {task.created_at}</Text>
    </View>
  );
}
