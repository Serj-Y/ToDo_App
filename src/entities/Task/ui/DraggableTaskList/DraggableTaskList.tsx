import {Task} from '../../module/types/task';
import {ToDo} from '../../../ToDo/model/types/toDo';
import React, {memo, useCallback, useRef, useState} from 'react';
import DraggableFlatList, {
  RenderItemParams,
} from 'react-native-draggable-flatlist';
import {changeTaskOrder} from '../../../../feautures/UpdateTask/model/services/changeTaskOrder.ts';
import {useAppDispatch} from '../../../../shared/lib/hooks/useAppDispatch/useAppDispatch.ts';
import {SwipeableTaskList} from '../SwipeableTaskList/SwipeableTaskList.tsx';

interface Interface {
  dragItems: Task[];
  toDo: ToDo;
}

export const DraggableTaskList = memo(({dragItems, toDo}: Interface) => {
  const dispatch = useAppDispatch();
  const itemRefs = useRef(new Map());
  const [isDarag, setIsDrag] = useState<boolean>(false);

  const renderItem = useCallback(
    (params: RenderItemParams<Task>) => {
      return (
        <SwipeableTaskList
          {...params}
          itemRefs={itemRefs}
          drag={params.drag}
          item={params.item}
          toDo={toDo}
          setIsDrag={setIsDrag}
        />
      );
    },
    [toDo],
  );

  const onReordered = (fromIndex: number, toIndex: number) => {
    const firstId = dragItems[fromIndex]._id;
    const secondId = dragItems[toIndex]._id;
    if (firstId && secondId && firstId !== secondId) {
      dispatch(changeTaskOrder({firstId, secondId, toDoId: toDo._id}));
    }
  };

  return (
    <DraggableFlatList
      data={dragItems}
      onDragEnd={({from, to}) => {
        onReordered(from, to);
        setIsDrag(false);
      }}
      keyExtractor={item => item._id}
      renderItem={renderItem}
      activationDistance={isDarag ? -20 : 100}
    />
  );
});
