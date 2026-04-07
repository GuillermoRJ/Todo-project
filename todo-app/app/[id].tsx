import { View, Text, ActivityIndicator, StyleSheet, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";


const { width } = Dimensions.get('window');

export default function TaskDetail() {
  const { id } = useLocalSearchParams();
  const [task, setTask] = useState<any>(null);

  const getSingleTask = async () => {
    const URL = `http://10.10.146.60:3000/todos/${id}`;
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

  
  if (!task) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#7FDAC7" />
        <Text style={styles.loadingText}>Cargando tarea...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.header}>Detalles de la Tarea #{task.id}</Text>
        
        <Text style={styles.title}>{task.title}</Text>
        
        <View style={styles.descriptionBox}>
          <Text style={styles.description}>{task.description}</Text>
        </View>

        <View style={styles.statusRow}>
          <Text style={styles.statusLabel}>Estado:</Text>
          <View style={[
            styles.statusBadge, 
            { backgroundColor: task.completed ? '#E8F1EC' : '#FDECEF' } 
          ]}>
            <Text style={[
              styles.statusText, 
              { color: task.completed ? '#7FDAC7' : '#F5A9B8' }
            ]}>
              {task.completed ? "✅ Completado" : "⏳ Pendiente"}
            </Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.dateLabel}>Fecha de creación:</Text>
          <Text style={styles.dateValue}>
            {task.created_at}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFDFB', 
    paddingHorizontal: width * 0.05,
    paddingTop: 30,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FAFDFB',
  },
  loadingText: {
    marginTop: 10,
    color: '#999',
    fontSize: 16,
  },
  card: {
    backgroundColor: '#fff',
    padding: 25,
    borderRadius: 25, 
    elevation: 3,
    shadowColor: '#ccc',
    shadowOpacity: 0.15,
    shadowRadius: 10,
    width: '100%',
  },
  header: {
    fontSize: 14,
    color: '#A9DEF9',
    fontWeight: '700',
    marginBottom: 15,
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  descriptionBox: {
    backgroundColor: '#F3F8F5', 
    padding: 15,
    borderRadius: 15,
    marginBottom: 25,
  },
  description: {
    fontSize: 16,
    color: '#555',
    lineHeight: 24, 
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 25,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0', 
  },
  statusLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#444',
  },
  statusBadge: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20, 
  },
  statusText: {
    fontSize: 14,
    fontWeight: '700',
  },
  footer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  dateLabel: {
    fontSize: 13,
    color: '#999',
    marginBottom: 5,
  },
  dateValue: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
});