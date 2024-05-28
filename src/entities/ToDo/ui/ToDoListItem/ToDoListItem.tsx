import React, {memo, useState} from 'react';
import {ToDo} from '../../model/types/toDo.ts';
import {Card} from '../../../../shared/ui/Card/Card.tsx';
import {StyleSheet, Text, View} from 'react-native';
import {UpdateToDoList} from '../../../../feautures/UpdateToDoList';
import PressableOpacity from '../../../../shared/ui/pressableOpacity/PressableOpacity.tsx';
import {DeleteToDo} from '../../../../feautures/DeleteToDo';
import {useTheme} from '../../../../app/providers/ThemeProvider';
import {CreateTask} from '../../../../feautures/CreateTask';
import {TaskItem} from '../../../Task/ui/TaskItem/TaskItem.tsx';
import {Task} from '../../../Task/module/types/task.ts';
import {sortByOrder} from '../../../../shared/lib/sortByOrder/sortByOrder.ts';

interface ToDoListItemProps {
  toDo: ToDo;
}

export const ToDoListItem = memo(({toDo}: ToDoListItemProps) => {
  const [isEditToDoList, setIsEditToDoList] = useState<boolean>(false);
  const {theme} = useTheme();

  const setEditToDoListHandler = () => setIsEditToDoList(prev => !prev);
  const renderTask = (task: Task) => (
    <TaskItem task={task} toDo={toDo} key={task._id} />
  );
  const sortedTasks = [...toDo.tasks].sort(sortByOrder);
  return (
    <View style={styles.container} key={toDo._id}>
      <Card>
        <View style={styles.content}>
          {isEditToDoList ? (
            <>
              <PressableOpacity onLongPress={setEditToDoListHandler}>
                <UpdateToDoList
                  setIsEditToDoList={setIsEditToDoList}
                  toDoId={toDo._id}
                  currentToDoName={toDo.name}
                />
              </PressableOpacity>
              <View />
            </>
          ) : (
            <>
              <PressableOpacity onLongPress={setEditToDoListHandler}>
                <Text
                  style={[styles.text, {color: theme.invertedPrimaryColor}]}>
                  {toDo.name}
                </Text>
              </PressableOpacity>
              <DeleteToDo toDoIdForDelete={toDo._id} />
            </>
          )}
        </View>
        {sortedTasks.length > 0 ? sortedTasks.map(renderTask) : null}
        <CreateTask toDoId={toDo._id} />
      </Card>
    </View>
  );
});
const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    marginHorizontal: 10,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 20,
  },
});
