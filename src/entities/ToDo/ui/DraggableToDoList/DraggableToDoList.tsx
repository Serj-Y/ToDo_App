import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import DragList, {DragListRenderItemInfo} from 'react-native-draglist';
import {ToDo} from '../../model/types/toDo';
import {ToDoListItem} from '../ToDoListItem/ToDoListItem';
import {useAppDispatch} from '../../../../shared/lib/hooks/useAppDispatch/useAppDispatch';

interface DraggableToDoListProps {
  dragItems: ToDo[];
  updateRequest: any;
  toDoId?: string;
}

export const DraggableToDoList = ({
  dragItems,
  toDoId,
  updateRequest,
}: DraggableToDoListProps) => {
  const dispatch = useAppDispatch();

  function keyExtractor(item: ToDo) {
    return item._id;
  }

  function renderItem(info: DragListRenderItemInfo<ToDo>) {
    const {item, onDragStart, onDragEnd} = info;

    return (
      <TouchableOpacity
        key={item._id}
        onLongPress={onDragStart}
        onPressOut={onDragEnd}>
        <ToDoListItem toDo={item} />
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
        contentContainerStyle={{zIndex: 1}}
        data={dragItems}
        keyExtractor={keyExtractor}
        onReordered={onReordered}
        renderItem={renderItem}
        pointerEvents={'auto'}
        scrollEnabled={true}
        scrollToOverflowEnabled={false}
        overScrollMode={'never'}
        aria-hidden
      />
    </View>
  );
};
