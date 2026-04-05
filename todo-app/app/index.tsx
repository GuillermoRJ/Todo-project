import { ScrollView, Text, View, TextInput, Button, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import TaskCard from "./components/TaskCard";

export default function Index() {
  const [results, setResults] = useState<any[]>([]);
  // Estados para el formulario
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const getTasks = async () => {
    const URL = "http://localhost:3000/todos";
    try {
      const response = await fetch(URL, { method: "GET" });
      const jsonResponse = await response.json();
      setResults(jsonResponse.data);
    } catch (error) {
      console.error("Error al obtener las tareas:", error);
    }
  };

  // Función para crear tarea
  const createTask = async () => {
    if (!title.trim() || !description.trim()) {
      Alert.alert("Error", "El título y la descripción son obligatorios");
      return;
    }

    const URL = "http://localhost:3000/todos";
    try {
      const response = await fetch(URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title,
          description: description,
          completed: false,
        }),
      });

      if (response.ok) {
        setTitle("");
        setDescription("");
        getTasks();
      } else {
        Alert.alert("Error", "No se pudo crear la tarea");
      }
    } catch (error) {
      console.error("Error al crear la tarea:", error);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <ScrollView>
      <View>
        <Text>Agregar Nueva Tarea</Text>
        <TextInput placeholder="Título" value={title} onChangeText={setTitle} />
        <TextInput
          placeholder="Descripción"
          value={description}
          onChangeText={setDescription}
        />
        <Button title="Guardar Tarea" onPress={createTask} />
      </View>

      {results?.map((task) => (
        <TaskCard key={task.id} {...task} onRefresh={getTasks} />
      ))}
    </ScrollView>
  );
}
