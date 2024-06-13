import React from 'react';
import {ToDo} from '../../model/types/toDo';
import {View} from 'react-native';
import {sortByOrder} from '@shared/lib/sortByOrder/sortByOrder.ts';
import {DraggableToDoList} from '../DraggableToDoList/DraggableToDoList.tsx';

interface ToDoListProps {
  toDos: ToDo[];
}

export const ToDoList = ({toDos}: ToDoListProps) => {
  const sortedTodos = [...toDos].sort(sortByOrder);
  return (
    <View style={{marginBottom: 135}}>
      <DraggableToDoList dragItems={sortedTodos} />
    </View>
  );
};
