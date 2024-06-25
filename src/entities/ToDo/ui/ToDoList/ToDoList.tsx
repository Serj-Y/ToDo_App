import React from 'react';
import {ToDo} from '../../model/types/toDo';
import {KeyboardAvoidingView, Platform, View} from 'react-native';
import {sortByOrder} from '@shared/lib/sortByOrder/sortByOrder.ts';
import {DraggableToDoList} from '../DraggableToDoList/DraggableToDoList.tsx';

interface ToDoListProps {
  toDos: ToDo[];
}

export const ToDoList = ({toDos}: ToDoListProps) => {
  const sortedTodos = [...toDos].sort(sortByOrder);
  return (
    <View style={{marginBottom: 135}}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 165 : 10}>
        <DraggableToDoList dragItems={sortedTodos} />
      </KeyboardAvoidingView>
    </View>
  );
};
