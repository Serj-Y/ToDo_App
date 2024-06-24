import {ToDo} from '../../model/types/toDo.ts';
import React, {memo, useCallback} from 'react';
import {TouchableOpacity} from 'react-native';
import DraggableFlatList, {
  RenderItemParams,
  ScaleDecorator,
} from 'react-native-draggable-flatlist';
import {useAppDispatch} from '@shared/lib/hooks';
import {ToDoListItem} from '../ToDoListItem/ToDoListItem.tsx';
import {changeToDoOrder} from '@features/UpdateToDoList';
import {
  HAPTIC_FEEDBACK,
  HapticFeedback,
} from '@shared/ui/HapticFeedBack/hapticFeedBack.ts';

interface Interface {
  dragItems: ToDo[];
}

export const DraggableToDoList = memo(({dragItems}: Interface) => {
  const dispatch = useAppDispatch();
  const renderItem = useCallback(
    ({item, drag, isActive}: RenderItemParams<ToDo>) => {
      const onLongPressHandler = () => {
        HapticFeedback({feedbackType: HAPTIC_FEEDBACK.IMPACTHEAVY});
        drag();
      };
      return (
        <ScaleDecorator activeScale={1.04}>
          <TouchableOpacity
            activeOpacity={0.8}
            onLongPress={onLongPressHandler}
            disabled={isActive}>
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
        HapticFeedback({feedbackType: HAPTIC_FEEDBACK.SUCCESS});
      }}
      keyExtractor={item => item._id}
      renderItem={renderItem}
      activationDistance={20}
    />
  );
});
