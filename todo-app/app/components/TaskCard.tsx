import { Text, Pressable, View, Button, TextInput, Alert } from "react-native";
import React, { useState } from "react";
import { router } from "expo-router";

interface TaskCardProps {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  created_at: string;
  onRefresh: () => void;
}

export default function TaskCard(props: TaskCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(props.title);
  const [editedDescription, setEditedDescription] = useState(props.description);

  const toggleStatus = async () => {
    const URL = `http://localhost:3000/todos/${props.id}`;
    try {
      await fetch(URL, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: props.title,
          description: props.description,
          completed: !props.completed,
        }),
      });
      props.onRefresh();
    } catch (error) {
      console.error("Error al actualizar estado:", error);
    }
  };

  const saveChanges = async () => {
    if (!editedTitle.trim() || !editedDescription.trim()) {
      Alert.alert(
        "Error",
        "El título y la descripción no pueden estar vacíos.",
      );
      return;
    }

    const URL = `http://localhost:3000/todos/${props.id}`;
    try {
      await fetch(URL, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: editedTitle,
          description: editedDescription,
          completed: props.completed,
        }),
      });
      setIsEditing(false);
      props.onRefresh();
    } catch (error) {
      console.error("Error al guardar cambios:", error);
    }
  };

  const cancelEdit = () => {
    setEditedTitle(props.title);
    setEditedDescription(props.description);
    setIsEditing(false);
  };

  const deleteTask = async () => {
    const URL = `http://localhost:3000/todos/${props.id}`;
    try {
      await fetch(URL, { method: "DELETE" });
      props.onRefresh();
    } catch (error) {
      console.error("Error al eliminar:", error);
    }
  };

  if (isEditing) {
    return (
      <View>
        <TextInput
          value={editedTitle}
          onChangeText={setEditedTitle}
          placeholder="Título de la tarea"
        />
        <TextInput
          value={editedDescription}
          onChangeText={setEditedDescription}
          placeholder="Descripción"
          multiline
        />
        <View>
          <Button title="Cancelar" color="gray" onPress={cancelEdit} />
          <Button title="Guardar" color="green" onPress={saveChanges} />
        </View>
      </View>
    );
  }

  return (
    <View>
      <Pressable onPress={() => router.push(`/${props.id}`)}>
        <Text>{props.title}</Text>
        <Text>{props.description}</Text>
        <Text>{props.completed ? "Completado" : "Pendiente"}</Text>
      </Pressable>

      <View>
        <Button
          title={props.completed ? "Desmarcar" : "Completar"}
          onPress={toggleStatus}
        />
        <Button title="Editar" onPress={() => setIsEditing(true)} />
        <Button title="Eliminar" color="#ff4444" onPress={deleteTask} />
      </View>
    </View>
  );
}
