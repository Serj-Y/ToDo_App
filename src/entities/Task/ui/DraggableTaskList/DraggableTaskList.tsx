import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import DragList, {DragListRenderItemInfo} from 'react-native-draglist';
import {useAppDispatch} from '../../../../shared/lib/hooks/useAppDispatch/useAppDispatch';
import {Task} from '../../module/types/task';
import {TaskItem} from '../TaskItem/TaskItem';
import {ToDo} from '../../../ToDo/model/types/toDo';

interface Interface {
  dragItems: Task[];
  updateRequest: any;
  toDoId?: string;
  toDo?: ToDo;
}

export const DraggableTaskList = ({
  dragItems,
  toDoId,
  updateRequest,
  toDo,
}: Interface) => {
  const dispatch = useAppDispatch();

  function keyExtractor(item: {_id: string}) {
    return item._id;
  }

  function renderItem(info: DragListRenderItemInfo<Task>) {
    const {item, onDragStart, onDragEnd} = info;

    return (
      <TouchableOpacity
        key={item._id}
        onLongPress={onDragStart}
        onPressOut={onDragEnd}>
        {toDo && <TaskItem task={item} toDo={toDo} />}
      </TouchableOpacity>
    );
  }

  async function onReordered(fromIndex: number, toIndex: number) {
    const firstId = dragItems[fromIndex]._id;
    const secondId = dragItems[toIndex]._id;
    if (firstId && secondId) {
      dispatch(updateRequest({firstId, secondId, toDoId}));
    }
  }

  return (
    <View>
      <DragList
        data={dragItems}
        keyExtractor={keyExtractor}
        onReordered={onReordered}
        renderItem={renderItem}
        scrollEnabled={false}
        scrollToOverflowEnabled={false}
        overScrollMode={'never'}
        pointerEvents={'auto'}
      />
    </View>
  );
};
