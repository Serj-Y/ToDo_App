import React, {memo, useCallback} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Controller, useForm} from 'react-hook-form';
import {Task} from '@entities/Task';
import {ToDo} from '@entities/ToDo';
import {TaskStatus} from '../../module/types/taskStatus';
import {updateTask} from '@features/UpdateTask/model/services/updateTask.ts';
import {UpdateTask} from '@features/UpdateTask';
import {useTheme} from '@app/providers/ThemeProvider';
import {Card} from '@shared/ui/Card/Card.tsx';
import {TaskStatusSelect} from '@entities/Task';
import {useAppDispatch} from '@shared/lib/hooks';

type TaskProps = {
  task: Task;
  toDo: ToDo;
  isEditTaskMode: boolean;
  setIsEditTask: any;
};

interface FormData {
  taskStatus: TaskStatus;
}

export const TaskItem = memo(
  ({task, toDo, isEditTaskMode, setIsEditTask}: TaskProps) => {
    const {control, handleSubmit, setValue} = useForm<FormData>();
    const {theme} = useTheme();
    const dispatch = useAppDispatch();

    const onSubmit = useCallback(
      (data: FormData) => {
        dispatch(
          updateTask({
            taskStatus: data.taskStatus,
            taskId: task._id,
            toDoId: toDo._id,
            task,
          }),
        );
      },
      [dispatch, task, toDo._id],
    );

    return (
      <View key={task._id} style={styles.container}>
        <Card>
          <View style={[styles.content]}>
            {!isEditTaskMode && (
              <Text style={[styles.text, {color: theme.invertedPrimaryColor}]}>
                {task.name}
              </Text>
            )}
            {isEditTaskMode ? (
              <UpdateTask
                currentTaskName={task.name}
                setIsEditTask={setIsEditTask}
                taskId={task._id}
                taskStatus={task.status}
                toDoId={toDo._id}
                task={task}
              />
            ) : (
              <View style={styles.content}>
                <Controller
                  name="taskStatus"
                  control={control}
                  defaultValue={task.status}
                  render={() => (
                    <View>
                      <TaskStatusSelect
                        value={task.status}
                        onChange={value => {
                          setValue('taskStatus', value);
                          handleSubmit(onSubmit)();
                        }}
                      />
                    </View>
                  )}
                />
              </View>
            )}
          </View>
        </Card>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    maxWidth: '45%',
    textAlign: 'auto',
    fontSize: 16,
  },
});
