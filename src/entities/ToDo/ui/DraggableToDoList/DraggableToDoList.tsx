import {ToDo} from '../../model/types/toDo.ts';
import React, {memo, useCallback} from 'react';
import {TouchableOpacity} from 'react-native';
import DraggableFlatList, {
  RenderItemParams,
  ScaleDecorator,
} from 'react-native-draggable-flatlist';
import {useAppDispatch} from '../../../../shared/lib/hooks/useAppDispatch/useAppDispatch.ts';
import {ToDoListItem} from '../ToDoListItem/ToDoListItem.tsx';
import {changeToDoOrder} from '../../../../feautures/UpdateToDoList/model/services/changeToDoOrder.ts';

interface Interface {
  dragItems: ToDo[];
}

export const DraggableToDoList = memo(({dragItems}: Interface) => {
  const dispatch = useAppDispatch();
  const renderItem = useCallback(
    ({item, drag, isActive}: RenderItemParams<ToDo>) => {
      return (
        <ScaleDecorator activeScale={1.04}>
          <TouchableOpacity onLongPress={drag} disabled={isActive}>
            <ToDoListItem toDo={item} />
          </TouchableOpacity>
        </ScaleDecorator>
      );
    },
    [],
  );

  const onReordered = useCallback(
    (fromIndex: number, toIndex: number) => {
      const firstId = dragItems[fromIndex]._id;
      const secondId = dragItems[toIndex]._id;
      if (firstId && secondId && firstId !== secondId) {
        dispatch(changeToDoOrder({firstId, secondId}));
      }
    },
    [dispatch, dragItems],
  );

  return (
    <DraggableFlatList
      scrollEnabled={true}
      data={dragItems}
      onDragEnd={({from, to}) => {
        onReordered(from, to);
      }}
      keyExtractor={item => item._id}
      renderItem={renderItem}
    />
  );
});
