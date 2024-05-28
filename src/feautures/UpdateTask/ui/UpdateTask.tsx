import {TaskStatus} from '../../../entities/Task/module/types/taskStatus.ts';
import {Task} from '../../../entities/Task/module/types/task.ts';
import {useTranslation} from 'react-i18next';
import {Controller, useForm} from 'react-hook-form';
import {useAppDispatch} from '../../../shared/lib/hooks/useAppDispatch/useAppDispatch.ts';
import React, {useCallback} from 'react';
import {updateTask} from '../model/services/updateTask.ts';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import PressableOpacity from '../../../shared/ui/pressableOpacity/PressableOpacity.tsx';
import {useTheme} from '../../../app/providers/ThemeProvider';
import {Card} from '../../../shared/ui/Card/Card.tsx';

type UpdateTaskProps = {
  setIsEditTask: (value: boolean) => void;
  taskId: string;
  currentTaskName: string;
  toDoId: string;
  taskStatus: TaskStatus;
  task: Task;
  className?: string;
};
interface FormData {
  taskStatus: TaskStatus;
  taskName: string;
}

export const UpdateTask = ({
  taskId,
  currentTaskName,
  setIsEditTask,
  toDoId,
  taskStatus,
  task,
}: UpdateTaskProps) => {
  const {t} = useTranslation();
  const {control, handleSubmit} = useForm<FormData>();
  const dispatch = useAppDispatch();
  const {theme} = useTheme();
  const onSubmit = useCallback(
    (data: FormData) => {
      dispatch(
        updateTask({
          taskStatus: data.taskStatus,
          taskName: data.taskName,
          taskId,
          toDoId,
          task,
        }),
      );
      setIsEditTask(false);
    },
    [dispatch, setIsEditTask, task, taskId, toDoId],
  );
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <>
          <Controller
            name="taskName"
            control={control}
            defaultValue={currentTaskName}
            rules={{minLength: 2, maxLength: 50}}
            render={({field}) => (
              <TextInput
                style={[
                  styles.input,
                  {
                    color: theme.invertedPrimaryColor,
                    borderColor: theme.invertedPrimaryColor,
                  },
                ]}
                {...field}
                onChangeText={value => field.onChange(value)}
              />
            )}
          />
        </>
        <>
          <Controller
            name="taskStatus"
            control={control}
            defaultValue={taskStatus}
            render={({field}) => (
              <View />
              // <TaskStatusSelect value={field.value} onChange={field.onChange} />
            )}
          />
          <PressableOpacity
            style={[styles.button, {backgroundColor: theme.backgroundColor}]}
            onPress={handleSubmit(onSubmit)}>
            <Text style={[styles.buttonText, {color: theme.primaryColor}]}>
              conf
            </Text>
          </PressableOpacity>
        </>
      </View>
    </View>
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
    padding: 8,
    borderRadius: 4,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 12,
  },
});
