import { ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import TaskCard from "./components/TaskCard";

export default function Index() {
  const [results, setResults] = useState<any[]>([]);

  const getTasks = async () => {
    const URL = "http://localhost:3000/todos";

    try {
      const response = await fetch(URL, {
        method: "GET",
      });

      const jsonResponse = await response.json();

      setResults(jsonResponse.data);
    } catch (error) {
      console.error("Error al obtener las tareas:", error);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <ScrollView>
      {results?.map((task) => (
        <TaskCard key={task.id} {...task} />
      ))}
    </ScrollView>
  );
}
