// import cls from './PageLoader.module.scss';
import { classNames } from '../../lib/classNames/classNames';
import { Loader } from '../Loader/Loader';
import {View} from "react-native";

interface PageLoaderProps {
    className?: string;
}

export const PageLoader = ({ className }: PageLoaderProps) => (
    <View
        // className={classNames(cls.PageLoader, {}, [className])}
    >
        <Loader />
    </View>
);
