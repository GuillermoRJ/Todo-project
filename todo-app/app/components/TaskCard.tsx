import { View, Text } from 'react-native'
import React from 'react'

interface TaskCardProps {
        id: number,
        title: string,
        description: string,
        completed: boolean,
        created_at: string
}
export default function TaskCard(props : TaskCardProps) {
  return (
    <View>
      <Text>{props.title} </Text>
    </View>
  )
}