import {StateSchema} from '../../../../app/providers/StoreProvider';

export const getToDoIsLoading = (state: StateSchema) =>
  state.toDo?.isLoading || false;
export const getToDoError = (state: StateSchema) => state.toDo?.error;
export const getToDoHasInited = (state: StateSchema) => state.toDo?._inited;
