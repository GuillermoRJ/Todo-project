import { ScrollView, Text, View, TextInput, Alert, StyleSheet, Dimensions, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import TaskCard from "./components/TaskCard";


const { width } = Dimensions.get('window');

export default function Index() {
  const [results, setResults] = useState<any[]>([]);
  
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const getTasks = async () => {
    const URL = "http://10.10.146.60:3000/todos";
    try {
      const response = await fetch(URL, { method: "GET" });
      const jsonResponse = await response.json();
      setResults(jsonResponse.data);
    } catch (error) {
      console.error("Error al obtener las tareas:", error);
    }
  };

  
  const createTask = async () => {
    if (!title.trim() || !description.trim()) {
      Alert.alert("Error", "El título y la descripción son obligatorios");
      return;
    }

    const URL = "http://10.10.146.60:3000/todos";
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
    <ScrollView style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.formTitle}>Agregar Nueva Tarea</Text>
        
        <TextInput 
          style={styles.input}
          placeholder="Título" 
          placeholderTextColor="#999"
          value={title} 
          onChangeText={setTitle} 
        />
        
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Descripción"
          placeholderTextColor="#999"
          value={description}
          onChangeText={setDescription}
          multiline
        />
        
        <Pressable style={styles.saveButton} onPress={createTask}>
          <Text style={styles.saveButtonText}>Guardar Tarea</Text>
        </Pressable>
      </View>

      <View style={styles.listContainer}>
        {results?.map((task) => (
          <TaskCard key={task.id} {...task} onRefresh={getTasks} />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFDFB', 
    paddingHorizontal: width * 0.05,
    paddingTop: 30,
  },
  formContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 20, 
    marginBottom: 25,
    elevation: 2, 
    shadowColor: '#ccc', 
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 15,
  },
  input: {
    backgroundColor: '#F3F8F5', 
    padding: 12,
    borderRadius: 12, 
    marginBottom: 12,
    color: '#333',
    borderWidth: 1,
    borderColor: '#E8F1EC',
  },
  textArea: {
    minHeight: 80,
    textAlignVertical: 'top', 
  },
  listContainer: {
    paddingBottom: 40, 
  },
  saveButton: {
    backgroundColor: '#7FDAC7',
    paddingVertical: 14,
    borderRadius: 25, 
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
