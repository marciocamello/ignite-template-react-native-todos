import React from 'react';
import { FlatList } from 'react-native';
import { TasksItem } from './TaskItem';

export interface Task {
    id: number;
    title: string;
    done: boolean;
}

interface TasksListProps {
    tasks: Task[];
    selectedTask: Task | null;
    updateTask: (title: String) => void;
    setSelectedTask: (task: Task | null) => void;
    toggleTaskDone: (id: number) => void;
    removeTask: (id: number) => void;
    editTask: (id: number) => void;
}

export function TasksList({
    tasks,
    toggleTaskDone,
    setSelectedTask,
    updateTask,
    selectedTask, editTask,
    removeTask
}: TasksListProps) {

    return (
        <FlatList
            data={tasks}
            keyExtractor={item => String(item.id)}
            contentContainerStyle={{ paddingBottom: 24 }}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) => {
                return <TasksItem
                    item={item}
                    index={index}
                    toggleTaskDone={toggleTaskDone}
                    removeTask={removeTask}
                    editTask={editTask}
                    selectedTask={selectedTask}
                    setSelectedTask={setSelectedTask}
                    updateTask={updateTask}
                />
            }}
            style={{
                marginTop: 32
            }}
        />
    )
}