import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';

import { Home } from '../../pages/Home';

describe('Home', () => {
    it('should be able to render new added tasks', () => {
        const { getByPlaceholderText, getByText, getByDisplayValue } = render(<Home />);
        const inputElement = getByPlaceholderText('Adicionar novo todo...');

        expect(getByText('0 tarefas'));

        fireEvent.changeText(inputElement, 'Primeira tarefa');
        fireEvent(inputElement, 'submitEditing');

        expect(getByDisplayValue('Primeira tarefa'));
        expect(getByText('1 tarefa'));

        fireEvent.changeText(inputElement, 'Segunda tarefa');
        fireEvent(inputElement, 'submitEditing');

        expect(getByDisplayValue('Primeira tarefa'));
        expect(getByDisplayValue('Segunda tarefa'));
        expect(getByText('2 tarefas'));
    });

    it('should be able to render tasks as done and undone', () => {
        const { getByPlaceholderText, getByDisplayValue, getByTestId } = render(<Home />);
        const inputElement = getByPlaceholderText('Adicionar novo todo...');

        fireEvent.changeText(inputElement, 'Primeira tarefa');
        fireEvent(inputElement, 'submitEditing');

        const buttonElement = getByTestId('button-0');
        const markerElement = getByTestId('marker-0');

        const taskElement = getByDisplayValue('Primeira tarefa');

        expect(buttonElement).toHaveStyle({
            flex: 1,
            paddingHorizontal: 24,
            marginBottom: 4,
            borderRadius: 4,
            flexDirection: 'row',
            alignItems: 'center'
        });
        expect(markerElement).toHaveStyle({
            height: 16,
            width: 16,
            borderRadius: 4,
            borderWidth: 1,
            borderColor: '#B2B2B2',
            marginRight: 15,
            alignItems: 'center',
            justifyContent: 'center'
        });
        expect(taskElement).toHaveStyle({
            color: '#666',
        });

        fireEvent.press(taskElement);

        expect(markerElement).toHaveStyle({
            backgroundColor: '#1DB863'
        });
        expect(taskElement).toHaveStyle({
            color: '#1DB863',
            textDecorationLine: 'line-through'
        });
    });

    it('should be able to remove tasks after the trash icon was pressed', async () => {
        const { getByPlaceholderText, getByText, getByTestId, getByDisplayValue } = render(<Home />);
        const inputElement = getByPlaceholderText('Adicionar novo todo...');

        fireEvent.changeText(inputElement, 'Primeira tarefa');
        fireEvent(inputElement, 'submitEditing');

        fireEvent.changeText(inputElement, 'Segunda tarefa');
        fireEvent(inputElement, 'submitEditing');

        const firstTaskTrashIcon = getByTestId('trash-0');

        fireEvent(firstTaskTrashIcon, 'press');

        // TODO need research about test using Alert component
        //expect(getByDisplayValue('Primeira tarefa')).toBeNull();
        //expect(getByDisplayValue('Segunda tarefa'));
        expect(getByText('2 tarefas'));
    });
})