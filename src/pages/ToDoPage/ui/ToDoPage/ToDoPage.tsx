import { useSelector } from 'react-redux';
import React, { memo, useEffect } from 'react';

import { initToDoPage } from '../../model/services/initToDoPage/initToDoPage';
import {ReducersList} from "../../../../shared/lib/components/DynamicModuleLoader/DynamicModuleLoader.tsx";
import {getToDo, toDoReducers} from "../../../../entities/ToDo/model/slice/toDoSlice.ts";
import {userReducer} from "../../../../entities/User";
import {useAppDispatch} from "../../../../shared/lib/hooks/useAppDispatch/useAppDispatch.ts";
import {
    getToDoPageError,
    getToDoPageHasInited,
    getToDoPageIsLoading
} from "../../../../entities/ToDo/model/selectors/toDoSelectors.ts";
import {fetchToDo} from "../../../../entities/ToDo/model/services/fetchToDo/fetchToDo.ts";
import {View} from "react-native";

interface ToDoPageProps {
    className?: string;
}

const reducers: ReducersList = {
    toDo: toDoReducers,
    user: userReducer,
};

const ToDoPage = ({ className }: ToDoPageProps) => {
    const dispatch = useAppDispatch();
    const isLoading = useSelector(getToDoPageIsLoading);
    const error = useSelector(getToDoPageError);
    const inited = useSelector(getToDoPageHasInited);
    const toDo = useSelector(getToDo.selectAll);

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
            <View>
                ToDoPage
            </View>
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
