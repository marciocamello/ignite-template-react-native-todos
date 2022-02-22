import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';

import { TasksList } from '../../components/TasksList';

export interface Task {
    id: number;
    title: string;
    done: boolean;
}

let tasks: Task[] = [];

let mockedRemoveTask: jest.Mock;
let mockedToggleTaskDone: jest.Mock;
let mockedSetSelectedTask: jest.Mock;
let mockedUpdateTask: jest.Mock;
let mockedEditTask: jest.Mock;
let mockedSelectedTask: Task | null;

describe('MyTasksList', () => {

    beforeAll(() => {
        tasks = [
            {
                id: new Date().getTime(),
                title: 'Primeiro todo',
                done: false
            },
            {
                id: new Date().getTime() + 1,
                title: 'Segundo todo',
                done: false
            },
            {
                id: new Date().getTime() + 2,
                title: 'Terceiro todo',
                done: true
            },
        ];

        mockedRemoveTask = jest.fn();
        mockedToggleTaskDone = jest.fn();
        mockedSetSelectedTask = jest.fn();
        mockedUpdateTask = jest.fn();
        mockedEditTask = jest.fn();
        mockedSelectedTask = null;
    });

    it('should be able to render all tasks', () => {
        const { getByDisplayValue } = render(<TasksList
            tasks={tasks}
            removeTask={mockedRemoveTask}
            toggleTaskDone={mockedToggleTaskDone}
            setSelectedTask={mockedSetSelectedTask}
            updateTask={mockedUpdateTask}
            selectedTask={mockedSelectedTask}
            editTask={mockedEditTask}
        />)


        getByDisplayValue('Primeiro todo');
        getByDisplayValue('Segundo todo');
        getByDisplayValue('Terceiro todo');
    });

    it('should be able to handle "removeTask" event', () => {
        const { getByTestId } = render(<TasksList
            tasks={tasks}
            removeTask={mockedRemoveTask}
            toggleTaskDone={mockedToggleTaskDone}
            setSelectedTask={mockedSetSelectedTask}
            updateTask={mockedUpdateTask}
            selectedTask={mockedSelectedTask}
            editTask={mockedEditTask}
        />)
        const firstTaskTrashIcon = getByTestId('trash-0');

        fireEvent(firstTaskTrashIcon, 'press');

        expect(mockedRemoveTask).toHaveBeenCalledWith(tasks[0].id);
    });

    it('should be able to handle "toggleTaskDone" event', () => {
        const { getByDisplayValue } = render(<TasksList
            tasks={tasks}
            removeTask={mockedRemoveTask}
            toggleTaskDone={mockedToggleTaskDone}
            setSelectedTask={mockedSetSelectedTask}
            updateTask={mockedUpdateTask}
            selectedTask={mockedSelectedTask}
            editTask={mockedEditTask}
        />)
        const secondTask = getByDisplayValue('Segundo todo');

        fireEvent.press(secondTask);

        expect(mockedToggleTaskDone).toHaveBeenCalledWith(tasks[1].id);
    });
})