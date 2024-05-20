import {
    AnyAction, CombinedState,
    EnhancedStore, Reducer, ReducersMapObject,
} from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import {ToDoSchema} from "../../../../entities/ToDo/model/types/toDoSchema.ts";
import {UserSchema} from "../../../../entities/User";
import {SignInSchema} from "../../../../feautures/Auth/SignInByEmail/model/types/signInSchema.ts";
import {SignUpSchema} from "../../../../feautures/Auth/SignUpByEmail/model/types/signUpSchema.ts";



export interface StateSchema {
    toDo: ToDoSchema;

    user: UserSchema;
    signInForm: SignInSchema;
    signUpForm: SignUpSchema;
}

export type StateSchemaKey = keyof StateSchema;
export type MountedReducers = OptionalRecord<StateSchemaKey, boolean>

export interface ReducerManager {
    getReducerMap: () => ReducersMapObject<StateSchema>;
    reduce: (state: StateSchema, action: AnyAction) => CombinedState<StateSchema>;
    add: (key: StateSchemaKey, reducer: Reducer) => void ;
    remove: (key: StateSchemaKey) => void;
    // true = mounted, false = unmaunted
    getMountedReducers: () => MountedReducers
}

export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
    reducerManager: ReducerManager;
}

export interface ThunkExtraArg {
    api: AxiosInstance;

}

export interface ThunkConfig<T> {
    rejectValue: T;
    extra: ThunkExtraArg;
    state: StateSchema;
}
