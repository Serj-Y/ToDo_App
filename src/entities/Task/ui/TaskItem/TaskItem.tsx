import React, {useCallback, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Controller, useForm} from 'react-hook-form';
import {Task} from '../../module/types/task';
import {ToDo} from '../../../ToDo/model/types/toDo';
import {TaskStatus} from '../../module/types/taskStatus';
import {useAppDispatch} from '../../../../shared/lib/hooks/useAppDispatch/useAppDispatch';
import {updateTask} from '../../../../feautures/UpdateTask/model/services/updateTask';
import {UpdateTask} from '../../../../feautures/UpdateTask';
import {DeleteTask} from '../../../../feautures/DeleteTask';
import {useTheme} from '../../../../app/providers/ThemeProvider';
import {Card} from '../../../../shared/ui/Card/Card';
import {TaskStatusSelect} from '../TaskStatusSelect/TaskStatusSelect';

type TaskProps = {
  task: Task;
  toDo: ToDo;
};

interface FormData {
  taskStatus: TaskStatus;
}

export const TaskItem = ({task, toDo}: TaskProps) => {
  const [isEditTask, setIsEditTask] = useState<boolean>(false);
  const setEditTaskHandler = () => setIsEditTask(prev => !prev);
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
          {!isEditTask && (
            <Text
              onLongPress={setEditTaskHandler}
              style={[styles.text, {color: theme.invertedPrimaryColor}]}>
              {task.name}
            </Text>
          )}
          {isEditTask ? (
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
              <DeleteTask taskIdForDelete={task._id} toDoListId={toDo._id} />
            </View>
          )}
        </View>
      </Card>
    </View>
  );
};

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
