import React, { useEffect } from 'react';
import { Image, TouchableOpacity, View, StyleSheet, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import trashIcon from '../assets/icons/trash/trash.png'
import editIcon from '../assets/icons/edit/edit.png'
import cancelIcon from '../assets/icons/cancel/cancel.png'

export interface Task {
    id: number;
    title: string;
    done: boolean;
}

interface TasksListProps {
    task: Task;
    selectedTask: Task | null;
    updateTask: (title: string) => void;
    index: number;
    setSelectedTask: (task: Task | null) => void;
    toggleTaskDone: (id: number) => void;
    removeTask: (id: number) => void;
    editTask: (id: number) => void;
}

export function TasksItem({
    task,
    selectedTask,
    setSelectedTask,
    updateTask,
    index,
    toggleTaskDone,
    editTask,
    removeTask
}: TasksListProps) {
    const [taskTitle, setTaskTitle] = React.useState(task.title);
    const textInputRef = React.useRef<TextInput>(null);

    useEffect(() => {
        if (selectedTask && selectedTask.id == task.id) {
            textInputRef.current?.focus();
        } else {
            textInputRef.current?.blur();
        }
    }, [selectedTask]);

    return (
        <View style={styles.container}>
            <View>
                <TouchableOpacity
                    testID={`button-${index}`}
                    activeOpacity={0.7}
                    style={styles.taskButton}
                    onPress={() => !selectedTask ? toggleTaskDone(task.id) : {}}
                >
                    <View
                        testID={`marker-${index}`}
                        style={task.done ? styles.taskMarkerDone : styles.taskMarker}
                    >
                        {task.done && (
                            <Icon
                                name="check"
                                size={12}
                                color="#FFF"
                            />
                        )}
                    </View>

                    <TextInput
                        testID={`text-${index}`}
                        ref={textInputRef}
                        value={selectedTask?.id == task.id ? taskTitle : task.title}
                        editable={selectedTask?.id == task.id}
                        onChangeText={setTaskTitle}
                        style={task.done ? styles.taskTextDone : styles.taskText}
                        maxLength={30}
                        onSubmitEditing={() => {
                            updateTask(taskTitle);
                            if (selectedTask?.id == task.id) {
                                setSelectedTask(null);
                            }
                        }}
                    />
                </TouchableOpacity>
            </View>

            <View style={styles.iconsContainer}>
                {!task?.done && <TouchableOpacity
                    testID={`edit-${index}`}
                    onPress={() => {
                        if (selectedTask?.id == task.id) {
                            setSelectedTask(null);
                        } else {
                            editTask(task.id);
                        }
                    }}
                >
                    <Image source={selectedTask?.id == task.id ? cancelIcon : editIcon} />
                </TouchableOpacity>}

                <View style={styles.iconsDivider} />

                <TouchableOpacity
                    testID={`trash-${index}`}
                    onPress={() => removeTask(task.id)}
                    disabled={selectedTask?.id == task.id}
                >
                    <Image
                        source={trashIcon}
                        style={{ opacity: selectedTask?.id == task.id ? 0.2 : 1 }} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    iconsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 12,
        paddingRight: 24,
    },
    iconsDivider: {
        width: 1,
        height: 24,
        backgroundColor: 'rgba(196, 196, 196, 0.24)',
        marginHorizontal: 12,
    },
    taskButton: {
        flex: 1,
        paddingHorizontal: 24,
        marginBottom: 4,
        borderRadius: 4,
        flexDirection: 'row',
        alignItems: 'center'
    },
    taskMarker: {
        height: 16,
        width: 16,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#B2B2B2',
        marginRight: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    taskText: {
        color: '#666',
        fontFamily: 'Inter-Medium',
    },
    taskMarkerDone: {
        height: 16,
        width: 16,
        borderRadius: 4,
        backgroundColor: '#1DB863',
        marginRight: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    taskTextDone: {
        color: '#1DB863',
        textDecorationLine: 'line-through',
        fontFamily: 'Inter-Medium'
    }
})