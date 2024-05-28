import {useTranslation} from 'react-i18next';
import {useAppDispatch} from '../../../shared/lib/hooks/useAppDispatch/useAppDispatch.ts';
import React, {useCallback} from 'react';
import {deleteTask} from '../model/services/deleteTask.ts';
import PressableOpacity from '../../../shared/ui/pressableOpacity/PressableOpacity.tsx';
import {StyleSheet, Text} from 'react-native';
import {useTheme} from '../../../app/providers/ThemeProvider';

type DeleteTaskProps = {
  toDoListId: string;
  taskIdForDelete: string;
};

export const DeleteTask = ({taskIdForDelete, toDoListId}: DeleteTaskProps) => {
  const {t} = useTranslation();
  const dispatch = useAppDispatch();
  const {theme} = useTheme();

  const onDeleteTask = useCallback(async () => {
    await dispatch(deleteTask({taskId: taskIdForDelete, toDoId: toDoListId}));
  }, [dispatch, taskIdForDelete, toDoListId]);

  return (
    <PressableOpacity
      style={[styles.button, {backgroundColor: theme.backgroundColor}]}
      onPress={onDeleteTask}>
      <Text style={[styles.buttonText, {color: theme.primaryColor}]}>Del</Text>
    </PressableOpacity>
  );
};
const styles = StyleSheet.create({
  button: {
    padding: 8,
    borderRadius: 4,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 12,
  },
});
