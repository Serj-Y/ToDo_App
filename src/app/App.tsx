import React, { Suspense, useEffect } from 'react';
import { useTheme } from './providers/ThemeProvider';
import { getUserInited } from '../entities/User';
import { ToDoPage } from '../pages/ToDoPage';
import { initUser } from '../entities/User/model/services/initUser';
import { ACCESS_TOKEN } from '../shared/consts/localStorage';
import { useAppDispatch } from '../shared/lib/hooks/useAppDispatch/useAppDispatch';
import {classNames} from "../shared/lib/classNames/classNames.ts";
import {useSelector} from "react-redux";
import {View} from "react-native";

function App() {
    const { theme } = useTheme();
    const dispatch = useAppDispatch();
    const inited = useSelector(getUserInited);

    useEffect(() => {
        if (!ACCESS_TOKEN) {
            dispatch(initUser());
        }
    }, [dispatch]);
    return (
        <View>
            <Suspense fallback="">
                {/*<Navbar />*/}
                <View>
                    {inited
                        && (
                            <ToDoPage />
                        )}
                </View>
                {/*<Footer />*/}
            </Suspense>
        </View>
    );
}

export default App;
