import React, {memo, useEffect} from 'react';
import {initToDoPage} from '../../model/services/initToDoPage/initToDoPage';
import {useAppDispatch} from '../../../../shared/lib/hooks/useAppDispatch/useAppDispatch.ts';

import {View} from 'react-native';
const ToDoPage = () => {
  const dispatch = useAppDispatch();
  // const isLoading = useSelector(getToDoPageIsLoading);
  // const error = useSelector(getToDoPageError);
  // const inited = useSelector(getToDoPageHasInited);
  // const toDo = useSelector(getToDo.selectAll);

  // useEffect(() => {
  //     if (isFocus) {
  //         setTimeout(() => { dispatch(fetchToDo({})); }, 2000);
  //     }
  // }, [dispatch, isFocus]);

  useEffect(() => {
    dispatch(initToDoPage());
  });
  return (
    <View>
      <View>ToDoPage</View>
      {/*{inited*/}
      {/*    && (*/}
      {/*        <>*/}
      {/*            <CreateToDo />*/}
      {/*            <ToDoList*/}
      {/*                isLoading={isLoading}*/}
      {/*                className={cls.list}*/}
      {/*                toDos={toDo}*/}
      {/*            />*/}
      {/*        </>*/}
      {/*    )}*/}
    </View>
  );
};
export default memo(ToDoPage);
