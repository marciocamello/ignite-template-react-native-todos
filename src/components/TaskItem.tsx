import React, { useEffect } from 'react';
import { Image, TouchableOpacity, View, StyleSheet, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import { ItemWrapper } from './ItemWrapper';

import trashIcon from '../assets/icons/trash/trash.png'
import editIcon from '../assets/icons/edit/edit.png'
import cancelIcon from '../assets/icons/cancel/cancel.png'

export interface Task {
    id: number;
    title: string;
    done: boolean;
}

interface TasksListProps {
    item: Task;
    selectedTask: Task | null;
    updateTask: (title: string) => void;
    index: number;
    setSelectedTask: (task: Task | null) => void;
    toggleTaskDone: (id: number) => void;
    removeTask: (id: number) => void;
    editTask: (id: number) => void;
}

export function TasksItem({
    item,
    selectedTask,
    setSelectedTask,
    updateTask,
    index,
    toggleTaskDone,
    editTask,
    removeTask
}: TasksListProps) {
    const [taskTitle, setTaskTitle] = React.useState(item.title);
    const textInputRef = React.useRef<TextInput>(null);

    useEffect(() => {
        updateTask(taskTitle);
    }, [taskTitle]);

    useEffect(() => {
        if (selectedTask && selectedTask.id === item.id) {
            textInputRef.current?.focus();
        } else {
            textInputRef.current?.blur();
        }
    }, [selectedTask]);

    return (
        <ItemWrapper index={index}>
            <View>
                <TouchableOpacity
                    testID={`button-${index}`}
                    activeOpacity={0.7}
                    style={styles.taskButton}
                    onPress={() => !selectedTask ? toggleTaskDone(item.id) : {}}
                >
                    <View
                        testID={`marker-${index}`}
                        style={item.done ? styles.taskMarkerDone : styles.taskMarker}
                    >
                        {item.done && (
                            <Icon
                                name="check"
                                size={12}
                                color="#FFF"
                            />
                        )}
                    </View>

                    <TextInput
                        ref={textInputRef}
                        value={selectedTask ? taskTitle : item.title}
                        editable={selectedTask ? true : false}
                        onChangeText={setTaskTitle}
                        style={item.done ? styles.taskTextDone : styles.taskText}
                        maxLength={30}
                        onSubmitEditing={() => {
                            if (selectedTask) {
                                setSelectedTask(null);
                            }
                        }}
                    />
                </TouchableOpacity>
            </View>

            <View style={styles.iconsContainer}>
                {!item?.done && <TouchableOpacity
                    testID={`edit-${index}`}
                    onPress={() => {
                        if (selectedTask) {
                            setSelectedTask(null);
                        } else {
                            editTask(item.id);
                        }
                    }}
                >
                    <Image source={selectedTask ? cancelIcon : editIcon} />
                </TouchableOpacity>}

                <View style={styles.iconsDivider} />

                {!selectedTask && <TouchableOpacity
                    testID={`trash-${index}`}
                    onPress={() => removeTask(item.id)}
                >
                    <Image source={trashIcon} style={{ opacity: selectedTask ? 0.2 : 1 }} />
                </TouchableOpacity>}
            </View>

        </ItemWrapper>
    )
}

const styles = StyleSheet.create({
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