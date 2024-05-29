import {useAppDispatch} from '../../../shared/lib/hooks/useAppDispatch/useAppDispatch.ts';
import React, {useCallback} from 'react';
import {deleteTask} from '../model/services/deleteTask.ts';
import PressableOpacity from '../../../shared/ui/pressableOpacity/PressableOpacity.tsx';
import {StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
type DeleteTaskProps = {
  toDoListId: string;
  taskIdForDelete: string;
};

export const DeleteTask = ({taskIdForDelete, toDoListId}: DeleteTaskProps) => {
  const dispatch = useAppDispatch();

  const onDeleteTask = useCallback(async () => {
    await dispatch(deleteTask({taskId: taskIdForDelete, toDoId: toDoListId}));
  }, [dispatch, taskIdForDelete, toDoListId]);

  return (
    <PressableOpacity style={[styles.button]} onPress={onDeleteTask}>
      <Icon name="trash-o" style={[{color: 'red'}]} size={20} />
    </PressableOpacity>
  );
};
const styles = StyleSheet.create({
  button: {
    padding: 6,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 12,
  },
});
