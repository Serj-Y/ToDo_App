import {ReactNode} from 'react';
import {Provider} from 'react-redux';
import {ReducersMapObject} from '@reduxjs/toolkit';
import {PersistGate} from 'redux-persist/integration/react';
import {persistStore} from 'redux-persist';
import {StateSchema} from '../config/StateSchema';
import {createReduxStore} from '../config/store';

interface StoreProviderProps {
  children?: ReactNode;
  initialState?: DeepPartial<StateSchema>;
  asyncReducers?: DeepPartial<ReducersMapObject<StateSchema>>;
}
export const StoreProvider = (props: StoreProviderProps) => {
  const {children, initialState, asyncReducers} = props;

  const store = createReduxStore(
    initialState as StateSchema,
    asyncReducers as ReducersMapObject<StateSchema>,
  );

  const persistor = persistStore(store);
  return (
    <Provider store={store}>
      <PersistGate loading={''} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
};
