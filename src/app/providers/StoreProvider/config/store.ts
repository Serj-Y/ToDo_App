import {
  configureStore,
  Reducer,
  ReducersMapObject,
  CombinedState,
} from '@reduxjs/toolkit';
import {
  createMigrate,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import {StateSchema, ThunkExtraArg} from './StateSchema';
import {createReducerManager} from './reducerManager';
import {toDoReducers} from '../../../../entities/ToDo/model/slice/toDoSlice';
import {$api} from '../../../../shared/api/api.ts';
import {userReducer} from '../../../../entities/User';
import {signInReducer} from '../../../../feautures/Auth/SignIn/model/slice/signInSlice.ts';
import {signUpReducer} from '../../../../feautures/Auth/SignUp/model/slice/signUpSlice.ts';
import AsyncStorage from '@react-native-async-storage/async-storage';

const rootMigrations = {
  6: (state: any) => ({
    ...state,
  }),
};

const persistConfig = {
  key: 'app',
  version: 6,
  storage: AsyncStorage,
  migrate: createMigrate(rootMigrations),
  blacklist: ['scrollSave', 'signInForm', 'signUpForm'],
  whitelist: ['user', 'toDo'],
};

export function createReduxStore(initialState?: StateSchema) {
  const rootReducers: ReducersMapObject<StateSchema> = {
    user: userReducer,
    signInForm: signInReducer,
    signUpForm: signUpReducer,
    toDo: toDoReducers,
  };

  const reducerManager = createReducerManager(rootReducers);

  const extraArg: ThunkExtraArg = {
    api: $api,
  };

  const reducers = persistReducer(
    persistConfig,
    reducerManager.reduce as Reducer<CombinedState<StateSchema>>,
  );
  const store = configureStore({
    reducer: reducers,
    preloadedState: initialState,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
        thunk: {
          extraArgument: extraArg,
        },
      }),
  });
  // @ts-ignore
  store.reducerManager = reducerManager;
  return store;
}
export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];
