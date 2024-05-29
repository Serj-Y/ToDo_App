import {ToDo} from '../../../ToDo/model/types/toDo.ts';
import React, {useState} from 'react';
import {Task} from '../../module/types/task.ts';
import {StyleSheet, Text, View} from 'react-native';
import {UpdateTask} from '../../../../feautures/UpdateTask';
import {DeleteTask} from '../../../../feautures/DeleteTask';
import PressableOpacity from '../../../../shared/ui/pressableOpacity/PressableOpacity.tsx';
import {useTheme} from '../../../../app/providers/ThemeProvider';
import {Card} from '../../../../shared/ui/Card/Card.tsx';

type TaskProps = {
  task: Task;
  toDo: ToDo;
};
// interface FormData {
//   taskStatus: TaskStatus;
// }
export const TaskItem = ({task, toDo}: TaskProps) => {
  const [isEditTask, setIsEditTask] = useState<boolean>(false);
  const setEditTaskHandler = () => setIsEditTask(prev => !prev);
  // const {control, handleSubmit} = useForm<FormData>();
  const {theme} = useTheme();
  // const dispatch = useAppDispatch();

  // const onSubmit = useCallback(
  //   (data: FormData) => {
  //     dispatch(
  //       updateTask({
  //         taskStatus: data.taskStatus,
  //         taskId: task._id,
  //         toDoId: toDo._id,
  //         task,
  //       }),
  //     );
  //   },
  //   [dispatch, task, toDo._id],
  // );
  return (
    <View key={task._id} style={styles.container}>
      <Card>
        <View style={styles.content}>
          {!isEditTask && (
            <PressableOpacity onLongPress={setEditTaskHandler}>
              <Text style={[styles.text, {color: theme.invertedPrimaryColor}]}>
                {task.name}
              </Text>
            </PressableOpacity>
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
            <View>
              {/*<Controller*/}
              {/*  name="taskStatus"*/}
              {/*  control={control}*/}
              {/*  defaultValue={task.status}*/}
              {/*  render={({field}) => (*/}
              {/*    <View>*/}
              {/*      <TaskStatusSelect*/}
              {/*        value={task.status}*/}
              {/*        onChange={field.onChange}*/}
              {/*      />*/}
              {/*    </View>*/}
              {/*  )}*/}
              {/*/>*/}
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
    flex: 1,
    marginBottom: 20,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 8,
  },
  input: {
    flex: 1,
    height: 40,
    padding: 8,
    borderRadius: 4,
  },
  button: {
    padding: 16,
    borderRadius: 4,
    marginVertical: 8,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 18,
  },
  errorText: {
    color: 'red',
    paddingBottom: 10,
  },
  text: {
    fontSize: 16,
  },
});
