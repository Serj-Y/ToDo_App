import { HTMLAttributes, ReactNode } from 'react';
// import cls from './Card.module.scss';
import { classNames } from '../../lib/classNames/classNames';
import {View} from "react-native";

export enum CardTheme {
    NORMAL = 'normal',
    OUTLINED = 'outlined',
}

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    className?: string;
    children: ReactNode;
    theme?: CardTheme;
}

export const Card = ({
    className,
    children,
    theme = CardTheme.NORMAL,
    ...otherProps
}: CardProps) => (
    <View
        // className={classNames(cls.Card, {}, [className, cls[theme]])} {...otherProps}
         >
        {children}
    </View>
);
