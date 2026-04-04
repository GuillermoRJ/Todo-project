import { ScrollView, Text } from "react-native";
import React, { useEffect, useState } from "react";
import TaskCard from "./components/TaskCard";

export default function index() {
  const [results, setResults] = useState<any[]>([]);

  useEffect(() => {
    getTasks();
  }, []);

  const getTasks = async () => {
    const URL = "http://localhost:8081";
    const response = await fetch(URL, {
      method: "GET",
    });
    const data = await response.json();
    setResults(data.results);
    console.log(data);
  };
  return (
    <ScrollView>
      <Text>ola</Text>
      <TaskCard
        id={1}
        title={""}
        description={""}
        completed={false}
        created_at={""}
      />
    </ScrollView>
  );
}
