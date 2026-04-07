import { Text, Pressable, View, TextInput, Alert, StyleSheet } from "react-native";
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
    const URL = `http://10.10.146.60:3000/todos/${props.id}`;
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

    const URL = `http://10.10.146.60:3000/todos/${props.id}`;
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
    const URL = `http://10.10.146.60:3000/todos/${props.id}`;
    try {
      await fetch(URL, { method: "DELETE" });
      props.onRefresh();
    } catch (error) {
      console.error("Error al eliminar:", error);
    }
  };

  
  if (isEditing) {
    return (
      <View style={[styles.card, styles.editingCard]}>
        <TextInput
          style={styles.inputTitle}
          value={editedTitle}
          onChangeText={setEditedTitle}
          placeholder="Título de la tarea"
          placeholderTextColor="#999"
        />
        <TextInput
          style={styles.inputDescription}
          value={editedDescription}
          onChangeText={setEditedDescription}
          placeholder="Descripción"
          placeholderTextColor="#999"
          multiline
        />
        <View style={styles.actionButtons}>
          <Pressable style={[styles.btn, styles.btnGray]} onPress={cancelEdit}>
            <Text style={styles.btnText}>Cancelar</Text>
          </Pressable>
          <Pressable style={[styles.btn, styles.btnGreen]} onPress={saveChanges}>
            <Text style={[styles.btnText, { color: '#fff' }]}>Guardar</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  
  return (
    <View style={styles.card}>
      <Pressable onPress={() => router.push(`/${props.id}`)}>
        <Text style={styles.title}>{props.title}</Text>
        <Text style={styles.description}>{props.description}</Text>
        <Text style={[
          styles.statusText, 
          { color: props.completed ? '#7FDAC7' : '#F5A9B8' } 
        ]}>
          {props.completed ? "Completado" : "Pendiente"}
        </Text>
      </Pressable>

      <View style={styles.actionButtons}>
        <Pressable 
          style={[styles.btn, styles.btnLightGreen]} 
          onPress={toggleStatus}
        >
          <Text style={styles.btnText}>{props.completed ? "Desmarcar" : "Completar"}</Text>
        </Pressable>

        <Pressable 
          style={[styles.btn, styles.btnBlue]} 
          onPress={() => setIsEditing(true)}
        >
          <Text style={styles.btnText}>Editar</Text>
        </Pressable>

        <Pressable 
          style={[styles.btn, styles.btnRed]} 
          onPress={deleteTask}
        >
          <Text style={[styles.btnText, { color: '#fff' }]}>Eliminar</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { 
    padding: 18, 
    marginVertical: 10, 
    backgroundColor: '#fff', 
    borderRadius: 20, 
    elevation: 1, 
    shadowColor: '#ddd', 
    shadowOpacity: 0.1, 
    shadowRadius: 5, 
    width: '100%', 
  },
  editingCard: {
    borderColor: '#7FDAC7', 
    borderWidth: 2,
    backgroundColor: '#F3F8F5',
  },
  title: { 
    fontSize: 18, 
    fontWeight: '700', 
    marginBottom: 5,
    color: '#333',
  },
  description: {
    marginBottom: 10,
    color: '#666',
    fontSize: 14,
  },
  statusText: {
    fontWeight: '700',
    fontSize: 12,
    marginBottom: 15,
  },
  btn: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20, 
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    fontWeight: '600',
    fontSize: 13,
    color: '#333',
  },
  
  btnLightGreen: { backgroundColor: '#E8F1EC' },
  btnBlue: { backgroundColor: '#A9DEF9' },
  btnRed: { backgroundColor: '#F5A9B8' }, 
  btnGreen: { backgroundColor: '#7FDAC7' }, 
  btnGray: { backgroundColor: '#E0E0E0' },
  
  actionButtons: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginTop: 5, 
  },
  inputTitle: {
    fontSize: 18,
    fontWeight: '700',
    borderBottomWidth: 1,
    borderColor: '#7FDAC7',
    marginBottom: 10,
    paddingVertical: 5,
    color: '#333',
  },
  inputDescription: {
    fontSize: 14,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginBottom: 15,
    paddingVertical: 5,
    minHeight: 40,
    color: '#666',
  },
});
