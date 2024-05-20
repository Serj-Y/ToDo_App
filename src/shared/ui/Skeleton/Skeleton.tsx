import { CSSProperties } from 'react';
// import cls from './Skeleton.module.scss';
import { classNames } from '../../lib/classNames/classNames';
import {View} from "react-native";

interface SkeletonProps {
    className?: string;
    height?: string | number;
    width?: string | number;
    border?: string;
}

export const Skeleton = ({

    className, border, height, width,
}: SkeletonProps) => {
    const styles: CSSProperties = {
        width,
        height,
        borderRadius: border,
    };
    return (
        <View
            // className={classNames(cls.Skeleton, {}, [className])}
            // style={styles}
        />
    );
};
