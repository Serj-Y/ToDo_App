import {Task} from '../../module/types/task';
import {ToDo} from '../../../ToDo/model/types/toDo';
import React, {memo, useCallback} from 'react';
import {TouchableOpacity} from 'react-native';
import DraggableFlatList, {
  RenderItemParams,
  ScaleDecorator,
} from 'react-native-draggable-flatlist';
import {TaskItem} from '../TaskItem/TaskItem.tsx';
import {changeTaskOrder} from '../../../../feautures/UpdateTask/model/services/changeTaskOrder.ts';
import {useAppDispatch} from '../../../../shared/lib/hooks/useAppDispatch/useAppDispatch.ts';

interface Interface {
  dragItems: Task[];
  toDo: ToDo;
}

export const DraggableTaskList = memo(({dragItems, toDo}: Interface) => {
  const dispatch = useAppDispatch();
  const renderItem = useCallback(
    ({item, drag, isActive}: RenderItemParams<Task>) => {
      return (
        <ScaleDecorator activeScale={1.02}>
          <TouchableOpacity onLongPress={drag} disabled={isActive}>
            <TaskItem task={item} toDo={toDo} />
          </TouchableOpacity>
        </ScaleDecorator>
      );
    },
    [toDo],
  );

  const onReordered = useCallback(
    (fromIndex: number, toIndex: number) => {
      const firstId = dragItems[fromIndex]._id;
      const secondId = dragItems[toIndex]._id;
      if (firstId && secondId && firstId !== secondId) {
        dispatch(changeTaskOrder({firstId, secondId, toDoId: toDo._id}));
      }
    },
    [dispatch, dragItems, toDo._id],
  );

  return (
    <DraggableFlatList
      data={dragItems}
      onDragEnd={({from, to}) => {
        onReordered(from, to);
      }}
      keyExtractor={item => item._id}
      renderItem={renderItem}
    />
  );
});
