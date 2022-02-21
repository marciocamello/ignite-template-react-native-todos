import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);

    function handleAddTask(newTaskTitle: string) {

        // check if the task is empty
        if (newTaskTitle.trim().length === 0) {
            Alert.alert('Task cannot be empty');
            return;
        }

        // check length of the task
        if (newTaskTitle.length > 30) {
            Alert.alert('Task cannot be longer than 50 characters');
            return;
        }

        // check if the task has already been added
        const taskExists = tasks.find(task => task.title === newTaskTitle);

        if (taskExists) {
            Alert.alert('Task already exists');
            return;
        }

        // add new task
        const newTask: Task = {
            id: Number(Math.random()),
            title: newTaskTitle,
            done: false
        }

        setTasks(oldTasks => [...oldTasks, newTask]);
    }

    function handleToggleTaskDone(id: number) {
        //toggle task done if exists

        const newTasks = tasks.filter(task => {
            if (task.id === id) {
                task.done = !task.done;
            }

            return task;
        });

        setTasks(newTasks);
    }

    function handleRemoveTask(id: number) {
        //remove task from state
        //add alert to confirm
        Alert.alert('Remove Task', 'Do you want to remove this task?', [
            {
                text: 'Cancel'
            },
            {
                text: 'Remove',
                onPress: () => {

                    const newTasks = tasks.filter(task => task.id !== id);
                    setTasks(newTasks);
                }
            }
        ]);
    }

    function handleEditTask(id: number) {
        //edit task
        const task = tasks.find(task => task.id === id);

        if (task) {
            setSelectedTask(task);
        }
    }

    function handleUpdateTask(title: String) {

        //check if the task is empty
        if (!title) {

            Alert.alert('Task cannot be empty');
            return;
        }

        //update task
        if (title && selectedTask) {

            const newTasks = tasks.map(task => {
                if (task.id === selectedTask.id) {
                    return {
                        ...task,
                        title
                    };
                } else {
                    return task;
                }
            }) as Task[];

            setTasks(newTasks);
        }
    }

    return (
        <View style={styles.container}>
            <Header tasksCounter={tasks.length} />

            <TodoInput addTask={handleAddTask} />

            <TasksList
                tasks={tasks}
                toggleTaskDone={handleToggleTaskDone}
                removeTask={handleRemoveTask}
                editTask={handleEditTask}
                selectedTask={selectedTask}
                setSelectedTask={setSelectedTask}
                updateTask={handleUpdateTask}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EBEBEB'
    }
})