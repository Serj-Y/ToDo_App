import React from 'react';
import {ToDo} from '../../model/types/toDo.ts';
import {ToDoListItem} from '../ToDoListItem/ToDoListItem.tsx';
import {sortByOrder} from '../../../../shared/lib/sortByOrder/sortByOrder.ts';
import {ScrollView} from 'react-native';

interface ToDoListProps {
  toDos: ToDo[];
  isLoading?: boolean;
}

export const ToDoList = ({toDos, isLoading}: ToDoListProps) => {
  const renderToDo = (toDo: ToDo) => (
    <ToDoListItem toDo={toDo} key={toDo._id} />
  );

  const sortedTodos = [...toDos].sort(sortByOrder);
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {sortedTodos.length > 0 ? sortedTodos.map(renderToDo) : null}
      {/*{isLoading && getSkeletons()}*/}
    </ScrollView>
  );
};
