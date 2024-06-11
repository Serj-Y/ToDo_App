import {Task} from '../../module/types/task.ts';
import React, {
  Dispatch,
  memo,
  SetStateAction,
  useCallback,
  useState,
} from 'react';
import {ToDo} from '../../../ToDo/model/types/toDo.ts';
import {ScaleDecorator} from 'react-native-draggable-flatlist';
import SwipeableItem, {
  OpenDirection,
  useSwipeableItemParams,
} from 'react-native-swipeable-item';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {TaskItem} from '../TaskItem/TaskItem.tsx';
import {useAppDispatch} from '../../../../shared/lib/hooks/useAppDispatch/useAppDispatch.ts';
import {deleteTask} from '../../../../feautures/DeleteTask';
import Animated from 'react-native-reanimated';
import PressableOpacity from '../../../../shared/ui/pressableOpacity/PressableOpacity.tsx';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useTheme} from '../../../../app/providers/ThemeProvider';

const OVERSWIPE_DIST = 20;

type SwipeableTaskListProps = {
  item: Task;
  drag: () => void;
  itemRefs: React.MutableRefObject<Map<any, any>>;
  toDo: ToDo;
  setIsDrag: React.Dispatch<React.SetStateAction<boolean>>;
};

export const SwipeableTaskList = memo(
  ({item, itemRefs, drag, toDo, setIsDrag}: SwipeableTaskListProps) => {
    const [isEditTask, setIsEditTask] = useState<boolean>(false);
    const setEditTaskHandler = () => setIsEditTask(prev => !prev);
    return (
      <ScaleDecorator activeScale={1.03}>
        <SwipeableItem
          key={item._id}
          item={item}
          ref={ref => {
            if (ref && !itemRefs.current.get(item._id)) {
              itemRefs.current.set(item._id, ref);
            }
          }}
          onChange={({openDirection}) => {
            if (openDirection !== OpenDirection.NONE) {
              // Close all other open items
              [...itemRefs.current.entries()].forEach(([key, ref]) => {
                if (key !== item._id && ref) {
                  ref.close();
                }
              });
            }
          }}
          overSwipe={OVERSWIPE_DIST}
          renderUnderlayLeft={() => <UnderlayLeft toDo={toDo} />}
          renderUnderlayRight={() => (
            <UnderlayRight setEditTaskMode={setEditTaskHandler} />
          )}
          snapPointsLeft={[75]}
          snapPointsRight={[75]}>
          <View>
            <TouchableOpacity
              activeOpacity={0.8}
              onLongPress={drag}
              onPressIn={() => setIsDrag(true)}
              onPress={() => setIsDrag(false)}
              delayLongPress={125}
              delayPressIn={50}
              onPressOut={() => setIsDrag(false)}>
              <TaskItem
                task={item}
                toDo={toDo}
                isEditTaskMode={isEditTask}
                setIsEditTask={setIsEditTask}
              />
            </TouchableOpacity>
          </View>
        </SwipeableItem>
      </ScaleDecorator>
    );
  },
);

function UnderlayLeft({toDo}: {toDo: ToDo}) {
  const {item, close} = useSwipeableItemParams<Task>();
  const dispatch = useAppDispatch();

  const onDeleteTask = useCallback(() => {
    dispatch(deleteTask({taskId: item._id, toDoId: toDo._id}));
  }, [dispatch, item._id, toDo]);

  return (
    <Animated.View style={[styles.row, styles.underlayLeft]}>
      <PressableOpacity
        style={[styles.button]}
        onPress={() => {
          onDeleteTask();
          close();
        }}>
        <Icon name="trash-o" style={[{color: 'red'}]} size={20} />
      </PressableOpacity>
    </Animated.View>
  );
}

function UnderlayRight({
  setEditTaskMode,
}: {
  setEditTaskMode: Dispatch<SetStateAction<boolean>>;
}) {
  const {close} = useSwipeableItemParams<Task>();
  const {theme} = useTheme();
  return (
    <Animated.View style={[styles.row, styles.underlayRight]}>
      <PressableOpacity
        style={[styles.button]}
        onPress={() => {
          setEditTaskMode(prev => !prev);
          close();
        }}>
        <Icon name="edit" color={theme.invertedPrimaryColor} size={20} />
      </PressableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  underlayRight: {
    justifyContent: 'flex-start',
  },
  underlayLeft: {
    justifyContent: 'flex-end',
  },
  button: {
    padding: 10,
  },
});
