import {useDispatch} from 'react-redux';
import {AppDispatch} from '@app/app/providers/StoreProvider';

export const useAppDispatch = () => useDispatch<AppDispatch>();
