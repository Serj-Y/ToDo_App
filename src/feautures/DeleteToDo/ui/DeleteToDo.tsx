import {useTranslation} from 'react-i18next';
import React, {useCallback} from 'react';
import {deleteToDo} from '../model/services/deleteToDo';
import PressableOpacity from '../../../shared/ui/pressableOpacity/PressableOpacity.tsx';
import {StyleSheet, Text} from 'react-native';
import {useAppDispatch} from '../../../shared/lib/hooks/useAppDispatch/useAppDispatch.ts';
import {useTheme} from '../../../app/providers/ThemeProvider';

type DeleteToDoProps = {
  toDoIdForDelete: string;
};

export const DeleteToDo = ({toDoIdForDelete}: DeleteToDoProps) => {
  const {t} = useTranslation();
  const dispatch = useAppDispatch();
  const {theme} = useTheme();

  const onDeleteToDoListItem = useCallback(() => {
    dispatch(deleteToDo({toDoId: toDoIdForDelete}));
  }, [dispatch, toDoIdForDelete]);

  return (
    <PressableOpacity
      style={[styles.button, {backgroundColor: theme.backgroundColor}]}
      onPress={onDeleteToDoListItem}>
      <Text style={[styles.buttonText, {color: theme.primaryColor}]}>Del</Text>
    </PressableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  input: {
    height: 40,
    padding: 8,
    borderRadius: 4,
    borderWidth: 1,
    fontSize: 16,
  },
  button: {
    padding: 12,
    borderRadius: 4,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 16,
  },
});
